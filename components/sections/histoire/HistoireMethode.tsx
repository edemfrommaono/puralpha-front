import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/FadeInView";

export interface MethodeEtape {
  titre: string;
}

interface HistoireMethodeProps {
  title: string;
  titleHighlight: string;
  description: string;
  etapes: MethodeEtape[];
}

/** Section « Du vécu à une méthode » — 3 cartes numérotées avec cercles dorés. */
export function HistoireMethode({
  title,
  titleHighlight,
  description,
  etapes,
}: HistoireMethodeProps) {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        <FadeInView className="text-center max-w-4xl mx-auto mb-10 lg:mb-16">
          <h2 className="typo-h2 text-navy-800">
            {title} <span className="text-gold-500">{titleHighlight}</span>
          </h2>
          {description && <p className="typo-body mt-6">{description}</p>}
        </FadeInView>

        {etapes.length > 0 && (
          <StaggerContainer
            stagger={0.12}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {etapes.map((etape, i) => (
              <StaggerItem key={i}>
                <div className="bg-gray-100 rounded-2xl p-8 text-center h-full">
                  <span className="w-12 h-12 mx-auto rounded-full border-2 border-gold-500 text-gold-500 font-bold text-lg flex items-center justify-center mb-5">
                    {i + 1}
                  </span>
                  <h3 className="typo-h3 text-navy-800">{etape.titre}</h3>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
