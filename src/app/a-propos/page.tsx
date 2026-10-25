export default function AboutPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            À propos de l'ASIANIK
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Histoire, mission et vision de l'Association des Ingénieurs Anciens de l'ISTA/Kolwezi.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Histoire</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fondée par les anciens diplômés de l'Institut Supérieur de Techniques Appliquées (ISTA) de Kolwezi, 
                l'ASIANIK est née de la volonté de maintenir un lien fort entre les différentes générations d'ingénieurs. 
                Depuis sa création, l'association a œuvré pour le rayonnement de l'ingénierie en RDC.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Notre Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connecter, rassembler et servir. Nous visons à soutenir le développement professionnel de nos membres, 
                à promouvoir l'excellence technique et à contribuer activement au développement socio-économique de notre région.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nos Valeurs</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span className="text-gray-700"><strong>Excellence</strong> - Valoriser la compétence et le savoir-faire technique.</span>
                </li>
                <li className="flex">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span className="text-gray-700"><strong>Solidarité</strong> - Créer un réseau d'entraide entre anciens et nouveaux diplômés.</span>
                </li>
                <li className="flex">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span className="text-gray-700"><strong>Intégrité</strong> - Agir avec éthique et transparence dans toutes nos actions.</span>
                </li>
                <li className="flex">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span className="text-gray-700"><strong>Innovation</strong> - Encourager les solutions nouvelles face aux défis de notre société.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
