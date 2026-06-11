import { FadeInView } from "@/components/ui/FadeInView";

interface Quality {
  text: string;
}

interface RejoindreValeursProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  qualities: readonly Quality[];
  imageUrl?: string;
}

export function RejoindreValeurs({
  sectionTag, title, titleHighlight, paragraph1, paragraph2, qualities, imageUrl,
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
        <FadeInView direction="right" delay={0.15} className="flex flex-col justify-center order-1 lg:order-2">
          <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">{sectionTag}</p>
          <h2 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-navy-800 mb-4 lg:mb-6 leading-tight">
            {title} <br className="hidden md:block" />
            <span className="text-teal-400 italic">{titleHighlight}</span>
          </h2>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-4">{paragraph1}</p>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-10">{paragraph2}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qualities.map((q, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded bg-[#F2C94C]"></div>
                <span className="text-sm font-semibold text-navy-800">{q.text}</span>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
