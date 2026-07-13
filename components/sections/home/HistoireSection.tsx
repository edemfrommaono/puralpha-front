import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";


interface HistoireSectionProps {
  histoire?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    paragraphe: string;
    cta_text: string;
  };
  histoireImageUrl: string;
  fallback: {
    section_tag: string;
    title: string;
    title_highlight: string;
    paragraphe: string;
    cta_text: string;
    cta_url: string;
  };
}

export function HistoireSection({ histoire, histoireImageUrl, fallback: fb }: HistoireSectionProps) {
  return (
    <section className="py-8 lg:py-20 w-full bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeInView direction="left" className="flex flex-col gap-6 max-w-xl">
            <div>
              <div className="flex items-center gap-3 mb-4">

                <span className="typo-tag text-teal-400">
                  {histoire?.section_tag || fb.section_tag}
                </span>
              </div>
              <h2 className="typo-h2 text-navy-800">
                {histoire?.title || fb.title}{" "}
                <span className="text-teal-400">
                  {histoire?.title_highlight || fb.title_highlight}
                </span>
              </h2>
            </div>
            {(histoire?.paragraphe || fb.paragraphe) && (
              <div
                className="prose max-w-none typo-body"
                dangerouslySetInnerHTML={{ __html: toHtml(histoire?.paragraphe || fb.paragraphe) }}
              />
            )}
            <div>
              <Button
                variant="teal"
                href={fb.cta_url}
                style={{ borderRadius: '8px', background: '#52BDC7' }}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                {histoire?.cta_text || fb.cta_text}
              </Button>
            </div>
          </FadeInView>
          {/* Image fondatrice — résolution serveur */}
          <FadeInView direction="right" delay={0.2} className="relative h-[220px] md:h-[400px] lg:h-[500px] w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl bg-gray-100">
            {histoireImageUrl ? (
              <Image
                src={histoireImageUrl}
                alt="Fondatrice de PUR Alpha"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-gray-400 font-bold">
                  Photo de la fondatrice
                </span>
              </div>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
