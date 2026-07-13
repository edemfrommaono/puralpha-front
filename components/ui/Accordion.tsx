"use client";

import { toHtml } from "@/lib/wysiwyg";
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col border-t border-gray-200">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-b border-gray-200 py-6 px-4 group">
            <button
              onClick={() => toggleItem(idx)}
              className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-navy-800 pr-8">{item.question}</span>
              <span 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-navy-800 font-bold text-xl shrink-0 transition-all duration-300 ${
                  isOpen 
                    ? 'bg-teal-400 text-white transform rotate-45' 
                    : 'bg-gray-100 group-hover:bg-teal-100'
                }`}
              >
                +
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="text-gray-600 text-sm leading-relaxed pr-8" dangerouslySetInnerHTML={{ __html: toHtml(item.answer) }}>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
