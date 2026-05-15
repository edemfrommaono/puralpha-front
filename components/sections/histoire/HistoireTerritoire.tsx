export function HistoireTerritoire() {
  return (
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
  );
}
