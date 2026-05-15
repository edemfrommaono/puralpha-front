export function HistoireGalerie() {
  const images = [
    { caption: "Présence & stimulation", span: "col-span-1 lg:col-span-2 row-span-2 min-h-[300px] lg:min-h-0", bg: "bg-gray-300" },
    { caption: "Épanouissement", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-200" },
    { caption: "Douceur & confiance", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-300" },
    { caption: "Aide au quotidien", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-200" },
    { caption: "Sérénité retrouvée", span: "col-span-1 min-h-[200px] lg:min-h-0", bg: "bg-gray-300" },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-10 lg:py-20 h-auto lg:h-[700px] max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-2 h-full">
        {images.map((img, i) => (
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
  );
}
