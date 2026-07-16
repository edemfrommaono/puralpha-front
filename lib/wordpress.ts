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
  BlogPostACF,
  ACFImage,
} from '@/types/wordpress';
import type { Post } from '@/lib/fallback-data/blog';

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
  image: { source_url?: string; url?: string } | number | false | null | undefined,
  options: { revalidate?: number } = {}
): Promise<string> {
  if (!image) return '';

  if (typeof image === 'string') {
    return image;
  }

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
// POSTS — BLOG / ACTUALITÉS
// ────────────────────────────────────────────────

/**
 * Décode les entités HTML (utile si WordPress a double-échappé le contenu)
 */
function decodeHTMLEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/<p[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '') // Supprime les paragraphes vides de Gutenberg
    .replace(/&nbsp;/g, ' '); // Remplace les espaces insécables parasites
}

/**
 * Formate un objet WPPost<BlogPostACF> en interface Post (fallback-data/blog).
 * Priorité : champs ACF > champs WordPress natifs.
 */
async function formatWPPost(wp: WPPost<BlogPostACF>): Promise<Post> {
  // Image mise en avant via _embedded
  const featuredMedia = wp._embedded?.['wp:featuredmedia']?.[0] as WPFeaturedMedia | undefined;
  const imageUrl = featuredMedia?.source_url ?? '';

  // Catégories : tous les termes de la taxonomie category (décodés pour éviter les &amp;)
  const terms = wp._embedded?.['wp:term']?.[0] as Array<{ name: string }> | undefined;
  const categories = terms && terms.length > 0 ? terms.map((t) => decodeHTMLEntities(t.name)) : ['Actualités'];

  // Date affichée : ACF date_publication ou date WP formatée
  let acfDate = wp.acf?.date_publication ?? '';
  if (acfDate && acfDate.length === 8) {
    const year = acfDate.substring(0, 4);
    const month = parseInt(acfDate.substring(4, 6), 10) - 1;
    const day = acfDate.substring(6, 8);
    try {
      acfDate = new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(parseInt(year), month, parseInt(day)));
    } catch {
      // Ignore
    }
  }
  const date = acfDate || formatWPDate(wp.date);

  // Auteur
  const authorNom  = wp.acf?.auteur?.nom  ?? 'PUR Alpha';
  const authorRole = wp.acf?.auteur?.role ?? '';
  const authorAvatarRaw = wp.acf?.auteur?.avatar;
  const authorAvatar = await resolveImageUrl(authorAvatarRaw as ACFImage);

  // Content (décodage si double échappement)
  const contentDecoded = decodeHTMLEntities(wp.content.rendered);

  // Extrait : ACF > WP excerpt (strip HTML) > WP content (strip HTML)
  let rawExcerpt = wp.acf?.extrait || wp.excerpt.rendered || contentDecoded;
  let excerpt = rawExcerpt.replace(/<[^>]*>/g, '').trim();
  if (excerpt.length > 200) {
    excerpt = excerpt.substring(0, 200) + '...';
  }

  return {
    id: String(wp.id),
    slug: wp.slug,
    title: wp.title.rendered,
    excerpt,
    content: contentDecoded,
    date,
    categories,
    imageUrl,
    videoUrl: wp.acf?.url_video || undefined,
    author: {
      name: authorNom,
      role: authorRole,
      avatarUrl: authorAvatar || undefined,
    },
  };
}

/** Formate une date ISO WordPress ("2026-06-12T17:07:00") en "12 juin 2026" */
function formatWPDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

/**
 * Récupère tous les articles de blog publiés, triés du plus récent au plus ancien.
 * Retourne un tableau vide en cas d'erreur (fallback géré côté page).
 */
export async function getBlogPosts(options: { per_page?: number } = {}): Promise<Post[]> {
  const { per_page = 100 } = options;
  try {
    const posts = await fetchAPI<WPPost<BlogPostACF>[]>(
      `/posts?_embed&per_page=${per_page}&orderby=date&order=desc&status=publish`,
      { revalidate: 0 }
    );
    return Promise.all(posts.map(formatWPPost));
  } catch {
    return [];
  }
}

/**
 * Récupère un article de blog par son slug.
 * Retourne null si l'article n'existe pas ou en cas d'erreur.
 */
export async function getBlogPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await fetchAPI<WPPost<BlogPostACF>[]>(
      `/posts?slug=${encodeURIComponent(slug)}&_embed&status=publish`,
      { revalidate: 0 }
    );
    if (!posts.length) return null;
    return await formatWPPost(posts[0]);
  } catch {
    return null;
  }
}
