import { getAidesFinancieresPage, resolveImageUrl } from "@/lib/wordpress";
import { AIDES_FALLBACK } from "@/lib/fallback-data/aides-financieres";
import { AidesHeroSection } from "@/components/sections/aides/AidesHeroSection";
import { ResteAChargeSection } from "@/components/sections/aides/ResteAChargeSection";
import { DispositifsSection } from "@/components/sections/aides/DispositifsSection";
import { TarificationSection } from "@/components/sections/aides/TarificationSection";
import { SimulateurSection } from "@/components/sections/aides/SimulateurSection";
import { AccompagnementAdminSection } from "@/components/sections/aides/AccompagnementAdminSection";
import { ModalitesPaiementSection } from "@/components/sections/aides/ModalitesPaiementSection";
import { AidesCtaSection } from "@/components/sections/aides/AidesCtaSection";

export const revalidate = 0;

export default async function AidesFinancieresPage() {
  const page = await getAidesFinancieresPage();
  const acf = page?.acf;
  const fb = AIDES_FALLBACK;

  // Hero
  const hero = acf?.hero;

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

  // Reste à charge
  const racImageUrl = await resolveImageUrl((acf as Record<string, unknown>)?.reste_a_charge_image as number | null);

  return (
    <div className="flex flex-col w-full bg-white">
      <AidesHeroSection
        hero={hero}
        fallback={fb.hero}
      />

      <ResteAChargeSection
        title={(acf as Record<string, unknown>)?.reste_a_charge_title as string}
        titleHighlight={(acf as Record<string, unknown>)?.reste_a_charge_title_highlight as string}
        description={(acf as Record<string, unknown>)?.reste_a_charge_description as string}
        imageUrl={racImageUrl || undefined}
        imageCaption={(acf as Record<string, unknown>)?.reste_a_charge_image_caption as string}
        ctaPrimaryText={(acf as Record<string, unknown>)?.reste_a_charge_cta_primary_text as string}
        ctaPrimaryUrl={(acf as Record<string, unknown>)?.reste_a_charge_cta_primary_url as string}
        ctaSecondaryText={(acf as Record<string, unknown>)?.reste_a_charge_cta_secondary_text as string}
        ctaSecondaryUrl={(acf as Record<string, unknown>)?.reste_a_charge_cta_secondary_url as string}
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

      <ModalitesPaiementSection
        tag={accAdmin?.modalites_tag}
        title={accAdmin?.modalites_title}
        titleHighlight={accAdmin?.modalites_title_highlight}
        title2={accAdmin?.modalites_title_2}
        description={accAdmin?.modalites_description}
        processus={accAdmin?.processus}
        fallbackProcessus={fb.accompagnement_admin.processus}
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
