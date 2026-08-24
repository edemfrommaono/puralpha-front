import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/wordpress";
import { BLOG_POSTS_FALLBACK } from "@/lib/fallback-data/blog";
import { FadeInView } from "@/components/ui/FadeInView";

export const revalidate = 0;

interface BlogPostPageProps {
  params: { slug: string };
}

/**
 * Supprime du HTML le premier titre H1/H2 s'il répète le titre principal de l'article
 */
function cleanArticleContent(html: string, title: string): string {
  if (!html) return "";
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();
  const regex = new RegExp(`^\\s*<h[12][^>]*>\\s*${escapedTitle}\\s*<\\/h[12]>`, "i");
  return html.replace(regex, "");
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const allPosts = posts.length > 0 ? posts : BLOG_POSTS_FALLBACK;
  return allPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const wpPost = await getBlogPostBySlug(slug);
  const posts = await getBlogPosts();
  const post =
    wpPost ?? BLOG_POSTS_FALLBACK.find((p) => p.slug === slug) ?? null;

  if (!post) notFound();

  const pool = posts.length > 0 ? posts : BLOG_POSTS_FALLBACK;
  const suggestions = pool.filter((p) => p.slug !== slug).slice(0, 2);

  const cleanedContent = cleanArticleContent(post.content, post.title);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Fil d'Ariane & Retour */}
      <div className="container mx-auto px-4 lg:px-8 pt-6 pb-2 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <Link
            href="/actualite"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link
              href="/actualite"
              className="hover:text-teal-600 transition-colors"
            >
              Actualités
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-navy-800 font-medium truncate max-w-[180px]">
              {post.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content - Gabarit Ordre unique : Catégorie -> Titre -> Date/Auteur -> Image -> Contenu */}
      <article className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-6 sm:p-8 md:p-12">
          
          {/* 1. Catégorie(s) */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="bg-teal-50 text-teal-700 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* 2. Titre */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-800 leading-tight mb-6">
            {post.title}
          </h1>

          {/* 3. Méta-données (Auteur & Date) */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 mb-8">
            <div className="flex items-center gap-3">
              {post.author.avatarUrl ? (
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-teal-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 font-bold flex items-center justify-center text-xs uppercase">
                  {post.author.name.substring(0, 2)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-navy-800">
                  {post.author.name}
                </span>
                {post.author.role && (
                  <span className="text-xs text-gray-400">
                    {post.author.role}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-navy-800 bg-gray-50 px-3 py-1.5 rounded-full">
              <Calendar className="w-4 h-4 text-teal-500" />
              {post.date}
            </div>
          </div>

          {/* Visuel de couverture aux dimensions harmonisées */}
          {post.imageUrl && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-8 shadow-sm">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* 4. Contenu */}
          <FadeInView direction="up" delay={0.1} once={true} amount={0}>
            <div
              className="prose prose-slate max-w-none text-navy-800/95 leading-relaxed text-sm md:text-base
                prose-headings:text-navy-800 prose-headings:font-extrabold
                prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-5 prose-p:leading-relaxed
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-strong:font-bold prose-strong:text-navy-800
                prose-a:text-teal-600 prose-a:underline hover:prose-a:text-teal-700
                prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-navy-800/80 prose-blockquote:my-6"
              dangerouslySetInnerHTML={{ __html: cleanedContent }}
            />
          </FadeInView>
        </div>
      </article>

      {/* Section suggestions */}
      {suggestions.length > 0 && (
        <div className="container mx-auto px-4 lg:px-8 mt-12 max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold text-navy-800 mb-6">
            Actualités similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {suggestions.map((p) => (
              <Link
                href={`/actualite/${p.slug}`}
                key={p.id}
                className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] font-extrabold text-teal-600 bg-teal-50 uppercase tracking-wider px-2.5 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-navy-800 group-hover:text-teal-600 transition-colors line-clamp-2 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                    {p.excerpt}
                  </p>
                </div>
                <span className="text-xs font-bold text-navy-800 group-hover:text-teal-600 inline-flex items-center gap-1">
                  Lire l&apos;actualité{" "}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

