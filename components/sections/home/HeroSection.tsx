import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  hero?: {
    title: string;
    title_highlight: string;
    subtitle: string;
    description: string;
    cta_primary_text: string;
    cta_url: string;
    cta_secondary_text: string;
    hero_overlay_text: string;
  };
  heroImageLeftUrl: string;
  heroImageRightUrl: string;
  fallback: {
    title: string;
    title_highlight: string;
    subtitle: string;
    description: string;
    cta_primary_text: string;
    cta_url: string;
    cta_secondary_text: string;
    hero_overlay_text: string;
  };
}

export function HeroSection({ hero, heroImageLeftUrl, heroImageRightUrl, fallback: fb }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-teal-50 via-[#f7f5f0] to-white pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-black text-navy-800 leading-[45px]">
              {hero?.title || fb.title}{" "}
              <span className="text-teal-500">
                {hero?.title_highlight || fb.title_highlight}
              </span>
            </h1>
            <p className="text-lg lg:text-xl font-semibold text-gray-700">
              {hero?.subtitle || fb.subtitle}
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              {hero?.description || fb.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                variant="navy"
                className="w-full sm:w-auto"
                href={hero?.cta_url || fb.cta_url}
              >
                {hero?.cta_primary_text || fb.cta_primary_text}
              </Button>
              <Button variant="outline-navy" className="w-full sm:w-auto">
                <span className="mr-2">▶</span>
                {hero?.cta_secondary_text || fb.cta_secondary_text}
              </Button>
            </div>
          </div>

          {/* Hero images — URLs résolues côté serveur */}
          <div className="relative h-[400px] lg:h-[600px] w-full flex gap-4 lg:gap-6 justify-end">
            {/* Colonne gauche — image unique, pleine hauteur */}
            <div className="relative w-[45%] rounded-3xl overflow-hidden shadow-lg">
              {heroImageLeftUrl ? (
                <Image
                  src={heroImageLeftUrl}
                  alt="PUR Alpha accompagnement"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-teal-400" />
              )}
            </div>
            {/* Colonne droite — 80% image + 20% texte */}
            <div className="relative w-[45%] flex flex-col gap-4 min-h-0">
              <div className="w-full h-[80%] rounded-3xl overflow-hidden shadow-lg relative">
                {heroImageRightUrl ? (
                  <Image
                    src={heroImageRightUrl}
                    alt="PUR Alpha enfants"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
              </div>
              <div className="bg-navy-700 text-white p-6 rounded-3xl shadow-lg h-[20%] flex items-center">
                <p className="font-bold text-sm leading-relaxed">
                  {hero?.hero_overlay_text || fb.hero_overlay_text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
