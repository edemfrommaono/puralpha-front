import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";

interface RejoindreHeroProps {
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export function RejoindreHero({
  titleLine1, titleLine2, titleHighlight, description, ctaPrimaryText, ctaSecondaryText,
}: RejoindreHeroProps) {
  return (
    <section className="relative w-full bg-[#ecf4f6] pt-10 pb-8 md:pt-32 md:pb-24 overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center max-w-5xl">
        <FadeInView>
          <h1 className="text-3xl md:text-5xl lg:text-[70px] font-black text-navy-800 leading-tight mb-6 lg:mb-8">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
            <span className="block text-teal-400">{titleHighlight}</span>
          </h1>
        </FadeInView>
        <FadeInView delay={0.15}>
          <p className="text-base text-center md:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-10 max-w-2xl">{description}</p>
        </FadeInView>
        <FadeInView delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="navy" className="px-6 py-3 md:px-8 md:py-4 rounded-lg text-sm md:text-base font-semibold w-full sm:w-auto" href="#candidature">
              {ctaPrimaryText}
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Button variant="outline-navy" className="px-6 py-3 md:px-8 md:py-4 rounded-lg text-sm md:text-base font-semibold text-navy-800 border-navy-800 w-full sm:w-auto" href="/contact">
              {ctaSecondaryText}
            </Button>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
