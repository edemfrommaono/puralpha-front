import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-teal-50 via-[#f7f5f0] to-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-6 max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-black text-navy-800 leading-tight">
                Garde et accompagnement à domicile d’enfants en <span className="text-teal-500">situation de handicap</span>
              </h1>
              <p className="text-lg lg:text-xl font-semibold text-gray-700">
                Leur bien-être à domicile, votre sérénité au quotidien
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                PUR Alpha propose une solution de services à la personne exclusivement dédiée aux enfants et jeunes en situation de handicap, de 0 à 25 ans, dans le Val-d’Oise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button variant="navy" className="w-full sm:w-auto" href="/contact">
                  Demander un premier échange
                </Button>
                <Button variant="outline-navy" className="w-full sm:w-auto">
                  <span className="mr-2">▶</span> Découvrir PUR Alpha en vidéo
                </Button>
              </div>
            </div>

            {/* Images Collage */}
            <div className="relative h-[400px] lg:h-[600px] w-full flex gap-4 lg:gap-6 justify-end items-end">
              {/* Left Image Placeholder */}
              <div className="relative w-[45%] h-full bg-teal-400 rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-teal-400 opacity-20 mix-blend-multiply" />
                {/* Image would go here */}
              </div>
              
              {/* Right Image Placeholder + Overlay Box */}
              <div className="relative w-[45%] h-[80%] flex flex-col gap-4">
                <div className="w-full flex-grow bg-gray-200 rounded-3xl overflow-hidden shadow-lg relative">
                   {/* Image would go here */}
                </div>
                <div className="bg-navy-700 text-white p-6 rounded-3xl shadow-lg shrink-0">
                  <p className="font-bold text-sm leading-relaxed">
                    Des interventions personnalisées, assurées par des professionnels formés aux spécificités du handicap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Bar */}
      <section className="bg-navy-700 text-white py-8 w-full overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 lg:gap-4 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xl">🤝</span>
              <span className="font-semibold tracking-wide">Bientraitance</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xl">🛡️</span>
              <span className="font-semibold tracking-wide">Sécurité</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xl">🔄</span>
              <span className="font-semibold tracking-wide">Continuité</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xl">✅</span>
              <span className="font-semibold tracking-wide">Simplicité</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xl">👁️</span>
              <span className="font-semibold tracking-wide">Transparence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section: Notre accompagnement */}
      <section className="py-20 lg:py-32 w-full bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image */}
            <div className="relative h-[500px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-100">
               {/* Founder Image Placeholder */}
            </div>

            {/* Right Text */}
            <div className="flex flex-col gap-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-3 bg-teal-400 rounded-sm" />
                  <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">Notre accompagnement</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-navy-800 leading-tight">
                  Un service à domicile,<br/>pensé pour <span className="text-teal-400">votre enfant.</span>
                </h2>
              </div>

              {/* Services List */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start pb-6 border-b border-navy-800/10">
                  <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center shrink-0 mt-1 text-teal-400">❖</div>
                  <div>
                    <h3 className="text-gray-800 font-bold text-base mb-1">Garde à domicile</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Une présence rassurante au domicile, respectueuse du rythme et des repères de votre enfant</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start pb-6 border-b border-navy-800/10">
                  <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center shrink-0 mt-1 text-teal-400">❖</div>
                  <div>
                    <h3 className="text-gray-800 font-bold text-base mb-1">Assistance au quotidien</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Un soutien humain et sécurisé dans les gestes essentiels</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start pb-6 border-b border-navy-800/10">
                  <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center shrink-0 mt-1 text-teal-400">❖</div>
                  <div>
                    <h3 className="text-gray-800 font-bold text-base mb-1">Accompagnement de proximité</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Des déplacements à pied vers les lieux du quotidien</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center shrink-0 mt-1 text-teal-400">❖</div>
                  <div>
                    <h3 className="text-gray-800 font-bold text-base mb-1">Activités sociales et éducatives</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Des temps d’éveil, de lien et de socialisation</p>
                  </div>
                </div>
              </div>

              {/* Info Boxes */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="bg-gray-50 border border-navy-800/10 p-5 rounded-xl">
                  <h4 className="text-navy-800 font-black text-sm mb-2">Nos intervenants</h4>
                  <p className="text-gray-500 text-sm">Des intervenants sélectionnés, formés spécifiquement au handicap et encadrés par PUR Alpha.</p>
                </div>
                <div className="bg-gray-50 border border-navy-800/10 p-5 rounded-xl">
                  <h4 className="text-navy-800 font-black text-sm mb-2">Notre fonctionnement</h4>
                  <p className="text-gray-500 text-sm">Vous définissez les missions. Nous assurons la gestion et le suivi.</p>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="teal" href="/pour-les-familles">
                  Découvrir notre offre en détail
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-32 w-full bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-4">Comment ça marche ?</h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-16">
            De la première prise de contact à la mise en place de l’intervention, PUR Alpha vous accompagne à chaque étape.
          </p>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-[27px] left-[15%] right-[15%] h-px bg-teal-400/40" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 text-white rounded-full flex items-center justify-center text-xs font-black">1</div>
                  <span className="text-teal-400">📋</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Premier contact</h3>
                  <p className="text-gray-500 text-sm">Écoute de votre situation et de vos besoins.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 text-white rounded-full flex items-center justify-center text-xs font-black">2</div>
                  <span className="text-teal-400">🏠</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Évaluation à domicile</h3>
                  <p className="text-gray-500 text-sm">Observation du cadre de vie et des habitudes du quotidien.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 text-white rounded-full flex items-center justify-center text-xs font-black">3</div>
                  <span className="text-teal-400">✍️</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Fiche mission</h3>
                  <p className="text-gray-500 text-sm">Formalisation des missions, horaires et consignes.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 text-white rounded-full flex items-center justify-center text-xs font-black">4</div>
                  <span className="text-teal-400">🤝</span>
                </div>
                <div>
                  <h3 className="text-navy-800 font-black text-base mb-2">Mise en place</h3>
                  <p className="text-gray-500 text-sm">Présentation de l’intervenant et suivi par PUR Alpha.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Button variant="navy" href="/contact">
              Demander un premier échange
            </Button>
          </div>
        </div>
      </section>

      {/* Pathways / Parcours */}
      <section className="py-20 lg:py-32 w-full bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-3 bg-teal-400 rounded-sm" />
              <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">Vous êtes concerné ?</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-navy-700">Choisissez votre parcours</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Familles */}
            <div className="bg-teal-50/50 rounded-3xl p-8 lg:p-12 border border-teal-100 flex flex-col justify-between h-full min-h-[400px] relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 bg-teal-400/10 text-teal-500 font-bold text-xs tracking-wider uppercase rounded-full mb-6">
                  Familles
                </span>
                <h3 className="text-2xl font-bold text-navy-700 mb-4 max-w-sm">
                  Je cherche un accompagnement fiable pour mon enfant
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                  Trouver la bonne personne pour son enfant prend du temps. Lui faire confiance en demande tout autant. PUR Alpha vous apporte du répit et un soutien au quotidien.
                </p>
                <Button variant="teal" href="/pour-les-familles">
                  Voir comment nous pouvons vous aider
                </Button>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 bg-teal-400/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-all" />
            </div>

            {/* Card Intervenants */}
            <div className="bg-gold-500/10 rounded-3xl p-8 lg:p-12 border border-gold-500/20 flex flex-col justify-between h-full min-h-[400px] relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-600 font-bold text-xs tracking-wider uppercase rounded-full mb-6">
                  Intervenants
                </span>
                <h3 className="text-2xl font-bold text-navy-700 mb-4 max-w-sm">
                  Je souhaite rejoindre une équipe qui a du sens
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                  Chez PUR Alpha, votre métier est reconnu et valorisé. Vous bénéficiez d’un cadre et d’un suivi dans vos missions auprès des enfants.
                </p>
                <Button variant="gold" className="rounded-lg shadow-none font-bold text-navy-800" href="/contact">
                  Découvrir les avantages
                </Button>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 bg-gold-500/20 rounded-full blur-3xl group-hover:bg-gold-500/30 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-navy-800 py-24 relative overflow-hidden">
        {/* Abstract background gradient elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Parce que votre enfant mérite un accompagnement <span className="text-gold-500">à la hauteur de ses besoins.</span>
            </h2>
            <p className="text-xl text-white/80">
              Prendre soin de son enfant, c’est aussi préserver l’équilibre de toute la famille
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80 my-4">
              <span className="flex items-center gap-2"><span>✦</span> Premier échange gratuit</span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="flex items-center gap-2"><span>✦</span> Sans engagement</span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="flex items-center gap-2"><span>✦</span> Retour rapide</span>
            </div>

            <Button variant="gold" className="px-10 py-4 text-lg mt-4" href="/contact">
              Demander un premier échange
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
