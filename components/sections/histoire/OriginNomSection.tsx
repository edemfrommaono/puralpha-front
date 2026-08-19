import Image from "next/image";
import { FadeInView } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

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
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Texte */}
          {(title || titleHighlight || description) && (
            <FadeInView direction="left" className="flex flex-col justify-center">
              {(title || titleHighlight) && (
                
                <h2 className="typo-h2 text-navy-800 mb-4 lg:mb-6">
                  {title}
                  {titleHighlight && <br />}
                  {titleHighlight && (
                    <span className="text-teal-400">{titleHighlight}</span>
                  )}
                </h2>
              )}
              {description && (
                <div
                  className="prose typo-body"
                  dangerouslySetInnerHTML={{ __html: toHtml(description) }}
                />
              )}
            </FadeInView>
          )}

          {/* Image */}
          <FadeInView direction="right" delay={0.15} className="relative overflow-hidden w-full h-full min-h-[300px] lg:min-h-[400px] rounded-2xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={titleHighlight || ""}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[300px] lg:min-h-[400px] bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <span className="text-teal-500 text-lg font-medium">Image à venir</span>
              </div>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
