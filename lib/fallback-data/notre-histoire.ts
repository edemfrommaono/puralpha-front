/**
 * Données de fallback pour la page Notre Histoire.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 * Textes repris de la maquette validée (notre-histoire-maquette.html).
 */

export const NOTRE_HISTOIRE_FALLBACK = {
  hero: {
    section_tag: "Notre histoire",
    title: "Pourquoi PUR Alpha",
    title_highlight: "existe",
    description:
      "PUR Alpha est né de mon histoire avec Matthew, mon fils, porteur du syndrome PURA, et de plusieurs années passées à chercher pour lui un accompagnement à domicile fiable et stable.",
    quote:
      "Ce que je n'ai pas trouvé pour mon fils, j'ai décidé de le construire pour d'autres familles.",
    founder_name: "Arame Bougha",
    founder_role: "Fondatrice de PUR Alpha",
    photo_legende: "Photographie d'Arame & Matthew",
    photo_note:
      "Photo personnelle à intégrer — aucune image de substitution n'est publiée avant validation.",
  },

  relais: {
    title: "Quand trouver un relais",
    title_highlight: "devient un parcours",
    paragraph_1:
      "J'ai connu les changements d'intervenants, les absences, les difficultés de remplacement et ces moments où il faut encore réorganiser le quotidien et tout réexpliquer.",
    paragraph_2:
      "Comme beaucoup de parents, je ne cherchais pas simplement quelqu'un de disponible quelques heures.",
    paragraph_highlight:
      "Je cherchais une personne préparée, un accompagnement stable et une organisation sur laquelle je puisse compter.",
    image_alt: "Accompagnement d'un enfant à domicile",
  },

  galerie: {
    title: "Matthew et moi,",
    title_highlight: "au quotidien",
    // Tant qu'aucune photo n'est chargée dans WordPress, 4 emplacements réservés s'affichent.
    photos: [
      { libelle: "Arame & Matthew", note: "Emplacement réservé" },
      { libelle: "Arame & Matthew", note: "Emplacement réservé" },
      { libelle: "Arame & Matthew", note: "Emplacement réservé" },
      { libelle: "Arame & Matthew", note: "Emplacement réservé" },
    ],
  },

  video: {
    title: "Notre histoire, racontée",
    title_highlight: "de vive voix",
    description:
      "Certaines choses se comprennent mieux quand on les entend. Je reviens sur ces années passées à chercher un accompagnement fiable pour Matthew, sur ce qui manquait vraiment aux familles, et sur la conviction qui a donné naissance à PUR Alpha.",
    placeholder_label: "Vidéo à venir",
    placeholder_note: "Emplacement réservé",
  },

  construction: {
    title: "Ce qui manquait, j'ai décidé de",
    title_highlight: "le construire",
    paragraph_1:
      "Avec le temps, une conviction s'est imposée : la qualité d'un accompagnement ne repose pas seulement sur la personne qui intervient.",
    paragraph_2:
      "Elle repose aussi sur la manière dont elle est recrutée, préparée, encadrée et suivie.",
    paragraph_highlight: "C'est de cette conviction qu'est né PUR Alpha.",
    image_alt: "Une famille accompagnée par PUR Alpha",
  },

  experience: {
    title: "Une expérience personnelle, mais aussi",
    title_highlight: "professionnelle",
    stats: [
      {
        chiffre: "20 ans +",
        description:
          "d'expérience professionnelle, dont la gestion administrative de PME et TPE",
      },
      {
        chiffre: "10 ans",
        description:
          "en ressources humaines : recrutement, encadrement, suivi des équipes",
      },
    ],
    paragraph_1:
      "Mon histoire de mère m'a appris ce dont les familles ont besoin. Plus de vingt ans d'expérience professionnelle, dont dix années dans les ressources humaines après un parcours en gestion administrative de PME/TPE, m'ont donné les outils pour structurer une réponse.",
    paragraph_highlight:
      "Recruter avec exigence, préparer les interventions, encadrer les professionnels et construire de la continuité : PUR Alpha est né de la rencontre entre ces deux expériences.",
  },

  methode: {
    title: "Du vécu à une",
    title_highlight: "méthode",
    description:
      "Mon expérience personnelle m'a montré ce qui manquait aux familles. Mon parcours professionnel m'a donné les outils pour construire une réponse structurée : recruter avec exigence, former, encadrer et suivre les accompagnements dans la durée.",
    etapes: [
      { titre: "Recruter avec exigence" },
      { titre: "Structurer les interventions" },
      { titre: "Encadrer dans la durée" },
    ],
  },

  valeurs: {
    section_tag: "Nos valeurs",
    title: "Ce qui guide",
    title_highlight: "PUR Alpha",
    items: [
      { titre: "Exigence" },
      { titre: "Franchise" },
      { titre: "Constance" },
    ],
  },

  citation_finale: {
    citation:
      "Je ne connais pas votre histoire, mais je sais ce que représente le fait de chercher un relais sur lequel on puisse réellement compter. C'est ce que je veux construire avec PUR Alpha.",
    auteur: "Arame Bougha",
    role: "Fondatrice et présidente de PUR Alpha",
    cta_texte: "Découvrir nos services",
    cta_url: "/nos-services",
  },
} as const;
