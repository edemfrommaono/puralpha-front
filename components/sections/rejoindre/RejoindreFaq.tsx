import { Accordion } from "@/components/ui/Accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface RejoindreFaqProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  items: FaqItem[];
}

export function RejoindreFaq({ sectionTag, title, titleHighlight, items }: RejoindreFaqProps) {
  return (
    <section className="w-full py-8 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-8 lg:mb-16">
          <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">{sectionTag}</p>
          <h2 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-navy-800 mb-4 lg:mb-6">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
