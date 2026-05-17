import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface ResteAChargeSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  imageUrl?: string;
  imageCaption?: string;
  ctaPrimaryText?: string;
  ctaPrimaryUrl?: string;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
}

const DEFAULTS = {
  title: "Comprendre votre reste à charge",
  titleHighlight: "avant de vous engager",
  description:
    "Le montant facturé n'est pas toujours le montant réellement supporté par la famille. Le reste à charge dépend du nombre d'heures prévues, du créneau d'intervention, des aides accordées et de votre situation fiscale. Avant toute signature, PUR Alpha réalise une estimation personnalisée pour vous permettre de visualiser clairement ce qui reste à payer, avec une information claire avant tout engagement.",
  imageCaption: "Chaque famille mérite une information claire et unique",
  ctaPrimaryText: "Demander une simulation personnalisée",
  ctaPrimaryUrl: "/contact",
  ctaSecondaryText: "Voir les aides mobilisables",
  ctaSecondaryUrl: "#dispositifs",
};

export function ResteAChargeSection({
  title,
  titleHighlight,
  description,
  imageUrl,
  imageCaption,
  ctaPrimaryText,
  ctaPrimaryUrl,
  ctaSecondaryText,
  ctaSecondaryUrl,
}: ResteAChargeSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative overflow-hidden shadow-xl w-full lg:w-[45%] shrink-0" style={{ borderRadius: "16px", minHeight: "490px", background: "lightgray 50% / cover no-repeat" }}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageCaption || DEFAULTS.imageCaption}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                  <span className="text-teal-500 text-lg font-medium">Image à venir</span>
                </div>
              )}
            {/* Ombre dégradée pour lisibilité de la légende */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            {/* Légende */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <p
                className="italic"
                style={{
                  color: "rgba(255, 255, 255, 0.55)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22.4px",
                }}
              >
                {imageCaption || DEFAULTS.imageCaption}
              </p>
            </div>
          </div>

          {/* Contenu */}
          <div>
            <h2
              className="font-extrabold mb-6"
              style={{
                color: "#1C3553",
                fontFamily: "Poppins, sans-serif",
                fontSize: "40px",
                fontWeight: 800,
                lineHeight: "48px",
              }}
            >
              {title || DEFAULTS.title}{" "}
              <span
                style={{
                  color: "#4ECDC4",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "40px",
                  fontWeight: 800,
                  lineHeight: "48px",
                }}
              >
                {titleHighlight || DEFAULTS.titleHighlight}
              </span>
            </h2>

            <p
              className="mb-10"
              style={{
                color: "#6B7280",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "29.6px",
              }}
            >
              {description || DEFAULTS.description}
            </p>

            <div className="flex flex-col gap-4">
              <Button
                variant="navy"
                className="w-fit rounded-lg"
                style={{ background: "#1C3553" }}
                href={ctaPrimaryUrl || DEFAULTS.ctaPrimaryUrl}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                {ctaPrimaryText || DEFAULTS.ctaPrimaryText}
              </Button>

              <Button
                variant="outline-navy"
                className="w-fit"
                href={ctaSecondaryUrl || DEFAULTS.ctaSecondaryUrl}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                {ctaSecondaryText || DEFAULTS.ctaSecondaryText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
