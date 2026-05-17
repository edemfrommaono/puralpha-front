import Image from "next/image";
import { FadeInView } from "@/components/ui/FadeInView";

interface OriginNomSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  imageUrl?: string;
}

const DEFAULTS = {
  title: "D'où vient le nom",
  titleHighlight: "PUR Alpha",
  description:
    "Mon fils est porteur du syndrome PURA, une maladie génétique rare. Le nom PUR Alpha vient de cette histoire personnelle. J'ai voulu transformer une réalité intime en engagement concret : créer un cadre plus structuré, plus respectueux et plus humain pour les enfants et leurs aidants.",
};

export function OriginNomSection({
  title,
  titleHighlight,
  description,
  imageUrl,
}: OriginNomSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texte */}
          <FadeInView direction="left">
            <h2
              className="font-extrabold text-navy-800 leading-tight mb-6"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "40px", lineHeight: "48px" }}
            >
              {title || DEFAULTS.title}<br />
              <span className="text-teal-400">{titleHighlight || DEFAULTS.titleHighlight}</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {description || DEFAULTS.description}
            </p>
          </FadeInView>

          {/* Image */}
          <FadeInView direction="right" delay={0.15} className="relative overflow-hidden" style={{ minHeight: "400px", borderRadius: "16px" }}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={titleHighlight || DEFAULTS.titleHighlight}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <span className="text-teal-500 text-lg font-medium">Image à venir</span>
              </div>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
