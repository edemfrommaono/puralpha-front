"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toHtml } from "@/lib/wysiwyg";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface SimulateurSectionProps {
  simulateur?: {
    tag: string;
    titre: string;
    title_highlight: string;
    description: string;
  };
  fallback: {
    tag: string;
    titre: string;
    title_highlight: string;
    description: string;
  };
}

// ──────────────────────────────────────────────
// Constantes
// ──────────────────────────────────────────────
const TARIF_HORAIRE = 38;
const CREDIT_IMPOT_RATIO = 0.5;

// ──────────────────────────────────────────────
// Composant
// ──────────────────────────────────────────────
export function SimulateurSection({ simulateur, fallback: fb }: SimulateurSectionProps) {
  // ── État du formulaire ──
  const [hasPCH, setHasPCH] = useState<"oui" | "non" | null>(null);
  const [pchMontant, setPchMontant] = useState<string>("");
  const [pchHeures, setPchHeures] = useState<string>("");
  const [heures, setHeures] = useState<string>("");
  const [hasAutreAide, setHasAutreAide] = useState<"oui" | "non" | null>(null);
  const [autreAideMontant, setAutreAideMontant] = useState<string>("");
  const [creditImpot, setCreditImpot] = useState<"oui" | "non" | null>(null);

  // ── Calcul du résultat ──
  // Nombre total d'heures d'accompagnement souhaitées par mois
  const heuresNum = parseFloat(heures) || 0;

  // PCH : montant horaire de la notification × heures mensuelles réellement
  // financées (plafonnées au nombre total d'heures souhaitées)
  const pchMontantNum = hasPCH === "oui" ? parseFloat(pchMontant) || 0 : 0;
  const pchHeuresNum =
    hasPCH === "oui" ? Math.min(parseFloat(pchHeures) || 0, heuresNum) : 0;

  // Autre aide mensuelle à prendre en compte
  const autreAideNum =
    hasAutreAide === "oui" ? parseFloat(autreAideMontant) || 0 : 0;

  // Coût mensuel brut : toutes les heures souhaitées au tarif horaire
  const coutBrut = heuresNum * TARIF_HORAIRE;

  // Déduction PCH : uniquement sur les heures financées par la PCH
  const deductionPCH = pchHeuresNum * pchMontantNum;

  // Base mensuelle après PCH et autre aide
  const apresAides = Math.max(0, coutBrut - deductionPCH - autreAideNum);

  // Crédit d'impôt SAP
  const resteTotal =
    creditImpot === "oui" ? apresAides * CREDIT_IMPOT_RATIO : apresAides;

  // Formulaire complet ?
  const isComplete =
    hasPCH !== null &&
    hasAutreAide !== null &&
    creditImpot !== null &&
    heuresNum > 0 &&
    (hasPCH !== "oui" || (pchMontantNum > 0 && pchHeuresNum > 0)) &&
    (hasAutreAide !== "oui" || autreAideNum > 0);

  // ──────────────────────────────────────────────
  // Rendu
  // ──────────────────────────────────────────────
  return (
    <section id="simulateur" className="bg-[#ecf4f6] py-8 lg:py-12 scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-8xl">
        {/* Titre */}
        <div className="text-center mb-6 lg:mb-8">
          <span className="typo-tag text-teal-400 mb-4 inline-block">
            {simulateur?.tag || fb.tag || "Simulateur"}
          </span>
          <h2 className="typo-h2 text-navy-800">
            {simulateur?.titre || fb.titre || "Estimez votre"}{" "}
            <span className="text-teal-400">
              {simulateur?.title_highlight || fb.title_highlight || "reste à charge"}
            </span>
          </h2>
          {(simulateur?.description || fb.description) && (
            <div
              className="mx-auto mt-4 text-center typo-body max-w-6xl"
              dangerouslySetInnerHTML={{
                __html: toHtml(
                  simulateur?.description ||
                  fb.description ||
                  "Répondez aux questions ci-dessous pour obtenir une estimation personnalisée de votre reste à charge."
                )
              }}
            />
          )}
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 flex flex-col gap-8 max-w-3xl mx-auto">
          {/* ─── Étape 1 : PCH ─────────────────────────── */}
          <Step number={1} label="Avez-vous une PCH aide humaine ?">
            <RadioGroup
              value={hasPCH}
              onChange={(v) => {
                setHasPCH(v as "oui" | "non");
                if (v === "non") {
                  setPchMontant("");
                  setPchHeures("");
                }
              }}
              options={[
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ]}
            />

            {hasPCH === "oui" && (
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Quel montant horaire figure sur votre notification ? (€/h)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="ex : 21.50"
                    value={pchMontant}
                    onChange={(e) => setPchMontant(e.target.value)}
                    className="bg-[#ecf4f6] border border-gray-200 rounded-xl px-4 py-3 text-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full max-w-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Combien d'heures par mois sont couvertes par votre PCH ? (h)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    placeholder="ex : 30"
                    value={pchHeures}
                    onChange={(e) => setPchHeures(e.target.value)}
                    className="bg-[#ecf4f6] border border-gray-200 rounded-xl px-4 py-3 text-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full max-w-xs"
                  />
                </div>
                {heuresNum > 0 && (parseFloat(pchHeures) || 0) > heuresNum && (
                  <p className="text-xs text-amber-500">
                    Les heures couvertes par la PCH sont plafonnées au nombre total d'heures souhaitées.
                  </p>
                )}
                {pchMontantNum > 0 && pchHeuresNum > 0 && (
                  <p className="text-xs text-gray-400">
                    Reste sur les heures couvertes :{" "}
                    <span className="font-bold text-teal-600">
                      {Math.max(0, TARIF_HORAIRE - pchMontantNum).toFixed(2)} €/h × {pchHeuresNum} h
                    </span>
                  </p>
                )}
              </div>
            )}

            {hasPCH === "non" && (
              <p className="text-xs text-gray-400 mt-2">
                Base de calcul : <span className="font-bold text-navy-800">{TARIF_HORAIRE} €/h</span> pour toutes les heures
              </p>
            )}
          </Step>

          {/* ─── Étape 2 : Nombre total d'heures souhaitées ── */}
          <Step number={2} label="Nombre total d'heures d'accompagnement souhaitées par mois">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Heures par mois
              </label>
              <input
                type="number"
                min={1}
                step={1}
                placeholder="ex : 40"
                value={heures}
                onChange={(e) => setHeures(e.target.value)}
                className="bg-[#ecf4f6] border border-gray-200 rounded-xl px-4 py-3 text-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full max-w-xs"
              />
            </div>
          </Step>

          {/* ─── Étape 3 : Autre aide ────────────────────── */}
          <Step number={3} label="Bénéficiez-vous d'une autre aide à prendre en compte ?">
            <RadioGroup
              value={hasAutreAide}
              onChange={(v) => {
                setHasAutreAide(v as "oui" | "non");
                if (v === "non") setAutreAideMontant("");
              }}
              options={[
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ]}
            />
            {hasAutreAide === "oui" && (
              <div className="mt-4 flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Montant mensuel de cette aide (€/mois)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="ex : 150"
                  value={autreAideMontant}
                  onChange={(e) => setAutreAideMontant(e.target.value)}
                  className="bg-[#ecf4f6] border border-gray-200 rounded-xl px-4 py-3 text-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full max-w-xs"
                />
              </div>
            )}
            {hasAutreAide === "non" && (
              <p className="text-xs text-gray-400 mt-2">Aucune autre aide prise en compte.</p>
            )}
          </Step>

          {/* ─── Étape 4 : Crédit d'impôt SAP ─────────── */}
          <Step number={4} label="Crédit d'impôt SAP : êtes-vous éligible aux 50 % ?">
            <RadioGroup
              value={creditImpot}
              onChange={(v) => setCreditImpot(v as "oui" | "non")}
              options={[
                { value: "oui", label: "Oui — diviser par 2 le reste à charge" },
                { value: "non", label: "Non" },
              ]}
            />
          </Step>

          {/* ─── Résultat ──────────────────────────────── */}
          {isComplete && (
            <div className="rounded-2xl bg-navy-800 p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Reste à charge estimé
                </span>
                <span className="text-4xl font-extrabold">
                  {resteTotal.toFixed(2)} €
                </span>
                <span className="text-sm opacity-70">
                  par mois, pour {heuresNum} h d'accompagnement
                  {hasPCH === "oui" && pchHeuresNum > 0 && (
                    <> dont {pchHeuresNum} h financées par la PCH</>
                  )}
                </span>
              </div>

              {/* Détail calcul */}
              <div className="text-xs opacity-80 leading-relaxed bg-white/10 rounded-xl px-4 py-3 space-y-1">
                <p>
                  {heuresNum} h × {TARIF_HORAIRE} €/h = <strong>{coutBrut.toFixed(2)} €</strong>
                </p>
                {deductionPCH > 0 && (
                  <p>
                    − PCH : {pchHeuresNum} h × {pchMontantNum.toFixed(2)} €/h ={" "}
                    <strong>{deductionPCH.toFixed(2)} €</strong>
                  </p>
                )}
                {autreAideNum > 0 && (
                  <p>− Autre aide : <strong>{autreAideNum.toFixed(2)} €/mois</strong></p>
                )}
                {creditImpot === "oui" && (
                  <p>÷ 2 (crédit d'impôt SAP 50 %)</p>
                )}
                <p className="border-t border-white/20 pt-1 font-bold">
                  = {resteTotal.toFixed(2)} €/mois
                </p>
              </div>
            </div>
          )}

          {/* Note légale */}
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <AlertTriangle className="inline-block w-4 h-4 mr-1 mb-0.5 text-amber-400 shrink-0" />
            Estimation indicative et non contractuelle. Le montant réel dépend notamment de vos droits ouverts, de votre notification, des aides effectivement perçues, du nombre d'heures financées et des règles fiscales applicables.
          </p>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Sous-composants internes
// ──────────────────────────────────────────────

function Step({
  number,
  label,
  children,
}: {
  number: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy-800 text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        <span className="text-sm font-bold text-navy-800">{label}</span>
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string | null;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${value === opt.value
              ? "bg-navy-800 text-white border-navy-800 shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600"
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
