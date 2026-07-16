"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import Link from "next/link";

interface InfoNoticeProps {
  text: string;
}

export function InfoNotice({ text }: InfoNoticeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Replaces occurrences of "Politique de confidentialité" with clickable Next.js Links
  const renderTextWithLink = (rawText: string) => {
    const target = "Politique de confidentialité";
    const parts = rawText.split(target);
    if (parts.length === 1) return rawText;

    return parts.reduce((acc: React.ReactNode[], part: string, index: number) => {
      if (index === 0) {
        return [part];
      }
      return [
        ...acc,
        <Link
          key={`link-${index}`}
          href="/politique-confidentialite"
          className="underline font-semibold text-teal-600 hover:text-teal-700 transition-colors"
        >
          {target}
        </Link>,
        part,
      ];
    }, []);
  };

  return (
    <div className="w-full text-left my-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-500 hover:underline transition-colors focus:outline-none cursor-pointer"
      >
        <Info className="w-4 h-4 shrink-0" />
        <span>Informations sur le traitement de vos données</span>
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-teal-50/80 border border-teal-200/50 rounded-xl relative text-xs text-gray-700 leading-relaxed shadow-sm transition-all duration-200">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="pr-6 whitespace-pre-line">
            {renderTextWithLink(text)}
          </div>
        </div>
      )}
    </div>
  );
}
