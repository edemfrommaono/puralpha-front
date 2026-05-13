import { Button } from "@/components/ui/Button";

export default function FamillesPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Page Header */}
      <section className="bg-navy-800 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-6">Pour les familles</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Un accompagnement sur-mesure pour votre enfant, pour vous permettre de souffler et de trouver un équilibre au quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-black text-navy-800">Un soutien adapté à chaque situation</h2>
              <p className="text-gray-600 leading-relaxed">
                Chez PUR Alpha, nous savons que chaque enfant est unique, tout comme les besoins de sa famille. C’est pourquoi nous prenons le temps d’évaluer vos attentes lors d’une première visite à domicile.
              </p>
              <ul className="flex flex-col gap-4 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">❖</span>
                  <span className="text-gray-700"><strong>Garde spécialisée :</strong> Des intervenants formés aux différents types de handicap (TSA, TND, polyhandicap, etc.).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">❖</span>
                  <span className="text-gray-700"><strong>Aide aux actes essentiels :</strong> Repas, toilette, habillage, toujours dans le respect du rythme de l'enfant.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">❖</span>
                  <span className="text-gray-700"><strong>Accompagnements extérieurs :</strong> Trajets vers l'école, les rendez-vous médicaux ou les loisirs.</span>
                </li>
              </ul>
            </div>
            <div className="bg-teal-50 rounded-3xl p-8 lg:p-12 relative">
              <h3 className="text-xl font-bold text-navy-800 mb-4">Notre promesse</h3>
              <p className="text-gray-700 italic leading-relaxed mb-6">
                "Offrir un relais de confiance aux parents et un cadre sécurisant et stimulant pour l'enfant."
              </p>
              <Button variant="navy" href="/contact">
                Demander un devis
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
