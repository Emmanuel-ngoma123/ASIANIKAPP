import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  // On redirige vers la page d'accueil après déconnexion
  redirect("/");
}
