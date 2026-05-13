import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';

export const metadata = {
  title: "Nous rejoindre | PUR Alpha",
  description: "PUR Alpha recherche des intervenants qui mettent l'humain avant tout pour accompagner les enfants en situation de handicap.",
};

export default function NousRejoindre() {
  const faqItems = [
    {
      title: "Faut-il un diplôme pour rejoindre PUR Alpha ?",
      content: "Nous valorisons d'abord vos qualités humaines et votre engagement. La formation initiale de 70h vous donnera toutes les compétences nécessaires."
    },
    {
      title: "Quel est le statut proposé ?",
      content: "Vous êtes salarié(e) de PUR Alpha, avec un contrat de travail en bonne et due forme, garantissant votre couverture sociale et votre sécurité."
    },
    {
      title: "Combien d'heures par semaine ?",
      content: "Les horaires s'adaptent à vos disponibilités. Nous recherchons des personnes à temps partiel ou à temps complet, avec des interventions possibles de 7h à 22h, du lundi au dimanche."
    },
    {
      title: "La formation est-elle rémunérée ?",
      content: "Oui, la formation initiale de 70h est rémunérée et indispensable avant toute première mission."
    },
    {
      title: "Dans quelles zones intervenez-vous ?",
      content: "Nous intervenons principalement dans le Val-d'Oise (95) et ses environs."
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. HERO */}
      <section className="relative w-full bg-[#ecf4f6] pt-32 pb-24 overflow-hidden flex flex-col items-center">
        {/* Background Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span className="text-[120px] md:text-[200px] font-black text-[#1e3a5f]/5 tracking-tighter whitespace-nowrap">
            Équipe
          </span>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-[70px] font-black text-navy-800 leading-tight mb-8">
            <span className="block">Vous aimez</span>
            <span className="block">les gens.</span>
            <span className="block text-teal-400">Rejoignez-nous.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
            PUR Alpha recherche des intervenants qui mettent l&apos;humain avant tout — bienveillants, fiables, engagés auprès des enfants en situation de handicap.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="navy" className="px-8 py-4 rounded-lg text-base font-semibold w-full sm:w-auto">
              Candidater maintenant
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Button variant="outline" className="px-8 py-4 rounded-lg text-base font-semibold text-navy-800 border-navy-800 w-full sm:w-auto">
              Poser une question
            </Button>
          </div>
        </div>
      </section>

      {/* 2. POURQUOI REJOINDRE */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Pourquoi nous rejoindre</p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              Un travail <span className="text-teal-400 italic">qui a du sens</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chez PUR Alpha, intervenir c&apos;est plus qu&apos;un job. C&apos;est s&apos;engager auprès d&apos;enfants qui ont besoin de stabilité, et de familles qui ont besoin de souffler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-2xl mb-6">
                🎯
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Un accompagnement qui a du sens</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vous intervenez auprès d&apos;enfants et jeunes en situation de handicap — TSA, TDAH, polyhandicap, maladies rares — et vous avez un impact concret sur leur quotidien.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-2xl mb-6">
                🤝
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Une structure qui vous soutient</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Contrat de travail direct, formation initiale de 70h, encadrement terrain, référent dédié. Vous n&apos;êtes jamais seul(e) face à une situation difficile.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-navy-800/10 flex items-center justify-center text-2xl mb-6">
                📈
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Une vraie progression professionnelle</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Formation continue, supervision de terrain, échanges de pratiques. PUR Alpha investit dans vos compétences pour que vous grandissiez avec nous.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start lg:col-span-1 lg:ml-auto lg:w-full">
              <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-2xl mb-6">
                ⚖️
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Des horaires qui s&apos;adaptent à vous</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Interventions du lundi au dimanche de 7h à 22h, planifiées avec vous. Nous recherchons des personnes disponibles à temps partiel ou complet.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-2xl mb-6">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Sécurité et couverture complète</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Salarié(e) de PUR Alpha : contrat de travail, couverture sociale, assurance RC Pro pour toutes vos interventions. Zéro flou sur votre statut.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-navy-800/10 flex items-center justify-center text-2xl mb-6">
                ❤️
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Une équipe humaine et bienveillante</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                PUR Alpha est né d&apos;une histoire de vie. Nos valeurs — bientraitance, continuité, transparence — s&apos;appliquent aussi à nos intervenants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOS VALEURS HUMAINES */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[400px] lg:min-h-[600px] bg-gray-200 order-2 lg:order-1">
            {/* Placeholder for "Intervenant avec enfant" image */}
            <div className="absolute inset-0 bg-gray-200" />
          </div>

          {/* Text Content */}
          <div className="px-6 py-16 lg:px-20 xl:px-24 flex flex-col justify-center order-1 lg:order-2">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Nos valeurs humaines</p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6 leading-tight">
              Ce que nous attendons <br className="hidden md:block"/>
              <span className="text-teal-400 italic">de vous</span>
            </h2>
            
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              Pas besoin d&apos;être parfait. Vous avez besoin d&apos;être <strong className="text-navy-800 font-bold">fiable, bienveillant(e) et sincèrement engagé(e)</strong> auprès des enfants.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
              Le reste — les techniques, les protocoles, les spécificités de chaque situation — nous vous l&apos;enseignons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded bg-teal-400"></div>
                <span className="text-sm font-semibold text-navy-800">Bienveillance naturelle</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded bg-teal-400"></div>
                <span className="text-sm font-semibold text-navy-800">Ponctualité & fiabilité</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded bg-teal-400"></div>
                <span className="text-sm font-semibold text-navy-800">Patience & écoute</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded bg-teal-400"></div>
                <span className="text-sm font-semibold text-navy-800">Discrétion absolue</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded bg-teal-400"></div>
                <span className="text-sm font-semibold text-navy-800">Adaptabilité</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded bg-teal-400"></div>
                <span className="text-sm font-semibold text-navy-800">Esprit d&apos;équipe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORMATION & ACCOMPAGNEMENT */}
      <section className="w-full py-24 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Formation & accompagnement</p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              Vous êtes <span className="text-teal-400">formés et encadrés</span> dès le premier jour
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chez PUR Alpha, aucun intervenant ne commence sans une formation spécialisée. Parce que les enfants méritent des professionnels préparés.
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Line connecting the dots (desktop only) */}
            <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-400 to-gold-500 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[32px] bg-white border-2 border-teal-400 shadow-[0_4px_8px_rgba(78,205,196,0.18)] flex items-center justify-center mb-4">
                  <span className="text-[22px] font-extrabold text-teal-400">70h</span>
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-2">Formation initiale</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  Handicap, bientraitance, sécurité, gestes du quotidien. Obligatoire avant toute première mission.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[32px] bg-white border-2 border-teal-400 shadow-[0_4px_8px_rgba(78,205,196,0.18)] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-2">Référent dédié</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  Un interlocuteur unique tout au long de votre mission. Points réguliers, écoute, réajustements.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[32px] bg-white border-2 border-teal-400 shadow-[0_4px_8px_rgba(78,205,196,0.18)] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-2">Supervision terrain</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  Suivi régulier sur le terrain, accompagnement qualité permanent. Vous n&apos;êtes jamais seul(e).
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[32px] bg-white border-2 border-teal-400 shadow-[0_4px_8px_rgba(78,205,196,0.18)] flex items-center justify-center mb-4">
                  <span className="text-[26px] font-black text-teal-400">∞</span>
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-2">Formation continue</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  Actualisation régulière des compétences. PUR Alpha investit dans votre montée en compétences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TÉMOIGNAGE */}
      <section className="relative w-full py-32 overflow-hidden bg-navy-900">
        <div className="absolute inset-0 bg-gray-300">
           {/* Placeholder for the background image */}
           {/* <img src="/placeholder.jpg" className="w-full h-full object-cover mix-blend-overlay opacity-30" alt="Témoignage" /> */}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10 flex flex-col items-center text-center">
          <div className="text-teal-400 opacity-50 text-6xl font-serif mb-6">&quot;</div>
          <p className="text-2xl md:text-[28px] text-white/90 font-medium italic leading-relaxed mb-8">
            Ce qui m&apos;a décidée à rejoindre PUR Alpha, c&apos;est que pour la première fois, je me suis sentie accompagnée. Pas lâchée dans le grand bain.
          </p>
          <p className="text-teal-400 text-sm font-bold tracking-[2px] uppercase">
            Intervenant(e) PUR Alpha — Val-d&apos;Oise
          </p>
        </div>
      </section>

      {/* 6. PROCESS DE RECRUTEMENT */}
      <section className="w-full py-24 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Process de recrutement</p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              Simple, <span className="text-teal-400 italic">transparent</span>, humain
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[60px] h-[60px] rounded-[30px] border border-teal-400 flex items-center justify-center mb-4">
                <span className="text-[22px] font-extrabold text-teal-400">1</span>
              </div>
              <h3 className="text-sm font-bold text-navy-800 mb-2">Candidature</h3>
              <p className="text-[13px] text-gray-600">
                Via le formulaire ci-dessous ou par email à contact@puralpha.fr
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[60px] h-[60px] rounded-[30px] bg-white border-2 border-teal-400 flex items-center justify-center mb-4 shadow-sm">
                <span className="text-[22px] font-extrabold text-teal-400">2</span>
              </div>
              <h3 className="text-sm font-bold text-navy-800 mb-2">Entretien individuel</h3>
              <p className="text-[13px] text-gray-600">
                Échange humain pour nous découvrir mutuellement. Vérification des références et du casier judiciaire.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[60px] h-[60px] rounded-[30px] bg-white border-2 border-teal-400 flex items-center justify-center mb-4 shadow-sm">
                <span className="text-[22px] font-extrabold text-teal-400">3</span>
              </div>
              <h3 className="text-sm font-bold text-navy-800 mb-2">Formation 70h</h3>
              <p className="text-[13px] text-gray-600">
                Formation obligatoire avant toute mission. Handicap, bientraitance, sécurité, gestes du quotidien.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[60px] h-[60px] rounded-[30px] border border-teal-400 flex items-center justify-center mb-4">
                <span className="text-[24px]">🚀</span>
              </div>
              <h3 className="text-sm font-bold text-navy-800 mb-2">Première mission</h3>
              <p className="text-[13px] text-gray-600">
                Matching soigné avec la famille. Passation accompagnée. Votre référent est là dès le départ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ INTERVENANTS */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
              Vos questions, <span className="text-teal-400">nos réponses</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* 8. FORMULAIRE CANDIDATURE */}
      <section className="w-full py-24 bg-gradient-to-br from-[#1c3553] to-[#2faaa1]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-white/55 font-bold text-xs tracking-[3px] uppercase mb-4">Formulaire de candidature</p>
            <h2 className="text-3xl md:text-[44px] font-extrabold text-white mb-6 leading-tight">
              Prêt(e) à rejoindre <br />l&apos;équipe PUR Alpha ?
            </h2>
            <p className="text-white/65 text-lg">
              Envoyez-nous votre CV et une courte présentation. Nous vous répondons sous 48h.
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
                Envoyer ma candidature
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Ou envoyez directement votre CV à <a href="mailto:contact@puralpha.fr" className="font-bold text-navy-800">contact@puralpha.fr</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
