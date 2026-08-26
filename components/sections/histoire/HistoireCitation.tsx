import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";

interface HistoireCitationProps {
  citation: string;
  auteur: string;
  role: string;
  ctaTexte: string;
  ctaUrl: string;
  backgroundImage: string;
}

/** Section finale — citation de la fondatrice sur fond bleu nuit + CTA doré. */
export function HistoireCitation({
  citation,
  auteur,
  role,
  ctaTexte,
  ctaUrl,
  backgroundImage,
}: HistoireCitationProps) {
  return (
    <section className="bg-navy-800 py-12 lg:py-24 text-center relative">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-5"
        />
      )}
      <FadeInView className="container mx-auto px-4 lg:px-8 max-w-4xl flex flex-col items-center relative z-10">
        {citation && (
          <blockquote className="typo-h3 text-white italic">
            {citation}
          </blockquote>
        )}
        <p className="text-white font-bold mt-8">{auteur}</p>
        {role && (
          <p className="text-white/50 text-xs uppercase tracking-[2px] mt-2">
            {role}
          </p>
        )}
        {ctaTexte && ctaUrl && (
          <Button
            variant="gold"
            href={ctaUrl}
            iconRight={<ArrowRight className="w-4 h-4" />}
            className="mt-10"
          >
            {ctaTexte}
          </Button>
        )}
      </FadeInView>
    </section>
  );
}
