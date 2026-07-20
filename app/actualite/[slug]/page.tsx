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
 * Génération statique des slugs connus au build
 * (Next.js prefetch + ISR pour les nouveaux articles)
 */
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const allPosts = posts.length > 0 ? posts : BLOG_POSTS_FALLBACK;
  return allPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Dans Next.js 15+, les params sont asynchrones
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Cherche d'abord dans WordPress, fallback sur les données statiques
  const wpPost = await getBlogPostBySlug(slug);
  const posts = await getBlogPosts();
  const post =
    wpPost ?? BLOG_POSTS_FALLBACK.find((p) => p.slug === slug) ?? null;

  if (!post) notFound();

  // Suggestions : autres articles (WP en priorité, fallback sinon)
  const pool = posts.length > 0 ? posts : BLOG_POSTS_FALLBACK;
  const suggestions = pool.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Fil d'Ariane & Retour */}
      <div className="container mx-auto px-4 lg:px-8 pt-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/actualite"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-teal-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-teal-500 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/actualite"
              className="hover:text-teal-500 transition-colors"
            >
              Actualités
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-500 font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Cover Image */}
          <div className="relative h-64 md:h-[400px] w-full bg-gray-100">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                <span className="text-teal-300 text-6xl">📰</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Badge catégorie mobile */}
            <div className="absolute bottom-6 left-6 right-6 text-white md:hidden">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-teal-400 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full inline-block"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-xl font-bold leading-tight">{post.title}</h1>
            </div>
          </div>

          <div className="p-6 md:p-12">
            {/* Header (Desktop) */}
            <div className="hidden md:block mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-navy-800 leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Auteur & Méta données */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-100 mb-8 md:mb-10">
              <div className="flex items-center gap-3">
                {post.author.avatarUrl ? (
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold uppercase">
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

              <div className="flex items-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {post.date}
                </span>
              </div>
            </div>

            {/* Corps de l'article */}
            <FadeInView direction="up" delay={0.1} once={true} amount={0}>
              <div
                className="prose prose-slate max-w-none text-navy-800/95 leading-relaxed text-sm md:text-base
                prose-headings:text-navy-800 prose-headings:font-extrabold
                prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:mb-4
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-strong:font-bold prose-strong:text-navy-800
                prose-blockquote:border-l-4 prose-blockquote:border-teal-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </FadeInView>
          </div>
        </div>
      </article>

      {/* Section suggestions */}
      {suggestions.length > 0 && (
        <div className="container mx-auto px-4 lg:px-8 mt-16 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold text-navy-800 mb-6">
            Actualités similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {suggestions.map((p) => (
              <Link
                href={`/actualite/${p.slug}`}
                key={p.id}
                className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="flex flex-wrap gap-1">
                  {p.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-bold text-teal-600 uppercase tracking-wider"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-navy-800 group-hover:text-teal-500 transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {p.excerpt}
                </p>
                <span className="text-xs font-semibold text-[#0d3d4f] inline-flex items-center gap-1 mt-2">
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
