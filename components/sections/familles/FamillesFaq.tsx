import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

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
          <h2 className="text-md md:text-2xl lg:text-4xl font-black text-navy-800 mt-4">
            {title} <span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </div>
        <Accordion items={items} />
        <div className="mt-16 text-center">
          <Button
            variant="navy"
            href="/aides-financieres"
            style={{ borderRadius: "8px", background: "#1C3553" }}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Voir les aides financières
          </Button>
        </div>
      </div>
    </section>
  );
}
