import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const defaultNews = [
    {
      id: "1",
      badge: "1",
      title: "Conférence Annuelle de l'ASIANIK 2026: L'Ingénieur face aux défis miniers",
      content: "Conférence Annuelle de l'ASIANIK 2026: L'ingénieur face aux défis miniers, retours d'expérience et perspectives de développement pour les ingénieurs de l'ISTA/Kolwezi...",
      published_at: "2026-12-23",
      category: "Événement",
      image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      badge: "2",
      title: "Lancement du Programme de Mentorat pour les nouveaux Diplômés ISTA",
      content: "Lancement du Programme de Mentorat pour les nouveaux Diplômés ISTA. Un accompagnement personnalisé par des ingénieurs séniors dans l'industrie...",
      published_at: "2026-12-25",
      category: "Programme",
      image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      badge: "3",
      title: "Visite Technique: Les Infrastructures de Kolwezi sous l'œil de l'ASIANIK",
      content: "Visite Technique: Les infrastructures de Kolwezi sous l'œil de l'ASIANIK. Analyse des grands chantiers et des réseaux électriques industriels du Lualaba...",
      published_at: "2026-12-28",
      category: "Technique",
      image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    },
  ];

  let displayNews = defaultNews;

  try {
    const supabase = await createClient();
    const { data: news } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (news && news.length > 0) {
      displayNews = news.map((item, idx) => ({
        id: item.id,
        badge: (idx + 1).toString(),
        title: item.title,
        content: item.content,
        published_at: item.published_at || item.created_at,
        category: item.category || "Institutionnel",
        image_url: item.image_url || defaultNews[idx % defaultNews.length].image_url,
      }));
    }
  } catch {
    // fallback
  }

  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Actualités officielles
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2342] mt-3">
            Actualités de l'ASIANIK
          </h1>
          <p className="mt-2 text-base text-gray-600 max-w-2xl">
            Retrouvez les dernières informations, conférences, visites techniques et opportunités de notre communauté.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayNews.map((item) => (
            <article 
              key={item.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-0 left-0 bg-red-600 text-white font-bold text-sm px-3.5 py-1.5 rounded-br-xl shadow-md">
                  {item.badge}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  <span>{new Date(item.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition line-clamp-2 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                  {item.content}
                </p>

                <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="inline-flex items-center text-xs font-bold text-gray-900 group-hover:text-red-600 transition">
                    <span>Lire Plus</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5 text-red-600" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
