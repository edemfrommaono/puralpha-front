"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

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
            <p className="text-white/60 text-sm leading-relaxed">
              Garde et accompagnement à domicile d'enfants et jeunes en situation de handicap dans le Val-d'Oise.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gold-500 font-bold text-base">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/nos-services" className="hover:text-white transition-colors">Nos services</Link></li>
              <li><Link href="/nos-tarifs" className="hover:text-white transition-colors">Nos tarifs</Link></li>
              <li><Link href="/notre-histoire" className="hover:text-white transition-colors">Notre histoire</Link></li>
              <li><Link href="/nous-rejoindre" className="hover:text-white transition-colors">Nous rejoindre</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Actualités</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gold-500 font-bold text-base">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                <span>06 14 79 60 47</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                <span>contact@puralpha.fr</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>14K - 26 Rue des Sablons, 95360 Montmagny</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Lun-Ven : 9h00 - 17h30</span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gold-500 font-bold text-base">Informations administratives</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-xs text-white/50 leading-relaxed space-y-1">
              <p>SIRET : 989 156 989 00018</p>
              <p>APE : 88.10B</p>
              <p>Agrément SAP N° : SAP989156989</p>
              <p>Siège social : 10 B rue de Paris, 95350 Piscop</p>
              <p>Assurance RC Pro Hiscox n° : HA RCP0593442</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 PUR Alpha — Tous droits réservés</p>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
            <span>SIRET : 989 156 989 00018</span>
            <span className="text-white/20">·</span>
            <span>Agrément SAP N° SAP989156989</span>
            <span className="text-white/20">·</span>
            <span>RC Pro Hiscox HA RCP0593442</span>
            <span className="text-white/20">·</span>
            {/* <Link href="#" className="hover:text-white transition-colors">Médiateur</Link> */}
            {/* <span className="text-white/20">·</span> */}
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <span className="text-white/20">·</span>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <span className="text-white/20">·</span>
            <Link href="/politique-cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
