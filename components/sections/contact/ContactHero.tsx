interface ContactHeroProps {
  title: string;
  titleHighlight: string;
  description: string;
}

export function ContactHero({ title, titleHighlight, description }: ContactHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#e8f4f8] to-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl lg:text-5xl font-black text-navy-900 mb-6">
          {title} <span className="text-teal-400">{titleHighlight}</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
  );
}
