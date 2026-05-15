interface RejoindreFormulaireProps {
  sectionTag: string;
  title: string;
  description: string;
  submitText: string;
  emailFallback: string;
}

export function RejoindreFormulaire({
  sectionTag, title, description, submitText, emailFallback,
}: RejoindreFormulaireProps) {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-[#1c3553] to-[#2faaa1]">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-white/55 font-bold text-xs tracking-[3px] uppercase mb-4">{sectionTag}</p>
          <h2 className="text-3xl md:text-[44px] font-extrabold text-white mb-6 leading-tight">{title}</h2>
          <p className="text-white/65 text-lg">{description}</p>
        </div>

        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_20px_30px_rgba(30,58,95,0.12)]">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Prénom *</label>
                <input type="text" placeholder="Votre prénom" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Nom *</label>
                <input type="text" placeholder="Votre nom" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Email *</label>
                <input type="email" placeholder="votre@email.fr" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Téléphone</label>
                <input type="tel" placeholder="06 XX XX XX XX" className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Expérience avec le handicap</label>
              <select className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none">
                <option value="">Sélectionnez...</option>
                <option value="none">Aucune</option>
                <option value="personal">Personnelle</option>
                <option value="professional">Professionnelle</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Pourquoi rejoindre PUR Alpha ?</label>
              <textarea rows={4} placeholder="Présentez-vous en quelques lignes..." className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(30,58,95,0.3)]">
              {submitText}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              Ou envoyez directement votre CV à <a href={`mailto:${emailFallback}`} className="font-bold text-navy-800">{emailFallback}</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
