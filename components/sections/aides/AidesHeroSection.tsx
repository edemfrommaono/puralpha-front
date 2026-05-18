import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/ui/FadeInView";

interface AidesHeroSectionProps {
  hero?: {
    title_line_1: string;
    title_line_2: string;
    title_highlight: string;
    description: string;
  };
  fallback: {
    title_line_1: string;
    title_line_2: string;
    title_highlight: string;
    description: string;
  };
}

export function AidesHeroSection({ hero, fallback: fb }: AidesHeroSectionProps) {
  return (
    <section className="bg-[#ecf4f6] pt-32 pb-32 lg:pt-40 lg:pb-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <FadeInView className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy-800 leading-tight">
            {hero?.title_line_1 || fb.title_line_1}<br />
            {hero?.title_line_2 || fb.title_line_2}<br />
            <span className="text-teal-400">{hero?.title_highlight || fb.title_highlight}</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mt-2">
            {hero?.description || fb.description}
          </p>
        </FadeInView>


      </div>

      {/* Background Typography */}
      <div className="absolute top-1/2 left-[80%] -translate-y-1/2 text-[150px] sm:text-[200px] lg:text-[260px] font-black text-teal-400/[0.04] leading-none select-none pointer-events-none whitespace-nowrap">
        50%
      </div>
    </section>
  );
}
