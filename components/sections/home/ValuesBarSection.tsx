"use client";

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
  const items: ResolvedValue[] = resolvedValuesBar
    ?? fallbackValues.map((v) => ({ label: v.label, imageUrl: "" }));

  // Double les items : à -50% de (items×2) on retombe exactement au début
  const looped = [...items, ...items];

  return (
    <section className="bg-navy-700 text-white py-6 lg:py-8 w-full overflow-hidden">
      {/* Piste unique — items × 2, translate -50% = boucle parfaite */}
      <div className="marquee-track flex w-max">
        {looped.map((v, i) => (
          <div
            key={i}
            className="flex items-center gap-2 shrink-0 px-14 lg:px-24"
          >
            {v.imageUrl ? (
              <Image
                src={v.imageUrl} 
                alt={v.label}
                width={24}
                height={24}
                className="object-contain shrink-0"
              />
            ) : (
              <span className="text-base shrink-0 text-gold-400">✦</span>
            )}
            <span className="font-semibold tracking-wide text-sm lg:text-base">
              {v.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
