import { getBlogPosts } from "@/lib/wordpress";
import { BLOG_POSTS_FALLBACK } from "@/lib/fallback-data/blog";
import { BlogClient } from "@/components/sections/blog/BlogClient";
import { PageBanner } from "@/components/ui/PageBanner";

export const revalidate = 0;

export default async function BlogPage() {
  const wpPosts = await getBlogPosts();

  if (wpPosts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50/50 pb-20">
        <PageBanner title="Nos" titleHighlight="Actualités" />
        <div className="container mx-auto px-4 lg:px-8 mt-16 max-w-xl text-center">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-6">
            <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-4xl shadow-inner">
              📰
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-3">Aucune actualité pour le moment</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Nous n&apos;avons pas encore publié d&apos;articles. N&apos;hésitez pas à repasser plus tard pour découvrir nos dernières actualités et conseils !
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }

  const posts = wpPosts;

  // Catégories dynamiques (statiques + réelles)
  const fallbackCategories = ["Sensibilisation", "Démarches & Aides", "Activités"];
  const categories = [
    "Tous",
    ...Array.from(new Set([...fallbackCategories, ...posts.flatMap((p) => p.categories)])).filter(Boolean),
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <PageBanner title="Nos" titleHighlight="Actualités" />
      <BlogClient posts={posts} categories={categories} />
    </div>
  );
}
