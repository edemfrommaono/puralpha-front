# Méthodologie WordPress Headless + Next.js
## Documentation Technique — Guide d'Implémentation

> **Public cible :** Développeur frontend/fullstack souhaitant implémenter cette architecture headless de A à Z.
> **Stack :** WordPress (back-office CMS) + Next.js App Router (frontend) + ACF Pro (champs personnalisés) + REST API WordPress

---

## Table des matières

1. [Vue d'ensemble de l'architecture](#1-vue-densemble-de-larchitecture)
2. [Prérequis et infrastructure](#2-prérequis-et-infrastructure)
3. [Configuration WordPress (Back-office)](#3-configuration-wordpress-back-office)
4. [Plugins obligatoires et optionnels](#4-plugins-obligatoires-et-optionnels)
5. [Workflow de développement](#5-workflow-de-développement)
6. [Phase 1 — Construction du frontend statique (Next.js)](#6-phase-1--construction-du-frontend-statique-nextjs)
7. [Phase 2 — Modélisation des champs ACF](#7-phase-2--modélisation-des-champs-acf)
8. [Phase 3 — Import et configuration dans WordPress](#8-phase-3--import-et-configuration-dans-wordpress)
9. [Phase 4 — Intégration du contenu dans WordPress](#9-phase-4--intégration-du-contenu-dans-wordpress)
10. [Phase 5 — Connexion WordPress ↔ Next.js (REST API)](#10-phase-5--connexion-wordpress--nextjs-rest-api)
11. [Configuration ISR et revalidation](#11-configuration-isr-et-revalidation)
12. [Internationalisation (Polylang + Next.js)](#12-internationalisation-polylang--nextjs)
13. [Structure des fichiers Next.js de référence](#13-structure-des-fichiers-nextjs-de-référence)
14. [Prompt IA — Génération des champs ACF](#14-prompt-ia--génération-des-champs-acf)
15. [Prompt IA — Génération des requêtes REST API](#15-prompt-ia--génération-des-requêtes-rest-api)
16. [Déploiement](#16-déploiement)
17. [Checklist complète](#17-checklist-complète)

---

## 1. Vue d'ensemble de l'architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     INFRASTRUCTURE                          │
│                                                             │
│  back.monsite.com          front.monsite.com / monsite.com  │
│  ┌──────────────┐          ┌──────────────────────────┐     │
│  │  WordPress   │  REST    │      Next.js App          │     │
│  │  (CMS)       │◄────────►│  (Frontend / SSR / ISR)  │     │
│  │              │  API     │                          │     │
│  │  ACF Pro     │          │  TypeScript + Tailwind   │     │
│  │  Forminator  │          │  App Router              │     │
│  │  Polylang    │          │                          │     │
│  └──────────────┘          └──────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Principe de fonctionnement

WordPress joue uniquement le rôle de **CMS headless** : il stocke et expose les données via son API REST. Next.js consomme ces données pour générer les pages côté serveur avec **ISR (Incremental Static Regeneration)** pour optimiser les performances.

Le contenu éditorial (textes, images, données de pages) est entièrement géré dans WordPress par le client, sans que celui-ci n'ait besoin de toucher au code frontend.

---

## 2. Prérequis et infrastructure

### Hébergement

- **2 domaines séparés** sont nécessaires :
  - `back.monsite.com` → WordPress (back-office CMS)
  - `monsite.com` ou `front.monsite.com` → Next.js (frontend)

- L'hébergement WordPress doit supporter PHP 8.0+, MySQL 5.7+ et idéalement des ressources suffisantes pour traiter les requêtes API.
- Le frontend Next.js peut être hébergé sur Vercel, un VPS (avec Node.js), ou via Plesk en mode standalone.

### Noms de domaine

| Domaine | Rôle | Accès public |
|---------|------|--------------|
| `back.monsite.com` | WordPress CMS | Non recommandé (accès admin uniquement) |
| `monsite.com` | Next.js Frontend | Oui |

---

## 3. Configuration WordPress (Back-office)

### Installation

1. Installer WordPress classiquement sur `back.monsite.com`.
2. Lors de la configuration initiale, **désactiver les commentaires** et nettoyer le contenu par défaut (articles, pages exemples).
3. Configurer les **permaliens** : `Réglages > Permaliens > Structure personnalisée : /%postname%/`

### Paramètres importants

Aller dans `Réglages > Lecture` et s'assurer que l'option **"Décourager les moteurs de recherche d'indexer ce site"** est cochée (le back-office ne doit pas être indexé).

### CORS — Autoriser les requêtes du frontend

Ajouter ce code dans le fichier `functions.php` du thème actif (ou dans un plugin mu-plugins) pour autoriser les requêtes cross-origin depuis le domaine frontend :

```php
// Autoriser CORS depuis le domaine frontend
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = [
            'https://monsite.com',
            'https://front.monsite.com',
            'http://localhost:3000' // pour le développement local
        ];
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
        }
        return $value;
    });
}, 15);
```

---

## 4. Plugins obligatoires et optionnels

### Plugins obligatoires

| Plugin | Rôle | Notes |
|--------|------|-------|
| **ACF Pro** (Advanced Custom Fields) | Création de champs personnalisés pour les pages et CPT | Payant — indispensable à la méthodologie |
| **Forminator Pro** | Gestion des formulaires de contact | Payant — les formulaires sont soumis directement à l'API WP |

### Plugins recommandés

| Plugin | Rôle | Notes |
|--------|------|-------|
| **Polylang** | Internationalisation (multi-langues) | Gratuit — obligatoire si le site est multilingue |
| **Classic Editor** | Éditeur classique WP | Optionnel — utile si Gutenberg pose des problèmes |

### Plugins de sécurité (optionnels)

| Plugin | Rôle |
|--------|------|
| **Defender Pro** | Sécurité avancée (firewall, 2FA, scan malware) |
| **Wordfence** | Alternative à Defender |

> **Note :** WPGraphQL n'est **pas** utilisé dans cette méthodologie. On utilise exclusivement l'**API REST native de WordPress**.

---

## 5. Workflow de développement

Voici le flux complet de la méthodologie en 5 phases :

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW GLOBAL                              │
│                                                                 │
│  1. Design       →  2. Frontend     →  3. ACF JSON             │
│  (Figma/XD)         statique (Next)    (génération par IA)      │
│                                                                 │
│  4. Import WP    →  5. Saisie       →  6. Requêtes API          │
│  (pages + ACF)      contenu            + dynamisation           │
│                                                                 │
│  7. Revalidation ISR + Déploiement                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Phase 1 — Construction du frontend statique (Next.js)

### Initialisation du projet

```bash
npx create-next-app@latest mon-projet \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd mon-projet
```

### Installation des dépendances

```bash
npm install \
  @radix-ui/react-avatar \
  @radix-ui/react-separator \
  @radix-ui/react-slot \
  @radix-ui/react-tabs \
  @tailwindcss/typography \
  class-variance-authority \
  clsx \
  embla-carousel-react \
  framer-motion \
  lucide-react \
  negotiator \
  tailwind-merge \
  tailwindcss-animate \
  @formatjs/intl-localematcher

npm install -D \
  @tailwindcss/postcss \
  @types/negotiator
```

### Configuration shadcn/ui (optionnel mais recommandé)

```bash
npx shadcn@latest init
# Style: new-york
# Base color: neutral
# CSS variables: yes

npx shadcn@latest add button avatar skeleton separator tabs
```

### Structure des dossiers recommandée

```
src/
├── app/
│   ├── [lang]/                    ← Routing i18n
│   │   ├── layout.tsx
│   │   ├── page.tsx               ← Page d'accueil
│   │   ├── [slug-page]/
│   │   │   └── page.tsx
│   │   └── [type-publication]/
│   │       ├── page.tsx           ← Liste
│   │       └── [slug]/
│   │           └── page.tsx       ← Détail
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── common/                    ← Container, Section, ScrollReveal...
│   ├── layout/                    ← Header, Footer
│   ├── pages/                     ← Composants spécifiques à chaque page
│   ├── sections/                  ← Sections réutilisables
│   └── ui/                        ← Composants UI génériques (shadcn)
├── lib/
│   ├── wordpress.ts               ← Client REST API WordPress
│   ├── dictionary.ts              ← Chargement des traductions
│   ├── i18n-config.ts             ← Config des locales
│   └── utils.ts                   ← Helpers
├── dictionaries/
│   ├── fr.json
│   └── en.json
├── types/
│   └── global.ts
└── middleware.ts                  ← Redirection i18n
```

### Étape clé : construire toutes les pages en données statiques d'abord

À cette phase, **toutes les données sont codées en dur** (hardcodées) directement dans les composants. L'objectif est de valider le design et la structure de chaque page avant de connecter WordPress.

**Exemple — page d'accueil statique :**

```typescript
// src/app/[lang]/page.tsx (version statique)
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main>
      <HeroSection
        title_part_1="Là Où L'intelligence"
        title_part_2="Créative"
        title_part_3="Rencontre Les"
        title_part_4="Systèmes Intelligents"
        subtitle="Digital · Créatif · IA · Des systèmes qui génèrent de l'impact."
        cta_primary_text="Explorer Notre Univers"
      />
      {/* ... autres sections */}
    </main>
  );
}
```

---

## 7. Phase 2 — Modélisation des champs ACF

### Identifier les types de contenus

Une fois toutes les pages construites statiquement, parcourir chaque page et classifier chaque élément de contenu en deux catégories :

#### A. Types de publications (Custom Post Types — CPT)

Un élément devient un CPT si :
- Il existe en **plusieurs instances** (articles, projets, témoignages...)
- Il possède une **page de détail** (URL `/blog/mon-article`)
- Il est rattaché à une **catégorie**
- Il est géré comme un **flux de contenu** répétitif

**Exemples courants :**

| Nom FR | Slug WP | Description |
|--------|---------|-------------|
| Actualités / Blog | `post` (natif WP) | Articles, podcasts, vidéos |
| Réalisations | `case-study` | Projets portfolio |
| Équipe | `shujaa` | Membres de l'équipe |
| Témoignages | `testimonial` | Avis clients |
| Podcasts | `podcast` | Épisodes podcast |
| Partenaires | `partenaire` | Logos partenaires |
| Étapes Workflow | `workflow-step` | Étapes du processus |

#### B. Champs de page (groupes ACF sur pages existantes)

Un élément reste dans les champs de page si :
- Il n'a qu'**une seule instance** (le titre de la page, la description hero...)
- Il est **propre à une page spécifique**
- S'il y a **plusieurs items similaires** sur la même page → utiliser un **ACF Repeater**

**Règle pour les Repeaters :** Toute liste d'éléments structurés sur une page (liste d'expertises, liste de valeurs, liste d'adresses...) doit utiliser un champ `repeater` ACF plutôt qu'un CPT.

### Générer les fichiers JSON ACF avec l'IA

Pour chaque page et chaque CPT, utiliser le prompt de la [section 14](#14-prompt-ia--génération-des-champs-acf) pour générer les fichiers JSON à importer dans ACF Pro.

**Résultat attendu :** Un fichier `.json` par groupe de champs, prêt à importer.

### Structure d'un fichier JSON ACF

```json
[
  {
    "key": "group_nom_page",
    "title": "Nom Groupe de Champs",
    "active": true,
    "show_in_rest": true,
    "fields": [
      {
        "key": "field_nom_champ",
        "label": "Label visible dans WP Admin",
        "name": "nom_champ_api",
        "type": "text",
        "default_value": "Valeur par défaut"
      },
      {
        "key": "field_repeater_exemple",
        "label": "Liste d'éléments",
        "name": "liste_elements",
        "type": "repeater",
        "layout": "block",
        "sub_fields": [
          {
            "key": "field_sub_titre",
            "label": "Titre",
            "name": "titre",
            "type": "text"
          }
        ]
      }
    ],
    "location": [
      [
        {
          "param": "page_slug",
          "operator": "==",
          "value": "slug-de-la-page"
        }
      ]
    ]
  }
]
```

### Types de champs ACF courants

| Type | Usage |
|------|-------|
| `text` | Titre court, label, tag |
| `textarea` | Description, paragraphe |
| `wysiwyg` | Contenu riche avec formatage HTML |
| `image` | Image (retourner `id` pour les CPT) |
| `url` | Lien externe |
| `true_false` | Booléen (actif/inactif) |
| `number` | Ordre, statistique numérique |
| `group` | Regrouper des champs liés |
| `repeater` | Liste d'éléments répétitifs |
| `tab` | Onglets visuels dans l'admin WP |

---

## 8. Phase 3 — Import et configuration dans WordPress

### Étape 1 : Créer les pages dans WordPress

Aller dans `Pages > Ajouter` et créer chaque page avec le **slug exact** attendu par les champs ACF.

**Convention de nommage des slugs :**

| Page | Slug |
|------|------|
| Accueil | `home-page` |
| L'Agence | `agency-page` |
| Expertise | `expertise-page` |
| Contact | `contact` |
| Réalisations | `realisations-page` |
| Blog/Actualités | `blog` |
| Podcast | `podcast-page` |
| Intégration Odoo | `odoo-integration-page` |

> Pour les sites multilingues avec Polylang, dupliquer chaque page pour chaque langue et attribuer la langue dans Polylang. Utiliser des slugs suffixés : `agency-page` (FR) + `agency-page-en` (EN).

### Étape 2 : Créer les Custom Post Types

Si des CPT personnalisés sont nécessaires (hors `post` natif de WP), les créer via le code PHP ou un plugin comme **Custom Post Type UI**.

**Exemple de création via `functions.php` :**

```php
function register_custom_post_types() {
    // Case Study / Réalisations
    register_post_type('case-study', [
        'labels' => ['name' => 'Réalisations', 'singular_name' => 'Réalisation'],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'case-study',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'realisations'],
    ]);

    // Shujaa / Équipe
    register_post_type('shujaa', [
        'labels' => ['name' => 'Shujaas', 'singular_name' => 'Shujaa'],
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'thumbnail'],
    ]);

    // Testimonials
    register_post_type('testimonial', [
        'labels' => ['name' => 'Témoignages', 'singular_name' => 'Témoignage'],
        'public' => false,
        'show_in_rest' => true,
        'supports' => ['title'],
    ]);
}
add_action('init', 'register_custom_post_types');
```

### Étape 3 : Importer les groupes de champs ACF

1. Aller dans `ACF > Outils > Importer un groupe de champs`
2. Sélectionner le fichier `.json` correspondant
3. Cliquer sur **Importer le groupe de champs**
4. Répéter pour chaque fichier JSON

### Étape 4 : Vérifier les associations

Après import, vérifier pour chaque groupe :

- ✅ Le groupe est bien **associé** à la page ou au CPT correct (vérifier les règles de localisation dans `ACF > Groupes > Modifier`)
- ✅ L'option **"Afficher dans la REST API"** est activée

### Étape 5 : Activer REST API pour chaque groupe

Dans `ACF > Groupes de champs > Modifier [votre groupe]`, dans l'onglet **Présentation**, l'option **"Afficher dans la REST API"** doit être cochée sur **TOUS** les groupes.

Sans cette option, les champs ACF ne seront pas retournés dans les réponses de l'API REST.

---

## 9. Phase 4 — Intégration du contenu dans WordPress

### Saisir le contenu réel

Une fois les groupes de champs importés et associés, remplir toutes les pages et CPT avec le contenu définitif (textes, images, liens...).

**Bonnes pratiques :**
- Utiliser des images optimisées (WebP recommandé, taille raisonnable)
- Remplir tous les champs — les valeurs `null` peuvent causer des erreurs côté Next.js si non gérées
- Tester que les champs apparaissent bien sous chaque page/CPT dans l'admin WP

### Relever les slugs

**Étape critique :** Noter tous les slugs des pages et CPT créés. Ces slugs seront utilisés dans les requêtes API côté Next.js.

**Exemple de tableau de slugs :**

| Ressource | Type | Slug / Endpoint |
|-----------|------|-----------------|
| Page d'accueil | Page | `home-page` |
| Page Agence | Page | `agency-page` |
| Page Expertise | Page | `expertise-page` |
| Page Contact | Page | `contact` |
| Page Réalisations | Page | `realisations-page` |
| Actualités | CPT (`post`) | `/posts` |
| Projets | CPT (`case-study`) | `/case-study` |
| Membres équipe | CPT (`shujaa`) | `/shujaa` |
| Témoignages | CPT (`testimonial`) | `/testimonial` |

---

## 10. Phase 5 — Connexion WordPress ↔ Next.js (REST API)

### Variables d'environnement

Créer le fichier `.env.local` à la racine du projet Next.js :

```env
NEXT_PUBLIC_WP_API_URL=https://back.monsite.com/wp-json/wp/v2
```

### Client REST API WordPress

Créer `src/lib/wordpress.ts` — le fichier central de communication avec WordPress :

```typescript
/**
 * WordPress REST API Client
 */

const WP_API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL 
  || 'https://back.monsite.com/wp-json/wp/v2';

// ────────────────────────────────────────────────
// TYPES DE BASE
// ────────────────────────────────────────────────

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
  };
}

export interface WPPage<T = Record<string, unknown>> {
  id: number;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
  acf?: T;
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: Record<string, unknown>[][];
  };
}

export interface WPPost<T = Record<string, unknown>> {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  tags: number[];
  acf: T;
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: Record<string, unknown>[][];
  };
}

// ────────────────────────────────────────────────
// FONCTION FETCH CENTRALE
// ────────────────────────────────────────────────

async function fetchAPI<T>(
  endpoint: string,
  options: {
    revalidate?: number | false;
    lang?: string;
  } = {}
): Promise<T> {
  const { revalidate = 0, lang } = options;
  
  let url = `${WP_API_BASE_URL}${endpoint}`;
  
  if (lang) {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}lang=${lang}`;
  }

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`WordPress API Error: ${response.status} ${response.statusText} — ${url}`);
  }

  return response.json();
}

// ────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────

/**
 * Résout un ID ou objet image WordPress en URL string
 */
export async function resolveImageUrl(
  image: { source_url?: string; url?: string } | number | null | undefined,
  options: { revalidate?: number } = {}
): Promise<string> {
  if (!image) return '';
  
  if (typeof image === 'object') {
    if ('source_url' in image && image.source_url) return image.source_url;
    if ('url' in image && image.url) return image.url;
  }
  
  if (typeof image === 'number') {
    try {
      const media = await fetchAPI<WPFeaturedMedia>(
        `/media/${image}`,
        { revalidate: options.revalidate ?? 30 }
      );
      return media?.source_url || '';
    } catch {
      return '';
    }
  }
  
  return '';
}

// ────────────────────────────────────────────────
// PAGES
// ────────────────────────────────────────────────

export async function getPageBySlug<T = Record<string, unknown>>(
  slug: string,
  options: { revalidate?: number; lang?: string } = {}
): Promise<WPPage<T> | null> {
  const pages = await fetchAPI<WPPage<T>[]>(
    `/pages?slug=${slug}&_embed`,
    options
  );
  return pages[0] || null;
}

export async function getHomePage(options: { lang?: string } = {}) {
  if (options.lang === 'en') {
    const en = await getPageBySlug('home-page-en', { ...options, revalidate: 0 });
    if (en) return en;
  }
  return getPageBySlug('home-page', { ...options, revalidate: 0 });
}

// Répéter le pattern pour chaque page :
export const getAgencyPage = (opts?: { lang?: string }) =>
  getPageBySlug('agency-page', { ...opts, revalidate: 0 });

export const getExpertisePage = (opts?: { lang?: string }) =>
  getPageBySlug('expertise-page', { ...opts, revalidate: 0 });

export const getContactPage = (opts?: { lang?: string }) =>
  getPageBySlug('contact', { ...opts, revalidate: 0 });

// ────────────────────────────────────────────────
// CUSTOM POST TYPES
// ────────────────────────────────────────────────

export async function getCaseStudies(options: {
  per_page?: number;
  lang?: string;
} = {}) {
  const { per_page = 100, lang } = options;
  return fetchAPI<WPPost[]>(
    `/case-study?_embed&orderby=date&order=desc&per_page=${per_page}`,
    { revalidate: 0, lang }
  );
}

export async function getCaseStudyBySlug(slug: string, options: { lang?: string } = {}) {
  const items = await fetchAPI<WPPost[]>(
    `/case-study?slug=${slug}&_embed`,
    { revalidate: 0, ...options }
  );
  return items[0] || null;
}

export async function getPosts<T = Record<string, unknown>>(options: {
  per_page?: number;
  lang?: string;
} = {}) {
  const { per_page = 100, lang } = options;
  return fetchAPI<WPPost<T>[]>(
    `/posts?_embed&per_page=${per_page}&orderby=date&order=desc`,
    { revalidate: 0, lang }
  );
}

// ────────────────────────────────────────────────
// MÉDIAS
// ────────────────────────────────────────────────

export async function getMediaById(id: number) {
  return fetchAPI<WPFeaturedMedia>(`/media/${id}`, { revalidate: 30 });
}
```

### Utilisation dans une page Next.js

```typescript
// src/app/[lang]/agence/page.tsx
import { getAgencyPage, resolveImageUrl } from "@/lib/wordpress";

export const revalidate = 0; // Contenu textuel : revalidation immédiate

export default async function AgencePage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  
  const page = await getAgencyPage({ lang }).catch(() => null);
  const acf = page?.acf;
  
  // Résoudre les images (IDs → URLs)
  const visionImage = await resolveImageUrl(acf?.vision?.image);

  return (
    <main>
      <AgenceHero
        title={acf?.hero?.title}
        subtitle={acf?.hero?.subtitle}
      />
      <AgenceVision
        title={acf?.vision?.title}
        description={acf?.vision?.description}
        image={visionImage}
      />
      {/* ... */}
    </main>
  );
}
```

### Gestion des images ACF

Les champs image ACF peuvent retourner soit un **ID numérique** soit un **objet** selon la configuration du champ (`return_format`). La fonction `resolveImageUrl` gère les deux cas.

**Recommandation :** Pour les CPT, configurer les champs image avec `"return_format": "id"` pour économiser les données. Pour les pages, les deux formats fonctionnent.

---

## 11. Configuration ISR et revalidation

### Stratégie de revalidation

La revalidation ISR (Incremental Static Regeneration) de Next.js détermine à quelle fréquence une page est régénérée depuis WordPress.

| Type de contenu | Revalidate | Justification |
|----------------|------------|---------------|
| Contenus textuels (pages, CPT) | `0` | Récupère toujours les données fraîches — adapté quand le client met à jour fréquemment |
| Médias / Images | `30` (secondes) | Les images changent moins souvent — 30s évite de surcharger l'API WP |

> **Note :** Si les performances sont prioritaires et que le client met rarement à jour le contenu, augmenter à `30` pour les contenus et `60` pour les médias.

### Configuration dans les pages

```typescript
// Option 1 : Export constant (appliqué à toute la route)
export const revalidate = 0; // En secondes (0 = toujours frais)

// Option 2 : Par fetch individuel
const data = await fetch(url, {
  next: { revalidate: 30 }
});
```

### Cas particuliers

- **`revalidate = 0`** : Le contenu est toujours récupéré depuis WordPress à chaque requête (SSR dynamique)
- **`revalidate = false`** : Le contenu est mis en cache indéfiniment (ne jamais utiliser pour du contenu WordPress)
- **`revalidate = 30`** : Le contenu est mis en cache 30 secondes, puis régénéré à la prochaine requête

---

## 12. Internationalisation (Polylang + Next.js)

### Configuration WordPress (Polylang)

1. Installer et activer **Polylang** sur WordPress
2. Aller dans `Langues > Toutes les langues` et ajouter les langues du site (ex: Français + Anglais)
3. Pour chaque page, créer une **traduction** dans chaque langue
4. Vérifier que les slugs sont cohérents (ex: `agency-page` en FR, `agency-page-en` en EN)

### Requêtes avec paramètre de langue

Polylang expose un paramètre `lang` dans l'API REST :

```typescript
// Récupérer les posts en anglais
const posts = await fetch(`${WP_API_BASE_URL}/posts?lang=en&per_page=100`);

// Récupérer une page en français
const page = await fetch(`${WP_API_BASE_URL}/pages?slug=agency-page&lang=fr`);
```

### Configuration i18n dans Next.js

**`src/i18n-config.ts`**

```typescript
export const i18n = {
  defaultLocale: 'fr',
  locales: ['fr', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
```

**`src/middleware.ts`**

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = [...i18n.locales] as string[];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignorer les fichiers statiques
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/') ||
    ['/favicon.ico', '/favicon.png', '/robots.txt', '/sitemap.xml'].includes(pathname)
  ) return;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

**`src/lib/dictionary.ts`**

```typescript
import 'server-only';
import type { Locale } from '@/i18n-config';

const dictionaries = {
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale] ? dictionaries[locale]() : dictionaries.fr();
```

### Structure d'un fichier dictionnaire

`src/dictionaries/fr.json` :

```json
{
  "nav": {
    "home": "Accueil",
    "about": "L'Agence",
    "services": "Services",
    "contact": "Contact"
  },
  "cta": {
    "startProject": "Démarrer un projet",
    "learnMore": "En savoir plus",
    "viewMore": "Voir plus"
  },
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur est survenue",
    "all": "Tous"
  }
}
```

### Pattern d'une page avec i18n + WordPress

```typescript
// src/app/[lang]/contact/page.tsx
import { getContactPage, resolveImageUrl } from "@/lib/wordpress";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";

export const revalidate = 0;

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params;
  
  // Charger le dictionnaire ET les données WP en parallèle
  const [dict, page] = await Promise.all([
    getDictionary(lang),
    getContactPage({ lang }).catch(() => null),
  ]);
  
  const acf = page?.acf;

  return (
    <main>
      <ContactHero
        title={acf?.hero_title || dict.contact.title}
        description={acf?.hero_description}
      />
      {/* ... */}
    </main>
  );
}
```

---

## 13. Structure des fichiers Next.js de référence

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Pour déploiement sur serveur (Plesk, VPS)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'back.monsite.com', // ← Remplacer par votre domaine WP
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
```

### Layout principal `src/app/[lang]/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mon Site",
  description: "Description du site",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Header lang={lang} dict={dict} />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Gestion du `src/app/page.tsx` racine

```typescript
// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Fallback si le middleware ne redirige pas
  redirect('/fr');
}
```

---

## 14. Prompt IA — Génération des champs ACF

Utiliser ce prompt pour générer les fichiers JSON ACF à partir de vos pages statiques.

### Prompt pour les groupes de champs de page

```
Tu es un expert WordPress/ACF Pro. 
Analyse ce composant React/Next.js et génère un fichier JSON ACF Pro valide pour créer un groupe de champs associé à la page WordPress avec le slug "[SLUG_PAGE]".

Règles :
- show_in_rest doit être true sur le groupe ET les sous-champs
- Les champs image doivent avoir "return_format": "id"
- Utiliser des repeaters pour toute liste d'éléments structurés
- Utiliser des tabs pour organiser les sections visuellement
- Utiliser des groups pour regrouper les champs liés
- Les clés doivent suivre le format : "group_[slug]" pour le groupe, "field_[slug]_[nom]" pour les champs
- Inclure des default_value pertinents
- La location doit cibler la page par son slug : param "page_slug", operator "==", value "[SLUG_PAGE]"

Voici le composant à analyser :
[COLLER LE CODE DU COMPOSANT]
```

### Prompt pour les groupes de CPT

```
Tu es un expert WordPress/ACF Pro.
Analyse ce composant React/Next.js et génère un fichier JSON ACF Pro valide pour créer un groupe de champs associé au Custom Post Type WordPress "[SLUG_CPT]".

Règles :
- show_in_rest doit être true sur le groupe ET les sous-champs
- Les champs image doivent avoir "return_format": "id"
- Utiliser des repeaters pour les listes d'items structurés
- Les clés doivent suivre le format : "group_cpt_[slug]" pour le groupe, "field_[slug]_[nom]" pour les champs
- La location doit cibler le post_type : param "post_type", operator "==", value "[SLUG_CPT]"

Voici le composant détail à analyser :
[COLLER LE CODE DU COMPOSANT]
```

---

## 15. Prompt IA — Génération des requêtes REST API

Une fois les slugs et champs ACF définis dans WordPress, utiliser ce prompt pour générer le fichier `wordpress.ts` complet.

```
Tu es un expert Next.js/TypeScript/WordPress REST API.
Génère le fichier complet src/lib/wordpress.ts pour un projet Next.js 15+ avec App Router.

Données du projet :
- URL de base WordPress : [VOTRE_URL_WP]/wp-json/wp/v2
- Langue par défaut : fr
- Langues supportées : fr, en

Pages WordPress (chaque page a des champs ACF) :
[LISTE DES PAGES ET LEURS SLUGS]

Custom Post Types :
[LISTE DES CPT AVEC LEURS SLUGS ET CHAMPS]

Exemple de structure de champs ACF par page :
Page "home-page" → acf.hero.title_part_1, acf.hero.subtitle, acf.cta_section.title...
Page "agency-page" → acf.hero.title, acf.vision.title, acf.vision.image (ID), ...
CPT "case-study" → acf.project_label, acf.project_category, acf.case_study_image (ID), ...

Contraintes techniques :
- Revalidate = 0 pour les contenus textuels
- Revalidate = 30 pour les médias (getMediaById, resolveImageUrl)
- Typer tous les objets ACF avec des interfaces TypeScript
- La fonction resolveImageUrl doit accepter ID (number) ou objet image
- Support du paramètre "lang" dans toutes les fonctions
- Toutes les fonctions doivent avoir try/catch
```

---

## 16. Déploiement

### Déploiement sur Vercel (recommandé)

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement dans le dashboard Vercel :
   - `NEXT_PUBLIC_WP_API_URL` = `https://back.monsite.com/wp-json/wp/v2`
3. Déployer

### Déploiement sur serveur Plesk/VPS

Utiliser la configuration `output: 'standalone'` dans `next.config.ts`, puis :

**Script de build pour Plesk (`deploy-plesk.sh`) :**

```bash
#!/bin/bash
echo "Build Next.js..."
npm run build

echo "Préparation du dossier de déploiement..."
rm -rf plesk-dist && mkdir -p plesk-dist

# Copier les fichiers standalone
cp -r .next/standalone/* plesk-dist/

# Copier les assets publics
cp -r public plesk-dist/

# Copier les fichiers statiques Next.js
mkdir -p plesk-dist/.next/static
cp -r .next/static/* plesk-dist/.next/static/

# Créer l'archive
cd plesk-dist && zip -r ../plesk-build.zip . && cd ..

echo "✅ plesk-build.zip prêt pour upload"
```

**Configuration Plesk :**
- Application Root : `/httpdocs` (emplacement de `server.js`)
- Document Root : `/httpdocs/public`
- Application Startup File : `server.js`
- Node.js version : 20.x minimum

---

## 17. Checklist complète

### Infrastructure

- [ ] Domaine back-office configuré (`back.monsite.com`)
- [ ] Domaine frontend configuré (`monsite.com`)
- [ ] WordPress installé sur le back-office
- [ ] Permaliens WordPress configurés (`/%postname%/`)
- [ ] CORS configuré dans `functions.php`

### Plugins WordPress

- [ ] ACF Pro installé et activé
- [ ] Forminator Pro installé (si formulaires nécessaires)
- [ ] Polylang installé (si site multilingue)
- [ ] Classic Editor installé (optionnel)
- [ ] Plugin de sécurité configuré (optionnel)

### Développement frontend

- [ ] Projet Next.js initialisé avec App Router + TypeScript + Tailwind
- [ ] Toutes les pages construites en statique (données hardcodées)
- [ ] Tous les éléments de contenu identifiés et classifiés (CPT vs champs de page)
- [ ] Fichiers JSON ACF générés pour chaque page et CPT

### Configuration WordPress

- [ ] Pages créées avec les bons slugs
- [ ] CPT personnalisés enregistrés (via `functions.php` ou plugin)
- [ ] Tous les groupes de champs ACF importés
- [ ] Associations page/CPT vérifiées pour chaque groupe
- [ ] Option **"Afficher dans la REST API"** cochée sur **tous** les groupes
- [ ] Contenu saisi dans toutes les pages et CPT
- [ ] Slugs de toutes les ressources relevés

### Intégration API

- [ ] `.env.local` créé avec `NEXT_PUBLIC_WP_API_URL`
- [ ] `src/lib/wordpress.ts` créé avec toutes les fonctions nécessaires
- [ ] Pages Next.js connectées à WordPress (données statiques remplacées par appels API)
- [ ] Gestion des images via `resolveImageUrl`
- [ ] `revalidate = 0` sur les contenus textuels
- [ ] `revalidate = 30` sur les médias

### Internationalisation (si applicable)

- [ ] Polylang configuré avec les langues du projet
- [ ] Pages traduites dans chaque langue sur WordPress
- [ ] `i18n-config.ts` configuré avec les locales
- [ ] `middleware.ts` configuré pour la détection de langue
- [ ] Dictionnaires `.json` créés pour chaque langue
- [ ] Paramètre `lang` passé dans toutes les requêtes WordPress

### Déploiement

- [ ] Variables d'environnement configurées en production
- [ ] `next.config.ts` avec domaine WordPress dans `remotePatterns`
- [ ] Build de production testé (`npm run build`)
- [ ] Site déployé et fonctionnel en production

---

## Annexe A — Exemple complet d'une page connectée

Voici un exemple complet montrant une page de type "Contact" fully connected :

```typescript
// src/app/[lang]/contact/page.tsx
import Footer from "@/components/layout/Footer";
import { ContactHero } from "@/components/pages/Contact/ContactHero";
import { ContactForm } from "@/components/pages/Contact/ContactForm";
import { getContactPage, resolveImageUrl } from "@/lib/wordpress";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";

export const revalidate = 0;

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params;
  
  const [dict, page] = await Promise.all([
    getDictionary(lang),
    getContactPage({ lang }).catch(() => null),
  ]);
  
  const acf = page?.acf;

  return (
    <>
      <main>
        <ContactHero
          title={acf?.hero_title}
          description={acf?.hero_description}
        />
        <ContactForm
          labelNames={acf?.form_label_names}
          labelContact={acf?.form_label_contact}
          labelMessage={acf?.form_label_message}
          disclaimer={acf?.form_disclaimer}
          buttonText={acf?.form_button_text}
          lang={lang}
          dict={dict}
        />
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
```

## Annexe B — Exemple complet d'un CPT connecté

```typescript
// src/app/[lang]/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import wp from '@/lib/wordpress';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n-config';

export const revalidate = 0;

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const lang of locales) {
    const posts = await wp.getPosts({ lang }).catch(() => []);
    params.push(...posts.map((p) => ({ lang, slug: p.slug })));
  }

  return params;
}

export default async function ArticleDetailPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale; slug: string }> 
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  
  const posts = await wp.getPosts({ lang });
  const post = posts.find(p => p.slug === slug);
  
  if (!post) notFound();

  return (
    <main>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  );
}
```

---

*Documentation rédigée pour la méthodologie WordPress Headless + Next.js — Version 1.0*
