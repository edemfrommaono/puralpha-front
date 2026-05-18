/**
 * Données de fallback pour la page Nous Rejoindre.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 * Les textes sont vidés pour forcer l'usage du contenu dynamique, tout en préservant les URLs de structure.
 */

export const NOUS_REJOINDRE_FALLBACK = {
  hero: {
    title_line_1: "",
    title_line_2: "",
    title_highlight: "",
    description: "",
    cta_primary_text: "",
    cta_secondary_text: "",
  },

  avantages: {
    section_tag: "",
    title: "",
    title_highlight: "",
    description: "",
    cards: [],
  },

  valeurs_humaines: {
    section_tag: "",
    title: "",
    title_highlight: "",
    paragraph_1: "",
    paragraph_2: "",
    qualities: [],
  },

  temoignage: {
    quote: "",
    author: "",
  },

  process: {
    section_tag: "",
    title: "",
    title_highlight: "",
    title_end: "",
    etapes: [],
  },

  faq: {
    section_tag: "",
    title: "",
    title_highlight: "",
    items: [],
  },

  formulaire: {
    section_tag: "",
    title: "",
    description: "",
    submit_text: "",
    email_fallback: "contact@puralpha.fr",
    notes: "",
  },
} as const;
