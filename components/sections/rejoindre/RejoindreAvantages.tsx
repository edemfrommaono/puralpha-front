"use client";

import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

interface AvantageCard {
  title: string;
  description: string;
  imageUrl: string;
  fallback_icon?: string;
}

interface RejoindreAvantagesProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  description: string;
  cards: AvantageCard[];
}

const ICON_BGS = ["bg-teal-400/10", "bg-gold-500/10", "bg-navy-800/10", "bg-teal-400/10", "bg-gold-500/10", "bg-navy-800/10"];

function FlipCard({ card, idx }: { card: AvantageCard; idx: number }) {
  return (
    <div style={{ perspective: "1000px" }} className="h-44 md:h-52">
      <div
        className="relative w-full h-full transition-transform duration-700 cursor-default"
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "rotateY(180deg)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "rotateY(0deg)")}
      >
        {/* Recto — icône + titre */}
        <div
          className="absolute inset-0 bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-6 lg:p-8 flex flex-col items-start shadow-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`w-12 h-12 rounded-xl ${ICON_BGS[idx % ICON_BGS.length]} flex items-center justify-center text-2xl mb-6`}>
            {card.imageUrl ? (
              <img src={card.imageUrl} alt="" className="w-7 h-7 object-contain" />
            ) : (
              <span>{card.fallback_icon || "⭐"}</span>
            )}
          </div>
          <h3 className="typo-h3 text-navy-800">{card.title}</h3>
        </div>

        {/* Verso — description */}
        <div
          className="absolute inset-0 bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-6 lg:p-8 flex flex-col justify-center shadow-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="typo-small text-gray-600">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

export function RejoindreAvantages({
  sectionTag, title, titleHighlight, description, cards,
}: RejoindreAvantagesProps) {
  return (
    <section className="w-full pt-8 pb-8 lg:pt-24 lg:pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="max-w-3xl mx-auto">
          <FadeInView className="text-center mb-8 lg:mb-16">
            <p className="text-center typo-tag text-teal-400 mb-4">{sectionTag}</p>
            <h2 className="typo-h2 text-navy-800 mb-4 lg:mb-6">
              {title}{" "}
              <span className="text-[#F2C94C]">
                {titleHighlight}
              </span>
            </h2>
            {description && (
              <div
                className="prose typo-body text-gray-600 text-center max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: toHtml(description) }}
              />
            )}
          </FadeInView>
        </div>

        {/* Première ligne — 3 colonnes */}
        <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.slice(0, 3).map((card, i) => (
            <StaggerItem key={i}>
              <FlipCard card={card} idx={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Lignes suivantes — 2 colonnes */}
        {cards.length > 3 && (
          <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {cards.slice(3).map((card, i) => (
              <StaggerItem key={i + 3}>
                <FlipCard card={card} idx={i + 3} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
