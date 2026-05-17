import { getNousRejoindrePage, resolveImageUrl } from "@/lib/wordpress";
import { NOUS_REJOINDRE_FALLBACK } from "@/lib/fallback-data/nous-rejoindre";
import {
  RejoindreHero,
  RejoindreAvantages,
  RejoindreValeurs,
  RejoindreFormation,
  RejoindreTemoignage,
  RejoindreProcess,
  RejoindreFaq,
  RejoindreFormulaire,
} from "@/components/sections/rejoindre";

function getImageUrl(img: unknown): string {
  if (!img || img === false || typeof img === "number") return "";
  if (typeof img === "object" && img !== null) {
    const o = img as Record<string, unknown>;
    if (typeof o.url === "string") return o.url;
    if (typeof o.source_url === "string") return o.source_url;
  }
  return "";
}

export const revalidate = 0;

export const metadata = {
  title: "Nous rejoindre | PUR Alpha",
  description: "PUR Alpha recherche des intervenants qui mettent l'humain avant tout pour accompagner les enfants en situation de handicap.",
};

export default async function NousRejoindre() {
  const page = await getNousRejoindrePage();
  const acf = page?.acf;
  const fb = NOUS_REJOINDRE_FALLBACK;

  // Sections dynamiques
  const hero = acf?.hero;
  const avantages = acf?.avantages;
  const avantagesCards = avantages?.cards?.length ? avantages.cards : null;
  const vh = acf?.valeurs_humaines;
  const qualities = vh?.qualities?.length ? vh.qualities : fb.valeurs_humaines.qualities;
  const temoignage = acf?.temoignage;
  const faq = acf?.faq;
  const faqItems = faq?.items?.length ? faq.items : fb.faq.items;
  const formulaire = acf?.formulaire;

  // Résolution images côté serveur
  const vhImageUrl = typeof vh?.image === "number"
    ? await resolveImageUrl(vh.image)
    : getImageUrl(vh?.image);

  const temoignageBgUrl = typeof temoignage?.image_de_fond === "number"
    ? await resolveImageUrl(temoignage.image_de_fond)
    : getImageUrl(temoignage?.image_de_fond);

  const resolvedAvantagesCards = avantagesCards
    ? await Promise.all(
        avantagesCards.map(async (card, i) => ({
          title: card.title,
          description: card.description,
          imageUrl: typeof card.image === "number"
            ? await resolveImageUrl(card.image)
            : getImageUrl(card.image),
          fallback_icon: fb.avantages.cards[i]?.fallback_icon,
        }))
      )
    : fb.avantages.cards.map((c) => ({
        title: c.title,
        description: c.description,
        imageUrl: "",
        fallback_icon: c.fallback_icon,
      }));

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <RejoindreHero
        titleLine1={hero?.title_line_1 || fb.hero.title_line_1}
        titleLine2={hero?.title_line_2 || fb.hero.title_line_2}
        titleHighlight={hero?.title_highlight || fb.hero.title_highlight}
        description={hero?.description || fb.hero.description}
        ctaPrimaryText={hero?.cta_primary_text || fb.hero.cta_primary_text}
        ctaSecondaryText={hero?.cta_secondary_text || fb.hero.cta_secondary_text}
      />

      <RejoindreAvantages
        sectionTag={avantages?.section_tag || fb.avantages.section_tag}
        title={avantages?.title || fb.avantages.title}
        titleHighlight={avantages?.title_highlight || fb.avantages.title_highlight}
        description={avantages?.description || fb.avantages.description}
        cards={resolvedAvantagesCards}
      />

      <RejoindreValeurs
        sectionTag={vh?.section_tag || fb.valeurs_humaines.section_tag}
        title={vh?.title || fb.valeurs_humaines.title}
        titleHighlight={vh?.title_highlight || fb.valeurs_humaines.title_highlight}
        paragraph1={vh?.paragraph_1 || fb.valeurs_humaines.paragraph_1}
        paragraph2={vh?.paragraph_2 || fb.valeurs_humaines.paragraph_2}
        qualities={[...qualities]}
        imageUrl={vhImageUrl}
      />

      <RejoindreFormation
        tag={(acf as Record<string, unknown>)?.formation_tag as string}
        title={(acf as Record<string, unknown>)?.formation_title as string}
        titleHighlight={(acf as Record<string, unknown>)?.formation_title_highlight as string}
        titleEnd={(acf as Record<string, unknown>)?.formation_title_end as string}
        description={(acf as Record<string, unknown>)?.formation_description as string}
        etapes={(acf as Record<string, unknown>)?.formation_etapes as { valeur: string; sous_titre: string; titre: string; description: string }[]}
      />

      <RejoindreTemoignage
        quote={temoignage?.quote || fb.temoignage.quote}
        author={temoignage?.author || fb.temoignage.author}
        backgroundImageUrl={temoignageBgUrl}
      />

      <RejoindreProcess />

      <RejoindreFaq
        sectionTag={faq?.section_tag || fb.faq.section_tag}
        title={faq?.title || fb.faq.title}
        titleHighlight={faq?.title_highlight || fb.faq.title_highlight}
        items={[...faqItems]}
      />

      <RejoindreFormulaire
        sectionTag={formulaire?.section_tag || fb.formulaire.section_tag}
        title={formulaire?.title || fb.formulaire.title}
        description={formulaire?.description || fb.formulaire.description}
        submitText={formulaire?.submit_text || fb.formulaire.submit_text}
        emailFallback={formulaire?.email_fallback || fb.formulaire.email_fallback}
      />
    </main>
  );
}
