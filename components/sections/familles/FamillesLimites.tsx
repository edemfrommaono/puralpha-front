interface FamillesLimitesProps {
  title: string;
  titleHighlight: string;
  ceQueNousFaisons: readonly { text: string }[];
  ceQueNousNeFaisonsPas: readonly { text: string }[];
}

export function FamillesLimites({
  title,
  titleHighlight,
  ceQueNousFaisons,
  ceQueNousNeFaisonsPas,
}: FamillesLimitesProps) {
  if (!title && !titleHighlight && (!ceQueNousFaisons || ceQueNousFaisons.length === 0) && (!ceQueNousNeFaisonsPas || ceQueNousNeFaisonsPas.length === 0)) {
    return null;
  }

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
            {title} <br className="hidden lg:block" /><span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {/* OUI */}
          <div className="bg-teal-50/40 border border-navy-800/5 rounded-[18px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-teal-500 font-bold text-lg tracking-widest uppercase">Ce que nous faisons</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {ceQueNousFaisons.map((item, i) => (
                <li key={i} className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-teal-400/20 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-800">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NON */}
          <div className="bg-red-50/30 border border-navy-800/5 rounded-[18px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-red-600 font-bold text-lg tracking-widest uppercase">Ce que nous ne faisons pas</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {ceQueNousNeFaisonsPas.map((item, i) => (
                <li key={i} className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="text-gray-800">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
