interface CoordItem {
  label: string;
  value: string;
  imageUrl: string;
  fallback_icon: string;
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
                    <p className="font-semibold text-navy-900 text-base">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d2.3447!3d48.9733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66b3e1f3c9a7d%3A0x0!2s26%20Rue%20des%20Sablons%2C%2095360%20Montmagny!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
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
