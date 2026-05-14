/**
 * Données de fallback pour la page Nous Rejoindre.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 */

export const NOUS_REJOINDRE_FALLBACK = {
  hero: {
    title_line_1: "Vous aimez",
    title_line_2: "les gens.",
    title_highlight: "Rejoignez-nous.",
    description:
      "PUR Alpha recherche des intervenants qui mettent l'humain avant tout — bienveillants, fiables, engagés auprès des enfants en situation de handicap.",
    cta_primary_text: "Candidater maintenant",
    cta_secondary_text: "Poser une question",
  },

  avantages: {
    section_tag: "Pourquoi nous rejoindre",
    title: "Un travail",
    title_highlight: "qui a du sens",
    description:
      "Chez PUR Alpha, intervenir c'est plus qu'un job. C'est s'engager auprès d'enfants qui ont besoin de stabilité, et de familles qui ont besoin de souffler.",
    cards: [
      { fallback_icon: "🎯", title: "Un accompagnement qui a du sens", description: "Vous intervenez auprès d'enfants et jeunes en situation de handicap — TSA, TDAH, polyhandicap, maladies rares — et vous avez un impact concret sur leur quotidien." },
      { fallback_icon: "🤝", title: "Une structure qui vous soutient", description: "Contrat de travail direct, formation initiale de 70h, encadrement terrain, référent dédié. Vous n'êtes jamais seul(e) face à une situation difficile." },
      { fallback_icon: "📈", title: "Une vraie progression professionnelle", description: "Formation continue, supervision de terrain, échanges de pratiques. PUR Alpha investit dans vos compétences pour que vous grandissiez avec nous." },
      { fallback_icon: "⚖️", title: "Des horaires qui s'adaptent à vous", description: "Interventions du lundi au dimanche de 7h à 22h, planifiées avec vous." },
      { fallback_icon: "🛡️", title: "Sécurité et couverture complète", description: "Salarié(e) de PUR Alpha : contrat de travail, couverture sociale, assurance RC Pro pour toutes vos interventions." },
      { fallback_icon: "❤️", title: "Une équipe humaine et bienveillante", description: "PUR Alpha est né d'une histoire de vie. Nos valeurs — bientraitance, continuité, transparence — s'appliquent aussi à nos intervenants." },
    ],
  },

  valeurs_humaines: {
    section_tag: "Nos valeurs humaines",
    title: "Ce que nous attendons",
    title_highlight: "de vous",
    paragraph_1: "Pas besoin d'être parfait. Vous avez besoin d'être fiable, bienveillant(e) et sincèrement engagé(e) auprès des enfants.",
    paragraph_2: "Le reste — les techniques, les protocoles, les spécificités de chaque situation — nous vous l'enseignons.",
    qualities: [
      { text: "Bienveillance naturelle" },
      { text: "Ponctualité & fiabilité" },
      { text: "Patience & écoute" },
      { text: "Discrétion absolue" },
      { text: "Adaptabilité" },
      { text: "Esprit d'équipe" },
    ],
  },

  temoignage: {
    quote: "Ce qui m'a décidée à rejoindre PUR Alpha, c'est que pour la première fois, je me suis sentie accompagnée. Pas lâchée dans le grand bain.",
    author: "Intervenant(e) PUR Alpha — Val-d'Oise",
  },

  faq: {
    section_tag: "FAQ",
    title: "Vos questions,",
    title_highlight: "nos réponses",
    items: [
      { question: "Faut-il un diplôme pour rejoindre PUR Alpha ?", answer: "Nous valorisons d'abord vos qualités humaines et votre engagement. La formation initiale de 70h vous donnera toutes les compétences nécessaires." },
      { question: "Quel est le statut proposé ?", answer: "Vous êtes salarié(e) de PUR Alpha, avec un contrat de travail en bonne et due forme, garantissant votre couverture sociale et votre sécurité." },
      { question: "Combien d'heures par semaine ?", answer: "Les horaires s'adaptent à vos disponibilités. Nous recherchons des personnes à temps partiel ou à temps complet, avec des interventions possibles de 7h à 22h, du lundi au dimanche." },
      { question: "La formation est-elle rémunérée ?", answer: "Oui, la formation initiale de 70h est rémunérée et indispensable avant toute première mission." },
      { question: "Dans quelles zones intervenez-vous ?", answer: "Nous intervenons principalement dans le Val-d'Oise (95) et ses environs." },
    ],
  },

  formulaire: {
    section_tag: "Formulaire de candidature",
    title: "Prêt(e) à rejoindre l'équipe PUR Alpha ?",
    description: "Envoyez-nous votre CV et une courte présentation. Nous vous répondons sous 48h.",
    submit_text: "Envoyer ma candidature",
    email_fallback: "contact@puralpha.fr",
  },
} as const;
