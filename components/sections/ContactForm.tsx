"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

// ── Schéma Zod — Forminator form 573 ──
const contactSchema = z.object({
  "select-1": z.string().min(1, "Ce champ est requis"),
  "name-1": z.string().min(1, "Ce champ est requis"),
  "email-1": z.string().email("Adresse mail invalide").min(1, "Ce champ est requis"),
  "phone-1": z.string().min(1, "Ce champ est requis"),
  "textarea-1": z.string().min(1, "Ce champ est requis"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FIELD_MAPPING = {
  "select-1": "select-1",
  "name-1": "name-1",
  "email-1": "email-1",
  "phone-1": "phone-1",
  "textarea-1": "textarea-1",
} as const;

interface ContactFormProps {
  formTitle?: string;
}

export function ContactForm({ formTitle }: ContactFormProps) {
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
      "email-1": "",
      "phone-1": "",
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
    <div className="w-full lg:w-1/2 bg-[#ecf4f6] rounded-[24px] p-8 lg:p-12 relative z-20">
      <h2 className="text-2xl font-bold text-navy-900 mb-8">{formTitle || "Envoyez-nous un message"}</h2>

      {isSubmitted && (
        <div className="bg-white/80 backdrop-blur border border-teal-200 text-teal-800 rounded-xl p-8 text-center flex flex-col justify-center items-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">✅</div>
          <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
          <p>Nous avons bien reçu votre demande et vous recontacterons très vite.</p>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">
          {submitError}
        </div>
      )}

      {!isSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-[13px] font-semibold text-navy-900">Vous êtes... <span className="text-teal-500">*</span></label>
            <select
              id="role"
              {...register("select-1")}
              className={`px-4 py-3 bg-white border ${errors["select-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none text-sm text-gray-700`}
            >
              <option value="">Sélectionnez...</option>
              <option value="one">Une famille</option>
              <option value="two">Un(e) intervenant(e)</option>
              <option value="Partenaire">Un partenaire</option>
              <option value="Autre">Autre</option>
            </select>
            {errors["select-1"] && <p className="text-red-500 text-xs">{errors["select-1"].message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="text-[13px] font-semibold text-navy-900">Nom complet <span className="text-teal-500">*</span></label>
            <input
              type="text" id="fullname"
              {...register("name-1")}
              className={`px-4 py-3 bg-white border ${errors["name-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm`}
              placeholder="Jean Dupont"
            />
            {errors["name-1"] && <p className="text-red-500 text-xs">{errors["name-1"].message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[13px] font-semibold text-navy-900">Email <span className="text-teal-500">*</span></label>
            <input
              type="email" id="email"
              {...register("email-1")}
              className={`px-4 py-3 bg-white border ${errors["email-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm`}
              placeholder="jean.dupont@email.com"
            />
            {errors["email-1"] && <p className="text-red-500 text-xs">{errors["email-1"].message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-[13px] font-semibold text-navy-900">Téléphone <span className="text-teal-500">*</span></label>
            <input
              type="tel" id="phone"
              {...register("phone-1")}
              className={`px-4 py-3 bg-white border ${errors["phone-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm`}
              placeholder="06 12 34 56 78"
            />
            {errors["phone-1"] && <p className="text-red-500 text-xs">{errors["phone-1"].message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[13px] font-semibold text-navy-900">Votre message <span className="text-teal-500">*</span></label>
            <textarea
              id="message" rows={4}
              {...register("textarea-1")}
              className={`px-4 py-3 bg-white border ${errors["textarea-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all resize-y text-sm`}
              placeholder="Expliquez-nous votre besoin..."
            ></textarea>
            {errors["textarea-1"] && <p className="text-red-500 text-xs">{errors["textarea-1"].message}</p>}
          </div>

          <div className="mt-2">
            <Button variant="navy" type="submit" disabled={isSubmitting} className="w-full justify-center py-4 rounded-xl shadow-lg">
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
