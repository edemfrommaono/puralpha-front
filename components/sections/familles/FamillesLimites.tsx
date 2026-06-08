import { ThumbsUp, ThumbsDown } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";

interface FamillesLimitesProps {
  title: string;
  titleHighlight: string;
  ceQueNousFaisons: readonly { text: string }[];
  ceQueNousNeFaisonsPas: readonly { text: string }[];
}

export function FamillesLimites({
  title,
  titleHighlight,
  ceQueNousFaisons,
  ceQueNousNeFaisonsPas,
}: FamillesLimitesProps) {
  if (
    !title &&
    !titleHighlight &&
    (!ceQueNousFaisons || ceQueNousFaisons.length === 0) &&
    (!ceQueNousNeFaisonsPas || ceQueNousNeFaisonsPas.length === 0)
  ) {
    return null;
  }

  return (
    <section className="py-8 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Titre */}
        <FadeInView>
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy-800">
              {title}{" "}
              <br className="hidden lg:block" />
              <span className="text-gold-500">{titleHighlight}</span>
            </h2>
          </div>
        </FadeInView>

        {/* Cartes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

          {/* CE QUE NOUS FAISONS */}
          <FadeInView direction="left" delay={0.1}>
            <div className="rounded-2xl overflow-hidden">
              {/* Icône flottante au-dessus */}
              <div className="flex justify-center -mb-5 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border border-[#202F53]">
                  <img src="/icons/good.png" alt="" width={25} height={25} />
                </div>
              </div>
              {/* Header */}
              <div className="bg-navy-800 text-white text-center py-4 px-6 rounded-2xl">
                <h3 className="text-xs font-bold tracking-widest uppercase">
                  Ce que nous faisons
                </h3>
              </div>
              {/* Body */}
              <div className="bg-[#B2DCDD] p-6 lg:p-8 rounded-2xl">
                <ul className="flex flex-col gap-3">
                  {ceQueNousFaisons.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl px-4 py-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-navy-800 shrink-0 mt-1.5" />
                      <span className="text-navy-800 text-sm leading-relaxed font-semibold">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInView>

          {/* CE QUE NOUS NE FAISONS PAS */}
          <FadeInView direction="right" delay={0.15}>
            <div className="rounded-2xl overflow-hidden">
              {/* Icône flottante au-dessus */}
              <div className="flex justify-center -mb-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border border-[#202F53]">
                  <img src="/icons/bad.png" alt="" width={20} height={20} />
                </div>
              </div>
              {/* Header */}
              <div className="bg-navy-800 text-white text-center py-4 px-6 rounded-2xl">
                <h3 className="text-xs font-bold tracking-widest uppercase">
                  Ce que nous ne faisons pas
                </h3>
              </div>
              {/* Body */}
              <div className="bg-[#B2DCDD] p-6 lg:p-8 rounded-2xl">
                <ul className="flex flex-col gap-3">
                  {ceQueNousNeFaisonsPas.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl px-4 py-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-navy-800 shrink-0 mt-1.5" />
                      <span className="text-navy-800 text-sm font-semibold leading-relaxed">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInView>

        </div>
      </div>
    </section>
  );
}
