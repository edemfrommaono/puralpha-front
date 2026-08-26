"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toHtml } from "@/lib/wysiwyg";
import { InfoNotice } from "@/components/ui/InfoNotice";

// ── Schéma Zod — Forminator form 574 ──
const candidatureSchema = z.object({
  "name-1": z.string().min(1, "Ce champ est requis"),       // Prénom
  "name-2": z.string().min(1, "Ce champ est requis"),       // Nom
  "email-1": z.string().email("Adresse mail invalide").min(1, "Ce champ est requis"),
  "phone-1": z.string().min(1, "Ce champ est requis"),                          // Téléphone
  "text-1": z.string().min(1, "Ce champ est requis"),        // Commune de résidence
  "text-2": z.string().min(1, "Ce champ est requis"),        // Disponibilités principales
  "select-1": z.string().min(1, "Ce champ est requis"),      // Expérience (Aucune / Personnelle / Professionnelle)
  "text-3": z.string().optional(),                           // Nombre d'années — facultatif, affiché seulement si une expérience est déclarée
  "text-4": z.string().optional(),                           // Diplôme / qualification (si applicable)
  "upload-1": z.any().refine((files) => files && files.length > 0, "Un CV est requis"), // CV *
  "textarea-1": z.string().max(180, "180 caractères max").optional(),
  "consent_vivier": z.boolean().optional(),
});

type CandidatureFormData = z.infer<typeof candidatureSchema>;

const FIELD_MAPPING = {
  "name-1": "name-1",
  "name-2": "name-2",
  "email-1": "email-1",
  "phone-1": "phone-1",
  "text-1": "text-1",
  "text-2": "text-2",
  "select-1": "select-1",
  "text-3": "number-1",
  "text-4": "text-4",
  "upload-1": "upload-1",
  "textarea-1": "textarea-1",
} as const;

interface ConsentProof {
  email: string;
  choice: string;
  label: string;
  accepted: boolean;
  date: string;
  time: string;
  source: string;
  canal: string;
  text_version: string;
}

const saveConsentProof = (proof: ConsentProof) => {
  try {
    const existing = localStorage.getItem("puralpha_consent_proofs");
    const list = existing ? JSON.parse(existing) : [];
    list.push(proof);
    localStorage.setItem("puralpha_consent_proofs", JSON.stringify(list));
    console.log("Consent proof recorded:", proof);
  } catch (err) {
    console.error("Failed to save consent proof:", err);
  }
};

interface RejoindreFormulaireProps {
  sectionTag: string;
  title: string;
  description: string;
  submitText: string;
  emailFallback: string;
  notes?: string;
}

