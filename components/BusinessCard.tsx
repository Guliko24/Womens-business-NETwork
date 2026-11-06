import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Award, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { Business } from '@/lib/types';

interface BusinessCardProps {
  business: Business;
  onClaimClick?: (business: Business) => void;
}

export default function BusinessCard({ business, onClaimClick }: BusinessCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all flex flex-col overflow-hidden group">
      {/* Top Banner / Image */}
      <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
        {business.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={business.image_url}
            alt={business.business_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-brand-100 to-stone-100 text-brand-600 font-bold text-xl">
            {business.business_name.slice(0, 2).toUpperCase()}
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="bg-white/90 backdrop-blur text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {business.category}
          </span>
          {business.is_sample && (
            <span className="bg-stone-900/85 backdrop-blur text-stone-200 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm border border-stone-700">
              Example listing
            </span>
          )}
        </div>

        {/* Unclaimed Pill */}
        {!business.is_claimed && (
          <button
            onClick={() => onClaimClick?.(business)}
            className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm transition-colors"
          >
            Claim Profile
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Badges */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="inline-flex items-center gap-1 font-medium text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              {business.town}, Essex
            </span>

            {business.is_verified && (
              <span 
                className="inline-flex items-center gap-1 text-emerald-700 font-medium text-[11px]"
                title="Verified standard: >=51% female ownership or female founder-led in Essex"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {business.is_sample ? 'Verified standard' : 'Verified'}
              </span>
            )}
          </div>

          {/* Business Title */}
          <Link href={`/directory/${business.id}`}>
            <h3 className="text-lg font-bold text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1">
              {business.business_name}
            </h3>
          </Link>

          {/* Founder Name */}
          <p className="text-xs font-medium text-brand-700 mb-3">
            Founded by {business.founder_name}
          </p>

          {/* Short Bio */}
          <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4">
            {business.short_description}
          </p>
        </div>

        {/* Feature Badges & Footer */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {business.offers_mentorship && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-medium border border-rose-100">
                <Award className="w-3 h-3 text-rose-500" />
                Offers Mentorship
              </span>
            )}

            {business.has_jobs && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
                <GraduationCap className="w-3 h-3 text-emerald-600" />
                Hiring / Apprentice
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">Postcode: {business.postcode}</span>
            <Link
              href={`/directory/${business.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
