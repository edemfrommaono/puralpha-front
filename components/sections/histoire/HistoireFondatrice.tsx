import { FadeInView } from "@/components/ui/FadeInView";

interface HistoireFondatriceProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  quoteAuthor: string;
  imageCaption: string;
  imageUrl?: string;
}

export function HistoireFondatrice({
  sectionTag,
  title,
  titleHighlight,
  paragraph1,
  paragraph2,
  quote,
  quoteAuthor,
  imageCaption,
  imageUrl,
}: HistoireFondatriceProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* col 1 image gauche */}
          <FadeInView direction="left" className="relative overflow-hidden shadow-xl" style={{ minHeight: "490px", borderRadius: "16px" }}>
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
          <FadeInView direction="right" delay={0.15}>
            {/* <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
                  {sectionTag}
                </span> */}
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              {title}<br />
              <span className="text-teal-400">{titleHighlight}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">{paragraph1}</p>
            <p className="text-gray-600 text-lg leading-relaxed">{paragraph2}</p>
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
