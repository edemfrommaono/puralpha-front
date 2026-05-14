/**
 * Données de fallback pour la page Pour les Familles.
 * Utilisées quand WordPress ne répond pas ou que les champs ACF sont vides.
 */

export const POUR_LES_FAMILLES_FALLBACK = {
  hero: {
    title: "Votre enfant mérite une",
    title_highlight: "présence stable et bienveillante",
    description: "PUR Alpha vous met à disposition des intervenants spécialisés, sélectionnés, formés et encadrés — pour que vous puissiez souffler, en toute confiance.",
    cta_primary_text: "Parlons de votre situation →",
    cta_secondary_text: "Voir les aides financières",
    stats: [
      { value: "0–25", label: "ans accompagnés" },
      { value: "70h", label: "formation minimale" },
      { value: "38€", label: "tarif unique / heure" },
      { value: "50%", label: "crédit d'impôt" },
    ],
  },

  handicaps: {
    title: "Toutes les situations de",
    title_highlight: "handicap",
    description: "Chaque demande est étudiée avec attention, dans un esprit d'ouverture et de dialogue. Chaque enfant bénéficie d'un projet individualisé — pas de solutions standardisées.",
    types: [
      { fallback_icon: "🧠", label: "TSA / Autisme" },
      { fallback_icon: "⚡", label: "TDAH" },
      { fallback_icon: "♿", label: "Handicap moteur" },
      { fallback_icon: "👁️", label: "Handicap sensoriel" },
      { fallback_icon: "💡", label: "Déficience intellectuelle" },
      { fallback_icon: "🔬", label: "Maladies rares" },
      { fallback_icon: "📋", label: "Autres situations" },
      { fallback_icon: "🧩", label: "Polyhandicap" },
    ],
    highlight_quote: "\"Un enfant = un projet individualisé.\"",
    highlight_description: "Evaluation des besoins, des habitudes de vie, respect de la personnalité et du rythme de chaque enfant. Aucune solution standardisée.",
  },

  services: {
    title: "Ce que nous faisons",
    title_highlight: "concrètement",
    description: "Vous composez librement votre accompagnement : horaires, fréquence, contenu des missions. Tout est ajustable au fil du temps selon vos besoins réels.",
    cards: [
      { tag: "Éducatif", title: "Présence éducative & Activités", description: "Présence bienveillante et stimulante : jeux, lecture, activités sensorielles, sorties encadrées, aide aux devoirs.", tags: [{ text: "Jeux adaptés" }, { text: "Aide aux devoirs" }, { text: "Sorties encadrées" }] },
      { tag: "Quotidien", title: "Aide au quotidien", description: "Accompagnement dans les gestes ordinaires : repas, habillage, hygiène, mobilité.", tags: [{ text: "Repas & habillage" }, { text: "Hygiène" }, { text: "Mobilité" }] },
      { tag: "Répit", title: "Relais parental & Répit", description: "Présence ponctuelle en soirées, week-ends ou vacances. Pour permettre aux parents de souffler.", tags: [{ text: "Soirées" }, { text: "Week-ends" }, { text: "Vacances" }] },
    ],
  },

  etapes: {
    title: "Comment ça marche ?",
    description: "De la première prise de contact à l'intervention, nous vous accompagnons à chaque étape.",
    steps: [
      { number: "1", title: "Premier contact", description: "Écoute de votre situation et de vos besoins." },
      { number: "2", title: "Évaluation à domicile", description: "Visite pour comprendre les besoins de votre enfant." },
      { number: "3", title: "Plan personnalisé", description: "Fiche mission sur-mesure avec vos consignes." },
      { number: "4", title: "Mise en place", description: "Intervenant formé et suivi par votre référent." },
    ],
    cta_text: "Prendre contact",
    cta_url: "/contact",
  },

  limites: {
    title: "Nos limites d'intervention",
    title_highlight: "en toute transparence",
    ce_que_nous_faisons: [
      { text: "Garde à domicile et présence active auprès de l'enfant" },
      { text: "Accompagnement à pied (école, activités, sorties proches)" },
      { text: "Aide aux gestes du quotidien (repas, hygiène, change)" },
      { text: "Présence bienveillante et stimulation adaptée" },
      { text: "Coordination avec les parents et l'entourage éducatif" },
      { text: "Relais lors des temps périscolaires, week-ends, vacances" },
    ],
    ce_que_nous_ne_faisons_pas: [
      { text: "Actes médicaux ou paramédicaux spécialisés" },
      { text: "Transport en véhicule" },
      { text: "Remplacement d'un éducateur spécialisé ou orthophoniste" },
      { text: "Prise en charge médicale ou thérapeutique" },
      { text: "Communication d'informations sans accord des parents" },
      { text: "Tout cadre rigide ou contraire à la bientraitance" },
    ],
    badges: [
      { text: "Agrément qualité SAP" },
      { text: "DDETS Val-d'Oise" },
      { text: "SIRET 989 156 989 00018" },
      { text: "Assurance RC Pro Hiscox" },
      { text: "Médiateur CMCO agréé" },
    ],
  },

  garanties: {
    title: "Ce qui protège",
    title_highlight: "votre enfant",
    description: "La sécurité et la bientraitance sont les fondements de chaque intervention. Voici nos engagements concrets.",
    items: [
      { fallback_icon: "🕵️‍♀️", title: "Sélection rigoureuse", description: "Entretien individuel approfondi, vérification du casier judiciaire (B3), contrôle des références professionnelles." },
      { fallback_icon: "📚", title: "Formation 70h minimum", description: "Formation initiale spécialisée handicap, bientraitance, sécurité et gestes du quotidien." },
      { fallback_icon: "📞", title: "Référent famille dédié", description: "Un interlocuteur unique pour toute question, ajustement ou alerte." },
      { fallback_icon: "📓", title: "Cahier de liaison", description: "Suivi quotidien des interventions — papier ou numérique. Traçabilité complète." },
      { fallback_icon: "🛡️", title: "Assurance RC Pro", description: "Couverture Hiscox N° HA RCP0593442 pour toutes les interventions réalisées à domicile." },
      { fallback_icon: "🔄", title: "Continuité garantie", description: "Remplacement organisé sous 48h en cas d'absence imprévue. Numéro d'astreinte disponible." },
    ],
  },

  faq: {
    section_tag: "Questions fréquentes",
    title: "Vos questions,",
    title_highlight: "nos réponses",
    items: [
      { question: "PUR Alpha est-il agréé ?", answer: "Oui, PUR Alpha dispose de l'agrément qualité SAP délivré par la DDETS du Val-d'Oise." },
      { question: "Combien coûte réellement le service après les aides ?", answer: "Avec le crédit d'impôt de 50% et la PCH, le reste à charge peut descendre à environ 6,71€/h." },
      { question: "Les familles sont-elles employeurs ?", answer: "Non, en mode prestataire, PUR Alpha est l'employeur. Vous n'avez aucune démarche administrative." },
      { question: "Que se passe-t-il si l'intervenant est absent ?", answer: "Nous garantissons la continuité du service en organisant un remplacement sous 48h." },
      { question: "Peut-on modifier ou arrêter l'accompagnement ?", answer: "Oui, notre approche est flexible et s'adapte à l'évolution de vos besoins familiaux." },
      { question: "Mon enfant a une maladie rare — PUR Alpha peut-il l'accompagner ?", answer: "Nos intervenants sont rigoureusement formés (minimum 70h) et sensibilisés à une grande diversité de situations, y compris les maladies rares." },
    ],
  },

  cta_final: {
    title: "Parce que votre enfant mérite un accompagnement",
    title_highlight: "à la hauteur de ses besoins.",
    subtitle: "Et parce que prendre soin de son enfant, c'est aussi prendre soin de vous.",
    badges: [
      { text: "Devis gratuit" },
      { text: "Sans engagement" },
      { text: "Réponse sous 48h" },
    ],
    cta_text: "Prendre contact",
    cta_url: "/contact",
  },
} as const;
