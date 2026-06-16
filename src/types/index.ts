// ============================================================
// SHARED TYPE DEFINITIONS
// ============================================================

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

export interface Candidate {
  name: string;
  title: string;
  position: string;
  photo: SanityImage;
  heroHeadline: string;
  heroSubheadline: string;
  bio: string;
  email: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Priority {
  _id: string;
  title: string;
  description: string;
  icon: string;
  slug: { current: string };
  color: string;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: PortableTextBlock[];
  mainImage: SanityImage;
  publishedAt: string;
  category: string;
  tags: string[];
  featured: boolean;
  author: string;
}

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  date: string;
  endDate?: string;
  location: string;
  locationUrl?: string;
  type: "rally" | "townhall" | "debate" | "volunteer" | "other";
  image?: SanityImage;
  rsvpEnabled: boolean;
  capacity?: number;
}

export interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: SanityImage;
  stat?: string;
  statLabel?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImage;
  quote: string;
  featured: boolean;
}

export interface PolicySection {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  body: PortableTextBlock[];
  icon: string;
  color: string;
  order: number;
  documents?: Array<{ title: string; url: string }>;
}

// Form Submission Types
export interface ContactFormData {
  name: string;
  email: string;
  studentId?: string;
  mobile?: string;
  message: string;
  honeypot?: string;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  mobile: string;
  interests: string[];
  availability: string;
  skills?: string;
  honeypot?: string;
}

export interface SubscribeFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  honeypot?: string;
}

export interface DonationFormData {
  amount: number;
  customAmount?: number;
  frequency: "once" | "monthly";
  name: string;
  email: string;
}

// Portable Text (Sanity rich text)
export interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: Array<{ _type: string; _key: string; text: string; marks?: string[] }>;
  markDefs?: Array<{ _type: string; _key: string; href?: string }>;
}

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
