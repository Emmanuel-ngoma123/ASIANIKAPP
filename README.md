# ASIANIK - Plateforme Web et Gestion des Membres

Ce projet est la plateforme officielle de l'ASIANIK (Association des Ingénieurs Anciens de l'ISTA/Kolwezi).
Il inclut un site public (vitrine) et un espace d'administration (Phase 1 - MVP).

## Technologies
- **Front-end** : Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Back-end & Base de données** : Supabase (PostgreSQL, Authentification, Storage)
- **Icônes** : Lucide React

## Installation en développement

1. **Cloner ou ouvrir le projet**
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Configuration de Supabase**
   - Créez un projet sur [Supabase](https://supabase.com).
   - Exécutez le script SQL présent dans `supabase/schema.sql` dans l'éditeur SQL de Supabase pour créer les tables.
   - Copiez le fichier `.env.example` en `.env.local` et remplissez les variables avec vos clés API Supabase :
     ```env
     NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
     ```
4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```
   Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## Déploiement

Le projet est conçu pour être déployé sur **Vercel** de manière optimale :
1. Créez un compte sur Vercel et importez ce dépôt GitHub.
2. Ajoutez les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`) dans les paramètres du projet Vercel.
3. Déployez.

## Guide d'Administration (Phase 1)
Pour accéder à l'administration :
1. Créez un compte depuis l'interface ou ajoutez un utilisateur manuellement via Supabase Auth.
2. Dans la table `users`, mettez à jour la colonne `role` de votre utilisateur à `'admin'`.
3. Connectez-vous sur le site et accédez à `/admin`.

*Note : Les étapes de création et d'authentification seront implémentées dans le prochain module.*
