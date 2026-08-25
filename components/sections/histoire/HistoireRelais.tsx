import { FadeInView } from "@/components/ui/FadeInView";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

interface HistoireRelaisProps {
  title: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  paragraphHighlight: string;
  imageUrl?: string;
  imageAlt?: string;
}

/** Section « Quand trouver un relais devient un parcours » — image à gauche, texte à droite. */
export function HistoireRelais({
  title,
  titleHighlight,
  paragraph1,
  paragraph2,
  paragraphHighlight,
  imageUrl,
  imageAlt,
}: HistoireRelaisProps) {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <FadeInView direction="left">
            {imageUrl ? (
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                <img
                  src={imageUrl}
                  alt={imageAlt || ""}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <PhotoPlaceholder
                tag="Emplacement réservé"
                label={imageAlt || "Photographie à intégrer"}
                icon="image"
                className="aspect-[4/3] w-full rounded-3xl"
              />
            )}
          </FadeInView>

          {/* Texte */}
          <FadeInView direction="right" delay={0.15} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="typo-h2 text-navy-800">
              {title}{" "}
              <span className="text-teal-400">{titleHighlight}</span>
            </h2>
            <div className="flex flex-col gap-4 mt-6">
              {paragraph1 && <p className="typo-body">{paragraph1}</p>}
              {paragraph2 && <p className="typo-body">{paragraph2}</p>}
              {paragraphHighlight && (
                <p className="text-navy-800 font-bold text-lg leading-relaxed">
                  {paragraphHighlight}
                </p>
              )}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
