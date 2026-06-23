"use client";

import {
  UserCheck, GraduationCap, Phone, BookOpen, ShieldCheck, RefreshCw,
  type LucideIcon,
  Check,
} from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";

import { toHtml } from "@/lib/wysiwyg";

/** Map des noms d'icônes Lucide → composants pour les garanties */
const ICON_MAP: Record<string, LucideIcon> = {
  UserCheck, GraduationCap, Phone, BookOpen, ShieldCheck, RefreshCw,
};

interface GarantieItem {
  title: string;
  description: string;
  imageUrl?: string;
  fallback_icon?: string;
}

interface SimpleItem {
  title: string;
  description: string;
  imageUrl?: string;
}

interface FamillesGarantiesProps {
  title: string;
  titleHighlight: string;
  description: string;
  items: GarantieItem[];
  ligne2?: SimpleItem[];
  ligne3?: SimpleItem[];
  ligne4?: string;
}

export function FamillesGaranties({
  title,
  titleHighlight,
  description,
  items,
  ligne2 = [],
  ligne3 = [],
  ligne4 = "",
}: FamillesGarantiesProps) {
  return (
    <section className="py-8 lg:py-24 bg-navy-800 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeInView className="text-center mb-8 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6">
            {title} <br className="hidden lg:block" /><span className="text-teal-400">{titleHighlight}</span>
          </h2>
          {description && (
            <div
              className="prose prose-invert max-w-3xl mx-auto text-center"
              dangerouslySetInnerHTML={{ __html: toHtml(description) }}
            />
          )}
        </FadeInView>

        {/* Ligne 1 — 3 colonnes avec flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const IconComp = item.fallback_icon ? ICON_MAP[item.fallback_icon] : null;
            return (
              <div key={i} style={{ perspective: "1000px" }} className="h-44 md:h-52">
                <div
                  className="relative w-full h-full transition-transform duration-700 cursor-default"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "rotateY(180deg)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "rotateY(0deg)")}
                >
                  {/* Recto — icône + titre */}
                  <div
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-center items-start"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center mb-5">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt="" className="w-7 h-7 object-contain" />
                      ) : IconComp ? (
                        <IconComp className="w-6 h-6 text-teal-400" strokeWidth={1.8} />
                      ) : (
                        <span className="text-teal-400 text-2xl">⭐</span>
                      )}
                    </div>
                    <h3 className="font-bold text-base md:text-lg leading-snug">{item.title}</h3>
                  </div>
                  {/* Verso — description */}
                  <div
                    className="absolute inset-0 bg-teal-400/15 border border-teal-400/30 rounded-2xl p-6 lg:p-8 flex flex-col justify-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ligne 2 — 2 colonnes avec flip */}
        {ligne2.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {ligne2.map((item, i) => (
              <div key={i} style={{ perspective: "1000px" }} className="h-40 md:h-44">
                <div
                  className="relative w-full h-full transition-transform duration-700 cursor-default"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "rotateY(180deg)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "rotateY(0deg)")}
                >
                  {/* Recto */}
                  <div
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-center items-start"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {item.imageUrl && (
                      <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center mb-5">
                        <img src={item.imageUrl} alt="" className="w-7 h-7 object-contain" />
                      </div>
                    )}
                    <h3 className="font-bold text-base md:text-lg leading-snug">{item.title}</h3>
                  </div>
                  {/* Verso */}
                  <div
                    className="absolute inset-0 bg-teal-400/15 border border-teal-400/30 rounded-2xl p-6 lg:p-8 flex flex-col justify-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ligne 3 — Badges checkmark */}
        {ligne3.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {ligne3.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2"
              >
                <Check className="w-4 h-4 text-[#F2C94C]" />
                <span className="text-sm font-medium text-white whitespace-nowrap">{item.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* Ligne 4 — Note italique teal */}
        {ligne4 && (
          <div className="mt-6 text-center max-w-4xl mx-auto">
            <p className="text-sm text-[#F2C94C] italic leading-relaxed text-center">
              {ligne4}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
