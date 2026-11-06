import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Women&apos;s Business NETwork
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Uniting, championing, and scaling female-owned businesses, mentors, and emerging talent across the Essex region.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-brand-400 pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Proudly supporting Essex, UK</span>
            </div>
          </div>

          {/* Directory by Town */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Explore by Town
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><Link href="/directory?town=Chelmsford" className="hover:text-white transition-colors">Chelmsford</Link></li>
              <li><Link href="/directory?town=Colchester" className="hover:text-white transition-colors">Colchester</Link></li>
              <li><Link href="/directory?town=Southend-on-Sea" className="hover:text-white transition-colors">Southend-on-Sea</Link></li>
              <li><Link href="/directory?town=Brentwood" className="hover:text-white transition-colors">Brentwood & Billericay</Link></li>
              <li><Link href="/directory?town=Maldon" className="hover:text-white transition-colors">Maldon & Dengie</Link></li>
              <li><Link href="/directory?town=Epping+Forest" className="hover:text-white transition-colors">Epping Forest & Harlow</Link></li>
            </ul>
          </div>

          {/* Pillars & Governance */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Explore & About
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><Link href="/directory" className="hover:text-white transition-colors">Curated Business Directory</Link></li>
              <li><Link href="/mentorship" className="hover:text-white transition-colors">Mentorship Programme</Link></li>
              <li><Link href="/opportunities" className="hover:text-white transition-colors">Jobs & Apprenticeships</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us & Verification Standards</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">UK GDPR Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Community Info */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Join the Movement
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Are you an Essex female founder? Claim your free profile or register your interest to shape our upcoming masterclasses and local meetups.
            </p>
            <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700 text-xs">
              <span className="font-semibold text-brand-300 block mb-1">Founding Member Initiative</span>
              <span className="text-stone-300">Free lifetime verified directory badge for our first 100 Essex businesses.</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p>&copy; {new Date().getFullYear()} Women&apos;s Business NETwork. All rights reserved.</p>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/about" className="hover:text-stone-300 transition-colors">
              About
            </Link>
          </div>
          <div className="text-stone-400">
            Built with care for female founders, mentors, and apprentices across Essex.
          </div>
        </div>
      </div>
    </footer>
  );
}
