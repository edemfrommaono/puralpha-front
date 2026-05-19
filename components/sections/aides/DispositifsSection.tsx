import Image from "next/image";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface AideCard {
  accent_color: string;
  title: string;
  subtitle: string;
  description: string;
  highlight_value: string;
  highlight_label: string;
  tags: readonly { text: string }[];
}

interface ResolvedAideCard extends AideCard {
  imageUrl: string;
}

interface FallbackCard extends AideCard {
  fallback_icon?: string;
}

interface DispositifsSectionProps {
  aides?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    description: string;
  };
  resolvedAidesCards: ResolvedAideCard[] | null;
  fallback: {
    section_tag: string;
    title: string;
    title_highlight: string;
    description: string;
  };
  fallbackCards: readonly FallbackCard[];
}

export function DispositifsSection({
  aides,
  resolvedAidesCards,
  fallback: fb,
  fallbackCards,
}: DispositifsSectionProps) {
  const cards = resolvedAidesCards || fallbackCards;

  const palettes: Record<string, { bar: string; iconBg: string; titleColor: string; hlBg: string; hlText: string; tagBg: string; tagText: string }> = {
    "#52bdc7": { bar: "bg-teal-400", iconBg: "bg-teal-400/10", titleColor: "text-navy-800", hlBg: "bg-[#ecf4f6]", hlText: "text-teal-400", tagBg: "bg-teal-400/10", tagText: "text-teal-600" },
    "#f2c94c": { bar: "bg-gold-500", iconBg: "bg-gold-500/10", titleColor: "text-gold-500", hlBg: "bg-gold-500/10", hlText: "text-gold-500", tagBg: "bg-gold-500/10", tagText: "text-[#b8860b]" },
    "#1c3553": { bar: "bg-navy-800", iconBg: "bg-navy-800/5", titleColor: "text-navy-800", hlBg: "bg-[#ecf4f6]", hlText: "text-teal-400", tagBg: "bg-teal-400/10", tagText: "text-teal-600" },
    "#718096": { bar: "bg-gray-500", iconBg: "bg-gray-100", titleColor: "text-navy-800", hlBg: "bg-gray-100", hlText: "text-gray-600", tagBg: "bg-gray-100", tagText: "text-gray-600" },
  };

  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <FadeInView className="text-center mb-8 lg:mb-16">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
            {aides?.section_tag || fb.section_tag}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
            {aides?.title || fb.title}<br />
            <span className="text-teal-400">{aides?.title_highlight || fb.title_highlight}</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {aides?.description || fb.description}
          </p>
        </FadeInView>

        <StaggerContainer stagger={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const c = palettes[card.accent_color] || palettes["#52bdc7"];
            const fbCard = fallbackCards[i];
            const imageUrl = "imageUrl" in card ? card.imageUrl : null;

            return (
              <StaggerItem key={i} className="bg-white border border-gray-100 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col gap-5 lg:gap-6 relative overflow-hidden pt-8 lg:pt-10">
                <div className={`absolute top-0 left-0 right-0 h-1 ${c.bar}`} />
                <div className="flex gap-4 items-start">
                  <div className={`w-14 h-14 ${c.iconBg} rounded-2xl flex items-center justify-center text-2xl shrink-0`}>
                    {imageUrl ? (
                      <Image src={imageUrl} alt={card.title} width={32} height={32} className="object-contain" />
                    ) : (
                      <span>{fbCard?.fallback_icon || "📄"}</span>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-xl lg:text-2xl font-black leading-tight ${c.titleColor}`}>{card.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {card.description}
                </p>
                <div className={`${c.hlBg} rounded-xl p-4 flex items-center justify-between`}>
                  <span className={`text-xl font-extrabold ${c.hlText}`}>{card.highlight_value}</span>
                  <span className="text-xs text-gray-500">{card.highlight_label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, j) => (
                    <span key={j} className={`px-3 py-1.5 ${c.tagBg} ${c.tagText} text-xs font-semibold rounded-full`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
