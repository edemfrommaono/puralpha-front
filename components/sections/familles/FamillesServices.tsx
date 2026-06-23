import Image from "next/image";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

import { toHtml } from "@/lib/wysiwyg";

interface ServiceCard {
  tag: string;
  title: string;
  description: string;
  tags: readonly { text: string }[];
  imageUrl?: string;
}

interface FamillesServicesProps {
  title: string;
  titleHighlight: string;
  description: string;
  cards: readonly ServiceCard[];
}

export function FamillesServices({
  title,
  titleHighlight,
  description,
  cards,
}: FamillesServicesProps) {
  return (
    <section className="py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeInView className="text-center mb-8 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy-800 mb-6">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
          {description && (
            <div
              className="prose max-w-3xl mx-auto text-center"
              dangerouslySetInnerHTML={{ __html: toHtml(description) }}
            />
          )}
        </FadeInView>

        <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <StaggerItem
              key={i}
              className="group relative rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl
                         transition-all duration-500 hover:-translate-y-1 h-[280px] w-[280px] mx-auto sm:w-full sm:h-auto sm:aspect-[3/4]"
            >
              {/* Image de fond */}
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-teal-800/40" />
              )}

              {/* Dégradé permanent bas → haut */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent transition-opacity duration-500" />

              {/* Overlay plus sombre au survol */}
              <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Tag */}
              <div className="absolute top-4 left-4 z-10 bg-gold-500 rounded-full px-4 py-1">
                <span className="text-navy-800 font-black text-xs tracking-wider uppercase">{card.tag}</span>
              </div>

              {/* Contenu bas */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                {/* Titre — toujours visible */}
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-snug mb-0 group-hover:mb-3 transition-all duration-300">
                  {card.title}
                </h3>
                {/* Description — apparaît au survol */}
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed
                               max-h-0 overflow-hidden opacity-0
                               group-hover:max-h-40 group-hover:opacity-100
                               transition-all duration-500 ease-in-out">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
