"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Check, 
  Upload, 
  Shield, 
  ArrowRight, 
  FileText, 
  Trash2, 
  Printer, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Bookmark, 
  X
} from "lucide-react";

export default function InscriptionPage() {
  // Navigation / Stepper
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [civilite, setCivilite] = useState<"M" | "Mme">("M");
  const [nom, setNom] = useState("Mukendi");
  const [prenom, setPrenom] = useState("Jean-Paul");
  const [courriel, setCourriel] = useState("jp.mukendi@exemple.cd");
  const [telephone, setTelephone] = useState("+243 81 234 5678");
  const [ville, setVille] = useState("Kolwezi");
  const [pays, setPays] = useState("République démocratique du Congo");

  const [promotion, setPromotion] = useState("2016");
  const [filiere, setFiliere] = useState("Génie électrique");
  const [categorieMembre, setCategorieMembre] = useState("Ancien diplômé");
  const [justificatif, setJustificatif] = useState<{ name: string; size: string } | null>({
    name: "diplome_mukendi.pdf",
    size: "1.2 Mo • ajouté"
  });

  const [employeur, setEmployeur] = useState("Entreprise minière du Lualaba");
  const [fonction, setFonction] = useState("Ingénieur de maintenance");
  const [secteur, setSecteur] = useState("Mines et énergie");
  const [competences, setCompetences] = useState<string[]>([
    "Maintenance industrielle",
    "Gestion de projet",
    "Électricité HT"
  ]);
  const [newCompetence, setNewCompetence] = useState("");
  const [disponibilite, setDisponibilite] = useState<"Ponctuelle" | "Régulière" | "Aucune">("Régulière");
  const [attentes, setAttentes] = useState("Mentorat, réseau professionnel, commissions techniques...");

  const [consentDonnees, setConsentDonnees] = useState(true);
  const [consentAnnuaire, setConsentAnnuaire] = useState(true);
  const [consentGalerie, setConsentGalerie] = useState(false);

  // Status & Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    numeroSuivi: string;
    submittedAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Charger le brouillon sauvegardé s'il existe
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("asianik_adhesion_draft");
      if (savedDraft) {
        const data = JSON.parse(savedDraft);
        if (data.nom) setNom(data.nom);
        if (data.prenom) setPrenom(data.prenom);
        if (data.civilite) setCivilite(data.civilite);
        if (data.courriel) setCourriel(data.courriel);
        if (data.telephone) setTelephone(data.telephone);
        if (data.ville) setVille(data.ville);
        if (data.pays) setPays(data.pays);
        if (data.promotion) setPromotion(data.promotion);
        if (data.filiere) setFiliere(data.filiere);
        if (data.categorieMembre) setCategorieMembre(data.categorieMembre);
        if (data.employeur) setEmployeur(data.employeur);
        if (data.fonction) setFonction(data.fonction);
        if (data.secteur) setSecteur(data.secteur);
        if (data.competences) setCompetences(data.competences);
        if (data.disponibilite) setDisponibilite(data.disponibilite);
        if (data.attentes) setAttentes(data.attentes);
        setToastMessage("Brouillon précédent restauré avec succès.");
      }
    } catch {
      // ignore
    }
  }, []);

  // Détection du scroll pour ajuster l'étape active dans le stepper
  useEffect(() => {
    const handleScroll = () => {
      const sec1 = document.getElementById("section-1");
      const sec2 = document.getElementById("section-2");
      const sec3 = document.getElementById("section-3");
      const sec4 = document.getElementById("section-4");

      const scrollPos = window.scrollY + 200;

      if (sec4 && scrollPos >= sec4.offsetTop) {
        setCurrentStep(4);
      } else if (sec3 && scrollPos >= sec3.offsetTop) {
        setCurrentStep(3);
      } else if (sec2 && scrollPos >= sec2.offsetTop) {
        setCurrentStep(2);
      } else if (sec1) {
        setCurrentStep(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const scrollToSection = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    const element = document.getElementById(`section-${stepNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAddCompetence = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newCompetence.trim()) {
      e.preventDefault();
      if (!competences.includes(newCompetence.trim())) {
        setCompetences([...competences, newCompetence.trim()]);
      }
      setNewCompetence("");
    }
  };

  const removeCompetence = (compToRemove: string) => {
    setCompetences(competences.filter((c) => c !== compToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setJustificatif({
        name: file.name,
        size: `${file.name.split(".").pop()?.toUpperCase() || "DOC"} • ${sizeMB} Mo • ajouté`,
      });
      setToastMessage(`Fichier joint : ${file.name}`);
    }
  };

  const handleSaveDraft = () => {
    const draftData = {
      civilite,
      nom,
      prenom,
      courriel,
      telephone,
      ville,
      pays,
      promotion,
      filiere,
      categorieMembre,
      employeur,
      fonction,
      secteur,
      competences,
      disponibilite,
      attentes,
      consentDonnees,
      consentAnnuaire,
      consentGalerie,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("asianik_adhesion_draft", JSON.stringify(draftData));
    setToastMessage("Brouillon sauvegardé ! Vous pourrez reprendre votre saisie à tout moment.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!nom.trim() || !prenom.trim()) {
      setErrorMsg("Veuillez renseigner votre nom et prénom.");
      scrollToSection(1);
      return;
    }
    if (!courriel.trim() || !courriel.includes("@")) {
      setErrorMsg("Veuillez renseigner une adresse email valide.");
      scrollToSection(1);
      return;
    }
    if (!telephone.trim()) {
      setErrorMsg("Veuillez renseigner votre numéro de téléphone.");
      scrollToSection(1);
      return;
    }
    if (!consentDonnees) {
      setErrorMsg("Le consentement pour l'utilisation de vos données est obligatoire.");
      scrollToSection(4);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        civilite,
        nom,
        prenom,
        courriel,
        telephone,
        ville_residence: ville,
        pays,
        promotion,
        filiere,
        categorie_membre: categorieMembre,
        justificatif_nom: justificatif?.name || null,
        justificatif_taille: justificatif?.size || null,
        employeur,
        fonction,
        secteur,
        competences,
        disponibilite,
        attentes,
        consent_donnees: consentDonnees,
        consent_annuaire: consentAnnuaire,
        consent_galerie: consentGalerie,
      };

      const res = await fetch("/api/adhesions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Erreur lors de la soumission de la demande.");
      }

      // Nettoyage du brouillon après soumission réussie
      localStorage.removeItem("asianik_adhesion_draft");

      setSubmissionResult({
        numeroSuivi: result.numero_suivi,
        submittedAt: new Date().toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inattendue.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const copyTrackingNumber = () => {
    if (submissionResult) {
      navigator.clipboard.writeText(submissionResult.numeroSuivi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ÉCRAN DE CONFIRMATION / ACCUSÉ DE RÉCEPTION
  if (submissionResult) {
    return (
      <div className="min-h-screen bg-[#f4f7f9] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* En-tête Accusé */}
          <div className="bg-[#0a2342] text-white p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
            <Link href="/" className="inline-block mb-4">
              <img src="/images/logo.png" alt="ASIANIK" className="h-10 w-auto bg-white rounded-lg p-1 mx-auto" />
            </Link>
            <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-green-500/30">
              <CheckCircle2 className="h-4 w-4" />
              <span>Demande d'adhésion enregistrée</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Accusé de réception officiel</h1>
            <p className="text-blue-200 text-sm mt-2 max-w-lg mx-auto">
              Votre demande a bien été transmise au secrétariat général de l'ASIANIK pour vérification académique et validation.
            </p>
          </div>

          {/* Numéro de suivi mis en valeur */}
          <div className="p-8 space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
              <span className="block text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                Votre Numéro de Suivi Unique
              </span>
              <div className="flex items-center justify-center space-x-3 mt-2">
                <span className="text-3xl sm:text-4xl font-mono font-black text-[#0a2342] tracking-wider">
                  {submissionResult.numeroSuivi}
                </span>
                <button
                  type="button"
                  onClick={copyTrackingNumber}
                  title="Copier le numéro"
                  className="p-2.5 rounded-xl bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 transition shadow-sm"
                >
                  {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Conservez ce numéro précieusement. Il vous sera demandé pour suivre l'avancement de votre adhésion.
              </p>
            </div>

            {/* Récapitulatif du candidat */}
            <div className="border border-gray-100 rounded-2xl p-6 space-y-4 bg-gray-50/50">
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
                Détails du dossier
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block text-xs">Candidat</span>
                  <span className="font-semibold text-gray-900">{civilite}. {prenom} {nom}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Date de soumission</span>
                  <span className="font-semibold text-gray-900">{submissionResult.submittedAt}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Filière & Promotion</span>
                  <span className="font-semibold text-gray-900">{filiere} (Promo {promotion})</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Résidence</span>
                  <span className="font-semibold text-gray-900">{ville}, {pays}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Courriel</span>
                  <span className="font-semibold text-gray-900">{courriel}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Téléphone</span>
                  <span className="font-semibold text-gray-900">{telephone}</span>
                </div>
                {justificatif && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block text-xs">Pièce justificative jointe</span>
                    <span className="font-semibold text-blue-700 flex items-center mt-0.5">
                      <FileText className="h-4 w-4 mr-1 text-blue-600" />
                      {justificatif.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3.5 px-4 border border-gray-300 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-center space-x-2"
              >
                <Printer className="h-4 w-4" />
                <span>Imprimer l'accusé de réception</span>
              </button>

              <Link
                href="/"
                className="flex-1 py-3.5 px-4 bg-[#0a2342] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Retour à l'accueil</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a2342] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-blue-800 flex items-center space-x-3 text-sm animate-fade-in">
          <Bookmark className="h-4 w-4 text-green-400" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white ml-2">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Sidebar gauche fixe */}
      <aside className="hidden lg:flex w-[340px] bg-[#0a2342] text-white flex-col fixed h-full z-10 shadow-2xl">
        <div className="p-8 flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="bg-white p-3 rounded-xl inline-block mb-10">
            <Link href="/">
              <img src="/images/logo.png" alt="ASIANIK" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Rejoignez le réseau des ingénieurs de l'ISTA
          </h1>
          <p className="text-blue-200 text-sm mb-12 leading-relaxed">
            Quelques minutes suffisent. Le Comité valide ensuite votre profil avant l'activation.
          </p>

          {/* Stepper (Navigation latérale interactive) */}
          <div className="space-y-8">
            {/* Étape 1 */}
            <button
              type="button"
              onClick={() => scrollToSection(1)}
              className="flex items-start text-left w-full group transition-all"
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep === 1
                    ? "bg-white text-[#0a2342] ring-4 ring-white/20"
                    : currentStep > 1
                    ? "bg-green-500 text-white"
                    : "border border-blue-400 text-blue-200"
                }`}
              >
                {currentStep > 1 ? <Check className="h-4 w-4" /> : 1}
              </div>
              <div className="ml-4">
                <p className={`font-bold text-sm ${currentStep === 1 ? "text-white" : "text-blue-200 group-hover:text-white"}`}>
                  Identité et contacts
                </p>
                <p className="text-blue-300 text-xs mt-0.5">Qui êtes-vous ?</p>
              </div>
            </button>

            {/* Étape 2 */}
            <button
              type="button"
              onClick={() => scrollToSection(2)}
              className="flex items-start text-left w-full group transition-all"
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep === 2
                    ? "bg-white text-[#0a2342] ring-4 ring-white/20"
                    : currentStep > 2
                    ? "bg-green-500 text-white"
                    : "border border-blue-400 text-blue-200"
                }`}
              >
                {currentStep > 2 ? <Check className="h-4 w-4" /> : 2}
              </div>
              <div className="ml-4">
                <p className={`font-bold text-sm ${currentStep === 2 ? "text-white" : "text-blue-200 group-hover:text-white"}`}>
                  Parcours à l'ISTA
                </p>
                <p className="text-blue-300 text-xs mt-0.5">Promotion, filière, justificatif</p>
              </div>
            </button>

            {/* Étape 3 */}
            <button
              type="button"
              onClick={() => scrollToSection(3)}
              className="flex items-start text-left w-full group transition-all"
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep === 3
                    ? "bg-white text-[#0a2342] ring-4 ring-white/20"
                    : currentStep > 3
                    ? "bg-green-500 text-white"
                    : "border border-blue-400 text-blue-200"
                }`}
              >
                {currentStep > 3 ? <Check className="h-4 w-4" /> : 3}
              </div>
              <div className="ml-4">
                <p className={`font-bold text-sm ${currentStep === 3 ? "text-white" : "text-blue-200 group-hover:text-white"}`}>
                  Situation professionnelle
                </p>
                <p className="text-blue-300 text-xs mt-0.5">Poste, compétences, disponibilité</p>
              </div>
            </button>

            {/* Étape 4 */}
            <button
              type="button"
              onClick={() => scrollToSection(4)}
              className="flex items-start text-left w-full group transition-all"
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep === 4
                    ? "bg-white text-[#0a2342] ring-4 ring-white/20"
                    : "border border-blue-400 text-blue-200"
                }`}
              >
                4
              </div>
              <div className="ml-4">
                <p className={`font-bold text-sm ${currentStep === 4 ? "text-white" : "text-blue-200 group-hover:text-white"}`}>
                  Consentements
                </p>
                <p className="text-blue-300 text-xs mt-0.5">Vos données, vos choix</p>
              </div>
            </button>
          </div>
        </div>

        {/* Support Card */}
        <div className="p-8 relative">
          <div className="bg-blue-950/60 p-4 rounded-xl border border-blue-800/80 backdrop-blur-sm relative z-10">
            <h4 className="font-bold text-sm mb-1 text-white">Besoin d'aide ?</h4>
            <p className="text-xs text-blue-200 leading-relaxed">
              Écrivez au secrétariat de l'association depuis la{" "}
              <Link href="/contact" className="underline hover:text-white">
                page Contact
              </Link>
              .
            </p>
          </div>
          {/* Formes décoratives (Rappel visuel) */}
          <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/3 pointer-events-none">
            <div className="w-64 h-96 bg-red-600 rotate-12 rounded-full opacity-90 mix-blend-multiply blur-2xl"></div>
          </div>
        </div>
      </aside>

      {/* Contenu Formulaire (Scrollable) */}
      <main className="flex-1 lg:ml-[340px] bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 lg:px-12 lg:py-12">
          {/* Titre & Progression */}
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2342]">Demande d'adhésion</h2>
              <p className="text-sm text-gray-500 mt-2">Les champs marqués d'un astérisque sont obligatoires.</p>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-sm font-medium text-gray-600">
                Étape <strong className="text-[#0a2342]">{currentStep}</strong> sur 4
              </span>
              <div className="w-36 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden flex">
                <div
                  className={`h-full bg-[#0a2342] transition-all duration-300 ${
                    currentStep === 1
                      ? "w-1/4"
                      : currentStep === 2
                      ? "w-2/4"
                      : currentStep === 3
                      ? "w-3/4"
                      : "w-full bg-red-600"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Message d'erreur s'il y a lieu */}
          {errorMsg && (
            <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Section 1 : Identité et contacts */}
            <section id="section-1" className="scroll-mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-6 w-6 rounded-full bg-[#0a2342] text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#0a2342]">Identité et contacts</h3>
                <div className="flex-1 h-px bg-gray-200 ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Civilité */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Civilité <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setCivilite("Mme")}
                      className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                        civilite === "Mme"
                          ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Mme
                    </button>
                    <div className="w-px bg-gray-300"></div>
                    <button
                      type="button"
                      onClick={() => setCivilite("M")}
                      className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                        civilite === "M"
                          ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      M.
                    </button>
                  </div>
                </div>

                {/* Nom */}
                <div className="md:col-span-4">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900 font-medium"
                  />
                </div>

                {/* Prénom */}
                <div className="md:col-span-5">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900 font-medium"
                  />
                </div>

                {/* Courriel */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Courriel <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={courriel}
                      onChange={(e) => setCourriel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm text-gray-900 pr-10 font-medium"
                    />
                    <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-[11px] text-green-600 mt-1 flex items-center">
                    <Check className="h-3 w-3 mr-1 inline" />
                    Adresse vérifiée par un code envoyé.
                  </p>
                </div>

                {/* Téléphone WhatsApp */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Téléphone (WhatsApp de préférence) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900 font-medium"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Un code de vérification sera envoyé par SMS.</p>
                </div>

                {/* Ville de résidence */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Ville de résidence <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900 bg-white font-medium"
                  >
                    <option value="Kolwezi">Kolwezi</option>
                    <option value="Lubumbashi">Lubumbashi</option>
                    <option value="Likasi">Likasi</option>
                    <option value="Kinshasa">Kinshasa</option>
                    <option value="Goma">Goma</option>
                    <option value="Autre">Autre ville</option>
                  </select>
                </div>

                {/* Pays */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Pays <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={pays}
                    onChange={(e) => setPays(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900 bg-white font-medium"
                  >
                    <option value="République démocratique du Congo">République démocratique du Congo</option>
                    <option value="Zambie">Zambie</option>
                    <option value="Afrique du Sud">Afrique du Sud</option>
                    <option value="Belgique">Belgique</option>
                    <option value="France">France</option>
                    <option value="Canada">Canada</option>
                    <option value="Autre">Autre pays</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section 2 : Parcours à l'ISTA */}
            <section id="section-2" className="scroll-mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-6 w-6 rounded-full bg-[#0a2342] text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#0a2342]">Parcours à l'ISTA</h3>
                <div className="flex-1 h-px bg-gray-200 ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Promotion */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Promotion (année de sortie) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={promotion}
                    onChange={(e) => setPromotion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm bg-white font-medium"
                  >
                    {Array.from({ length: 45 }, (_, i) => 2026 - i).map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filière */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Filière <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={filiere}
                    onChange={(e) => setFiliere(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm bg-white font-medium"
                  >
                    <option value="Génie électrique">Génie électrique</option>
                    <option value="Électromécanique">Électromécanique</option>
                    <option value="Mines et Carrières">Mines et Carrières</option>
                    <option value="Métallurgie Appliquée">Métallurgie Appliquée</option>
                    <option value="Informatique Appliquée">Informatique Appliquée</option>
                    <option value="Télécommunications">Télécommunications</option>
                  </select>
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Catégorie de membre <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categorieMembre}
                    onChange={(e) => setCategorieMembre(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm bg-white font-medium"
                  >
                    <option value="Ancien diplômé">Ancien diplômé</option>
                    <option value="Étudiant finissant">Étudiant finissant</option>
                    <option value="Membre d'honneur">Membre d'honneur</option>
                    <option value="Sympathisant">Sympathisant</option>
                  </select>
                </div>
              </div>

              {/* Justificatif */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Justificatif (diplôme ou attestation) <span className="text-red-500">*</span>
                </label>

                {/* Input caché de fichier */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                />

                {justificatif ? (
                  <div className="border border-dashed border-blue-300 bg-blue-50/50 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{justificatif.name}</p>
                        <p className="text-[11px] text-gray-500">{justificatif.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-blue-600 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition"
                      >
                        Remplacer
                      </button>
                      <button
                        type="button"
                        onClick={() => setJustificatif(null)}
                        title="Supprimer la pièce jointe"
                        className="p-2 text-gray-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition bg-gray-50/50 hover:bg-blue-50/30"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-700">Cliquez pour téléverser votre justificatif</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG ou PNG jusqu'à 10 Mo</p>
                  </div>
                )}
              </div>
            </section>

            {/* Section 3 : Situation professionnelle */}
            <section id="section-3" className="scroll-mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-6 w-6 rounded-full bg-[#0a2342] text-white flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#0a2342]">Situation professionnelle</h3>
                <div className="flex-1 h-px bg-gray-200 ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Employeur</label>
                  <input
                    type="text"
                    value={employeur}
                    onChange={(e) => setEmployeur(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm text-gray-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Fonction</label>
                  <input
                    type="text"
                    value={fonction}
                    onChange={(e) => setFonction(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm text-gray-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Secteur</label>
                  <select
                    value={secteur}
                    onChange={(e) => setSecteur(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm bg-white font-medium"
                  >
                    <option value="Mines et énergie">Mines et énergie</option>
                    <option value="BTP & Construction">BTP & Construction</option>
                    <option value="Télécommunications & IT">Télécommunications & IT</option>
                    <option value="Industrie & Métallurgie">Industrie & Métallurgie</option>
                    <option value="Enseignement & Recherche">Enseignement & Recherche</option>
                    <option value="Services & Conseil">Services & Conseil</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                {/* Compétences (Tags interactifs) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Compétences</label>
                  <input
                    type="text"
                    placeholder="Ajoutez une compétence puis Entrée"
                    value={newCompetence}
                    onChange={(e) => setNewCompetence(e.target.value)}
                    onKeyDown={handleAddCompetence}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm text-gray-900 mb-3"
                  />
                  <div className="flex flex-wrap gap-2">
                    {competences.map((comp) => (
                      <span
                        key={comp}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {comp}
                        <button
                          type="button"
                          onClick={() => removeCompetence(comp)}
                          className="ml-2 text-blue-400 hover:text-blue-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Disponibilité & Attentes */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Disponibilité pour l'association
                  </label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden mb-6">
                    {(["Ponctuelle", "Régulière", "Aucune"] as const).map((opt, idx) => (
                      <div key={opt} className="flex-1 flex">
                        {idx > 0 && <div className="w-px bg-gray-300"></div>}
                        <button
                          type="button"
                          onClick={() => setDisponibilite(opt)}
                          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                            disponibilite === opt
                              ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {opt}
                        </button>
                      </div>
                    ))}
                  </div>

                  <label className="block text-xs font-bold text-gray-700 mb-2">Vos attentes</label>
                  <textarea
                    rows={2}
                    value={attentes}
                    onChange={(e) => setAttentes(e.target.value)}
                    placeholder="Mentorat, réseau professionnel, commissions..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm text-gray-900 resize-none font-medium"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Section 4 : Consentements */}
            <section id="section-4" className="scroll-mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-6 w-6 rounded-full bg-[#0a2342] text-white flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <h3 className="text-lg font-bold text-[#0a2342]">Consentements</h3>
                <div className="flex-1 h-px bg-gray-200 ml-4"></div>
              </div>

              <div className="space-y-4">
                {/* Consent 1 (Obligatoire) */}
                <div className="flex items-start border border-red-200 bg-red-50/30 p-4 rounded-xl relative cursor-pointer" onClick={() => setConsentDonnees(!consentDonnees)}>
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={consentDonnees}
                      onChange={(e) => setConsentDonnees(e.target.checked)}
                      className="w-5 h-5 text-red-600 border-red-300 rounded accent-red-600 cursor-pointer"
                    />
                  </div>
                  <div className="ml-4 pr-24">
                    <p className="text-sm font-bold text-gray-900">Utilisation de mes données par l'association</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Gestion de mon adhésion, de mes cotisations et des communications officielles.
                    </p>
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-red-600 uppercase">
                    Obligatoire
                  </span>
                </div>

                {/* Consent 2 (Facultatif) */}
                <div className="flex items-start border border-gray-200 p-4 rounded-xl relative cursor-pointer" onClick={() => setConsentAnnuaire(!consentAnnuaire)}>
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={consentAnnuaire}
                      onChange={(e) => setConsentAnnuaire(e.target.checked)}
                      className="w-5 h-5 text-red-600 border-gray-300 rounded accent-red-600 cursor-pointer"
                    />
                  </div>
                  <div className="ml-4 pr-24">
                    <p className="text-sm font-bold text-gray-900">Apparaître dans l'annuaire des membres</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Seuls mon nom, ma spécialité et ma ville seront visibles des autres membres.
                    </p>
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-gray-500 uppercase">
                    Facultatif
                  </span>
                </div>

                {/* Consent 3 (Facultatif) */}
                <div className="flex items-start border border-gray-200 p-4 rounded-xl relative cursor-pointer" onClick={() => setConsentGalerie(!consentGalerie)}>
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={consentGalerie}
                      onChange={(e) => setConsentGalerie(e.target.checked)}
                      className="w-5 h-5 text-red-600 border-gray-300 rounded accent-red-600 cursor-pointer"
                    />
                  </div>
                  <div className="ml-4 pr-24">
                    <p className="text-sm font-bold text-gray-900">Utilisation de mon image dans la galerie</p>
                    <p className="text-xs text-gray-500 mt-1">Photos et vidéos des activités de l'association.</p>
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-gray-500 uppercase">
                    Facultatif
                  </span>
                </div>
              </div>
            </section>

            {/* Actions Finale */}
            <div className="border-t border-gray-200 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-start space-x-3 text-gray-500 text-xs max-w-sm mb-6 md:mb-0">
                <Shield className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <p>Vos données sont protégées. Votre état de cotisation n'est jamais public.</p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-6 py-3.5 bg-blue-50 text-blue-800 font-bold text-sm rounded-xl hover:bg-blue-100 transition shadow-sm"
                >
                  Enregistrer le brouillon
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 bg-[#d32f2f] text-white font-bold text-sm rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-600/20 flex items-center justify-center disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Traitement de la demande...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-center text-gray-500 mt-6 pb-10 leading-relaxed">
              Vous recevrez un accusé de réception avec un numéro de suivi, puis un message à l'activation de votre profil. <br />
              <strong className="text-[#0a2342]">ASIANIK · Un réseau, une force !</strong>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
