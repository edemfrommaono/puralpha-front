import { getContactPage } from "@/lib/wordpress";
import { ContactForm } from "@/components/sections/ContactForm";
import { CONTACT_FALLBACK } from "@/lib/fallback-data/contact";

export const revalidate = 0;

export default async function ContactPage() {
  const page = await getContactPage();
  const acf = page?.acf;
  const fb = CONTACT_FALLBACK;

  const hero = acf?.hero;
  const formulaire = acf?.formulaire;
  const coordonnees = acf?.coordonnees;
  const coordItems = coordonnees?.items?.length ? coordonnees.items : null;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#e8f4f8] to-white pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-navy-900 mb-6 font-['Playfair_Display']">
            {hero?.title || fb.hero.title} <span className="text-teal-400">{hero?.title_highlight || fb.hero.title_highlight}</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {hero?.description || fb.hero.description}
          </p>
        </div>
      </section>

      {/* Middle Section : Image & Formulaire */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-6xl mx-auto">
            {/* Image Placeholder */}
            <div className="hidden lg:block lg:w-1/2 relative rounded-[24px] overflow-hidden bg-gray-200 min-h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ecf4f6]/90 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                [Image: Intervenant accompagnant un enfant]
              </div>
            </div>

            {/* Formulaire (Client Component) */}
            <ContactForm formTitle={formulaire?.title || fb.formulaire.title} />
          </div>
        </div>
      </section>

      {/* Bottom Section : Coordonnées & Map */}
      <section className="bg-[#ecf4f6] py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-5xl mx-auto">
            {/* Infos Coordinates */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <h2 className="text-3xl font-bold text-navy-900 mb-2">
                {coordonnees?.title || fb.coordonnees.title}
              </h2>
              <div className="flex flex-col gap-6">
                {(coordItems || fb.coordonnees.items).map((item, i) => {
                  const hasImage = 'image' in item && item.image && typeof item.image === 'object' && 'url' in item.image && item.image.url;
                  const fbItem = fb.coordonnees.items[i];

                  return (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-400/20 transition-colors">
                        {hasImage ? (
                          <img src={(item.image as { url: string }).url} alt="" className="w-6 h-6 object-contain" />
                        ) : (
                          <span className="text-xl">{fbItem?.fallback_icon || "📌"}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                        <p className="font-semibold text-navy-900 text-base">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full lg:w-1/2">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-[24px] flex items-center justify-center text-gray-400 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-4xl mb-2 text-teal-500">📍</div>
                  <span className="font-medium text-navy-900 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">[Carte: 26 Rue des Sablons]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
