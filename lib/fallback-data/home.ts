/**
 * Données de fallback pour la page d'accueil.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 * Les textes sont vidés pour forcer l'usage du contenu dynamique, tout en préservant les URLs de structure.
 */

export const HOME_FALLBACK = {
  hero: {
    title: "",
    title_highlight: "",
    subtitle: "",
    description: "",
    cta_primary_text: "",
    cta_url: "/contact",
    cta_secondary_text: "",
    hero_overlay_text: "",
  },

  values_bar: [],

  accompagnement: {
    section_tag: "",
    title: "",
    title_highlight: "",
    cta_text: "",
    cta_url: "/pour-les-familles",
  },

  accompagnement_services: [],

  accompagnement_info_boxes: [],

  etapes: {
    title: "",
    description: "",
    cta_text: "",
    cta_url: "/contact",
  },

  etapes_steps: [],

  histoire: {
    section_tag: "",
    title: "",
    title_highlight: "",
    paragraph_1: "",
    paragraph_2: "",
    cta_text: "",
    cta_url: "/notre-histoire",
  },

  territoire: {
    section_tag: "",
    title: "",
    title_highlight: "",
    titre_2: "",
    description_1: "",
    description_2: "",
    cta_text: "",
    cta_url: "#",
  },

  parcours: {
    section_tag: "",
    title: "",
  },

  parcours_cards: [],

  cta_final: {
    title: "",
    title_highlight: "",
    subtitle: "",
    cta_text: "",
    cta_url: "/contact",
  },

  cta_badges: [],
} as const;
