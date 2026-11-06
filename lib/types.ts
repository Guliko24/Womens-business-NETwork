export interface Business {
  id: string;
  business_name: string;
  slug: string;
  founder_name: string;
  town: string;
  postcode: string;
  category: string;
  short_description: string;
  full_description?: string;
  website?: string;
  instagram?: string;
  email?: string;
  phone?: string;
  is_verified: boolean;
  is_claimed: boolean;
  offers_mentorship: boolean;
  mentor_topics?: string[];
  has_jobs: boolean;
  job_titles?: string[];
  image_url?: string;
  is_sample?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface EssexTown {
  name: string;
  district: string;
  postcode_prefixes: string[];
}

export interface Job {
  id: string;
  business_id: string;
  business_name: string;
  title: string;
  job_type: 'Apprenticeship' | 'Full-time' | 'Part-time' | 'Internship' | 'Freelance';
  town: string;
  description: string;
  requirements?: string;
  salary_range?: string;
  apply_url_or_email: string;
  created_at: string;
}

export interface Mentor {
  id: string;
  full_name: string;
  business_name: string;
  town: string;
  role: 'Founder' | 'Specialist' | 'Executive';
  industry: string;
  bio: string;
  areas_of_expertise: string[];
  available_for_calls: boolean;
  image_url: string;
}
