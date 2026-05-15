import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HistoireSectionProps {
  histoire?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    paragraph_1: string;
    paragraph_2: string;
    cta_text: string;
  };
  histoireImageUrl: string;
  fallback: {
    section_tag: string;
    title: string;
    title_highlight: string;
    paragraph_1: string;
    paragraph_2: string;
    cta_text: string;
    cta_url: string;
  };
}

export function HistoireSection({ histoire, histoireImageUrl, fallback: fb }: HistoireSectionProps) {
  return (
    <section className="py-20 lg:py-32 w-full bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 max-w-xl">
            <div>
              <div className="flex items-center gap-3 mb-4">

                <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
                  {histoire?.section_tag || fb.section_tag}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-navy-800 leading-tight">
                {histoire?.title || fb.title}{" "}
                <span className="text-teal-400">
                  {histoire?.title_highlight || fb.title_highlight}
                </span>
              </h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              {histoire?.paragraph_1 || fb.paragraph_1}
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {histoire?.paragraph_2 || fb.paragraph_2}
            </p>
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
          </div>
          {/* Image fondatrice — résolution serveur */}
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-100">
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
          </div>
        </div>
      </div>
    </section>
  );
}
