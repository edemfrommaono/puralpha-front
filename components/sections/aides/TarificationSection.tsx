import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";

interface TarifRow {
  creneau: string;
  tarif_ttc: string;
  aide_pch: string;
  credit_impot: string;
  reste_a_charge: string;
}

interface InclusBadge {
  text: string;
}

interface TarificationSectionProps {
  tarif?: {
    section_tag: string;
    title: string;
    title_highlight: string;
    price: string;
    price_details: string;
    footnote: string;
    estimation_title?: string;
    estimation_description?: string;
    estimation_cta_text?: string;
    estimation_cta_url?: string;
  };
  tarifRows: readonly TarifRow[];
  tarifInclus: readonly InclusBadge[];
  fallback: {
    section_tag: string;
    title: string;
    title_highlight: string;
    price: string;
    price_details: string;
    footnote: string;
  };
}

const ESTIMATION_DEFAULTS = {
  title: "Votre reste à charge est estimé avant toute signature",
  description:
    "Selon votre situation, certaines aides peuvent réduire le coût final : PCH, AEEH, crédit d'impôt SAP ou aides complémentaires. PUR Alpha vous aide à identifier les dispositifs mobilisables et à estimer votre reste à charge avant tout engagement.",
  cta_text: "Demander une simulation personnalisée",
  cta_url: "#simulateur",
};

export function TarificationSection({ tarif, tarifRows, tarifInclus, fallback: fb }: TarificationSectionProps) {
  return (
    <section className="py-8 lg:py-24 relative bg-navy-800 text-white overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <FadeInView className="text-center mb-8 lg:mb-16">
          <span className="text-teal-400/80 font-bold text-xs uppercase tracking-[3px]">
            {tarif?.section_tag || fb.section_tag}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-white mt-4 leading-tight">
            {tarif?.title || fb.title}<br />
            <span className="text-gold-500">{tarif?.title_highlight || fb.title_highlight}</span>
          </h2>
        </FadeInView>

        <div className="bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-12 text-center mb-8 lg:mb-16">
          <div className="flex items-center justify-center gap-1">
            <span className="text-6xl md:text-7xl lg:text-[80px] font-black text-gold-500 leading-none">{tarif?.price || fb.price}</span>
            <span className="text-2xl lg:text-3xl font-black text-gold-500 self-start mt-2">€</span>
          </div>
          <p className="text-white/50 mt-4 text-center">{tarif?.price_details || fb.price_details}</p>

          {/* Badges Inclus */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {tarifInclus.map((badge, i) => (
              <span key={i} className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> {badge.text}
              </span>
            ))}
          </div>
        </div>

        {/* Bloc estimation reste à charge */}
        <div className="text-center">
          <h3 className="text-lg lg:text-2xl font-extrabold text-white mb-4 text-center">
            {tarif?.estimation_title || ESTIMATION_DEFAULTS.title}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-8 text-center">
            {tarif?.estimation_description || ESTIMATION_DEFAULTS.description}
          </p>
          <Button
            variant="navy"
            className="w-fit mx-auto"
            style={{ background: "#F2C94C", color: "#1C3553", borderRadius: "50px", boxShadow: "0 4px 15px 0 rgba(30, 58, 95, 0.30)" }}
            href={(tarif?.estimation_cta_url === '/contact' || !tarif?.estimation_cta_url) ? '#simulateur' : tarif.estimation_cta_url}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            {tarif?.estimation_cta_text || ESTIMATION_DEFAULTS.cta_text}
          </Button>
        </div>
      </div>
    </section>
  );
}
