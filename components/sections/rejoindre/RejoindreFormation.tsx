"use client";

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
  tag: "",
  title: "",
  titleHighlight: "",
  titleEnd: "",
  description: "",
  etapes: [] as FormationStep[],
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

  if (!steps?.length && !tag && !title && !titleHighlight && !titleEnd && !description) return null;

  return (
    <section className="w-full py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {(tag || title || titleHighlight || titleEnd || description) && (
          <FadeInView className="text-center mb-8 lg:mb-16">
            {tag && (
              <p className="text-center text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">
                {tag}
              </p>
            )}
            {(title || titleHighlight || titleEnd) && (
              <h2
                className="font-extrabold text-navy-800 mb-4 lg:mb-6 max-w-3xl mx-auto text-2xl md:text-3xl lg:text-[40px] leading-tight lg:leading-[48px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {title}
                {(titleHighlight || titleEnd) && <br />}
                {titleHighlight && (
                  <span className="text-teal-400">{titleHighlight}</span>
                )}{" "}
                {titleEnd}
              </h2>
            )}
            {description && (
              <p className="text-gray-500 max-w-3xl text-center mx-auto text-sm leading-relaxed">
                {description}
              </p>
            )}
          </FadeInView>
        )}

        <div className="relative">
          {/* Ligne de connexion — absolute, derrière les colonnes */}
          <div className="hidden lg:block absolute bottom-[8px] left-[12%] right-[12%] h-[3px] bg-teal-400 z-0" />

          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8 relative z-10">
            {steps.map((step, i) => (
              <StaggerItem key={i} className="group flex flex-col items-center text-center cursor-default min-h-[160px]">
                <span className="text-teal-400 font-extrabold text-lg leading-tight text-center mb-2">
                  {step.valeur}
                </span>
                <h4 className="text-navy-800 font-bold text-sm leading-relaxed text-center mb-2">
                  {step.sous_titre}
                </h4>
                {/* Description — masquée par défaut, visible au survol */}
                <p className="text-gray-500 text-[13px] leading-relaxed text-center max-w-[220px]
                               max-h-0 overflow-hidden opacity-0
                               group-hover:max-h-40 group-hover:opacity-100
                               transition-all duration-500 ease-in-out">
                  {step.titre}
                </p>
                {/* Spacer flexible pour pousser le dot tout en bas */}
                <div className="flex-1" />
                {/* Point de la timeline — toujours en bas de la colonne */}
                <div className="hidden lg:block w-4 h-4 rounded-full bg-[#F2C94C] mt-4 relative z-10
                                transition-transform duration-300 group-hover:scale-150" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
