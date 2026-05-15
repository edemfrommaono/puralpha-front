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

export function TarificationSection({ tarif, tarifRows, tarifInclus, fallback: fb }: TarificationSectionProps) {
  return (
    <section className="py-20 lg:py-32 relative bg-navy-800 text-white overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-teal-400/80 font-bold text-xs uppercase tracking-[3px]">
            {tarif?.section_tag || fb.section_tag}
          </span>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-white mt-4 leading-tight">
            {tarif?.title || fb.title}<br />
            <span className="text-gold-500">{tarif?.title_highlight || fb.title_highlight}</span>
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 text-center mb-16">
          <div className="flex items-center justify-center gap-1">
            <span className="text-7xl lg:text-[80px] font-black text-gold-500 leading-none">{tarif?.price || fb.price}</span>
            <span className="text-3xl font-black text-gold-500 self-start mt-2">€</span>
          </div>
          <p className="text-white/50 mt-4">{tarif?.price_details || fb.price_details}</p>

          {/* Badges Inclus */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {tarifInclus.map((badge, i) => (
              <span key={i} className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> {badge.text}
              </span>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-white/5">
                <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Créneau</th>
                <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Tarif TTC</th>
                <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Aide PCH</th>
                <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Crédit d&apos;impôt 50%</th>
                <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Reste à charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {tarifRows.map((row, i) => (
                <tr key={i} className={i === 0 ? "bg-teal-400/5" : ""}>
                  <td className={`py-4 px-6 text-sm font-semibold ${i === 0 ? "text-white" : "text-white/80"}`}>{row.creneau}</td>
                  <td className="py-4 px-6 text-sm text-white/60">{row.tarif_ttc}</td>
                  <td className="py-4 px-6 text-sm text-white/60">{row.aide_pch}</td>
                  <td className="py-4 px-6 text-sm text-white/60">{row.credit_impot}</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gold-500">{row.reste_a_charge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-xs text-white/30 mt-6">
          {tarif?.footnote || fb.footnote}
        </p>
      </div>
    </section>
  );
}
