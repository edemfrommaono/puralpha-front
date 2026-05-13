import { Button } from "@/components/ui/Button";

export default function AidesFinancieresPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <section className="bg-[#ecf4f6] pt-32 pb-32 lg:pt-40 lg:pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy-800 leading-tight">
              L'accompagnement<br />
              que vous méritez,<br />
              <span className="text-teal-400">au juste prix.</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mt-2">
              Plusieurs dispositifs permettent de réduire significativement votre reste à charge. PUR Alpha vous aide à les identifier et à les mobiliser.
            </p>
          </div>
          
          {/* Hero Badges */}
          <div className="mt-16 flex flex-col md:flex-row flex-wrap justify-center gap-6 relative z-20">
            {/* Badge 1 */}
            <div className="bg-white border border-gray-100 shadow-sm px-6 py-4 rounded-full flex items-center gap-4">
              <span className="text-2xl font-black text-teal-400">38€</span>
              <span className="text-sm font-medium text-gray-600">tarif horaire TTC unique</span>
            </div>
            {/* Badge 2 */}
            <div className="bg-white border border-gray-100 shadow-sm px-6 py-4 rounded-full flex items-center gap-4">
              <span className="text-2xl font-black text-teal-400">50%</span>
              <span className="text-sm font-medium text-gray-600">crédit d'impôt garanti</span>
            </div>
            {/* Badge 3 */}
            <div className="bg-white border border-gray-100 shadow-sm px-6 py-4 rounded-full flex items-center gap-4">
              <span className="text-2xl font-black text-teal-400">≈6,70€</span>
              <span className="text-sm font-medium text-gray-600">reste à charge avec PCH</span>
            </div>
          </div>
        </div>
        
        {/* Background Typography */}
        <div className="absolute top-1/2 left-[80%] -translate-y-1/2 text-[150px] sm:text-[200px] lg:text-[260px] font-black text-teal-400/[0.04] leading-none select-none pointer-events-none whitespace-nowrap">
          50%
        </div>
      </section>

      {/* 2. Les 4 aides (Dispositifs mobilisables) */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Dispositifs mobilisables</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              Les 4 aides qui peuvent<br />
              <span className="text-teal-400">changer tout</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Ces aides sont cumulables dans certains cas. PUR Alpha vous accompagne pour évaluer ce à quoi vous avez droit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carte 1 : PCH */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden pt-10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-teal-400" />
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-teal-400/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">🤝</div>
                <div>
                  <h3 className="text-2xl font-black text-navy-800 leading-tight">PCH</h3>
                  <p className="text-sm text-gray-500 mt-1">Prestation de Compensation du Handicap</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                Prise en charge totale ou partielle selon le plan MDPH attribué. C'est l'aide principale pour les familles d'enfants handicapés — elle peut couvrir une grande partie du coût horaire.
              </p>
              <div className="bg-[#ecf4f6] rounded-xl p-4 flex items-center justify-between">
                <span className="text-xl font-extrabold text-teal-400">≈ 24,58 €/h</span>
                <span className="text-xs text-gray-500">référence horaire 2024</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-teal-400/10 text-teal-600 text-xs font-semibold rounded-full">MDPH</span>
                <span className="px-3 py-1.5 bg-teal-400/10 text-teal-600 text-xs font-semibold rounded-full">Aide humaine</span>
                <span className="px-3 py-1.5 bg-teal-400/10 text-teal-600 text-xs font-semibold rounded-full">0–60 ans</span>
              </div>
            </div>

            {/* Carte 2 : Crédit impôt */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden pt-10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-500" />
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">💰</div>
                <div>
                  <h3 className="text-2xl font-black text-gold-500 leading-tight">50%</h3>
                  <p className="text-sm text-gray-500 mt-1">Crédit d'impôt SAP — Art. 199 sexdecies CGI</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                Vous récupérez 50% des sommes versées, même si vous n'êtes pas imposable. C'est une aide universelle, automatique, sans démarche complexe.
              </p>
              <div className="bg-gold-500/10 rounded-xl p-4 flex items-center justify-between">
                <span className="text-xl font-extrabold text-gold-500">50% remboursés</span>
                <span className="text-xs text-gray-500">sur toutes les prestations SAP</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gold-500/10 text-[#b8860b] text-xs font-semibold rounded-full">Déclaration impôts</span>
                <span className="px-3 py-1.5 bg-gold-500/10 text-[#b8860b] text-xs font-semibold rounded-full">Non-imposables inclus</span>
              </div>
            </div>

            {/* Carte 3 : AEEH */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden pt-10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-navy-800" />
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-navy-800/5 rounded-2xl flex items-center justify-center text-2xl shrink-0">👶</div>
                <div>
                  <h3 className="text-2xl font-black text-navy-800 leading-tight">AEEH</h3>
                  <p className="text-sm text-gray-500 mt-1">Allocation d'Éducation de l'Enfant Handicapé</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                Versée par la CAF, elle peut s'ajouter à la PCH ou la remplacer selon les situations. Elle comprend une allocation de base et jusqu'à 6 compléments selon le degré de handicap.
              </p>
              <div className="bg-[#ecf4f6] rounded-xl p-4 flex items-center justify-between">
                <span className="text-xl font-extrabold text-teal-400">CAF</span>
                <span className="text-xs text-gray-500">selon taux d'incapacité</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-teal-400/10 text-teal-600 text-xs font-semibold rounded-full">0–20 ans</span>
                <span className="px-3 py-1.5 bg-teal-400/10 text-teal-600 text-xs font-semibold rounded-full">6 compléments</span>
                <span className="px-3 py-1.5 bg-teal-400/10 text-teal-600 text-xs font-semibold rounded-full">Cumulable CI</span>
              </div>
            </div>

            {/* Carte 4 : Aides facultatives */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden pt-10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-500" />
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">🏛️</div>
                <div>
                  <h3 className="text-2xl font-black text-navy-800 leading-tight">Aides +</h3>
                  <p className="text-sm text-gray-500 mt-1">Aides facultatives & locales</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                D'autres dispositifs peuvent s'ajouter selon votre situation : aides de la CAF, du CCAS, de votre mutuelle, ou des fonds de solidarité départementaux. PUR Alpha vous aide à les identifier.
              </p>
              <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                <span className="text-xl font-extrabold text-gray-600">Variable</span>
                <span className="text-xs text-gray-500">selon situation et territoire</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">CAF</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">CCAS</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Mutuelles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tarification */}
      <section className="py-20 lg:py-32 relative bg-navy-800 text-white overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-teal-400/80 font-bold text-xs uppercase tracking-[3px]">Notre tarification</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-white mt-4 leading-tight">
              Un tarif unique.<br />
              <span className="text-gold-500">Aucune surprise.</span>
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 text-center mb-16">
            <div className="flex items-center justify-center gap-1">
              <span className="text-7xl lg:text-[80px] font-black text-gold-500 leading-none">38</span>
              <span className="text-3xl font-black text-gold-500 self-start mt-2">€</span>
            </div>
            <p className="text-white/50 mt-4">TTC / heure · TVA 5,5% · Tarif tout compris</p>
            
            {/* Badges Inclus */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> Recrutement & sélection
              </span>
              <span className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> Formation 70h
              </span>
              <span className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> Référent famille
              </span>
              <span className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> Cahier de liaison
              </span>
              <span className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> Assurance RC Pro
              </span>
              <span className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> Gestion des remplacements
              </span>
              <span className="px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-white/70 text-xs rounded-full flex items-center gap-2">
                <span className="text-teal-400">✓</span> Attestation fiscale annuelle
              </span>
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-white/5">
                  <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Créneau</th>
                  <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Tarif TTC</th>
                  <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Aide PCH</th>
                  <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Crédit d'impôt 50%</th>
                  <th className="py-4 px-6 text-xs font-bold text-white/50 uppercase tracking-[2px]">Reste à charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="bg-teal-400/5">
                  <td className="py-4 px-6 text-sm font-semibold text-white">Semaine — 7h à 22h</td>
                  <td className="py-4 px-6 text-sm text-white/60">38,00 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">24,58 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">sur le reste</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gold-500">6,71 €/h</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-semibold text-white/80">Nuit — 22h à 7h</td>
                  <td className="py-4 px-6 text-sm text-white/60">49,40 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">24,58 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">sur le reste</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gold-500">12,41 €/h</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-semibold text-white/80">Dimanche (≤ 2/mois)</td>
                  <td className="py-4 px-6 text-sm text-white/60">41,80 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">24,58 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">sur le reste</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gold-500">8,61 €/h</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-semibold text-white/80">Jours fériés ordinaires</td>
                  <td className="py-4 px-6 text-sm text-white/60">41,80 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">24,58 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">sur le reste</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gold-500">8,61 €/h</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-semibold text-white/80">1er mai / 25 déc.</td>
                  <td className="py-4 px-6 text-sm text-white/60">76,00 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">24,58 €</td>
                  <td className="py-4 px-6 text-sm text-white/60">sur le reste</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gold-500">25,71 €/h</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-white/30 mt-6">
            Tarifs TTC TVA 5,5%. Référence PCH indicative : ≈ 24,58 €/h (2024). Crédit d'impôt calculé sur le reste après PCH.
          </p>
        </div>
      </section>

      {/* 4. Simulateur */}
      <section className="bg-[#ecf4f6] py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Simulateur</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              Estimez votre<br />
              <span className="text-teal-400">reste à charge</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Ces estimations sont indicatives. Une simulation personnalisée est réalisée avant toute signature de contrat.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col gap-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Input Heures */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Heures par mois</label>
                <div className="bg-[#ecf4f6] border border-gray-100 rounded-xl px-4 py-3">
                  <span className="text-gray-400 text-sm">ex : 40</span>
                </div>
              </div>
              
              {/* Input Créneau */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Créneau principal</label>
                <div className="bg-[#ecf4f6] border border-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
                  <span className="text-navy-800 text-sm">Semaine (38€/h)</span>
                  <span className="text-gray-400 text-xs">▼</span>
                </div>
              </div>
            </div>

            {/* Radio PCH */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Bénéficiez-vous de la PCH ?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center" />
                  <span className="text-gray-600 text-sm">Oui</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center" />
                  <span className="text-gray-600 text-sm">Non</span>
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
               <Button variant="primary" className="w-full sm:w-auto px-8 pointer-events-none opacity-80">
                 Calculer mon reste à charge
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Accompagnement admin */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[3px]">Accompagnement administratif</span>
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-navy-800 mt-4 leading-tight">
              Vous n'êtes pas <span className="text-teal-400">seuls</span><br />
              dans les démarches
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              PUR Alpha vous accompagne dans l'identification et le montage des dossiers d'aides. Parce que la complexité administrative ne doit pas être un frein.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-teal-400/10 leading-none absolute top-4 right-4">01</span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10 mt-8">Identification des aides</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                Nous analysons votre situation pour identifier toutes les aides auxquelles vous avez droit : PCH, AEEH, crédit d'impôt, aides locales.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-teal-400/10 leading-none absolute top-4 right-4">02</span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10 mt-8">Simulation personnalisée</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                Avant toute signature, une simulation précise de votre reste à charge est réalisée en tenant compte de votre plan MDPH et de votre situation fiscale.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <span className="text-[60px] font-black text-teal-400/10 leading-none absolute top-4 right-4">03</span>
              <h3 className="font-bold text-navy-800 text-lg relative z-10 mt-8">Soutien aux dossiers</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                Nous vous fournissons tous les documents nécessaires (devis, attestations, factures) et vous orientons vers les bons interlocuteurs pour vos demandes.
              </p>
            </div>
          </div>

          {/* Modalités : Facturation / Paiement / Annulation */}
          <div className="mt-16 bg-[#ecf4f6] rounded-3xl p-8 lg:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">Facturation</span>
              <h4 className="text-navy-800 font-bold text-[15px]">Mensuelle & détaillée</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mt-1">
                Émission en fin de mois, détail clair des heures et prestations réalisées. Par email ou courrier.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">Paiement</span>
              <h4 className="text-navy-800 font-bold text-[15px]">Plusieurs options</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mt-1">
                Virement bancaire, prélèvement SEPA sécurisé, CESU préfinancé accepté. Pas d'espèces.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-teal-400 font-bold text-[11px] uppercase tracking-[2px]">Annulation</span>
              <h4 className="text-navy-800 font-bold text-[15px]">Préavis 48h</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mt-1">
                Annulation ≥ 48h : heures non facturées.<br />
                Annulation &lt; 48h : heures dues sauf urgence avérée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Final */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-800 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800/80 to-navy-800/80 z-10" />
        <div className="absolute inset-0 bg-gray-200 z-0" /> {/* Placeholder Image */}
        
        <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
          <h2 className="text-3xl lg:text-[42px] font-black text-white mb-6 leading-tight max-w-4xl">
            Parce que votre enfant mérite <span className="text-white">un accompagnement </span><br className="hidden md:block"/>
            <span className="text-gold-500">à la hauteur de ses besoins.</span>
          </h2>
          <p className="text-white/85 text-xl mb-12 max-w-3xl leading-relaxed">
            Et parce que prendre soin de son enfant, c'est aussi prendre soin de vous.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Devis gratuit
            </div>
            <span className="hidden sm:block text-white/25 text-lg">·</span>
            <div className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Sans engagement
            </div>
            <span className="hidden sm:block text-white/25 text-lg">·</span>
            <div className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Réponse sous 48h
            </div>
          </div>

          <Button variant="primary" size="lg" href="/contact" className="px-10 shadow-[0px_4px_15px_0px_rgba(242,201,76,0.3)]">
            Prendre contact
          </Button>
        </div>
      </section>
    </div>
  );
}
