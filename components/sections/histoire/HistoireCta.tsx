import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

interface HistoireCtaProps {
  title: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  badges: readonly { text: string }[];
}

export function HistoireCta({
  title, titleHighlight, description, ctaText, ctaUrl, badges,
}: HistoireCtaProps) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-800 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/90 to-navy-800/90 z-10" />
      <div className="absolute inset-0 bg-gray-200 z-0" />
      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
        <h2 className="text-3xl lg:text-[40px] font-black text-white mb-6 leading-tight max-w-3xl">
          {title} <span className="text-teal-400">{titleHighlight}</span> ?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl leading-relaxed">{description}</p>
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
          <Button variant="gold" href={ctaUrl}>{ctaText}</Button>
          <div className="flex items-center gap-6 text-white/70 text-sm">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" strokeWidth={2.5} /> {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
