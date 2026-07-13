import Image from "next/image";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

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

  const palettes: Record<string, {
    border: string;
    iconBg: string;
    titleColor: string;
    retenirBg: string;
    retenirText: string;
  }> = {
    "#52bdc7": {
      border: "border-t-teal-400",
      iconBg: "bg-teal-400/10",
      titleColor: "text-navy-800",
      retenirBg: "bg-[#ECF4F6]",
      retenirText: "text-teal-600",
    },
    "#f2c94c": {
      border: "border-t-gold-500",
      iconBg: "bg-gold-500/10",
      titleColor: "text-gold-500",
      retenirBg: "bg-gold-500/10",
      retenirText: "text-[#b8860b]",
    },
    "#1c3553": {
      border: "border-t-navy-800",
      iconBg: "bg-navy-800/5",
      titleColor: "text-navy-800",
      retenirBg: "bg-[#ECF4F6]",
      retenirText: "text-teal-600",
    },
    "#718096": {
      border: "border-t-gray-500",
      iconBg: "bg-gray-100",
      titleColor: "text-navy-800",
      retenirBg: "bg-gray-100",
      retenirText: "text-gray-600",
    },
  };

  return (
    <section className="py-8 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <FadeInView className="text-center mb-8 lg:mb-16">
          <span className="typo-tag text-teal-400">
            {aides?.section_tag || fb.section_tag}
          </span>
          <h2 className="typo-h2 text-navy-800 mt-4">
            {aides?.title || fb.title}<br />
            <span className="text-teal-400">{aides?.title_highlight || fb.title_highlight}</span>
          </h2>
          { (aides?.description || fb.description) && (
            <div
              className="prose max-w-2xl mx-auto text-center typo-body mt-4"
              dangerouslySetInnerHTML={{ __html: toHtml(aides?.description || fb.description) }}
            />
          )}
        </FadeInView>

        <StaggerContainer stagger={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const accentKey = card.accent_color?.toLowerCase();
            const c = palettes[accentKey] || palettes["#52bdc7"];
            const fbCard = fallbackCards[i];
            const imageUrl = "imageUrl" in card ? card.imageUrl : null;

            // "À retenir" : on utilise le premier tag, ou highlight_value + highlight_label
            const retenirText =
              card.tags?.[0]?.text ||
              [card.highlight_value, card.highlight_label].filter(Boolean).join(" — ");

            return (
              <StaggerItem
                key={i}
                className={`bg-white border border-gray-100 border-t-4 ${c.border} rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col gap-5`}
              >
                {/* Icon + Titre */}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${c.iconBg} rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5`}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={card.title}
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    ) : (
                      <span>{fbCard?.fallback_icon || "📄"}</span>
                    )}
                  </div>
                  <h3 className={`typo-h3 ${c.titleColor}`}>
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="typo-body text-left flex-1">
                  {card.description}
                </p>

                {/* À retenir */}
                {retenirText && (
                  <div className={`${c.retenirBg} rounded-xl px-4 py-3`}>
                    <p className={`text-sm ${c.retenirText} text-left`}>
                      <span className="font-semibold">À retenir : </span>
                      {retenirText}
                    </p>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
