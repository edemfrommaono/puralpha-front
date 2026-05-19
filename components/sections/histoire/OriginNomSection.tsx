import Image from "next/image";
import { FadeInView } from "@/components/ui/FadeInView";

interface OriginNomSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  imageUrl?: string;
}

const DEFAULTS = {
  title: "",
  titleHighlight: "",
  description: "",
};

export function OriginNomSection({
  title,
  titleHighlight,
  description,
  imageUrl,
}: OriginNomSectionProps) {
  if (!title && !titleHighlight && !description && !imageUrl) return null;

  return (
    <section className="py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Texte */}
          {(title || titleHighlight || description) && (
            <FadeInView direction="left">
              {(title || titleHighlight) && (
                <h2
                  className="font-extrabold text-navy-800 mb-4 lg:mb-6 text-3xl md:text-4xl lg:text-[40px] leading-tight lg:leading-[48px]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {title}
                  {titleHighlight && <br />}
                  {titleHighlight && (
                    <span className="text-teal-400">{titleHighlight}</span>
                  )}
                </h2>
              )}
              {description && (
                <p className="text-gray-600 text-base leading-relaxed">
                  {description}
                </p>
              )}
            </FadeInView>
          )}

          {/* Image */}
          <FadeInView direction="right" delay={0.15} className="relative overflow-hidden min-h-[300px] md:min-h-[400px] rounded-2xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={titleHighlight || ""}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <span className="text-teal-500 text-lg font-medium">Image à venir</span>
              </div>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
