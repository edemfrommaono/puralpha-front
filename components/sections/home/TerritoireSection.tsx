import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";

interface TerritoireSectionProps {
  territoire?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    titre_2: string;
    description_1: string;
    description_2: string;
    cta_text: string;
    cta_url: string;
  };
  territoireImageUrl: string;
  logoUrls: string[];
  fallback: {
    section_tag: string;
    title: string;
    title_highlight: string;
    titre_2: string;
    description_1: string;
    description_2: string;
    cta_text: string;
    cta_url: string;
  };
}

export function TerritoireSection({ territoire, territoireImageUrl, logoUrls, fallback: fb }: TerritoireSectionProps) {
  return (
    <section className="py-20 lg:py-32 w-full bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInView direction="left" className="order-2 lg:order-1 relative h-[400px] lg:h-[500px] w-full">
            {territoireImageUrl ? (
              <Image
                src={territoireImageUrl}
                alt="Implantation PUR Alpha — Val-d'Oise"
                fill
                className="object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <span className="text-teal-600/50 font-black text-6xl lg:text-8xl">
                  95
                </span>
                <span className="mt-4 font-bold text-teal-700">
                  Val-d&apos;Oise
                </span>
              </div>
            )}
          </FadeInView>
          <FadeInView direction="right" delay={0.15} className="order-1 lg:order-2 flex flex-col gap-6 max-w-xl">
            <div>
              <div className="flex items-center gap-3 mb-4">

                <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
                  {territoire?.section_tag || fb.section_tag}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-navy-800 leading-tight">
                {territoire?.title || fb.title}{" "}
                <span className="text-teal-400">
                  {territoire?.title_highlight || fb.title_highlight}
                </span>
                {territoire?.titre_2 || fb.titre_2}
              </h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              {territoire?.description_1 || fb.description_1}
            </p>
            {logoUrls.length > 0 && (
              <div className="flex flex-row flex-wrap items-center gap-6">
                {logoUrls.map((url, i) => (
                  <div key={i} className="relative h-16 flex-1 min-w-0">
                    <Image
                      src={url}
                      alt={`Logo partenaire ${i + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {territoire?.description_2 || fb.description_2}
            </p>
            <div>
              <Button
                variant="gold"
                href={territoire?.cta_url || fb.cta_url}
                style={{ borderRadius: '8px', background: '#F2C94C' }}
              >
                <span className="mr-2">▶</span>
                {territoire?.cta_text || fb.cta_text}
              </Button>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
