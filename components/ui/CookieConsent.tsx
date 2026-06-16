"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronUp, ChevronDown } from "lucide-react";

type ConsentState = {
  fonctionnel: true; // toujours activé
  statistiques: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "puralpha-cookie-consent";

const categories = [
  {
    id: "fonctionnel" as const,
    label: "Fonctionnel",
    alwaysActive: true,
    description:
      "L'accès ou le stockage technique est strictement nécessaire dans la finalité d'intérêt légitime de permettre l'utilisation d'un service spécifique explicitement demandé par l'abonné ou l'utilisateur, ou dans le seul but d'effectuer la transmission d'une communication sur un réseau de communications électroniques.",
  },
  {
    id: "statistiques" as const,
    label: "Statistiques",
    alwaysActive: false,
    description:
      "Le stockage ou l'accès technique qui est utilisé exclusivement à des fins statistiques.",
  },
  {
    id: "marketing" as const,
    label: "Marketing",
    alwaysActive: false,
    description:
      "L'accès ou le stockage technique est nécessaire pour créer des profils d'internautes afin d'envoyer des publicités, ou pour suivre l'utilisateur sur un site web ou sur plusieurs sites web ayant des finalités marketing similaires.",
  },
];

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [consent, setConsent] = useState<ConsentState>({
    fonctionnel: true,
    statistiques: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const save = (state: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setVisible(false);
  };

  const acceptAll = () =>
    save({ fonctionnel: true, statistiques: true, marketing: true });

  const refuseAll = () =>
    save({ fonctionnel: true, statistiques: false, marketing: false });

  const savePreferences = () => save(consent);

  const toggle = (key: "statistiques" | "marketing") =>
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!visible) return null;

  return (
    /* Overlay */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
          <h2 className="text-lg font-black text-navy-800">
            Gérer le consentement
          </h2>
          <button
            onClick={() => setVisible(false)}
            aria-label="Fermer"
            className="text-navy-800 hover:text-teal-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 flex-1">
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Pour offrir les meilleures expériences, nous utilisons des
            technologies telles que les cookies pour stocker et/ou accéder aux
            informations des appareils. Le fait de consentir à ces technologies
            nous permettra de traiter des données telles que le comportement de
            navigation ou les ID uniques sur ce site. Le fait de ne pas
            consentir ou de retirer son consentement peut avoir un effet négatif
            sur certaines caractéristiques et fonctions.
          </p>

          {/* Préférences détaillées */}
          {showPreferences && (
            <div className="flex flex-col gap-3 mb-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  {/* Ligne catégorie — div pour éviter button-dans-button */}
                  <div 
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer select-none"
                    onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                  >
                    {/* Zone gauche : label */}
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-bold text-navy-800 text-sm">
                        {cat.label}
                      </span>
                    </div>

                    {/* Zone droite : toggle + chevron */}
                    <div className="flex items-center gap-3">
                      {cat.alwaysActive ? (
                        <span className="text-teal-500 text-xs font-semibold">
                          Toujours activé
                        </span>
                      ) : (
                        /* Toggle — élément indépendant */
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggle(cat.id as "statistiques" | "marketing");
                          }}
                          aria-label={`Activer/désactiver ${cat.label}`}
                          className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
                            consent[cat.id as "statistiques" | "marketing"]
                              ? "bg-teal-400"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                              consent[cat.id as "statistiques" | "marketing"]
                                ? "translate-x-4"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}
                      <div className="flex items-center justify-center">
                        <ChevronDown 
                          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                            openCategory === cat.id ? "rotate-180" : ""
                          }`} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {openCategory === cat.id && (
                    <div className="px-4 py-3 text-sm text-gray-600 leading-relaxed bg-white">
                      {cat.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 shrink-0">
          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={acceptAll}
              className="flex-1 bg-navy-800 hover:bg-navy-900 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
            >
              Accepter
            </button>
            <button
              onClick={refuseAll}
              className="flex-1 border border-gray-300 hover:border-navy-800 text-navy-800 font-bold py-3 px-4 rounded-xl transition-colors text-sm"
            >
              Refuser
            </button>
            {showPreferences ? (
              <button
                onClick={savePreferences}
                className="flex-1 border border-gray-300 hover:border-navy-800 text-navy-800 font-bold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                Enregistrer
              </button>
            ) : (
              <button
                onClick={() => setShowPreferences(true)}
                className="flex-1 border border-gray-300 hover:border-navy-800 text-navy-800 font-bold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                Voir les préférences
              </button>
            )}
          </div>

          {/* Liens légaux */}
          <div className="flex justify-center gap-4 text-xs text-teal-500">
            <Link
              href="/politique-cookies"
              className="hover:text-teal-600 transition-colors"
              onClick={() => setVisible(false)}
            >
              Politique de cookies
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-teal-600 transition-colors"
              onClick={() => setVisible(false)}
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
