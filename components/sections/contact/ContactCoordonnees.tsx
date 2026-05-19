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
    <section className="bg-[#ecf4f6] py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-5xl mx-auto">
          {/* Infos Coordinates */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">{title}</h2>
            <div className="flex flex-col gap-6">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-400/20 transition-colors">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-6 h-6 object-contain" />
                    ) : (
                      <span className="text-xl">{item.fallback_icon || "📌"}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    {item.label?.toLowerCase().includes('adresse') || item.label?.toLowerCase().includes('siège') || item.label?.toLowerCase().includes('local') || item.value?.includes('95360') ? (
                      <a 
                        href="https://maps.app.goo.gl/HSnq6Ni2935JW3B67" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-navy-900 text-base hover:text-teal-500 transition-colors underline decoration-teal-500/30 underline-offset-4"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy-900 text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-lg">
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
