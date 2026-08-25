import { FadeInView } from "@/components/ui/FadeInView";
import { toHtml } from "@/lib/wysiwyg";

interface Quality {
  text: string;
}

interface RejoindreValeursProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  paragraph?: string;
  qualities: readonly Quality[];
  imageUrl?: string;
}

export function RejoindreValeurs({
  sectionTag, title, titleHighlight, paragraph, qualities, imageUrl,
}: RejoindreValeursProps) {
  return (
    <section className="w-full bg-white py-8 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 container mx-auto px-4 md:px-6 max-w-6xl items-center">
        <FadeInView direction="left" className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] rounded-2xl lg:rounded-none overflow-hidden order-2 lg:order-1">
          {imageUrl ? (
            <img src={imageUrl} alt="Nos valeurs humaines" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
          ) : (
            <div className="absolute inset-0 bg-gray-200" />
          )}
        </FadeInView>
        <FadeInView direction="right" delay={0.15} className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
          <p className="typo-tag text-teal-400 mb-4">{sectionTag}</p>
          <h2 className="typo-h2 text-navy-800 mb-4 lg:mb-6">
            {title} <br className="hidden md:block" />
            <span className="text-teal-400">{titleHighlight}</span>
          </h2>
          {paragraph && (
            <div
              className="typo-body prose prose-p:mb-4 prose-p:last:mb-0 max-w-none mb-10"
              dangerouslySetInnerHTML={{
                __html: toHtml(paragraph)
              }}
            />
          )}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-4 w-full text-left">
            {qualities.map((q, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F2C94C] shrink-0"></div>
                <span className="typo-small font-semibold text-navy-800">{q.text}</span>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
