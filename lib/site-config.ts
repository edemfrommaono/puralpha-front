/**
 * Configuration centrale du site PUR Alpha.
 * Source unique de vérité pour les coordonnées, le médiateur de la consommation
 * et les réseaux sociaux — utilisée par le Footer, la page Actualités, etc.
 * (Instructions §7.8, §7.9, §8.1, §8.2, §8.4)
 */

/** Coordonnées validées — identiques partout sur le site */
export const SITE_CONFIG = {
  name: "PUR Alpha",
  address: "26 rue des Sablons, 95360 Montmagny",
  email: "contact@puralpha.fr",
  phone: "06 14 79 60 47",
  hours: "Lun-Ven : 9h30 – 17h30",
} as const;

/**
 * Médiateur de la consommation (fiche CMCO).
 * Le PDF est servi statiquement depuis /public/documents.
 * Pour intégrer la fiche officielle transmise par le client : écraser le fichier
 * public/documents/fiche-mediateur-consommation.pdf en conservant exactement ce nom.
 */
export const MEDIATOR = {
  name: "Centre de Médiation de la Consommation d'Opale (CMCO)",
  pdfPath: "/documents/fiche-mediateur-consommation.pdf",
  website: "https://www.cmco-mediation.fr/",
  websiteLabel: "cmco-mediation.fr",
} as const;

/**
 * Réseaux sociaux PUR Alpha — liens définitifs validés par le client (§8.4).
 * Source unique utilisée par le Footer ET la page Actualités.
 */
export const SOCIAL_LINKS = [
  { key: "facebook", label: "Facebook", url: "https://www.facebook.com/profile.php?id=61586059442793&locale=fr_FR" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/pur_alpha/" },
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/pur-alpha/" },
] as const;
