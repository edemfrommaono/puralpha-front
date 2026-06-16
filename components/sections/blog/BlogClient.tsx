"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Filter, Search } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";
import type { Post } from "@/lib/fallback-data/blog";

interface BlogClientProps {
  posts: Post[];
  categories: string[];
}

export function BlogClient({ posts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const cleanStr = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&amp;/g, "et")
      .replace(/&/g, "et")
      .replace(/\s+/g, "")
      .trim();

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Tous" ||
      post.categories.some((cat) => cleanStr(cat) === cleanStr(selectedCategory));
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 mt-10 lg:mt-12 max-w-6xl">
      {/* Barre de Filtres / Recherche */}
      <FadeInView
        direction="up"
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
      >
        {/* Catégories */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-gray-400 mr-1 hidden sm:inline-block" />
          {categories.map((cat) => {
            const isActive = cleanStr(selectedCategory) === cleanStr(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0d3d4f] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Recherche */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une actualité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
          />
        </div>
      </FadeInView>

      {/* Grille d'articles */}
      {filteredPosts.length > 0 ? (
        <div
          key={selectedCategory + searchQuery}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                    <span className="text-teal-300 text-4xl">📰</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-white/90 backdrop-blur-md text-[#0d3d4f] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-800 line-clamp-2 mb-3 group-hover:text-teal-500 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>

                {/* Footer carte */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.author.avatarUrl ? (
                      <img
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xs font-bold uppercase">
                        {post.author.name.substring(0, 2)}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-navy-800">
                        {post.author.name}
                      </span>
                      {post.author.role && (
                        <span className="text-[10px] text-gray-400">
                          {post.author.role}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/actualite/${post.slug}`}
                    className="w-9 h-9 rounded-full bg-[#ecf4f6] text-[#0d3d4f] hover:bg-[#0d3d4f] hover:text-white flex items-center justify-center transition-colors duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <FadeInView
          direction="up"
          className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 max-w-md mx-auto shadow-sm flex flex-col items-center justify-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-2xl">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-800 mb-1">
              Aucune actualité trouvée
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Nous n&apos;avons trouvé aucune actualité correspondant à
              vos critères.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("Tous");
              setSearchQuery("");
            }}
            className="mt-2 bg-[#0d3d4f] hover:bg-[#145c72] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-sm transition-all duration-200"
          >
            Réinitialiser les filtres
          </button>
        </FadeInView>
      )}
    </div>
  );
}
