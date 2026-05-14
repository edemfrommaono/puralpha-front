/**
 * Données de fallback pour la page d'accueil.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 */

export const HOME_FALLBACK = {
  hero: {
    title: "Garde et accompagnement à domicile d'enfants en",
    title_highlight: "situation de handicap",
    subtitle: "Leur bien-être à domicile, votre sérénité au quotidien",
    description:
      "PUR Alpha propose une solution de services à la personne exclusivement dédiée aux enfants et jeunes en situation de handicap, de 0 à 25 ans, dans le Val-d'Oise.",
    cta_primary_text: "Demander un premier échange",
    cta_url: "/contact",
    cta_secondary_text: "Découvrir PUR Alpha en vidéo",
    hero_overlay_text:
      "Des interventions personnalisées, assurées par des professionnels formés aux spécificités du handicap.",
  },

  values_bar: [
    { label: "Bientraitance" },
    { label: "Sécurité" },
    { label: "Continuité" },
    { label: "Simplicité" },
    { label: "Transparence" },
  ],

  accompagnement: {
    section_tag: "Notre accompagnement",
    title: "Un service à domicile, pensé pour",
    title_highlight: "votre enfant.",
    cta_text: "Découvrir notre offre en détail",
    cta_url: "/pour-les-familles",
  },

  accompagnement_services: [
    {
      title: "Garde à domicile",
      description:
        "Une présence rassurante au domicile, respectueuse du rythme et des repères de votre enfant",
    },
    {
      title: "Assistance au quotidien",
      description:
        "Un soutien humain et sécurisé dans les gestes essentiels",
    },
    {
      title: "Accompagnement de proximité",
      description:
        "Des déplacements à pied vers les lieux du quotidien",
    },
    {
      title: "Activités sociales et éducatives",
      description: "Des temps d'éveil, de lien et de socialisation",
    },
  ],

  accompagnement_info_boxes: [
    {
      title: "Nos intervenants",
      description:
        "Des intervenants sélectionnés, formés spécifiquement au handicap et encadrés par PUR Alpha.",
    },
    {
      title: "Notre fonctionnement",
      description:
        "Vous définissez les missions. Nous assurons la gestion et le suivi.",
    },
  ],

  etapes: {
    title: "Comment ça marche ?",
    description:
      "De la première prise de contact à la mise en place de l'intervention, PUR Alpha vous accompagne à chaque étape.",
    cta_text: "Demander un premier échange",
    cta_url: "/contact",
  },

  etapes_steps: [
    {
      title: "Premier contact",
      description: "Écoute de votre situation et de vos besoins.",
    },
    {
      title: "Évaluation à domicile",
      description:
        "Observation du cadre de vie et des habitudes du quotidien.",
    },
    {
      title: "Fiche mission",
      description:
        "Formalisation des missions, horaires et consignes.",
    },
    {
      title: "Mise en place",
      description:
        "Présentation de l'intervenant et suivi par PUR Alpha.",
    },
  ],

  histoire: {
    section_tag: "Notre histoire",
    title: "Pourquoi PUR Alpha",
    title_highlight: "existe.",
    paragraph_1:
      "PUR Alpha est né d'une expérience personnelle : celle d'une mère confrontée à la difficulté de trouver un accompagnement fiable pour son enfant en situation de handicap.",
    paragraph_2:
      "De ce vécu est née une conviction : les familles ont besoin d'un relais à domicile rassurant et respectueux du quotidien de leur enfant.",
    cta_text: "Lire notre manifeste",
    cta_url: "/notre-histoire",
  },

  territoire: {
    section_tag: "Implantation territoriale",
    title: "Ancré dans",
    title_highlight: "le Val-d'Oise",
    description_1:
      "Le Val-d'Oise fait face à des besoins importants d'accompagnement à domicile pour les enfants et jeunes en situation de handicap. PUR Alpha répond à cette réalité en proposant un relais complémentaire aux solutions existantes.",
    description_2:
      "Accompagné par Initiative Val d'Oise, le projet s'inscrit dans une dynamique territoriale reconnue. Il a reçu le 1er Prix Jeune Entreprise aux Entrepreneuriades 2025, une reconnaissance de son ancrage local et de son utilité pour les familles valdoisiennes.",
    cta_text: "Retour en images sur l'événement",
    cta_url: "#",
  },

  parcours: {
    section_tag: "Vous êtes concerné ?",
    title: "Choisissez votre parcours",
  },

  parcours_cards: [
    {
      tag: "Familles",
      title: "Je cherche un accompagnement fiable pour mon enfant",
      description:
        "Trouver la bonne personne pour son enfant prend du temps. Lui faire confiance en demande tout autant. PUR Alpha vous apporte du répit et un soutien au quotidien.",
      cta_text: "Voir comment nous pouvons vous aider",
      cta_url: "/pour-les-familles",
    },
    {
      tag: "Intervenants",
      title: "Je souhaite rejoindre une équipe qui a du sens",
      description:
        "Chez PUR Alpha, votre métier est reconnu et valorisé. Vous bénéficiez d'un cadre et d'un suivi dans vos missions auprès des enfants.",
      cta_text: "Découvrir les avantages",
      cta_url: "/nous-rejoindre",
    },
  ],

  cta_final: {
    title: "Parce que votre enfant mérite un accompagnement",
    title_highlight: "à la hauteur de ses besoins.",
    subtitle:
      "Prendre soin de son enfant, c'est aussi préserver l'équilibre de toute la famille",
    cta_text: "Demander un premier échange",
    cta_url: "/contact",
  },

  cta_badges: [
    { text: "Premier échange gratuit" },
    { text: "Sans engagement" },
    { text: "Retour rapide" },
  ],
} as const;
