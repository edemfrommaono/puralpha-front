interface PageBannerProps {
  /** Première partie du titre (en navy) */
  title: string;
  /** Deuxième partie du titre mise en avant (en teal) */
  titleHighlight?: string;
}

/**
 * Bannière de page réutilisable — dégradé du haut (teal clair) vers le bas (blanc),
 * titre bicolore navy + teal, centré.
 * Usage : <PageBanner title="Mentions" titleHighlight="légales" />
 */
export function PageBanner({ title, titleHighlight }: PageBannerProps) {
  return (
    <div
      className="w-full py-14 lg:py-20"
      style={{
        background: "linear-gradient(to bottom, #e8f7f8, #ffffff)",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-navy-800">
          {title}{" "}
          {titleHighlight && (
            <span className="text-teal-400">{titleHighlight}</span>
          )}
        </h1>
      </div>
    </div>
  );
}
