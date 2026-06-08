"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
  const items: ResolvedValue[] = resolvedValuesBar
    ?? fallbackValues.map((v) => ({ label: v.label, imageUrl: "" }));

  // Fenêtre glissante : (0,1), (1,2), (2,3)...
  const realSlides: ResolvedValue[][] =
    items.length <= 1
      ? [items]
      : items.slice(0, -1).map((_, i) => [items[i], items[i + 1]]);

  // Boucle infinie : on ajoute une copie du premier slide à la fin
  // Quand on atteint ce clone, on saute instantanément au début
  const loopedSlides = [...realSlides, realSlides[0]];

  const scrollRef = useRef<HTMLDivElement>(null);
  const currentSlide = useRef(0);
  const isJumping = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || realSlides.length <= 1) return;

    const interval = setInterval(() => {
      if (isJumping.current) return;

      currentSlide.current += 1;
      const slideWidth = container.offsetWidth;

      container.scrollTo({
        left: currentSlide.current * slideWidth,
        behavior: "smooth",
      });

      // Si on vient d'afficher le clone du premier slide (dernier élément),
      // on attend la fin de l'animation puis on saute sans animation au vrai début
      if (currentSlide.current === loopedSlides.length - 1) {
        isJumping.current = true;
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "instant" });
          currentSlide.current = 0;
          isJumping.current = false;
        }, 500); // durée proche de l'animation smooth
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [realSlides.length, loopedSlides.length]);

  return (
    <section className="bg-navy-700 text-white py-6 lg:py-8 w-full">

      {/* Mobile : auto-scroll infini, 2 items par slide */}
      <div
        ref={scrollRef}
        className="lg:hidden overflow-x-auto hide-scrollbar snap-x snap-mandatory"
      >
        <div className="flex">
          {loopedSlides.map((pair, gi) => (
            <div
              key={gi}
              className="snap-start shrink-0 flex gap-4 px-6 py-1"
              style={{ width: "100vw" }}
            >
              {pair.map((v, i) => (
                <div key={i} className="flex items-center justify-center gap-2 w-1/2">
                  {v.imageUrl ? (
                    <Image
                      src={v.imageUrl}
                      alt={v.label}
                      width={24}
                      height={24}
                      className="object-contain shrink-0"
                    />
                  ) : (
                    <span className="text-base shrink-0">✦</span>
                  )}
                  <span className="font-semibold tracking-wide text-sm">{v.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop : flex row */}
      <FadeInView direction="none" className="hidden lg:block container mx-auto px-4 lg:px-8">
        <div className="flex flex-nowrap justify-between items-center gap-4">
          {resolvedValuesBar
            ? resolvedValuesBar.map((v, i) => (
              <div key={i} className="flex items-center justify-start gap-3 shrink-0">
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
                <span className="font-semibold tracking-wide text-base">{v.label}</span>
              </div>
            ))
            : fallbackValues.map((v, i) => (
              <div key={i} className="flex items-center justify-start gap-3 shrink-0">
                <span className="text-xl">✦</span>
                <span className="font-semibold tracking-wide text-base">{v.label}</span>
              </div>
            ))}
        </div>
      </FadeInView>
    </section>
  );
}
