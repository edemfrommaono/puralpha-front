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
    <section className="bg-[#ecf4f6] relative overflow-hidden pt-10 pb-8 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <FadeInView className="max-w-4xl mx-auto flex flex-col gap-4 items-center">
          <h1 className="typo-h1 text-navy-800">
            {hero?.title_line_1 || fb.title_line_1}<br />
            {/* {hero?.title_line_2 || fb.title_line_2}<br /> */}
            <span className="text-teal-400">{hero?.title_highlight || fb.title_highlight}</span>
          </h1>
          {(hero?.description || fb.description) && (
            <div
              className="prose max-w-2xl mx-auto text-center typo-body mt-2"
              dangerouslySetInnerHTML={{ __html: toHtml(hero?.description || fb.description) }}
            />
          )}
        </FadeInView>
      </div>
    </section>
  );
}
