import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface FormationStep {
  valeur: string;
  sous_titre: string;
  titre: string;
  description: string;
}

interface RejoindreFormationProps {
  tag?: string;
  title?: string;
  titleHighlight?: string;
  titleEnd?: string;
  description?: string;
  etapes?: FormationStep[];
}

const DEFAULTS = {
  tag: "Formation & accompagnement",
  title: "Vous êtes formés avant d'intervenir, puis",
  titleHighlight: "accompagnés",
  titleEnd: "dans vos missions",
  description:
    "Chez PUR Alpha, aucun intervenant ne démarre une mission sans préparation. La formation initiale permet de comprendre les bases du handicap, la posture attendue, les gestes du quotidien et les limites d'intervention.",
  etapes: [
    {
      valeur: "70h",
      sous_titre: "Formation initiale",
      titre: "Un socle commun avant toute première mission : handicap, bientraitance, sécurité, gestes du quotidien, communication avec les familles.",
      description: "",
    },
    {
      valeur: "Interlocuteur identifié",
      sous_titre: "Un point de contact clair",
      titre: "Vous savez à qui vous adresser en cas de question, de doute ou de difficulté pendant votre mission.",
      description: "",
    },
    {
      valeur: "Suivi de mission",
      sous_titre: "Des points réguliers",
      titre: "Les retours terrain permettent d'ajuster les pratiques, de mieux comprendre les situations et de progresser dans votre rôle.",
      description: "",
    },
    {
      valeur: "Montée en compétences",
      sous_titre: "Formation continue",
      titre: "Actualisation régulière des compétences. PUR Alpha investit dans votre montée en compétences.",
      description: "",
    },
  ],
};

export function RejoindreFormation({
  tag,
  title,
  titleHighlight,
  titleEnd,
  description,
  etapes,
}: RejoindreFormationProps) {
  const steps = etapes?.length ? etapes : DEFAULTS.etapes;

  return (
    <section className="w-full py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <FadeInView className="text-center mb-16">
          <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">
            {tag || DEFAULTS.tag}
          </p>
          <h2
            className="font-extrabold text-navy-800 mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "40px", lineHeight: "48px" }}
          >
            {title || DEFAULTS.title}
            <br />
            <span className="text-teal-400">{titleHighlight || DEFAULTS.titleHighlight}</span>{" "}
            {titleEnd || DEFAULTS.titleEnd}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            {description || DEFAULTS.description}
          </p>
        </FadeInView>

        <div className="relative">

          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, i) => (
              <StaggerItem key={i} className="flex flex-col items-center text-center">
                <span
                  className="mb-2"
                  style={{ color: "#4ECDC4", fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 800, lineHeight: "22px", textAlign: "center" }}
                >
                  {step.valeur}
                </span>
                <h4
                  className="mb-1"
                  style={{ color: "#1C3553", fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, lineHeight: "22.4px", textAlign: "center" }}
                >
                  {step.sous_titre}
                </h4>
                <p
                  className="max-w-[220px] mb-6"
                  style={{ color: "#6B7280", fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 400, lineHeight: "20.15px", textAlign: "center" }}
                >
                  {step.titre}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Timeline line at the bottom */}
          <div className="hidden lg:flex items-center justify-between mt-2 px-[12%] relative">
            <div className="absolute left-[12%] right-[12%] top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-teal-400 via-teal-400 to-gold-500" />
            {steps.map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-teal-400 relative z-10"
                style={i === steps.length - 1 ? { background: "#F2C94C" } : {}}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
