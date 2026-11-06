'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, GraduationCap, Briefcase } from 'lucide-react';
import { ESSEX_TOWNS } from '@/lib/data';

export default function SubmitOpportunityPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    contact_name: '',
    contact_email: '',
    title: '',
    job_type: 'Apprenticeship',
    town: 'Chelmsford',
    salary_range: '',
    description: '',
    requirements: '',
    apply_url_or_email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-brand-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </Link>

        <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
          {!submitted ? (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>Founding Member Submission</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
                Post an Apprenticeship or Job Opening
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
                Connect your business with motivated local talent, apprentices, and women returning to the workforce across Essex. Postings are free during our founding launch.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g. The Essex Bloom Studio"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Contact Name & Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g. Harriet Vance, Founder"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="you@yourdomain.co.uk"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Opportunity Location (Essex District) *
                    </label>
                    <select
                      value={formData.town}
                      onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {ESSEX_TOWNS.map((t) => (
                        <option key={t.name} value={t.name}>
                          {t.name} ({t.district})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Role Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g. Floristry Apprentice (Level 2)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Opportunity Type *
                    </label>
                    <select
                      value={formData.job_type}
                      onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Apprenticeship">Apprenticeship</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance Contract</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Salary / Compensation (or Apprenticeship Wage) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.salary_range}
                    onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. £16,500 - £18,000 / year or £12.50/hr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Role Description & Learning Outcomes *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Describe what the role involves and what mentorship or training is provided..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Application Instructions (Email or URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.apply_url_or_email}
                    onChange={(e) => setFormData({ ...formData, apply_url_or_email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. jobs@yourdomain.co.uk or link to application form"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-colors"
                  >
                    Submit Opportunity for Moderation
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    All listings are reviewed by the Women&apos;s Business NETwork team before appearing live.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Opportunity Submitted!</h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
                Thank you, {formData.contact_name}. Our community team will review your posting against our female-led standard and publish it to the Essex board within 24–48 hours.
              </p>
              <Link
                href="/opportunities"
                className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Return to Opportunities
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
