export default function HistoirePage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Page Header */}
      <section className="bg-navy-800 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-6">Notre histoire</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Découvrez les origines de PUR Alpha et ce qui anime notre engagement quotidien auprès des familles et de leurs enfants.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <h2 className="text-3xl font-black text-navy-800">Pourquoi PUR Alpha ?</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              PUR Alpha est né d'un constat simple mais profond : les familles ayant un enfant en situation de handicap manquent cruellement de solutions de répit fiables et spécialisées. 
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Trouver une personne de confiance pour garder son enfant quelques heures, pouvoir aller travailler l'esprit serein ou simplement prendre du temps pour soi ne devrait pas être un parcours du combattant.
            </p>
            
            <div className="my-8 p-8 border-l-4 border-teal-400 bg-gray-50 rounded-r-2xl">
              <p className="text-xl font-semibold text-navy-800 italic">
                "Notre mission est de redonner de l'air aux familles tout en offrant un accompagnement de qualité, sécurisant et bienveillant pour chaque enfant."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-navy-800 mt-8">Nos valeurs fondatrices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-teal-400 text-3xl mb-4">🤝</div>
                <h4 className="font-bold text-navy-800 mb-2">Bientraitance</h4>
                <p className="text-gray-600 text-sm">Le respect inconditionnel de la personne, de son rythme et de sa dignité.</p>
              </div>
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-teal-400 text-3xl mb-4">🛡️</div>
                <h4 className="font-bold text-navy-800 mb-2">Sécurité</h4>
                <p className="text-gray-600 text-sm">Des professionnels formés, un encadrement rigoureux et des protocoles clairs.</p>
              </div>
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-teal-400 text-3xl mb-4">✅</div>
                <h4 className="font-bold text-navy-800 mb-2">Simplicité</h4>
                <p className="text-gray-600 text-sm">Une gestion administrative allégée pour que vous puissiez vous concentrer sur l'essentiel.</p>
              </div>
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-teal-400 text-3xl mb-4">👁️</div>
                <h4 className="font-bold text-navy-800 mb-2">Transparence</h4>
                <p className="text-gray-600 text-sm">Une communication ouverte et honnête sur nos prestations et nos tarifs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
