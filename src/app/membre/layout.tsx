import Link from "next/link";
import { User, FileText, CreditCard, Calendar, MessageSquare, Users, Settings, LogOut } from "lucide-react";

export default function MembreLayout({ children }: { children: React.ReactNode }) {
  const navigation = [
    { name: "Mon profil", href: "/membre", icon: User },
    { name: "Documents", href: "/membre/documents", icon: FileText },
    { name: "Cotisations", href: "/membre/cotisations", icon: CreditCard },
    { name: "Événements", href: "/membre/evenements", icon: Calendar },
    { name: "Messages", href: "/membre/messages", icon: MessageSquare },
    { name: "Annuaire", href: "/membre/annuaire", icon: Users },
    { name: "Paramètres", href: "/membre/parametres", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Reprend le design sombre du mockup */}
      <aside className="w-72 bg-[#0a2342] text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-blue-900/50">
          <Link href="/" className="flex items-center space-x-3 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
            <img src="/images/logo.png" alt="ASIANIK Logo" className="h-8 w-auto bg-white rounded p-1 object-contain" />
            <span className="text-white font-bold text-sm tracking-wider uppercase">Espace Membre</span>
          </Link>
        </div>
        
        {/* User Mini-Profile */}
        <div className="p-6 flex items-center space-x-4 border-b border-blue-900/50">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Jean Dupont" 
              className="h-14 w-14 rounded-full object-cover border-2 border-green-500"
            />
            <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-[#0a2342]"></span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Jean Dupont</h2>
            <p className="text-xs text-blue-300 font-medium">Membre Actif</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3.5 rounded-xl hover:bg-blue-800/50 transition-all text-gray-300 hover:text-white group"
            >
              <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-blue-900/50">
          <Link href="/" className="flex items-center justify-center space-x-3 px-4 py-3 rounded-xl bg-red-600/10 hover:bg-red-600 hover:text-white text-red-400 transition-all w-full font-bold text-sm group">
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header simple */}
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-10 z-10 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Bonjour Jean ! 👋</h1>
          <div className="flex items-center space-x-4">
             <button className="relative p-2 text-gray-400 hover:text-blue-600 transition">
               <MessageSquare className="h-6 w-6" />
               <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
             </button>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto p-10 bg-[#f8fafc]">
          {children}
        </div>
      </main>
    </div>
  );
}
