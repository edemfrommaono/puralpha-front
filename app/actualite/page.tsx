import { getBlogPosts } from "@/lib/wordpress";
import { BLOG_POSTS_FALLBACK } from "@/lib/fallback-data/blog";
import { BlogClient } from "@/components/sections/blog/BlogClient";
import { PageBanner } from "@/components/ui/PageBanner";

export const revalidate = 0;

export default async function BlogPage() {
  const wpPosts = await getBlogPosts();
  // Fallback si WordPress ne renvoie rien
  const posts = wpPosts.length > 0 ? wpPosts : BLOG_POSTS_FALLBACK;

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
