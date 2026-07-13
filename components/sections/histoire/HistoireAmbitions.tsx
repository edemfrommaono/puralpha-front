import { FadeInView } from "@/components/ui/FadeInView";

interface AmbitionItem {
  title: string;
  description: string;
}

interface HistoireAmbitionsProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  description: string;
  items: readonly AmbitionItem[];
}

export function HistoireAmbitions({
  sectionTag,
  title,
  titleHighlight,
  description,
  items,
}: HistoireAmbitionsProps) {
  return (
    <section className="bg-white py-8 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <FadeInView direction="left" className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-teal-400" />
              <span className="typo-tag text-teal-400">{sectionTag}</span>
            </div>
            <h2 className="typo-h2 text-navy-800">
              {title}<br /><span className="text-teal-400 italic">{titleHighlight}</span>
            </h2>
            <p className="typo-body text-gray-600 mt-2">{description}</p>
          </FadeInView>
          <FadeInView direction="right" delay={0.15} className="flex flex-col gap-6">
            {items.map((item, i) => (
              <div key={i} className="bg-[#ecf4f6] border border-gray-100 rounded-2xl p-5 md:p-6 lg:p-8 flex gap-4 md:gap-6 items-start">
                <span className="text-3xl md:text-4xl font-black text-teal-400/25 leading-none">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="typo-h3 text-navy-800 text-lg mb-2">{item.title}</h3>
                  <p className="typo-small text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
