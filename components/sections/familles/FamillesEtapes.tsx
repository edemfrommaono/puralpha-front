import { Button } from "@/components/ui/Button";
import Image from "next/image";
import {
  PhoneCall, Home, ClipboardList, Heart,
  type LucideIcon,
} from "lucide-react";

/** Map des noms d'icônes Lucide → composants pour les étapes */
const ICON_MAP: Record<string, LucideIcon> = {
  PhoneCall, Home, ClipboardList, Heart,
};

interface Step {
  number: string;
  title: string;
  description: string;
  imageUrl?: string;
  fallback_icon?: string;
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
    <section className="py-20 lg:py-32 bg-gray-50">
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
            {steps.map((step, i) => {
              const IconComp = step.fallback_icon ? ICON_MAP[step.fallback_icon] : null;
              return (
                <div key={i} className="relative flex flex-col items-center gap-6 z-10">
                  <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                    {step.imageUrl ? (
                      <Image
                        src={step.imageUrl}
                        alt={step.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : IconComp ? (
                      <IconComp className="w-6 h-6 text-teal-400" strokeWidth={1.8} />
                    ) : (
                      <span className="text-teal-400 font-black text-xl">{step.number}</span>
                    )}
                    {/* Badge numéro */}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-navy-800 font-black text-base mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <Button variant="navy" href={ctaUrl}>
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
