"use client";

import { toHtml } from "@/lib/wysiwyg";

interface Accompagnement {
  ordre: number;
  titre: string;
  description: string;
}

interface AccompagnementAdminSectionProps {
  accAdmin?: {
    tag: string;
    titre_1: string;
    titre_2: string;
    title_highlight: string;
    description: string;
    accompagnements: Accompagnement[];
  };
  fallback: {
    tag: string;
    titre_1: string;
    titre_2: string;
    title_highlight: string;
    description: string;
    accompagnements: readonly {
      ordre: number;
      titre: string;
      description: string;
    }[];
  };
}

export function AccompagnementAdminSection({ accAdmin, fallback: fb }: AccompagnementAdminSectionProps) {
  const accompagnements = accAdmin?.accompagnements?.length ? accAdmin.accompagnements : fb.accompagnements;

  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-8 lg:mb-16">
          <span className="typo-tag text-teal-400">
            {accAdmin?.tag || fb.tag}
          </span>
          <h2 className="typo-h2 text-navy-800 mt-4">
            {accAdmin?.titre_1 || fb.titre_1}{" "}
            <span className="text-[#F2C94C]">{accAdmin?.title_highlight || fb.title_highlight}</span>
            <br />
            {accAdmin?.titre_2 || fb.titre_2}
          </h2>
          {(accAdmin?.description || fb.description) && (
            <div
              className="prose max-w-2xl mx-auto mt-4 text-center typo-body"
              dangerouslySetInnerHTML={{ __html: toHtml(accAdmin?.description || fb.description) }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accompagnements.map((item, i) => (
            <div key={i} style={{ perspective: "1000px" }} className="h-44 md:h-56">
              <div
                className="relative w-full h-full transition-transform duration-700 cursor-default"
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "rotateY(180deg)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "rotateY(0deg)")}
              >
                {/* Recto — numéro + titre */}
                <div
                  className="absolute inset-0 bg-[#ecf4f6] border border-[#F3F4F6] rounded-[18px] p-5 md:p-6 lg:p-8 shadow-sm flex flex-col gap-2 md:gap-3 overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-[48px] md:text-[60px] font-black text-[#F2C94C]/50 leading-none">
                    {String(item.ordre).padStart(2, "0")}
                  </span>
                  <h3 className="typo-h3 text-navy-800">{item.titre}</h3>
                </div>

                {/* Verso — description */}
                <div
                  className="absolute inset-0 bg-[#ecf4f6] border border-[#F3F4F6] rounded-[18px] p-5 md:p-6 lg:p-8 shadow-sm flex flex-col justify-center gap-2 md:gap-3"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <span className="text-[32px] md:text-[40px] font-black text-[#F2C94C]/40 leading-none">
                    {String(item.ordre).padStart(2, "0")}
                  </span>
                  <p className="typo-small">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
