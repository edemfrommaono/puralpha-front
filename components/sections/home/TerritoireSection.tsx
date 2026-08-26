import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

interface TerritoireSectionProps {
  territoire?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    titre_2?: string;
    description_1: string; // HTML issu du WYSIWYG
    description_2: string; // HTML issu du WYSIWYG
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
    description_1: string; // HTML issu du WYSIWYG
    description_2: string; // HTML issu du WYSIWYG
    cta_text: string;
    cta_url: string;
  };
}

export function TerritoireSection({ territoire, territoireImageUrl, logoUrls, fallback: fb }: TerritoireSectionProps) {
  return (
    <section className="py-8 lg:py-20 w-full bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeInView direction="left" className="order-2 lg:order-1 relative h-[220px] md:h-[380px] lg:h-[500px] w-full">
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
          <FadeInView direction="right" delay={0.15} className="order-1 lg:order-2 flex flex-col gap-6 max-w-xl items-center lg:items-start text-center lg:text-left">
            <div>
              {(territoire?.section_tag || fb.section_tag) && (
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <span className="typo-tag text-teal-400">
                    {territoire?.section_tag || fb.section_tag}
                  </span>
                </div>
              )}
              {(territoire?.title || fb.title || territoire?.title_highlight || fb.title_highlight || territoire?.titre_2 || fb.titre_2) && (
                <h2 className="typo-h2 text-navy-800">
                  {territoire?.title || fb.title}{" "}
                  {(territoire?.title_highlight || fb.title_highlight) && (
                    <span className="text-teal-400">
                      {territoire?.title_highlight || fb.title_highlight}
                    </span>
                  )}{" "}
                  {territoire?.titre_2 || fb.titre_2}
                </h2>
              )}
            </div>
            {(territoire?.description_1 || fb.description_1) && (
              <div
                className="prose max-w-none typo-body text-center lg:text-left"
                dangerouslySetInnerHTML={{
                  __html: toHtml(territoire?.description_1 || fb.description_1),
                }}
              />
            )}
            {logoUrls.length > 0 && (
              <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-12 w-full">
                {logoUrls.map((url, i) => (
                  <div key={i} className="relative h-12 sm:h-16 w-28 sm:w-36 flex-shrink-0">
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
            {(territoire?.description_2 || fb.description_2) && (
              <div
                className="prose max-w-none typo-body text-center lg:text-left"
                dangerouslySetInnerHTML={{
                  __html: toHtml(territoire?.description_2 || fb.description_2),
                }}
              />
            )}
            {territoire?.cta_url && territoire.cta_url !== "#" && (territoire?.cta_text || fb.cta_text) && (
              <div className="w-full sm:w-auto flex justify-center lg:justify-start">
                <Button
                  variant="gold"
                  href={territoire.cta_url}
                  className="w-full sm:w-fit"
                  style={{ borderRadius: '8px', background: '#F2C94C' }}
                >
                  <span className="mr-2">▶</span>
                  {territoire?.cta_text || fb.cta_text}
                </Button>
              </div>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
