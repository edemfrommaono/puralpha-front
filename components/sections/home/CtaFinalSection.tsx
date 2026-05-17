import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";

interface CtaFinalSectionProps {
  ctaFinal?: {
    title: string;
    title_highlight: string;
    subtitle: string;
    cta_text: string;
  };
  ctaBadges: readonly { text: string }[];
  ctaFondUrl: string;
  fallback: {
    title: string;
    title_highlight: string;
    subtitle: string;
    cta_text: string;
    cta_url: string;
  };
}

export function CtaFinalSection({ ctaFinal, ctaBadges, ctaFondUrl, fallback: fb }: CtaFinalSectionProps) {
  return (
    <section className="bg-navy-800 py-[100px] relative overflow-hidden">
      {ctaFondUrl && (
        <Image
          src={ctaFondUrl}
          alt=""
          fill
          className="object-cover opacity-20"
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeInView className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-[50.4px]">
            {ctaFinal?.title || fb.title}{" "}
            <span className="text-gold-500">
              {ctaFinal?.title_highlight || fb.title_highlight}
            </span>
          </h2>
          <p className="text-xl text-white/80">
            {ctaFinal?.subtitle || fb.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80 my-4">
            {ctaBadges.map((badge, i) => (
              <span key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: '#F2C94C' }} /> {badge.text}
                {i < ctaBadges.length - 1 && (
                  <span className="hidden sm:block text-white/20 ml-4">·</span>
                )}
              </span>
            ))}
          </div>
          <Button
            variant="gold"
            className="px-10 py-4 text-lg mt-4"
            href={fb.cta_url}
            style={{ borderRadius: '50px', background: '#F2C94C', boxShadow: '0 4px 15px 0 rgba(242, 201, 76, 0.30)' }}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            {ctaFinal?.cta_text || fb.cta_text}
          </Button>
        </FadeInView>
      </div>
    </section>
  );
}
