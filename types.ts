export interface ServicePackage {
  id: string;
  name: string;
  priceFrom: string;
  features: string[];
  isFeatured: boolean;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  location: string;
  date: string;
  themeTags: string[];
  description: string;
  vendors: string[];
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Bride", "Mother of Groom"
  rating: number;
  quote: string;
  eventType: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  budgetRange: string;
  serviceInterested: string[];
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
}

// New Types for Content Management
export interface HeroSectionConfig {
  headline: string;
  subheadline: string;
  ctaText: string;
  backgroundImage: string;
}

export interface SignatureStyleConfig {
  id: string;
  title: string;
  description: string;
  iconName: 'Heart' | 'Clock' | 'Star';
}

export interface PageSectionConfig {
  title: string;
  description: string;
  image?: string;
  subtitle?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  hero: HeroSectionConfig;
  signatureStyles: SignatureStyleConfig[];
  ctaSection: {
    title: string;
    description: string;
    buttonText: string;
  };
  // New: Process & FAQ for Home
  process: ProcessStep[];
  faq: FAQItem[];
  // New Pages
  servicesPage: {
    header: PageSectionConfig;
    section1: PageSectionConfig;
    section2: PageSectionConfig;
  };
  aboutPage: {
    header: PageSectionConfig;
    story: PageSectionConfig;
  };
}

export interface SiteSettings {
  brandName: string;
  whatsappNumber: string;
  adminEmail: string;
  address: string;
  budgetRanges: string[];
}