import { Download, Edit3, ShieldCheck } from "lucide-react";

export default function MembreProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header de section */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Mon profil</h2>
        <p className="text-gray-500 mt-2">Gérez vos informations personnelles et votre statut au sein de l'ASIANIK.</p>
      </div>

      {/* Carte Numérique & Statut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Carte Numérique */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
            
            {/* Décoration carte */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 z-0"></div>
            
            <div className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-8">
                <img src="/images/logo.png" alt="ASIANIK Logo" className="h-10 w-auto" />
                <span className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Statut : À jour</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&h=250&q=80" 
                  alt="Jean Dupont" 
                  className="h-28 w-28 rounded-xl object-cover shadow-md border-4 border-white"
                />
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Jean Dupont</h3>
                  <p className="text-blue-600 font-semibold mb-2">Ingénieur • Promo 2016</p>
                  <p className="text-gray-500 text-sm font-mono bg-gray-100 px-2 py-1 rounded inline-block">ID: AS2410K</p>
                </div>
              </div>
              
            </div>
            
            <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 flex justify-between items-center relative z-10">
              <span className="text-sm text-gray-500 font-medium">Prochaine échéance : 30 déc. 2026</span>
              <button className="flex items-center space-x-2 text-blue-700 font-bold hover:text-blue-800 transition">
                <Download className="h-4 w-4" />
                <span className="text-sm">Ma carte membre</span>
              </button>
            </div>
          </div>
        </div>

        {/* Détails rapides */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900">Informations de contact</h4>
              <button className="text-gray-400 hover:text-blue-600"><Edit3 className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-gray-500">Email</span>
                <span className="font-medium text-gray-900">jean.dupont@email.com</span>
              </div>
              <div>
                <span className="block text-gray-500">Téléphone</span>
                <span className="font-medium text-gray-900">+243 81 000 0000</span>
              </div>
              <div>
                <span className="block text-gray-500">Ville actuelle</span>
                <span className="font-medium text-gray-900">Kolwezi, RDC</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
