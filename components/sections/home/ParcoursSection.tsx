import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ParcoursCard {
  tag: string;
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
}

interface ResolvedParcoursCard extends ParcoursCard {
  coverUrl: string;
}

interface FallbackParcoursCard {
  tag: string;
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
}

interface ParcoursSectionProps {
  parcours?: {
    section_tag: string;
    title: string;
  };
  resolvedParcoursCards: ResolvedParcoursCard[] | null;
  fallback: {
    section_tag: string;
    title: string;
  };
  fallbackCards: readonly FallbackParcoursCard[];
}

export function ParcoursSection({
  parcours,
  resolvedParcoursCards,
  fallback: fb,
  fallbackCards,
}: ParcoursSectionProps) {
  const cards = resolvedParcoursCards || fallbackCards;

  return (
    <section className="py-20 lg:py-32 w-full bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-4">

            <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
              {parcours?.section_tag || fb.section_tag}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-navy-700">
            {parcours?.title || fb.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => {
            const isFamille = i === 0;
            const coverUrl = "coverUrl" in card ? (card as ResolvedParcoursCard).coverUrl : null;

            return (
              <div
                key={i}
                className={`${isFamille
                    ? "bg-teal-50/50 border-teal-100"
                    : "bg-gold-500/10 border-gold-500/20"
                  } rounded-3xl border flex flex-col overflow-hidden group hover:shadow-xl transition-all`}
              >
                {coverUrl && (
                  <div className="relative w-full h-[250px] lg:h-[300px] overflow-hidden">
                    <Image
                      src={coverUrl}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8 lg:p-10 flex flex-col flex-grow">
                  <span
                    className={`inline-block w-fit px-4 py-1.5 ${isFamille
                        ? "bg-teal-400/10 text-teal-500"
                        : "bg-gold-500/20 text-gold-600"
                      } font-bold text-xs tracking-wider uppercase rounded-full mb-4`}
                  >
                    {card.tag}
                  </span>
                  <h3 className="text-xl font-bold text-navy-700 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {card.description}
                  </p>
                  <div>
                    <Button
                      variant={isFamille ? "teal" : "gold"}
                      href={card.cta_url}
                      style={isFamille
                        ? { borderRadius: '8px', background: '#52BDC7' }
                        : { borderRadius: '8px', background: '#F2C94C' }
                      }
                      iconRight={<ArrowRight className="w-4 h-4" />}
                      className={!isFamille ? "shadow-none font-bold text-navy-800" : ""}
                    >
                      {card.cta_text}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
