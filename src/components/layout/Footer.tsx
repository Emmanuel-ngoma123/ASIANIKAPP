import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <img src="/images/logo.png" alt="ASIANIK Logo" className="h-10 w-auto object-contain bg-white rounded p-1" />
            </Link>
            <p className="text-gray-400 text-sm">
              Association des Ingénieurs Anciens de l'ISTA/Kolwezi.
              Connecter, rassembler et servir nos membres pour un impact communautaire durable.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-300">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/a-propos" className="hover:text-white transition">Notre Histoire</Link></li>
              <li><Link href="/actualites" className="hover:text-white transition">Actualités & Événements</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Nous Contacter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-300">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>ISTA Kolwezi, RDC</li>
              <li>contact@asianik.org</li>
              <li>+243 XX XXX XX XX</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ASIANIK. Tous droits réservés.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link href="/confidentialite" className="hover:text-white transition">Confidentialité</Link>
            <Link href="/conditions" className="hover:text-white transition">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
