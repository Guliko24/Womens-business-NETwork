'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { ESSEX_TOWNS } from '@/lib/data';

export default function SurveyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState('Chelmsford');
  const [role, setRole] = useState('Business owner / founder');
  const [bizName, setBizName] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [directoryInterest, setDirectoryInterest] = useState('Yes, please feature my business');
  const [mentorshipInterest, setMentorshipInterest] = useState('Interested in being mentored');
  const [notes, setNotes] = useState('');

  const availableTopics = [
    'Pricing services with confidence',
    'Marketing, social media & branding',
    'Sales & winning corporate/B2B clients',
    'Grants, funding & accessing local Essex capital',
    'Business finance, cash flow & tax essentials',
    'AI & digital tools to save time',
    'Leadership, delegating & hiring apprentices',
    'Work-life balance & avoiding founder burnout',
  ];

  const handleTopicToggle = (t: string) => {
    if (topics.includes(t)) {
      setTopics(topics.filter((item) => item !== t));
    } else {
      setTopics([...topics, t]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-brand-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm">
          {!submitted ? (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Founding Member Voice</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
                Shape Our Community, Workshops &amp; Events
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
                We are shaping our first Essex meetups, expert masterclasses, and founding directory listings. Your input directly influences what topics and locations we prioritize. Takes about 3 minutes.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. About You */}
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-2">
                    1. About You &amp; Your Essex Base
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Harriet Vance"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.co.uk"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Where in Essex are you based? *</label>
                      <select
                        value={town}
                        onChange={(e) => setTown(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        {ESSEX_TOWNS.map((t) => (
                          <option key={t.name} value={t.name}>{t.name} ({t.district})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Which best describes you? *</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="Business owner / founder">Business owner / founder</option>
                        <option value="Self-employed / freelancer">Self-employed / freelancer</option>
                        <option value="Employed professional">Employed professional</option>
                        <option value="Aspiring business owner">Aspiring business owner</option>
                        <option value="Mentor / Adviser">Mentor / Adviser</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Business Name &amp; Website/Instagram (Optional)</label>
                    <input
                      type="text"
                      value={bizName}
                      onChange={(e) => setBizName(e.target.value)}
                      placeholder="e.g. Maldon Studio — @maldonstudio"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {/* 2. Topics of Interest */}
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-2">
                    2. Topics &amp; Practical Knowledge
                  </h2>
                  <p className="text-xs text-stone-500">Which topics would you most like practical guidance on? (Select all that apply)</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availableTopics.map((topic) => (
                      <label
                        key={topic}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          topics.includes(topic)
                            ? 'border-brand-500 bg-brand-50/60 text-brand-900 font-semibold'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={topics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                          className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span>{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Directory & Mentorship */}
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-2">
                    3. Network Participation
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Would you like to be featured in our curated Essex Female Business Directory?
                    </label>
                    <select
                      value={directoryInterest}
                      onChange={(e) => setDirectoryInterest(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Yes, please feature my business">Yes, please feature my business (Free Founding Member Profile)</option>
                      <option value="Interested in showcasing services/portfolio">Interested in showcasing my services / portfolio</option>
                      <option value="I want to use the directory to find/hire local female businesses">I want to use the directory to find &amp; hire local female businesses</option>
                      <option value="Not at this time">Not at this time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mentorship Interest:
                    </label>
                    <select
                      value={mentorshipInterest}
                      onChange={(e) => setMentorshipInterest(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Interested in being mentored">I would love to be paired with an experienced mentor</option>
                      <option value="Interested in volunteering as a mentor">I would love to volunteer as a mentor</option>
                      <option value="Interested in peer mastermind pod">I would love to join a small peer mastermind pod (3–4 founders)</option>
                      <option value="Both mentoring and being mentored">Open to both mentoring and being mentored</option>
                      <option value="None right now">None right now</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      What specific question or challenge would you love us to address first?
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. How do I secure my first corporate contract in Essex? Where can I find local grants?"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-stone-500 leading-relaxed">
                  By submitting this survey, you agree to our <Link href="/privacy" className="text-brand-600 underline">Privacy Policy</Link>. We treat your information with care under UK GDPR standards.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Survey Responses</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Thank You, {name}!</h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
                Your responses have been recorded and will directly shape our upcoming Essex workshops, meetup dates, and founding directory invitations sent to <strong>{email}</strong>.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/directory"
                  className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition-colors"
                >
                  Explore Directory
                </Link>
                <Link
                  href="/"
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
