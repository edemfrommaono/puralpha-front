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
      {/* Page Header */}
      <section className="bg-navy-800 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-6">Nous contacter</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Une question, une demande de renseignement ou un besoin d'accompagnement ? Notre équipe est à votre écoute.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Form Column */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-bold text-navy-800 mb-8">Envoyez-nous un message</h2>
              
              {isSuccess ? (
                <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">✅</div>
                  <h3 className="text-xl font-bold mb-2">Message envoyé avec succès !</h3>
                  <p>Nous avons bien reçu votre demande et nous vous recontacterons dans les plus brefs délais.</p>
                  <Button variant="outline-navy" className="mt-6" onClick={() => setIsSuccess(false)}>
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="firstname" className="text-sm font-semibold text-navy-800">Prénom <span className="text-teal-500">*</span></label>
                      <input type="text" id="firstname" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all" placeholder="Jean" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="lastname" className="text-sm font-semibold text-navy-800">Nom <span className="text-teal-500">*</span></label>
                      <input type="text" id="lastname" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all" placeholder="Dupont" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-semibold text-navy-800">Email <span className="text-teal-500">*</span></label>
                      <input type="email" id="email" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all" placeholder="jean.dupont@email.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-navy-800">Téléphone <span className="text-teal-500">*</span></label>
                      <input type="tel" id="phone" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all" placeholder="06 12 34 56 78" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-navy-800">Type de demande <span className="text-teal-500">*</span></label>
                    <select id="subject" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all appearance-none">
                      <option value="">Sélectionnez un sujet</option>
                      <option value="famille">Je suis une famille et je cherche un accompagnement</option>
                      <option value="candidature">Je souhaite postuler en tant qu'intervenant</option>
                      <option value="partenariat">Demande de partenariat</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-semibold text-navy-800">Votre message <span className="text-teal-500">*</span></label>
                    <textarea id="message" rows={5} required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all resize-y" placeholder="Expliquez-nous votre besoin en quelques mots..."></textarea>
                  </div>

                  <div className="flex items-start gap-3 mt-2">
                    <input type="checkbox" id="rgpd" required className="mt-1 w-4 h-4 text-teal-400 border-gray-300 rounded focus:ring-teal-400" />
                    <label htmlFor="rgpd" className="text-sm text-gray-500 leading-relaxed">
                      En soumettant ce formulaire, j'accepte que mes informations soient utilisées dans le cadre de ma demande et de la relation commerciale qui peut en découler.
                    </label>
                  </div>

                  <div className="mt-4">
                    <Button variant="navy" type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-8">
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 sticky top-32">
                <h3 className="text-xl font-bold text-navy-800 mb-6">Besoin d'une réponse rapide ?</h3>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      📞
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-800 text-sm mb-1">Par téléphone</h4>
                      <p className="text-gray-600 font-medium">06 14 79 60 47</p>
                      <p className="text-gray-400 text-xs mt-1">Du lundi au vendredi, de 9h00 à 17h30.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-800 text-sm mb-1">Par email</h4>
                      <p className="text-gray-600 font-medium">contact@puralpha.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      📍
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-800 text-sm mb-1">Siège social</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        10 B rue de Paris<br/>
                        95350 Piscop<br/>
                        France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-navy-800 text-sm mb-3">Zone d'intervention</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Nos équipes interviennent exclusivement dans le département du Val-d'Oise (95).
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span> Val-d'Oise (95)
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
