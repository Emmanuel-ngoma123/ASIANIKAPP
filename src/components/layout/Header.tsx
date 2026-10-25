import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo et texte */}
          <div className="flex flex-col justify-center flex-shrink-0">
            <Link href="/" className="flex flex-col items-start">
              <img src="/images/logo.png" alt="ASIANIK Logo" className="h-16 w-auto object-contain" />
              <span className="text-xs text-[#0a2342] font-bold mt-1 tracking-tight hidden sm:block">
                Association des Ingénieurs Anciens de l'ISTA/Kolwezi
              </span>
            </Link>
          </div>

          {/* Navigation principale */}
          <nav className="hidden lg:flex flex-1 justify-center space-x-6 xl:space-x-8 items-center">
            <Link 
              href="/" 
              className="text-red-700 font-bold border-b-2 border-red-700 pb-1 px-1 text-sm transition-colors whitespace-nowrap"
            >
              Accueil
            </Link>
            <Link href="/a-propos" className="text-gray-700 hover:text-blue-700 px-1 py-1 text-sm font-semibold transition-colors whitespace-nowrap">
              À propos
            </Link>
            <Link href="/actualites" className="text-gray-700 hover:text-blue-700 px-1 py-1 text-sm font-semibold transition-colors whitespace-nowrap">
              Actualités
            </Link>
            <Link href="/evenements" className="text-gray-700 hover:text-blue-700 px-1 py-1 text-sm font-semibold transition-colors whitespace-nowrap">
              Événements
            </Link>
            <Link href="/commissions" className="text-gray-700 hover:text-blue-700 px-1 py-1 text-sm font-semibold transition-colors whitespace-nowrap">
              Commissions
            </Link>
            <Link href="/ressources" className="text-gray-700 hover:text-blue-700 px-1 py-1 text-sm font-semibold transition-colors whitespace-nowrap">
              Ressources
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-700 px-1 py-1 text-sm font-semibold transition-colors whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Bouton Connexion Espace Membre */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link 
              href="/login" 
              className="bg-[#0a2342] hover:bg-blue-900 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Connexion Espace Membre
            </Link>
          </div>
          
          {/* Menu mobile */}
          <div className="flex items-center lg:hidden space-x-3">
            <Link 
              href="/login" 
              className="bg-[#0a2342] text-white font-bold text-xs px-3.5 py-2 rounded-lg"
            >
              Espace Membre
            </Link>
            <button className="text-gray-500 hover:text-blue-600 p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
