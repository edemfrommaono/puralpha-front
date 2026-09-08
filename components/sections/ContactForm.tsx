"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InfoNotice } from "@/components/ui/InfoNotice";

// ── Schéma Zod — Forminator form 573 ──
const contactSchema = z.object({
  "select-1": z.string().min(1, "Ce champ est requis"),       // Vous êtes...
  "name-1": z.string().min(1, "Ce champ est requis"),          // Nom
  "name-2": z.string().min(1, "Ce champ est requis"),          // Prénoms
  "email-1": z.string().email("Adresse mail invalide").min(1, "Ce champ est requis"),
  "phone-1": z.string().min(1, "Ce champ est requis"),          // Téléphone
  "text-1": z.string().optional(),                             // Commune concernée
  "select-2": z.string().min(1, "Ce champ est requis"),        // Objet de votre demande
  "textarea-1": z.string().optional(),                         // Votre message
  "consent_email": z.boolean().optional(),                     // Newsletter e-mail (facultatif)
  "hp_website": z.string().optional(),                         // Honeypot anti-spam
});

type ContactFormData = z.infer<typeof contactSchema>;

const FIELD_MAPPING = {
  "select-1": "select-1",
  "name-1": "name-1",
  "email-1": "email-1",
  "phone-1": "phone-1",
  "text-1": "text-1",
  "select-2": "select-2",
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
      "consent_email": false,
      "hp_website": "",
    },
  });

  const onSubmit = async (formData: ContactFormData) => {
    setSubmitError(null);

    // Protection anti-spam Honeypot : si le champ invisible est rempli, on rejette silencieusement
    if (formData.hp_website) {
      console.warn("Spam détecté via le honeypot");
      setIsSubmitted(true);
      reset();
      return;
    }

    try {
      const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
      const baseUrl = wpApiUrl ? wpApiUrl.replace("/wp-json/wp/v2", "") : "https://bk.puralpha.fr";
      const submissionUrl = `${baseUrl}/wp-json/v1/submit-form`;

      const entries: { name: string; value: string }[] = Object.entries(formData)
        .filter(([key]) => Object.prototype.hasOwnProperty.call(FIELD_MAPPING, key))
        .map(([key, value]) => {
          let mappedValue = (value as string) || "";
          
          // Forminator n'a qu'un champ "Nom complet" (name-1), on y combine le Prénom et le Nom
          if (key === "name-1") {
            mappedValue = `${formData["name-2"]} ${formData["name-1"]}`.trim();
          }

          return {
            name: FIELD_MAPPING[key as keyof typeof FIELD_MAPPING],
            value: mappedValue,
          };
        });

      // Transmission du consentement marketing au serveur
      if (formData.consent_email) {
        entries.push({
          name: "consent_email",
          value: "oui",
        });
      }

      const formDataToSend = new FormData();
      formDataToSend.append("form_id", "573");
      formDataToSend.append("data", JSON.stringify(entries));

      const response = await fetch(submissionUrl, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'envoi.");
      }

      // Enregistrement des preuves de consentement
      const email = formData["email-1"];
      const timestamp = new Date().toISOString();
      const consents = [
        { key: "consent_email", label: "J'accepte de recevoir par e-mail les informations et actualités de PUR Alpha.", value: !!formData.consent_email },
      ];

      consents.forEach(c => {
        saveConsentProof({
          email,
          choice: c.key,
          label: c.label,
          accepted: c.value,
          date: timestamp.split("T")[0],
          time: timestamp.split("T")[1].substring(0, 8),
          source: "Formulaire de contact - puralpha.fr",
          canal: "Web",
          text_version: "v1.1 - August 2026"
        });
      });

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-gray-100 rounded-[24px] p-6 lg:p-12 relative z-20">
      <h2 className="typo-h3 text-navy-900 mb-2">{formTitle || "Envoyez-nous votre demande"}</h2>
      <p className="typo-small text-gray-600 mb-6 md:mb-8">
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
          {/* Champ Honeypot anti-spam (invisible, piège à robots) */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="hp_website">Ne pas remplir ce champ</label>
            <input
              type="text"
              id="hp_website"
              tabIndex={-1}
              autoComplete="off"
              {...register("hp_website")}
            />
          </div>

          {/* Vous êtes... */}
          <div className="flex flex-col gap-2">
              <label htmlFor="role" className="typo-small font-bold text-navy-900">Vous êtes... *</label>
            <select
              id="role"
              {...register("select-1")}
              className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["select-1"] ? "border-red-400" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none text-[13px] md:text-sm text-gray-700 cursor-pointer`}
            >
              <option value="">Sélectionnez...</option>
              <option value="one">Une famille / un représentant légal</option>
              <option value="two">Un professionnel / une structure partenaire</option>
              <option value="Autre">Autre</option>
            </select>
            {errors["select-1"] && <p className="text-red-500 text-xs">{errors["select-1"].message}</p>}
          </div> 

          {/* Nom & Prénoms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="typo-small font-bold text-navy-900">Nom *</label>
              <input
                type="text"
                id="name"
                {...register("name-1")}
                className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["name-1"] ? "border-red-400" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm`}
                placeholder="Votre nom"
              />
              {errors["name-1"] && <p className="text-red-500 text-xs">{errors["name-1"].message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstname" className="typo-small font-bold text-navy-900">Prénom *</label>
              <input
                type="text"
                id="firstname"
                {...register("name-2")}
                className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["name-2"] ? "border-red-400" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm`}
                placeholder="Votre prénom"
              />
              {errors["name-2"] && <p className="text-red-500 text-xs">{errors["name-2"].message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="typo-small font-bold text-navy-900">Email *</label>
            <input
              type="email"
              id="email"
              {...register("email-1")}
              className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["email-1"] ? "border-red-400" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm`}
              placeholder="votre@email.fr"
            />
            {errors["email-1"] && <p className="text-red-500 text-xs">{errors["email-1"].message}</p>}
          </div>

          {/* Téléphone & Commune concernée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="typo-small font-bold text-navy-900">Téléphone *</label>
              <input
                type="tel"
                id="phone"
                {...register("phone-1")}
                className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["phone-1"] ? "border-red-400" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm`}
                placeholder="06 XX XX XX XX"
              />
              {errors["phone-1"] && <p className="text-red-500 text-xs">{errors["phone-1"].message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="commune" className="typo-small font-bold text-navy-900">Commune concernée</label>
              <input
                type="text"
                id="commune"
                {...register("text-1")}
                className="px-3 py-2.5 md:px-4 md:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-[13px] md:text-sm"
                placeholder="Votre commune"
              />
            </div>
          </div>

          {/* Objet de votre demande */}
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="typo-small font-bold text-navy-900">Objet de votre demande *</label>
            <select
              id="subject"
              {...register("select-2")}
              className={`px-3 py-2.5 md:px-4 md:py-3 bg-white border ${errors["select-2"] ? "border-red-400" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none text-[13px] md:text-sm text-gray-700 cursor-pointer`}
            >
              <option value="">Sélectionnez...</option>
              <option value="one">Renseignements généraux</option>
              <option value="two">Demande d'accompagnement</option>
              <option value="Partenariat">Partenariat</option>
              <option value="Autre-demande">Autre demande</option>
            </select>
            {errors["select-2"] && <p className="text-red-500 text-xs">{errors["select-2"].message}</p>}
          </div>

          {/* Votre message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="typo-small font-bold text-navy-900">Votre message</label>
            <textarea
              id="message"
              rows={4}
              {...register("textarea-1")}
              className="px-3 py-2.5 md:px-4 md:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all resize-y text-[13px] md:text-sm"
              placeholder="Expliquez-nous votre besoin..."
            ></textarea>
            <p className="text-[11px] md:text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3 leading-relaxed mt-1">
              ⚠️ <strong>Avertissement données sensibles :</strong> Pour ce premier contact, merci de ne pas transmettre d'informations médicales
détaillées ni de documents de santé concernant la personne à accompagner.
            </p>
          </div>

          {/* Consentement marketing — case unique, facultative, non cochée par défaut */}
          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("consent_email")}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-400 cursor-pointer"
              />
              <span className="text-xs text-gray-600 leading-normal">
                J’accepte de recevoir par e-mail les informations et actualités de PUR Alpha.{" "}
                <span className="text-gray-400">(facultatif)</span>
              </span>
            </label>
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy-800 hover:bg-navy-900 disabled:opacity-60 transition-colors text-white font-semibold py-3 px-5 md:py-4 md:px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(30,58,95,0.2)] text-[14px] md:text-[15px]"
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

      <InfoNotice text="Les informations recueillies sont utilisées par PUR Alpha pour répondre à votre demande. Les champs marqués d’un astérisque sont obligatoires. Selon l’objet de votre demande, le traitement repose sur les mesures précontractuelles prises à votre initiative ou sur l’intérêt légitime de PUR Alpha à répondre aux sollicitations reçues. Les données sont accessibles aux personnes habilitées de PUR Alpha et, dans la stricte mesure nécessaire, à ses prestataires techniques. Elles sont conservées pendant 3 ans à compter du dernier échange. Vous pouvez exercer vos droits en écrivant à contact@puralpha.fr. Pour en savoir plus, consultez notre Politique de confidentialité." />
    </div>
  );
}
