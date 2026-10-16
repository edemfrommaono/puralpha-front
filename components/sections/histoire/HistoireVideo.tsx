"use client";

import { useState } from "react";
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

/** Transforme une URL YouTube / Vimeo en URL d'embed (mode youtube-nocookie pour YouTube). */
function getEmbedUrl(url: string): string | null {
  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}`;

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
 * Respect RGPD (Solution 2-clics) : L'iframe YouTube n'est chargée qu'au clic volontaire
 * de l'utilisateur et utilise exclusivement le domaine youtube-nocookie.com.
 */
export function HistoireVideo({
  title,
  titleHighlight,
  description,
  videoUrl,
  placeholderLabel,
  placeholderNote,
}: HistoireVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
  const directVideo =
    videoUrl && !embedUrl && isDirectVideoFile(videoUrl) ? videoUrl : null;

  return (
    <section className="bg-navy-800 py-12 lg:py-24">
      <div className="container mx-auto px-8 lg:px-12 max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texte */}
          <FadeInView direction="left" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Image
              src="/images/logo_white.png"
              alt="PUR Alpha"
              width={140}
              height={40}
              className="h-10 w-auto mb-6 mx-auto lg:mx-0"
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
              isPlaying ? (
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
                  <iframe
                    src={`${embedUrl}?autoplay=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <div
                  onClick={() => setIsPlaying(true)}
                  className="group relative flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-white/20 bg-navy-700/60 hover:bg-navy-700/80 aspect-video p-8 shadow-2xl cursor-pointer transition-all duration-300"
                  role="button"
                  tabIndex={0}
                  aria-label={`Lancer la vidéo : ${title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
                  }}
                >
                  <span className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center shadow-[0_4px_20px_rgba(242,201,76,0.4)] group-hover:scale-110 group-hover:bg-gold-400 transition-all duration-300">
                    <Play className="w-7 h-7 text-navy-900 fill-navy-900 ml-1" />
                  </span>
                  <p className="text-white font-bold text-base md:text-lg">
                    {placeholderLabel || "Lancer la vidéo"}
                  </p>
                  <p className="text-white/60 text-xs max-w-sm leading-relaxed">
                    En cliquant, vous acceptez la lecture via YouTube (mode de confidentialité avancée{" "}
                    <span className="text-teal-300 font-mono text-[11px]">youtube-nocookie.com</span>).
                  </p>
                </div>
              )
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
