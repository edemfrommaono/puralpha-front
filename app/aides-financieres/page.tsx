import { Button } from "@/components/ui/Button";

export default function AidesFinancieresPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Page Header */}
      <section className="bg-navy-800 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-6">Les aides financières</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Comprendre les dispositifs de financement pour l'accompagnement de votre enfant à domicile.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="lg:col-span-8 flex flex-col gap-12">
              <div>
                <h2 className="text-3xl font-black text-navy-800 mb-6">Des solutions pour alléger votre budget</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Faire appel à un service d'aide à domicile pour un enfant en situation de handicap représente un coût. Heureusement, plusieurs dispositifs existent pour vous aider à financer ces prestations.
                </p>
              </div>

              {/* PCH */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-navy-800 mb-4">La PCH (Prestation de Compensation du Handicap)</h3>
                <p className="text-gray-600 mb-4">
                  Versée par le Conseil Départemental (MDPH), la PCH aide humaine peut prendre en charge tout ou partie des frais liés à l'intervention d'un tiers pour les actes essentiels de la vie.
                </p>
                <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide">Éligibilité et montant évalués par la MDPH.</p>
              </div>

              {/* AEEH */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-navy-800 mb-4">L'AEEH et ses compléments</h3>
                <p className="text-gray-600 mb-4">
                  L'Allocation d'Éducation de l'Enfant Handicapé (AEEH) et ses compléments (versés par la CAF ou la MSA) peuvent aider à financer les surcoûts liés au handicap, y compris la garde à domicile.
                </p>
                <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide">Attribuée par la CDAPH (MDPH).</p>
              </div>

              {/* CMG */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-navy-800 mb-4">Le CMG (Complément de Libre Choix du Mode de Garde)</h3>
                <p className="text-gray-600 mb-4">
                  Si votre enfant a moins de 6 ans, vous pouvez éventuellement bénéficier du CMG structure. En cas de handicap, les plafonds peuvent être majorés.
                </p>
                <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide">Sous conditions, se renseigner auprès de la CAF.</p>
              </div>

              {/* Crédit d'impôt */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-navy-800 mb-4">Le crédit d'impôt de 50%</h3>
                <p className="text-gray-600 mb-4">
                  En faisant appel à PUR Alpha (service à la personne), vous pouvez bénéficier d'un crédit d'impôt de 50% sur les dépenses engagées, dans la limite des plafonds légaux.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-navy-800 rounded-3xl p-8 text-white sticky top-32">
                <h3 className="text-xl font-bold mb-4">Besoin d'aide pour vos démarches ?</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-8">
                  Les dossiers administratifs peuvent être complexes. Notre équipe peut vous orienter vers les bons interlocuteurs et vous accompagner dans la constitution de vos dossiers de financement.
                </p>
                <Button variant="gold" className="w-full justify-center" href="/contact">
                  Nous contacter
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
