/**
 * Types WordPress REST API + ACF Pro
 * Projet PUR Alpha — Site monolingue français
 */

// ────────────────────────────────────────────────
// TYPES DE BASE WORDPRESS
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
// TYPE IMAGE ACF (peut être un ID ou un objet)
// ────────────────────────────────────────────────

export type ACFImage = number | { id?: number; url?: string; source_url?: string } | null;

/** Image ACF retournée au format "array" (return_format: array) */
export interface ACFImageArray {
  ID?: number;
  id?: number;
  url?: string;
  title?: string;
  filename?: string;
  alt?: string;
  sizes?: Record<string, string>;
}

// ────────────────────────────────────────────────
// ACF — PAGE ACCUEIL (slug: pur-alpha)
// ────────────────────────────────────────────────

export interface HomePageACF {
  hero?: {
    title: string;
    title_highlight: string;
    subtitle: string;
    description: string;
    cta_primary_text: string;
    cta_url: string;
    cta_secondary_text: string;
    hero_image_left: ACFImage;
    hero_image_right: ACFImage;
    hero_overlay_text: string;
  };
  values_bar?: Array<{
    image: ACFImageArray | false;
    label: string;
  }>;
  accompagnement?: {
    image_mise_en_avant: ACFImage;
    section_tag: string;
    title: string;
    title_highlight: string;
    services: Array<{
      image: ACFImage;
      title: string;
      description: string;
    }>;
    info_boxes: Array<{
      title: string;
      description: string;
    }>;
    cta_text: string;
  };
  etapes?: {
    title: string;
    description: string;
    steps: Array<{
      image: ACFImageArray | false;
      title: string;
      description: string;
    }>;
    cta_text: string;
  };
  histoire?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    paragraphe: string;
    cta_text: string;
    image: ACFImage;
  };
  territoire?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    titre_2?: string;
    description_1: string;
    description_2: string;
    cta_text: string;
    cta_url: string;
    image_de_carte: ACFImage;
    logos?: Array<{ image_logo: number | string }>;
  };
  parcours?: {
    section_tag: string;
    title: string;
    cards: Array<{
      image_de_couverture: ACFImageArray | false;
      tag: string;
      title: string;
      description: string;
      cta_text: string;
      cta_url: string;
    }>;
  };
  cta_final?: {
    image_de_fond: ACFImageArray | false;
    title: string;
    title_highlight: string;
    subtitle: string;
    badges: Array<{ text: string }>;
    cta_text: string;
    cta_url?: string;
  };
}

// ────────────────────────────────────────────────
// ACF — PAGE NOTRE HISTOIRE (slug: notre-histoire)
// ────────────────────────────────────────────────

export interface NotreHistoireACF {
  hero?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    description: string;
    quote: string;
    founder_name: string;
    founder_role: string;
    photo: ACFImage;
    photo_legende: string;
    photo_note: string;
  };
  relais?: {
    title: string;
    title_highlight: string;
    paragraph_1: string;
    paragraph_2: string;
    paragraph_highlight: string;
    image: ACFImage;
    image_alt: string;
  };
  galerie?: {
    title: string;
    title_highlight: string;
    photos: Array<{
      photo: ACFImage;
      libelle: string;
      note: string;
    }>;
  };
  video?: {
    title: string;
    title_highlight: string;
    description: string;
    video_url: string;
    placeholder_label: string;
    placeholder_note: string;
  };
  construction?: {
    title: string;
    title_highlight: string;
    paragraph_1: string;
    paragraph_2: string;
    paragraph_highlight: string;
    image: ACFImage;
    image_alt: string;
  };
  experience?: {
    title: string;
    title_highlight: string;
    stats: Array<{
      chiffre: string;
      description: string;
    }>;
    paragraph_1: string;
    paragraph_highlight: string;
  };
  methode?: {
    title: string;
    title_highlight: string;
    description: string;
    etapes: Array<{
      titre: string;
    }>;
  };
  valeurs?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    items: Array<{
      image: ACFImage;
      titre: string;
      description: string;
    }>;
  };
  citation_finale?: {
    citation: string;
    auteur: string;
    role: string;
    cta_texte: string;
    cta_url: string;
    background_image?: ACFImage;
  };
}

// ────────────────────────────────────────────────
// ACF — PAGE POUR LES FAMILLES (slug: pour-les-familles)
// ────────────────────────────────────────────────