export function RejoindreFormulaire({
  sectionTag, title, description, submitText, emailFallback, notes,
}: RejoindreFormulaireProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CandidatureFormData>({
    resolver: zodResolver(candidatureSchema),
    defaultValues: {
      "name-1": "",
      "name-2": "",
      "email-1": "",
      "phone-1": "",
      "text-1": "",
      "text-2": "",
      "select-1": "",
      "text-3": "",
      "text-4": "",
      "upload-1": null,
      "textarea-1": "",
      "consent_vivier": false,
    },
  });

  useEffect(() => {
    register("upload-1");
  }, [register]);

  const motivationLength = watch("textarea-1")?.length || 0;

  // §5.9 — Le nombre d'années n'est affiché que si une expérience est déclarée
  const experienceValue = watch("select-1");
  const showYearsField = experienceValue === "Personnelle" || experienceValue === "Professionnelle";

  // Réinitialise le nombre d'années si le candidat déclare « Aucune » expérience
  useEffect(() => {
    if (!showYearsField) setValue("text-3", "");
  }, [showYearsField, setValue]);

  const onSubmit = async (formData: CandidatureFormData) => {
    setSubmitError(null);
    try {
      const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
      const baseUrl = wpApiUrl ? wpApiUrl.replace("/wp-json/wp/v2", "") : "https://bk.puralpha.fr";
      const submissionUrl = `${baseUrl}/wp-json/v1/submit-form`;

      const entries: { name: string; value: string | string[] }[] = Object.entries(formData)
        .filter(([key]) => Object.prototype.hasOwnProperty.call(FIELD_MAPPING, key) && key !== "upload-1")
        .map(([key, value]) => {
          const fieldName = FIELD_MAPPING[key as keyof typeof FIELD_MAPPING];
          const mappedValue: string | string[] = (value as string) || "";

          return {
            name: fieldName,
            value: mappedValue,
          };
        });

      // Gestion de la case à cocher Vivier (checkbox-1)
      if (formData.consent_vivier) {
        entries.push({ name: "checkbox-1", value: ["oui"] });
      }

      const formDataToSend = new FormData();
      formDataToSend.append("form_id", "574");
      formDataToSend.append("data", JSON.stringify(entries));

      if (formData["upload-1"] && (formData["upload-1"] as FileList).length > 0) {
        formDataToSend.append("upload-1", (formData["upload-1"] as FileList)[0]);
      }

      const response = await fetch(submissionUrl, {
        method: "POST",
        // Pas de header Content-Type, le navigateur gère le multipart/form-data automatiquement
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Erreur renvoyée par le backend:", errorData);
        throw new Error(errorData?.message || "Une erreur est survenue lors de l'envoi.");
      }

      // Enregistrement de la preuve de consentement pour le vivier
      const email = formData["email-1"];
      const timestamp = new Date().toISOString();
      saveConsentProof({
        email,
        choice: "consent_vivier",
        label: "J'accepte que PUR Alpha conserve ma candidature pendant 2 ans à compter du dernier contact afin de pouvoir me recontacter pour de futures opportunités.",
        accepted: !!formData.consent_vivier,
        date: timestamp.split("T")[0],
        time: timestamp.split("T")[1].substring(0, 8),
        source: "Formulaire de candidature - pur-alpha.fr",
        canal: "Web",
        text_version: "v1.0 - July 2026"
      });

      setIsSubmitted(true);
      setSelectedFileName(null);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <section id="candidature" className="w-full py-8 lg:py-24 bg-gradient-to-br from-[#1c3553] to-[#2faaa1]">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-8 lg:mb-12">
          {sectionTag && (
            <p className="typo-tag text-white/55 text-center mb-4">{sectionTag}</p>
          )}
          {title && (
            <h2 className="typo-h2 text-white mb-4 lg:mb-6">{title}</h2>
          )}
          {description && (
            <div
              className="prose prose-invert typo-body text-white/65 mx-auto max-w-none text-center"
              dangerouslySetInnerHTML={{ __html: toHtml(description) }}
            />
          )}
        </div>

        <div className="bg-white rounded-[24px] p-6 md:p-8 lg:p-12 shadow-[0_20px_30px_rgba(30,58,95,0.12)]">
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
                    className={`w-full bg-[#ecf4f6] border ${errors["name-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["name-1"] && <p className="text-red-500 text-xs">{errors["name-1"].message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Nom *</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    {...register("name-2")}
                    className={`w-full bg-[#ecf4f6] border ${errors["name-2"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
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
                    className={`w-full bg-[#ecf4f6] border ${errors["email-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["email-1"] && <p className="text-red-500 text-xs">{errors["email-1"].message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Téléphone *</label>
                  <input
                    type="tel"
                    placeholder="06 XX XX XX XX"
                    {...register("phone-1")}
                    className={`w-full bg-[#ecf4f6] border ${errors["phone-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["phone-1"] && <p className="text-red-500 text-xs">{errors["phone-1"].message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Commune de résidence *</label>
                  <input
                    type="text"
                    placeholder="Votre commune"
                    {...register("text-1")}
                    className={`w-full bg-[#ecf4f6] border ${errors["text-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["text-1"] && <p className="text-red-500 text-xs">{errors["text-1"].message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Disponibilités principales *</label>
                  <input
                    type="text"
                    placeholder="Vos disponibilités"
                    {...register("text-2")}
                    className={`w-full bg-[#ecf4f6] border ${errors["text-2"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />
                  {errors["text-2"] && <p className="text-red-500 text-xs">{errors["text-2"].message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex flex-col gap-2 ${showYearsField ? "" : "md:col-span-2"}`}>
                  <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Expérience auprès d'enfants ou de personnes en situation de handicap *</label>
                  <select
                    {...register("select-1")}
                    className={`w-full bg-[#ecf4f6] border ${errors["select-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none cursor-pointer`}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="Aucune">Aucune</option>
                    <option value="Personnelle">Personnelle</option>
                    <option value="Professionnelle">Professionnelle</option>
                  </select>
                  {errors["select-1"] && <p className="text-red-500 text-xs">{errors["select-1"].message}</p>}
                </div>

                {/* §5.9 — N'apparaît que si une expérience est déclarée (Personnelle / Professionnelle) */}
                {showYearsField && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Nombre d'années d'expérience</label>
                    <input
                      type="text"
                      placeholder="Ex: 2 ans"
                      {...register("text-3")}
                      className="w-full bg-[#ecf4f6] border border-[#f3f4f6] rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                )}
              </div>

              {/* §5.9 — Nouveau champ facultatif : le CV donnera le détail du parcours */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Diplôme / qualification en lien avec l'accompagnement (si applicable)</label>
                <input
                  type="text"
                  placeholder="Ex: AESH, CAP Petite enfance, DEAES..."
                  {...register("text-4")}
                  className="w-full bg-[#ecf4f6] border border-[#f3f4f6] rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">CV *</label>
                <label className="w-full bg-[#ecf4f6] border border-[#f3f4f6] rounded-lg px-5 py-4 text-[15px] text-gray-700 flex items-center justify-between cursor-pointer hover:bg-[#e2edf0] transition-colors">
                  <span className="text-gray-500">{selectedFileName || "Ajouter un fichier"}</span>
                  <span className="text-xl font-bold text-gray-400 font-sans">+</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setSelectedFileName(files[0].name);
                        setValue("upload-1", files);
                      } else {
                        setSelectedFileName(null);
                        setValue("upload-1", null);
                      }
                    }}
                  />
                </label>
                {errors["upload-1"] && <p className="text-red-500 text-xs">{errors["upload-1"].message as string}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wide">Pourquoi rejoindre PUR Alpha ?</label>
                <textarea
                  rows={4}
                  placeholder="Présentez-vous en quelques lignes..."
                  maxLength={180}
                  {...register("textarea-1")}
                  className={`w-full bg-[#ecf4f6] border ${errors["textarea-1"] ? "border-red-400" : "border-[#f3f4f6]"} rounded-lg px-5 py-4 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none`}
                ></textarea>
                <div className="flex justify-between">
                  {errors["textarea-1"] && <p className="text-red-500 text-xs">{errors["textarea-1"].message}</p>}
                  <p className="text-xs text-gray-400 ml-auto">{motivationLength}/180</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent_vivier"
                    {...register("consent_vivier")}
                    className="mt-1 h-5 w-5 bg-[#ecf4f6] border border-gray-300 rounded focus:ring-teal-400 cursor-pointer"
                  />
                  <label htmlFor="consent_vivier" className="text-sm text-gray-600 leading-normal cursor-pointer select-none">
                    <strong>Vivier de candidats (facultatif) :</strong> J'accepte que PUR Alpha conserve ma candidature pendant 2 ans à compter du dernier contact afin de pouvoir me recontacter pour de futures opportunités.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1c3553] hover:bg-[#152a42] disabled:opacity-60 transition-colors text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(30,58,95,0.3)] text-[16px] font-sans"
              >
                {isSubmitting ? "Envoi en cours..." : submitText}
                {!isSubmitting && (
                  <svg className="w-5 h-5 ml-1 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Ou envoyez directement votre CV à <a href={`mailto:${emailFallback}`} className="font-bold text-navy-800">{emailFallback}</a>
              </p>
            </form>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <InfoNotice text="Les informations et le CV transmis sont utilisés par PUR Alpha pour examiner votre candidature et prendre les mesures précontractuelles nécessaires au recrutement. Les champs marqués d’un astérisque sont obligatoires. Les données sont accessibles uniquement aux personnes habilitées intervenant dans le recrutement et, dans la stricte mesure nécessaire, aux prestataires techniques de PUR Alpha. Si votre candidature n’est pas retenue, elle est supprimée à l’issue du recrutement, sauf si vous acceptez sa conservation dans notre vivier. Vous pouvez exercer vos droits en écrivant à contact@puralpha.fr. Pour en savoir plus, consultez notre Politique de confidentialité." />
          </div>
        </div>
      </div>
    </section>
  );
}
