import Link from 'next/link';
import { Home, Compass, ArrowRight, Search } from 'lucide-react';
import { FadeInView } from '@/components/ui/FadeInView';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-slate-50/50 flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Éléments de fond décoratifs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-100/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0d3d4f]/5 rounded-full blur-3xl pointer-events-none" />

      <FadeInView direction="up" className="relative z-10 max-w-2xl w-full text-center">
        {/* Le grand 404 */}
        <div className="relative inline-block mb-6">
          <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#0d3d4f] to-teal-500 opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white shadow-2xl rounded-3xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-500">
              <Compass className="w-10 h-10 md:w-14 md:h-14 text-teal-500" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d3d4f] mb-4">
          Oups ! Vous semblez perdu...
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          La page que vous recherchez n'existe pas, a été déplacée ou n'est temporairement pas disponible. Retrouvez votre chemin grâce aux liens ci-dessous.
        </p>

        {/* Bouton principal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 bg-[#0d3d4f] hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Liens rapides */}
        <div className="border-t border-gray-200/60 pt-10">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Liens utiles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <QuickLink href="/nos-services" title="Nos services" />
            <QuickLink href="/actualite" title="Actualités" />
            <QuickLink href="/contact" title="Nous contacter" />
          </div>
        </div>
      </FadeInView>
    </div>
  );
}

function QuickLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-teal-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <span className="text-sm font-bold text-gray-600 group-hover:text-[#0d3d4f]">
        {title}
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-teal-500 transition-colors" />
    </Link>
  );
}
