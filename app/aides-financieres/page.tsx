import { getAidesFinancieresPage, resolveImageUrl } from "@/lib/wordpress";
import { AIDES_FALLBACK } from "@/lib/fallback-data/aides-financieres";
import { AidesHeroSection } from "@/components/sections/aides/AidesHeroSection";
import { DispositifsSection } from "@/components/sections/aides/DispositifsSection";
import { TarificationSection } from "@/components/sections/aides/TarificationSection";
import { SimulateurSection } from "@/components/sections/aides/SimulateurSection";
import { AccompagnementAdminSection } from "@/components/sections/aides/AccompagnementAdminSection";
import { AidesCtaSection } from "@/components/sections/aides/AidesCtaSection";

export const revalidate = 0;

export default async function AidesFinancieresPage() {
  const page = await getAidesFinancieresPage();
  const acf = page?.acf;
  const fb = AIDES_FALLBACK;

  // Hero
  const hero = acf?.hero;
  const heroBadges = hero?.badges?.length ? hero.badges : fb.hero.badges;

  // Aides
  const aides = acf?.aides;
  const aidesCards = aides?.cards?.length ? aides.cards : null;

  // Résolution des images des cartes d'aides
  const resolvedAidesCards = aidesCards
    ? await Promise.all(
      aidesCards.map(async (card) => ({
        ...card,
        imageUrl: await resolveImageUrl(card.image),
      }))
    )
    : null;

  // Tarification
  const tarif = acf?.tarification;
  const tarifRows = tarif?.rows?.length ? tarif.rows : fb.tarification.rows;
  const tarifInclus = tarif?.inclus_badges?.length ? tarif.inclus_badges : fb.tarification.inclus_badges;

  // Simulateur
  const simulateur = acf?.simulateur;

  // Accompagnement administratif
  const accAdmin = acf?.accompagnement_administratif;

  // CTA Final
  const cta = acf?.cta_final;
  const ctaBadges = cta?.badges?.length ? cta.badges : fb.cta_final.badges;
  const ctaFondUrl = await resolveImageUrl(cta?.image_de_fond);

  return (
    <div className="flex flex-col w-full bg-white">
      <AidesHeroSection
        hero={hero}
        heroBadges={heroBadges}
        fallback={fb.hero}
      />

      <DispositifsSection
        aides={aides}
        resolvedAidesCards={resolvedAidesCards}
        fallback={fb.aides}
        fallbackCards={fb.aides_cards}
      />

      <TarificationSection
        tarif={tarif}
        tarifRows={tarifRows}
        tarifInclus={tarifInclus}
        fallback={fb.tarification}
      />

      <SimulateurSection
        simulateur={simulateur}
        fallback={fb.simulateur}
      />

      <AccompagnementAdminSection
        accAdmin={accAdmin}
        fallback={fb.accompagnement_admin}
      />

      <AidesCtaSection
        cta={cta}
        ctaFondUrl={ctaFondUrl}
        ctaBadges={ctaBadges}
        fallback={fb.cta_final}
      />
    </div>
  );
}
