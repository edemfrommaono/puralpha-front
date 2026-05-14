import { Button } from "@/components/ui/Button";
import { getAidesFinancieresPage } from "@/lib/wordpress";
import { AIDES_FALLBACK } from "@/lib/fallback-data/aides-financieres";

export const revalidate = 0;

export default async function AidesFinancieresPage() {
  const page = await getAidesFinancieresPage();
  const acf = page?.acf;
  const fb = AIDES_FALLBACK;

  // Hero
  const hero = acf?.hero;
  const heroBadges = hero?.badges?.length ? hero.badges : fb.hero.badges;

  // Aides
  const aides = acf?.aides;
  const aidesCards = aides?.cards?.length ? aides.cards : null;

  // Tarification
  const tarif = acf?.tarification;
  const tarifRows = tarif?.rows?.length ? tarif.rows : fb.tarification.rows;
  const tarifInclus = tarif?.inclus_badges?.length ? tarif.inclus_badges : fb.tarification.inclus_badges;

  // CTA Final
  const cta = acf?.cta_final;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <section className="bg-[#ecf4f6] pt-32 pb-32 lg:pt-40 lg:pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy-800 leading-tight">
              {hero?.title_line_1 || fb.hero.title_line_1}<br />
              {hero?.title_line_2 || fb.hero.title_line_2}<br />
              <span className="text-teal-400">{hero?.title_highlight || fb.hero.title_highlight}</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mt-2">
              {hero?.description || fb.hero.description}
            </p>
          </div>
          
          {/* Hero Badges */}
          <div className="mt-16 flex flex-col md:flex-row flex-wrap justify-center gap-6 relative z-20">
            {heroBadges.map((badge, i) => (
              <div key={i} className="bg-white border border-gray-100 shadow-sm px-6 py-4 rounded-full flex items-center gap-4">
                <span className="text-2xl font-black text-teal-400">{badge.value}</span>
                <span className="text-sm font-medium text-gray-600">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background Typography */}
        <div className="absolute top-1/2 left-[80%] -translate-y-1/2 text-[150px] sm:text-[200px] lg:text-[260px] font-black text-teal-400/[0.04] leading-none select-none pointer-events-none whitespace-nowrap">
          50%
        </div>
      </section>

      {/* 2. Les 4 aides (Dispositifs mobilisables) */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
              {aides?.section_tag || fb.aides.section_tag}
            </span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              {aides?.title || fb.aides.title}<br />
              <span className="text-teal-400">{aides?.title_highlight || fb.aides.title_highlight}</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {aides?.description || fb.aides.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(aidesCards || fb.aides_cards).map((card, i) => {
              const palettes: Record<string, { bar: string; iconBg: string; titleColor: string; hlBg: string; hlText: string; tagBg: string; tagText: string }> = {
                "#52bdc7": { bar: "bg-teal-400", iconBg: "bg-teal-400/10", titleColor: "text-navy-800", hlBg: "bg-[#ecf4f6]", hlText: "text-teal-400", tagBg: "bg-teal-400/10", tagText: "text-teal-600" },
                "#f2c94c": { bar: "bg-gold-500", iconBg: "bg-gold-500/10", titleColor: "text-gold-500", hlBg: "bg-gold-500/10", hlText: "text-gold-500", tagBg: "bg-gold-500/10", tagText: "text-[#b8860b]" },
                "#1c3553": { bar: "bg-navy-800", iconBg: "bg-navy-800/5", titleColor: "text-navy-800", hlBg: "bg-[#ecf4f6]", hlText: "text-teal-400", tagBg: "bg-teal-400/10", tagText: "text-teal-600" },
                "#718096": { bar: "bg-gray-500", iconBg: "bg-gray-100", titleColor: "text-navy-800", hlBg: "bg-gray-100", hlText: "text-gray-600", tagBg: "bg-gray-100", tagText: "text-gray-600" },
              };
              const c = palettes[card.accent_color] || palettes["#52bdc7"];
              const fbCard = fb.aides_cards[i];
              const hasImage = 'image' in card && card.image && typeof card.image === 'object' && 'url' in card.image && card.image.url;

              return (
                <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden pt-10">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${c.bar}`} />
                  <div className="flex gap-4 items-start">
                    <div className={`w-14 h-14 ${c.iconBg} rounded-2xl flex items-center justify-center text-2xl shrink-0`}>
                      {hasImage ? (
                        <img src={(card.image as { url: string }).url} alt="" className="w-8 h-8 object-contain" />
                      ) : (
                        <span>{fbCard?.fallback_icon || "📄"}</span>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black leading-tight ${c.titleColor}`}>{card.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <div className={`${c.hlBg} rounded-xl p-4 flex items-center justify-between`}>
                    <span className={`text-xl font-extrabold ${c.hlText}`}>{card.highlight_value}</span>
                    <span className="text-xs text-gray-500">{card.highlight_label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, j) => (
                      <span key={j} className={`px-3 py-1.5 ${c.tagBg} ${c.tagText} text-xs font-semibold rounded-full`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Tarification */}
      <section className="py-20 lg:py-32 relative bg-navy-800 text-white overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-teal-400/80 font-bold text-xs uppercase tracking-[3px]">
              {tarif?.section_tag || fb.tarification.section_tag}
            </span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-white mt-4 leading-tight">
              {tarif?.title || fb.tarification.title}<br />
              <span className="text-gold-500">{tarif?.title_highlight || fb.tarification.title_highlight}</span>
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 text-center mb-16">
            <div className="flex items-center justify-center gap-1">
              <span className="text-7xl lg:text-[80px] font-black text-gold-500 leading-none">{tarif?.price || fb.tarification.price}</span>
              <span className="text-3xl font-black text-gold-500 self-start mt-2">€</span>
            </div>
            <p className="text-white/50 mt-4">{tarif?.price_details || fb.tarification.price_details}</p>
            
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
            {tarif?.footnote || fb.tarification.footnote}
          </p>
        </div>
      </section>

      {/* 4. Simulateur (statique — non géré par le CMS) */}
      <section className="bg-[#ecf4f6] py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Simulateur</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              Estimez votre<br />
              <span className="text-teal-400">reste à charge</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Ces estimations sont indicatives. Une simulation personnalisée est réalisée avant toute signature de contrat.
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

      {/* 5. Accompagnement admin (statique — non géré par le CMS) */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Accompagnement administratif</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              Vous n&apos;êtes pas <span className="text-teal-400">seuls</span><br />
              dans les démarches
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              PUR Alpha vous accompagne dans l&apos;identification et le montage des dossiers d&apos;aides. Parce que la complexité administrative ne doit pas être un frein.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-teal-400/10 leading-none absolute top-4 right-4">01</span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10 mt-8">Identification des aides</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                Nous analysons votre situation pour identifier toutes les aides auxquelles vous avez droit : PCH, AEEH, crédit d&apos;impôt, aides locales.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-teal-400/10 leading-none absolute top-4 right-4">02</span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10 mt-8">Simulation personnalisée</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                Avant toute signature, une simulation précise de votre reste à charge est réalisée en tenant compte de votre plan MDPH et de votre situation fiscale.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-teal-400/10 leading-none absolute top-4 right-4">03</span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10 mt-8">Soutien aux dossiers</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                Nous vous fournissons tous les documents nécessaires (devis, attestations, factures) et vous orientons vers les bons interlocuteurs pour vos demandes.
              </p>
            </div>
          </div>

          {/* Modalités */}
          <div className="mt-16 bg-[#ecf4f6] rounded-3xl p-8 lg:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">Facturation</span>
              <h4 className="text-navy-800 font-bold text-[15px]">Mensuelle &amp; détaillée</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mt-1">
                Émission en fin de mois, détail clair des heures et prestations réalisées. Par email ou courrier.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">Paiement</span>
              <h4 className="text-navy-800 font-bold text-[15px]">Plusieurs options</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mt-1">
                Virement bancaire, prélèvement SEPA sécurisé, CESU préfinancé accepté. Pas d&apos;espèces.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">Annulation</span>
              <h4 className="text-navy-800 font-bold text-[15px]">Préavis 48h</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mt-1">
                Annulation ≥ 48h : heures non facturées.<br />
                Annulation &lt; 48h : heures dues sauf urgence avérée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Final */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-800 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800/80 to-navy-800/80 z-10" />
        <div className="absolute inset-0 bg-gray-200 z-0" />
        
        <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
          <h2 className="text-3xl lg:text-[42px] font-black text-white mb-6 leading-tight max-w-4xl">
            {cta?.title || fb.cta_final.title} <br className="hidden md:block"/>
            <span className="text-gold-500">{cta?.title_highlight || fb.cta_final.title_highlight}</span>
          </h2>
          <p className="text-white/85 text-xl mb-12 max-w-3xl leading-relaxed">
            {cta?.description || fb.cta_final.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Devis gratuit
            </div>
            <span className="hidden sm:block text-white/25 text-lg">·</span>
            <div className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Sans engagement
            </div>
            <span className="hidden sm:block text-white/25 text-lg">·</span>
            <div className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Réponse sous 48h
            </div>
          </div>

          <Button variant="gold" href={cta?.cta_url || fb.cta_final.cta_url} className="px-10">
            {cta?.cta_text || fb.cta_final.cta_text}
          </Button>
        </div>
      </section>
    </div>
  );
}
