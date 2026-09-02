"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface CoordItem {
  label: string;
  value: string;
  imageUrl: string;
  fallback_icon?: string;
}

interface ContactCoordonneesProps {
  title: string;
  items: CoordItem[];
}

const CONSENT_KEY = "puralpha-cookie-consent";

const MAP_STORAGE_KEY = "puralpha-map-consent";

export function ContactCoordonnees({ title, items }: ContactCoordonneesProps) {
  const [mapConsent, setMapConsent] = useState(false);

  useEffect(() => {
    // Vérifier si la carte a été expressément acceptée via le bouton dédié ou le consentement marketing
    try {
      if (sessionStorage.getItem(MAP_STORAGE_KEY) === "true") {
        setMapConsent(true);
        return;
      }
    } catch { /* ignore */ }

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Google Maps est un service tiers : autorisé si l'utilisateur a accepté la catégorie marketing
        if (parsed.marketing) setMapConsent(true);
      } catch { /* ignore */ }
    }

    // Écouter les changements de consentement
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setMapConsent(!!parsed.marketing);
        } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleAcceptMap = () => {
    try {
      sessionStorage.setItem(MAP_STORAGE_KEY, "true");
    } catch { /* ignore */ }
    setMapConsent(true);
  };

  return (
    <section className="bg-[#ecf4f6] py-8 lg:py-16 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center max-w-5xl mx-auto">
          {/* Infos Coordinates */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">{title}</h2>
            <div className="flex flex-col gap-4 lg:gap-6">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 group-hover:bg-gold-500/20 transition-colors">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    ) : (
                      <span className="text-lg md:text-xl">{item.fallback_icon || "📌"}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    {item.label?.toLowerCase().includes('adresse') || item.label?.toLowerCase().includes('siège') || item.label?.toLowerCase().includes('local') || item.value?.includes('95360') ? (
                      <a 
                        href="https://maps.app.goo.gl/HSnq6Ni2935JW3B67" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-navy-900 text-sm md:text-base hover:text-gold-600 transition-colors underline decoration-gold-500/40 underline-offset-4"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy-900 text-sm md:text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-video md:aspect-[4/3] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-lg">
              {mapConsent ? (
                <iframe
                  src="https://maps.google.com/maps?q=48.9574738,2.3324525&hl=fr&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PUR Alpha — 26 rue des Sablons, 95360 Montmagny"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-gold-500" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-800 text-sm mb-1">Carte Google Maps</p>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                      L&apos;affichage de la carte nécessite le chargement d&apos;un service tiers (Google Maps) qui peut déposer des cookies.
                    </p>
                  </div>
                  <button
                    onClick={handleAcceptMap}
                    className="px-5 py-2.5 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Afficher la carte
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
