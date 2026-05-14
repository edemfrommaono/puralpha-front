/**
 * Données de fallback pour la page Contact.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 */

export const CONTACT_FALLBACK = {
  hero: {
    title: "Prenons",
    title_highlight: "contact",
    description: "Tout commence par une écoute. Parlez-nous de votre situation.",
  },

  formulaire: {
    title: "Envoyez-nous un message",
  },

  coordonnees: {
    title: "Nos coordonnées",
    items: [
      { fallback_icon: "📞", label: "Téléphone", value: "06 14 79 60 47" },
      { fallback_icon: "✉️", label: "Email", value: "contact@puralpha.fr" },
      { fallback_icon: "📍", label: "Bureau", value: "14K - 26 Rue des Sablons, 95360 Montmagny" },
      { fallback_icon: "🕒", label: "Horaires", value: "Lun–Ven 9h00 – 18h30" },
    ],
  },
} as const;
