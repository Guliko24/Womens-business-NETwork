import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowLeft, Lock } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | Women's Business NETwork",
  description: "UK GDPR-compliant privacy policy for Women's Business NETwork, detailing how we collect, store, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-brand-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm space-y-8 text-stone-700">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>UK GDPR Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Privacy Policy &amp; Data Notice
            </h1>
            <p className="text-xs text-stone-400 mt-2">
              Last updated: November 2026 &bull; Compliant with the UK Data Protection Act 2018 &amp; UK GDPR
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs leading-relaxed text-stone-600">
            <strong>Summary:</strong> Women&apos;s Business NETwork respects your privacy. We collect only the information necessary to verify female-led businesses, match mentors with mentees, publish local apprenticeship opportunities, and coordinate regional community events across Essex. We never sell your personal data.
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-stone-900">1. Who We Are (Data Controller)</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Women&apos;s Business NETwork (&quot;WBN&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the community platform connecting female founders, professionals, and apprentices across the Essex region.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              If you have any questions about this privacy notice or how we handle your personal data, please contact our Data Protection Lead:
            </p>
            <div className="text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <p><strong>Organisation:</strong> Women&apos;s Business NETwork</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@womensbusinessnetwork.co.uk" className="text-brand-600 underline">privacy@womensbusinessnetwork.co.uk</a></p>
              <p><strong>Region of Operation:</strong> Essex, United Kingdom</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-stone-900">2. What Personal Data We Collect</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Depending on how you interact with our platform, we may collect and process:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 text-stone-600">
              <li><strong>Directory Profiles &amp; Claim Requests:</strong> Full name, business name, official email, phone number, trading town/postcode, website, social handles, and verification documentation.</li>
              <li><strong>Mentorship Programme:</strong> Name, contact details, business sector, years in business, professional biography, mentoring goals, and skill preferences.</li>
              <li><strong>Jobs &amp; Apprenticeship Announcements:</strong> Company name, hiring contact name, work email, vacancy details, and salary brackets.</li>
              <li><strong>Community Surveys &amp; Inquiries:</strong> Your name, email address, topic preferences, and feedback on local workshops and events.</li>
              <li><strong>Technical Data:</strong> Anonymised analytics (page views, browser type) to ensure platform security and reliability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-stone-900">3. Lawful Basis for Processing (UK GDPR)</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Under Article 6 of the UK GDPR, we process your personal data under the following legal bases:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <h3 className="font-bold text-xs text-stone-900 mb-1">A. Consent (Art. 6(1)(a))</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  When you voluntarily apply for mentorship, submit an apprenticeship vacancy, or sign up for survey communications. You can withdraw consent at any time.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <h3 className="font-bold text-xs text-stone-900 mb-1">B. Legitimate Interests (Art. 6(1)(f))</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  To operate, verify, and maintain an accurate, safe directory of female-led businesses for the Essex community, and to prevent fraudulent listings.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-stone-900">4. How We Store and Protect Your Data</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              We implement industry-standard encryption, SSL protocols, and restricted role-based administrative access to protect your personal information against unauthorised access or loss.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              Our technical infrastructure uses trusted European / UK-compliant hosting providers (Vercel and Supabase) that adhere strictly to UK GDPR security standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-stone-900">5. Data Retention</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              We retain business listings and mentorship applications only for as long as your participation in the network is active. If you wish to delete your business profile or remove your information from our database, email us and we will delete it within 14 working days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-stone-900">6. Your Legal Rights Under UK GDPR</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Under UK data protection law, you have specific rights in relation to your personal information:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 text-stone-600">
              <li><strong>The right to access:</strong> You can request a copy of the personal information we hold about you.</li>
              <li><strong>The right to rectification:</strong> You can ask us to correct inaccurate or incomplete information.</li>
              <li><strong>The right to erasure:</strong> You can ask us to erase your personal data (&quot;the right to be forgotten&quot;).</li>
              <li><strong>The right to restrict or object to processing:</strong> You can object to our use of your data under certain circumstances.</li>
              <li><strong>The right to complain:</strong> You have the right to lodge a complaint with the UK supervisory authority, the <strong>Information Commissioner&apos;s Office (ICO)</strong>, at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">ico.org.uk</a>.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-stone-200">
            <h2 className="text-lg font-bold text-stone-900">7. Contact Our Privacy Team</h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              To exercise any of your rights or request profile removal, please contact:
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-900">
              Women&apos;s Business NETwork &mdash; Privacy &amp; Governance<br />
              Email: <a href="mailto:privacy@womensbusinessnetwork.co.uk" className="text-brand-600 underline">privacy@womensbusinessnetwork.co.uk</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
