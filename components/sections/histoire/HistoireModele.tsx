export function HistoireModele() {
  return (
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
  );
}
