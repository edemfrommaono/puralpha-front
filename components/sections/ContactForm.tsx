"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ── Schéma Zod — Forminator form 573 ──
const contactSchema = z.object({
  "select-1": z.string().min(1, "Ce champ est requis"),       // Vous êtes...
  "name-1": z.string().min(1, "Ce champ est requis"),          // Nom
  "name-2": z.string().min(1, "Ce champ est requis"),          // Prénoms
  "email-1": z.string().email("Adresse mail invalide").min(1, "Ce champ est requis"),
  "phone-1": z.string().optional(),                            // Téléphone
  "text-1": z.string().optional(),                             // Commune concernée
  "select-2": z.string().min(1, "Ce champ est requis"),        // Objet de votre demande
  "textarea-1": z.string().optional(),                         // Votre message
});

type ContactFormData = z.infer<typeof contactSchema>;

const FIELD_MAPPING = {
  "select-1": "select-1",
  "name-1": "name-1",
  "name-2": "name-2",
  "email-1": "email-1",
  "phone-1": "phone-1",
  "text-1": "text-1",
  "select-2": "select-2",
  "textarea-1": "textarea-1",
} as const;

interface ContactFormProps {
  formTitle?: string;
  notes?: string;
}

export function ContactForm({ formTitle, notes }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      "select-1": "",
      "name-1": "",
      "name-2": "",
      "email-1": "",
      "phone-1": "",
      "text-1": "",
      "select-2": "",
      "textarea-1": "",
    },
  });

  const onSubmit = async (formData: ContactFormData) => {
    setSubmitError(null);
    try {
      const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
      const baseUrl = wpApiUrl ? wpApiUrl.replace("/wp-json/wp/v2", "") : "https://bk.puralpha.fr";
      const submissionUrl = `${baseUrl}/wp-json/v1/submit-form`;

      const entries = Object.entries(formData).map(([key, value]) => ({
        name: FIELD_MAPPING[key as keyof typeof FIELD_MAPPING],
        value: value || "",
      }));

      const response = await fetch(submissionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: "573",
          data: entries,
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'envoi.");
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-[#ecf4f6] rounded-[24px] p-6 lg:p-12 relative z-20">
      <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-2">{formTitle || "Envoyez-nous votre demande"}</h2>
      <p className="text-gray-600 text-[13px] md:text-sm mb-6 md:mb-8 leading-relaxed">
        Quelques informations suffisent pour comprendre votre demande et vous répondre de manière adaptée.
      </p>

      {isSubmitted && (
        <div className="bg-white border border-teal-200 text-teal-800 rounded-xl p-8 text-center flex flex-col justify-center items-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">✅</div>
          <h3 className="text-xl font-bold mb-2">Demande envoyée !</h3>
          <p className="text-sm">Nous avons bien reçu votre demande et vous recontacterons très vite.</p>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">
          {submitError}
        </div>
      )}

      {!isSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-5">
          {/* Vous êtes... */}
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-[13px] font-semibold text-navy-900">Vous êtes... *</label>
            <select
              id="role"
              {...register("select-1")}
              className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["select-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none text-[13px] md:text-sm text-gray-700 cursor-pointer`}
            >
              <option value="">Sélectionnez...</option>
              <option value="Une famille">Une famille</option>
              <option value="Un(e) intervenant(e)">Un(e) intervenant(e)</option>
              <option value="Un partenaire">Un partenaire</option>
              <option value="Autre">Autre</option>
            </select>
            {errors["select-1"] && <p className="text-red-500 text-xs">{errors["select-1"].message}</p>}
          </div>

          {/* Nom & Prénoms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[13px] font-semibold text-navy-900">Nom *</label>
              <input
                type="text"
                id="name"
                {...register("name-1")}
                className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["name-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm`}
                placeholder="Votre nom"
              />
              {errors["name-1"] && <p className="text-red-500 text-xs">{errors["name-1"].message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstname" className="text-[13px] font-semibold text-navy-900">Prénoms *</label>
              <input
                type="text"
                id="firstname"
                {...register("name-2")}
                className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["name-2"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm`}
                placeholder="Votre prénom"
              />
              {errors["name-2"] && <p className="text-red-500 text-xs">{errors["name-2"].message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[13px] font-semibold text-navy-900">Email *</label>
            <input
              type="email"
              id="email"
              {...register("email-1")}
              className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["email-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm`}
              placeholder="votre@email.fr"
            />
            {errors["email-1"] && <p className="text-red-500 text-xs">{errors["email-1"].message}</p>}
          </div>

          {/* Téléphone & Commune concernée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[13px] font-semibold text-navy-900">Téléphone</label>
              <input
                type="tel"
                id="phone"
                {...register("phone-1")}
                className="px-3 py-2.5 md:px-4 md:py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm"
                placeholder="06 XX XX XX XX"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="commune" className="text-[13px] font-semibold text-navy-900">Commune concernée</label>
              <input
                type="text"
                id="commune"
                {...register("text-1")}
                className="px-3 py-2.5 md:px-4 md:py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm"
                placeholder="Votre commune"
              />
            </div>
          </div>

          {/* Objet de votre demande */}
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-[13px] font-semibold text-navy-900">Objet de votre demande *</label>
            <select
              id="subject"
              {...register("select-2")}
              className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["select-2"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none text-[13px] md:text-sm text-gray-700 cursor-pointer`}
            >
              <option value="">Sélectionnez...</option>
              <option value="Renseignements généraux">Renseignements généraux</option>
              <option value="Demande d'accompagnement">Demande d'accompagnement</option>
              <option value="Devenir intervenant(e)">Devenir intervenant(e)</option>
              <option value="Partenariat">Partenariat</option>
              <option value="Autre demande">Autre demande</option>
            </select>
            {errors["select-2"] && <p className="text-red-500 text-xs">{errors["select-2"].message}</p>}
          </div>

          {/* Votre message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[13px] font-semibold text-navy-900">Votre message</label>
              <textarea
              id="message"
              rows={4}
              {...register("textarea-1")}
              className="px-3 py-2.5 md:px-4 md:py-3 bg-white border border-[#f3f4f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all resize-y text-[13px] md:text-sm"
              placeholder="Expliquez-nous votre besoin..."
            ></textarea>
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1c3553] hover:bg-[#152a42] disabled:opacity-60 transition-colors text-white font-semibold py-3 px-5 md:py-4 md:px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(30,58,95,0.2)] text-[14px] md:text-[15px]"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              {!isSubmitting && (
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </form>
      )}

      {notes && (
        <p className="text-xs text-gray-500 mt-6 leading-relaxed">
          {notes}
        </p>
      )}
    </div>
  );
}
