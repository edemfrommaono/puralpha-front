import { getHomePage, resolveImageUrl } from "@/lib/wordpress";
import { HOME_FALLBACK } from "@/lib/fallback-data/home";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ValuesBarSection } from "@/components/sections/home/ValuesBarSection";
import { AccompagnementSection } from "@/components/sections/home/AccompagnementSection";
import { EtapesSection } from "@/components/sections/home/EtapesSection";
import { HistoireSection } from "@/components/sections/home/HistoireSection";
import { TerritoireSection } from "@/components/sections/home/TerritoireSection";
import { ParcoursSection } from "@/components/sections/home/ParcoursSection";
import { CtaFinalSection } from "@/components/sections/home/CtaFinalSection";

export const revalidate = 0;

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
  const heroImageLeftUrl = await resolveImageUrl(hero?.hero_image_left);
  const heroImageRightUrl = await resolveImageUrl(hero?.hero_image_right);
  const histoireImageUrl = await resolveImageUrl(histoire?.image);
  const territoireImageUrl = await resolveImageUrl(territoire?.image_de_carte);
  const ctaFondUrl = await resolveImageUrl(ctaFinal?.image_de_fond);
  const imageMiseEnAvantUrl = await resolveImageUrl(acc?.image_mise_en_avant);

  // Résolution des images dans les repeaters
  const resolvedValuesBar = valuesBar
    ? await Promise.all(
      valuesBar.map(async (v) => ({
        ...v,
        imageUrl: await resolveImageUrl(v.image),
      }))
    )
    : null;

  const resolvedAccServices = await Promise.all(
    accServices.map(async (srv) => ({
      ...srv,
      imageUrl: await resolveImageUrl(srv.image),
    }))
  );

  const resolvedSteps = etapesSteps
    ? await Promise.all(
      etapesSteps.map(async (step) => ({
        ...step,
        imageUrl: await resolveImageUrl(step.image),
      }))
    )
    : null;

  const resolvedParcoursCards = parcoursCards
    ? await Promise.all(
      parcoursCards.map(async (card) => ({
        ...card,
        coverUrl: await resolveImageUrl(card.image_de_couverture),
      }))
    )
    : null;

  return (
    <div className="flex flex-col w-full">
      <HeroSection
        hero={hero}
        heroImageLeftUrl={heroImageLeftUrl}
        heroImageRightUrl={heroImageRightUrl}
        fallback={fb.hero}
      />

      <ValuesBarSection
        resolvedValuesBar={resolvedValuesBar}
        fallbackValues={fb.values_bar}
      />

      <AccompagnementSection
        acc={acc}
        resolvedAccServices={resolvedAccServices}
        accInfoBoxes={accInfoBoxes}
        imageMiseEnAvantUrl={imageMiseEnAvantUrl}
        fallback={fb.accompagnement}
      />

      <EtapesSection
        title={etapes?.title || fb.etapes.title}
        description={etapes?.description || fb.etapes.description}
        steps={resolvedSteps || fb.etapes_steps}
        ctaText={etapes?.cta_text || fb.etapes.cta_text}
        ctaUrl={fb.etapes.cta_url}
      />

      <HistoireSection
        histoire={histoire}
        histoireImageUrl={histoireImageUrl}
        fallback={fb.histoire}
      />

      <TerritoireSection
        territoire={territoire}
        territoireImageUrl={territoireImageUrl}
        fallback={fb.territoire}
      />

      <ParcoursSection
        parcours={parcours}
        resolvedParcoursCards={resolvedParcoursCards}
        fallback={fb.parcours}
        fallbackCards={fb.parcours_cards}
      />

      <CtaFinalSection
        ctaFinal={ctaFinal}
        ctaBadges={ctaBadges}
        ctaFondUrl={ctaFondUrl}
        fallback={fb.cta_final}
      />
    </div>
  );
}
