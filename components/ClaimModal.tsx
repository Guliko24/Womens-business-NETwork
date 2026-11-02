'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ShieldAlert } from 'lucide-react';
import { Business } from '@/lib/types';

interface ClaimModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ClaimModal({ business, isOpen, onClose }: ClaimModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !business) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission or Supabase insertion
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-stone-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-brand-600 mb-2">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Owner Verification</span>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-1">
              Claim &quot;{business.business_name}&quot;
            </h3>
            <p className="text-xs text-stone-500 mb-5 leading-relaxed">
              Are you the owner or authorised manager of this business in {business.town}? 
              Verify your identity to update your listings, post jobs, and manage mentorship opportunities.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harriet Vance"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Official Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourdomain.co.uk"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Verification Note / Social Profile Link
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Link to your Instagram/LinkedIn or mention if you received our invite email."
                  className="w-full text-xs px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm"
                >
                  Submit Claim for Approval
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">Verification Request Sent!</h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you, {name}. Our Essex curator team will verify your details against your business domain/socials and send an activation link to <strong>{email}</strong> within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
