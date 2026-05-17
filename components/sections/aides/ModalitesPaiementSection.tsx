interface Processus {
  tag: string;
  titre: string;
  description: string;
}

interface ModalitesPaiementSectionProps {
  tag?: string;
  title?: string;
  titleHighlight?: string;
  title2?: string;
  description?: string;
  processus?: Processus[];
  fallbackProcessus: readonly {
    tag: string;
    titre: string;
    description: string;
  }[];
}

const DEFAULTS = {
  tag: "Modalités pratiques",
  title: "Une organisation",
  titleHighlight: "claire,",
  title2: "dès le départ",
  description:
    "Les modalités de facturation, de paiement et d'annulation sont précisées avant toute signature. L'objectif est que chaque famille sache clairement ce qui est prévu, ce qui est facturé et dans quelles conditions une intervention peut être modifiée ou annulée.",
};

export function ModalitesPaiementSection({
  tag,
  title,
  titleHighlight,
  title2,
  description,
  processus,
  fallbackProcessus,
}: ModalitesPaiementSectionProps) {
  const items = processus?.length ? processus : fallbackProcessus;

  return (
    <section className="py-20 lg:py-28 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
            {tag || DEFAULTS.tag}
          </span>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
            {title || DEFAULTS.title}{" "}
            <span className="text-teal-400">{titleHighlight || DEFAULTS.titleHighlight}</span>
            <br />
            {title2 || DEFAULTS.title2}
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            {description || DEFAULTS.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((proc, i) => (
            <div
              key={i}
              className="bg-white shadow-sm self-stretch flex-1"
              style={{ display: "flex", padding: "40px", flexDirection: "column", alignItems: "flex-start", gap: "10px", borderRadius: "0px" }}
            >
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">
                {proc.tag}
              </span>
              <h4 className="text-navy-800 font-bold text-[15px]">{proc.titre}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                {proc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
