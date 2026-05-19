import Image from "next/image";
import { FadeInView } from "@/components/ui/FadeInView";

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
    <section className="bg-navy-700 text-white py-6 lg:py-8 w-full overflow-hidden">
      <FadeInView direction="none" className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-y-6 gap-x-4 lg:gap-4 overflow-x-hidden pb-2 lg:pb-0 hide-scrollbar">
          {resolvedValuesBar
            ? resolvedValuesBar.map((v, i) => (
              <div key={i} className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 shrink-0 w-[calc(50%-8px)] md:w-[calc(33%-16px)] lg:w-auto">
                {v.imageUrl ? (
                  <Image
                    src={v.imageUrl}
                    alt={v.label}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-lg lg:text-xl">✦</span>
                )}
                <span className="font-semibold tracking-wide text-sm lg:text-base">{v.label}</span>
              </div>
            ))
            : fallbackValues.map((v, i) => (
              <div key={i} className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 shrink-0 w-[calc(50%-8px)] md:w-[calc(33%-16px)] lg:w-auto">
                <span className="text-lg lg:text-xl">✦</span>
                <span className="font-semibold tracking-wide text-sm lg:text-base">{v.label}</span>
              </div>
            ))}
        </div>
      </FadeInView>
    </section>
  );
}
