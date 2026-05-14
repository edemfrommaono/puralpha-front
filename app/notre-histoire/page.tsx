import { Button } from "@/components/ui/Button";
import { getNotreHistoirePage } from "@/lib/wordpress";
import { NOTRE_HISTOIRE_FALLBACK } from "@/lib/fallback-data/notre-histoire";

export const revalidate = 0;

export default async function NotreHistoirePage() {
  const page = await getNotreHistoirePage();
  const acf = page?.acf;
  const fb = NOTRE_HISTOIRE_FALLBACK;

  // Sections dynamiques
  const hero = acf?.hero;
  const fondatrice = acf?.fondatrice;
  const realite = acf?.realite_familles;
  const problems = realite?.problems?.length ? realite.problems : null;
  const pura = acf?.syndrome_pura;
  const mission = acf?.mission;
  const valeurs = acf?.valeurs;
  const valeursItems = valeurs?.items?.length ? valeurs.items : null;
  const ambitions = acf?.ambitions;
  const ambitionsItems = ambitions?.items?.length ? ambitions.items : null;
  const cta = acf?.cta_final;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <section className="bg-[#ecf4f6] pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
            <h1 className="text-5xl lg:text-7xl font-black text-navy-800 leading-tight">
              {hero?.title_line_1 || fb.hero.title_line_1}<br />
              <span className="text-teal-400">{hero?.title_highlight || fb.hero.title_highlight}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-navy-800 leading-relaxed max-w-2xl">
              {hero?.description || fb.hero.description}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-10 h-0.5 bg-teal-400" />
              <p className="text-navy-800 font-bold text-sm tracking-wide">
                {hero?.founder_name || fb.hero.founder_name} <span className="text-gray-500 font-semibold">— {hero?.founder_subtitle || fb.hero.founder_subtitle}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[100px] sm:text-[150px] lg:text-[200px] font-black text-navy-800/[0.04] leading-none select-none pointer-events-none whitespace-nowrap">
          Histoire
        </div>
      </section>

      {/* 2. L'histoire de la fondatrice */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
                  {fondatrice?.section_tag || fb.fondatrice.section_tag}
                </span>
                <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
                  {fondatrice?.title || fb.fondatrice.title}<br />
                  <span className="text-teal-400">{fondatrice?.title_highlight || fb.fondatrice.title_highlight}</span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {fondatrice?.paragraph_1 || fb.fondatrice.paragraph_1}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {fondatrice?.paragraph_2 || fb.fondatrice.paragraph_2}
              </p>
              <div className="mt-4 p-6 bg-gold-500/5 rounded-tr-xl rounded-br-xl border-l-4 border-gold-500">
                <p className="text-navy-800 italic text-lg leading-relaxed">
                  {fondatrice?.quote || fb.fondatrice.quote}
                </p>
                <p className="text-teal-400 font-bold text-xs uppercase tracking-[2px] mt-4">
                  — {fondatrice?.quote_author || fb.fondatrice.quote_author}
                </p>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gray-200" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white/90 italic text-sm">
                {fondatrice?.image_caption || fb.fondatrice.image_caption}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ce que les familles vivent vraiment */}
      <section className="py-20 lg:py-32 bg-[#ecf4f6] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] lg:text-[280px] font-black text-navy-800/[0.04] leading-none select-none pointer-events-none">
          PURA
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Colonne gauche : Les problèmes */}
            <div className="flex flex-col gap-8 justify-center">
              <div>
                <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 leading-tight">
                  {realite?.title || fb.realite_familles.title}<br />
                  <span className="text-teal-400">{realite?.title_highlight || fb.realite_familles.title_highlight}</span>
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {(problems || fb.realite_familles.problems).map((problem, i) => {
                  const borders = ["border-teal-400", "border-gold-500", "border-teal-400"];
                  const hasImage = 'image' in problem && problem.image && typeof problem.image === 'object' && 'url' in problem.image && problem.image.url;
                  const fbProblem = fb.realite_familles.problems[i];

                  return (
                    <div key={i} className={`bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 ${borders[i % borders.length]} relative`}>
                      <div className="text-2xl mt-1 shrink-0">
                        {hasImage ? (
                          <img src={(problem.image as { url: string }).url} alt="" className="w-7 h-7 object-contain" />
                        ) : (
                          <span>{fbProblem?.fallback_icon || "📌"}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-800 text-base mb-2">{problem.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Colonne droite : Carte PURA */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_4px_24px_rgba(30,58,95,0.06)] border border-navy-800/10 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/10 blur-2xl rounded-full" />
               <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px] mb-4">
                 {pura?.section_tag || fb.syndrome_pura.section_tag}
               </span>
               <h3 className="text-2xl lg:text-3xl font-extrabold text-navy-800 mb-6 leading-tight">
                 {pura?.title || fb.syndrome_pura.title}
               </h3>
               <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                 {pura?.description_1 || fb.syndrome_pura.description_1}
               </p>
               <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8">
                 {pura?.description_2 || fb.syndrome_pura.description_2}
               </p>
               <div className="inline-flex items-center gap-3 bg-navy-800/5 px-6 py-3 rounded-full border border-navy-800/10 self-start">
                 <div className="w-4 h-4 bg-teal-400 rounded-full" />
                 <span className="font-bold text-navy-800 text-sm">
                   {pura?.badge_text || fb.syndrome_pura.badge_text}
                 </span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Grille d'images (statique — non géré par le CMS) */}
      <section className="container mx-auto px-4 lg:px-8 py-10 lg:py-20 h-auto lg:h-[700px] max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-2 h-full">
          {[
            { caption: "Présence & stimulation", span: "col-span-1 lg:col-span-2 row-span-2 min-h-[300px] lg:min-h-0", bg: "bg-gray-300" },
            { caption: "Épanouissement", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-200" },
            { caption: "Douceur & confiance", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-300" },
            { caption: "Aide au quotidien", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-200" },
            { caption: "Sérénité retrouvée", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-300" },
          ].map((img, i) => (
            <div key={i} className={`relative rounded-xl overflow-hidden ${img.span}`}>
              <div className={`absolute inset-0 ${img.bg}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/20 to-transparent" />
              <div className="absolute bottom-6 w-full text-center">
                <span className="text-white/90 font-bold text-xs uppercase tracking-[1px]">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Notre mission */}
      <section className="py-20 bg-navy-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-gold-500/10" />
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-white/50 font-bold text-xs uppercase tracking-[3px] mb-4 block">
            {mission?.section_tag || fb.mission.section_tag}
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white/90 leading-tight max-w-4xl mx-auto">
            {mission?.description || fb.mission.description}
          </h2>
        </div>
      </section>

      {/* 6. Nos valeurs */}
      <section className="py-20 lg:py-32 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
              {valeurs?.section_tag || fb.valeurs.section_tag}
            </span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              {valeurs?.title || fb.valeurs.title} <span className="text-teal-400">{valeurs?.title_highlight || fb.valeurs.title_highlight}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(valeursItems || fb.valeurs.items).map((item, i) => {
              const bgs = ["bg-teal-400/10", "bg-navy-800/5", "bg-gold-500/10", "bg-teal-400/10", "bg-navy-800/5"];
              const hasImage = 'image' in item && item.image && typeof item.image === 'object' && 'url' in item.image && item.image.url;
              const fbItem = fb.valeurs.items[i];

              return (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
                  <div className={`w-16 h-16 ${bgs[i % bgs.length]} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                    {hasImage ? (
                      <img src={(item.image as { url: string }).url} alt="" className="w-8 h-8 object-contain" />
                    ) : (
                      <span>{fbItem?.fallback_icon || "⭐"}</span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-navy-800 text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Pourquoi PUR Alpha existe (statique — non géré par le CMS) */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Pourquoi PUR Alpha existe</span>
                <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
                  Un modèle pensé<br />
                  <span className="text-teal-400">pour vous libérer</span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nous avons choisi le mode de la <strong className="font-semibold text-navy-800">mise à disposition</strong> : PUR Alpha emploie directement les intervenants. Vous n&apos;avez aucune démarche administrative à gérer.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pas de contrat, pas de paie, pas de déclarations — tout en gardant la liberté d&apos;organiser le quotidien selon vos besoins.
              </p>
              <div className="mt-4 p-6 bg-gold-500/5 rounded-tr-xl rounded-br-xl border-l-4 border-gold-500">
                <p className="text-navy-800 italic text-lg leading-relaxed">
                  &quot;Vous organisez le quotidien de votre enfant selon vos besoins. PUR Alpha sécurise tout le reste.&quot;
                </p>
                <p className="text-teal-400 font-bold text-xs uppercase tracking-[2px] mt-4">Notre promesse</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-6">
                {["Zéro démarche admin", "Référent famille dédié", "Intervenants formés 70h", "Continuité garantie"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-teal-400 shrink-0">✓</span>
                    <span className="text-gray-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gray-200" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white/90 italic text-sm">
                La sérénité retrouvée, au quotidien
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Territoire (statique — non géré par le CMS) */}
      <section className="py-20 lg:py-32 relative bg-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-800 to-navy-900 z-0" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gray-200/10 blur-sm pointer-events-none z-0" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center max-w-6xl">
          <div className="flex-1 flex flex-col gap-6">
            <span className="text-teal-400/80 font-bold text-xs uppercase tracking-[3px]">Impact local · Val-d&apos;Oise</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold leading-tight">
              Ancrés dans <span className="text-gold-500 font-black">notre territoire</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mt-4">
              PUR Alpha est implanté au cœur du Val-d&apos;Oise — un département que nous connaissons bien, où nous vivons, et où nous avons tissé nos premiers liens avec les familles et les acteurs locaux.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-gradient-to-br from-navy-800 to-[#1a4a6e] border border-teal-400/25 p-8 rounded-3xl flex flex-col items-center text-center gap-2 relative shadow-lg">
              <span className="text-6xl font-black text-gold-500 mb-2">95</span>
              <h3 className="text-xl font-extrabold text-white">Val-d&apos;Oise</h3>
              <p className="text-white/50 text-sm leading-relaxed mt-1">Siège social à Piscop<br />Accueil familles à Montmagny</p>
              <div className="mt-4 px-4 py-2 bg-teal-400/15 border border-teal-400/30 rounded-full flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-teal-400 rounded-full" />
                <span className="text-teal-400 font-bold text-xs">Actif</span>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center gap-2 relative">
              <span className="text-6xl font-black text-white/10 mb-2">93</span>
              <h3 className="text-xl font-extrabold text-white/30">Seine-Saint-Denis</h3>
              <p className="text-white/20 text-sm leading-relaxed mt-1">Territoire à forts besoins<br />Extension à moyen terme</p>
              <div className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-white/30 rounded-full" />
                <span className="text-white/20 font-bold text-xs">À venir</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Ambitions */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-teal-400" />
                <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
                  {ambitions?.section_tag || fb.ambitions.section_tag}
                </span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 leading-tight">
                {ambitions?.title || fb.ambitions.title}<br />
                <span className="text-teal-400 italic">{ambitions?.title_highlight || fb.ambitions.title_highlight}</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mt-2">
                {ambitions?.description || fb.ambitions.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              {(ambitionsItems || fb.ambitions.items).map((item, i) => (
                <div key={i} className="bg-[#ecf4f6] border border-gray-100 rounded-2xl p-6 lg:p-8 flex gap-6 items-start">
                  <span className="text-4xl font-black text-teal-400/25 leading-none">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-bold text-navy-800 text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA Final */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-800 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800/90 to-navy-800/90 z-10" />
        <div className="absolute inset-0 bg-gray-200 z-0" />
        
        <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
          <h2 className="text-3xl lg:text-[40px] font-black text-white mb-6 leading-tight max-w-3xl">
            {cta?.title || fb.cta_final.title} <span className="text-teal-400">{cta?.title_highlight || fb.cta_final.title_highlight}</span> ?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl leading-relaxed">
            {cta?.description || fb.cta_final.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <Button variant="gold" href={cta?.cta_url || fb.cta_final.cta_url}>
              {cta?.cta_text || fb.cta_final.cta_text}
            </Button>
            <div className="flex items-center gap-6 text-white/70 text-sm">
              {(cta?.badges || fb.cta_final.badges).map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-teal-400">✓</span> {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
