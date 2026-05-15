interface Accompagnement {
  ordre: number;
  titre: string;
  description: string;
}

interface Processus {
  tag: string;
  titre: string;
  description: string;
}

interface AccompagnementAdminSectionProps {
  accAdmin?: {
    tag: string;
    titre_1: string;
    titre_2: string;
    title_highlight: string;
    description: string;
    accompagnements: Accompagnement[];
    processus: Processus[];
  };
  fallback: {
    tag: string;
    titre_1: string;
    titre_2: string;
    title_highlight: string;
    description: string;
    accompagnements: readonly {
      ordre: number;
      titre: string;
      description: string;
    }[];
    processus: readonly {
      tag: string;
      titre: string;
      description: string;
    }[];
  };
}

export function AccompagnementAdminSection({ accAdmin, fallback: fb }: AccompagnementAdminSectionProps) {
  const accompagnements = accAdmin?.accompagnements?.length ? accAdmin.accompagnements : fb.accompagnements;
  const processus = accAdmin?.processus?.length ? accAdmin.processus : fb.processus;

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
            {accAdmin?.tag || fb.tag}
          </span>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
            {accAdmin?.titre_1 || fb.titre_1}{" "}
            <span className="text-teal-400">{accAdmin?.title_highlight || fb.title_highlight}</span>
            <br />
            {accAdmin?.titre_2 || fb.titre_2}
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {accAdmin?.description || fb.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accompagnements.map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-teal-400/10 leading-none absolute top-4 right-4">
                {String(item.ordre).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10 mt-8">{item.titre}</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Modalités / Processus */}
        <div className="mt-16 bg-[#ecf4f6] rounded-3xl p-8 lg:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {processus.map((proc, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">{proc.tag}</span>
              <h4 className="text-navy-800 font-bold text-[15px]">{proc.titre}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mt-1">
                {proc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
