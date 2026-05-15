interface AvantageCard {
  title: string;
  description: string;
  imageUrl: string;
  fallback_icon: string;
}

interface RejoindreAvantagesProps {
  sectionTag: string;
  title: string;
  titleHighlight: string;
  description: string;
  cards: AvantageCard[];
}

const ICON_BGS = ["bg-teal-400/10", "bg-gold-500/10", "bg-navy-800/10", "bg-teal-400/10", "bg-gold-500/10", "bg-navy-800/10"];

export function RejoindreAvantages({
  sectionTag, title, titleHighlight, description, cards,
}: RejoindreAvantagesProps) {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">{sectionTag}</p>
          <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
            {title} <span className="text-teal-400 italic">{titleHighlight}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-[#ecf4f6] border border-gray-100 rounded-[20px] p-8 flex flex-col items-start">
              <div className={`w-12 h-12 rounded-xl ${ICON_BGS[i % ICON_BGS.length]} flex items-center justify-center text-2xl mb-6`}>
                {card.imageUrl ? (
                  <img src={card.imageUrl} alt="" className="w-7 h-7 object-contain" />
                ) : (
                  <span>{card.fallback_icon || "⭐"}</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
