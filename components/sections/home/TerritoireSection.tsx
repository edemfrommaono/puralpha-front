import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface TerritoireSectionProps {
  territoire?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    description_1: string;
    description_2: string;
    cta_text: string;
    cta_url: string;
  };
  territoireImageUrl: string;
  fallback: {
    section_tag: string;
    title: string;
    title_highlight: string;
    description_1: string;
    description_2: string;
    cta_text: string;
    cta_url: string;
  };
}

export function TerritoireSection({ territoire, territoireImageUrl, fallback: fb }: TerritoireSectionProps) {
  return (
    <section className="py-20 lg:py-32 w-full bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[400px] lg:h-[500px] w-full">
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
          </div>
          <div className="order-1 lg:order-2 flex flex-col gap-6 max-w-xl">
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
                , pensé pour les familles
              </h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              {territoire?.description_1 || fb.description_1}
            </p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
