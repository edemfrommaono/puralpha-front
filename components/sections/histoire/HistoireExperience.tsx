import { FadeInView } from "@/components/ui/FadeInView";

export interface ExperienceStat {
  chiffre: string;
  description: string;
}

interface HistoireExperienceProps {
  title: string;
  titleHighlight: string;
  stats: ExperienceStat[];
  paragraph1: string;
  paragraphHighlight: string;
}

/**
 * Section « Une expérience personnelle, mais aussi professionnelle » — fond
 * bleu très clair, cartes chiffres clés à gauche, texte à droite.
 */
export function HistoireExperience({
  title,
  titleHighlight,
  stats,
  paragraph1,
  paragraphHighlight,
}: HistoireExperienceProps) {
  return (
    <section className="bg-gray-100 py-12 lg:py-24">
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Titre + chiffres clés */}
          <FadeInView direction="left" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="typo-h2 text-navy-800">
              {title}{" "}
              <span className="text-teal-400">{titleHighlight}</span>
            </h2>
            {stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-sm text-center"
                  >
                    <p className="typo-h3 text-navy-800">{stat.chiffre}</p>
                    <p className="typo-small mt-2">{stat.description}</p>
                  </div>
                ))}
              </div>
            )}
          </FadeInView>

          {/* Texte */}
          <FadeInView direction="right" delay={0.15} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {paragraph1 && <p className="typo-body">{paragraph1}</p>}
            {paragraphHighlight && (
              <p className="text-navy-800 font-bold text-lg leading-relaxed mt-6">
                {paragraphHighlight}
              </p>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
