import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";

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
    <section className="relative w-full min-h-[auto] lg:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-teal-50 via-[#f7f5f0] to-white pt-24 pb-8 lg:pt-24 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-8 items-center">
          <div className="flex flex-col gap-6 max-w-3xl">
            {(hero?.title || fb.title || hero?.title_highlight || fb.title_highlight) && (
              <FadeInView direction="left" delay={0}>
                <h1 className="typo-h1 text-navy-800">
                  {hero?.title || fb.title}{" "}
                  {(hero?.title_highlight || fb.title_highlight) && (
                    <span className="text-teal-500">
                      {hero?.title_highlight || fb.title_highlight}
                    </span>
                  )}
                </h1>
              </FadeInView>
            )}
            {(hero?.subtitle || fb.subtitle) && (
              <FadeInView direction="left" delay={0.1}>
                <p className="typo-h3 text-gray-700">
                  {hero?.subtitle || fb.subtitle}
                </p>
              </FadeInView>
            )}
            {(hero?.description || fb.description) && (
              <FadeInView direction="left" delay={0.2}>
                <p className="typo-body text-gray-700">
                  {hero?.description || fb.description}
                </p>
              </FadeInView>
            )}
            {(hero?.cta_primary_text || fb.cta_primary_text || hero?.cta_secondary_text || fb.cta_secondary_text) && (
              <FadeInView direction="up" delay={0.35}>
                <div className="flex flex-col gap-4 mt-4">
                  {(hero?.cta_primary_text || fb.cta_primary_text) && (
                    <Button
                      variant="navy"
                      className="w-fit rounded-lg"
                      style={{ background: "#1C3553" }}
                      href="/contact"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      {hero?.cta_primary_text || fb.cta_primary_text}
                    </Button>
                  )}
                  {(hero?.cta_url || fb.cta_url) && (hero?.cta_secondary_text || fb.cta_secondary_text) && (
                    <Button
                      variant="outline-navy"
                      className="w-fit"
                      href={hero?.cta_url || fb.cta_url}
                    >
                      <span className="mr-2">▶</span>
                      {hero?.cta_secondary_text || fb.cta_secondary_text}
                    </Button>
                  )}
                </div>
              </FadeInView>
            )}
          </div>

          {/* Hero images — URLs résolues côté serveur */}
          <FadeInView direction="right" delay={0.2} className="relative min-h-[180px] md:min-h-[380px] lg:min-h-0 lg:h-[600px] w-full flex items-stretch gap-3 lg:gap-6 justify-end">
            {/* Colonne gauche — image unique, pleine hauteur */}
            <div className="relative w-[55%] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
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
            {/* Colonne droite — image fluide + texte adaptatif */}
            <div className="relative w-[41%] flex flex-col gap-4 min-h-0">
              <div className="w-full flex-1 min-h-[50%] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg relative">
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
              {(hero?.hero_overlay_text || fb.hero_overlay_text) && (
                <div className="bg-navy-700 text-white p-3 md:p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-lg shrink-0 flex items-center">
                  <p className="typo-small font-bold text-white">
                    {hero?.hero_overlay_text || fb.hero_overlay_text}
                  </p>
                </div>
              )}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
