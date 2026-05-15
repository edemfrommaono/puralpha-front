import { Button } from "@/components/ui/Button";

interface SimulateurSectionProps {
  simulateur?: {
    tag: string;
    titre: string;
    title_highlight: string;
    description: string;
  };
  fallback: {
    tag: string;
    titre: string;
    title_highlight: string;
    description: string;
  };
}

export function SimulateurSection({ simulateur, fallback: fb }: SimulateurSectionProps) {
  return (
    <section className="bg-[#ecf4f6] py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
            {simulateur?.tag || fb.tag}
          </span>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
            {simulateur?.titre || fb.titre}<br />
            <span className="text-teal-400">{simulateur?.title_highlight || fb.title_highlight}</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            {simulateur?.description || fb.description}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col gap-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Heures par mois</label>
              <div className="bg-[#ecf4f6] border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-gray-400 text-sm">ex : 40</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Créneau principal</label>
              <div className="bg-[#ecf4f6] border border-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="text-navy-800 text-sm">Semaine (38€/h)</span>
                <span className="text-gray-400 text-xs">▼</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Bénéficiez-vous de la PCH ?</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center" />
                <span className="text-gray-600 text-sm">Oui</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center" />
                <span className="text-gray-600 text-sm">Non</span>
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="gold" className="w-full sm:w-auto px-8 pointer-events-none opacity-80">
              Calculer mon reste à charge
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
