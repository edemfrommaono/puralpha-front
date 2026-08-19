"use client";

import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

interface MethodeItem {
  ordre: number;
  titre: string;
  description: string;
}

interface VecuMethodeSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  items?: MethodeItem[];
}

const DEFAULTS = {
  title: "",
  titleHighlight: "",
  description: "",
  items: [] as MethodeItem[],
};

export function VecuMethodeSection({
  title,
  titleHighlight,
  description,
  items,
}: VecuMethodeSectionProps) {
  const cardItems = items?.length ? items : DEFAULTS.items;

  if (!cardItems?.length && !title && !titleHighlight && !description) return null;

  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        {(title || titleHighlight || description) && (
          <FadeInView className="text-center mb-8 lg:mb-12">
            {(title || titleHighlight) && (
              <h2 className="typo-h2 text-navy-800 mb-4 lg:mb-6">
                {title}{" "}
                {titleHighlight && (
                  <span className="text-teal-400">{titleHighlight}</span>
                )}
              </h2>
            )}
            {description && (
              <div
                className="prose text-center max-w-2xl mx-auto typo-body"
                dangerouslySetInnerHTML={{ __html: toHtml(description) }}
              />
            )}
          </FadeInView>
        )}

        {cardItems.length > 0 && (
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardItems.map((item, i) => (
              <StaggerItem key={i} className="h-44" style={{ perspective: "1000px" }}>
                <div
                  className="relative w-full h-full transition-transform duration-700 cursor-default"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "rotateY(180deg)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "rotateY(0deg)")}
                >
                  {/* Recto — numéro + titre */}
                  <div
                    className="absolute inset-0 bg-[#ecf4f6] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center p-6 rounded-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div
                      className="flex items-center justify-center border-2 border-[#F2C94C] text-[#F2C94C] font-bold text-lg mb-5"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    >
                      {item.ordre}
                    </div>
                    <h4 className="typo-h3 text-navy-800 text-sm">{item.titre}</h4>
                  </div>

                  {/* Verso — description */}
                  <div
                    className="absolute inset-0 bg-[#ecf4f6] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center p-6 rounded-2xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="typo-small text-gray-600">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
