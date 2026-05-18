/**
 * Données de fallback pour la page Pour les Familles.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 * Les textes sont vidés pour forcer l'usage du contenu dynamique, tout en préservant les URLs de structure.
 */

export const POUR_LES_FAMILLES_FALLBACK = {
  hero: {
    title: "",
    title_highlight: "",
    description: "",
    cta_primary_text: "",
    cta_secondary_text: "",
    stats: [],
  },

  handicaps: {
    title: "",
    title_highlight: "",
    description: "",
    types: [],
    highlight_quote: "",
    highlight_description: "",
  },

  services: {
    title: "",
    title_highlight: "",
    description: "",
    cards: [],
  },

  etapes: {
    title: "",
    description: "",
    steps: [],
    cta_text: "",
    cta_url: "/contact",
  },

  limites: {
    title: "",
    title_highlight: "",
    ce_que_nous_faisons: [],
    ce_que_nous_ne_faisons_pas: [],
  },

  garanties: {
    title: "",
    title_highlight: "",
    description: "",
    items: [],
  },

  faq: {
    section_tag: "",
    title: "",
    title_highlight: "",
    items: [],
  },

  cta_final: {
    title: "",
    title_highlight: "",
    subtitle: "",
    badges: [],
    cta_text: "",
    cta_url: "/contact",
  },
} as const;
