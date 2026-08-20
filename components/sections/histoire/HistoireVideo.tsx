import Image from "next/image";
import { Play } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";

interface HistoireVideoProps {
  title: string;
  titleHighlight: string;
  description: string;
  videoUrl?: string;
  placeholderLabel: string;
  placeholderNote: string;
}

/** Transforme une URL YouTube / Vimeo en URL d'embed. Retourne null si non reconnue. */
function getEmbedUrl(url: string): string | null {
  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

/** Détecte un fichier vidéo direct (mp4, webm, ogg). */
function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

/**
 * Section « Notre histoire, racontée de vive voix » — fond bleu nuit.
 * Si une URL vidéo est renseignée (YouTube, Vimeo ou fichier mp4/webm), le
 * lecteur est intégré ; sinon un emplacement réservé avec icône play or.
 */
export function HistoireVideo({
  title,
  titleHighlight,
  description,
  videoUrl,
  placeholderLabel,
  placeholderNote,
}: HistoireVideoProps) {
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
  const directVideo =
    videoUrl && !embedUrl && isDirectVideoFile(videoUrl) ? videoUrl : null;

  return (
    <section className="bg-navy-800 py-12 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texte */}
          <FadeInView direction="left">
            <Image
              src="/images/logo_white.png"
              alt="PUR Alpha"
              width={140}
              height={40}
              className="h-10 w-auto mb-6"
            />
            <h2 className="typo-h2 text-white">
              {title}
              <br />
              <span className="text-teal-400">{titleHighlight}</span>
            </h2>
            {description && (
              <p className="typo-body text-white/80 mt-6 max-w-xl">
                {description}
              </p>
            )}
          </FadeInView>

          {/* Vidéo ou emplacement réservé */}
          <FadeInView direction="right" delay={0.15}>
            {embedUrl ? (
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
                <iframe
                  src={embedUrl}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : directVideo ? (
              <video
                src={directVideo}
                controls
                className="w-full rounded-2xl aspect-video shadow-2xl"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center gap-4 rounded-2xl border-2 border-dashed border-white/30 bg-navy-700/40 aspect-video p-8">
                <span className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center shadow-[0_4px_15px_rgba(242,201,76,0.4)]">
                  <Play className="w-6 h-6 text-navy-800 fill-navy-800" />
                </span>
                <p className="text-white font-bold">{placeholderLabel}</p>
                <p className="text-white/50 text-xs italic">{placeholderNote}</p>
              </div>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
