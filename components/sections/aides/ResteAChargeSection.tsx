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
  title: "",
  titleHighlight: "",
  description: "",
  imageCaption: "",
  ctaPrimaryText: "",
  ctaPrimaryUrl: "/contact",
  ctaSecondaryText: "",
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
  if (!title && !titleHighlight && !description && !imageUrl && !ctaPrimaryText && !ctaSecondaryText) return null;

  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Image */}
          {(imageUrl || imageCaption || DEFAULTS.imageCaption) && (
            <div className="relative overflow-hidden shadow-xl w-full lg:w-[45%] shrink-0 min-h-[350px] lg:min-h-[490px]" style={{ borderRadius: "16px", background: "lightgray 50% / cover no-repeat" }}>
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
              {(imageCaption || DEFAULTS.imageCaption) && (
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
              )}
            </div>
          )}

          {/* Contenu */}
          <div>
            {(title || titleHighlight) && (
              <h2
                className="font-extrabold mb-4 lg:mb-6 text-3xl md:text-4xl lg:text-[40px] leading-tight lg:leading-[48px]"
                style={{
                  color: "#1C3553",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {title}{" "}
                {titleHighlight && (
                  <span
                    className="text-3xl md:text-4xl lg:text-[40px] leading-tight lg:leading-[48px]"
                    style={{
                      color: "#F2C94C",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {titleHighlight}
                  </span>
                )}
              </h2>
            )}

            {description && (
              <p
                className="mb-8 lg:mb-10 text-[15px] lg:text-[16px] leading-relaxed lg:leading-[29.6px]"
                style={{
                  color: "#6B7280",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {description}
              </p>
            )}

            <div className="flex flex-col gap-4">
              {(ctaPrimaryText || DEFAULTS.ctaPrimaryText) && (
                <Button
                  variant="navy"
                  className="w-fit rounded-lg"
                  style={{ background: "#1C3553" }}
                  href={ctaPrimaryUrl || DEFAULTS.ctaPrimaryUrl}
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  {ctaPrimaryText || DEFAULTS.ctaPrimaryText}
                </Button>
              )}
{/* 
              {(ctaSecondaryText || DEFAULTS.ctaSecondaryText) && (
                <Button
                  variant="outline-navy"
                  className="w-fit"
                  href={ctaSecondaryUrl || DEFAULTS.ctaSecondaryUrl}
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  {ctaSecondaryText || DEFAULTS.ctaSecondaryText}
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
