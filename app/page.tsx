'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Sparkles, Award, GraduationCap, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { MOCK_BUSINESSES, CATEGORIES, ESSEX_TOWNS, MOCK_JOBS } from '@/lib/data';
import BusinessCard from '@/components/BusinessCard';
import ClaimModal from '@/components/ClaimModal';
import { Business } from '@/lib/types';

export default function HomePage() {
  const [selectedTown, setSelectedTown] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [claimingBusiness, setClaimingBusiness] = useState<Business | null>(null);

  const featuredBusinesses = MOCK_BUSINESSES.slice(0, 4);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-stone-50 pt-16 pb-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 border border-brand-200 text-brand-800 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Dedicated to Female Founders & Leaders Across Essex</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            Empowering, Connecting & Scaling <span className="text-brand-600">Women&apos;s Business NETwork</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover exceptional women-led businesses, access local mentorship, and explore high-potential apprenticeships across Chelmsford, Colchester, Southend, and every corner of Essex.
          </p>

          {/* Quick Search Box */}
          <div className="max-w-3xl mx-auto bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-stone-200/60 border border-stone-200 flex flex-col sm:flex-row gap-2.5">
            <div className="flex-1 flex items-center px-3 gap-2 border-b sm:border-b-0 sm:border-r border-stone-200 py-2 sm:py-0">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Search business, service, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-800 placeholder-stone-400"
              />
            </div>

            <div className="flex items-center px-3 gap-2 py-2 sm:py-0 min-w-[200px]">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-700"
              >
                <option value="">All Essex Locations</option>
                {ESSEX_TOWNS.map((town) => (
                  <option key={town.name} value={town.name}>
                    {town.name}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href={`/directory?query=${encodeURIComponent(searchQuery)}&town=${encodeURIComponent(selectedTown)}`}
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-stone-200/80 text-center">
            <div>
              <p className="text-2xl font-bold text-stone-900">14</p>
              <p className="text-xs text-stone-500 font-medium">Essex Districts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-600">100%</p>
              <p className="text-xs text-stone-500 font-medium">Female Founded</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">1:1</p>
              <p className="text-xs text-stone-500 font-medium">Peer Mentorship</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">Free</p>
              <p className="text-xs text-stone-500 font-medium">Founding Directory</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PILLARS OVERVIEW */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Three Pillars Designed for Essex Women in Business
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Everything you need to be seen, get supported, and hire the next generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-brand-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Curated Directory</h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                A verified showcase of Essex female-owned businesses and services. Helping consumers and B2B buyers hire and buy locally.
              </p>
              <Link href="/directory" className="text-xs font-semibold text-brand-600 flex items-center gap-1 hover:underline">
                Explore Directory &rarr;
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-brand-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Mentorship Programme</h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Match with experienced mentors in finance, marketing, legal, or scaling. Join small peer mastermind pods to stay accountable.
              </p>
              <Link href="/mentorship" className="text-xs font-semibold text-brand-600 flex items-center gap-1 hover:underline">
                Find a Mentor &rarr;
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-brand-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Jobs & Apprenticeships</h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Opening doors for emerging talent, return-to-work mothers, and young apprentices inside female-led teams.
              </p>
              <Link href="/opportunities" className="text-xs font-semibold text-brand-600 flex items-center gap-1 hover:underline">
                View Opportunities &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ESSEX BUSINESSES */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Local Spotlight</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Featured Essex Businesses
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Curated female-led enterprises thriving in our towns and villages.
              </p>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-800"
            >
              <span>View all businesses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBusinesses.map((b) => (
              <BusinessCard
                key={b.id}
                business={b}
                onClaimClick={(business) => setClaimingBusiness(business)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. APPRENTICESHIP HIGHLIGHT BANNER */}
      <section className="py-14 bg-white border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                Nurturing Local Talent
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Are you looking to hire an apprentice in Essex?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                We connect local business owners with enthusiastic apprentices and early-career talent. Post your apprenticeship opening for free during our founding launch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link
                href="/opportunities"
                className="px-6 py-3 rounded-xl bg-white text-stone-900 font-bold text-xs sm:text-sm hover:bg-stone-100 text-center transition-colors"
              >
                Browse Current Openings
              </Link>
              <Link
                href="/admin/import"
                className="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs sm:text-sm hover:bg-brand-700 text-center transition-colors"
              >
                Post an Opportunity
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SURVEY CTA BANNER */}
      <section className="py-16 bg-brand-50/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
            Have Your Say in Our Launch Events & Masterclasses
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mb-6 leading-relaxed">
            We are designing our first in-person Essex networking meetups and practical business clinics. Take our 3-minute community survey to tell us what topics and locations matter most to you.
          </p>
          <a
            href="file:///c:/Users/Dell/Documents/Agy2_Projects/WomensBusinessNETwork/Essex_Women_in_Business_Community_Survey.md"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <span>View Community Survey Questions</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Claim Profile Modal */}
      <ClaimModal
        business={claimingBusiness}
        isOpen={Boolean(claimingBusiness)}
        onClose={() => setClaimingBusiness(null)}
      />
    </div>
  );
}
