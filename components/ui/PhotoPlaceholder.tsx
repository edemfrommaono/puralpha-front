import { Camera, Image as ImageIcon, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  image: ImageIcon,
};

interface PhotoPlaceholderProps {
  /** Petit tag affiché en haut (ex : "Emplacement réservé", "Photo 1") */
  tag?: string;
  /** Libellé principal en gras */
  label: string;
  /** Note secondaire en italique */
  note?: string;
  /** Icône affichée : "camera" | "image" */
  icon?: keyof typeof ICONS;
  className?: string;
}

/**
 * Bloc « Emplacement réservé » affiché tant qu'aucune photo n'est renseignée
 * dans WordPress (ACF). Charte maquette : fond bleu très clair, bordure
 * pointillée, icône teal et libellés centrés.
 */
export function PhotoPlaceholder({
  tag,
  label,
  note,
  icon = "image",
  className = "",
}: PhotoPlaceholderProps) {
  const Icon = ICONS[icon] ?? ImageIcon;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center gap-3 rounded-2xl border-2 border-dashed border-teal-400/40 bg-gray-100 p-8 ${className}`}
    >
      {tag && (
        <span className="inline-block bg-white text-navy-800 text-[11px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full shadow-sm">
          {tag}
        </span>
      )}
      <Icon className="w-8 h-8 text-teal-400" strokeWidth={1.5} />
      <p className="text-navy-800 font-bold text-sm">{label}</p>
      {note && (
        <p className="text-gray-500 text-xs italic max-w-[260px]">{note}</p>
      )}
    </div>
  );
}
