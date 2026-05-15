import { Accordion } from "@/components/ui/Accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FamillesFaqProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  items: FaqItem[];
}

export function FamillesFaq({
  sectionTag,
  title,
  titleHighlight,
  items,
}: FamillesFaqProps) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
            {sectionTag}
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mt-4">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
