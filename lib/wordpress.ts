/**
 * WordPress REST API Client
 * Projet PUR Alpha — Site monolingue français (pas de paramètre lang)
 *
 * Revalidation strategy:
 *   - revalidate = 0 pour les contenus textuels (toujours frais)
 *   - revalidate = 30 pour les médias/images
 */

import type {
  WPPage,
  WPPost,
  WPFeaturedMedia,
  HomePageACF,
  NotreHistoireACF,
  PourLesFamillesACF,
  AidesFinancieresACF,
  NousRejoindreACF,
  ContactPageACF,
} from '@/types/wordpress';

const WP_API_BASE_URL =
  process.env.NEXT_PUBLIC_WP_API_URL || 'https://bk.puralpha.fr/wp-json/wp/v2';

// ────────────────────────────────────────────────
// FONCTION FETCH CENTRALE
// ────────────────────────────────────────────────

async function fetchAPI<T>(
  endpoint: string,
  options: { revalidate?: number | false } = {}
): Promise<T> {
  const { revalidate = 0 } = options;
  const url = `${WP_API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress API Error: ${response.status} ${response.statusText} — ${url}`
    );
  }

  return response.json();
}

// ────────────────────────────────────────────────
// HELPERS — RÉSOLUTION D'IMAGES
// ────────────────────────────────────────────────

/**
 * Résout un ID ou objet image WordPress ACF en URL string.
 * Gère les cas : number (ID), objet {source_url}, objet {url}, null.
 */
export async function resolveImageUrl(
  image: { source_url?: string; url?: string } | number | null | undefined,
  options: { revalidate?: number } = {}
): Promise<string> {
  if (!image) return '';

  if (typeof image === 'object') {
    if ('source_url' in image && image.source_url) return image.source_url;
    if ('url' in image && image.url) return image.url;
  }

  if (typeof image === 'number') {
    try {
      const media = await fetchAPI<WPFeaturedMedia>(`/media/${image}`, {
        revalidate: options.revalidate ?? 30,
      });
      return media?.source_url || '';
    } catch {
      return '';
    }
  }

  return '';
}

// ────────────────────────────────────────────────
// PAGES — FONCTIONS DE RÉCUPÉRATION
// ────────────────────────────────────────────────

/**
 * Récupère une page WordPress par son slug.
 * Retourne null si la page n'existe pas ou en cas d'erreur.
 */
export async function getPageBySlug<T = Record<string, unknown>>(
  slug: string,
  options: { revalidate?: number } = {}
): Promise<WPPage<T> | null> {
  try {
    const pages = await fetchAPI<WPPage<T>[]>(
      `/pages?slug=${slug}&_embed`,
      options
    );
    return pages[0] || null;
  } catch {
    return null;
  }
}

/** Page d'accueil (slug: pur-alpha) */
export async function getHomePage() {
  return getPageBySlug<HomePageACF>('pur-alpha', { revalidate: 0 });
}

/** Page Notre Histoire (slug: notre-histoire) */
export async function getNotreHistoirePage() {
  return getPageBySlug<NotreHistoireACF>('notre-histoire', { revalidate: 0 });
}

/** Page Pour les Familles (slug: pour-les-familles) */
export async function getPourLesFamillesPage() {
  return getPageBySlug<PourLesFamillesACF>('pour-les-familles', {
    revalidate: 0,
  });
}

/** Page Aides Financières (slug: aides-financieres) */
export async function getAidesFinancieresPage() {
  return getPageBySlug<AidesFinancieresACF>('aides-financieres', {
    revalidate: 0,
  });
}

/** Page Nous Rejoindre (slug: nous-rejoindre) */
export async function getNousRejoindrePage() {
  return getPageBySlug<NousRejoindreACF>('nous-rejoindre', { revalidate: 0 });
}

/** Page Contact (slug: contact) */
export async function getContactPage() {
  return getPageBySlug<ContactPageACF>('contact', { revalidate: 0 });
}

// ────────────────────────────────────────────────
// MÉDIAS
// ────────────────────────────────────────────────

/** Récupère un média par son ID */
export async function getMediaById(id: number) {
  return fetchAPI<WPFeaturedMedia>(`/media/${id}`, { revalidate: 30 });
}

// ────────────────────────────────────────────────
// POSTS (pour un futur blog / actualités)
// ────────────────────────────────────────────────

export async function getPosts<T = Record<string, unknown>>(
  options: { per_page?: number } = {}
) {
  const { per_page = 100 } = options;
  try {
    return await fetchAPI<WPPost<T>[]>(
      `/posts?_embed&per_page=${per_page}&orderby=date&order=desc`,
      { revalidate: 0 }
    );
  } catch {
    return [];
  }
}
