import { getNotreHistoirePage, resolveImageUrl } from "@/lib/wordpress";
import { NOTRE_HISTOIRE_FALLBACK } from "@/lib/fallback-data/notre-histoire";
import {
  HistoireHero,
  HistoireFondatrice,
  HistoireRealite,
  HistoireGalerie,
  HistoireMission,
  HistoireValeurs,
  HistoireModele,
  HistoireTerritoire,
  HistoireAmbitions,
  HistoireCta,
} from "@/components/sections/histoire";
import { OriginNomSection } from "@/components/sections/histoire/OriginNomSection";
import { VecuMethodeSection } from "@/components/sections/histoire/VecuMethodeSection";

export const revalidate = 0;

function getImageUrl(img: unknown): string {
  if (!img || img === false || typeof img === "number") return "";
  if (typeof img === "object" && img !== null) {
    const o = img as Record<string, unknown>;
    if (typeof o.url === "string") return o.url;
    if (typeof o.source_url === "string") return o.source_url;
  }
  return "";
}

export default async function NotreHistoirePage() {
  const page = await getNotreHistoirePage();
  const acf = page?.acf;
  const fb = NOTRE_HISTOIRE_FALLBACK;

  // ── Sections dynamiques ──
  const hero = acf?.hero;
  const fondatrice = acf?.fondatrice;
  const realite = acf?.realite_familles;
  const problems = realite?.problems?.length ? realite.problems : null;
  const pura = acf?.syndrome_pura;
  const galerie = acf?.galerie;
  const pourquoi = acf?.section_pourquoi_pur_apha_existe;
  const mission = acf?.mission;
  const valeurs = acf?.valeurs;
  const valeursItems = valeurs?.items?.length ? valeurs.items : null;
  const impactLocal = acf?.section_impact_local;
  const ambitions = acf?.ambitions;
  const ambitionsItems = ambitions?.items?.length ? ambitions.items : null;
  const cta = acf?.cta_final;

  // ── Résolution images côté serveur ──

  // Fondatrice
  const fondatriceImageUrl = await resolveImageUrl(fondatrice?.image ?? null);

  // Problèmes
  const resolvedProblems = problems
    ? await Promise.all(
      problems.map(async (p, idx) => ({
        title: p.title,
        description: p.description,
        imageUrl: typeof p.image === "number"
          ? await resolveImageUrl(p.image)
          : getImageUrl(p.image),
        fallback_icon: (fb.realite_familles.problems as unknown as Array<{ fallback_icon?: string }>)[idx]?.fallback_icon,
      }))
    )
    : (fb.realite_familles.problems as unknown as Array<{ title: string; description: string; fallback_icon?: string }>).map((p) => ({
      title: p.title,
      description: p.description,
      imageUrl: "",
      fallback_icon: p.fallback_icon,
    }));

  // Galerie
  const galerieImages = galerie?.images?.length ? galerie.images : null;
  const resolvedGalerie = galerieImages
    ? await Promise.all(
      galerieImages.map(async (img) => ({
        libelle: img.libelle,
        imageUrl: typeof img.image_mis_en_avant === "number"
          ? await resolveImageUrl(img.image_mis_en_avant)
          : getImageUrl(img.image_mis_en_avant),
      }))
    )
    : (fb.galerie.images as unknown as Array<{ libelle: string }>).map((img) => ({ libelle: img.libelle, imageUrl: "" }));

  // Pourquoi PUR Alpha existe
  const pourquoiImageUrl = await resolveImageUrl(pourquoi?.image_mise_en_avant ?? null);

  // Valeurs
  const resolvedValeurs = valeursItems
    ? await Promise.all(
      valeursItems.map(async (v, idx) => ({
        title: v.title,
        description: v.description,
        imageUrl: typeof v.image === "number"
          ? await resolveImageUrl(v.image)
          : getImageUrl(v.image),
        fallback_icon: (fb.valeurs.items as unknown as Array<{ fallback_icon?: string }>)[idx]?.fallback_icon,
      }))
    )
    : (fb.valeurs.items as unknown as Array<{ title: string; description: string; fallback_icon?: string }>).map((v) => ({
      title: v.title,
      description: v.description,
      imageUrl: "",
      fallback_icon: v.fallback_icon,
    }));

  // Impact local
  const impactBgUrl = await resolveImageUrl(impactLocal?.image_de_fond ?? null);
  const impactMapUrl = await resolveImageUrl(impactLocal?.image_mis_en_avant ?? null);
  const impactItems = impactLocal?.impacts?.length
    ? impactLocal.impacts
    : fb.impact_local.impacts;

  // CTA Final
  const ctaBgUrl = await resolveImageUrl(cta?.image_de_fond ?? null);

  return (
    <div className="flex flex-col w-full bg-white">
      <HistoireHero
        titleLine1={hero?.title_line_1 || fb.hero.title_line_1}
        titleHighlight={hero?.title_highlight || fb.hero.title_highlight}
        subtitle={hero?.subtitle || fb.hero.subtitle}
        description={hero?.description || fb.hero.description}
        quote={hero?.quote || fb.hero.quote}
        founderName={hero?.founder_name || fb.hero.founder_name}
        founderSubtitle={hero?.founder_subtitle || fb.hero.founder_subtitle}
      />

      <HistoireFondatrice
        sectionTag={fondatrice?.section_tag || fb.fondatrice.section_tag}
        title={fondatrice?.title || fb.fondatrice.title}
        titleHighlight={fondatrice?.title_highlight || fb.fondatrice.title_highlight}
        paragraph1={fondatrice?.paragraph_1 || fb.fondatrice.paragraph_1}
        paragraph2={fondatrice?.paragraph_2 || fb.fondatrice.paragraph_2}
        quote={fondatrice?.quote || fb.fondatrice.quote}
        quoteAuthor={fondatrice?.quote_author || fb.fondatrice.quote_author}
        imageCaption={fondatrice?.image_caption || fb.fondatrice.image_caption}
        imageUrl={fondatriceImageUrl}
      />

      <OriginNomSection
        title={(acf as Record<string, unknown>)?.origin_nom_title as string}
        titleHighlight={(acf as Record<string, unknown>)?.origin_nom_title_highlight as string}
        description={(acf as Record<string, unknown>)?.origin_nom_description as string}
        imageUrl={await resolveImageUrl((acf as Record<string, unknown>)?.origin_nom_image as number | null)}
      />

      <VecuMethodeSection
        title={(acf as Record<string, unknown>)?.vecu_methode_title as string}
        titleHighlight={(acf as Record<string, unknown>)?.vecu_methode_title_highlight as string}
        description={(acf as Record<string, unknown>)?.vecu_methode_description as string}
        items={(acf as Record<string, unknown>)?.vecu_methode_items as { ordre: number; titre: string; description: string }[]}
      />

      {/* <HistoireRealite
        title={realite?.title || fb.realite_familles.title}
        titleHighlight={realite?.title_highlight || fb.realite_familles.title_highlight}
        problems={resolvedProblems}
        puraSectionTag={pura?.section_tag || fb.syndrome_pura.section_tag}
        puraTitle={pura?.title || fb.syndrome_pura.title}
        puraDescription1={pura?.description_1 || fb.syndrome_pura.description_1}
        puraDescription2={pura?.description_2 || fb.syndrome_pura.description_2}
        puraBadgeText={pura?.badge_text || fb.syndrome_pura.badge_text}
      /> */}

      {/* <HistoireGalerie images={resolvedGalerie} /> */}

      {/* <HistoireModele
        tag={pourquoi?.tag || fb.pourquoi.tag}
        titreLigne1={pourquoi?.titre_ligne_1 || fb.pourquoi.titre_ligne_1}
        titleHighlight={pourquoi?.title_highlight || fb.pourquoi.title_highlight}
        descrition1={pourquoi?.descrition_1 || fb.pourquoi.descrition_1}
        description2={pourquoi?.description_2 || fb.pourquoi.description_2}
        notrePromesseValeur={pourquoi?.notre_promesse_valeur || fb.pourquoi.notre_promesse_valeur}
        notrePromesseLibelle={pourquoi?.notre_promesse_libelle || fb.pourquoi.notre_promesse_libelle}
        legende={pourquoi?.legende || fb.pourquoi.legende}
        imageUrl={pourquoiImageUrl}
        qualites={[...(pourquoi?.qualites || fb.pourquoi.qualites)]}
      /> */}

      {/* <HistoireMission
        sectionTag={mission?.section_tag || fb.mission.section_tag}
        description={mission?.description || fb.mission.description}
      /> */}

      <HistoireValeurs
        sectionTag={valeurs?.section_tag || fb.valeurs.section_tag}
        title={valeurs?.title || fb.valeurs.title}
        titleHighlight={valeurs?.title_highlight || fb.valeurs.title_highlight}
        items={resolvedValeurs}
      />

      {/* <HistoireTerritoire
        tag={impactLocal?.tag || fb.impact_local.tag}
        titre1={impactLocal?.titre_1 || fb.impact_local.titre_1}
        titleHighlight={impactLocal?.title_highlight || fb.impact_local.title_highlight}
        description={impactLocal?.description || fb.impact_local.description}
        impacts={[...impactItems]}
        backgroundImageUrl={impactBgUrl}
        mapImageUrl={impactMapUrl}
      /> */}

      {/* <HistoireAmbitions
        sectionTag={ambitions?.section_tag || fb.ambitions.section_tag}
        title={ambitions?.title || fb.ambitions.title}
        titleHighlight={ambitions?.title_highlight || fb.ambitions.title_highlight}
        description={ambitions?.description || fb.ambitions.description}
        items={[...(ambitionsItems || fb.ambitions.items)]}
      /> */}

      <HistoireCta
        citation={cta?.citation || fb.cta_final.citation}
        auteur={cta?.auteur || fb.cta_final.auteur}
        sousTitre={cta?.['sous-titre'] || fb.cta_final['sous-titre']}
        cta1Texte={cta?.cta_1_texte || fb.cta_final.cta_1_texte}
        cta1Url={cta?.cta_1_url || fb.cta_final.cta_1_url}
        cta2Texte={cta?.cta_2_texte || fb.cta_final.cta_2_texte}
        cta2Url={cta?.cta_2_url || fb.cta_final.cta_2_url}
        backgroundImageUrl={ctaBgUrl}
      />
    </div>
  );
}
