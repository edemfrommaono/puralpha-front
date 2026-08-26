"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS, MEDIATOR } from '@/lib/site-config';

const SOCIAL_ICONS = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin } as const;

// Coordonnées harmonisées — source unique : lib/site-config.ts (§8.1)
const CONTACT_ITEMS: Array<{ icon: LucideIcon; value: string; href?: string }> = [
  { icon: Phone, value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}` },
  { icon: Mail, value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: MapPin, value: SITE_CONFIG.address },
  { icon: Clock, value: SITE_CONFIG.hours },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <div>
              <Image
                src="/images/logo_pur_alpha.png"
                alt="PUR Alpha"
                width={180}
                height={52}
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Garde et accompagnement à domicile d'enfants et jeunes en situation de handicap dans le Val-d'Oise.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map(({ key, label, url }) => {
                const Icon = SOCIAL_ICONS[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-gold-500 hover:border-gold-500 text-white/65 hover:text-navy-900 flex items-center justify-center transition-all cursor-pointer"
                    aria-label={`${label} PUR Alpha (nouvel onglet)`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="typo-h3 text-gold-500">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/nos-services" className="hover:text-white transition-colors">Nos services</Link></li>
              <li><Link href="/nos-tarifs" className="hover:text-white transition-colors">Nos tarifs</Link></li>
              <li><Link href="/notre-histoire" className="hover:text-white transition-colors">Notre histoire</Link></li>
              <li><Link href="/nous-rejoindre" className="hover:text-white transition-colors">Nous rejoindre</Link></li>
              <li><Link href="/actualite" className="hover:text-white transition-colors">Actualités</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="typo-h3 text-gold-500">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              {CONTACT_ITEMS.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 shrink-0 mt-0.5 text-gold-500" />
                  {href ? (
                    <a href={href} className="hover:text-gold-400 transition-colors">{value}</a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-5">
            <h4 className="typo-h3 text-gold-500">Informations administratives</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-xs text-white/60 leading-relaxed space-y-1">
              <p>SIRET : 989 156 989 00018</p>
              <p>APE : 88.10B</p>
              <p>Agrément SAP N° : SAP989156989</p>
              <p>Siège social : {SITE_CONFIG.address}</p>
              <p>Assurance RC Pro Hiscox n° : HA RCP0593442</p>
              <p>
                Médiateur de la consommation :{" "}
                <a
                  href={MEDIATOR.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/20 underline-offset-2 hover:text-gold-400 transition-colors"
                >
                  CMCO — {MEDIATOR.websiteLabel}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© 2026 PUR Alpha — Tous droits réservés</p>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
            <span>SIRET : 989 156 989 00018</span>
            <span className="text-white/20">·</span>
            <span>Agrément SAP N° SAP989156989</span>
            <span className="text-white/20">·</span>
            <span>RC Pro Hiscox HA RCP0593442</span>
            <span className="text-white/20">·</span>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <span className="text-white/20">·</span>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <span className="text-white/20">·</span>
            <Link href="/politique-cookies" className="hover:text-white transition-colors">Politique de cookies</Link>
            <span className="text-white/20">·</span>
            <a
              href={MEDIATOR.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="Ouvre la fiche PDF du médiateur de la consommation dans un nouvel onglet"
            >
              Médiateur de la consommation
            </a>
            <span className="text-white/20">·</span>
            <button
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Gérer les cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
