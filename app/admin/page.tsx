'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Lock, LogOut, UploadCloud, PlusCircle, 
  CheckCircle, AlertTriangle, Trash2, Search, Building2, 
  Users, Award, GraduationCap, FileSpreadsheet, Download, 
  ExternalLink, Check, Eye
} from 'lucide-react';
import { MOCK_BUSINESSES, CATEGORIES, ESSEX_TOWNS } from '@/lib/data';
import { Business } from '@/lib/types';

interface ClaimRequest {
  id: string;
  businessId: string;
  businessName: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone?: string;
  notes?: string;
  status: 'Pending' | 'Approved' | 'Declined';
  date: string;
}

interface ParsedBusiness {
  business_name: string;
  founder_name: string;
  town: string;
  postcode: string;
  category: string;
  short_description: string;
  website: string;
  instagram: string;
  email: string;
  offers_mentorship: boolean;
  has_jobs: boolean;
  isValid: boolean;
  error?: string;
}

export default function AdminPortalPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'businesses' | 'import' | 'claims'>('businesses');

  // Business Directory Management State
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTownFilter, setSelectedTownFilter] = useState('');

  // Modal for Adding Single Business
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBiz, setNewBiz] = useState({
    business_name: '',
    founder_name: '',
    town: 'Chelmsford',
    postcode: '',
    category: 'Creative & Design',
    short_description: '',
    website: '',
    instagram: '',
    email: '',
    phone: '',
    offers_mentorship: false,
    has_jobs: false,
  });

  // Claim Requests State
  const [claimRequests, setClaimRequests] = useState<ClaimRequest[]>([
    {
      id: 'claim-1',
      businessId: 'southend-coastal-wellness',
      businessName: 'Southend Coastal Wellness',
      claimantName: 'Chloe Henderson',
      claimantEmail: 'contact@southendwellness.co.uk',
      claimantPhone: '01702 559812',
      notes: 'I am the founder and lead clinician. You can verify my identity via our Instagram @southendcoastalwellness bio.',
      status: 'Pending',
      date: '2026-11-01',
    },
    {
      id: 'claim-2',
      businessId: 'braintree-eco-pantry',
      businessName: 'Braintree Eco Pantry',
      claimantName: 'Rachel Green',
      claimantEmail: 'rachel@braintreeecopantry.co.uk',
      claimantPhone: '01376 908123',
      notes: 'Received your community announcement email. Excited to claim our profile!',
      status: 'Pending',
      date: '2026-11-02',
    }
  ]);

  // CSV Import State
  const [csvContent, setCsvContent] = useState('');
  const [parsedRows, setParsedRows] = useState<ParsedBusiness[]>([]);
  const [importFeedback, setImportFeedback] = useState<string | null>(null);

  // Check Local Session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('wbn_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin pass code
    if (password === 'admin123' || password === 'admin' || password === 'wbn2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('wbn_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Default access password is: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wbn_admin_auth');
  };

  // Add Single Business
  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newBiz.business_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created: Business = {
      id,
      slug: id,
      business_name: newBiz.business_name,
      founder_name: newBiz.founder_name,
      town: newBiz.town,
      postcode: newBiz.postcode || 'CM1 1AA',
      category: newBiz.category,
      short_description: newBiz.short_description,
      full_description: newBiz.short_description,
      website: newBiz.website,
      instagram: newBiz.instagram,
      email: newBiz.email,
      phone: newBiz.phone,
      is_verified: true,
      is_claimed: true,
      offers_mentorship: newBiz.offers_mentorship,
      has_jobs: newBiz.has_jobs,
      image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    };

    setBusinesses([created, ...businesses]);
    setIsAddModalOpen(false);
    setNewBiz({
      business_name: '',
      founder_name: '',
      town: 'Chelmsford',
      postcode: '',
      category: 'Creative & Design',
      short_description: '',
      website: '',
      instagram: '',
      email: '',
      phone: '',
      offers_mentorship: false,
      has_jobs: false,
    });
  };

  // Delete Business
  const handleDeleteBusiness = (id: string) => {
    if (confirm('Are you sure you want to remove this business from the directory?')) {
      setBusinesses(businesses.filter((b) => b.id !== id));
    }
  };

  // Toggle Verification
  const handleToggleVerified = (id: string) => {
    setBusinesses(
      businesses.map((b) => (b.id === id ? { ...b, is_verified: !b.is_verified } : b))
    );
  };

  // Claim Approvals
  const handleApproveClaim = (claim: ClaimRequest) => {
    setClaimRequests(
      claimRequests.map((c) => (c.id === claim.id ? { ...c, status: 'Approved' } : c))
    );
    setBusinesses(
      businesses.map((b) => (b.id === claim.businessId ? { ...b, is_claimed: true } : b))
    );
  };

  const handleDeclineClaim = (claimId: string) => {
    setClaimRequests(
      claimRequests.map((c) => (c.id === claimId ? { ...c, status: 'Declined' } : c))
    );
  };

  // CSV Parsing
  const knownTownNames = ESSEX_TOWNS.map((t) => t.name.toLowerCase());
  const parseCsvText = (text: string) => {
    const lines = text.trim().split('\n');
    if (lines.length <= 1) {
      setParsedRows([]);
      return;
    }

    const rows: ParsedBusiness[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
      const cleanCols = matches.map((m) => m.replace(/^"|"$/g, '').trim());

      const business_name = cleanCols[0] || '';
      const founder_name = cleanCols[1] || '';
      const town = cleanCols[2] || '';
      const postcode = cleanCols[3] || '';
      const category = cleanCols[4] || '';
      const short_description = cleanCols[5] || '';
      const website = cleanCols[7] || '';
      const instagram = cleanCols[8] || '';
      const email = cleanCols[9] || '';
      const offers_mentorship = (cleanCols[11] || '').toUpperCase() === 'TRUE';
      const has_jobs = (cleanCols[13] || '').toUpperCase() === 'TRUE';

      let isValid = true;
      let error = '';

      if (!business_name || !founder_name || !town) {
        isValid = false;
        error = 'Missing required name, founder, or town';
      }

      rows.push({
        business_name,
        founder_name,
        town,
        postcode,
        category,
        short_description,
        website,
        instagram,
        email,
        offers_mentorship,
        has_jobs,
        isValid,
        error,
      });
    }

    setParsedRows(rows);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvContent(text);
        parseCsvText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleConfirmImport = () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) return;

    const importedBusinesses: Business[] = validRows.map((r) => {
      const id = r.business_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        id,
        slug: id,
        business_name: r.business_name,
        founder_name: r.founder_name,
        town: r.town,
        postcode: r.postcode || 'CM1 1AA',
        category: r.category || 'Professional Services',
        short_description: r.short_description || 'Curated member of Women\'s Business NETwork.',
        website: r.website,
        instagram: r.instagram,
        email: r.email,
        is_verified: true,
        is_claimed: false,
        offers_mentorship: r.offers_mentorship,
        has_jobs: r.has_jobs,
      };
    });

    setBusinesses([...importedBusinesses, ...businesses]);
    setImportFeedback(`Successfully imported ${validRows.length} businesses into the directory!`);
    setParsedRows([]);
    setCsvContent('');
    setTimeout(() => {
      setImportFeedback(null);
      setActiveTab('businesses');
    }, 2000);
  };

  // Filtered Businesses
  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      searchTerm === '' ||
      b.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.founder_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.town.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTown = selectedTownFilter === '' || b.town.toLowerCase() === selectedTownFilter.toLowerCase();
    return matchesSearch && matchesTown;
  });

  const pendingClaimsCount = claimRequests.filter((c) => c.status === 'Pending').length;

  // ---------------------------------------------------------------------------
  // 1. LOGIN SCREEN (If not authenticated)
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
          <div className="w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-6 h-6 text-brand-400" />
          </div>

          <h2 className="text-2xl font-bold text-center text-stone-900 mb-1">
            Admin Workspace
          </h2>
          <p className="text-xs text-center text-stone-500 mb-6">
            Women&apos;s Business NETwork Management Portal
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              Log In to Admin
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
            <span>Passcode: <code className="text-stone-700 font-mono">admin123</code></span>
            <Link href="/" className="text-brand-600 hover:underline">
              Return to Website &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="bg-stone-50 min-h-screen pb-16">
      {/* Admin Top Banner */}
      <header className="bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div>
              <span className="font-bold text-sm block leading-tight">
                Women&apos;s Business NETwork &mdash; Admin
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                Curator & Operations Hub
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-stone-500">Total Listings</span>
              <Building2 className="w-4 h-4 text-brand-600" />
            </div>
            <p className="text-2xl font-bold text-stone-900">{businesses.length}</p>
            <span className="text-[11px] text-stone-400">Curated & registered</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-stone-500">Unclaimed Profiles</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {businesses.filter((b) => !b.is_claimed).length}
            </p>
            <span className="text-[11px] text-stone-400">Ready for founders to claim</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-stone-500">Pending Claim Requests</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{pendingClaimsCount}</p>
            <span className="text-[11px] text-stone-400">Awaiting your approval</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-stone-500">Offering Mentorship</span>
              <Award className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl font-bold text-rose-600">
              {businesses.filter((b) => b.offers_mentorship).length}
            </p>
            <span className="text-[11px] text-stone-400">Active mentors</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('businesses')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'businesses'
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Manage Businesses ({businesses.length})
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Bulk CSV Import</span>
          </button>

          <button
            onClick={() => setActiveTab('claims')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'claims'
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Review Claim Requests</span>
            {pendingClaimsCount > 0 && (
              <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {pendingClaimsCount}
              </span>
            )}
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: BUSINESSES DIRECTORY MANAGEMENT                        */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'businesses' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <div className="flex items-center px-3 py-2 rounded-xl border border-stone-200 bg-stone-50">
                  <Search className="w-3.5 h-3.5 text-stone-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search name, founder, town..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-xs bg-transparent focus:outline-none w-48 text-stone-800"
                  />
                </div>

                <select
                  value={selectedTownFilter}
                  onChange={(e) => setSelectedTownFilter(e.target.value)}
                  className="text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none text-stone-700"
                >
                  <option value="">All Towns</option>
                  {ESSEX_TOWNS.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Single Business</span>
              </button>
            </div>

            {/* Table of Businesses */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Business & Founder</th>
                    <th className="py-3 px-4">Town</th>
                    <th className="py-3 px-4">Sector</th>
                    <th className="py-3 px-4">Verified</th>
                    <th className="py-3 px-4">Claimed</th>
                    <th className="py-3 px-4">Opportunities</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredBusinesses.map((b) => (
                    <tr key={b.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <Link
                          href={`/directory/${b.id}`}
                          target="_blank"
                          className="font-bold text-stone-900 hover:text-brand-600 flex items-center gap-1"
                        >
                          <span>{b.business_name}</span>
                          <ExternalLink className="w-3 h-3 text-stone-400" />
                        </Link>
                        <span className="text-[11px] text-stone-400 block">Founded by {b.founder_name}</span>
                      </td>
                      <td className="py-3 px-4 font-medium">{b.town}</td>
                      <td className="py-3 px-4 text-stone-600">{b.category}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleVerified(b.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.is_verified
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {b.is_verified ? 'Verified' : 'Unverified'}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.is_claimed
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.is_claimed ? 'Claimed' : 'Unclaimed'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5">
                          {b.offers_mentorship && (
                            <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-200">
                              Mentor
                            </span>
                          )}
                          {b.has_jobs && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                              Jobs
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteBusiness(b.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors"
                          title="Delete Business"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: BULK CSV IMPORT WORKSPACE                              */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Official CSV Template Ready</h3>
                  <p className="text-xs text-stone-500">
                    Located in your workspace: <code className="bg-stone-100 px-1 py-0.5 rounded">data/essex_businesses_template.csv</code>
                  </p>
                </div>
              </div>

              <a
                href="file:///C:/Users/Dell/OneDrive/Documents/Agy2_Projects/WomensBusinessNETwork/data/essex_businesses_template.csv"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Template</span>
              </a>
            </div>

            {importFeedback && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{importFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border-2 border-dashed border-stone-300 p-6 flex flex-col items-center justify-center text-center">
                <UploadCloud className="w-10 h-10 text-stone-400 mb-2" />
                <span className="text-xs font-bold text-stone-800 mb-1">
                  Upload CSV File from your computer
                </span>
                <span className="text-[11px] text-stone-400 mb-4">Formatted UTF-8 CSV</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer"
                />
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col">
                <label className="text-xs font-bold text-stone-800 mb-1">
                  Or Paste Raw CSV Lines:
                </label>
                <textarea
                  rows={4}
                  value={csvContent}
                  onChange={(e) => {
                    setCsvContent(e.target.value);
                    parseCsvText(e.target.value);
                  }}
                  placeholder="business_name,founder_name,town,postcode,category...&#10;The Essex Bloom Studio,Harriet Vance,Chelmsford,CM1 1HT,Creative & Design..."
                  className="w-full flex-1 text-xs font-mono p-3 bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Parsed Rows Preview */}
            {parsedRows.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <div className="p-4 sm:p-5 border-b border-stone-200 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Detected {parsedRows.length} Businesses to Import
                    </h4>
                    <p className="text-xs text-stone-500">
                      Verify details below before adding to the active directory.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmImport}
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5"
                  >
                    <span>Import All to Directory</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-500 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-4">Name</th>
                        <th className="py-2.5 px-4">Founder</th>
                        <th className="py-2.5 px-4">Town</th>
                        <th className="py-2.5 px-4">Sector</th>
                        <th className="py-2.5 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {parsedRows.map((r, i) => (
                        <tr key={i} className="hover:bg-stone-50">
                          <td className="py-2 px-4 font-semibold text-stone-900">{r.business_name}</td>
                          <td className="py-2 px-4">{r.founder_name}</td>
                          <td className="py-2 px-4">{r.town}</td>
                          <td className="py-2 px-4">{r.category}</td>
                          <td className="py-2 px-4">
                            {r.isValid ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Valid
                              </span>
                            ) : (
                              <span className="text-rose-600 font-semibold flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> {r.error}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: CLAIM VERIFICATION REQUESTS                            */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'claims' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-base font-bold text-stone-900">
                Incoming Founder Profile Claims
              </h3>
              <p className="text-xs text-stone-500">
                When a business owner clicks &quot;Claim Profile&quot; on the website, their verification details appear here for your approval.
              </p>
            </div>

            <div className="space-y-4">
              {claimRequests.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-900">
                        {c.claimantName} &mdash; claiming &quot;{c.businessName}&quot;
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : c.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600">
                      <strong>Email:</strong> {c.claimantEmail} {c.claimantPhone && `| Phone: ${c.claimantPhone}`} | Submitted on {c.date}
                    </p>

                    {c.notes && (
                      <p className="text-xs text-stone-500 italic bg-white p-2.5 rounded-xl border border-stone-200">
                        &quot;{c.notes}&quot;
                      </p>
                    )}
                  </div>

                  {c.status === 'Pending' ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDeclineClaim(c.id)}
                        className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleApproveClaim(c)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Ownership</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-stone-500">
                      Processed as {c.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD SINGLE BUSINESS */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-stone-900 mb-1">Add Business to Directory</h3>
            <p className="text-xs text-stone-500 mb-4">
              Enter the business and founder details to create a listing immediately.
            </p>

            <form onSubmit={handleCreateBusiness} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={newBiz.business_name}
                    onChange={(e) => setNewBiz({ ...newBiz, business_name: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                    placeholder="e.g. Maldon Studio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Founder Name *</label>
                  <input
                    type="text"
                    required
                    value={newBiz.founder_name}
                    onChange={(e) => setNewBiz({ ...newBiz, founder_name: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                    placeholder="e.g. Sarah Miller"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Town in Essex *</label>
                  <select
                    value={newBiz.town}
                    onChange={(e) => setNewBiz({ ...newBiz, town: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                  >
                    {ESSEX_TOWNS.map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newBiz.category}
                    onChange={(e) => setNewBiz({ ...newBiz, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={newBiz.short_description}
                  onChange={(e) => setNewBiz({ ...newBiz, short_description: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                  placeholder="Brief overview of services / products..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={newBiz.website}
                    onChange={(e) => setNewBiz({ ...newBiz, website: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Instagram</label>
                  <input
                    type="text"
                    value={newBiz.instagram}
                    onChange={(e) => setNewBiz({ ...newBiz, instagram: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                    placeholder="@handle"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 text-xs text-stone-700">
                  <input
                    type="checkbox"
                    checked={newBiz.offers_mentorship}
                    onChange={(e) => setNewBiz({ ...newBiz, offers_mentorship: e.target.checked })}
                    className="rounded text-brand-600"
                  />
                  <span>Offers Mentorship</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs text-stone-700">
                  <input
                    type="checkbox"
                    checked={newBiz.has_jobs}
                    onChange={(e) => setNewBiz({ ...newBiz, has_jobs: e.target.checked })}
                    className="rounded text-brand-600"
                  />
                  <span>Has Apprenticeships / Jobs</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2.5 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
