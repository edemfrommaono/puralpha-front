import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <div className="text-3xl font-black">
              PUR <span className="text-teal-400">Alpha</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Garde et accompagnement à domicile d'enfants et jeunes en situation de handicap dans le Val-d'Oise.²
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gold-500 font-bold text-base">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/notre-histoire" className="hover:text-white transition-colors">Notre histoire</Link></li>
              <li><Link href="/pour-les-familles" className="hover:text-white transition-colors">Pour les familles</Link></li>
              <li><Link href="/aides-financieres" className="hover:text-white transition-colors">Les aides financières</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Nous rejoindre</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gold-500 font-bold text-base">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">📞</span>
                06 14 79 60 47
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">✉️</span>
                contact@puralpha.fr
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">📍</span>
                26 Rue des Sablons, 95360 Montmagny
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">🕒</span>
                Lun-Ven : 9h00 - 17h30
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gold-500 font-bold text-base">Informations administratives</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-xs text-white/50 leading-relaxed">
              <p>SIRET : 989 156 989 00018</p>
              <p>APE : 88.10B</p>
              <p>Siège social : 10 B rue de Paris, 95350 Piscop</p>
              <p>Assurance RC Pro Hiscox n° : HA RCP0593442</p>
              <p>Demande d'agrément qualité SAP en cours</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 PUR Alpha — Tous droits réservés</p>
          <div className="flex items-center flex-wrap gap-6">
            <Link href="#" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
