import { Button } from "@/components/ui/Button";

interface FamillesHeroProps {
  title: string;
  titleHighlight: string;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  stats: readonly { value: string; label: string }[];
}

export function FamillesHero({
  title,
  titleHighlight,
  description,
  ctaPrimaryText,
  ctaSecondaryText,
  stats,
}: FamillesHeroProps) {
  return (
    <section className="bg-[#ecf4f6] relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl lg:text-5xl lg:text-6xl font-black text-navy-800 leading-tight mb-6 max-w-4xl">
          {title} <span className="text-teal-400">{titleHighlight}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button variant="navy" href="/contact">
            {ctaPrimaryText}
          </Button>
          <Button variant="outline-navy" href="/aides-financieres">
            {ctaSecondaryText}
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl font-black text-teal-400 mb-1">{stat.value}</span>
              <span className="text-xs text-navy-800 font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
