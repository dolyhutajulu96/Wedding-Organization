import { ServicePackage, Project, Testimonial, BlogPost, SiteContent, SiteSettings } from './types';

export const BRAND_NAME = "Aster & Co.";
export const WHATSAPP_NUMBER = "6281234567890";
export const ADMIN_EMAIL = "hello@asterandco.com";

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "Aster & Co.",
  whatsappNumber: "6281234567890",
  adminEmail: "hello@asterandco.com",
  address: "Jakarta Selatan, Indonesia",
  budgetRanges: [
    "< IDR 100 Juta",
    "IDR 100 Juta - 250 Juta",
    "IDR 250 Juta - 500 Juta",
    "IDR 500 Juta - 1 Milyar",
    "> IDR 1 Milyar"
  ]
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    headline: "Creating Timeless Moments & \nUnforgettable Memories",
    subheadline: "Premium Wedding Organizer & Planner in Indonesia",
    ctaText: "Book Free Consultation",
    backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  signatureStyles: [
    { 
      id: 's1', 
      iconName: 'Heart', 
      title: 'Personalized Concept', 
      description: 'Kami mendengarkan cerita Anda untuk menciptakan konsep pernikahan yang benar-benar personal dan unik.' 
    },
    { 
      id: 's2', 
      iconName: 'Clock', 
      title: 'Seamless Execution', 
      description: 'Perencanaan teliti dan koordinasi sempurna agar Anda bisa menikmati momen tanpa rasa khawatir.' 
    },
    { 
      id: 's3', 
      iconName: 'Star', 
      title: 'Premium Vendors', 
      description: 'Akses eksklusif ke vendor-vendor pernikahan terbaik di industri yang telah terkurasi.' 
    }
  ],
  ctaSection: {
    title: "Let's Plan Your Dream Wedding",
    description: "Jadwalkan konsultasi gratis dengan tim expert kami untuk mendiskusikan visi pernikahan Anda.",
    buttonText: "Start Planning Today"
  }
};

export const MOCK_PACKAGES: ServicePackage[] = [
  {
    id: '1',
    name: 'Full Planning Service',
    priceFrom: 'IDR 75.000.000',
    features: [
      'Konsep & Desain Acara Lengkap',
      'Pengelolaan Budget & Pembayaran',
      'Kurasi & Negosiasi Vendor',
      'Unlimited Konsultasi',
      'Hari-H Koordinasi (10 Tim)',
      'RSVP Management'
    ],
    isFeatured: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Partial Planning',
    priceFrom: 'IDR 45.000.000',
    features: [
      'Melanjutkan Perencanaan Klien',
      'Rekomendasi Vendor Tersisa',
      'Finalisasi Rundown',
      'Technical Meeting Vendor',
      'Hari-H Koordinasi (8 Tim)'
    ],
    isFeatured: false,
    order: 2,
  },
  {
    id: '3',
    name: 'On-the-Day Coordination',
    priceFrom: 'IDR 25.000.000',
    features: [
      'Handover 1 Bulan Sebelum Acara',
      'Pembuatan Rundown Detail',
      'Koordinasi Vendor Saat Hari-H',
      'Hari-H Koordinasi (6 Tim)',
      'Penyelesaian Masalah Lapangan'
    ],
    isFeatured: false,
    order: 3,
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Clara & David',
    slug: 'clara-david',
    coverImage: 'https://picsum.photos/800/600?random=1',
    location: 'Amanjiwo, Magelang',
    date: '12 October 2023',
    themeTags: ['Outdoor', 'Intimate', 'Traditional-Modern'],
    description: 'Sebuah perayaan cinta yang intim dengan latar belakang Candi Borobudur, menggabungkan adat Jawa dengan sentuhan modern minimalis.',
    vendors: ['Axioo Photography', 'Syalendra Decoration', 'Hian Tjen (Dress)']
  },
  {
    id: 'p2',
    title: 'Eleanor & James',
    slug: 'eleanor-james',
    coverImage: 'https://picsum.photos/800/600?random=2',
    location: 'The Langham, Jakarta',
    date: '05 September 2023',
    themeTags: ['Ballroom', 'Elegant', 'International'],
    description: 'Kemewahan klasik di jantung Jakarta. Didominasi warna putih dan emas, menciptakan suasana royal wedding yang tak terlupakan.',
    vendors: ['David Salim Photography', 'Stupa Caspea', 'Yefta Gunawan']
  },
  {
    id: 'p3',
    title: 'Sinta & Rama',
    slug: 'sinta-rama',
    coverImage: 'https://picsum.photos/800/600?random=3',
    location: 'Pine Hill, Bandung',
    date: '20 August 2023',
    themeTags: ['Outdoor', 'Rustic', 'Modern'],
    description: 'Pesta kebun di tengah hutan pinus dengan nuansa hangat dan santai, diakhiri dengan pesta kembang api yang meriah.',
    vendors: ['Terralogical', 'Tea Rose Wedding', 'Biyan']
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Clara Santoso',
    role: 'Bride',
    rating: 5,
    quote: "Aster & Co benar-benar mewujudkan pernikahan impian kami. Detailnya luar biasa dan tim sangat profesional. Saya tidak perlu pusing sama sekali di hari H!",
    eventType: 'Intimate Wedding'
  },
  {
    id: 't2',
    name: 'James Anderson',
    role: 'Groom',
    rating: 5,
    quote: "Professional, calm, and incredibly organized. Choosing Aster & Co was the best investment for our wedding.",
    eventType: 'International Wedding'
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: '5 Tren Pernikahan 2024 yang Perlu Anda Tahu',
    excerpt: 'Mulai dari dekorasi sustainable hingga micro-wedding, berikut adalah prediksi tren tahun depan.',
    coverImage: 'https://picsum.photos/800/400?random=10',
    date: '10 Nov 2023',
    category: 'Trends'
  },
  {
    id: 'b2',
    title: 'Cara Mengatur Budget Pernikahan Tanpa Stress',
    excerpt: 'Panduan lengkap alokasi dana untuk venue, katering, dan detail kecil yang sering terlupakan.',
    coverImage: 'https://picsum.photos/800/400?random=11',
    date: '25 Oct 2023',
    category: 'Planning'
  }
];