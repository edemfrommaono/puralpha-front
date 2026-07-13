import { FadeInView } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

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
    <section className="bg-[#ecf4f6] pt-10 pb-8 lg:pt-24 lg:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <FadeInView className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-navy-800 leading-tight">
            {hero?.title_line_1 || fb.title_line_1}<br />
            {hero?.title_line_2 || fb.title_line_2}<br />
            <span className="text-teal-400">{hero?.title_highlight || fb.title_highlight}</span>
          </h1>
          {(hero?.description || fb.description) && (
            <div
              className="prose max-w-2xl mx-auto text-center text-gray-600 mt-2"
              dangerouslySetInnerHTML={{ __html: toHtml(hero?.description || fb.description) }}
            />
          )}
        </FadeInView>


      </div>
    </section>
  );
}
