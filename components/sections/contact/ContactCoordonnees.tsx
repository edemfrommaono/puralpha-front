interface CoordItem {
  label: string;
  value: string;
  imageUrl: string;
  fallback_icon?: string;
}

interface ContactCoordonneesProps {
  title: string;
  items: CoordItem[];
}

export function ContactCoordonnees({ title, items }: ContactCoordonneesProps) {
  return (
    <section className="bg-[#ecf4f6] py-8 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center max-w-5xl mx-auto">
          {/* Infos Coordinates */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">{title}</h2>
            <div className="flex flex-col gap-4 lg:gap-6">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-400/20 transition-colors">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    ) : (
                      <span className="text-lg md:text-xl">{item.fallback_icon || "📌"}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    {item.label?.toLowerCase().includes('adresse') || item.label?.toLowerCase().includes('siège') || item.label?.toLowerCase().includes('local') || item.value?.includes('95360') ? (
                      <a 
                        href="https://maps.app.goo.gl/HSnq6Ni2935JW3B67" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-navy-900 text-sm md:text-base hover:text-teal-500 transition-colors underline decoration-teal-500/30 underline-offset-4"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy-900 text-sm md:text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-video md:aspect-[4/3] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=48.9574738,2.3324525&hl=fr&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PUR Alpha — 14K - 26 Rue des Sablons, 95360 Montmagny"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
