import { FadeInView } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

interface HistoireMissionProps {
  sectionTag: string;
  description: string;
}

export function HistoireMission({ sectionTag, description }: HistoireMissionProps) {
  return (
    <section className="py-16 lg:py-20 bg-navy-800 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-gold-500/10" />
      <FadeInView className="container mx-auto px-4 relative z-10">
        <span className="typo-tag text-white/50 mb-4 block">
          {sectionTag}
        </span>
        {description && (
          <div
            className="prose prose-invert typo-h1 text-white/90 max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: toHtml(description) }}
          />
        )}
      </FadeInView>
    </section>
  );
}
