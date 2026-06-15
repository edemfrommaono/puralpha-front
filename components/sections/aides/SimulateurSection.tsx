"use client";

import { useState } from "react";
import { AlertTriangle, Lightbulb, Users, Euro } from "lucide-react";

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
const PCH_DEDUCTION = 24.58;
const CREDIT_IMPOT_RATIO = 0.5;

// ──────────────────────────────────────────────
// Composant
// ──────────────────────────────────────────────
export function SimulateurSection({ simulateur, fallback: fb }: SimulateurSectionProps) {
  // ── État du formulaire ──
  const [hasPCH, setHasPCH] = useState<"oui" | "non" | null>(null);
  const [pchMontant, setPchMontant] = useState<string>("");
  const [hasAutresAides, setHasAutresAides] = useState<"oui" | "non" | null>(null);
  const [autresAides, setAutresAides] = useState<string>("");
  const [creditImpot, setCreditImpot] = useState<"oui" | "non" | null>(null);
  const [heures, setHeures] = useState<string>("");

  // ── Calcul du résultat ──
  const heuresNum = parseFloat(heures) || 0;
  const autresAidesNum = hasAutresAides === "oui" ? parseFloat(autresAides) || 0 : 0;

  // Déduction PCH
  const deductionPCH =
    hasPCH === "oui"
      ? pchMontant
        ? parseFloat(pchMontant) || PCH_DEDUCTION
        : PCH_DEDUCTION
      : 0;

  // Base après PCH
  const apresDeductionPCH = Math.max(0, TARIF_HORAIRE - deductionPCH);

  // Base après autres aides
  const apresAutresAides = Math.max(0, apresDeductionPCH - autresAidesNum);

  // Crédit d'impôt SAP
  const tauxHoraire =
    creditImpot === "oui"
      ? apresAutresAides * CREDIT_IMPOT_RATIO
      : apresAutresAides;

  // Reste à charge total
  const resteTotal = heuresNum > 0 ? tauxHoraire * heuresNum : null;

  // Formulaire complet ?
  const isComplete = hasPCH !== null && hasAutresAides !== null && creditImpot !== null && heuresNum > 0;

  // ──────────────────────────────────────────────
  // Rendu
  // ──────────────────────────────────────────────
  return (
    <section id="simulateur" className="bg-[#ecf4f6] py-8 lg:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Titre */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-block text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
            {simulateur?.tag || fb.tag || "Simulateur"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-navy-800 leading-tight">
            {simulateur?.titre || fb.titre || "Estimez votre"}{" "}
            <span className="text-teal-400">
              {simulateur?.title_highlight || fb.title_highlight || "reste à charge"}
            </span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            {simulateur?.description ||
              fb.description ||
              "Répondez aux questions ci-dessous pour obtenir une estimation personnalisée de votre reste à charge."}
          </p>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 flex flex-col gap-8 max-w-3xl mx-auto">
          {/* ─── Étape 1 : PCH ─────────────────────────── */}
          <Step number={1} label="Avez-vous une PCH aide humaine ?">
            <RadioGroup
              value={hasPCH}
              onChange={(v) => {
                setHasPCH(v as "oui" | "non");
                if (v === "non") setPchMontant("");
              }}
              options={[
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ]}
            />

            {hasPCH === "oui" && (
              <div className="mt-4 flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Montant de la PCH (€/h) — par défaut : {PCH_DEDUCTION} €/h
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder={`ex : ${PCH_DEDUCTION}`}
                  value={pchMontant}
                  onChange={(e) => setPchMontant(e.target.value)}
                  className="bg-[#ecf4f6] border border-gray-200 rounded-xl px-4 py-3 text-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full max-w-xs"
                />
                {hasPCH === "oui" && (
                  <p className="text-xs text-gray-400 mt-1">
                    Base après PCH :{" "}
                    <span className="font-bold text-teal-600">
                      {(TARIF_HORAIRE - (parseFloat(pchMontant) || PCH_DEDUCTION)).toFixed(2)} €/h
                    </span>
                  </p>
                )}
              </div>
            )}

            {hasPCH === "non" && (
              <p className="text-xs text-gray-400 mt-2">
                Base de calcul : <span className="font-bold text-navy-800">{TARIF_HORAIRE} €/h</span>
              </p>
            )}
          </Step>

          {/* ─── Étape 2 : Autres aides ────────────────── */}
          <Step number={2} label="Avez-vous d'autres aides complémentaires à déduire ?">
            <RadioGroup
              value={hasAutresAides}
              onChange={(v) => {
                setHasAutresAides(v as "oui" | "non");
                if (v === "non") setAutresAides("");
              }}
              options={[
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ]}
            />
            {hasAutresAides === "oui" && (
              <div className="mt-4 flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Montant des autres aides (€/h)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="ex : 5"
                  value={autresAides}
                  onChange={(e) => setAutresAides(e.target.value)}
                  className="bg-[#ecf4f6] border border-gray-200 rounded-xl px-4 py-3 text-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full max-w-xs"
                />
              </div>
            )}
            {hasAutresAides === "non" && (
              <p className="text-xs text-gray-400 mt-2">Aucune aide complémentaire déduite.</p>
            )}
          </Step>

          {/* ─── Étape 3 : Crédit d'impôt SAP ─────────── */}
          <Step number={3} label="Êtes-vous éligible au crédit d'impôt SAP de 50 % ?">
            <RadioGroup
              value={creditImpot}
              onChange={(v) => setCreditImpot(v as "oui" | "non")}
              options={[
                { value: "oui", label: "Oui — diviser par 2 le reste à charge" },
                { value: "non", label: "Non" },
              ]}
            />
          </Step>

          {/* ─── Étape 4 : Nombre d'heures ─────────────── */}
          <Step number={4} label="Nombre d'heures souhaitées">
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

          {/* ─── Résultat ──────────────────────────────── */}
          {isComplete && resteTotal !== null && (
            <div className="rounded-2xl bg-gradient-to-br from-[#0d3d4f] to-[#145c72] p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Reste à charge estimé
                </span>
                <span className="text-4xl font-extrabold">
                  {resteTotal.toFixed(2)} €
                </span>
                <span className="text-sm opacity-70">
                  pour {heuresNum} h × {tauxHoraire.toFixed(2)} €/h
                </span>
              </div>

              {/* Détail calcul */}
              <div className="text-xs opacity-80 leading-relaxed bg-white/10 rounded-xl px-4 py-3 space-y-1">
                <p>Tarif de départ : <strong>{TARIF_HORAIRE} €/h</strong></p>
                {hasPCH === "oui" && (
                  <p>− PCH : <strong>{(parseFloat(pchMontant) || PCH_DEDUCTION).toFixed(2)} €/h</strong></p>
                )}
                {autresAidesNum > 0 && (
                  <p>− Autres aides : <strong>{autresAidesNum.toFixed(2)} €/h</strong></p>
                )}
                {creditImpot === "oui" && (
                  <p>÷ 2 (crédit d'impôt SAP 50 %)</p>
                )}
                <p className="border-t border-white/20 pt-1 font-bold">
                  = {tauxHoraire.toFixed(2)} €/h net
                </p>
              </div>
            </div>
          )}

          {/* Note légale */}
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <AlertTriangle className="inline-block w-4 h-4 mr-1 mb-0.5 text-amber-400 shrink-0" />
          Estimation indicative. Le reste à charge dépend des droits ouverts, du nombre d&apos;heures accordées et de l&apos;éligibilité au crédit d&apos;impôt. Un échange personnalisé permet d&apos;affiner le calcul.
          </p>
        </div>

        {/* Exemples rapides */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-xl font-bold text-navy-800">Exemples rapides</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ExempleCard
              icon={<Users className="w-5 h-5" />}
              badge="PCH activée"
              title="Avec PCH + crédit d'impôt"
              steps={[
                { label: "Tarif de base", value: `${TARIF_HORAIRE} €/h` },
                { label: "− PCH", value: `${PCH_DEDUCTION} €/h`, negative: true },
                { label: "÷ 2 crédit impôt", value: `${((TARIF_HORAIRE - PCH_DEDUCTION) / 2).toFixed(2)} €/h`, highlight: true },
              ]}
              result={`${(((TARIF_HORAIRE - PCH_DEDUCTION) / 2) * 10).toFixed(2)} €`}
              resultLabel="pour 10 heures"
              color="teal"
            />
            <ExempleCard
              icon={<Euro className="w-5 h-5" />}
              badge="Sans PCH"
              title="Sans PCH + crédit d'impôt"
              steps={[
                { label: "Tarif de base", value: `${TARIF_HORAIRE} €/h` },
                { label: "÷ 2 crédit impôt", value: `${TARIF_HORAIRE / 2} €/h`, highlight: true },
              ]}
              result={`${(TARIF_HORAIRE / 2) * 10} €`}
              resultLabel="pour 10 heures"
              color="navy"
            />
          </div>
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
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0d3d4f] text-white text-xs font-bold flex items-center justify-center">
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
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
            value === opt.value
              ? "bg-[#0d3d4f] text-white border-[#0d3d4f] shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ExempleCard({
  icon,
  badge,
  title,
  steps,
  result,
  resultLabel,
  color,
}: {
  icon: React.ReactNode;
  badge: string;
  title: string;
  steps: { label: string; value: string; negative?: boolean; highlight?: boolean }[];
  result: string;
  resultLabel: string;
  color: "teal" | "navy";
}) {
  const accent = color === "teal" ? "text-teal-600" : "text-[#0d3d4f]";
  const badgeBg = color === "teal" ? "bg-teal-50 text-teal-700" : "bg-[#ecf4f6] text-[#0d3d4f]";
  const iconBg = color === "teal" ? "bg-teal-100 text-teal-600" : "bg-[#ecf4f6] text-[#0d3d4f]";
  const resultBg = color === "teal"
    ? "bg-gradient-to-br from-teal-500 to-teal-700"
    : "bg-gradient-to-br from-[#0d3d4f] to-[#145c72]";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${badgeBg}`}>
            {badge}
          </span>
        </div>
        <p className={`text-sm font-bold ${accent}`}>{title}</p>
        {/* Étapes de calcul */}
        <div className="space-y-1.5 pt-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className={`text-xs ${
                s.negative ? "text-red-400" : s.highlight ? accent : "text-gray-400"
              }`}>
                {s.label}
              </span>
              <span className={`text-xs font-bold ${
                s.negative ? "text-red-500" : s.highlight ? accent : "text-gray-600"
              }`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Résultat */}
      <div className={`${resultBg} px-5 py-4 flex items-center justify-between text-white mt-auto`}>
        <span className="text-xs opacity-80 font-medium">{resultLabel}</span>
        <span className="text-xl font-extrabold tracking-tight">{result}</span>
      </div>
    </div>
  );
}
