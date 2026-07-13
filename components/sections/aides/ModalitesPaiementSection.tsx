"use client";

import { toHtml } from "@/lib/wysiwyg";

interface Processus {
  tag: string;
  titre: string;
  description: string;
  imageDuFond?: string;
}

interface ModalitesPaiementSectionProps {
  tag?: string;
  title?: string;
  titleHighlight?: string;
  title2?: string;
  description?: string;
  processus?: Processus[];
  fallbackProcessus: readonly {
    tag: string;
    titre: string;
    description: string;
    imageDuFond?: string;
  }[];
}

const DEFAULTS = {
  tag: "",
  title: "",
  titleHighlight: "",
  title2: "",
  description: "",
};

export function ModalitesPaiementSection({
  tag,
  title,
  titleHighlight,
  title2,
  description,
  processus,
  fallbackProcessus,
}: ModalitesPaiementSectionProps) {
  const items = processus?.length ? processus : fallbackProcessus;

  if (!items?.length && !tag && !title && !titleHighlight && !title2 && !description) return null;

  return (
    <section className="py-8 lg:py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {(tag || title || titleHighlight || title2 || description) && (
          <div className="text-center mb-6 lg:mb-12">
            {tag && (
              <span className="typo-tag text-teal-400">
                {tag}
              </span>
            )}
            {(title || titleHighlight || title2) && (
              <h2 className="typo-h2 text-navy-800 mt-4">
                {title}{" "}
                {titleHighlight && (
                  <span className="text-teal-400">{titleHighlight}</span>
                )}
                {title2 && <br />}
                {title2}
              </h2>
            )}
            {description && (
              <div
                className="prose max-w-2xl mx-auto mt-4 text-center typo-body"
                dangerouslySetInnerHTML={{ __html: toHtml(description) }}
              />
            )}
          </div>
        )}

        {items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {items.map((proc, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl
                           transition-all duration-500 hover:-translate-y-1 h-[200px] w-[280px] mx-auto sm:w-full sm:h-auto sm:aspect-[4/3] cursor-default"
              >
                {/* Image de fond */}
                {proc.imageDuFond ? (
                  <img
                    src={proc.imageDuFond}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy-800" />
                )}

                {/* Dégradé permanent bas → haut */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />

                {/* Overlay plus sombre au survol */}
                <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Contenu bas */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  {/* Tag */}
                  {proc.tag && (
                    <span className="typo-tag text-white/70 mb-2 block">
                      {proc.tag}
                    </span>
                  )}

                  {/* Titre — toujours visible */}
                  <h4 className="typo-h3 text-white mb-0 group-hover:mb-3 transition-all duration-300">
                    {proc.titre}
                  </h4>

                  {/* Description — apparaît au survol */}
                  <p className="typo-small text-white/80
                                 max-h-0 overflow-hidden opacity-0
                                 group-hover:max-h-40 group-hover:opacity-100
                                 transition-all duration-500 ease-in-out">
                    {proc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
