import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";

interface FamillesCtaProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  badges: readonly { text: string }[];
  ctaText: string;
  ctaUrl: string;
  backgroundImageUrl: string;
}

export function FamillesCta({
  title,
  titleHighlight,
  subtitle,
  badges,
  ctaText,
  ctaUrl,
  backgroundImageUrl,
}: FamillesCtaProps) {
  return (
    <section className="py-8 lg:py-24 bg-navy-800 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeInView className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 lg:gap-8">
          <h2 className="typo-h1 text-white">
            {title} <br className="hidden md:block" /><span className="text-gold-500">{titleHighlight}</span>
          </h2>
          <p className="typo-h3 text-white/85">{subtitle}</p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80 my-4">
            {badges.map((badge, i) => (
              <span key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#F2C94C]" strokeWidth={2.5} /> {badge.text}
                {i < badges.length - 1 && <span className="hidden sm:block text-white/20 ml-4">·</span>}
              </span> 
            ))}
          </div>

          <Button variant="gold" className="px-8 py-3 lg:px-10 lg:py-4 text-base lg:text-lg mt-4 font-bold" href={ctaUrl} iconRight={<ArrowRight className="w-4 h-4" />}>
            {ctaText}
          </Button>
        </FadeInView>
      </div>
    </section>
  );
}
