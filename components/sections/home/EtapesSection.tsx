import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Step {
  title: string;
  description: string;
}

interface ResolvedStep extends Step {
  imageUrl: string;
}

interface EtapesSectionProps {
  title: string;
  description: string;
  steps: readonly (Step | ResolvedStep)[];
  ctaText: string;
  ctaUrl: string;
}

export function EtapesSection({ title, description, steps, ctaText, ctaUrl }: EtapesSectionProps) {
  return (
    <section className="py-20 lg:py-32 w-full bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-4">
          {title}
        </h2>
        <p className="text-gray-500 text-base max-w-2xl mx-auto mb-16">
          {description}
        </p>
        <div className="relative">
          <div className="hidden lg:block absolute top-[27px] left-[15%] right-[15%] h-px bg-teal-400/40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center gap-6 z-10"
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center overflow-hidden">
                    {"imageUrl" in step && step.imageUrl ? (
                      <Image
                        src={step.imageUrl}
                        alt={step.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-teal-400 text-lg">●</span>
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-teal-400 text-white rounded-full flex items-center justify-center text-xs font-black shadow-sm">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <Button
            variant="navy"
            href={ctaUrl}
            style={{ borderRadius: '8px', background: '#1C3553' }}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
