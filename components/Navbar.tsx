'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, PlusCircle, UploadCloud } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-stone-900 block leading-tight">
                Women&apos;s Business <span className="text-brand-600">NETwork</span>
              </span>
              <span className="text-xs text-stone-500 font-medium tracking-wide uppercase">
                Directory &bull; Mentorship &bull; Jobs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-stone-600">
            <Link href="/directory" className="hover:text-brand-600 transition-colors">
              Business Directory
            </Link>
            <Link href="/mentorship" className="hover:text-brand-600 transition-colors">
              Mentorship
            </Link>
            <Link href="/opportunities" className="hover:text-brand-600 transition-colors">
              Jobs & Apprenticeships
            </Link>
            <Link href="/about" className="hover:text-brand-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/directory"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Explore Businesses</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <Link
            href="/directory"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-800 hover:bg-stone-50"
          >
            Business Directory
          </Link>
          <Link
            href="/mentorship"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-800 hover:bg-stone-50"
          >
            Mentorship Programme
          </Link>
          <Link
            href="/opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-800 hover:bg-stone-50"
          >
            Jobs & Apprenticeships
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-800 hover:bg-stone-50"
          >
            About & Contact
          </Link>
        </div>
      )}
    </header>
  );
}
