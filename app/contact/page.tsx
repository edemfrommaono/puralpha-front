import { getContactPage, resolveImageUrl } from "@/lib/wordpress";
import { CONTACT_FALLBACK } from "@/lib/fallback-data/contact";
import {
  ContactHero,
  ContactFormulaire,
  ContactCoordonnees,
} from "@/components/sections/contact";

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

export default async function ContactPage() {
  const page = await getContactPage();
  const acf = page?.acf;
  const fb = CONTACT_FALLBACK;

  const hero = acf?.hero;
  const formulaire = acf?.formulaire;
  const coordonnees = acf?.coordonnees;
  const coordItems = coordonnees?.items?.length ? coordonnees.items : null;

  // Résolution images
  const formulaireImageUrl = typeof formulaire?.image === "number"
    ? await resolveImageUrl(formulaire.image)
    : getImageUrl(formulaire?.image);

  const resolvedCoordItems = coordItems
    ? await Promise.all(
        coordItems.map(async (item, i) => ({
          label: item.label,
          value: item.value,
          imageUrl: typeof item.image === "number"
            ? await resolveImageUrl(item.image)
            : getImageUrl(item.image),
          fallback_icon: (fb.coordonnees.items as unknown as Array<{ fallback_icon?: string }>)[i]?.fallback_icon,
        }))
      )
    : (fb.coordonnees.items as unknown as Array<{ label: string; value: string; fallback_icon?: string }>).map((item) => ({
        label: item.label,
        value: item.value,
        imageUrl: "",
        fallback_icon: item.fallback_icon,
      }));

  return (
    <div className="flex flex-col w-full bg-white">
      <ContactHero
        title={hero?.title || fb.hero.title}
        titleHighlight={hero?.title_highlight || fb.hero.title_highlight}
        description={hero?.description || fb.hero.description}
      />

      <ContactFormulaire
        formTitle={formulaire?.title || fb.formulaire.title}
        imageUrl={formulaireImageUrl}
        notes={formulaire?.notes || fb.formulaire.notes}
      />

      <ContactCoordonnees
        title={coordonnees?.title || fb.coordonnees.title}
        items={resolvedCoordItems}
      />
    </div>
  );
}
