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

export interface SiteContent {
  hero: HeroSectionConfig;
  signatureStyles: SignatureStyleConfig[];
  ctaSection: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface SiteSettings {
  brandName: string;
  whatsappNumber: string;
  adminEmail: string;
  address: string;
  budgetRanges: string[];
}