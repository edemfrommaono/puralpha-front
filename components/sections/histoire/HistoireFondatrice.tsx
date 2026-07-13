import { FadeInView } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

interface HistoireFondatriceProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  paragraph_1?: string;
  quote: string;
  quoteAuthor: string;
  imageCaption: string;
  imageUrl?: string;
}

export function HistoireFondatrice({
  sectionTag,
  title,
  titleHighlight,
  paragraph_1,
  quote,
  quoteAuthor,
  imageCaption,
  imageUrl,
}: HistoireFondatriceProps) {
  return (
    <section className="py-8 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-stretch">
          {/* col 1 image gauche */}
          <FadeInView direction="left" className="relative overflow-hidden shadow-xl w-full h-full min-h-[350px] lg:min-h-[490px] rounded-2xl lg:rounded-3xl">
            {imageUrl ? (
              <img src={imageUrl} alt={imageCaption} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white/90 italic text-sm">
              {imageCaption}
            </div>
          </FadeInView>
          {/* col 2 droite */}
          <FadeInView direction="right" delay={0.15} className="flex flex-col justify-center">
            {/* <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
                  {sectionTag}
                </span> */}
            <h2 className="typo-h2 text-navy-800 mt-4 mb-4 lg:mb-6">
              {title}<br />
              <span className="text-[#F2C94C]">{titleHighlight}</span>
            </h2>
            {paragraph_1 && (
              <div
                className="prose prose-p:mb-4 prose-p:last:mb-0 max-w-none typo-body"
                dangerouslySetInnerHTML={{
                  __html: toHtml(paragraph_1)
                }}
              />
            )}
            {/* <div className="mt-4 p-6 bg-gold-500/5 rounded-tr-xl rounded-br-xl border-l-4 border-gold-500">
                <p className="text-navy-800 italic text-lg leading-relaxed">{quote}</p>
                <p className="text-teal-400 font-bold text-xs uppercase tracking-[2px] mt-4">— {quoteAuthor}</p>
              </div> */}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
