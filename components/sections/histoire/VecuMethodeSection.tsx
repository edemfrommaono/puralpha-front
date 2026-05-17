import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface MethodeItem {
  ordre: number;
  titre: string;
  description: string;
}

interface VecuMethodeSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  items?: MethodeItem[];
}

const DEFAULTS = {
  title: "Du vécu à une",
  titleHighlight: "méthode",
  description:
    "Avec plus de vingt ans d'expérience en gestion administrative, en organisation et en ressources humaines, j'ai voulu transformer une difficulté vécue en méthode : recruter avec exigence, former, cadrer les missions et suivre les situations dans la durée.",
  items: [
    {
      ordre: 1,
      titre: "Recruter avec exigence",
      description: "Identifier des profils adaptés à des missions sensibles.",
    },
    {
      ordre: 2,
      titre: "Structurer les interventions",
      description: "Poser un cadre clair avant chaque mise en place.",
    },
    {
      ordre: 3,
      titre: "Encadrer dans la durée",
      description: "Rester présent après le démarrage, avec les familles et les intervenants.",
    },
  ],
};

export function VecuMethodeSection({
  title,
  titleHighlight,
  description,
  items,
}: VecuMethodeSectionProps) {
  const cardItems = items?.length ? items : DEFAULTS.items;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <FadeInView className="text-center mb-12">
          <h2
            className="font-extrabold text-navy-800 leading-tight mb-6"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "40px", lineHeight: "48px" }}
          >
            {title || DEFAULTS.title}{" "}
            <span className="text-teal-400">{titleHighlight || DEFAULTS.titleHighlight}</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            {description || DEFAULTS.description}
          </p>
        </FadeInView>

        <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardItems.map((item, i) => (
            <StaggerItem
              key={i}
              className="bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center"
              style={{ padding: "40px 30px", borderRadius: "16px" }}
            >
              <div
                className="flex items-center justify-center border-2 border-teal-400 text-teal-400 font-bold text-lg mb-5"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              >
                {item.ordre}
              </div>
              <h4 className="text-navy-800 font-bold text-sm mb-2">{item.titre}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
