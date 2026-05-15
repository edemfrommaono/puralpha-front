import { ContactForm } from "@/components/sections/ContactForm";

interface ContactFormulaireProps {
  formTitle: string;
  imageUrl?: string;
}

export function ContactFormulaire({ formTitle, imageUrl }: ContactFormulaireProps) {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="hidden lg:block lg:w-1/2 relative rounded-[24px] overflow-hidden bg-gray-200 min-h-[600px]">
            {imageUrl ? (
              <>
                <img src={imageUrl} alt="Accompagnement" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ecf4f6]/90 z-10" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ecf4f6]/90 z-10" />
            )}
          </div>

          {/* Formulaire (Client Component) */}
          <ContactForm formTitle={formTitle} />
        </div>
      </div>
    </section>
  );
}
