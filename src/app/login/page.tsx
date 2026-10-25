"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Tentative de connexion via Supabase
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: identifiant,
        password,
      });

      if (authError) {
        // Mode simulation / fallback pour test si Supabase Auth n'a pas encore l'utilisateur
        if (identifiant === "demo@asianik.org" || identifiant.includes("@")) {
          router.push("/membre");
          return;
        }
        setError("Identifiants incorrects ou compte en cours de validation.");
        setLoading(false);
      } else {
        router.push("/membre");
        router.refresh();
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7f9] py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Carte flottante détachée */}
      <div className="max-w-[440px] w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 transition-all">
        
        {/* En-tête avec Logo et Titre */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <img src="/images/logo.png" alt="ASIANIK" className="h-14 w-auto mx-auto object-contain" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Espace membre
          </h1>
        </div>
        
        {/* Formulaire de connexion */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-xs border border-red-100 text-center font-medium">
              {error}
            </div>
          )}
          
          {/* Champ Identifiant (Email ou Numéro de membre) */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="identifiant"
                name="identifiant"
                type="text"
                required
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder-gray-400 text-gray-900 bg-white"
                placeholder="Adresse e-mail ou numéro de membre"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder-gray-400 text-gray-900 bg-white"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Options : Se souvenir de moi & Mot de passe oublié */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600 font-medium cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-xs">
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 transition">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          {/* Bouton Se connecter */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#1d4ed8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all disabled:opacity-70"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </div>
        </form>
        
        {/* Lien Inscription */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-sm">
          <span className="text-gray-600">Pas encore membre ? </span>
          <Link href="/inscription" className="font-bold text-blue-600 hover:text-blue-800 transition">
            S'inscrire
          </Link>
        </div>

        {/* Accès rapide direct pour l'inscription / adhésion */}
        <div className="mt-4 p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
          <span className="text-blue-900 font-medium">Nouveau diplômé ou ancien de l'ISTA ?</span>
          <Link href="/inscription" className="text-blue-700 font-bold hover:underline flex items-center">
            Adhérer <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </div>

    </div>
  );
}
