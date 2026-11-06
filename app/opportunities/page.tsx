'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, Briefcase, Mail, Filter, Search, PlusCircle } from 'lucide-react';
import { MOCK_JOBS, ESSEX_TOWNS } from '@/lib/data';

export default function OpportunitiesPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTown, setSelectedTown] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchesType = selectedType === 'All' || job.job_type === selectedType;
      const matchesTown = selectedTown === '' || job.town.toLowerCase() === selectedTown.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesTown && matchesSearch;
    });
  }, [selectedType, selectedTown, searchQuery]);

  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Jobs & Apprenticeships Board</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Opportunities in Essex Female-Led Businesses
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
              Find empowering workplaces, apprenticeships, and flexible roles with female founders making an impact in Essex.
            </p>
          </div>

          <Link
            href="/opportunities/submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit an Opportunity</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search */}
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50">
              <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search job title, skills, or business..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-800"
              />
            </div>

            {/* Town Selector */}
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
                    {town.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Selector */}
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50">
              <Filter className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-700"
              >
                <option value="All">All Types (Apprenticeships, Jobs)</option>
                <option value="Apprenticeship">Apprenticeships Only</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internships</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:border-brand-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        job.job_type === 'Apprenticeship'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {job.job_type}
                    </span>
                    <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-600" />
                      {job.town}, Essex
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900">{job.title}</h3>

                  <Link
                    href={`/directory/${job.business_id}`}
                    className="text-xs font-semibold text-brand-600 hover:underline block"
                  >
                    with {job.business_name}
                  </Link>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {job.requirements && (
                    <p className="text-[11px] text-stone-500">
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <span className="text-xs font-bold text-stone-900">{job.salary_range}</span>
                  <a
                    href={`mailto:${job.apply_url_or_email}?subject=Application for ${job.title} via Women's Business NETwork`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
              <p className="text-sm font-semibold text-stone-500 mb-2">No opportunities found</p>
              <p className="text-xs text-stone-400">Try changing your location or job type filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
