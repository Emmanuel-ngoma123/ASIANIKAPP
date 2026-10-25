"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Institutionnel",
    status: "published",
    content: ""
  });

  // Générer un slug (URL amicale) à partir du titre
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const slug = generateSlug(formData.title);

    // On récupère l'utilisateur connecté pour l'assigner comme auteur
    const { data: { user } } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("posts").insert([
      {
        title: formData.title,
        slug: slug,
        content: formData.content,
        category: formData.category,
        status: formData.status,
        author_id: user?.id,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      }
    ]);

    if (insertError) {
      console.error(insertError);
      setError("Une erreur est survenue lors de la création. Le titre est peut-être déjà utilisé.");
      setLoading(false);
    } else {
      router.push("/admin/actualites");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/admin/actualites" className="text-gray-500 hover:text-gray-700 mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Créer une actualité</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'article *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Assemblée générale extraordinaire"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Institutionnel">Institutionnel</option>
              <option value="Événement">Événement</option>
              <option value="Commission">Commission</option>
              <option value="Communiqué">Communiqué</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="published">Publié (Visible en ligne)</option>
              <option value="draft">Brouillon (Caché)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenu de l'article *</label>
            <textarea
              required
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-sans"
              placeholder="Rédigez votre article ici..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">Pour le MVP, le texte brut est utilisé. Un éditeur de texte enrichi pourra être ajouté en Phase 2.</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.push("/admin/actualites")}
            className="mr-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center disabled:opacity-50"
          >
            {loading ? "Sauvegarde..." : (
              <>
                <Save className="w-4 h-4 mr-2" /> Enregistrer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
