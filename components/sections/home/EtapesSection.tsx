"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface Step {
  title: string;
  description: string;
}

interface ResolvedStep extends Step {
  imageUrl: string;
}

interface EtapesSectionProps {
  title: string;
  description: string;
  steps: readonly (Step | ResolvedStep)[];
  ctaText: string;
  ctaUrl: string;
}

export function EtapesSection({ title, description, steps, ctaText, ctaUrl }: EtapesSectionProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Petite latence pour laisser la section apparaître avant la barre
          setTimeout(() => setProgress(100), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-8 lg:py-20 w-full bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeInView>
          <h2 className="typo-h2 text-navy-800 mb-3">
            {title}
          </h2>
          <p className="typo-body max-w-2xl mx-auto mb-8 lg:mb-16 text-center">
            {description}
          </p>
        </FadeInView>

        <div className="relative" ref={barRef}>
          {/* Barre de fond — du centre col-1 au centre col-4 : 1/8 → 7/8 */}
          <div className="hidden lg:block absolute top-[27px] h-px bg-teal-400/20"
            style={{ left: "calc(100% / 8)", right: "calc(100% / 8)" }}
          />

          {/* Barre animée (teal) */}
          <div
            className="hidden lg:block absolute top-[27px] h-0.5 bg-teal-400 origin-left"
            style={{
              left: "calc(100% / 8)",
              right: "calc(100% / 8)",
              transform: `scaleX(${progress / 100})`,
              transition: "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          <StaggerContainer stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 min-w-0">
            {steps.map((step, i) => (
              <StaggerItem
                key={i}
                className="relative flex flex-col items-center gap-6 z-10"
              >
                {/* Wrapper Framer Motion pour le hover */}
                <motion.div
                  className="flex flex-col items-center gap-6 cursor-default w-full"
                  whileHover="hovered"
                  initial="rest"
                  animate="rest"
                >
                  {/* Icône */}
                  <div className="relative">
                    <motion.div
                      className="w-14 h-14 bg-white border border-teal-400 rounded-full shadow-md flex items-center justify-center overflow-hidden"
                      variants={{
                        rest: { scale: 1, boxShadow: "0 0 0 0px rgba(82,189,199,0)" },
                        hovered: { scale: 1.12, boxShadow: "0 0 0 7px rgba(82,189,199,0.18)" },
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {"imageUrl" in step && step.imageUrl ? (
                        <Image
                          src={step.imageUrl}
                          alt={step.title}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-teal-400 text-lg">●</span>
                      )}
                    </motion.div>

                    {/* Badge numéro */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-sm text-white"
                      variants={{
                        rest: { scale: 1, backgroundColor: "#52bdc7" },
                        hovered: { scale: 1.15, backgroundColor: "#1c3553" },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {i + 1}
                    </motion.div>
                  </div>

                  {/* Texte */}
                  <motion.div
                    variants={{
                      rest: { y: 0 },
                      hovered: { y: -4 },
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.h3
                      className="typo-h3 mb-2 text-center"
                      variants={{
                        rest: { color: "#1c3553" },
                        hovered: { color: "#52bdc7" },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="typo-small text-center">{step.description}</p>
                  </motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-10 lg:mt-16">
          <Button
            variant="navy"
            href={ctaUrl}
            style={{ borderRadius: "8px", background: "#1C3553" }}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