export interface PourLesFamillesACF {
  hero?: {
    title: string;
    title_highlight: string;
    description: string;
    cta_primary_text: string;
    cta_secondary_text: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  handicaps?: {
    title: string;
    title_highlight: string;
    description: string;
    types: Array<{
      image: ACFImageArray | false;
      label: string;
    }>;
    highlight_quote: string;
    highlight_description: string;
  };
  services?: {
    title: string;
    title_highlight: string;
    description: string;
    cards: Array<{
      tag: string;
      image: ACFImage;
      title: string;
      description: string;
      tags: Array<{ text: string }>;
    }>;
  };
  etapes?: {
    title: string;
    description: string;
    steps: Array<{
      title: string;
      items: Array<{ text: string }>;
    }>;
    cta_text: string;
    cta_url: string;
  };
  steps?: Array<{ title: string; items: Array<{ text: string }> }>;
  limites?: {
    title: string;
    title_highlight: string;
    ce_que_nous_faisons: Array<{ text: string }>;
    ce_que_nous_ne_faisons_pas: Array<{ text: string }>;
  };
  garanties?: {
    title: string;
    title_highlight: string;
    description: string;
    items: Array<{
      image: ACFImageArray | false;
      title: string;
      description: string;
    }>;
    garanties_ligne_2: Array<{
      image: ACFImageArray | false;
      titre: string;
      description: string;
    }> | null;
    garantie_ligne_3: Array<{
      titre: string;
      description: string;
    }> | null;
    garantie_ligne_4: string | null;
  };
  faq?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta_final?: {
    image_de_fond: ACFImage;
    title: string;
    title_highlight: string;
    subtitle: string;
    badges: Array<{ text: string }>;
    cta_text: string;
    cta_url: string;
  };
}

// ────────────────────────────────────────────────
// ACF — PAGE AIDES FINANCIÈRES (slug: aides-financieres)
// ────────────────────────────────────────────────

export interface AidesFinancieresACF {
  hero?: {
    title_line_1: string;
    title_line_2: string;
    title_highlight: string;
    description: string;
  };
  aides?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    description: string;
    cards: Array<{
      accent_color: string;
      image: ACFImageArray | false;
      title: string;
      subtitle: string;
      description: string;
      highlight_value: string;
      highlight_label: string;
      tags: Array<{ text: string }>;
    }>;
  };
  tarification?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    price: string;
    price_details: string;
    inclus_badges: Array<{ text: string }>;
    rows: Array<{
      creneau: string;
      tarif_ttc: string;
      aide_pch: string;
      credit_impot: string;
      reste_a_charge: string;
    }>;
    footnote: string;
  };
  simulateur?: {
    tag: string;
    titre: string;
    title_highlight: string;
    description: string;
  };
  accompagnement_administratif?: {
    tag: string;
    titre_1: string;
    titre_2: string;
    title_highlight: string;
    description: string;
    accompagnements: Array<{
      ordre: number;
      titre: string;
      description: string;
    }>;
    processus: Array<{
      tag: string;
      titre: string;
      description: string;
    }>;
    modalites_tag?: string;
    modalites_title?: string;
    modalites_title_highlight?: string;
    modalites_title_2?: string;
    modalites_description?: string;
  };
  cta_final?: {
    image_de_fond: ACFImageArray | number | false;
    title: string;
    title_highlight: string;
    description: string;
    cta_text: string;
    cta_url: string;
    badges: Array<{ titre: string }>;
  };
}

// ────────────────────────────────────────────────
// ACF — PAGE NOUS REJOINDRE (slug: nous-rejoindre)
// ────────────────────────────────────────────────

export interface NousRejoindreACF {
  hero?: {
    title_line_1: string;
    title_line_2: string;
    title_highlight: string;
    description: string;
    cta_primary_text: string;
    cta_secondary_text: string;
  };
  avantages?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    description: string;
    cards: Array<{
      image: ACFImageArray | false;
      title: string;
      description: string;
    }>;
  };
  valeurs_humaines?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    paragraph: string;
    qualities: Array<{ text: string }>;
    image: ACFImage;
  };
  temoignage?: {
    image_de_fond: ACFImageArray | false;
    quote: string;
    author: string;
  };
  process?: {
    section_tag?: string;
    title?: string;
    title_highlight?: string;
    title_end?: string;
    etapes?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  faq?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  formulaire?: {
    section_tag: string;
    title: string;
    description: string;
    submit_text: string;
    email_fallback: string;
    notes?: string;
  };
  formation_tag?: string;
  formation_title?: string;
  formation_title_highlight?: string;
  formation_title_end?: string;
  formation_description?: string;
  formation_etapes?: Array<{
    valeur: string;
    sous_titre: string;
    titre: string;
    description: string;
  }>;
}

// ────────────────────────────────────────────────
// ACF — PAGE CONTACT (slug: contact)
// ────────────────────────────────────────────────

// ────────────────────────────────────────────────
// ACF — ARTICLES BLOG (post_type: post)
// ────────────────────────────────────────────────

export interface BlogPostACF {
  /** Groupe "auteur" — champs personnalisés affichés sur l'article */
  auteur?: {
    nom?: string;
    role?: string;
    /** Peut être une URL (string) ou un ID d'image (number) selon la conf ACF REST */
    avatar?: string | number;
  };
  /** Date personnalisée affichée (format ACF : "d F Y", ex: "12 juin 2026").
   *  Si absent, on utilise WPPost.date (date WP native). */
  date_publication?: string;
  /** Extrait personnalisé à afficher dans les cartes listing.
   *  Si absent, on utilise WPPost.excerpt.rendered. */
  extrait?: string;
  /** Alt de l'image mise en avant pour l'accessibilité SEO */
  image_alt?: string;
  /** URL de la vidéo (YouTube, etc.) ajoutée dans ACF */
  url_video?: string;
}

export interface ContactPageACF {
  hero?: {
    title: string;
    title_highlight: string;
    description: string;
  };
  formulaire?: {
    title: string;
    image: ACFImage;
    notes?: string;
  };
  coordonnees?: {
    title: string;
    items: Array<{
      image: ACFImageArray | false;
      label: string;
      value: string;
    }>;
  };
}
