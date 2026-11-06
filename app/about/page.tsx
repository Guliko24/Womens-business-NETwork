import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, HeartHandshake, Award, GraduationCap, Mail, MapPin, ArrowRight, HelpCircle } from 'lucide-react';

export const metadata = {
  title: "About Us & Verification Standards | Women's Business NETwork",
  description: "Learn about the mission, governance, and verification criteria of the Women's Business NETwork supporting female founders across Essex.",
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission &amp; Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            Championing Essex Female Business Leaders
          </h1>
          <p className="text-xs sm:text-base text-stone-600 leading-relaxed">
            Women&apos;s Business NETwork is an independent community initiative dedicated to uniting, mentoring, and amplifying female-led enterprises across all 14 Essex districts.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm space-y-10 text-stone-700">
          {/* Story & Vision */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">Why Women&apos;s Business NETwork Was Created</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Female entrepreneurship across Essex is thriving — from independent makers and wellness practitioners in Leigh-on-Sea to commercial lawyers in Brentwood, tech innovators in Colchester, and artisan food creators in Maldon.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              Yet many female founders often face the same hurdles: feeling isolated, seeking trusted local mentors, navigating growth without corporate jargon, and looking for accessible ways to hire early-career apprentices.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              Women&apos;s Business NETwork brings these three critical elements under one roof:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-xs text-stone-900 block mb-1">1. Curated Directory</span>
                <span className="text-xs text-stone-600">Helping consumers and corporate buyers easily find, hire, and purchase from verified female-led businesses.</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-xs text-stone-900 block mb-1">2. Peer Mentorship</span>
                <span className="text-xs text-stone-600">Matching emerging founders with established leaders in pricing, legal, funding, and marketing.</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-xs text-stone-900 block mb-1">3. Opportunity Hub</span>
                <span className="text-xs text-stone-600">Creating pathways for young talent, apprentices, and women returning to the workforce.</span>
              </div>
            </div>
          </section>

          {/* Verification Governance Standard */}
          <section id="verification" className="space-y-4 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 text-brand-700 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Governance &amp; Trust</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900">How Our Verification Standard Works</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              To ensure our directory remains a trusted, high-integrity resource, businesses listed as &quot;Verified&quot; must meet three clear criteria:
            </p>

            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xs text-stone-900">Female Leadership Standard</h3>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    The business must have at least <strong>51% female ownership</strong> or be founded/co-founded and actively managed by a woman.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xs text-stone-900">Essex Operating Presence</h3>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    The business must have an active trading presence, registered office, or workshop within one of the <strong>14 Essex local authority districts</strong> (including unitary authorities Southend and Thurrock).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xs text-stone-900">Identity &amp; Domain Verification</h3>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    When an owner claims a profile, our team checks the claimant&apos;s corporate email domain, Companies House filing, or public social identity before granting verified administrative ownership.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sample Listings Disclosure */}
          <section className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-amber-900">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <h3 className="font-bold text-xs">Platform Prototype &amp; Example Listings Disclosure</h3>
            </div>
            <p className="text-xs leading-relaxed">
              During our initial prototype launch and founding member invitation phase, entries marked <strong>&quot;Example listing&quot;</strong> are realistic placeholders used to demonstrate layout formatting and directory capabilities. As real Essex business owners claim and register their profiles, example listings will be replaced with live member data.
            </p>
          </section>

          {/* Contact Details */}
          <section className="space-y-4 pt-6 border-t border-stone-200">
            <h2 className="text-xl font-bold text-stone-900">Get in Touch</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Whether you are an Essex female founder interested in joining our founding cohort, a local council representative, or an experienced executive wishing to mentor, we would love to hear from you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Mail className="w-4 h-4 text-brand-600" />
                  <span>General Enquiries &amp; Partnerships</span>
                </div>
                <p className="text-stone-600">Email: <a href="mailto:hello@womensbusinessnetwork.co.uk" className="text-brand-600 underline">hello@womensbusinessnetwork.co.uk</a></p>
                <p className="text-stone-600">Response time: Within 24–48 hours</p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span>Regional Focus</span>
                </div>
                <p className="text-stone-600">Covering Chelmsford, Colchester, Southend, Thurrock, Brentwood, Basildon, Braintree, Maldon, Epping, Harlow, Rochford, Tendring, Uttlesford, and Castle Point.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/directory"
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Browse Business Directory
              </Link>
              <Link
                href="/mentorship"
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors"
              >
                Explore Mentorship
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
