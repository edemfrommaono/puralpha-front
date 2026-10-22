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
const CONSENT_VALIDITY_DAYS = 180; // 6 mois conformément aux recommandations de la CNIL
const CONSENT_VALIDITY_MS = CONSENT_VALIDITY_DAYS * 24 * 60 * 60 * 1000;

interface StoredConsentData {
  consent: ConsentState;
  timestamp: number;
}

const clearAnalyticsCookies = () => {
  if (typeof document === "undefined") return;
  const cookieNames = ["_ga", "_ga_S60574HD6J", "_gid", "_gat"];
  const hostnames = [
    window.location.hostname,
    `.${window.location.hostname}`,
    window.location.hostname.replace(/^www\./, "."),
    "",
  ];
  const paths = ["/", ""];

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga") || name.startsWith("_gid") || name.startsWith("_gat")) {
      if (!cookieNames.includes(name)) cookieNames.push(name);
    }
  });

  cookieNames.forEach((name) => {
    hostnames.forEach((host) => {
      paths.forEach((path) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};${host ? ` domain=${host};` : ""}`;
      });
    });
  });
};

const parseStoredConsent = (stored: string | null): ConsentState | null => {
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed.timestamp === "number" && parsed.consent) {
      const isExpired = Date.now() - parsed.timestamp > CONSENT_VALIDITY_MS;
      if (isExpired) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed.consent as ConsentState;
    }
    // Ancien format : objet sans timestamp
    if (parsed && typeof parsed.fonctionnel === "boolean") {
      return parsed as ConsentState;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return null;
};

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
      "Le stockage ou l'accès technique qui est utilisé exclusivement à des fins statistiques anonymisées pour mesurer l'audience du site.",
  },
  {
    id: "marketing" as const,
    label: "Marketing et contenus externes",
    alwaysActive: false,
    description:
      "L'accès ou le stockage technique nécessaire pour charger des fonctionnalités ou contenus externes (ex : carte interactive Google Maps).",
  },
];

const updateGtagConsent = (state: ConsentState) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    }
    gtag("consent", "update", {
      analytics_storage: state.statistiques ? "granted" : "denied",
      ad_storage: state.marketing ? "granted" : "denied",
      ad_user_data: state.marketing ? "granted" : "denied",
      ad_personalization: state.marketing ? "granted" : "denied",
    });
  }
};

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
    // Purge de l'ancienne copie locale des preuves de consentement (RGPD minimisation)
    try {
      localStorage.removeItem("puralpha_consent_proofs");
    } catch { /* ignore */ }

    const validConsent = parseStoredConsent(localStorage.getItem(STORAGE_KEY));
    if (!validConsent) {
      setVisible(true);
    } else {
      setConsent(validConsent);
      updateGtagConsent(validConsent);
    }

    // Écouter les demandes de réouverture des paramètres cookies (ex : lien footer)
    const handleOpen = () => {
      const existing = parseStoredConsent(localStorage.getItem(STORAGE_KEY));
      if (existing) {
        setConsent(existing);
        updateGtagConsent(existing);
      }
      setShowPreferences(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const save = (state: ConsentState) => {
    const payload: StoredConsentData = {
      consent: state,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch { /* ignore */ }

    updateGtagConsent(state);

    // Retrait du consentement : nettoyage proactif des cookies et des autorisations temporaires
    if (!state.statistiques) {
      clearAnalyticsCookies();
    }
    if (!state.marketing) {
      try {
        sessionStorage.removeItem("puralpha-map-consent");
      } catch { /* ignore */ }
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("puralpha-consent-changed", { detail: state }));
    }

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
