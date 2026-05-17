import {
  UserCheck, GraduationCap, Phone, BookOpen, ShieldCheck, RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";

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
    <section className="py-20 lg:py-32 bg-navy-800 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeInView className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            {title} <span className="text-gold-500">{titleHighlight}</span>
          </h2>
          <p className="text-lg text-white/70">{description}</p>
        </FadeInView>

        {/* Ligne 1 — 3 colonnes avec icônes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const IconComp = item.fallback_icon ? ICON_MAP[item.fallback_icon] : null;
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center mb-6">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-7 h-7 object-contain" />
                  ) : IconComp ? (
                    <IconComp className="w-6 h-6 text-teal-400" strokeWidth={1.8} />
                  ) : (
                    <span className="text-teal-400 text-2xl">⭐</span>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Ligne 2 — 2 colonnes avec icônes */}
        {ligne2.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {ligne2.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                {item.imageUrl && (
                  <div className="w-12 h-12 bg-teal-400/15 rounded-xl flex items-center justify-center mb-6">
                    <img src={item.imageUrl} alt="" className="w-7 h-7 object-contain" />
                  </div>
                )}
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Ligne 3 — 5 colonnes, texte seul */}
        {ligne3.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            {ligne3.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Ligne 4 — Bandeau informatif */}
        {ligne4 && (
          <div className="mt-6">
            <div className="bg-gradient-to-r from-teal-400/10 to-gold-500/10 border border-teal-400/20 rounded-2xl py-8 px-12 text-center">
              <p className="text-sm text-white/70 leading-relaxed max-w-4xl mx-auto">
                {ligne4}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
