export function RejoindreProcess() {
  return (
    <section className="w-full py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Process de recrutement</p>
          <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
            Simple, <span className="text-teal-400 italic">transparent</span>, humain
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {[
            { num: "1", title: "Candidature", desc: "Via le formulaire ci-dessous ou par email à contact@puralpha.fr" },
            { num: "2", title: "Entretien individuel", desc: "Échange humain pour nous découvrir mutuellement. Vérification des références et du casier judiciaire." },
            { num: "3", title: "Formation 70h", desc: "Formation obligatoire avant toute mission. Handicap, bientraitance, sécurité, gestes du quotidien." },
            { num: "4", title: "Première mission", desc: "Matching soigné avec la famille. Passation accompagnée. Votre référent est là dès le départ." },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4">
              <div className={`w-[60px] h-[60px] rounded-[30px] ${i === 0 ? "border border-teal-400" : "bg-white border-2 border-teal-400 shadow-sm"} flex items-center justify-center mb-4`}>
                {i === 3 ? <span className="text-[24px]">🚀</span> : <span className="text-[22px] font-extrabold text-teal-400">{step.num}</span>}
              </div>
              <h3 className="text-sm font-bold text-navy-800 mb-2">{step.title}</h3>
              <p className="text-[13px] text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
