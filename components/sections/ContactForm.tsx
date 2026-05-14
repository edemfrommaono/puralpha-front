"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  formTitle?: string;
}

export function ContactForm({ formTitle }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'un appel API (WordPress / Forminator future)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="w-full lg:w-1/2 bg-[#ecf4f6] rounded-[24px] p-8 lg:p-12 relative z-20">
      <h2 className="text-2xl font-bold text-navy-900 mb-8">{formTitle || "Envoyez-nous un message"}</h2>
      
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
  );
}
