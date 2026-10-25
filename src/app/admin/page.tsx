import Link from "next/link";
import { 
  Users, 
  CreditCard, 
  Calendar, 
  MessageSquare, 
  UserCheck, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle,
  FileText
} from "lucide-react";
import { getAllAdhesions } from "@/lib/adhesionsStore";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const adhesions = await getAllAdhesions();
  const pendingAdhesions = adhesions.filter((a) => a.statut === "en_attente");
  const pendingCount = pendingAdhesions.length;
  const latestAdhesion = pendingAdhesions[0] || adhesions[0];

  const stats = [
    { 
      name: "Membres inscrits", 
      value: "1 248", 
      subtext: "+12% ce mois", 
      icon: Users, 
      color: "bg-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50"
    },
    { 
      name: "Événements organisés", 
      value: "12", 
      subtext: "2 à venir", 
      icon: Calendar, 
      color: "bg-purple-600",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50"
    },
    { 
      name: "Cotisations perçues", 
      value: "846 USD", 
      subtext: "Objectif 2026 : 1 500 USD", 
      icon: CreditCard, 
      color: "bg-emerald-600",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50"
    },
    { 
      name: "Messages & Échanges", 
      value: "3 420", 
      subtext: "+18 nouveaux aujourd'hui", 
      icon: MessageSquare, 
      color: "bg-orange-500",
      textColor: "text-orange-500",
      bgLight: "bg-orange-50"
    },
  ];

  const recentActions = [
    ...(latestAdhesion ? [{
      id: 1,
      title: "Nouvelle demande d'adhésion reçue",
      detail: `${latestAdhesion.prenom} ${latestAdhesion.nom} (${latestAdhesion.filiere} - Promo ${latestAdhesion.promotion})`,
      time: "Récent",
      type: "adhesion"
    }] : []),
    { id: 2, title: "Paiement de cotisation déclaré", detail: "50 USD via Orange Money par Marc Ilunga", time: "Il y a 2 heures", type: "cotisation" },
    { id: 3, title: "Nouvel article publié", detail: "Visite Technique: Les Infrastructures de Kolwezi", time: "Hier à 16:30", type: "article" },
    { id: 4, title: "Message formulaire de contact", detail: "Demande d'information pour la commission Énergie", time: "Hier à 11:15", type: "message" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Alerte adhésions en attente */}
      {pendingCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-sm">
                {pendingCount} demande{pendingCount > 1 ? "s" : ""} d'adhésion en attente de validation
              </h3>
              <p className="text-xs text-amber-700 mt-0.5">
                Dossier récent : <strong>{latestAdhesion?.prenom} {latestAdhesion?.nom}</strong> ({latestAdhesion?.filiere})
              </p>
            </div>
          </div>
          <Link 
            href="/admin/adhesions" 
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Examiner les dossiers ({pendingCount})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* 4 KPIs clés Module F */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bgLight} ${stat.textColor}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                2026
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.name}</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center">
                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                {stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique d'activité & Actions Récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Graphique d'activité mensuelle */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Activité mensuelle de l'association</h3>
              <p className="text-xs text-gray-400 mt-0.5">Évolution des adhésions et cotisations validées en 2026</p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">
              En progression
            </span>
          </div>

          {/* Simulation visuelle de graphique à barres moderne */}
          <div className="h-56 flex items-end justify-between gap-2 pt-8 px-2 border-b border-gray-100 pb-4">
            {[
              { month: "Jan", val: 35 },
              { month: "Fév", val: 45 },
              { month: "Mar", val: 60 },
              { month: "Avr", val: 55 },
              { month: "Mai", val: 70 },
              { month: "Juin", val: 85 },
              { month: "Juil", val: 95 },
              { month: "Août", val: 75 },
              { month: "Sep", val: 110 },
              { month: "Oct", val: 130 },
            ].map((item, idx) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                    idx === 9 ? "bg-red-600 shadow-md shadow-red-600/30" : "bg-[#0a2342] group-hover:bg-blue-700"
                  }`}
                  style={{ height: `${(item.val / 140) * 100}%` }}
                ></div>
                <span className="text-[11px] font-bold text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 text-xs text-gray-500">
            <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#0a2342] mr-2"></span> Adhésions régulières</span>
            <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-red-600 mr-2"></span> Mois en cours (Octobre)</span>
            <span className="font-bold text-gray-900">Total dossiers enregistrés : {adhesions.length}</span>
          </div>
        </div>

        {/* Actions Récentes & Audit */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Actions récentes</h3>
              <Link href="/admin/journal" className="text-xs text-blue-600 font-bold hover:underline">
                Journal
              </Link>
            </div>

            <div className="space-y-4">
              {recentActions.map((action) => (
                <div key={action.id} className="flex items-start space-x-3 text-xs p-2.5 rounded-xl hover:bg-gray-50 transition">
                  <div className={`p-2 rounded-lg text-white mt-0.5 ${
                    action.type === 'adhesion' ? 'bg-amber-500' :
                    action.type === 'cotisation' ? 'bg-emerald-600' :
                    action.type === 'article' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {action.type === 'adhesion' ? <UserCheck className="h-3.5 w-3.5" /> :
                     action.type === 'cotisation' ? <CreditCard className="h-3.5 w-3.5" /> :
                     action.type === 'article' ? <FileText className="h-3.5 w-3.5" /> :
                     <MessageSquare className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{action.title}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5 line-clamp-1">{action.detail}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{action.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <Link 
              href="/admin/adhesions" 
              className="w-full py-3 bg-[#0a2342] hover:bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition shadow-md"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Gérer les validations ({pendingCount})</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
