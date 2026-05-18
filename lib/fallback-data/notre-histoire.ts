/**
 * Données de fallback pour la page Notre Histoire.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 * Les textes sont vidés pour forcer l'usage du contenu dynamique, tout en préservant les URLs de structure.
 */

export const NOTRE_HISTOIRE_FALLBACK = {
  hero: {
    title_line_1: "",
    title_highlight: "",
    subtitle: "",
    description: "",
    quote: "",
    founder_name: "",
    founder_subtitle: "",
  },

  fondatrice: {
    section_tag: "",
    title: "",
    title_highlight: "",
    paragraph_1: "",
    paragraph_2: "",
    quote: "",
    quote_author: "",
    image_caption: "",
  },

  realite_familles: {
    title: "",
    title_highlight: "",
    problems: [],
  },

  syndrome_pura: {
    section_tag: "",
    title: "",
    description_1: "",
    description_2: "",
    badge_text: "",
  },

  mission: {
    section_tag: "",
    description: "",
  },

  valeurs: {
    section_tag: "",
    title: "",
    title_highlight: "",
    items: [],
  },

  ambitions: {
    section_tag: "",
    title: "",
    title_highlight: "",
    description: "",
    items: [],
  },

  galerie: {
    images: [],
  },

  pourquoi: {
    tag: "",
    titre_ligne_1: "",
    title_highlight: "",
    descrition_1: "",
    description_2: "",
    notre_promesse_valeur: "",
    notre_promesse_libelle: "",
    legende: "",
    qualites: [],
  },

  impact_local: {
    tag: "",
    titre_1: "",
    title_highlight: "",
    description: "",
    impacts: [],
  },

  cta_final: {
    citation: "",
    auteur: "",
    "sous-titre": "",
    cta_1_texte: "",
    cta_1_url: "/contact",
    cta_2_texte: "",
    cta_2_url: "/pour-les-familles",
  },
} as const;
