import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { getPourLesFamillesPage } from "@/lib/wordpress";
import { POUR_LES_FAMILLES_FALLBACK } from "@/lib/fallback-data/pour-les-familles";

export const revalidate = 0;

export default async function FamillesPage() {
  const page = await getPourLesFamillesPage();
  const acf = page?.acf;
  const fb = POUR_LES_FAMILLES_FALLBACK;

  // Sections dynamiques
  const hero = acf?.hero;
  const heroStats = hero?.stats?.length ? hero.stats : fb.hero.stats;
  const handicaps = acf?.handicaps;
  const handicapTypes = handicaps?.types?.length ? handicaps.types : null;
  const services = acf?.services;
  const servicesCards = services?.cards?.length ? services.cards : null;
  const etapes = acf?.etapes;
  const etapesSteps = etapes?.steps?.length ? etapes.steps : fb.etapes.steps;
  const limites = acf?.limites;
  const limitesFaisons = limites?.ce_que_nous_faisons?.length ? limites.ce_que_nous_faisons : fb.limites.ce_que_nous_faisons;
  const limitesPasFaisons = limites?.ce_que_nous_ne_faisons_pas?.length ? limites.ce_que_nous_ne_faisons_pas : fb.limites.ce_que_nous_ne_faisons_pas;
  const limitesBadges = limites?.badges?.length ? limites.badges : fb.limites.badges;
  const garanties = acf?.garanties;
  const garantiesItems = garanties?.items?.length ? garanties.items : null;
  const faq = acf?.faq;
  const faqItems = faq?.items?.length ? faq.items : fb.faq.items;
  const cta = acf?.cta_final;
  const ctaBadges = cta?.badges?.length ? cta.badges : fb.cta_final.badges;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <section className="bg-[#ecf4f6] relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl lg:text-5xl lg:text-6xl font-black text-navy-800 leading-tight mb-6 max-w-4xl">
            {hero?.title || fb.hero.title} <span className="text-teal-400">{hero?.title_highlight || fb.hero.title_highlight}</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mb-10">
            {hero?.description || fb.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button variant="navy" href="/contact">
              {hero?.cta_primary_text || fb.hero.cta_primary_text}
            </Button>
            <Button variant="outline-navy" href="/aides-financieres">
              {hero?.cta_secondary_text || fb.hero.cta_secondary_text}
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
            {heroStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl font-black text-teal-400 mb-1">{stat.value}</span>
                <span className="text-xs uppercase tracking-wide text-navy-800 font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Toutes les situations de handicap */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
              {handicaps?.title || fb.handicaps.title} <span className="text-teal-400">{handicaps?.title_highlight || fb.handicaps.title_highlight}</span> accompagnées
            </h2>
            <p className="text-gray-600 text-lg">
              {handicaps?.description || fb.handicaps.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {(handicapTypes || fb.handicaps.types).map((item, idx) => {
              const hasImage = 'image' in item && item.image && typeof item.image === 'object' && 'url' in item.image && item.image.url;
              const fbItem = fb.handicaps.types[idx];
              return (
                <div key={idx} className="bg-[#f0f4f8] border border-[#f3f4f6] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-2xl">
                    {hasImage ? (
                      <img src={(item.image as { url: string }).url} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <span>{fbItem?.fallback_icon || "📌"}</span>
                    )}
                  </div>
                  <span className="font-bold text-navy-800 text-sm">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-teal-400/10 to-gold-500/10 border border-teal-400/20 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <p className="font-bold text-navy-800 text-lg leading-relaxed">
              <span className="text-teal-500">{handicaps?.highlight_quote || fb.handicaps.highlight_quote}</span><br />
              <span className="font-normal">{handicaps?.highlight_description || fb.handicaps.highlight_description}</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Ce que nous faisons concrètement */}
      <section className="py-20 lg:py-32 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
              {services?.title || fb.services.title} <span className="text-teal-400">{services?.title_highlight || fb.services.title_highlight}</span>
            </h2>
            <p className="text-gray-600 text-lg">
              {services?.description || fb.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(servicesCards || fb.services.cards).map((card, i) => (
              <div key={i} className="bg-white border border-[#f3f4f6] rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-48 bg-teal-800/10 relative">
                   <div className="absolute top-4 left-4 bg-gold-500 rounded-full px-4 py-1">
                     <span className="text-navy-800 font-black text-xs tracking-wider uppercase">{card.tag}</span>
                   </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-navy-800 mb-4">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{card.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, j) => (
                      <span key={j} className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">{tag.text}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Comment ça marche */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-4">
            {etapes?.title || fb.etapes.title}
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-16">
            {etapes?.description || fb.etapes.description}
          </p>

          <div className="relative">
            <div className="hidden lg:block absolute top-[27px] left-[15%] right-[15%] h-px bg-teal-400/40" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {etapesSteps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center gap-6 z-10">
                  <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                    <span className="text-teal-400 font-black text-xl">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-navy-800 font-black text-base mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <Button variant="navy" href={etapes?.cta_url || fb.etapes.cta_url}>
              {etapes?.cta_text || fb.etapes.cta_text}
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Nos limites d'intervention */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
              {limites?.title || fb.limites.title} <br className="hidden lg:block"/><span className="text-teal-400">{limites?.title_highlight || fb.limites.title_highlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
            {/* OUI */}
            <div className="bg-teal-50/40 border border-navy-800/5 rounded-[18px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-teal-500 font-bold text-lg tracking-widest uppercase">Ce que nous faisons</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {limitesFaisons.map((item, i) => (
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
                {limitesPasFaisons.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                    <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                    <span className="text-gray-800">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {limitesBadges.map((badge, idx) => (
              <span key={idx} className="bg-navy-800/5 border border-navy-800/10 px-4 py-2 rounded-full text-sm font-bold text-navy-800 flex items-center gap-2">
                <span className="text-teal-500">❖</span> {badge.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Garanties */}
      <section className="py-20 lg:py-32 bg-navy-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black mb-6">
              {garanties?.title || fb.garanties.title} <span className="text-gold-500">{garanties?.title_highlight || fb.garanties.title_highlight}</span>
            </h2>
            <p className="text-lg text-white/70">
              {garanties?.description || fb.garanties.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(garantiesItems || fb.garanties.items).map((item, i) => {
              const hasImage = 'image' in item && item.image && typeof item.image === 'object' && 'url' in item.image && item.image.url;
              const fbItem = fb.garanties.items[i];
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center text-2xl mb-6">
                    {hasImage ? (
                      <img src={(item.image as { url: string }).url} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <span>{fbItem?.fallback_icon || "⭐"}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">
              {faq?.section_tag || fb.faq.section_tag}
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mt-4">
              {faq?.title || fb.faq.title} <span className="text-teal-400">{faq?.title_highlight || fb.faq.title_highlight}</span>
            </h2>
          </div>
          <Accordion items={[...faqItems]} />
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="py-20 lg:py-32 bg-navy-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {cta?.title || fb.cta_final.title} <br className="hidden md:block"/><span className="text-gold-500">{cta?.title_highlight || fb.cta_final.title_highlight}</span>
            </h2>
            <p className="text-xl text-white/80">
              {cta?.subtitle || fb.cta_final.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80 my-4">
              {ctaBadges.map((badge, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span>✦</span> {badge.text}
                  {i < ctaBadges.length - 1 && <span className="hidden sm:block text-white/20 ml-4">·</span>}
                </span>
              ))}
            </div>

            <Button variant="gold" className="px-10 py-4 text-lg mt-4 font-bold" href={cta?.cta_url || fb.cta_final.cta_url}>
              {cta?.cta_text || fb.cta_final.cta_text}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
