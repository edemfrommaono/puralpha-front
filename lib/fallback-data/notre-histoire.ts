/**
 * Données de fallback pour la page Notre Histoire.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 */

export const NOTRE_HISTOIRE_FALLBACK = {
  hero: {
    title_line_1: "Née d'un vécu.",
    title_highlight: "Construite pour vous.",
    description:
      "PUR Alpha n'est pas né d'une étude de marché. C'est l'histoire d'une maman qui a cherché — et qui n'a pas trouvé ce dont son fils avait besoin.",
    founder_name: "Arame Bougha",
    founder_subtitle: "fondatrice, maman d'un enfant porteur du syndrome PURA",
  },

  fondatrice: {
    section_tag: "L'histoire de la fondatrice",
    title: "Pendant des années,",
    title_highlight: "j'ai cherché.",
    paragraph_1:
      "Mon fils est porteur du syndrome PURA. Pendant des années, j'ai cherché des solutions d'accompagnement fiables, humaines et durables.",
    paragraph_2:
      "Entre la complexité administrative, le manque de stabilité des intervenants et l'absence de suivi réel, je n'ai jamais trouvé de réponse satisfaisante.",
    quote:
      "\"De cette expérience est née une conviction simple : il fallait créer ce qui manquait.\"",
    quote_author: "Arame Bougha",
    image_caption: "Chaque famille porte une histoire unique",
  },

  realite_familles: {
    title: "Ce que les familles",
    title_highlight: "vivent vraiment",
    problems: [
      {
        fallback_icon: "🔄",
        title: "L'instabilité des intervenants",
        description:
          "Le turnover constant déstabilise l'enfant et épuise les parents. Les repères sont brisés encore et encore.",
      },
      {
        fallback_icon: "📋",
        title: "La complexité administrative",
        description:
          "Contrats, paies, déclarations, remplacements — une charge qui s'ajoute à une vie déjà très chargée.",
      },
      {
        fallback_icon: "🔍",
        title: "L'absence de suivi réel",
        description:
          "Des intervenants sans encadrement, sans formation spécifique, sans interlocuteur dédié. Personne ne pilote.",
      },
    ],
  },

  syndrome_pura: {
    section_tag: "Le syndrome PURA",
    title: "Une protéine déficiente. Un nom transformé en symbole.",
    description_1:
      "Le syndrome PURA est une maladie génétique rare causée par une mutation du gène PURA — protéine essentielle au développement du cerveau. Il entraîne des retards de développement, une hypotonie, des difficultés d'alimentation et des troubles neurologiques variés.",
    description_2:
      "C'est ce nom — celui de la protéine déficiente chez mon fils — qu'Arame a voulu transformer en symbole d'engagement : soutenir les aidants, garantir le bien-être des enfants.",
    badge_text: "PUR Alpha — comme la protéine PURA",
  },

  mission: {
    section_tag: "Notre mission",
    description:
      "Offrir un accompagnement bienveillant, sécurisé et stable, dans le respect du rythme et de la dignité de chaque enfant.",
  },

  valeurs: {
    section_tag: "Nos valeurs",
    title: "Ce qui guide",
    title_highlight: "chaque intervention",
    items: [
      {
        fallback_icon: "❤️",
        title: "Bientraitance",
        description: "Respect du rythme et de la dignité de chaque enfant, à chaque instant",
      },
      {
        fallback_icon: "🛡️",
        title: "Sécurité",
        description: "Sélection rigoureuse, formation spécialisée, assurance RC Pro",
      },
      {
        fallback_icon: "🔄",
        title: "Continuité",
        description: "Intervenants stables, référent famille dédié, remplacement sous 48h",
      },
      {
        fallback_icon: "✨",
        title: "Simplicité",
        description: "Zéro démarche administrative, un interlocuteur unique, tout compris",
      },
      {
        fallback_icon: "🔎",
        title: "Transparence",
        description: "Un tarif unique, des documents remis avant signature, aucune surprise",
      },
    ],
  },

  ambitions: {
    section_tag: "Nos ambitions",
    title: "Ce vers quoi",
    title_highlight: "nous tendons",
    description:
      "PUR Alpha grandit, mais jamais au détriment de ce qui nous définit : la proximité, l'humain, et la qualité de chaque accompagnement.",
    items: [
      {
        title: "Un service à taille humaine",
        description:
          "Grandir sans perdre ce qui fait notre force : la proximité, l'écoute et le suivi personnalisé de chaque famille.",
      },
      {
        title: "S'étendre vers le 93",
        description:
          "La Seine-Saint-Denis concentre de forts besoins en accompagnement. C'est notre prochain territoire naturel.",
      },
      {
        title: "Devenir une référence régionale",
        description:
          "Un modèle d'accompagnement reconnu par les familles, les partenaires et les institutions d'Île-de-France.",
      },
    ],
  },

  galerie: {
    images: [
      { libelle: "Présence & stimulation" },
      { libelle: "Épanouissement" },
      { libelle: "Douceur & confiance" },
      { libelle: "Aide au quotidien" },
      { libelle: "Sérénité retrouvée" },
    ],
  },

  pourquoi: {
    tag: "Pourquoi PUR Alpha existe",
    titre_ligne_1: "Un modèle pensé",
    title_highlight: "pour vous libérer",
    descrition_1:
      "Nous avons choisi le mode de la mise à disposition : PUR Alpha emploie directement les intervenants. Vous n'avez aucune démarche administrative à gérer.",
    description_2:
      "Pas de contrat, pas de paie, pas de déclarations — tout en gardant la liberté d'organiser le quotidien selon vos besoins.",
    notre_promesse_valeur:
      "Vous organisez le quotidien de votre enfant selon vos besoins. PUR Alpha sécurise tout le reste.",
    notre_promesse_libelle: "Notre promesse",
    legende: "La sérénité retrouvée, au quotidien",
    qualites: [
      { la_qualite: "Zéro démarche admin" },
      { la_qualite: "Référent famille dédié" },
      { la_qualite: "Intervenants formés 70h" },
      { la_qualite: "Continuité garantie" },
    ],
  },

  impact_local: {
    tag: "Impact local · Val-d'Oise",
    titre_1: "Ancrés dans",
    title_highlight: "notre territoire",
    description:
      "PUR Alpha est implanté au cœur du Val-d'Oise — un département que nous connaissons bien, où nous vivons, et où nous avons tissé nos premiers liens avec les familles et les acteurs locaux. Notre objectif : un service de proximité, ancré localement et toujours à taille humaine.",
    impacts: [
      { chiffre: 95, titre: "Val-d'Oise", description: "Siège social à Piscop\nAccueil familles à Montmagny", statut: "Actif" },
      { chiffre: 93, titre: "Seine-Saint-Denis", description: "Territoire à forts besoins\nExtension à moyen terme", statut: "À venir" },
    ],
  },

  cta_final: {
    citation:
      "Je crois profondément que chaque enfant mérite un accompagnement qui le fasse grandir, et que chaque famille a droit à un soutien sincère et sur-mesure.",
    auteur: "Arame Bougha — Fondatrice",
    "sous-titre": "PUR Alpha",
    cta_1_texte: "Prendre contact",
    cta_1_url: "/contact",
    cta_2_texte: "Découvrir nos services",
    cta_2_url: "/pour-les-familles",
  },
} as const;
