import Image from "next/image";

interface ResolvedValue {
  label: string;
  imageUrl: string;
}

interface FallbackValue {
  label: string;
}

interface ValuesBarSectionProps {
  resolvedValuesBar: ResolvedValue[] | null;
  fallbackValues: readonly FallbackValue[];
}

export function ValuesBarSection({ resolvedValuesBar, fallbackValues }: ValuesBarSectionProps) {
  return (
    <section className="bg-navy-700 text-white py-8 w-full overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 lg:gap-4 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          {resolvedValuesBar
            ? resolvedValuesBar.map((v, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                {v.imageUrl ? (
                  <Image
                    src={v.imageUrl}
                    alt={v.label}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-xl">✦</span>
                )}
                <span className="font-semibold tracking-wide">{v.label}</span>
              </div>
            ))
            : fallbackValues.map((v, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span className="text-xl">✦</span>
                <span className="font-semibold tracking-wide">{v.label}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
