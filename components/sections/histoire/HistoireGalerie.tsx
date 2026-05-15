interface GalerieImage {
  imageUrl?: string;
  libelle: string;
}

interface HistoireGalerieProps {
  images: GalerieImage[];
}

const SPANS = [
  "col-span-1 lg:col-span-2 row-span-2 min-h-[300px] lg:min-h-0",
  "col-span-1 min-h-[200px] lg:min-h-0",
  "col-span-1 min-h-[200px] lg:min-h-0",
  "col-span-1 min-h-[200px] lg:min-h-0",
  "col-span-1 min-h-[200px] lg:min-h-0",
];

export function HistoireGalerie({ images }: HistoireGalerieProps) {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-10 lg:py-20 h-auto lg:h-[700px] max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-2 h-full">
        {images.map((img, i) => (
          <div key={i} className={`relative rounded-xl overflow-hidden ${SPANS[i % SPANS.length]}`}>
            {img.imageUrl ? (
              <img src={img.imageUrl} alt={img.libelle} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className={`absolute inset-0 ${i % 2 === 0 ? "bg-gray-300" : "bg-gray-200"}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/20 to-transparent" />
            <div className="absolute bottom-6 w-full text-center">
              <span className="text-white/90 font-bold text-xs uppercase tracking-[1px]">{img.libelle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
