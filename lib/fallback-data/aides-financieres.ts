/**
 * Données de fallback pour la page Aides Financières.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 */

export const AIDES_FALLBACK = {
  hero: {
    title_line_1: "L'accompagnement",
    title_line_2: "que vous méritez,",
    title_highlight: "au juste prix.",
    description:
      "Plusieurs dispositifs permettent de réduire significativement votre reste à charge. PUR Alpha vous aide à les identifier et à les mobiliser.",
    badges: [
      { value: "38€", label: "tarif horaire TTC unique" },
      { value: "50%", label: "crédit d'impôt garanti" },
      { value: "≈6,70€", label: "reste à charge avec PCH" },
    ],
  },

  aides: {
    section_tag: "Dispositifs mobilisables",
    title: "Les 4 aides qui peuvent",
    title_highlight: "changer tout",
    description:
      "Ces aides sont cumulables dans certains cas. PUR Alpha vous accompagne pour évaluer ce à quoi vous avez droit.",
  },

  aides_cards: [
    {
      accent_color: "#52bdc7",
      fallback_icon: "🤝",
      title: "PCH",
      subtitle: "Prestation de Compensation du Handicap",
      description:
        "Prise en charge totale ou partielle selon le plan MDPH attribué. C'est l'aide principale pour les familles d'enfants handicapés — elle peut couvrir une grande partie du coût horaire.",
      highlight_value: "≈ 24,58 €/h",
      highlight_label: "référence horaire 2024",
      tags: [
        { text: "MDPH" },
        { text: "Aide humaine" },
        { text: "0–60 ans" },
      ],
    },
    {
      accent_color: "#f2c94c",
      fallback_icon: "💰",
      title: "50%",
      subtitle: "Crédit d'impôt SAP — Art. 199 sexdecies CGI",
      description:
        "Vous récupérez 50% des sommes versées, même si vous n'êtes pas imposable. C'est une aide universelle, automatique, sans démarche complexe.",
      highlight_value: "50% remboursés",
      highlight_label: "sur toutes les prestations SAP",
      tags: [
        { text: "Déclaration impôts" },
        { text: "Non-imposables inclus" },
      ],
    },
    {
      accent_color: "#1c3553",
      fallback_icon: "👶",
      title: "AEEH",
      subtitle: "Allocation d'Éducation de l'Enfant Handicapé",
      description:
        "Versée par la CAF, elle peut s'ajouter à la PCH ou la remplacer selon les situations. Elle comprend une allocation de base et jusqu'à 6 compléments selon le degré de handicap.",
      highlight_value: "CAF",
      highlight_label: "selon taux d'incapacité",
      tags: [
        { text: "0–20 ans" },
        { text: "6 compléments" },
        { text: "Cumulable CI" },
      ],
    },
    {
      accent_color: "#718096",
      fallback_icon: "🏛️",
      title: "Aides +",
      subtitle: "Aides facultatives & locales",
      description:
        "D'autres dispositifs peuvent s'ajouter selon votre situation : aides de la CAF, du CCAS, de votre mutuelle, ou des fonds de solidarité départementaux. PUR Alpha vous aide à les identifier.",
      highlight_value: "Variable",
      highlight_label: "selon situation et territoire",
      tags: [
        { text: "CAF" },
        { text: "CCAS" },
        { text: "Mutuelles" },
      ],
    },
  ],

  tarification: {
    section_tag: "Notre tarification",
    title: "Un tarif unique.",
    title_highlight: "Aucune surprise.",
    price: "38",
    price_details: "TTC / heure · TVA 5,5% · Tarif tout compris",
    inclus_badges: [
      { text: "Recrutement & sélection" },
      { text: "Formation 70h" },
      { text: "Référent famille" },
      { text: "Cahier de liaison" },
      { text: "Assurance RC Pro" },
      { text: "Gestion des remplacements" },
      { text: "Attestation fiscale annuelle" },
    ],
    rows: [
      { creneau: "Semaine — 7h à 22h", tarif_ttc: "38,00 €", aide_pch: "24,58 €", credit_impot: "sur le reste", reste_a_charge: "6,71 €/h" },
      { creneau: "Nuit — 22h à 7h", tarif_ttc: "49,40 €", aide_pch: "24,58 €", credit_impot: "sur le reste", reste_a_charge: "12,41 €/h" },
      { creneau: "Dimanche (≤ 2/mois)", tarif_ttc: "41,80 €", aide_pch: "24,58 €", credit_impot: "sur le reste", reste_a_charge: "8,61 €/h" },
      { creneau: "Jours fériés ordinaires", tarif_ttc: "41,80 €", aide_pch: "24,58 €", credit_impot: "sur le reste", reste_a_charge: "8,61 €/h" },
      { creneau: "1er mai / 25 déc.", tarif_ttc: "76,00 €", aide_pch: "24,58 €", credit_impot: "sur le reste", reste_a_charge: "25,71 €/h" },
    ],
    footnote: "Tarifs TTC TVA 5,5%. Référence PCH indicative : ≈ 24,58 €/h (2024). Crédit d'impôt calculé sur le reste après PCH.",
  },

  simulateur: {
    tag: "Simulateur",
    titre: "Estimez votre",
    title_highlight: "reste à charge",
    description:
      "Ces estimations sont indicatives. Une simulation personnalisée est réalisée avant toute signature de contrat.",
  },

  accompagnement_admin: {
    tag: "Accompagnement administratif",
    titre_1: "Vous n'êtes pas",
    titre_2: "dans les démarches",
    title_highlight: "seuls",
    description:
      "PUR Alpha vous accompagne dans l'identification et le montage des dossiers d'aides. Parce que la complexité administrative ne doit pas être un frein.",
    accompagnements: [
      {
        ordre: 1,
        titre: "Identification des aides",
        description:
          "Nous analysons votre situation pour identifier toutes les aides auxquelles vous avez droit : PCH, AEEH, crédit d'impôt, aides locales.",
      },
      {
        ordre: 2,
        titre: "Simulation personnalisée",
        description:
          "Avant toute signature, une simulation précise de votre reste à charge est réalisée en tenant compte de votre plan MDPH et de votre situation fiscale.",
      },
      {
        ordre: 3,
        titre: "Soutien aux dossiers",
        description:
          "Nous vous fournissons tous les documents nécessaires (devis, attestations, factures) et vous orientons vers les bons interlocuteurs pour vos demandes.",
      },
    ],
    processus: [
      {
        tag: "Facturation",
        titre: "Mensuelle & détaillée",
        description:
          "Émission en fin de mois, détail clair des heures et prestations réalisées. Par email ou courrier.",
      },
      {
        tag: "Paiement",
        titre: "Plusieurs options",
        description:
          "Virement bancaire, prélèvement SEPA sécurisé, CESU préfinancé accepté. Pas d'espèces.",
      },
      {
        tag: "Annulation",
        titre: "Préavis 48h",
        description:
          "Annulation ≥ 48h : heures non facturées. Annulation < 48h : heures dues sauf urgence avérée.",
      },
    ],
  },

  cta_final: {
    title: "Parce que votre enfant mérite un accompagnement",
    title_highlight: "à la hauteur de ses besoins.",
    description:
      "Et parce que prendre soin de son enfant, c'est aussi prendre soin de vous.",
    cta_text: "Prendre contact",
    cta_url: "/contact",
    badges: [
      { titre: "Devis gratuit" },
      { titre: "Sans engagement" },
      { titre: "Réponse sous 48h" },
    ],
  },
} as const;
