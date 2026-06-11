import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface StepItem {
  text: string;
}

interface Step {
  title: string;
  items: readonly StepItem[];
}

interface FamillesEtapesProps {
  title: string;
  description: string;
  steps: readonly Step[];
  ctaText: string;
  ctaUrl: string;
}

export function FamillesEtapes({
  title,
  description,
  steps,
  ctaText,
  ctaUrl,
}: FamillesEtapesProps) {
  return (
    <section className="py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeInView>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-8 lg:mb-16 text-center">
            {description}
          </p>
        </FadeInView>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne de connexion desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300" />

          <StaggerContainer stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const isGold = i >= steps.length - 2;
              const accentBorder = isGold ? "border-teal-400" : "border-teal-400";
              const accentText = isGold ? "text-teal-500" : "text-teal-500";
              const bulletColor = isGold ? "text-teal-400" : "text-teal-400";

              return (
              <StaggerItem key={i} className="group relative flex flex-col items-center z-10 cursor-default">
                {/* Cercle numéroté */}
                <div className={`w-14 h-14 bg-white border-2 ${accentBorder} rounded-full shadow-md flex items-center justify-center mb-5
                                 transition-all duration-300
                                 group-hover:scale-110 group-hover:bg-teal-400 group-hover:shadow-lg group-hover:border-teal-400`}>
                  <span className={`${accentText} font-black text-xl transition-colors duration-300 group-hover:text-white`}>
                    {i + 1}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="text-navy-800 font-black text-sm mb-3 text-teal-500 transition-colors duration-300 group-hover:text-navy-800">
                  {step.title}
                </h3>

                {/* Liste à puces — masquée par défaut, visible au survol */}
                <ul className="text-left space-y-1.5 overflow-hidden max-h-0 opacity-0 group-hover:max-h-60 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  {step.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-gray-600 text-xs leading-relaxed flex items-start gap-2"
                    >
                      <span className={`${bulletColor} mt-0.5 shrink-0`}>•</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <div className="mt-8 lg:mt-16">
          <Button
            variant="navy"
            href={ctaUrl}
            style={{ borderRadius: "8px", background: "#1C3553" }}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
