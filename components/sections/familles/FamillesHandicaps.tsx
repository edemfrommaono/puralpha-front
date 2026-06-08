import {
  Brain, Zap, Accessibility, Eye, Lightbulb, Microscope, ClipboardList, Puzzle,
  type LucideIcon,
} from "lucide-react";

/** Map des noms d'icônes Lucide → composants pour les types de handicap */
const ICON_MAP: Record<string, LucideIcon> = {
  Brain, Zap, Accessibility, Eye, Lightbulb, Microscope, ClipboardList, Puzzle,
};

interface HandicapItem {
  label: string;
  imageUrl?: string;
  fallback_icon?: string;
}

interface FamillesHandicapsProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  highlightQuote?: string;
  highlightDescription?: string;
  items?: HandicapItem[];
}

export function FamillesHandicaps({
  title,
  titleHighlight,
  description,
  highlightQuote,
  highlightDescription,
  items = [],
}: FamillesHandicapsProps) {
  if (!items?.length && !title && !titleHighlight && !description) return null;

  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {(title || titleHighlight || description) && (
          <div className="text-center mb-8 lg:mb-16 max-w-6xl mx-auto">
            {(title || titleHighlight) && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy-800 mb-6">
                {title}
                {titleHighlight && (
                  <>
                    {" "}
                    <span className="text-teal-400">{titleHighlight}</span>
                  </>
                )}
              </h2>
            )}
            {description && <p className="text-gray-600 text-center text-base">{description}</p>}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
            {items.map((item, idx) => {
              const IconComp = item.fallback_icon ? ICON_MAP[item.fallback_icon] : null;
              return (
                <div key={idx} className="bg-[#f0f4f8] border border-[#f3f4f6] rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-7 h-7 object-contain" />
                    ) : IconComp ? (
                      <IconComp className="w-6 h-6 text-teal-500" strokeWidth={1.8} />
                    ) : (
                      <span className="text-teal-500 text-2xl">📌</span>
                    )}
                  </div>
                  <span className="font-bold text-navy-800 text-sm">{item.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {(highlightQuote || highlightDescription) && (
          <div className="bg-[#F6F4EF] border border-teal-400/20 rounded-2xl py-6 px-6 lg:py-8 lg:px-16 text-center max-w-6xl mx-auto">
            <p className="font-bold text-navy-800 text-base leading-relaxed text-center">
              {highlightQuote && (
                <span className="text-[#F2C94C]">{highlightQuote}</span>
              )} <br />
              {highlightDescription && (
                <span className="font-normal">{highlightDescription}</span>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
