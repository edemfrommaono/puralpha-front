import { FadeInView } from "@/components/ui/FadeInView";

interface RejoindreTemoignageProps {
  quote: string;
  author: string;
  backgroundImageUrl?: string;
}

export function RejoindreTemoignage({ quote, author, backgroundImageUrl }: RejoindreTemoignageProps) {
  return (
    <section className="relative w-full min-h-[250px] md:min-h-[450px] py-12 lg:py-32 overflow-hidden bg-[#0A1428] flex items-center justify-center">
      {backgroundImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(493.45% 80.41% at 20% 50%, rgba(242, 201, 76, 0.12) 0%, rgba(242, 201, 76, 0.00) 50%), rgba(10, 20, 40, 0.82)",
        }}
      />
      <FadeInView className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10 flex flex-col items-center text-center">
        <div className="text-[#4ECDC4] opacity-50 text-6xl font-serif mb-6">&quot;</div>
        <p className="typo-h3 text-white/90 italic mb-6 lg:mb-8">{quote}</p>
        <p className="typo-tag text-[#4ECDC4]">{author}</p>
      </FadeInView>
    </section>
  );
}
