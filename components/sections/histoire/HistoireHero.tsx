import { FadeInView } from "@/components/ui/FadeInView";

interface HistoireHeroProps {
  titleLine1: string;
  titleHighlight: string;
  subtitle?: string;
  description: string;
  quote?: string;
  founderName: string;
  founderSubtitle: string;
}

export function HistoireHero({
  titleLine1,
  titleHighlight,
  subtitle,
  description,
  quote,
  founderName,
  founderSubtitle,
}: HistoireHeroProps) {
  return (
    <section className="bg-[#ecf4f6] pt-8 pb-8 lg:pt-32 lg:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 lg:gap-6 items-center">
          <FadeInView delay={0}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-800 leading-tight text-center">
              {titleLine1}<br />
              <span className="text-teal-400">{titleHighlight}</span>
            </h1>
          </FadeInView>
          {subtitle && (
            <FadeInView delay={0.1}>
              <p className="text-base lg:text-lg font-bold text-navy-800 max-w-2xl text-center">
                {subtitle}
              </p>
            </FadeInView>
          )}
          <FadeInView delay={0.2}>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl text-center">
              {description}
            </p>
          </FadeInView>
          {quote && (
            <FadeInView delay={0.3}>
              <p className="text-base lg:text-lg italic max-w-2xl text-center" style={{ color: "#6B7280" }}>
                {quote}
              </p>
            </FadeInView>
          )}
          <FadeInView delay={0.4}>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-10 h-0.5 bg-teal-400" />
              <p className="text-navy-800 font-bold text-sm tracking-wide">
                {founderName} <span className="text-gray-500 font-semibold">— {founderSubtitle}</span>
              </p>
            </div>
          </FadeInView>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[80px] md:text-[100px] sm:text-[150px] lg:text-[200px] font-black text-navy-800/[0.04] leading-none select-none pointer-events-none whitespace-nowrap">
>>>>>>> Stashed changes
        Histoire
      </div> */}
    </section>
  );
}
