"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ── Schéma Zod — Forminator form 574 ──
const candidatureSchema = z.object({
  "name-1": z.string().min(1, "Ce champ est requis"),       // Prénom
  "name-2": z.string().min(1, "Ce champ est requis"),       // Nom
  "email-1": z.string().email("Adresse mail invalide").min(1, "Ce champ est requis"),
  "phone-1": z.string().optional(),                          // Optionnel
  "select-1": z.string().optional(),                         // Expérience handicap
  "textarea-1": z.string().max(180, "180 caractères max").optional(),
});

type CandidatureFormData = z.infer<typeof candidatureSchema>;

const FIELD_MAPPING = {
  "name-1": "name-1",
  "name-2": "name-2",
  "email-1": "email-1",
  "phone-1": "phone-1",
  "select-1": "select-1",
  "textarea-1": "textarea-1",
} as const;

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CandidatureFormData>({
    resolver: zodResolver(candidatureSchema),
    defaultValues: {
      "name-1": "",
      "name-2": "",
      "email-1": "",
      "phone-1": "",
      "select-1": "",
      "textarea-1": "",
    },
  });

  const motivationLength = watch("textarea-1")?.length || 0;

  const onSubmit = async (formData: CandidatureFormData) => {
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
          form_id: "574",
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
    <section className="w-full py-24 bg-gradient-to-br from-[#1c3553] to-[#2faaa1]">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-white/55 font-bold text-xs tracking-[3px] uppercase mb-4">{sectionTag}</p>
          <h2 className="text-3xl md:text-[44px] font-extrabold text-white mb-6 leading-tight">{title}</h2>
          <p className="text-white/65 text-lg">{description}</p>
        </div>

        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_20px_30px_rgba(30,58,95,0.12)]">
          {isSubmitted && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Candidature envoyée !</h3>
              <p className="text-gray-600 mb-6">Nous avons bien reçu votre candidature et vous recontacterons sous 48h.</p>
            </div>
          )}

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">
              {submitError}
            </div>
          )}

          {!isSubmitted && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Prénom *</label>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    {...register("name-1")}
                    className={`w-full bg-[#ecf4f6] border ${errors["name-1"] ? "border-red-400" : "border-gray-100"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["name-1"] && <p className="text-red-500 text-xs">{errors["name-1"].message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Nom *</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    {...register("name-2")}
                    className={`w-full bg-[#ecf4f6] border ${errors["name-2"] ? "border-red-400" : "border-gray-100"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["name-2"] && <p className="text-red-500 text-xs">{errors["name-2"].message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Email *</label>
                  <input
                    type="email"
                    placeholder="votre@email.fr"
                    {...register("email-1")}
                    className={`w-full bg-[#ecf4f6] border ${errors["email-1"] ? "border-red-400" : "border-gray-100"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["email-1"] && <p className="text-red-500 text-xs">{errors["email-1"].message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="06 XX XX XX XX"
                    {...register("phone-1")}
                    className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Expérience avec le handicap</label>
                <select
                  {...register("select-1")}
                  className="w-full bg-[#ecf4f6] border border-gray-100 rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="Aucune">Aucune</option>
                  <option value="one">Personnelle</option>
                  <option value="two">Professionnelle</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Pourquoi rejoindre PUR Alpha ?</label>
                <textarea
                  rows={4}
                  placeholder="Présentez-vous en quelques lignes..."
                  maxLength={180}
                  {...register("textarea-1")}
                  className={`w-full bg-[#ecf4f6] border ${errors["textarea-1"] ? "border-red-400" : "border-gray-100"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none`}
                ></textarea>
                <div className="flex justify-between">
                  {errors["textarea-1"] && <p className="text-red-500 text-xs">{errors["textarea-1"].message}</p>}
                  <p className="text-xs text-gray-400 ml-auto">{motivationLength}/180</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-navy-800 hover:bg-navy-900 disabled:opacity-60 transition-colors text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(30,58,95,0.3)]"
              >
                {isSubmitting ? "Envoi en cours..." : submitText}
                {!isSubmitting && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Ou envoyez directement votre CV à <a href={`mailto:${emailFallback}`} className="font-bold text-navy-800">{emailFallback}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
