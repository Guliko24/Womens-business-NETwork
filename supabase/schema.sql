-- =====================================================================
-- ESSEX WOMEN'S BUSINESS NETWORK (WBN) - SUPABASE DATABASE SCHEMA
-- =====================================================================

-- 1. Essex Towns & Districts
CREATE TABLE IF NOT EXISTS essex_locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    district VARCHAR(100) NOT NULL,
    postcode_prefixes TEXT[] NOT NULL
);

-- Seed Essex Districts & Towns
INSERT INTO essex_locations (name, district, postcode_prefixes) VALUES
('Chelmsford', 'City of Chelmsford', ARRAY['CM1', 'CM2', 'CM3']),
('Colchester', 'City of Colchester', ARRAY['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6', 'CO7']),
('Southend-on-Sea', 'City of Southend', ARRAY['SS1', 'SS2', 'SS3', 'SS9']),
('Brentwood', 'Brentwood Borough', ARRAY['CM13', 'CM14', 'CM15']),
('Basildon', 'Basildon Borough', ARRAY['SS13', 'SS14', 'SS15', 'SS16']),
('Billericay', 'Basildon Borough', ARRAY['CM11', 'CM12']),
('Braintree', 'Braintree District', ARRAY['CM7', 'CM77']),
('Witham', 'Braintree District', ARRAY['CM8']),
('Epping Forest', 'Epping Forest District', ARRAY['CM16', 'IG10', 'EN9']),
('Harlow', 'Harlow District', ARRAY['CM17', 'CM18', 'CM19', 'CM20']),
('Maldon', 'Maldon District', ARRAY['CM9']),
('Rochford', 'Rochford District', ARRAY['SS4', 'SS5']),
('Tendring', 'Tendring District', ARRAY['CO13', 'CO14', 'CO15', 'CO16']),
('Uttlesford', 'Uttlesford District', ARRAY['CB10', 'CB11', 'CM6'])
ON CONFLICT (name) DO NOTHING;

-- 2. Business Categories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) DEFAULT 'Briefcase'
);

INSERT INTO categories (name, slug, icon) VALUES
('Creative & Design', 'creative-design', 'Palette'),
('Food & Hospitality', 'food-hospitality', 'Utensils'),
('Professional Services', 'professional-services', 'Briefcase'),
('Health & Wellness', 'health-wellness', 'Heart'),
('Retail & E-commerce', 'retail-ecommerce', 'ShoppingBag'),
('Education & Childcare', 'education-childcare', 'GraduationCap'),
('Tech & Digital', 'tech-digital', 'Laptop'),
('Trades & Property', 'trades-property', 'Home')
ON CONFLICT (name) DO NOTHING;

-- 3. Businesses Directory Table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    founder_name VARCHAR(255) NOT NULL,
    town VARCHAR(100) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    website VARCHAR(255),
    instagram VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    is_claimed BOOLEAN DEFAULT FALSE,
    claimed_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    offers_mentorship BOOLEAN DEFAULT FALSE,
    mentor_topics TEXT[],
    has_jobs BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Jobs & Apprenticeships Table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('Apprenticeship', 'Full-time', 'Part-time', 'Internship', 'Freelance')),
    town VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    salary_range VARCHAR(100),
    apply_url_or_email VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Mentorship Profiles / Requests
CREATE TABLE IF NOT EXISTS mentorship_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    town VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Mentor', 'Mentee', 'Both')),
    industry VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    areas_of_expertise TEXT[],
    seeking_guidance_in TEXT[],
    linkedin_url VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. "Claim This Profile" Requests
CREATE TABLE IF NOT EXISTS claim_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    claimant_name VARCHAR(255) NOT NULL,
    claimant_email VARCHAR(255) NOT NULL,
    claimant_phone VARCHAR(50),
    verification_notes TEXT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Row Level Security (RLS) Policies
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE essex_locations ENABLE ROW LEVEL SECURITY;

-- Public can read all active businesses, jobs, categories, and locations
CREATE POLICY "Public can view businesses" ON businesses FOR SELECT USING (true);
CREATE POLICY "Public can view jobs" ON jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can view locations" ON essex_locations FOR SELECT USING (true);

-- Claimed owners can update their own business
CREATE POLICY "Owners can update own business" ON businesses 
    FOR UPDATE USING (auth.uid() = claimed_by_user_id);
