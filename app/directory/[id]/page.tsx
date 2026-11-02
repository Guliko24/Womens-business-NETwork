'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { 
  MapPin, ShieldCheck, Globe, Instagram, Mail, Phone, 
  Award, GraduationCap, ArrowLeft, Share2, Check, Sparkles 
} from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_JOBS } from '@/lib/data';
import ClaimModal from '@/components/ClaimModal';
import { Business } from '@/lib/types';

export default function BusinessDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [copied, setCopied] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  const business = MOCK_BUSINESSES.find(
    (b) => b.id === id || b.slug === id
  );

  if (!business) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Business Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">The profile you requested does not exist or has moved.</p>
        <Link href="/directory" className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold">
          Return to Directory
        </Link>
      </div>
    );
  }

  const relatedJobs = MOCK_JOBS.filter((j) => j.business_id === business.id);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-brand-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Essex Directory</span>
        </Link>

        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm mb-8">
          <div className="relative h-64 sm:h-72 w-full bg-stone-100">
            {business.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={business.image_url}
                alt={business.business_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-brand-100 to-stone-100 text-brand-600 font-bold text-3xl">
                {business.business_name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {business.category}
                  </span>
                  {business.is_verified && (
                    <span className="bg-white/20 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Female-Owned
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {business.business_name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <span>{business.town}, Essex ({business.postcode})</span>
                  <span>&bull;</span>
                  <span>Founded by {business.founder_name}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Unclaimed Notice Bar if applicable */}
          {!business.is_claimed && (
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-amber-900 font-medium">
                Are you the owner of <strong>{business.business_name}</strong>? Claim this listing to update your information and post vacancies.
              </span>
              <button
                onClick={() => setIsClaimModalOpen(true)}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shrink-0 transition-colors"
              >
                Claim This Profile
              </button>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Story & Offerings (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* About / Story */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Our Story & Mission</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {business.full_description || business.short_description}
              </p>
            </div>

            {/* Mentorship Section if active */}
            {business.offers_mentorship && (
              <div className="bg-rose-50/70 rounded-2xl border border-rose-200 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base mb-2">
                  <Award className="w-5 h-5 text-rose-600" />
                  <span>Mentorship & Knowledge Sharing</span>
                </div>
                <p className="text-xs text-rose-900/80 leading-relaxed mb-4">
                  {business.founder_name} is an active mentor in our Essex Women&apos;s Business Network. She is available to advise early-stage founders in:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {business.mentor_topics?.map((topic, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-rose-700 border border-rose-200 shadow-sm">
                      {topic}
                    </span>
                  ))}
                </div>
                <Link
                  href="/mentorship"
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 underline"
                >
                  Apply for a mentorship intro call &rarr;
                </Link>
              </div>
            )}

            {/* Jobs & Apprenticeships if active */}
            {business.has_jobs && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-base mb-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <span>Current Opportunities with {business.business_name}</span>
                </div>
                <p className="text-xs text-stone-500 mb-4">
                  This business is committed to training and hiring local Essex talent.
                </p>

                {relatedJobs.length > 0 ? (
                  <div className="space-y-3">
                    {relatedJobs.map((job) => (
                      <div key={job.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900">{job.title}</h4>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            {job.job_type}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed mb-3">{job.description}</p>
                        <div className="flex flex-wrap items-center justify-between text-xs gap-2 pt-2 border-t border-stone-200">
                          <span className="font-semibold text-stone-700">{job.salary_range}</span>
                          <a
                            href={`mailto:${job.apply_url_or_email}?subject=Application for ${job.title}`}
                            className="px-3 py-1 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                          >
                            Apply via Email
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-stone-50 text-xs text-stone-600">
                    <p className="font-semibold mb-1">Open Positions Listed:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {business.job_titles?.map((jt, i) => (
                        <li key={i}>{jt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar / Contact Info (1 Col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Connect & Details
              </h3>

              <div className="space-y-3 text-xs">
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-stone-700 hover:text-brand-600 transition-colors p-2 rounded-lg hover:bg-stone-50"
                  >
                    <Globe className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="truncate">{business.website.replace('https://', '')}</span>
                  </a>
                )}

                {business.instagram && (
                  <a
                    href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-stone-700 hover:text-brand-600 transition-colors p-2 rounded-lg hover:bg-stone-50"
                  >
                    <Instagram className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{business.instagram}</span>
                  </a>
                )}

                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-center gap-2.5 text-stone-700 hover:text-brand-600 transition-colors p-2 rounded-lg hover:bg-stone-50"
                  >
                    <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="truncate">{business.email}</span>
                  </a>
                )}

                {business.phone && (
                  <div className="flex items-center gap-2.5 text-stone-700 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{business.phone}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100">
                <a
                  href={`mailto:${business.email || 'hello@womensbusinessnetwork.co.uk'}?subject=Inquiry via Women's Business NETwork`}
                  className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </a>
              </div>
            </div>

            {/* Safety & Verification Card */}
            <div className="bg-stone-100/70 rounded-2xl p-5 border border-stone-200 text-xs text-stone-600">
              <span className="font-bold text-stone-900 block mb-1">
                Verified Essex Community Listing
              </span>
              <p className="leading-relaxed text-[11px] text-stone-500">
                Every business listed here is vetted to confirm female leadership and active operations within Essex.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      <ClaimModal
        business={business}
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      />
    </div>
  );
}
