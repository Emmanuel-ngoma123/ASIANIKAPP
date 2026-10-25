import { NextResponse } from "next/server";
import { getAllAdhesions, saveNewAdhesion, updateAdhesionStatus, AdhesionRecord } from "@/lib/adhesionsStore";

// GET /api/adhesions : Récupère la liste de toutes les adhésions
export async function GET() {
  try {
    const adhesions = await getAllAdhesions();
    return NextResponse.json({ success: true, adhesions });
  } catch (error) {
    console.error("Erreur GET /api/adhesions :", error);
    return NextResponse.json({ error: "Impossible de récupérer les adhésions." }, { status: 500 });
  }
}

// POST /api/adhesions : Enregistre une nouvelle demande d'adhésion
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      civilite,
      nom,
      prenom,
      courriel,
      telephone,
      ville_residence,
      pays,
      promotion,
      filiere,
      categorie_membre,
      justificatif_nom,
      justificatif_url,
      justificatif_taille,
      employeur,
      fonction,
      secteur,
      competences,
      disponibilite,
      attentes,
      consent_donnees,
      consent_annuaire,
      consent_galerie,
      statut = "en_attente",
    } = body;

    // Validation des champs obligatoires
    if (!nom || !prenom || !courriel || !telephone || !promotion || !filiere) {
      return NextResponse.json(
        { error: "Veuillez renseigner tous les champs obligatoires." },
        { status: 400 }
      );
    }

    if (!consent_donnees) {
      return NextResponse.json(
        { error: "Le consentement pour l'utilisation des données est obligatoire." },
        { status: 400 }
      );
    }

    // Génération d'un numéro de suivi unique: AS-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const numero_suivi = body.numero_suivi || `AS-${new Date().getFullYear()}-${randomSuffix}`;
    const id = body.id || `adh-${randomSuffix}`;

    const recordData: AdhesionRecord = {
      id,
      numero_suivi,
      created_at: new Date().toISOString(),
      civilite: civilite || "M",
      nom,
      prenom,
      courriel,
      telephone,
      ville_residence: ville_residence || "Kolwezi",
      pays: pays || "République démocratique du Congo",
      promotion: parseInt(promotion, 10),
      filiere,
      categorie_membre: categorie_membre || "Ancien diplômé",
      justificatif_nom: justificatif_nom || "diplome_attestation.pdf",
      justificatif_taille: justificatif_taille || "PDF • 1.5 Mo",
      employeur: employeur || "Non renseigné",
      fonction: fonction || "Ingénieur",
      secteur: secteur || "Général",
      competences: Array.isArray(competences) ? competences : [],
      disponibilite: disponibilite || "Régulière",
      attentes: attentes || "",
      consent_donnees: Boolean(consent_donnees),
      consent_annuaire: Boolean(consent_annuaire),
      consent_galerie: Boolean(consent_galerie),
      statut,
    };

    // Sauvegarde unifiée persistante (Local + Supabase)
    const saved = await saveNewAdhesion(recordData);

    return NextResponse.json({
      success: true,
      numero_suivi,
      data: saved,
    });
  } catch (error) {
    console.error("Erreur serveur POST /api/adhesions :", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors de l'enregistrement de votre demande." },
      { status: 500 }
    );
  }
}

// PATCH /api/adhesions : Met à jour le statut d'une adhésion (validation ou rejet)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, statut, identifiant_attribue } = body;

    if (!id || !statut) {
      return NextResponse.json({ error: "L'identifiant et le statut sont requis." }, { status: 400 });
    }

    const updated = await updateAdhesionStatus(id, statut, identifiant_attribue);

    if (!updated) {
      return NextResponse.json({ error: "Adhésion non trouvée." }, { status: 404 });
    }

    return NextResponse.json({ success: true, adhesion: updated });
  } catch (error) {
    console.error("Erreur PATCH /api/adhesions :", error);
    return NextResponse.json({ error: "Impossible de mettre à jour le statut." }, { status: 500 });
  }
}
