import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getHomePage, resolveImageUrl } from "@/lib/wordpress";
import { HOME_FALLBACK } from "@/lib/fallback-data/home";

export const revalidate = 0;

/**
 * Extrait l'URL depuis un objet image ACF (return_format: array).
 * Pour les IDs numériques, utiliser resolveImageUrl() à la place.
 */
function getImageUrl(img: unknown): string {
  if (!img || img === false || typeof img === "number") return "";
  if (typeof img === "object" && img !== null) {
    const o = img as Record<string, unknown>;
    if (typeof o.url === "string") return o.url;
    if (typeof o.source_url === "string") return o.source_url;
  }
  return "";
}

export default async function Home() {
  const page = await getHomePage();
  const acf = page?.acf;
  const fb = HOME_FALLBACK;

  // ── Données ACF avec fallback ──
  const hero = acf?.hero;
  const valuesBar = acf?.values_bar?.length ? acf.values_bar : null;
  const acc = acf?.accompagnement;
  const accServices = acc?.services?.length ? acc.services : fb.accompagnement_services;
  const accInfoBoxes = acc?.info_boxes?.length ? acc.info_boxes : fb.accompagnement_info_boxes;
  const etapes = acf?.etapes;
  const etapesSteps = etapes?.steps?.length ? etapes.steps : null;
  const histoire = acf?.histoire;
  const territoire = acf?.territoire;
  const parcours = acf?.parcours;
  const parcoursCards = parcours?.cards?.length ? parcours.cards : null;
  const ctaFinal = acf?.cta_final;
  const ctaBadges = ctaFinal?.badges?.length ? ctaFinal.badges : fb.cta_badges;

  // ── Résolution des images côté serveur ──
  // Les images ACF peuvent être un ID (number) ou un objet {url}.
  // resolveImageUrl() gère les deux cas, y compris l'appel GET /media/{id}.
  const heroImageLeftUrl = await resolveImageUrl(hero?.hero_image_left);
  const heroImageRightUrl = await resolveImageUrl(hero?.hero_image_right);
  const histoireImageUrl = await resolveImageUrl(histoire?.image);
  const territoireImageUrl = await resolveImageUrl(territoire?.image_de_carte);
  const ctaFondUrl = getImageUrl(ctaFinal?.image_de_fond);

  // Résolution des images dans les repeaters
  const resolvedValuesBar = valuesBar
    ? await Promise.all(
        valuesBar.map(async (v) => ({
          ...v,
          imageUrl: getImageUrl(v.image),
        }))
      )
    : null;

  const resolvedSteps = etapesSteps
    ? await Promise.all(
        etapesSteps.map(async (step) => ({
          ...step,
          imageUrl: getImageUrl(step.image),
        }))
      )
    : null;

  const resolvedParcoursCards = parcoursCards
    ? await Promise.all(
        parcoursCards.map(async (card) => ({
          ...card,
          coverUrl: getImageUrl(card.image_de_couverture),
        }))
      )
    : null;

  return (
    <div className="flex flex-col w-full">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-teal-50 via-[#f7f5f0] to-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col gap-6 max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-black text-navy-800 leading-tight">
                {hero?.title || fb.hero.title}{" "}
                <span className="text-teal-500">
                  {hero?.title_highlight || fb.hero.title_highlight}
                </span>
              </h1>
              <p className="text-lg lg:text-xl font-semibold text-gray-700">
                {hero?.subtitle || fb.hero.subtitle}
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                {hero?.description || fb.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  variant="navy"
                  className="w-full sm:w-auto"
                  href={hero?.cta_url || fb.hero.cta_url}
                >
                  {hero?.cta_primary_text || fb.hero.cta_primary_text}
                </Button>
                <Button variant="outline-navy" className="w-full sm:w-auto">
                  <span className="mr-2">▶</span>
                  {hero?.cta_secondary_text || fb.hero.cta_secondary_text}
                </Button>
              </div>
            </div>

            {/* Hero images — URLs résolues côté serveur */}
            <div className="relative h-[400px] lg:h-[600px] w-full flex gap-4 lg:gap-6 justify-end items-end">
              <div className="relative w-[45%] h-full rounded-3xl overflow-hidden shadow-lg">
                {heroImageLeftUrl ? (
                  <Image
                    src={heroImageLeftUrl}
                    alt="PUR Alpha accompagnement"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-teal-400" />
                )}
              </div>
              <div className="relative w-[45%] h-[80%] flex flex-col gap-4">
                <div className="w-full flex-grow rounded-3xl overflow-hidden shadow-lg relative">
                  {heroImageRightUrl ? (
                    <Image
                      src={heroImageRightUrl}
                      alt="PUR Alpha enfants"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                </div>
                <div className="bg-navy-700 text-white p-6 rounded-3xl shadow-lg shrink-0">
                  <p className="font-bold text-sm leading-relaxed">
                    {hero?.hero_overlay_text || fb.hero.hero_overlay_text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ VALUES BAR ═══════════════════ */}
      <section className="bg-navy-700 text-white py-8 w-full overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 lg:gap-4 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {resolvedValuesBar
              ? resolvedValuesBar.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
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
                    <span className="font-semibold tracking-wide">{v.label}</span>
                  </div>
                ))
              : fb.values_bar.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <span className="text-xl">✦</span>
                    <span className="font-semibold tracking-wide">{v.label}</span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ACCOMPAGNEMENT ═══════════════════ */}
      <section className="py-20 lg:py-32 w-full bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-100" />
            <div className="flex flex-col gap-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-3 bg-teal-400 rounded-sm" />
                  <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
                    {acc?.section_tag || fb.accompagnement.section_tag}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-navy-800 leading-tight">
                  {acc?.title || fb.accompagnement.title}
                  <br />
                  <span className="text-teal-400">
                    {acc?.title_highlight || fb.accompagnement.title_highlight}
                  </span>
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {accServices.map((srv, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 items-start ${
                      i < accServices.length - 1
                        ? "pb-6 border-b border-navy-800/10"
                        : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center shrink-0 mt-1 text-teal-400">
                      ❖
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-bold text-base mb-1">
                        {srv.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 mt-2">
                {accInfoBoxes.map((box, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-navy-800/10 p-5 rounded-xl"
                  >
                    <h4 className="text-navy-800 font-black text-sm mb-2">
                      {box.title}
                    </h4>
                    <p className="text-gray-500 text-sm">{box.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="teal" href={fb.accompagnement.cta_url}>
                  {acc?.cta_text || fb.accompagnement.cta_text}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ÉTAPES ═══════════════════ */}
      <section className="py-20 lg:py-32 w-full bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-navy-800 mb-4">
            {etapes?.title || fb.etapes.title}
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-16">
            {etapes?.description || fb.etapes.description}
          </p>
          <div className="relative">
            <div className="hidden lg:block absolute top-[27px] left-[15%] right-[15%] h-px bg-teal-400/40" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {(resolvedSteps || fb.etapes_steps).map((step, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center gap-6 z-10"
                >
                  <div className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 text-white rounded-full flex items-center justify-center text-xs font-black z-10">
                      {i + 1}
                    </div>
                    {"imageUrl" in step && step.imageUrl ? (
                      <Image
                        src={step.imageUrl}
                        alt={step.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-teal-400 text-lg">●</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-navy-800 font-black text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <Button variant="navy" href={fb.etapes.cta_url}>
              {etapes?.cta_text || fb.etapes.cta_text}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ NOTRE HISTOIRE ═══════════════════ */}
      <section className="py-20 lg:py-32 w-full bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6 max-w-xl">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-3 bg-teal-400 rounded-sm" />
                  <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
                    {histoire?.section_tag || fb.histoire.section_tag}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-navy-800 leading-tight">
                  {histoire?.title || fb.histoire.title}{" "}
                  <span className="text-teal-400">
                    {histoire?.title_highlight || fb.histoire.title_highlight}
                  </span>
                </h2>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {histoire?.paragraph_1 || fb.histoire.paragraph_1}
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                {histoire?.paragraph_2 || fb.histoire.paragraph_2}
              </p>
              <div>
                <Button variant="teal" href={fb.histoire.cta_url}>
                  {histoire?.cta_text || fb.histoire.cta_text}
                </Button>
              </div>
            </div>
            {/* Image fondatrice — résolution serveur */}
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-100">
              {histoireImageUrl ? (
                <Image
                  src={histoireImageUrl}
                  alt="Fondatrice de PUR Alpha"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex justify-center items-center">
                  <span className="text-gray-400 font-bold">
                    Photo de la fondatrice
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TERRITOIRE ═══════════════════ */}
      <section className="py-20 lg:py-32 w-full bg-[#ecf4f6]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] lg:h-[500px] w-full bg-teal-400/10 rounded-3xl overflow-hidden">
              {territoireImageUrl ? (
                <Image
                  src={territoireImageUrl}
                  alt="Implantation PUR Alpha — Val-d'Oise"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <span className="text-teal-600/50 font-black text-6xl lg:text-8xl">
                    95
                  </span>
                  <span className="mt-4 font-bold text-teal-700">
                    Val-d&apos;Oise
                  </span>
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6 max-w-xl">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-3 bg-teal-400 rounded-sm" />
                  <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
                    {territoire?.section_tag || fb.territoire.section_tag}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-navy-800 leading-tight">
                  {territoire?.title || fb.territoire.title}{" "}
                  <span className="text-teal-400">
                    {territoire?.title_highlight || fb.territoire.title_highlight}
                  </span>
                  , pensé pour les familles
                </h2>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {territoire?.description_1 || fb.territoire.description_1}
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                {territoire?.description_2 || fb.territoire.description_2}
              </p>
              <div>
                <Button
                  variant="gold"
                  href={territoire?.cta_url || fb.territoire.cta_url}
                >
                  <span className="mr-2">▶</span>
                  {territoire?.cta_text || fb.territoire.cta_text}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PARCOURS ═══════════════════ */}
      <section className="py-20 lg:py-32 w-full bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-3 bg-teal-400 rounded-sm" />
              <span className="text-teal-400 font-bold text-xs uppercase tracking-widest">
                {parcours?.section_tag || fb.parcours.section_tag}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-navy-700">
              {parcours?.title || fb.parcours.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(resolvedParcoursCards || fb.parcours_cards).map((card, i) => {
              const isFamille = i === 0;
              const coverUrl = "coverUrl" in card ? card.coverUrl : null;

              return (
                <div
                  key={i}
                  className={`${
                    isFamille
                      ? "bg-teal-50/50 border-teal-100"
                      : "bg-gold-500/10 border-gold-500/20"
                  } rounded-3xl border flex flex-col justify-between h-full min-h-[400px] relative overflow-hidden group hover:shadow-xl transition-all`}
                >
                  {/* Cover image — URL résolue côté serveur */}
                  {coverUrl && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={coverUrl}
                        alt={card.title}
                        fill
                        className="object-cover opacity-10 group-hover:opacity-15 transition-opacity"
                      />
                    </div>
                  )}

                  <div className="relative z-10 p-8 lg:p-12">
                    <span
                      className={`inline-block px-4 py-1.5 ${
                        isFamille
                          ? "bg-teal-400/10 text-teal-500"
                          : "bg-gold-500/20 text-gold-600"
                      } font-bold text-xs tracking-wider uppercase rounded-full mb-6`}
                    >
                      {card.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-navy-700 mb-4 max-w-sm">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                      {card.description}
                    </p>
                    <Button
                      variant={isFamille ? "teal" : "gold"}
                      href={card.cta_url}
                      className={
                        !isFamille
                          ? "rounded-lg shadow-none font-bold text-navy-800"
                          : ""
                      }
                    >
                      {card.cta_text}
                    </Button>
                  </div>
                  <div
                    className={`absolute right-[-10%] bottom-[-10%] w-64 h-64 ${
                      isFamille
                        ? "bg-teal-400/20 group-hover:bg-teal-400/30"
                        : "bg-gold-500/20 group-hover:bg-gold-500/30"
                    } rounded-full blur-3xl transition-all`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <section className="bg-navy-800 py-24 relative overflow-hidden">
        {/* Background image — URL résolue côté serveur */}
        {ctaFondUrl && (
          <Image
            src={ctaFondUrl}
            alt=""
            fill
            className="object-cover opacity-20"
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {ctaFinal?.title || fb.cta_final.title}{" "}
              <span className="text-gold-500">
                {ctaFinal?.title_highlight || fb.cta_final.title_highlight}
              </span>
            </h2>
            <p className="text-xl text-white/80">
              {ctaFinal?.subtitle || fb.cta_final.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80 my-4">
              {ctaBadges.map((badge, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span>✦</span> {badge.text}
                  {i < ctaBadges.length - 1 && (
                    <span className="hidden sm:block text-white/20 ml-4">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
            <Button
              variant="gold"
              className="px-10 py-4 text-lg mt-4"
              href={fb.cta_final.cta_url}
            >
              {ctaFinal?.cta_text || fb.cta_final.cta_text}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
