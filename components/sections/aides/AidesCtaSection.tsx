import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AidesCtaSectionProps {
  cta?: {
    title: string;
    title_highlight: string;
    description: string;
    cta_text: string;
    cta_url: string;
    badges?: { titre: string }[];
  };
  ctaFondUrl: string;
  ctaBadges: readonly { titre: string }[];
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
    <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-800 text-center">
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

      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
        <h2 className="text-3xl lg:text-[42px] font-black text-white mb-6 leading-tight max-w-4xl">
          {cta?.title || fb.title} <br className="hidden md:block" />
          <span className="text-gold-500">{cta?.title_highlight || fb.title_highlight}</span>
        </h2>
        <p className="text-white/85 text-xl mb-12 max-w-3xl leading-relaxed">
          {cta?.description || fb.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 text-sm text-white/80">
          {ctaBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4" style={{ color: '#F2C94C' }} /> {badge.titre}
              {i < ctaBadges.length - 1 && (
                <span className="hidden sm:block text-white/25 text-lg ml-6">·</span>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="gold"
          href={cta?.cta_url || fb.cta_url}
          className="px-10"
          style={{ borderRadius: '50px', background: '#F2C94C', boxShadow: '0 4px 15px 0 rgba(242, 201, 76, 0.30)' }}
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          {cta?.cta_text || fb.cta_text}
        </Button>
      </div>
    </section>
  );
}
