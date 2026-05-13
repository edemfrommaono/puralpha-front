import { Button } from "@/components/ui/Button";

export default function NotreHistoirePage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <section className="bg-[#ecf4f6] pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
            <h1 className="text-5xl lg:text-7xl font-black text-navy-800 leading-tight">
              Née d'un vécu.<br />
              <span className="text-teal-400">Construite pour vous.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-navy-800 leading-relaxed max-w-2xl">
              PUR Alpha n'est pas né d'une étude de marché. C'est l'histoire d'une maman qui a cherché — et qui n'a pas trouvé ce dont son fils avait besoin.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-10 h-0.5 bg-teal-400" />
              <p className="text-navy-800 font-bold text-sm tracking-wide">
                Arame Bougha <span className="text-gray-500 font-semibold">— fondatrice, maman d'un enfant porteur du syndrome PURA</span>
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
            {/* Texte gauche */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">L'histoire de la fondatrice</span>
                <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
                  Pendant des années,<br />
                  <span className="text-teal-400">j'ai cherché.</span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Mon fils est porteur du syndrome PURA. Pendant des années, j'ai cherché des solutions d'accompagnement fiables, humaines et durables.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Entre la complexité administrative, le manque de stabilité des intervenants et l'absence de suivi réel, <span className="font-semibold text-navy-800">je n'ai jamais trouvé de réponse satisfaisante.</span>
              </p>
              
              <div className="mt-4 p-6 bg-gold-500/5 rounded-tr-xl rounded-br-xl border-l-4 border-gold-500">
                <p className="text-navy-800 italic text-lg leading-relaxed">
                  "De cette expérience est née une conviction simple : il fallait créer ce qui manquait."
                </p>
                <p className="text-teal-400 font-bold text-xs uppercase tracking-[2px] mt-4">— Arame Bougha</p>
              </div>
            </div>
            {/* Image droite */}
            <div className="relative h-[400px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gray-200" /> {/* Placeholder Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white/90 italic text-sm">
                Chaque famille porte une histoire unique
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
                  Ce que les familles<br />
                  <span className="text-teal-400">vivent vraiment</span>
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {/* Problème 1 */}
                <div className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 border-teal-400 relative">
                  <div className="text-2xl mt-1 shrink-0">🔄</div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-base mb-2">L'instabilité des intervenants</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Le turnover constant déstabilise l'enfant et épuise les parents. Les repères sont brisés encore et encore.
                    </p>
                  </div>
                </div>
                {/* Problème 2 */}
                <div className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 border-gold-500 relative">
                  <div className="text-2xl mt-1 shrink-0">📋</div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-base mb-2">La complexité administrative</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Contrats, paies, déclarations, remplacements — une charge qui s'ajoute à une vie déjà très chargée.
                    </p>
                  </div>
                </div>
                {/* Problème 3 */}
                <div className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 border-teal-400 relative">
                  <div className="text-2xl mt-1 shrink-0">🔍</div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-base mb-2">L'absence de suivi réel</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Des intervenants sans encadrement, sans formation spécifique, sans interlocuteur dédié. Personne ne pilote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Colonne droite : Carte PURA */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_4px_24px_rgba(30,58,95,0.06)] border border-navy-800/10 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/10 blur-2xl rounded-full" />
               <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px] mb-4">Le syndrome PURA</span>
               <h3 className="text-2xl lg:text-3xl font-extrabold text-navy-800 mb-6 leading-tight">
                 Une protéine déficiente.<br />
                 Un nom transformé en symbole.
               </h3>
               <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                 Le syndrome PURA est une maladie génétique rare causée par une mutation du gène PURA — protéine essentielle au développement du cerveau. Il entraîne des retards de développement, une hypotonie, des difficultés d'alimentation et des troubles neurologiques variés.
               </p>
               <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8">
                 C'est ce nom — celui de la protéine déficiente chez mon fils — qu'Arame a voulu transformer en symbole d'engagement : <strong className="text-navy-800 font-bold">soutenir les aidants, garantir le bien-être des enfants.</strong>
               </p>
               <div className="inline-flex items-center gap-3 bg-navy-800/5 px-6 py-3 rounded-full border border-navy-800/10 self-start">
                 <div className="w-4 h-4 bg-teal-400 rounded-full" />
                 <span className="font-bold text-navy-800 text-sm">PUR Alpha — comme la protéine PURA</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Grille d'images */}
      <section className="container mx-auto px-4 lg:px-8 py-10 lg:py-20 h-auto lg:h-[700px] max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-2 h-full">
          <div className="relative rounded-xl overflow-hidden col-span-1 lg:col-span-2 row-span-2 min-h-[300px] lg:min-h-0">
             <div className="absolute inset-0 bg-gray-300" />
             <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/20 to-transparent" />
             <div className="absolute bottom-6 w-full text-center">
               <span className="text-white/90 font-bold text-xs uppercase tracking-[1px]">Présence & stimulation</span>
             </div>
          </div>
          <div className="relative rounded-xl overflow-hidden col-span-1 min-h-[200px] lg:min-h-0">
             <div className="absolute inset-0 bg-gray-200" />
             <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/20 to-transparent" />
             <div className="absolute bottom-6 w-full text-center">
               <span className="text-white/90 font-bold text-xs uppercase tracking-[1px]">Épanouissement</span>
             </div>
          </div>
          <div className="relative rounded-xl overflow-hidden col-span-1 min-h-[200px] lg:min-h-0">
             <div className="absolute inset-0 bg-gray-300" />
             <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/20 to-transparent" />
             <div className="absolute bottom-6 w-full text-center">
               <span className="text-white/90 font-bold text-xs uppercase tracking-[1px]">Douceur & confiance</span>
             </div>
          </div>
          <div className="relative rounded-xl overflow-hidden col-span-1 min-h-[200px] lg:min-h-0">
             <div className="absolute inset-0 bg-gray-200" />
             <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/20 to-transparent" />
             <div className="absolute bottom-6 w-full text-center">
               <span className="text-white/90 font-bold text-xs uppercase tracking-[1px]">Aide au quotidien</span>
             </div>
          </div>
          <div className="relative rounded-xl overflow-hidden col-span-1 min-h-[200px] lg:min-h-0">
             <div className="absolute inset-0 bg-gray-300" />
             <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/20 to-transparent" />
             <div className="absolute bottom-6 w-full text-center">
               <span className="text-white/90 font-bold text-xs uppercase tracking-[1px]">Sérénité retrouvée</span>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Notre mission */}
      <section className="py-20 bg-navy-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-gold-500/10" />
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-white/50 font-bold text-xs uppercase tracking-[3px] mb-4 block">Notre mission</span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white/90 leading-tight max-w-4xl mx-auto">
            Offrir un accompagnement bienveillant, sécurisé et stable, dans le respect du rythme et de la dignité de chaque enfant.
          </h2>
        </div>
      </section>

      {/* 6. Nos valeurs */}
      <section className="py-20 lg:py-32 bg-[#ecf4f6]">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Nos valeurs</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              Ce qui guide <span className="text-teal-400">chaque intervention</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Valeur 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-teal-400/10 rounded-2xl flex items-center justify-center text-3xl mb-4">❤️</div>
              <h3 className="font-extrabold text-navy-800 text-sm uppercase tracking-wide mb-2">Bientraitance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Respect du rythme et de la dignité de chaque enfant, à chaque instant</p>
            </div>
            {/* Valeur 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-navy-800/5 rounded-2xl flex items-center justify-center text-3xl mb-4">🛡️</div>
              <h3 className="font-extrabold text-navy-800 text-sm uppercase tracking-wide mb-2">Sécurité</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Sélection rigoureuse, formation spécialisée, assurance RC Pro</p>
            </div>
            {/* Valeur 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center text-3xl mb-4">🔄</div>
              <h3 className="font-extrabold text-navy-800 text-sm uppercase tracking-wide mb-2">Continuité</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Intervenants stables, référent famille dédié, remplacement sous 48h</p>
            </div>
            {/* Valeur 4 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-teal-400/10 rounded-2xl flex items-center justify-center text-3xl mb-4">✨</div>
              <h3 className="font-extrabold text-navy-800 text-sm uppercase tracking-wide mb-2">Simplicité</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Zéro démarche administrative, un interlocuteur unique, tout compris</p>
            </div>
            {/* Valeur 5 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-navy-800/5 rounded-2xl flex items-center justify-center text-3xl mb-4">🔎</div>
              <h3 className="font-extrabold text-navy-800 text-sm uppercase tracking-wide mb-2">Transparence</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Un tarif unique, des documents remis avant signature, aucune surprise</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pourquoi PUR Alpha existe */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Texte gauche */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Pourquoi PUR Alpha existe</span>
                <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
                  Un modèle pensé<br />
                  <span className="text-teal-400">pour vous libérer</span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nous avons choisi le mode de la <strong className="font-semibold text-navy-800">mise à disposition</strong> : PUR Alpha emploie directement les intervenants. Vous n'avez aucune démarche administrative à gérer.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pas de contrat, pas de paie, pas de déclarations — tout en gardant la liberté d'organiser le quotidien selon vos besoins.
              </p>
              
              <div className="mt-4 p-6 bg-gold-500/5 rounded-tr-xl rounded-br-xl border-l-4 border-gold-500">
                <p className="text-navy-800 italic text-lg leading-relaxed">
                  "Vous organisez le quotidien de votre enfant selon vos besoins. PUR Alpha sécurise tout le reste."
                </p>
                <p className="text-teal-400 font-bold text-xs uppercase tracking-[2px] mt-4">Notre promesse</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 shrink-0">✓</span>
                  <span className="text-gray-600 text-sm">Zéro démarche admin</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 shrink-0">✓</span>
                  <span className="text-gray-600 text-sm">Référent famille dédié</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 shrink-0">✓</span>
                  <span className="text-gray-600 text-sm">Intervenants formés 70h</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 shrink-0">✓</span>
                  <span className="text-gray-600 text-sm">Continuité garantie</span>
                </div>
              </div>
            </div>
            
            {/* Image droite */}
            <div className="relative h-[400px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gray-200" /> {/* Placeholder Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white/90 italic text-sm">
                La sérénité retrouvée, au quotidien
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Section A : Territoire */}
      <section className="py-20 lg:py-32 relative bg-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-800 to-navy-900 z-0" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gray-200/10 blur-sm pointer-events-none z-0" /> {/* Placeholder Map/Image */}
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center max-w-6xl">
          <div className="flex-1 flex flex-col gap-6">
            <span className="text-teal-400/80 font-bold text-xs uppercase tracking-[3px]">Impact local · Val-d'Oise</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold leading-tight">
              Ancrés dans <span className="text-gold-500 font-black">notre territoire</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mt-4">
              PUR Alpha est implanté au cœur du Val-d'Oise — un département que nous connaissons bien, où nous vivons, et où nous avons tissé nos premiers liens avec les familles et les acteurs locaux. Notre objectif : un service de proximité, ancré localement et toujours à taille humaine.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* 95 Actif */}
            <div className="bg-gradient-to-br from-navy-800 to-[#1a4a6e] border border-teal-400/25 p-8 rounded-3xl flex flex-col items-center text-center gap-2 relative shadow-lg">
              <span className="text-6xl font-black text-gold-500 mb-2">95</span>
              <h3 className="text-xl font-extrabold text-white">Val-d'Oise</h3>
              <p className="text-white/50 text-sm leading-relaxed mt-1">
                Siège social à Piscop<br />
                Accueil familles à Montmagny
              </p>
              <div className="mt-4 px-4 py-2 bg-teal-400/15 border border-teal-400/30 rounded-full flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-teal-400 rounded-full" />
                <span className="text-teal-400 font-bold text-xs">Actif</span>
              </div>
            </div>
            {/* 93 A venir */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center gap-2 relative">
              <span className="text-6xl font-black text-white/10 mb-2">93</span>
              <h3 className="text-xl font-extrabold text-white/30">Seine-Saint-Denis</h3>
              <p className="text-white/20 text-sm leading-relaxed mt-1">
                Territoire à forts besoins<br />
                Extension à moyen terme
              </p>
              <div className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-white/30 rounded-full" />
                <span className="text-white/20 font-bold text-xs">À venir</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section B : Ambitions */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-teal-400" />
                <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Nos ambitions</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 leading-tight">
                Ce vers quoi<br />
                <span className="text-teal-400 italic">nous tendons</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mt-2">
                PUR Alpha grandit, mais jamais au détriment de ce qui nous définit : la proximité, l'humain, et la qualité de chaque accompagnement.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="bg-[#ecf4f6] border border-gray-100 rounded-2xl p-6 lg:p-8 flex gap-6 items-start">
                <span className="text-4xl font-black text-teal-400/25 leading-none">01</span>
                <div>
                  <h3 className="font-bold text-navy-800 text-lg mb-2">Un service à taille humaine</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Grandir sans perdre ce qui fait notre force : la proximité, l'écoute et le suivi personnalisé de chaque famille.
                  </p>
                </div>
              </div>
              <div className="bg-[#ecf4f6] border border-gray-100 rounded-2xl p-6 lg:p-8 flex gap-6 items-start">
                <span className="text-4xl font-black text-teal-400/25 leading-none">02</span>
                <div>
                  <h3 className="font-bold text-navy-800 text-lg mb-2">S'étendre vers le 93</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    La Seine-Saint-Denis concentre de forts besoins en accompagnement. C'est notre prochain territoire naturel.
                  </p>
                </div>
              </div>
              <div className="bg-[#ecf4f6] border border-gray-100 rounded-2xl p-6 lg:p-8 flex gap-6 items-start">
                <span className="text-4xl font-black text-teal-400/25 leading-none">03</span>
                <div>
                  <h3 className="font-bold text-navy-800 text-lg mb-2">Devenir une référence régionale</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Un modèle d'accompagnement reconnu par les familles, les partenaires et les institutions d'Île-de-France.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA Final */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-800 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800/90 to-navy-800/90 z-10" />
        <div className="absolute inset-0 bg-gray-200 z-0" /> {/* Placeholder Image */}
        
        <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
          <h2 className="text-3xl lg:text-[40px] font-black text-white mb-6 leading-tight max-w-3xl">
            Prêt à retrouver un <span className="text-teal-400">équilibre</span> ?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl leading-relaxed">
            Notre équipe est à votre écoute pour comprendre vos besoins et vous proposer un accompagnement sur-mesure pour votre enfant.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              Prendre contact
            </Button>
            <div className="flex items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-teal-400">✓</span> Devis gratuit
              </div>
              <div className="flex items-center gap-2">
                <span className="text-teal-400">✓</span> Sans engagement
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
