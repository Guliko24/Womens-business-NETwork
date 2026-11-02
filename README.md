# Women's Business NETwork (WBN) Platform

A modern web platform designed to compile, champion, and connect female-owned businesses, mentors, and emerging talent across the **Essex region**.

---

## 🌟 Platform Pillars & Features Built

1. **Curated Essex Business Directory (`/directory`)**:
   - Location filtering across all 14 Essex districts/towns (Chelmsford, Colchester, Southend, Brentwood, Maldon, etc.).
   - Sector filtering (Creative, Food, Professional Services, Health, Retail, Childcare, Tech).
   - "Verified Female-Owned" trust badges.
   - Quick filters for "Offers Mentorship" and "Hiring / Apprenticeship".
   - Rich Business Profile pages (`/directory/[id]`) with founder stories, offerings, and direct contact buttons.
   - Interactive **"Claim This Profile"** modal for business owners to take ownership of curated listings.

2. **Essex Mentorship Programme (`/mentorship`)**:
   - Directory of vetted female mentors with specific expertise (Pricing, IP/Contracts, Cash Flow, Grants).
   - Interactive Mentee/Mentor application form.
   - Structure for 1-on-1 intro calls and 4-person peer mastermind pods.

3. **Jobs & Apprenticeships Board (`/opportunities`)**:
   - Specialized focus on early talent, return-to-work mothers, and young apprentices in female-led teams.
   - Filter by opportunity type (*Apprenticeship, Full-time, Part-time, Internship*).
   - Direct email application flow without bureaucratic ATS hurdles.

4. **Curator Admin CSV Import Tool (`/admin/import`)**:
   - Drag-and-drop or paste raw CSV data to import curated businesses in bulk.
   - Live column validation and Essex town recognition preview.
   - Pre-populated CSV template ready in `data/essex_businesses_template.csv`.

---

## 📁 Project Structure

```
WomensBusinessNETwork/
├── app/
│   ├── page.tsx                  # Homepage with Hero, Stats, Pillars, and Featured Businesses
│   ├── layout.tsx                # Global Layout with Navbar, Footer & Meta Tags
│   ├── globals.css               # Tailwind CSS theme and styles
│   ├── directory/
│   │   ├── page.tsx              # Searchable & filterable Essex Directory
│   │   └── [id]/page.tsx         # Detailed Business Profile page
│   ├── mentorship/
│   │   └── page.tsx              # Mentorship Hub & Application Form
│   ├── opportunities/
│   │   └── page.tsx              # Jobs & Apprenticeships Board
│   └── admin/
│       └── import/page.tsx       # CSV Bulk Upload & Validation Tool
├── components/
│   ├── Navbar.tsx                # Responsive header navigation
│   ├── Footer.tsx                # Footer with Essex town links and branding
│   ├── BusinessCard.tsx          # Reusable card with badges and actions
│   └── ClaimModal.tsx            # Modal for owners to claim their listing
├── data/
│   └── essex_businesses_template.csv # Pre-filled CSV with 8 realistic Essex businesses
├── lib/
│   ├── data.ts                   # Built-in seed data (Businesses, Mentors, Jobs, Towns)
│   ├── types.ts                  # TypeScript data interfaces
│   └── supabase.ts               # Supabase database client
├── supabase/
│   └── schema.sql                # Complete PostgreSQL tables, RLS policies, and seed data
├── Essex_Women_in_Business_Community_Survey.md # Survey for local validation
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Requirements
If you don't already have Node.js installed on your computer:
* Download and install the LTS version from [nodejs.org](https://nodejs.org).

### 2. Install Dependencies
Open PowerShell or your terminal in this directory and run:
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the platform.

---

## 🗄️ Connecting Live Supabase Database (Optional)

The platform comes with full built-in mock data so everything works out of the box immediately. When you are ready for production:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in Supabase and paste the contents of `supabase/schema.sql`. Click **Run**.
3. Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Deploy to [Vercel](https://vercel.com) for free 1-click hosting with automatic SSL and fast global CDN.
