import fs from "fs";
import path from "path";
import { createClient } from "@/lib/supabase/server";

export interface AdhesionRecord {
  id: string;
  numero_suivi: string;
  created_at: string;
  civilite: "M" | "Mme";
  nom: string;
  prenom: string;
  courriel: string;
  telephone: string;
  ville_residence: string;
  pays: string;
  promotion: number;
  filiere: string;
  categorie_membre: string;
  justificatif_nom: string;
  justificatif_taille: string;
  employeur: string;
  fonction: string;
  secteur: string;
  competences: string[];
  disponibilite: string;
  attentes: string;
  consent_donnees: boolean;
  consent_annuaire: boolean;
  consent_galerie: boolean;
  statut: "en_attente" | "validee" | "rejetee";
  identifiant_attribue?: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "adhesions.json");

// Lecture locale
export function readLocalAdhesions(): AdhesionRecord[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erreur lecture local adhesions.json:", err);
    return [];
  }
}

// Écriture locale
export function writeLocalAdhesions(records: AdhesionRecord[]): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur écriture local adhesions.json:", err);
  }
}

// Récupérer toutes les adhésions (Supabase avec repli local)
export async function getAllAdhesions(): Promise<AdhesionRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("adhesions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      // Fusionner les données de Supabase et locales pour ne rien perdre
      const local = readLocalAdhesions();
      const existingSuivis = new Set(data.map((d: AdhesionRecord) => d.numero_suivi));
      const notInDb = local.filter((l) => !existingSuivis.has(l.numero_suivi));
      return [...data, ...notInDb];
    }
  } catch {
    // Supabase indisponible ou table non créée
  }

  return readLocalAdhesions();
}

// Ajouter une nouvelle adhésion
export async function saveNewAdhesion(record: AdhesionRecord): Promise<AdhesionRecord> {
  // Sauvegarde locale persistante
  const current = readLocalAdhesions();
  // Insérer en début de liste
  const updated = [record, ...current.filter(r => r.numero_suivi !== record.numero_suivi)];
  writeLocalAdhesions(updated);

  // Tentative sauvegarde Supabase
  try {
    const supabase = await createClient();
    await supabase.from("adhesions").insert([record]);
  } catch {
    // Mode résilient
  }

  return record;
}

// Mettre à jour le statut d'une adhésion
export async function updateAdhesionStatus(
  idOrSuivi: string,
  statut: "validee" | "rejetee",
  identifiant_attribue?: string
): Promise<AdhesionRecord | null> {
  const current = readLocalAdhesions();
  let updatedRecord: AdhesionRecord | null = null;

  const updated = current.map((item) => {
    if (item.id === idOrSuivi || item.numero_suivi === idOrSuivi) {
      updatedRecord = {
        ...item,
        statut,
        identifiant_attribue: identifiant_attribue || item.identifiant_attribue,
      };
      return updatedRecord;
    }
    return item;
  });

  if (updatedRecord) {
    writeLocalAdhesions(updated);
  }

  // Tentative mise à jour Supabase
  try {
    const supabase = await createClient();
    await supabase
      .from("adhesions")
      .update({ statut, ...(identifiant_attribue ? { identifiant_attribue } : {}) })
      .or(`id.eq.${idOrSuivi},numero_suivi.eq.${idOrSuivi}`);
  } catch {
    // Mode résilient
  }

  return updatedRecord;
}
