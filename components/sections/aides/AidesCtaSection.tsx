import Image from "next/image";
import { ArrowRight, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";
import { AICI_CONFIG } from "@/lib/site-config";

interface CtaBadgeItem {
  titre: string;
  documentUrl?: string;
  url?: string;
}

interface AidesCtaSectionProps {
  cta?: {
    title: string;
    title_highlight: string;
    description: string;
    cta_text: string;
    cta_url: string;
    badges?: Array<{ titre: string; documentUrl?: string }>;
  };
  ctaFondUrl: string;
  ctaBadges: readonly CtaBadgeItem[];
  fallback: {
    title: string;
    title_highlight: string;
    description: string;
    cta_text: string;
    cta_url: string;
  };
}

export function AidesCtaSection({ cta, ctaFondUrl, ctaBadges, fallback: fb }: AidesCtaSectionProps) {
  return (
    <section className="relative py-12 lg:py-12 overflow-hidden bg-navy-800 text-center">
      {/* Background image */}
      {ctaFondUrl && (
        <Image
          src={ctaFondUrl}
          alt=""
          fill
          className="object-cover opacity-20 z-0"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/80 to-navy-800/80 z-10" />

      <FadeInView className="container mx-auto px-4 relative z-20 flex flex-col items-center">
        <h2 className="typo-h1 text-white mb-4 lg:mb-6 max-w-4xl">
          {cta?.title || fb.title} <br className="hidden md:block" />
          <span className="text-gold-500">{cta?.title_highlight || fb.title_highlight}</span>
        </h2>
        <p className="typo-h3 text-white/85 mb-6 lg:mb-12 max-w-3xl">
          {cta?.description || fb.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6 lg:mb-12 text-sm text-white/80">
          {ctaBadges.map((badge, i) => {
            const isAici = badge.titre?.toLowerCase().includes("avance immédiate") || badge.titre?.toLowerCase().includes("crédit d'impôt");
            const docUrl = badge.documentUrl || badge.url || (isAici ? AICI_CONFIG.pdfPath : undefined);

            return (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold-500 shrink-0" />
                {docUrl ? (
                  <a
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center hover:text-white transition-colors duration-200 cursor-pointer"
                    title={isAici ? AICI_CONFIG.title : `Consulter le document : ${badge.titre}`}
                    aria-label={isAici ? AICI_CONFIG.title : `Consulter le document : ${badge.titre}`}
                  >
                    <span className="underline-offset-4 group-hover:underline decoration-gold-500">{badge.titre}</span>
                    <sup className="ml-1 relative -top-1.5 inline-block">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white/10 group-hover:bg-gold-500 text-white group-hover:text-navy-900 transition-all duration-200 group-hover:scale-110">
                        <Info className="w-3 h-3" />
                      </span>
                    </sup>
                  </a>
                ) : (
                  <span>{badge.titre}</span>
                )}
                {i < ctaBadges.length - 1 && (
                  <span className="hidden sm:block text-white/25 text-lg ml-6">·</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="gold"
            href={(cta?.cta_url === '/contact' || !cta?.cta_url) ? '#simulateur' : cta.cta_url}
            className="px-6 md:px-10 rounded-full bg-gold-500 text-navy-800 shadow-[0_4px_15px_0_rgba(242,201,76,0.30)] hover:bg-gold-400"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            {cta?.cta_text || fb.cta_text}
          </Button>
        </div>
      </FadeInView>
    </section>
  );
}
