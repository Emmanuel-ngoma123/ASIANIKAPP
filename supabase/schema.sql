-- ==============================================================================
-- ASIANIK - Schéma de base de données PostgreSQL / Supabase
-- Plateforme Officielle de l'Association des Ingénieurs Anciens de l'ISTA/Kolwezi
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE DES PROFILS UTILISATEURS (Liée à auth.users de Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  civilite TEXT CHECK (civilite IN ('M', 'Mme')),
  telephone TEXT,
  ville TEXT,
  pays TEXT DEFAULT 'République démocratique du Congo',
  promotion INTEGER,
  filiere TEXT,
  categorie_membre TEXT DEFAULT 'Ancien diplômé',
  employeur TEXT,
  fonction TEXT,
  secteur TEXT,
  competences TEXT[],
  disponibilite TEXT DEFAULT 'Régulière',
  attentes TEXT,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'actif', 'inactif', 'suspendu')),
  role TEXT DEFAULT 'membre' CHECK (role IN ('membre', 'responsable_commission', 'editeur', 'tresorier', 'admin')),
  consent_annuaire BOOLEAN DEFAULT TRUE,
  consent_galerie BOOLEAN DEFAULT FALSE,
  photo_url TEXT,
  carte_membre_url TEXT
);

-- 3. TABLE DES DEMANDES D'ADHÉSION
CREATE TABLE IF NOT EXISTS public.adhesions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  numero_suivi TEXT UNIQUE NOT NULL,
  civilite TEXT CHECK (civilite IN ('M', 'Mme')),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  courriel TEXT NOT NULL,
  telephone TEXT NOT NULL,
  ville_residence TEXT NOT NULL,
  pays TEXT NOT NULL DEFAULT 'République démocratique du Congo',
  promotion INTEGER NOT NULL,
  filiere TEXT NOT NULL,
  categorie_membre TEXT NOT NULL DEFAULT 'Ancien diplômé',
  justificatif_nom TEXT,
  justificatif_url TEXT,
  justificatif_taille TEXT,
  employeur TEXT,
  fonction TEXT,
  secteur TEXT,
  competences TEXT[],
  disponibilite TEXT DEFAULT 'Régulière',
  attentes TEXT,
  consent_donnees BOOLEAN NOT NULL DEFAULT TRUE,
  consent_annuaire BOOLEAN DEFAULT TRUE,
  consent_galerie BOOLEAN DEFAULT FALSE,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('brouillon', 'en_attente', 'validee', 'rejetee')),
  commentaires_admin TEXT,
  traite_par UUID REFERENCES auth.users(id)
);

-- 4. TABLE DES ARTICLES ET ACTUALITÉS (Module B)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Institutionnel',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ,
  image_url TEXT
);

-- 5. TABLE DES COTISATIONS ET PAIEMENTS (Module D)
CREATE TABLE IF NOT EXISTS public.cotisations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  nom_membre TEXT,
  annee_cotisation TEXT NOT NULL,
  montant NUMERIC NOT NULL DEFAULT 50.00,
  devise TEXT NOT NULL DEFAULT 'USD',
  methode_paiement TEXT CHECK (methode_paiement IN ('Orange Money', 'Airtel Money', 'M-Pesa', 'IllicoCash', 'Virement')),
  reference_transaction TEXT,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'valide', 'rejete')),
  recu_url TEXT,
  valide_par UUID REFERENCES auth.users(id),
  valide_le TIMESTAMPTZ
);

-- 6. POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adhesions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cotisations ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture / écriture
-- Adhésions : Tout visiteur peut créer une adhésion (demande)
CREATE POLICY "Insertion publique des demandes d'adhésion" 
  ON public.adhesions FOR INSERT 
  WITH CHECK (true);

-- Adhésions : Lecture de sa propre demande via numéro de suivi ou par les admins
CREATE POLICY "Lecture des adhésions pour les admins" 
  ON public.adhesions FOR SELECT 
  TO authenticated 
  USING (true);

-- Posts : Tout le monde peut lire les articles publiés
CREATE POLICY "Lecture publique des articles publiés" 
  ON public.posts FOR SELECT 
  USING (status = 'published');

-- 7. BUCKETS DE STORAGE (SUPABASE STORAGE)
-- 'justificatifs' pour les diplômes et attestations
-- 'photos' pour les photos de profil
-- 'recus' pour les reçus de cotisation
