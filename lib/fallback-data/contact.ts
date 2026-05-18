/**
 * Données de fallback pour la page Contact.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 * Les textes sont vidés pour forcer l'usage du contenu dynamique, tout en préservant les de structure.
 */

export const CONTACT_FALLBACK = {
  hero: {
    title: "",
    title_highlight: "",
    description: "",
  },

  formulaire: {
    title: "",
    notes: "",
  },

  coordonnees: {
    title: "",
    items: [],
  },
} as const;
