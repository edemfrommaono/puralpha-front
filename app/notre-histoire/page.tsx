import { getNotreHistoirePage, resolveImageUrl } from "@/lib/wordpress";
import { NOTRE_HISTOIRE_FALLBACK } from "@/lib/fallback-data/notre-histoire";
import {
  HistoireHero,
  HistoireRelais,
  HistoireQuotidien,
  HistoireVideo,
  HistoireConstruire,
  HistoireExperience,
  HistoireMethode,
  HistoireValeurs,
  HistoireCitation,
} from "@/components/sections/histoire";

export const revalidate = 0;

export default async function NotreHistoirePage() {
  const page = await getNotreHistoirePage();
  const acf = page?.acf;
  const fb = NOTRE_HISTOIRE_FALLBACK;

  const hero = acf?.hero;
  const relais = acf?.relais;
  const galerie = acf?.galerie;
  const video = acf?.video;
  const construction = acf?.construction;
  const experience = acf?.experience;
  const methode = acf?.methode;
  const valeurs = acf?.valeurs;
  const citation = acf?.citation_finale;

  // ── Résolution des images côté serveur ──
  const heroPhotoUrl = await resolveImageUrl(hero?.photo ?? null);
  const relaisImageUrl = await resolveImageUrl(relais?.image ?? null);
  const constructionImageUrl = await resolveImageUrl(
    construction?.image ?? null
  );

  // ── Galerie « Matthew et moi, au quotidien » (fallback : emplacements réservés) ──
  const galeriePhotos = galerie?.photos?.length
    ? await Promise.all(
        galerie.photos.map(async (p) => ({
          libelle: p.libelle || fb.galerie.photos[0].libelle,
          note: p.note || fb.galerie.photos[0].note,
          imageUrl: await resolveImageUrl(p.photo ?? null),
        }))
      )
    : fb.galerie.photos.map((p) => ({
        libelle: p.libelle,
        note: p.note,
        imageUrl: "",
      }));

  // ── Chiffres clés « Expérience » ──
  const experienceStats = (
    experience?.stats?.length ? experience.stats : fb.experience.stats
  ).map((s) => ({ chiffre: s.chiffre, description: s.description }));

  // ── Étapes « Méthode » ──
  const methodeEtapes = (
    methode?.etapes?.length ? methode.etapes : fb.methode.etapes
  ).map((e) => ({ titre: e.titre }));

  // ── Cartes « Valeurs » ──
  const valeursItems = valeurs?.items?.length
    ? await Promise.all(
        valeurs.items.map(async (v) => ({
          titre: v.titre,
          imageUrl: await resolveImageUrl(v.image ?? null),
        }))
      )
    : fb.valeurs.items.map((v) => ({ titre: v.titre, imageUrl: "" }));

  return (
    <main className="bg-white">
      {/* 1. Hero — « Pourquoi PUR Alpha existe » */}
      <HistoireHero
        sectionTag={hero?.section_tag || fb.hero.section_tag}
        title={hero?.title || fb.hero.title}
        titleHighlight={hero?.title_highlight || fb.hero.title_highlight}
        description={hero?.description || fb.hero.description}
        quote={hero?.quote || fb.hero.quote}
        founderName={hero?.founder_name || fb.hero.founder_name}
        founderRole={hero?.founder_role || fb.hero.founder_role}
        photoUrl={heroPhotoUrl}
        photoLegende={hero?.photo_legende || fb.hero.photo_legende}
        photoNote={hero?.photo_note || fb.hero.photo_note}
      />

      {/* 2. « Quand trouver un relais devient un parcours » */}
      <HistoireRelais
        title={relais?.title || fb.relais.title}
        titleHighlight={relais?.title_highlight || fb.relais.title_highlight}
        paragraph1={relais?.paragraph_1 || fb.relais.paragraph_1}
        paragraph2={relais?.paragraph_2 || fb.relais.paragraph_2}
        paragraphHighlight={
          relais?.paragraph_highlight || fb.relais.paragraph_highlight
        }
        imageUrl={relaisImageUrl}
        imageAlt={relais?.image_alt || fb.relais.image_alt}
      />

      {/* 3. Carrousel « Matthew et moi, au quotidien » */}
      <HistoireQuotidien
        title={galerie?.title || fb.galerie.title}
        titleHighlight={galerie?.title_highlight || fb.galerie.title_highlight}
        photos={galeriePhotos}
      />

      {/* 4. Vidéo « Notre histoire, racontée de vive voix » */}
      <HistoireVideo
        title={video?.title || fb.video.title}
        titleHighlight={video?.title_highlight || fb.video.title_highlight}
        description={video?.description || fb.video.description}
        videoUrl={video?.video_url || ""}
        placeholderLabel={video?.placeholder_label || fb.video.placeholder_label}
        placeholderNote={video?.placeholder_note || fb.video.placeholder_note}
      />

      {/* 5. « Ce qui manquait, j'ai décidé de le construire » */}
      <HistoireConstruire
        title={construction?.title || fb.construction.title}
        titleHighlight={
          construction?.title_highlight || fb.construction.title_highlight
        }
        paragraph1={construction?.paragraph_1 || fb.construction.paragraph_1}
        paragraph2={construction?.paragraph_2 || fb.construction.paragraph_2}
        paragraphHighlight={
          construction?.paragraph_highlight ||
          fb.construction.paragraph_highlight
        }
        imageUrl={constructionImageUrl}
        imageAlt={construction?.image_alt || fb.construction.image_alt}
      />

      {/* 6. « Une expérience personnelle, mais aussi professionnelle » */}
      <HistoireExperience
        title={experience?.title || fb.experience.title}
        titleHighlight={
          experience?.title_highlight || fb.experience.title_highlight
        }
        stats={experienceStats}
        paragraph1={experience?.paragraph_1 || fb.experience.paragraph_1}
        paragraphHighlight={
          experience?.paragraph_highlight || fb.experience.paragraph_highlight
        }
      />

      {/* 7. « Du vécu à une méthode » */}
      <HistoireMethode
        title={methode?.title || fb.methode.title}
        titleHighlight={methode?.title_highlight || fb.methode.title_highlight}
        description={methode?.description || fb.methode.description}
        etapes={methodeEtapes}
      />

      {/* 8. « Ce qui guide PUR Alpha » (valeurs) */}
      <HistoireValeurs
        sectionTag={valeurs?.section_tag || fb.valeurs.section_tag}
        title={valeurs?.title || fb.valeurs.title}
        titleHighlight={valeurs?.title_highlight || fb.valeurs.title_highlight}
        items={valeursItems}
      />

      {/* 9. Citation finale + CTA */}
      <HistoireCitation
        citation={citation?.citation || fb.citation_finale.citation}
        auteur={citation?.auteur || fb.citation_finale.auteur}
        role={citation?.role || fb.citation_finale.role}
        ctaTexte={citation?.cta_texte || fb.citation_finale.cta_texte}
        ctaUrl={citation?.cta_url || fb.citation_finale.cta_url}
      />
    </main>
  );
}
