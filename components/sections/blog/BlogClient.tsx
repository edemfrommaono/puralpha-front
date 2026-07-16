"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Search, Play, X, Facebook, Instagram, Linkedin } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";
import type { Post } from "@/lib/fallback-data/blog";

interface BlogClientProps {
  posts: Post[];
  categories: string[]; // Gardé pour la compatibilité des signatures
}

export function BlogClient({ posts }: BlogClientProps) {
  const [activeTab, setActiveTab] = useState<"Articles" | "Actualités" | "Vidéos">("Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Helper pour classer automatiquement les articles selon leurs catégories (insensible à la casse)
  const getPostRubrique = (post: Post): "Articles" | "Actualités" | "Vidéos" => {
    const cats = post.categories.map((c) => c.toLowerCase());
    if (cats.some((c) => c.includes("vidéo") || c.includes("video"))) return "Vidéos";
    if (cats.some((c) => c.includes("actualité") || c.includes("actualite"))) return "Actualités";
    return "Articles";
  };

  const filteredPosts = posts.filter((post) => {
    const postRubrique = getPostRubrique(post);
    const matchesTab = postRubrique === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 mt-10 lg:mt-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Colonne Principale : Onglets & Cartes (3/4) */}
        <div className="w-full lg:w-3/4 flex flex-col">
          
          {/* Onglets des Rubriques */}
          <div className="flex border-b border-gray-200 mb-8 relative">
            <div className="flex gap-6 md:gap-10">
              {(["Articles", "Actualités", "Vidéos"] as const).map((tab) => {
                const isActive = activeTab === tab;
                const count = posts.filter((p) => getPostRubrique(p) === tab).length;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSearchQuery(""); // Réinitialise la recherche lors du changement d'onglet
                    }}
                    className={`pb-4 text-sm md:text-base font-bold transition-all relative border-b-2 cursor-pointer ${
                      isActive
                        ? "border-teal-500 text-teal-600 font-extrabold"
                        : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab}
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      isActive ? "bg-teal-500/10 text-teal-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grille d'articles / vidéos */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => {
                const isVideo = activeTab === "Vidéos";
                return (
                  <article
                    key={post.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Image / Thumbnail */}
                    <div 
                      className={`relative h-52 w-full bg-gray-100 overflow-hidden ${
                        isVideo ? "cursor-pointer" : ""
                      }`}
                      onClick={() => isVideo && post.videoUrl && setActiveVideoUrl(post.videoUrl)}
                    >
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                          <span className="text-teal-300 text-4xl">
                            {isVideo ? "🎥" : "📰"}
                          </span>
                        </div>
                      )}
                      
                      {/* Badge catégorie secondaire */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {post.categories
                          .filter((c) => c !== "Articles" && c !== "Actualités" && c !== "Vidéos")
                          .map((cat) => (
                            <span
                              key={cat}
                              className="bg-white/90 backdrop-blur-md text-[#0d3d4f] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
                            >
                              {cat}
                            </span>
                          ))}
                      </div>

                      {/* Overlay Play pour Vidéos */}
                      {isVideo && (
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/90 text-[#0d3d4f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-6 h-6 ml-0.5 fill-current" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                      </div>

                      <h3 
                        className={`text-lg font-bold text-navy-800 line-clamp-2 mb-3 transition-colors duration-200 ${
                          isVideo ? "cursor-pointer hover:text-teal-500" : "group-hover:text-teal-500"
                        }`}
                        onClick={() => isVideo && post.videoUrl && setActiveVideoUrl(post.videoUrl)}
                      >
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

                        {!isVideo ? (
                          <Link
                            href={`/actualite/${post.slug}`}
                            className="w-9 h-9 rounded-full bg-[#ecf4f6] text-[#0d3d4f] hover:bg-[#0d3d4f] hover:text-white flex items-center justify-center transition-colors duration-200"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          post.videoUrl && (
                            <button
                              onClick={() => setActiveVideoUrl(post.videoUrl!)}
                              className="px-3.5 py-1.5 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                            >
                              Visionner
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 max-w-md mx-auto shadow-sm flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-2xl">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-800 mb-1">
                  Aucun contenu trouvé
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Nous n&apos;avons trouvé aucun contenu dans la rubrique{" "}
                  <strong>{activeTab}</strong> correspondant à vos critères.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Barre Latérale : Recherche & Réseaux Sociaux (1/4) */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-8">
          
          {/* widget Recherche */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3">
            <h4 className="text-sm font-bold text-navy-800 uppercase tracking-wider">Recherche</h4>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Widget Réseaux Sociaux */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-1">Communauté</h4>
              <p className="text-xs text-gray-400 leading-normal">
                Suivez les coulisses et l&apos;actualité de PUR Alpha sur nos réseaux :
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-[#ecf4f6] text-navy-800 hover:text-teal-600 hover:border-teal-100 transition-all font-semibold text-xs cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </div>
                <span>Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-[#ecf4f6] text-navy-800 hover:text-teal-600 hover:border-teal-100 transition-all font-semibold text-xs cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-[#ecf4f6] text-navy-800 hover:text-teal-600 hover:border-teal-100 transition-all font-semibold text-xs cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Lecteur Vidéo Modal (Lightbox) */}
      {activeVideoUrl && (
        <div 
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Évite de fermer au clic sur la vidéo
          >
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer la vidéo"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <video 
                src={activeVideoUrl} 
                controls 
                autoPlay 
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
