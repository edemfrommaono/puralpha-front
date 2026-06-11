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
  const etapes = acf?.etapes ?? (acf?.steps ? {
    title: (acf as Record<string, unknown>).title as string,
    description: (acf as Record<string, unknown>).description as string,
    steps: (acf as Record<string, unknown>).steps as Array<{ title: string; items: Array<{ text: string }> }>,
    cta_text: (acf as Record<string, unknown>).cta_text as string,
    cta_url: (acf as Record<string, unknown>).cta_url as string,
  } : undefined);
  const etapesSteps = etapes?.steps?.length ? etapes.steps : fb.etapes.steps;
  const limites = acf?.limites;
  const limitesFaisons = limites?.ce_que_nous_faisons?.length ? limites.ce_que_nous_faisons : fb.limites.ce_que_nous_faisons;
  const limitesPasFaisons = limites?.ce_que_nous_ne_faisons_pas?.length ? limites.ce_que_nous_ne_faisons_pas : fb.limites.ce_que_nous_ne_faisons_pas;
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
        fallback_icon: (fb.handicaps.types as unknown as Array<{ fallback_icon?: string }>)[idx]?.fallback_icon,
      }))
    )
    : (fb.handicaps.types as unknown as Array<{ label: string; fallback_icon?: string }>).map((item) => ({
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
        fallback_icon: (fb.garanties.items as unknown as Array<{ fallback_icon?: string }>)[idx]?.fallback_icon,
      }))
    )
    : (fb.garanties.items as unknown as Array<{ title: string; description: string; fallback_icon?: string }>).map((item) => ({
      title: item.title,
      description: item.description,
      imageUrl: '',
      fallback_icon: item.fallback_icon,
    }));

  // Garanties Ligne 2 (avec images)
  const garantiesLigne2Raw = garanties?.garanties_ligne_2;
  const resolvedGarantiesLigne2 = garantiesLigne2Raw?.length
    ? await Promise.all(
      garantiesLigne2Raw.map(async (item) => ({
        title: item.titre,
        description: item.description,
        imageUrl: typeof item.image === 'number'
          ? await resolveImageUrl(item.image)
          : getImageUrl(item.image),
      }))
    )
    : [];

  // Garanties Ligne 3 (sans images)
  const garantiesLigne3Raw = garanties?.garantie_ligne_3;
  const resolvedGarantiesLigne3 = garantiesLigne3Raw?.length
    ? garantiesLigne3Raw.map((item) => ({
      title: item.titre,
      description: item.description,
    }))
    : [];

  // Garanties Ligne 4 (zone de texte simple)
  const garantiesLigne4Text = garanties?.garantie_ligne_4 || "";

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
    : (fb.services.cards as unknown as Array<{ tag: string; title: string; description: string; tags: Array<{ text: string }> }>).map((card) => ({
      tag: card.tag,
      title: card.title,
      description: card.description,
      tags: [...card.tags],
      imageUrl: '',
    }));

  const resolvedEtapesSteps = etapesSteps.map((step) => ({
    title: step.title,
    items: step.items?.length ? [...step.items] : [],
  }));

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
        ligne2={resolvedGarantiesLigne2}
        ligne3={resolvedGarantiesLigne3}
        ligne4={garantiesLigne4Text}
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
