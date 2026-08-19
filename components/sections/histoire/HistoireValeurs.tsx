"use client";

import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface ValeurItem {
  title: string;
  description: string;
  imageUrl?: string;
  imageDuFond?: string;
  fallback_icon?: string;
}

interface HistoireValeursProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  items: ValeurItem[];
}

export function HistoireValeurs({
  sectionTag,
  title,
  titleHighlight,
  items,
}: HistoireValeursProps) {
  return (
    <section className="py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        <FadeInView className="text-center mb-8 lg:mb-16">
          <span className="typo-tag text-teal-400">
            {sectionTag}
          </span>
          <h2 className="typo-h2 text-navy-800 mt-4">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </FadeInView>

        <StaggerContainer stagger={0.08} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-8xl mx-auto">
          {items.slice(0, 3).map((item, i) => (
            <StaggerItem
              key={i}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl
                         transition-all duration-500 hover:-translate-y-1 h-[280px] w-[280px] mx-auto sm:w-full sm:h-auto sm:aspect-[3/4] cursor-default"
            >
              {/* Image de fond */}
              {item.imageDuFond ? (
                <img
                  src={item.imageDuFond}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-navy-800" />
              )}

              {/* Dégradé permanent bas → haut */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />

              {/* Overlay plus sombre au survol */}
              <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Contenu bas */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                {/* Icône */}
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-5 h-5 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                  ) : (
                    <span className="text-white text-base">{item.fallback_icon || "⭐"}</span>
                  )}
                </div>

                {/* Titre — toujours visible */}
                <h3 className="typo-tag text-white mb-0 group-hover:mb-3 transition-all duration-300">
                  {item.title}
                </h3>

                {/* Description — apparaît au survol */}
                <p className="typo-small text-white/80
                               max-h-0 overflow-hidden opacity-0
                               group-hover:max-h-40 group-hover:opacity-100
                               transition-all duration-500 ease-in-out">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
