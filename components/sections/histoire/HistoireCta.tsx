import { Button } from "@/components/ui/Button";

interface HistoireCtaProps {
  citation: string;
  auteur: string;
  sousTitre: string;
  cta1Texte: string;
  cta1Url: string;
  cta2Texte?: string;
  cta2Url?: string;
  backgroundImageUrl?: string;
}

export function HistoireCta({
  citation,
  auteur,
  sousTitre,
  cta1Texte,
  cta1Url,
  cta2Texte,
  cta2Url,
  backgroundImageUrl,
}: HistoireCtaProps) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-800 text-center">
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 z-0"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/90 to-navy-800/90 z-[1]" />

      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center max-w-4xl">
        <blockquote className="text-xl lg:text-2xl text-white leading-snug italic mb-8">
          {citation}
        </blockquote>
        <p className="text-white/50 font-bold text-[10px] uppercase tracking-[3px] mb-6">— {auteur}</p>
        <p className="text-white/80 font-semibold text-lg lg:text-xl mb-10">{sousTitre}</p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button variant="gold" href={cta1Url}>{cta1Texte}</Button>
          {cta2Texte && cta2Url && (
            <a
              href={cta2Url}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-500 text-gold-500/90 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {cta2Texte}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
