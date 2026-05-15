import { getPourLesFamillesPage, resolveImageUrl } from "@/lib/wordpress";
import { POUR_LES_FAMILLES_FALLBACK } from "@/lib/fallback-data/pour-les-familles";
import {
  FamillesHero,
  FamillesHandicaps,
  FamillesServices,
  FamillesEtapes,
  FamillesLimites,
  FamillesGaranties,
  FamillesFaq,
  FamillesCta,
} from "@/components/sections/familles";

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

export default async function FamillesPage() {
  const page = await getPourLesFamillesPage();
  const acf = page?.acf;
  const fb = POUR_LES_FAMILLES_FALLBACK;

  // Sections dynamiques
  const hero = acf?.hero;
  const heroStats = hero?.stats?.length ? hero.stats : fb.hero.stats;
  const handicaps = acf?.handicaps;
  const handicapTypes = handicaps?.types?.length ? handicaps.types : null;
  const services = acf?.services;
  const servicesCards = services?.cards?.length ? services.cards : null;
  const etapes = acf?.etapes;
  const etapesSteps = etapes?.steps?.length ? etapes.steps : fb.etapes.steps;
  const limites = acf?.limites;
  const limitesFaisons = limites?.ce_que_nous_faisons?.length ? limites.ce_que_nous_faisons : fb.limites.ce_que_nous_faisons;
  const limitesPasFaisons = limites?.ce_que_nous_ne_faisons_pas?.length ? limites.ce_que_nous_ne_faisons_pas : fb.limites.ce_que_nous_ne_faisons_pas;
  const limitesBadges = limites?.badges?.length ? limites.badges : fb.limites.badges;
  const garanties = acf?.garanties;
  const garantiesItems = garanties?.items?.length ? garanties.items : null;
  const faq = acf?.faq;
  const faqItems = faq?.items?.length ? faq.items : fb.faq.items;
  const cta = acf?.cta_final;
  const ctaBadges = cta?.badges?.length ? cta.badges : fb.cta_final.badges;
  const ctaImageDeFondUrl = await resolveImageUrl(cta?.image_de_fond ?? null);

  // ── Résolution des images côté serveur ──
  const resolvedHandicapTypes = handicapTypes
    ? await Promise.all(
        handicapTypes.map(async (item, idx) => ({
          label: item.label,
          imageUrl: typeof item.image === 'number'
            ? await resolveImageUrl(item.image)
            : getImageUrl(item.image),
          fallback_icon: fb.handicaps.types[idx]?.fallback_icon,
        }))
      )
    : fb.handicaps.types.map((item) => ({
        label: item.label,
        imageUrl: '',
        fallback_icon: item.fallback_icon,
      }));

  const resolvedGarantiesItems = garantiesItems
    ? await Promise.all(
        garantiesItems.map(async (item, idx) => ({
          title: item.title,
          description: item.description,
          imageUrl: typeof item.image === 'number'
            ? await resolveImageUrl(item.image)
            : getImageUrl(item.image),
          fallback_icon: fb.garanties.items[idx]?.fallback_icon,
        }))
      )
    : fb.garanties.items.map((item) => ({
        title: item.title,
        description: item.description,
        imageUrl: '',
        fallback_icon: item.fallback_icon,
      }));

  const resolvedServicesCards = servicesCards
    ? await Promise.all(
        servicesCards.map(async (card) => ({
          tag: card.tag,
          title: card.title,
          description: card.description,
          tags: card.tags,
          imageUrl: typeof card.image === 'number'
            ? await resolveImageUrl(card.image)
            : getImageUrl(card.image),
        }))
      )
    : fb.services.cards.map((card) => ({
        tag: card.tag,
        title: card.title,
        description: card.description,
        tags: [...card.tags],
        imageUrl: '',
      }));

  const resolvedEtapesSteps = etapesSteps.map((step, idx) => ({
    number: step.number || String(idx + 1),
    title: step.title,
    description: step.description,
    imageUrl: '',
    fallback_icon: fb.etapes.steps[idx]?.fallback_icon || '',
  }));

  // Si WordPress fournit des images (IDs) pour les étapes, les résoudre
  if (etapes?.steps?.length) {
    await Promise.all(
      etapes.steps.map(async (step, idx) => {
        if (typeof step.image === 'number' && resolvedEtapesSteps[idx]) {
          resolvedEtapesSteps[idx].imageUrl = await resolveImageUrl(step.image);
        } else if (step.image) {
          resolvedEtapesSteps[idx].imageUrl = getImageUrl(step.image);
        }
      })
    );
  }

  return (
    <div className="flex flex-col w-full bg-white">
      <FamillesHero
        title={hero?.title || fb.hero.title}
        titleHighlight={hero?.title_highlight || fb.hero.title_highlight}
        description={hero?.description || fb.hero.description}
        ctaPrimaryText={hero?.cta_primary_text || fb.hero.cta_primary_text}
        ctaSecondaryText={hero?.cta_secondary_text || fb.hero.cta_secondary_text}
        stats={[...heroStats]}
      />

      <FamillesHandicaps
        title={handicaps?.title || fb.handicaps.title}
        titleHighlight={handicaps?.title_highlight || fb.handicaps.title_highlight}
        description={handicaps?.description || fb.handicaps.description}
        highlightQuote={handicaps?.highlight_quote || fb.handicaps.highlight_quote}
        highlightDescription={handicaps?.highlight_description || fb.handicaps.highlight_description}
        items={resolvedHandicapTypes}
      />

      <FamillesServices
        title={services?.title || fb.services.title}
        titleHighlight={services?.title_highlight || fb.services.title_highlight}
        description={services?.description || fb.services.description}
        cards={resolvedServicesCards}
      />

      <FamillesLimites
        title={limites?.title || fb.limites.title}
        titleHighlight={limites?.title_highlight || fb.limites.title_highlight}
        ceQueNousFaisons={[...limitesFaisons]}
        ceQueNousNeFaisonsPas={[...limitesPasFaisons]}
        badges={[...limitesBadges]}
      />
      
      <FamillesEtapes
        title={etapes?.title || fb.etapes.title}
        description={etapes?.description || fb.etapes.description}
        steps={resolvedEtapesSteps}
        ctaText={etapes?.cta_text || fb.etapes.cta_text}
        ctaUrl={etapes?.cta_url || fb.etapes.cta_url}
      />

      <FamillesGaranties
        title={garanties?.title || fb.garanties.title}
        titleHighlight={garanties?.title_highlight || fb.garanties.title_highlight}
        description={garanties?.description || fb.garanties.description}
        items={resolvedGarantiesItems}
      />

      <FamillesFaq
        sectionTag={faq?.section_tag || fb.faq.section_tag}
        title={faq?.title || fb.faq.title}
        titleHighlight={faq?.title_highlight || fb.faq.title_highlight}
        items={[...faqItems]}
      />

      <FamillesCta
        backgroundImageUrl={ctaImageDeFondUrl}
        title={cta?.title || fb.cta_final.title}
        titleHighlight={cta?.title_highlight || fb.cta_final.title_highlight}
        subtitle={cta?.subtitle || fb.cta_final.subtitle}
        badges={[...ctaBadges]}
        ctaText={cta?.cta_text || fb.cta_final.cta_text}
        ctaUrl={cta?.cta_url || fb.cta_final.cta_url}
      />
    </div>
  );
}
