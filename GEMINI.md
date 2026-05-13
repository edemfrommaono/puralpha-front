# GEMINI.md — Mémoire Projet

## 1. Identité
- **Nom** : PureAlpha (puralpha-front)
- **Description** : Application front-end Next.js (App Router)
- **Statut** : Prototype / Initialisation

## 2. Stack technique
- **Framework** : Next.js (^16.2.6)
- **Vue / UI** : React & React DOM (^18.2.0)
- **Langage** : TypeScript (^5.4.0)
- **Styling** : Tailwind CSS (^3.4.3), PostCSS (^8.4.38)
- **Icônes** : lucide-react (^0.370.0)
- **Qualité de code** : ESLint (^8.57.0)

## 3. Architecture
```text
puralpha-front/
├── app/                  # Pages Next.js, Layouts et Routing
│   ├── contact/          # Route /contact
│   └── services/         # Route /services
├── components/           # Composants React réutilisables
│   ├── layout/           # Composants structurels (Header, Footer)
│   ├── sections/         # Sections de pages
│   └── ui/               # Composants d'interface génériques (boutons, inputs)
├── lib/                  # Utilitaires, fonctions partagées, helpers
├── public/               # Fichiers statiques (images, polices, favicons)
└── styles/               # Feuilles de style globales (globals.css)
```

## 4. Conventions de code
- **Nommage** :
  - Fichiers de routage Next.js : kebab-case (`layout.tsx`, `page.tsx`).
  - Fonctions de Composants React : PascalCase (ex: `RootLayout`).
  - Variables/Fonctions classiques : camelCase.
- **Imports** : Utilisation de l'alias absolu `@/` ciblant la racine du projet (`./`).
- **Styling** : Utilisation exclusive des classes utilitaires de Tailwind CSS (`className="..."`).
- **Erreurs** : Utilisation des mécanismes Next.js App Router (fichier global `not-found.tsx`).
- **Typage** : Mode strict de TypeScript activé (`"strict": true`).

## 5. Flux de données principaux
- L'application suit le paradigme App Router de Next.js, privilégiant fortement les Server Components (RSC) pour le rendu initial.
- Pour les états dynamiques locaux, le projet s'appuie sur l'état interne React (Hooks) puisqu'aucun gestionnaire global n'est actuellement en place.

## 6. Commandes essentielles
- `npm run dev` (ou `next dev`) : Démarrer le serveur de développement.
- `npm run build` (ou `next build`) : Compiler et optimiser l'application pour la production.
- `npm run start` (ou `next start`) : Lancer l'application en production.
- `npm run lint` (ou `next lint`) : Analyser le code et repérer d'éventuelles erreurs de style.

## 7. Variables d'environnement requises
- *Aucune variable d'environnement détectée à ce stade (absence de `.env.example`).*

## 8. Fichiers critiques — NE PAS MODIFIER sans validation
- `package.json` : Cœur des scripts et des dépendances.
- `tsconfig.json` : Configuration de compilation du projet TypeScript.
- `next.config.mjs` : Configuration bas niveau du moteur Next.js.
- `tailwind.config.ts` : Déclaration et configuration du design system CSS.

## 9. Patterns à reproduire absolument
- Importer toute ressource et module internes à l'aide de l'alias `@/` (ex: `import "@/styles/globals.css"`).
- Créer prioritairement des composants UI de façon granulaire et les regrouper logiquement dans `components/ui/`, `components/layout/` ou `components/sections/`.

## 10. État du projet
- Projet fraîchement instancié avec une page d'accueil basique ("Bienvenue sur Puralpha").
- Routes de base `/contact` et `/services` instanciées, composants vides à alimenter.
- Aucune dette technique connue pour l'instant.
