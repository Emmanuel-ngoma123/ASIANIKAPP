import Link from "next/link";
import { 
  FileText, 
  Calendar, 
  Briefcase, 
  Users, 
  UserPlus, 
  ArrowRight, 
  Shield, 
  Globe, 
  Award 
} from "lucide-react";

export default function Home() {
  const actualitesRecentes = [
    {
      id: 1,
      badge: "1",
      date: "23 déc. 2026",
      title: "Conférence Annuelle de l'ASIANIK 2026: L'Ingénieur face aux défis miniers",
      description: "Conférence Annuelle de l'ASIANIK 2026: L'ingénieur face aux défis miniers...",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      href: "/actualites/conference-annuelle-2026",
    },
    {
      id: 2,
      badge: "2",
      date: "25 déc. 2026",
      title: "Lancement du Programme de Mentorat pour les nouveaux Diplômés ISTA",
      description: "Lancement du Programme de Mentorat pour les nouveaux Diplômés ISTA, mentorat pour les nouveaux Diplômés ISTA...",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      href: "/actualites/programme-mentorat-diplomes",
    },
    {
      id: 3,
      badge: "3",
      date: "28 déc. 2026",
      title: "Visite Technique: Les Infrastructures de Kolwezi sous l'œil de l'ASIANIK",
      description: "Visite Technique: Les infrastructures de Kolwezi sous l'œil de l'ASIANIK...",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
      href: "/actualites/visite-technique-infrastructures-kolwezi",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0a2342] pt-32 pb-48 overflow-hidden">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/hero-engineer.png" 
            alt="Ingénieur sur le terrain" 
            className="w-full h-full object-cover object-[80%_center]"
          />
          {/* Dégradé horizontal (sombre à gauche, transparent à droite) pour lire le texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2342] via-[#0a2342]/70 sm:via-[#0a2342]/50 to-transparent"></div>
          {/* Dégradé vertical pour adoucir le bas */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2342] via-[#0a2342]/40 to-transparent"></div>
        </div>
        
        {/* Contenu du Hero */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-md">
              Ensemble pour un réseau plus fort
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed font-medium drop-shadow-md">
              L'ASIANIK, un espace d'échange, d'opportunités et de solidarité entre ingénieurs de l'ISTA/Kolwezi.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/inscription" className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-1">
                <UserPlus className="h-5 w-5" />
                <span>Rejoindre le Réseau</span>
              </Link>
              <Link href="/a-propos" className="border border-white/50 bg-black/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-[#0a2342] hover:border-white transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-1">
                <span>Découvrir l'ASIANIK</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section : Actualités Récentes (Conforme à l'image 2) */}
      <section className="relative -mt-20 z-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Actualités Récentes
              </h2>
              <Link 
                href="/actualites" 
                className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center transition"
              >
                <span>Voir tout</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {actualitesRecentes.map((actu) => (
                <article 
                  key={actu.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                  {/* Image avec Badge Numéroté rouge */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={actu.image} 
                      alt={actu.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge rouge avec numéro */}
                    <div className="absolute top-0 left-0 bg-red-600 text-white font-bold text-sm px-3.5 py-1.5 rounded-br-xl shadow-md">
                      {actu.badge}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs text-gray-500 font-medium mb-2 block">
                      {actu.date}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition line-clamp-2 mb-2 leading-snug">
                      {actu.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                      {actu.description}
                    </p>

                    <div className="mt-auto pt-2">
                      <Link 
                        href="/actualites"
                        className="inline-flex items-center text-xs font-bold text-gray-900 hover:text-red-600 transition"
                      >
                        <span>Lire Plus</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5 text-red-600" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section des Modules / Services */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Explorez nos modules</h2>
            <p className="text-gray-600 mt-2">Tout ce dont vous avez besoin pour booster votre carrière et rester connecté.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Module : Actualités & Événements */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Globe className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Actualités & Événements</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                Restez informé des dernières nouvelles de l'association, participez aux conférences, et ne manquez aucune rencontre de la communauté.
              </p>
              <div className="flex space-x-4">
                <Link href="/actualites" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center">
                  Actualités <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                <Link href="/evenements" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center">
                  Événements <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Module : Opportunités (Mise en avant) */}
            <div className="bg-gradient-to-br from-[#0a2342] to-blue-900 rounded-3xl p-8 shadow-xl shadow-blue-900/20 border border-blue-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 bg-blue-500/20 w-32 h-32 rounded-full blur-2xl"></div>
              <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Opportunités de Carrière</h3>
              <p className="text-blue-100 mb-6 leading-relaxed relative z-10 text-sm">
                Accédez à des offres d'emploi exclusives, des stages, et des appels d'offres partagés directement par et pour les ingénieurs de notre réseau.
              </p>
              <Link href="/opportunites" className="inline-flex items-center text-sm font-bold text-white hover:text-red-400 transition-colors relative z-10">
                Consulter les offres <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Module : Annuaire */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                <Users className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Annuaire des Membres</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                Retrouvez vos anciens camarades de promotion, développez votre réseau professionnel et identifiez des experts dans divers domaines.
              </p>
              <Link href="/annuaire" className="inline-flex items-center text-sm font-bold text-green-600 hover:text-green-800 transition-colors">
                Parcourir l'annuaire <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Module : Espace Membre */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group lg:col-span-2 flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 pr-0 md:pr-8">
                <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <Shield className="h-8 w-8 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Espace Membre & Cotisations</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  Gérez votre profil numérique, réglez vos cotisations annuelles de manière sécurisée (Mobile Money, Banque) et accédez à vos documents officiels.
                </p>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0 flex flex-col space-y-3 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <Link href="/login" className="bg-[#0a2342] text-white text-center font-bold px-6 py-3.5 rounded-xl hover:bg-blue-900 transition-colors w-full shadow-md">
                  Accéder à mon espace
                </Link>
                <Link href="/inscription" className="bg-gray-100 text-gray-700 text-center font-bold px-6 py-3.5 rounded-xl hover:bg-gray-200 transition-colors w-full">
                  Créer un compte
                </Link>
              </div>
            </div>

            {/* Module : Commissions */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Award className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Commissions d'Experts</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                Rejoignez des groupes de travail spécialisés, comme la Ligue des femmes, et participez activement au rayonnement de l'association.
              </p>
              <Link href="/commissions" className="inline-flex items-center text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
                Voir les commissions <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
