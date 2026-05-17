import Image from "next/image";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

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
    <section className="py-20 lg:py-32 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeInView className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </FadeInView>

        <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <StaggerItem key={i} className="bg-white border border-[#f3f4f6] rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="h-48 bg-teal-800/10 relative">
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute top-4 left-4 bg-gold-500 rounded-full px-4 py-1 z-10">
                  <span className="text-navy-800 font-black text-xs tracking-wider uppercase">{card.tag}</span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-navy-800 mb-4">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{card.description}</p>
                {/* <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, j) => (
                    <span key={j} className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">{tag.text}</span>
                  ))}
                </div> */}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
