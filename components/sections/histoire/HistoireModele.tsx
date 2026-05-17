import { FadeInView } from "@/components/ui/FadeInView";

interface HistoireModeleProps {
  tag: string;
  titreLigne1: string;
  titleHighlight: string;
  descrition1: string;
  description2: string;
  notrePromesseValeur: string;
  notrePromesseLibelle: string;
  legende: string;
  imageUrl?: string;
  qualites: readonly { la_qualite: string }[];
}

export function HistoireModele({
  tag,
  titreLigne1,
  titleHighlight,
  descrition1,
  description2,
  notrePromesseValeur,
  notrePromesseLibelle,
  legende,
  imageUrl,
  qualites,
}: HistoireModeleProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <FadeInView direction="left" className="flex flex-col gap-8">
            <div>
              <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">{tag}</span>
              <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
                {titreLigne1}<br />
                <span className="text-teal-400">{titleHighlight}</span>
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{descrition1}</p>
            <p className="text-gray-600 text-lg leading-relaxed">{description2}</p>
            <div className="mt-4 p-6 bg-gold-500/5 rounded-tr-xl rounded-br-xl border-l-4 border-gold-500">
              <p className="text-navy-800 italic text-lg leading-relaxed">
                &quot;{notrePromesseValeur}&quot;
              </p>
              <p className="text-teal-400 font-bold text-xs uppercase tracking-[2px] mt-4">{notrePromesseLibelle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-6">
              {qualites.map((q, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-teal-400 shrink-0">✓</span>
                  <span className="text-gray-600 text-sm">{q.la_qualite}</span>
                </div>
              ))}
            </div>
          </FadeInView>
          <FadeInView direction="right" delay={0.15} className="relative h-[400px] lg:h-[620px] overflow-hidden shadow-xl">
            {imageUrl ? (
              <img src={imageUrl} alt={legende} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white/90 italic text-sm">{legende}</div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
