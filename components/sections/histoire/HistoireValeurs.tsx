import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface ValeurItem {
  title: string;
  description: string;
  imageUrl?: string;
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
  const bgs = ["bg-teal-400/10", "bg-navy-800/5", "bg-gold-500/10", "bg-teal-400/10", "bg-navy-800/5"];

  return (
    <section className="py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <FadeInView className="text-center mb-8 lg:mb-16">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
            {sectionTag}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </FadeInView>

        <StaggerContainer stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <StaggerItem key={i} className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center shadow-sm">
              <div className={`w-16 h-16 ${bgs[i % bgs.length]} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  <span>{item.fallback_icon || "⭐"}</span>
                )}
              </div>
              <h3 className="font-extrabold text-navy-800 text-sm uppercase tracking-wide mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
