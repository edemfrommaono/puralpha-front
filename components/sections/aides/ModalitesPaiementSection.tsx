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
  tag: "",
  title: "",
  titleHighlight: "",
  title2: "",
  description: "",
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

  if (!items?.length && !tag && !title && !titleHighlight && !title2 && !description) return null;

  return (
    <section className="py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {(tag || title || titleHighlight || title2 || description) && (
          <div className="text-center mb-6 lg:mb-12">
            {tag && (
              <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
                {tag}
              </span>
            )}
            {(title || titleHighlight || title2) && (
              <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
                {title}{" "}
                {titleHighlight && (
                  <span className="text-teal-400">{titleHighlight}</span>
                )}
                {title2 && <br />}
                {title2}
              </h2>
            )}
            {description && (
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {items.map((proc, i) => (
              <div
                key={i}
                className="bg-white shadow-sm self-stretch flex-1 p-6 md:p-8 lg:p-10 flex flex-col items-start gap-2.5 rounded-none"
              >
                {proc.tag && (
                  <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">
                    {proc.tag}
                  </span>
                )}
                {proc.titre && <h4 className="text-navy-800 font-bold text-[15px]">{proc.titre}</h4>}
                {proc.description && (
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    {proc.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
