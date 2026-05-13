"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'un appel API (WordPress future)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#e8f4f8] to-white pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-navy-900 mb-6 font-['Playfair_Display']">
            Prenons <span className="text-teal-400">contact</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Tout commence par une écoute. Parlez-nous de votre situation.
          </p>
        </div>
      </section>

      {/* Middle Section : Image & Formulaire */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-6xl mx-auto">
            
            {/* Image Placeholder */}
            <div className="hidden lg:block lg:w-1/2 relative rounded-[24px] overflow-hidden bg-gray-200 min-h-[600px]">
              {/* Gradient Overlay pour correspondre à la maquette */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ecf4f6]/90 z-10"></div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                [Image: Intervenant accompagnant un enfant]
              </div>
            </div>

            {/* Formulaire */}
            <div className="w-full lg:w-1/2 bg-[#ecf4f6] rounded-[24px] p-8 lg:p-12 relative z-20">
              <h2 className="text-2xl font-bold text-navy-900 mb-8">Envoyez-nous un message</h2>
              
              {isSuccess ? (
                <div className="bg-white/80 backdrop-blur border border-teal-200 text-teal-800 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">✅</div>
                  <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                  <p className="mb-6">Nous avons bien reçu votre demande et vous recontacterons très vite.</p>
                  <Button variant="outline-navy" onClick={() => setIsSuccess(false)}>
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="role" className="text-[13px] font-semibold text-navy-900">Vous êtes... <span className="text-teal-500">*</span></label>
                    <select id="role" required className="px-4 py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none text-sm text-gray-700">
                      <option value="">Sélectionnez...</option>
                      <option value="famille">Une famille</option>
                      <option value="candidat">Un(e) intervenant(e)</option>
                      <option value="partenaire">Un partenaire</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullname" className="text-[13px] font-semibold text-navy-900">Nom complet <span className="text-teal-500">*</span></label>
                    <input type="text" id="fullname" required className="px-4 py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm" placeholder="Jean Dupont" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] font-semibold text-navy-900">Email <span className="text-teal-500">*</span></label>
                    <input type="email" id="email" required className="px-4 py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm" placeholder="jean.dupont@email.com" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[13px] font-semibold text-navy-900">Téléphone <span className="text-teal-500">*</span></label>
                    <input type="tel" id="phone" required className="px-4 py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm" placeholder="06 12 34 56 78" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[13px] font-semibold text-navy-900">Votre message <span className="text-teal-500">*</span></label>
                    <textarea id="message" rows={4} required className="px-4 py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all resize-y text-sm" placeholder="Expliquez-nous votre besoin..."></textarea>
                  </div>

                  {/* Checkbox RGPD ajoutée comme demandé/validé */}
                  <div className="flex items-start gap-3 mt-1">
                    <input type="checkbox" id="rgpd" required className="mt-1 w-4 h-4 text-teal-400 border-gray-300 rounded focus:ring-teal-400" />
                    <label htmlFor="rgpd" className="text-xs text-gray-500 leading-relaxed">
                      J&apos;accepte que mes informations soient utilisées pour traiter ma demande.
                    </label>
                  </div>

                  <div className="mt-2">
                    <Button variant="navy" type="submit" disabled={isSubmitting} className="w-full justify-center py-4 rounded-xl shadow-lg">
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Section : Coordonnées & Map */}
      <section className="bg-[#ecf4f6] py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-5xl mx-auto">
            
            {/* Infos Coordinates */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <h2 className="text-3xl font-bold text-navy-900 mb-2">Nos coordonnées</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-400/20 transition-colors">
                    📞
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Téléphone</p>
                    <p className="font-semibold text-navy-900 text-base">06 14 79 60 47</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-400/20 transition-colors">
                    ✉️
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="font-semibold text-navy-900 text-base">contact@puralpha.fr</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-400/20 transition-colors">
                    📍
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Bureau</p>
                    <p className="font-semibold text-navy-900 text-base">14K - 26 Rue des Sablons, 95360 Montmagny</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-400/20 transition-colors">
                    🕒
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Horaires</p>
                    <p className="font-semibold text-navy-900 text-base">Lun–Ven 9h00 – 18h30</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full lg:w-1/2">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-[24px] flex items-center justify-center text-gray-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/4164/2816.png')] bg-cover bg-center opacity-50 mix-blend-multiply"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-4xl mb-2 text-teal-500">📍</div>
                  <span className="font-medium text-navy-900 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">[Carte: 26 Rue des Sablons]</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
