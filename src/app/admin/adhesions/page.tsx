"use client";

import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Download, 
  FileText, 
  Eye, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  RefreshCw,
  X,
  Loader2
} from "lucide-react";

interface Adhesion {
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
  statut: "en_attente" | "validee" | "rejetee";
  identifiant_attribue?: string;
}

export default function AdminAdhesionsPage() {
  const [adhesions, setAdhesions] = useState<Adhesion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"toutes" | "en_attente" | "validee" | "rejetee">("en_attente");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdhesion, setSelectedAdhesion] = useState<Adhesion | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Charger les données depuis l'API
  const fetchAdhesions = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/adhesions", { cache: "no-store" });
      const data = await res.json();
      if (data.adhesions) {
        setAdhesions(data.adhesions);
        if (isManual) {
          setNotification("Données actualisées avec succès !");
          setTimeout(() => setNotification(null), 3000);
        }
      }
    } catch (err) {
      console.error("Erreur récupération adhésions :", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdhesions();
  }, []);

  // Filtrage
  const filteredAdhesions = adhesions.filter((item) => {
    const matchesTab = activeTab === "toutes" ? true : item.statut === activeTab;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (item.nom || "").toLowerCase().includes(query) ||
      (item.prenom || "").toLowerCase().includes(query) ||
      (item.numero_suivi || "").toLowerCase().includes(query) ||
      (item.filiere || "").toLowerCase().includes(query) ||
      (item.promotion ? item.promotion.toString().includes(query) : false);
    return matchesTab && matchesSearch;
  });

  const countPending = adhesions.filter((a) => a.statut === "en_attente").length;
  const countApproved = adhesions.filter((a) => a.statut === "validee").length;
  const countRejected = adhesions.filter((a) => a.statut === "rejetee").length;

  const handleValidate = async (id: string) => {
    const memberId = `AS${Math.floor(1000 + Math.random() * 9000)}K`;
    
    // Mise à jour optimiste
    setAdhesions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, statut: "validee", identifiant_attribue: memberId } : a))
    );
    if (selectedAdhesion && selectedAdhesion.id === id) {
      setSelectedAdhesion((prev) =>
        prev ? { ...prev, statut: "validee", identifiant_attribue: memberId } : null
      );
    }

    try {
      await fetch("/api/adhesions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, statut: "validee", identifiant_attribue: memberId }),
      });
      setNotification(`Adhésion validée ! ID membre attribué : ${memberId}`);
    } catch {
      setNotification(`Adhésion validée en local ! ID membre : ${memberId}`);
    }

    setTimeout(() => setNotification(null), 4000);
  };

  const handleReject = async (id: string) => {
    // Mise à jour optimiste
    setAdhesions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, statut: "rejetee" } : a))
    );
    if (selectedAdhesion && selectedAdhesion.id === id) {
      setSelectedAdhesion((prev) => (prev ? { ...prev, statut: "rejetee" } : null));
    }

    try {
      await fetch("/api/adhesions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, statut: "rejetee" }),
      });
      setNotification("Demande d'adhésion refusée.");
    } catch {
      setNotification("Demande refusée.");
    }

    setTimeout(() => setNotification(null), 4000);
  };

  const handleExportCSV = () => {
    const headers = "Numéro Suivi,Nom,Prénom,Filière,Promotion,Email,Téléphone,Ville,Statut\n";
    const rows = adhesions
      .map(
        (a) =>
          `"${a.numero_suivi}","${a.nom}","${a.prenom}","${a.filiere}",${a.promotion},"${a.courriel}","${a.telephone}","${a.ville_residence}","${a.statut}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `adhesions_asianik_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#0a2342] text-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-700 flex items-center space-x-3 text-sm animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* En-tête de section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Validation des Adhésions</h2>
          <p className="text-gray-500 text-sm mt-1">
            Examinez les dossiers d'inscription des anciens diplômés, vérifiez leurs diplômes et activez leurs comptes membres.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchAdhesions(true)}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition disabled:opacity-60"
            title="Rafraîchir les demandes"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-blue-600" : ""}`} />
            <span>Actualiser</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition"
          >
            <Download className="h-4 w-4" />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Dossiers</span>
          <span className="text-3xl font-black text-gray-900">{adhesions.length}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-yellow-200 bg-yellow-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider block mb-1">À Vérifier</span>
            <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
          </div>
          <span className="text-3xl font-black text-yellow-800">{countPending}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-green-200 bg-green-50/20 shadow-sm">
          <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Membres Validés</span>
          <span className="text-3xl font-black text-green-800">{countApproved}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">Rejetés</span>
          <span className="text-3xl font-black text-red-700">{countRejected}</span>
        </div>
      </div>

      {/* Barre de filtres et recherche */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Onglets statuts */}
        <div className="flex rounded-xl bg-gray-100 p-1 w-full md:w-auto">
          <button
            onClick={() => setActiveTab("en_attente")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === "en_attente"
                ? "bg-white text-yellow-800 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>En attente</span>
            <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-black">
              {countPending}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("validee")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === "validee"
                ? "bg-white text-green-800 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>Validées</span>
            <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-black">
              {countApproved}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("rejetee")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "rejetee"
                ? "bg-white text-red-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Rejetées ({countRejected})
          </button>
          <button
            onClick={() => setActiveTab("toutes")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "toutes"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Toutes ({adhesions.length})
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="relative w-full md:w-72">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher (Nom, Promo, Dossier)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
          />
        </div>
      </div>

      {/* Table des demandes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-sm font-medium">Chargement des dossiers d'adhésion...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-100 font-bold">
                  <th className="p-4">Candidat</th>
                  <th className="p-4">Filière & Promo</th>
                  <th className="p-4">Résidence</th>
                  <th className="p-4">Justificatif</th>
                  <th className="p-4">Date de soumission</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredAdhesions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                      Aucune demande d'adhésion trouvée dans cette catégorie.
                    </td>
                  </tr>
                ) : (
                  filteredAdhesions.map((adhesion) => (
                    <tr key={adhesion.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* Nom & Contact */}
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-black flex items-center justify-center text-xs flex-shrink-0">
                            {adhesion.prenom ? adhesion.prenom[0] : ""}{adhesion.nom ? adhesion.nom[0] : ""}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {adhesion.civilite}. {adhesion.prenom} {adhesion.nom}
                            </p>
                            <span className="text-[11px] font-mono text-gray-400 block">
                              {adhesion.numero_suivi}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Filière & Promo */}
                      <td className="p-4">
                        <p className="font-semibold text-gray-900 text-xs">{adhesion.filiere}</p>
                        <span className="text-xs text-blue-600 font-bold">Promo {adhesion.promotion}</span>
                      </td>

                      {/* Ville */}
                      <td className="p-4 text-xs text-gray-600">
                        {adhesion.ville_residence}, {adhesion.pays === "République démocratique du Congo" ? "RDC" : adhesion.pays}
                      </td>

                      {/* Justificatif */}
                      <td className="p-4">
                        <span className="inline-flex items-center space-x-1.5 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 font-medium">
                          <FileText className="h-3.5 w-3.5 text-blue-600" />
                          <span className="truncate max-w-[120px]">{adhesion.justificatif_nom}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-xs text-gray-500">
                        {new Date(adhesion.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Statut */}
                      <td className="p-4">
                        {adhesion.statut === "en_attente" && (
                          <span className="inline-flex items-center space-x-1 bg-yellow-50 text-yellow-800 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-200">
                            <Clock className="h-3 w-3" />
                            <span>En attente</span>
                          </span>
                        )}
                        {adhesion.statut === "validee" && (
                          <span className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Validée ({adhesion.identifiant_attribue || "OK"})</span>
                          </span>
                        )}
                        {adhesion.statut === "rejetee" && (
                          <span className="inline-flex items-center space-x-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold border border-red-200">
                            <XCircle className="h-3 w-3" />
                            <span>Rejetée</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedAdhesion(adhesion)}
                            title="Examiner le dossier complet"
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {adhesion.statut === "en_attente" && (
                            <>
                              <button
                                onClick={() => handleValidate(adhesion.id)}
                                title="Valider l'adhésion"
                                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center space-x-1"
                              >
                                <ShieldCheck className="h-3.5 w-3.5" />
                                <span>Valider</span>
                              </button>
                              <button
                                onClick={() => handleReject(adhesion.id)}
                                title="Rejeter la demande"
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL : EXAMEN COMPLET DU DOSSIER */}
      {selectedAdhesion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#0a2342] text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-xs font-mono text-blue-300 uppercase tracking-wider block">
                  Dossier #{selectedAdhesion.numero_suivi}
                </span>
                <h3 className="text-xl font-bold">
                  {selectedAdhesion.civilite}. {selectedAdhesion.prenom} {selectedAdhesion.nom}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAdhesion(null)}
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              
              {/* Statut actuel */}
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs font-bold text-gray-500">Statut du dossier :</span>
                {selectedAdhesion.statut === "en_attente" && (
                  <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                    En attente de vérification
                  </span>
                )}
                {selectedAdhesion.statut === "validee" && (
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    Membre actif validé (ID: {selectedAdhesion.identifiant_attribue || "Attribué"})
                  </span>
                )}
                {selectedAdhesion.statut === "rejetee" && (
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                    Dossier rejeté
                  </span>
                )}
              </div>

              {/* Contacts */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contacts</h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-gray-800">{selectedAdhesion.courriel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-800">{selectedAdhesion.telephone}</span>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="font-medium text-gray-800">
                      {selectedAdhesion.ville_residence}, {selectedAdhesion.pays}
                    </span>
                  </div>
                </div>
              </div>

              {/* Parcours Académique ISTA */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Parcours ISTA</h4>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Filière :</span>
                    <span className="font-bold text-gray-900">{selectedAdhesion.filiere}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Promotion :</span>
                    <span className="font-bold text-blue-700">Année {selectedAdhesion.promotion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Catégorie :</span>
                    <span className="font-medium text-gray-800">{selectedAdhesion.categorie_membre}</span>
                  </div>
                </div>
              </div>

              {/* Justificatif de diplôme */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pièce justificative</h4>
                <div className="border border-blue-200 bg-blue-50/30 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-gray-900">{selectedAdhesion.justificatif_nom}</p>
                      <p className="text-[10px] text-gray-500">{selectedAdhesion.justificatif_taille}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Téléchargement / Consultation de la pièce : ${selectedAdhesion.justificatif_nom}`)}
                    className="px-3 py-1.5 border border-blue-600 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition"
                  >
                    Consulter
                  </button>
                </div>
              </div>

              {/* Situation Pro & Attentes */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Situation professionnelle</h4>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">Poste & Entreprise :</span>
                    <span className="font-bold text-gray-900">
                      {selectedAdhesion.fonction} • {selectedAdhesion.employeur} ({selectedAdhesion.secteur})
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1.5">Compétences déclarées :</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAdhesion.competences && selectedAdhesion.competences.map((c) => (
                        <span key={c} className="bg-white border border-gray-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-gray-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Attentes vis-à-vis du réseau :</span>
                    <p className="text-gray-700 italic mt-0.5">{selectedAdhesion.attentes || "Aucune attente particulière spécifiée."}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedAdhesion(null)}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-100 transition"
              >
                Fermer
              </button>

              {selectedAdhesion.statut === "en_attente" && (
                <>
                  <button
                    type="button"
                    onClick={() => handleReject(selectedAdhesion.id)}
                    className="px-5 py-2.5 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition"
                  >
                    Rejeter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleValidate(selectedAdhesion.id)}
                    className="px-6 py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition flex items-center space-x-2 shadow-lg shadow-green-600/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Valider & Activer le membre</span>
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
