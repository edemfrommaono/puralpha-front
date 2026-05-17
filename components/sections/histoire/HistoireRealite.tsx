import { FadeInView } from "@/components/ui/FadeInView";

interface Problem {
  title: string;
  description: string;
  imageUrl?: string;
  fallback_icon?: string;
}

interface HistoireRealiteProps {
  title: string;
  titleHighlight: string;
  problems: Problem[];
  puraSectionTag: string;
  puraTitle: string;
  puraDescription1: string;
  puraDescription2: string;
  puraBadgeText: string;
}

export function HistoireRealite({
  title,
  titleHighlight,
  problems,
  puraSectionTag,
  puraTitle,
  puraDescription1,
  puraDescription2,
  puraBadgeText,
}: HistoireRealiteProps) {
  const borders = ["border-teal-400", "border-gold-500", "border-teal-400"];

  return (
    <section className="py-20 lg:py-32 bg-[#ecf4f6] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] lg:text-[280px] font-black text-navy-800/[0.04] leading-none select-none pointer-events-none">
        PURA
      </div>
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Colonne gauche : Carte PURA */}
          <FadeInView direction="left" className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_4px_24px_rgba(30,58,95,0.06)] border border-navy-800/10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/10 blur-2xl rounded-full" />
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px] mb-4">
              {puraSectionTag}
            </span>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-navy-800 mb-6 leading-tight">
              {puraTitle}
            </h3>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
              {puraDescription1}
            </p>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8">
              {puraDescription2}
            </p>
            <div className="inline-flex items-center gap-3 bg-navy-800/5 px-6 py-3 rounded-full border border-navy-800/10 self-start">
              <div className="w-4 h-4 bg-teal-400 rounded-full" />
              <span className="font-bold text-navy-800 text-sm">{puraBadgeText}</span>
            </div>
          </FadeInView>
          {/* Colonne droite : Les problèmes */}
          <FadeInView direction="right" delay={0.15} className="flex flex-col gap-8 justify-center">
            <div>
              <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 leading-tight">
                {title}<br />
                <span className="text-teal-400">{titleHighlight}</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {problems.map((problem, i) => (
                <div key={i} className={`bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 ${borders[i % borders.length]} relative`}>
                  <div className="text-2xl mt-1 shrink-0">
                    {problem.imageUrl ? (
                      <img src={problem.imageUrl} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <span>{problem.fallback_icon || "📌"}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-base mb-2">{problem.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
