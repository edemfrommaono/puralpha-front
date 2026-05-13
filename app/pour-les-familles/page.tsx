import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

export default function FamillesPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <section className="bg-[#ecf4f6] relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl lg:text-5xl lg:text-6xl font-black text-navy-800 leading-tight mb-6 max-w-4xl">
            Votre enfant mérite une <span className="text-teal-400">présence stable et bienveillante</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mb-10">
            PUR Alpha vous met à disposition des intervenants spécialisés, sélectionnés, formés et encadrés — pour que vous puissiez souffler, en toute confiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button variant="navy" href="/contact">
              Parlons de votre situation <span className="ml-2">→</span>
            </Button>
            <Button variant="outline-navy" href="/aides-financieres">
              Voir les aides financières
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-teal-400 mb-1">0–25</span>
              <span className="text-xs uppercase tracking-wide text-navy-800 font-semibold">ans accompagnés</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-teal-400 mb-1">70h</span>
              <span className="text-xs uppercase tracking-wide text-navy-800 font-semibold">formation minimale</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-teal-400 mb-1">38€</span>
              <span className="text-xs uppercase tracking-wide text-navy-800 font-semibold">tarif unique / heure</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-teal-400 mb-1">50%</span>
              <span className="text-xs uppercase tracking-wide text-navy-800 font-semibold">crédit d'impôt</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Toutes les situations de handicap */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
              Toutes les situations de <span className="text-teal-400">handicap</span> accompagnées
            </h2>
            <p className="text-gray-600 text-lg">
              Chaque demande est étudiée avec attention, dans un esprit d'ouverture et de dialogue. Chaque enfant bénéficie d'un projet individualisé — pas de solutions standardisées.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {[
              { icon: '🧠', text: 'TSA / Autisme' },
              { icon: '⚡', text: 'TDAH' },
              { icon: '♿', text: 'Handicap moteur' },
              { icon: '👁️', text: 'Handicap sensoriel' },
              { icon: '💡', text: 'Déficience intellectuelle' },
              { icon: '🔬', text: 'Maladies rares' },
              { icon: '📋', text: 'Autres situations' },
              { icon: '🧩', text: 'Polyhandicap' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#f0f4f8] border border-[#f3f4f6] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <span className="font-bold text-navy-800 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-teal-400/10 to-gold-500/10 border border-teal-400/20 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <p className="font-bold text-navy-800 text-lg leading-relaxed">
              <span className="text-teal-500">"Un enfant = un projet individualisé."</span><br />
              <span className="font-normal">Evaluation des besoins, des habitudes de vie, respect de la personnalité et du rythme de chaque enfant. Aucune solution standardisée.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Ce que nous faisons concrètement */}
      <section className="py-20 lg:py-32 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
              Ce que nous faisons <span className="text-teal-400">concrètement</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Vous composez librement votre accompagnement : horaires, fréquence, contenu des missions. Tout est ajustable au fil du temps selon vos besoins réels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-[#f3f4f6] rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="h-48 bg-teal-800/10 relative">
                 <div className="absolute top-4 left-4 bg-gold-500 rounded-full px-4 py-1">
                   <span className="text-navy-800 font-black text-xs tracking-wider uppercase">Éducatif</span>
                 </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-navy-800 mb-4">Présence éducative & Activités</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  Présence bienveillante et stimulante : jeux, lecture, activités sensorielles, sorties encadrées, aide aux devoirs. Pour favoriser l'épanouissement et l'autonomie.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Jeux adaptés</span>
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Aide aux devoirs</span>
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Sorties encadrées</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#f3f4f6] rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="h-48 bg-teal-800/10 relative">
                 <div className="absolute top-4 left-4 bg-gold-500 rounded-full px-4 py-1">
                   <span className="text-navy-800 font-black text-xs tracking-wider uppercase">Quotidien</span>
                 </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-navy-800 mb-4">Aide au quotidien</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  Accompagnement dans les gestes ordinaires : repas, habillage, hygiène, mobilité. Un soutien concret dans les moments à forte charge pour la famille.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Repas & habillage</span>
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Hygiène</span>
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Mobilité</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#f3f4f6] rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="h-48 bg-teal-800/10 relative">
                 <div className="absolute top-4 left-4 bg-gold-500 rounded-full px-4 py-1">
                   <span className="text-navy-800 font-black text-xs tracking-wider uppercase">Répit</span>
                 </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-navy-800 mb-4">Relais parental & Répit</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  Présence ponctuelle en soirées, week-ends ou vacances. Pour permettre aux parents de souffler — sans culpabilité, en toute sécurité.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Soirées</span>
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Week-ends</span>
                  <span className="bg-teal-400/10 text-teal-600 font-semibold text-xs px-3 py-1.5 rounded-full">Vacances</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comment ça marche */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-4">Comment ça marche ?</h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-16">
            De la première prise de contact à l'intervention, nous vous accompagnons à chaque étape.
          </p>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-[27px] left-[15%] right-[15%] h-px bg-teal-400/40" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <span className="text-teal-400 font-black text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Premier contact</h3>
                  <p className="text-gray-500 text-sm">Écoute de votre situation et de vos besoins.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <span className="text-teal-400 font-black text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Évaluation à domicile</h3>
                  <p className="text-gray-500 text-sm">Visite pour comprendre les besoins de votre enfant.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <span className="text-teal-400 font-black text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Plan personnalisé</h3>
                  <p className="text-gray-500 text-sm">Fiche mission sur-mesure avec vos consignes.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <span className="text-teal-400 font-black text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Mise en place</h3>
                  <p className="text-gray-500 text-sm">Intervenant formé et suivi par votre référent.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Button variant="navy" href="/contact">
              Prendre contact
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Nos limites d'intervention */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-6">
              Nos limites d'intervention <br className="hidden lg:block"/><span className="text-teal-400">en toute transparence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
            {/* OUI */}
            <div className="bg-teal-50/40 border border-navy-800/5 rounded-[18px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-teal-500 font-bold text-lg tracking-widest uppercase">Ce que nous faisons</h3>
              </div>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-teal-400/20 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-800">Garde à domicile et présence active auprès de l'enfant</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-teal-400/20 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-800">Accompagnement à pied (école, activités, sorties proches)</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-teal-400/20 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-800">Aide aux gestes du quotidien (repas, hygiène, change)</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-teal-400/20 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-800">Présence bienveillante et stimulation adaptée</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-teal-400/20 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-800">Coordination avec les parents et l'entourage éducatif</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-teal-400/20 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-800">Relais lors des temps périscolaires, week-ends, vacances</span>
                </li>
              </ul>
            </div>

            {/* NON */}
            <div className="bg-red-50/30 border border-navy-800/5 rounded-[18px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-red-600 font-bold text-lg tracking-widest uppercase">Ce que nous ne faisons pas</h3>
              </div>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="text-gray-800">Actes médicaux ou paramédicaux spécialisés</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="text-gray-800">Transport en véhicule</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="text-gray-800">Remplacement d'un éducateur spécialisé ou orthophoniste</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="text-gray-800">Prise en charge médicale ou thérapeutique</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="text-gray-800">Communication d'informations sans accord des parents</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-navy-800/5 last:border-0">
                  <span className="bg-red-600/10 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="text-gray-800">Tout cadre rigide ou contraire à la bientraitance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['Agrément qualité SAP', "DDETS Val-d'Oise", 'SIRET 989 156 989 00018', 'Assurance RC Pro Hiscox', 'Médiateur CMCO agréé'].map((badge, idx) => (
              <span key={idx} className="bg-navy-800/5 border border-navy-800/10 px-4 py-2 rounded-full text-sm font-bold text-navy-800 flex items-center gap-2">
                <span className="text-teal-500">❖</span> {badge}
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
              Ce qui protège <span className="text-gold-500">votre enfant</span>
            </h2>
            <p className="text-lg text-white/70">
              La sécurité et la bientraitance sont les fondements de chaque intervention. Voici nos engagements concrets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center text-2xl mb-6">
                🕵️‍♀️
              </div>
              <h3 className="font-bold text-lg mb-3">Sélection rigoureuse</h3>
              <p className="text-sm text-white/60 leading-relaxed">Entretien individuel approfondi, vérification du casier judiciaire (B3), contrôle des références professionnelles.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center text-2xl mb-6">
                📚
              </div>
              <h3 className="font-bold text-lg mb-3">Formation 70h minimum</h3>
              <p className="text-sm text-white/60 leading-relaxed">Formation initiale spécialisée handicap, bientraitance, sécurité et gestes du quotidien. Formation continue tout au long de la mission.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center text-2xl mb-6">
                📞
              </div>
              <h3 className="font-bold text-lg mb-3">Référent famille dédié</h3>
              <p className="text-sm text-white/60 leading-relaxed">Un interlocuteur unique pour toute question, ajustement ou alerte. Points réguliers par téléphone, visio ou à domicile.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center text-2xl mb-6">
                📓
              </div>
              <h3 className="font-bold text-lg mb-3">Cahier de liaison</h3>
              <p className="text-sm text-white/60 leading-relaxed">Suivi quotidien des interventions — papier ou numérique. Traçabilité complète, confidentiel, consulté régulièrement par le référent.</p>
            </div>
            {/* Card 5 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center text-2xl mb-6">
                🛡️
              </div>
              <h3 className="font-bold text-lg mb-3">Assurance RC Pro</h3>
              <p className="text-sm text-white/60 leading-relaxed">Couverture Hiscox N° HA RCP0593442 pour toutes les interventions réalisées à domicile. Vous n'êtes jamais exposés.</p>
            </div>
            {/* Card 6 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center text-2xl mb-6">
                🔄
              </div>
              <h3 className="font-bold text-lg mb-3">Continuité garantie</h3>
              <p className="text-sm text-white/60 leading-relaxed">Remplacement organisé sous 48h en cas d'absence imprévue. Numéro d'astreinte disponible : 06 14 79 60 47.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Questions fréquentes</span>
            <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mt-4">
              Vos questions, <span className="text-teal-400">nos réponses</span>
            </h2>
          </div>

          <Accordion 
            items={[
              { 
                question: "PUR Alpha est-il agréé ? Est-ce un service reconnu officiellement ?", 
                answer: "Réponse détaillée en cours de rédaction. Notre équipe travaille pour vous fournir toutes les informations nécessaires sur notre statut d'agrément et notre reconnaissance officielle." 
              },
              { 
                question: "Combien coûte réellement le service après les aides ?", 
                answer: "Réponse détaillée en cours de rédaction. Vous bénéficiez d'une transparence totale sur nos tarifs, avec la prise en compte du crédit d'impôt de 50% et des aides de la MDPH." 
              },
              { 
                question: "Les familles sont-elles employeurs ? Y a-t-il des démarches administratives ?", 
                answer: "Réponse détaillée en cours de rédaction. En mode prestataire, vous n'êtes pas l'employeur. Nous nous occupons de tout le recrutement et de la gestion administrative." 
              },
              { 
                question: "Que se passe-t-il si l'intervenant est absent ?", 
                answer: "Réponse détaillée en cours de rédaction. Nous garantissons la continuité du service en organisant un remplacement sous 48h en cas d'absence imprévue." 
              },
              { 
                question: "Peut-on modifier ou arrêter l'accompagnement facilement ?", 
                answer: "Réponse détaillée en cours de rédaction. Oui, notre approche est flexible et s'adapte à l'évolution de vos besoins familiaux, sans engagement lourd." 
              },
              { 
                question: "Mon enfant a une maladie rare — PUR Alpha peut-il l'accompagner ?", 
                answer: "Réponse détaillée en cours de rédaction. Nos intervenants sont rigoureusement formés (minimum 70h) et sensibilisés à une grande diversité de situations, y compris les maladies rares." 
              }
            ]} 
          />
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="py-20 lg:py-32 bg-navy-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Parce que votre enfant mérite un accompagnement <br className="hidden md:block"/><span className="text-gold-500">à la hauteur de ses besoins.</span>
            </h2>
            <p className="text-xl text-white/80">
              Et parce que prendre soin de son enfant, c'est aussi prendre soin de vous.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80 my-4">
              <span className="flex items-center gap-2"><span>✦</span> Devis gratuit</span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="flex items-center gap-2"><span>✦</span> Sans engagement</span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="flex items-center gap-2"><span>✦</span> Réponse sous 48h</span>
            </div>

            <Button variant="gold" className="px-10 py-4 text-lg mt-4 font-bold" href="/contact">
              Prendre contact
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
