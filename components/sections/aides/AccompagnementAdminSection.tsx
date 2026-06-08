interface Accompagnement {
  ordre: number;
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
  };
}

export function AccompagnementAdminSection({ accAdmin, fallback: fb }: AccompagnementAdminSectionProps) {
  const accompagnements = accAdmin?.accompagnements?.length ? accAdmin.accompagnements : fb.accompagnements;

  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-8 lg:mb-16">
          <span className="text-[#F2C94C] font-bold text-xs uppercase tracking-[3px]">
            {accAdmin?.tag || fb.tag}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
            {accAdmin?.titre_1 || fb.titre_1}{" "}
            <span className="text-[#F2C94C]">{accAdmin?.title_highlight || fb.title_highlight}</span>
            <br />
            {accAdmin?.titre_2 || fb.titre_2}
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {accAdmin?.description || fb.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accompagnements.map((item, i) => (
            <div key={i} className="bg-[#F6F4EF] border border-[#F3F4F6] rounded-[18px] p-6 lg:p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-[#F2C94C]/50 leading-none">
                {String(item.ordre).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10">{item.titre}</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10 text-start">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
