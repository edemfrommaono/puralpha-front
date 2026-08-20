import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/FadeInView";

export interface ValeurItem {
  titre: string;
  imageUrl?: string;
}

interface HistoireValeursProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  items: ValeurItem[];
}

/**
 * Section « Ce qui guide PUR Alpha » — 3 cartes photos (EXIGENCE, FRANCHISE,
 * CONSTANCE). Fond bleu nuit si aucune image n'est encore chargée.
 */
export function HistoireValeurs({
  sectionTag,
  title,
  titleHighlight,
  items,
}: HistoireValeursProps) {
  return (
    <section className="bg-gray-100 py-12 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <FadeInView className="text-center mb-10 lg:mb-16">
          <span className="typo-tag text-teal-400">{sectionTag}</span>
          <h2 className="typo-h2 text-navy-800 mt-4">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </FadeInView>

        {items.length > 0 && (
          <StaggerContainer
            stagger={0.1}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {items.slice(0, 3).map((item, i) => (
              <StaggerItem
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 aspect-[3/4]"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.titre}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-center">
                  <h3 className="text-white font-bold text-sm uppercase tracking-[2px]">
                    {item.titre}
                  </h3>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
