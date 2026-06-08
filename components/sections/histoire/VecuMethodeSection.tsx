import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

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
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {(title || titleHighlight || description) && (
          <FadeInView className="text-center mb-8 lg:mb-12">
            {(title || titleHighlight) && (
              <h2
                className="font-extrabold text-navy-800 mb-4 lg:mb-6 text-2xl md:text-3xl lg:text-[40px] leading-tight lg:leading-[48px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {title}{" "}
                {titleHighlight && (
                  <span className="text-[#F2C94C]">{titleHighlight}</span>
                )}
              </h2>
            )}
            {description && (
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </FadeInView>
        )}

        {cardItems.length > 0 && (
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardItems.map((item, i) => (
              <StaggerItem
                key={i}
                className="bg-[#ECF4F6] border border-gray-100 shadow-sm flex flex-col items-center text-center p-6 lg:p-8 rounded-2xl"
              >
                <div
                  className="flex items-center justify-center border-2 border-[#F2C94C] text-[#F2C94C] font-bold text-lg mb-5"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                >
                  {item.ordre}
                </div>
                <h4 className="text-navy-800 font-bold text-sm mb-2">{item.titre}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
