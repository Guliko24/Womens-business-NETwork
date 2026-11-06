'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Filter, X, Award, GraduationCap, ShieldCheck } from 'lucide-react';
import { MOCK_BUSINESSES, CATEGORIES, ESSEX_TOWNS } from '@/lib/data';
import BusinessCard from '@/components/BusinessCard';
import ClaimModal from '@/components/ClaimModal';
import { Business } from '@/lib/types';

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [onlyMentors, setOnlyMentors] = useState(false);
  const [onlyHiring, setOnlyHiring] = useState(false);
  const [claimingBusiness, setClaimingBusiness] = useState<Business | null>(null);

  const filteredBusinesses = useMemo(() => {
    return MOCK_BUSINESSES.filter((b) => {
      const matchesSearch =
        searchQuery === '' ||
        b.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.founder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.town.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTown = selectedTown === '' || b.town.toLowerCase() === selectedTown.toLowerCase();
      const matchesCategory = selectedCategory === '' || b.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesMentor = !onlyMentors || b.offers_mentorship;
      const matchesHiring = !onlyHiring || b.has_jobs;

      return matchesSearch && matchesTown && matchesCategory && matchesMentor && matchesHiring;
    });
  }, [searchQuery, selectedTown, selectedCategory, onlyMentors, onlyHiring]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTown('');
    setSelectedCategory('');
    setOnlyMentors(false);
    setOnlyHiring(false);
  };

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Curated Essex Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Essex Female Business Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
            Discover and connect with curated women-owned businesses, consultants, makers, and service providers across the Essex region.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search query */}
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:bg-white focus-within:border-brand-500 transition-colors">
              <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, service, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-800 placeholder-stone-400"
              />
            </div>

            {/* Town selector */}
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50">
              <MapPin className="w-4 h-4 text-brand-600 mr-2 shrink-0" />
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-700"
              >
                <option value="">All 14 Essex Districts</option>
                {ESSEX_TOWNS.map((town) => (
                  <option key={town.name} value={town.name}>
                    {town.name} ({town.district})
                  </option>
                ))}
              </select>
            </div>

            {/* Category selector */}
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50">
              <Filter className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-700"
              >
                <option value="">All Business Sectors</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-100 gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOnlyMentors(!onlyMentors)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  onlyMentors
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Offers Mentorship</span>
              </button>

              <button
                onClick={() => setOnlyHiring(!onlyHiring)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  onlyHiring
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Hiring / Apprenticeship</span>
              </button>

              {(searchQuery || selectedTown || selectedCategory || onlyMentors || onlyHiring) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-800 ml-2 font-medium"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            <span className="text-xs font-semibold text-stone-500">
              Showing {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'}
            </span>
          </div>
        </div>

        {/* Founding Phase Notice Banner */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wide w-fit">
              Founding Phase Notice
            </span>
            <span>
              Listings tagged <strong>&quot;Example listing&quot;</strong> are illustrative placeholders to demonstrate directory layout. Real Essex female business owners are invited to join.
            </span>
          </div>
          <Link
            href="/about"
            className="text-brand-700 hover:text-brand-900 font-semibold underline shrink-0"
          >
            How Verification Works &rarr;
          </Link>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBusinesses.map((b) => (
              <BusinessCard
                key={b.id}
                business={b}
                onClaimClick={(business) => setClaimingBusiness(business)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto">
            <p className="text-stone-400 text-sm font-semibold mb-2">No businesses matched your criteria</p>
            <p className="text-stone-500 text-xs mb-5">
              Try adjusting your town or sector filter, or clear filters to view all entries.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Claim Profile Modal */}
      <ClaimModal
        business={claimingBusiness}
        isOpen={Boolean(claimingBusiness)}
        onClose={() => setClaimingBusiness(null)}
      />
    </div>
  );
}
