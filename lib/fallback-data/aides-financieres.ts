/**
 * Données de fallback pour la page Aides Financières.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 * Les textes sont vidés pour forcer l'usage du contenu dynamique, tout en préservant les URLs de structure.
 */

export const AIDES_FALLBACK = {
  hero: {
    title_line_1: "",
    title_line_2: "",
    title_highlight: "",
    description: "",
  },

  aides: {
    section_tag: "",
    title: "",
    title_highlight: "",
    description: "",
  },

  aides_cards: [],

  tarification: {
    section_tag: "",
    title: "",
    title_highlight: "",
    price: "",
    price_details: "",
    inclus_badges: [],
    rows: [],
    footnote: "",
  },

  simulateur: {
    tag: "",
    titre: "",
    title_highlight: "",
    description: "",
  },

  accompagnement_admin: {
    tag: "",
    titre_1: "",
    titre_2: "",
    title_highlight: "",
    description: "",
    accompagnements: [],
    processus: [],
  },

  cta_final: {
    title: "",
    title_highlight: "",
    description: "",
    cta_text: "",
    cta_url: "/contact",
    badges: [],
  },
} as const;
