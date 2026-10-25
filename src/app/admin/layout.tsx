import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  CreditCard, 
  FileText, 
  Calendar, 
  Briefcase, 
  MessageSquare, 
  History, 
  Settings, 
  LogOut,
  ExternalLink
} from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let userEmail = "admin@asianik.org";

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email) {
      userEmail = user.email;
    }
  } catch {
    // Mode développement résilient
  }

  const navigation = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Demandes d'adhésion", href: "/admin/adhesions", icon: UserCheck, badge: "3" },
    { name: "Membres enregistrés", href: "/admin/membres", icon: Users },
    { name: "Cotisations & Finances", href: "/admin/cotisations", icon: CreditCard },
    { name: "Actualités", href: "/admin/actualites", icon: FileText },
    { name: "Événements", href: "/admin/evenements", icon: Calendar },
    { name: "Opportunités", href: "/admin/opportunites", icon: Briefcase },
    { name: "Messages & Réclamations", href: "/admin/formulaires", icon: MessageSquare },
    { name: "Journal d'audit", href: "/admin/journal", icon: History },
    { name: "Paramètres", href: "/admin/parametres", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* Sidebar Administration */}
      <aside className="w-72 bg-[#0a2342] text-white flex flex-col shadow-2xl z-20">
        
        {/* Logo & Badge Admin */}
        <div className="p-6 border-b border-blue-900/60 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition">
            <img src="/images/logo.png" alt="ASIANIK" className="h-8 w-auto bg-white rounded p-1 object-contain" />
            <span className="text-white font-extrabold text-sm tracking-wider uppercase">Pilotage Admin</span>
          </Link>
          <Link href="/" title="Voir le site public" className="text-blue-300 hover:text-white p-2">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        {/* Profil Admin */}
        <div className="px-6 py-4 flex items-center space-x-3 border-b border-blue-900/40 bg-blue-950/40">
          <div className="h-9 w-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Administrateur Principal</p>
            <p className="text-[11px] text-blue-300 truncate">{userEmail}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-blue-900/50 transition-all text-blue-100 hover:text-white text-sm font-medium group"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-4 w-4 text-blue-300 group-hover:text-white transition-colors" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Pied de sidebar */}
        <div className="p-4 border-t border-blue-900/50">
          <Link 
            href="/login" 
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-600/15 hover:bg-red-600 hover:text-white text-red-400 transition-all text-xs font-bold w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 h-16 flex items-center justify-between px-8 z-10">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <h1 className="text-base font-bold text-gray-800">Système de Gestion & Pilotage ASIANIK</h1>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold text-gray-500">
            <span>Kolwezi, RDC</span>
            <span>•</span>
            <span>Année 2026-2027</span>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
