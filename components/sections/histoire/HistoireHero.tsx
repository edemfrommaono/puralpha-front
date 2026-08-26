import { FadeInView } from "@/components/ui/FadeInView";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

interface HistoireHeroProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  description: string;
  quote: string;
  founderName: string;
  founderRole: string;
  photoUrl?: string;
  photoLegende: string;
  photoNote?: string;
}

export function HistoireHero({
  sectionTag,
  title,
  titleHighlight,
  description,
  quote,
  founderName,
  founderRole,
  photoUrl,
  photoLegende,
  photoNote,
}: HistoireHeroProps) {
  return (
    <section className="bg-white pt-18 pb-12 lg:pt-26 lg:pb-10 overflow-hidden">
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texte */}
          <FadeInView direction="left" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* <span className="typo-tag text-teal-400">{sectionTag}</span> */}
            <h1 className="typo-h1 text-navy-800 mt-4">
              {title}
              <br />
              <span className="text-teal-400">{titleHighlight}</span>
            </h1>
            {description && (
              <p className="typo-body mt-6 max-w-xl">{description}</p>
            )}
            {quote && (
              <p className="typo-h3 italic text-navy-800 mt-6 max-w-xl">
                {quote}
              </p>
            )}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              <div className="w-10 h-0.5 bg-teal-400" />
              <p className="text-navy-800 font-bold text-sm tracking-wide">
                {founderName}{" "}
                <span className="text-gray-500 font-semibold">
                  — {founderRole}
                </span>
              </p>
            </div>
          </FadeInView>

          {/* Photo (placeholder tant qu'aucune image n'est chargée dans WordPress) */}
          <FadeInView direction="right" delay={0.15}>
            {photoUrl ? (
              <div className="relative rounded-xl overflow-hidden aspect-[4/4] shadow-xl">
                <img
                  src={photoUrl}
                  alt={photoLegende}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <PhotoPlaceholder
                tag="Emplacement réservé"
                label={photoLegende}
                note={photoNote}
                icon="camera"
                className="aspect-[4/5] w-full rounded-3xl"
              />
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
