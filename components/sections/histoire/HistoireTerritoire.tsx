interface Impact {
  chiffre: number;
  titre: string;
  description: string;
  statut: string;
}

interface HistoireTerritoireProps {
  tag: string;
  titre1: string;
  titleHighlight: string;
  description: string;
  impacts: readonly Impact[];
  backgroundImageUrl?: string;
  mapImageUrl?: string;
}

export function HistoireTerritoire({
  tag,
  titre1,
  titleHighlight,
  description,
  impacts,
  backgroundImageUrl,
  mapImageUrl,
}: HistoireTerritoireProps) {
  return (
    <section className="py-8 lg:py-24 relative bg-navy-800 text-white overflow-hidden">
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800/90 via-navy-800/80 to-navy-900/90 z-[1]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
          {/* Colonne gauche : texte + cartes */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-6">
              <span className="typo-tag text-teal-400/80">{tag}</span>
              <h2 className="typo-h2">
                {titre1} <span className="text-gold-500">{titleHighlight}</span>
              </h2>
              <p className="typo-body text-white/70">{description}</p>
            </div>

            {/* Cartes dynamiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {impacts.map((impact, i) => {
                const isActive = impact.statut.toLowerCase() === "actif";
                return (
                  <div
                    key={i}
                    className={`p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center text-center gap-2 relative ${
                      isActive
                        ? "bg-gradient-to-br from-navy-800 to-[#1a4a6e] border border-teal-400/25 shadow-lg"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <span className={`typo-h1 mb-2 ${isActive ? "text-gold-500" : "text-white/10"}`}>
                      {impact.chiffre}
                    </span>
                    <h3 className={`typo-h3 ${isActive ? "text-white" : "text-white/30"}`}>
                      {impact.titre}
                    </h3>
                    <p className={`typo-small mt-1 whitespace-pre-line ${isActive ? "text-white/50" : "text-white/20"}`}>
                      {impact.description}
                    </p>
                    <div className={`mt-4 px-4 py-2 rounded-full flex items-center gap-2 ${
                      isActive
                        ? "bg-teal-400/15 border border-teal-400/30"
                        : "bg-white/5 border border-white/10"
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-teal-400" : "bg-white/30"}`} />
                      <span className={`font-bold text-xs ${isActive ? "text-teal-400" : "text-white/20"}`}>
                        {impact.statut}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colonne droite : carte */}
          {mapImageUrl && (
            <div className="flex-1 flex items-center justify-center">
              <img src={mapImageUrl} alt="Carte Île-de-France" className="w-full max-w-md object-contain" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
