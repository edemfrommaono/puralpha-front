interface RejoindreTemoignageProps {
  quote: string;
  author: string;
  backgroundImageUrl?: string;
}

export function RejoindreTemoignage({ quote, author, backgroundImageUrl }: RejoindreTemoignageProps) {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-navy-900">
      {backgroundImageUrl ? (
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${backgroundImageUrl})` }} />
      ) : (
        <div className="absolute inset-0 bg-gray-300" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10 flex flex-col items-center text-center">
        <div className="text-teal-400 opacity-50 text-6xl font-serif mb-6">&quot;</div>
        <p className="text-2xl md:text-[28px] text-white/90 font-medium italic leading-relaxed mb-8">{quote}</p>
        <p className="text-teal-400 text-sm font-bold tracking-[2px] uppercase">{author}</p>
      </div>
    </section>
  );
}
