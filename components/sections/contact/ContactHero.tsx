import { FadeInView } from "@/components/ui/FadeInView";

interface ContactHeroProps {
  title: string;
  titleHighlight: string;
  description: string;
}

export function ContactHero({ title, titleHighlight, description }: ContactHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#e8f4f8] to-white pt-10 pb-8 lg:pt-32 lg:pb-24">
      <FadeInView className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy-900 mb-4 md:mb-6">
          {title} <span className="text-teal-400">{titleHighlight}</span>
        </h1>
        <p className="text-base text-center md:text-lg text-gray-500 max-w-2xl mx-auto">{description}</p>
      </FadeInView>
    </section>
  );
}
