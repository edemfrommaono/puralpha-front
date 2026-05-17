import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";

interface ResolvedService {
  title: string;
  description: string;
  imageUrl: string;
}

interface InfoBox {
  title: string;
  description: string;
}

interface AccompagnementSectionProps {
  acc?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    cta_text: string;
  };
  resolvedAccServices: ResolvedService[];
  accInfoBoxes: readonly InfoBox[];
  imageMiseEnAvantUrl: string;
  fallback: {
    section_tag: string;
    title: string;
    title_highlight: string;
    cta_text: string;
    cta_url: string;
  };
}

export function AccompagnementSection({
  acc,
  resolvedAccServices,
  accInfoBoxes,
  imageMiseEnAvantUrl,
  fallback: fb,
}: AccompagnementSectionProps) {
  return (
    <section className="py-20 lg:py-32 w-full bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <FadeInView direction="left" className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-gray-100 min-h-[400px]">
            {imageMiseEnAvantUrl ? (
              <Image
                src={imageMiseEnAvantUrl}
                alt="PUR Alpha accompagnement"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-100" />
            )}
          </FadeInView>
          <FadeInView direction="right" delay={0.15} className="flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">

                <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
                  {acc?.section_tag || fb.section_tag}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-navy-800 leading-tight">
                {acc?.title || fb.title}
                <br />
                <span className="text-teal-400">
                  {acc?.title_highlight || fb.title_highlight}
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {resolvedAccServices.map((srv, i) => (
                <div
                  key={i}
                  className={`flex gap-4 items-start ${i < resolvedAccServices.length - 1
                      ? "pb-6 border-b border-navy-800/10"
                      : ""
                    }`}
                >
                  <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center shrink-0 mt-1 overflow-hidden">
                    {srv.imageUrl ? (
                      <Image
                        src={srv.imageUrl}
                        alt={srv.title}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-teal-400">❖</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-bold text-base mb-1">
                      {srv.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-4 mt-2">
              {accInfoBoxes.map((box, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-navy-800/10 p-5 rounded-xl"
                >
                  <h4 className="text-navy-800 font-black text-sm mb-2">
                    {box.title}
                  </h4>
                  <p className="text-gray-500 text-sm">{box.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                variant="teal"
                href={fb.cta_url}
                style={{ borderRadius: '8px', background: '#52BDC7' }}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                {acc?.cta_text || fb.cta_text}
              </Button>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
