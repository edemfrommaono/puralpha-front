export function RejoindreFormation() {
  return (
    <section className="w-full py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">Formation &amp; accompagnement</p>
          <h2 className="text-3xl md:text-[38px] font-extrabold text-navy-800 mb-6">
            Vous êtes <span className="text-teal-400">formés et encadrés</span> dès le premier jour
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chez PUR Alpha, aucun intervenant ne commence sans une formation spécialisée. Parce que les enfants méritent des professionnels préparés.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-400 to-gold-500 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {[
              { icon: <span className="text-[22px] font-extrabold text-teal-400">70h</span>, title: "Formation initiale", desc: "Handicap, bientraitance, sécurité, gestes du quotidien. Obligatoire avant toute première mission." },
              { icon: <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, title: "Référent dédié", desc: "Un interlocuteur unique tout au long de votre mission. Points réguliers, écoute, réajustements." },
              { icon: <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Supervision terrain", desc: "Suivi régulier sur le terrain, accompagnement qualité permanent. Vous n'êtes jamais seul(e)." },
              { icon: <span className="text-[26px] font-black text-teal-400">∞</span>, title: "Formation continue", desc: "Actualisation régulière des compétences. PUR Alpha investit dans votre montée en compétences." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[32px] bg-white border-2 border-teal-400 shadow-[0_4px_8px_rgba(78,205,196,0.18)] flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
