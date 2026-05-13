"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-navy-800">
          PUR <span className="text-teal-400">Alpha</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/notre-histoire" className="text-sm font-medium text-gray-600 hover:text-teal-500 transition-colors">
            Notre histoire
          </Link>
          <Link href="/pour-les-familles" className="text-sm font-medium text-gray-600 hover:text-teal-500 transition-colors">
            Pour les familles
          </Link>
          <Link href="/aides-financieres" className="text-sm font-medium text-gray-600 hover:text-teal-500 transition-colors">
            Les aides financières
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-teal-500 transition-colors">
            Nous rejoindre
          </Link>
          
          <Button variant="navy" className="rounded-full px-6 py-2.5" href="/contact">
            Prendre contact
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 text-navy-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
          </svg>
        </button>

      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4 flex flex-col gap-4">
          <Link href="/notre-histoire" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 p-2">
            Notre histoire
          </Link>
          <Link href="/pour-les-familles" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 p-2">
            Pour les familles
          </Link>
          <Link href="/aides-financieres" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 p-2">
            Les aides financières
          </Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 p-2">
            Nous rejoindre
          </Link>
          <Button variant="navy" className="rounded-full w-full justify-center mt-2" onClick={() => setIsMenuOpen(false)} href="/contact">
            Prendre contact
          </Button>
        </div>
      )}
    </header>
  );
}
