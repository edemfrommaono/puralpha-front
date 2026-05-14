import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { getNousRejoindrePage } from '@/lib/wordpress';
import { NOUS_REJOINDRE_FALLBACK } from '@/lib/fallback-data/nous-rejoindre';

export const revalidate = 0;

export const metadata = {
  title: "Nous rejoindre | PUR Alpha",
  description: "PUR Alpha recherche des intervenants qui mettent l'humain avant tout pour accompagner les enfants en situation de handicap.",
};

export default async function NousRejoindre() {
  const page = await getNousRejoindrePage();
  const acf = page?.acf;
  const fb = NOUS_REJOINDRE_FALLBACK;

  // Sections dynamiques
  const hero = acf?.hero;
  const avantages = acf?.avantages;
  const avantagesCards = avantages?.cards?.length ? avantages.cards : null;
  const vh = acf?.valeurs_humaines;
  const qualities = vh?.qualities?.length ? vh.qualities : fb.valeurs_humaines.qualities;
  const temoignage = acf?.temoignage;
  const faq = acf?.faq;
  const faqItems = faq?.items?.length ? faq.items : fb.faq.items;
  const formulaire = acf?.formulaire;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. HERO */}
      <section className="relative w-full bg-[#ecf4f6] pt-32 pb-24 overflow-hidden flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span className="text-[120px] md:text-[200px] font-black text-[#1e3a5f]/5 tracking-tighter whitespace-nowrap">
            Équipe
          </span>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-[70px] font-black text-navy-800 leading-tight mb-8">
            <span className="block">{hero?.title_line_1 || fb.hero.title_line_1}</span>
            <span className="block">{hero?.title_line_2 || fb.hero.title_line_2}</span>
            <span className="block text-teal-400">{hero?.title_highlight || fb.hero.title_highlight}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
            {hero?.description || fb.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="navy" className="px-8 py-4 rounded-lg text-base font-semibold w-full sm:w-auto">
              {hero?.cta_primary_text || fb.hero.cta_primary_text}
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Button variant="outline-navy" className="px-8 py-4 rounded-lg text-base font-semibold text-navy-800 border-navy-800 w-full sm:w-auto">
              {hero?.cta_secondary_text || fb.hero.cta_secondary_text}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. POURQUOI REJOINDRE */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">
              {avantages?.section_tag || fb.avantages.section_tag}
            </p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              {avantages?.title || fb.avantages.title} <span className="text-teal-400 italic">{avantages?.title_highlight || fb.avantages.title_highlight}</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {avantages?.description || fb.avantages.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(avantagesCards || fb.avantages.cards).map((card, i) => {
              const iconBgs = ["bg-teal-400/10", "bg-gold-500/10", "bg-navy-800/10", "bg-teal-400/10", "bg-gold-500/10", "bg-navy-800/10"];
              const hasImage = 'image' in card && card.image && typeof card.image === 'object' && 'url' in card.image && card.image.url;
              const fbCard = fb.avantages.cards[i];

              return (
                <div key={i} className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start">
                  <div className={`w-12 h-12 rounded-xl ${iconBgs[i % iconBgs.length]} flex items-center justify-center text-2xl mb-6`}>
                    {hasImage ? (
                      <img src={(card.image as { url: string }).url} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <span>{fbCard?.fallback_icon || "⭐"}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-navy-800 mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. NOS VALEURS HUMAINES */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px] lg:min-h-[600px] bg-gray-200 order-2 lg:order-1">
            <div className="absolute inset-0 bg-gray-200" />
          </div>
          <div className="px-6 py-16 lg:px-20 xl:px-24 flex flex-col justify-center order-1 lg:order-2">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">
              {vh?.section_tag || fb.valeurs_humaines.section_tag}
            </p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6 leading-tight">
              {vh?.title || fb.valeurs_humaines.title} <br className="hidden md:block"/>
              <span className="text-teal-400 italic">{vh?.title_highlight || fb.valeurs_humaines.title_highlight}</span>
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              {vh?.paragraph_1 || fb.valeurs_humaines.paragraph_1}
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
              {vh?.paragraph_2 || fb.valeurs_humaines.paragraph_2}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {qualities.map((q, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded bg-teal-400"></div>
                  <span className="text-sm font-semibold text-navy-800">{q.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORMATION & ACCOMPAGNEMENT (statique — non géré par le CMS) */}
      <section className="w-full py-24 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Formation &amp; accompagnement</p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              Vous êtes <span className="text-teal-400">formés et encadrés</span> dès le premier jour
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chez PUR Alpha, aucun intervenant ne commence sans une formation spécialisée. Parce que les enfants méritent des professionnels préparés.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-400 to-gold-500 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {[
                { icon: <span className="text-[22px] font-extrabold text-teal-400">70h</span>, title: "Formation initiale", desc: "Handicap, bientraitance, sécurité, gestes du quotidien. Obligatoire avant toute première mission." },
                { icon: <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, title: "Référent dédié", desc: "Un interlocuteur unique tout au long de votre mission. Points réguliers, écoute, réajustements." },
                { icon: <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Supervision terrain", desc: "Suivi régulier sur le terrain, accompagnement qualité permanent. Vous n'êtes jamais seul(e)." },
                { icon: <span className="text-[26px] font-black text-teal-400">∞</span>, title: "Formation continue", desc: "Actualisation régulière des compétences. PUR Alpha investit dans votre montée en compétences." },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-[32px] bg-white border-2 border-teal-400 shadow-[0_4px_8px_rgba(78,205,196,0.18)] flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-sm font-bold text-navy-800 mb-2">{step.title}</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TÉMOIGNAGE */}
      <section className="relative w-full py-32 overflow-hidden bg-navy-900">
        <div className="absolute inset-0 bg-gray-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10 flex flex-col items-center text-center">
          <div className="text-teal-400 opacity-50 text-6xl font-serif mb-6">&quot;</div>
          <p className="text-2xl md:text-[28px] text-white/90 font-medium italic leading-relaxed mb-8">
            {temoignage?.quote || fb.temoignage.quote}
          </p>
          <p className="text-teal-400 text-sm font-bold tracking-[2px] uppercase">
            {temoignage?.author || fb.temoignage.author}
          </p>
        </div>
      </section>

      {/* 6. PROCESS DE RECRUTEMENT (statique — non géré par le CMS) */}
      <section className="w-full py-24 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Process de recrutement</p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              Simple, <span className="text-teal-400 italic">transparent</span>, humain
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
            {[
              { num: "1", title: "Candidature", desc: "Via le formulaire ci-dessous ou par email à contact@puralpha.fr" },
              { num: "2", title: "Entretien individuel", desc: "Échange humain pour nous découvrir mutuellement. Vérification des références et du casier judiciaire." },
              { num: "3", title: "Formation 70h", desc: "Formation obligatoire avant toute mission. Handicap, bientraitance, sécurité, gestes du quotidien." },
              { num: "4", title: "Première mission", desc: "Matching soigné avec la famille. Passation accompagnée. Votre référent est là dès le départ." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className={`w-[60px] h-[60px] rounded-[30px] ${i === 0 ? "border border-teal-400" : "bg-white border-2 border-teal-400 shadow-sm"} flex items-center justify-center mb-4`}>
                  {i === 3 ? <span className="text-[24px]">🚀</span> : <span className="text-[22px] font-extrabold text-teal-400">{step.num}</span>}
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ INTERVENANTS */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">
              {faq?.section_tag || fb.faq.section_tag}
            </p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              {faq?.title || fb.faq.title} <span className="text-teal-400">{faq?.title_highlight || fb.faq.title_highlight}</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <Accordion items={[...faqItems]} />
          </div>
        </div>
      </section>

      {/* 8. FORMULAIRE CANDIDATURE */}
      <section className="w-full py-24 bg-gradient-to-br from-[#1c3553] to-[#2faaa1]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-white/55 font-bold text-xs tracking-[3px] uppercase mb-4">
              {formulaire?.section_tag || fb.formulaire.section_tag}
            </p>
            <h2 className="text-3xl md:text-[44px] font-extrabold text-white mb-6 leading-tight">
              {formulaire?.title || fb.formulaire.title}
            </h2>
            <p className="text-white/65 text-lg">
              {formulaire?.description || fb.formulaire.description}
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_20px_30px_rgba(30,58,95,0.12)]">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Prénom *</label>
                  <input type="text" placeholder="Votre prénom" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Nom *</label>
                  <input type="text" placeholder="Votre nom" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Email *</label>
                  <input type="email" placeholder="votre@email.fr" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Téléphone</label>
                  <input type="tel" placeholder="06 XX XX XX XX" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Expérience avec le handicap</label>
                <select className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none">
                  <option value="">Sélectionnez...</option>
                  <option value="none">Aucune</option>
                  <option value="personal">Personnelle</option>
                  <option value="professional">Professionnelle</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Pourquoi rejoindre PUR Alpha ?</label>
                <textarea rows={4} placeholder="Présentez-vous en quelques lignes..." className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(30,58,95,0.3)]">
                {formulaire?.submit_text || fb.formulaire.submit_text}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">
                Ou envoyez directement votre CV à <a href={`mailto:${formulaire?.email_fallback || fb.formulaire.email_fallback}`} className="font-bold text-navy-800">{formulaire?.email_fallback || fb.formulaire.email_fallback}</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
