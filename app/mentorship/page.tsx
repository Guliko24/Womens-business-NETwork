'use client';

import React, { useState } from 'react';
import { Award, Users, Calendar, CheckCircle2, ArrowRight, HeartHandshake, ShieldCheck } from 'lucide-react';
import { MOCK_MENTORS } from '@/lib/data';

export default function MentorshipPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'apply'>('browse');
  const [formRole, setFormRole] = useState<'Mentee' | 'Mentor'>('Mentee');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Women&apos;s Business NETwork Mentorship Programme</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            Grow With Confidence Alongside Other Female Leaders
          </h1>
          <p className="text-xs sm:text-base text-stone-600 leading-relaxed">
            No founder should walk alone. Connect with experienced mentors across Essex for 1-on-1 strategic guidance, or join a small 4-person peer mastermind pod.
          </p>

          {/* Toggle Tabs */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-xl mt-6">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'browse'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Browse Essex Mentors
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'apply'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Apply as Mentee or Mentor
            </button>
          </div>
        </div>

        {activeTab === 'browse' ? (
          <div>
            {/* How it Works Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Select Your Focus Area</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Browse mentors by their real-world experience: pricing, contracts, grant funding, branding, or scaling.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Request an Intro Call</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Submit a brief introduction. Our community manager reviews and coordinates a friendly 30-minute discovery call.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Structure Your Growth</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Agree on 3-month goals and milestone check-ins with peer accountability and mutual support.
                </p>
              </div>
            </div>

            {/* High-visibility Sample Banner */}
            <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-amber-950 shadow-sm">
              <div className="flex items-start sm:items-center gap-3">
                <span className="bg-amber-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0">
                  Notice: Sample Data
                </span>
                <p className="leading-relaxed">
                  The mentor profiles shown below are <strong>illustrative examples</strong> to demonstrate how mentor expertise will be displayed. Apply using the tab above to participate as a real mentor or mentee.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('apply');
                }}
                className="underline font-bold text-amber-900 hover:text-black shrink-0 whitespace-nowrap"
              >
                Apply to Mentor &rarr;
              </button>
            </div>

            {/* Mentors Grid */}
            <h2 className="text-xl font-bold text-stone-900 mb-6">Preview: Example Mentors in Essex</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_MENTORS.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between hover:border-brand-300 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-bold px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
                    Demo Sample
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.image_url}
                        alt={m.full_name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-brand-200"
                      />
                      <div>
                        <h3 className="text-base font-bold text-stone-900">{m.full_name}</h3>
                        <p className="text-xs font-medium text-brand-600">{m.business_name}</p>
                        <p className="text-[11px] text-stone-400">{m.town}, Essex</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">{m.bio}</p>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                        Areas of Expertise:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.areas_of_expertise.map((area, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('apply');
                      setFormRole('Mentee');
                    }}
                    className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request Intro with {m.full_name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-1">
                    Join the Essex Mentorship Programme
                  </h3>
                  <p className="text-xs text-stone-500">
                    Fill out this quick form and our community lead will be in touch with next steps.
                  </p>
                </div>

                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    I want to participate as:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormRole('Mentee')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        formRole === 'Mentee'
                          ? 'border-brand-600 bg-brand-50 text-brand-900'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="block text-sm font-bold mb-0.5">Mentee</span>
                      <span className="text-[11px] font-normal text-stone-500">
                        I am looking for guidance & support to grow my business.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormRole('Mentor')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        formRole === 'Mentor'
                          ? 'border-brand-600 bg-brand-50 text-brand-900'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="block text-sm font-bold mb-0.5">Mentor</span>
                      <span className="text-[11px] font-normal text-stone-500">
                        I have 3+ years experience and want to give back.
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="jane@example.co.uk"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Town in Essex *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g. Chelmsford, Colchester..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Business or Sector
                    </label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g. Digital Marketing, Bakery"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {formRole === 'Mentee'
                      ? 'What are your top 1–2 challenges where you need guidance?'
                      : 'What key expertise and experience can you offer?'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    className="w-full text-xs px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Tell us a little about your journey and goals..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-colors"
                >
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Application Received!</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for applying to the Essex Mentorship Programme. We review all applications weekly and will reach out with prospective pairings.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setActiveTab('browse');
                  }}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800"
                >
                  Back to Mentors List
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
