"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export interface QuotidienPhoto {
  imageUrl?: string;
  libelle: string;
  note?: string;
}

interface HistoireQuotidienProps {
  title: string;
  titleHighlight: string;
  photos: QuotidienPhoto[];
}

/**
 * Section « Matthew et moi, au quotidien » — carrousel horizontal de photos.
 * Tant qu'aucune photo n'est chargée dans WordPress, des emplacements
 * réservés (« Photo 1 », « Photo 2 »…) sont affichés.
 */
export function HistoireQuotidien({
  title,
  titleHighlight,
  photos,
}: HistoireQuotidienProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  if (!photos.length) return null;

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <FadeInView className="text-center mb-8 lg:mb-12">
          <h2 className="typo-h2 text-navy-800">
            {title}{" "}
            <span className="text-teal-400">{titleHighlight}</span>
          </h2>
        </FadeInView>

        {/* Carrousel */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 hide-scrollbar"
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              data-card
              className="snap-start shrink-0 w-[80%] sm:w-[45%] lg:w-[31%]"
            >
              {photo.imageUrl ? (
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img
                    src={photo.imageUrl}
                    alt={photo.libelle}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/10 to-transparent" />
                  <span className="absolute bottom-4 inset-x-0 text-center text-white font-bold text-xs uppercase tracking-[2px]">
                    {photo.libelle}
                  </span>
                </div>
              ) : (
                <PhotoPlaceholder
                  tag={`Photo ${i + 1}`}
                  label={photo.libelle}
                  note={photo.note}
                  icon="image"
                  className="aspect-[3/4] w-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        {photos.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              type="button"
              aria-label="Photos précédentes"
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-navy-800 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Photos suivantes"
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-navy-800 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
