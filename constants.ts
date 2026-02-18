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
    subheadline: "Wedding organizer premium yang menangani detail rumit, agar Anda fokus menjadi pengantin paling bahagia.",
    ctaText: "Check Date Availability",
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
  process: [
    { number: '01', title: 'Consultation', description: 'Diskusi awal via Zoom/Offline untuk memahami visi, budget, dan preferensi Anda.' },
    { number: '02', title: 'Proposal & Concept', description: 'Kami menyusun moodboard, rekomendasi venue, dan estimasi budget yang transparan.' },
    { number: '03', title: 'Vendor Selection', description: 'Kurasi dan booking vendor terbaik (MUA, Dekor, Foto) yang sesuai gaya Anda.' },
    { number: '04', title: 'Detailing & Timeline', description: 'Penyusunan rundown menit-per-menit dan technical meeting dengan semua pihak.' },
    { number: '05', title: 'The Big Day', description: 'Tim kami (6-12 orang) standby di lokasi untuk memastikan eksekusi sempurna.' }
  ],
  faq: [
    { question: 'Berapa lama idealnya booking WO sebelum hari H?', answer: 'Idealnya 6-12 bulan sebelumnya, terutama jika Anda menginginkan tanggal cantik atau venue populer di Jakarta/Bali.' },
    { question: 'Apakah Aster & Co bisa menangani Destination Wedding?', answer: 'Ya, kami berpengalaman menangani pernikahan di Bali, Jogja, dan Singapura. Kami mengurus logistik tamu dan vendor.' },
    { question: 'Apakah harga paket sudah termasuk biaya venue/katering?', answer: 'Belum. Paket kami adalah Jasa Planner & Organizer. Namun, kami membantu Anda negosiasi harga terbaik dengan venue dan katering.' },
    { question: 'Bagaimana sistem pembayarannya?', answer: 'Kami menerapkan sistem termin: DP 30% untuk booking tanggal, 40% pertengahan, dan pelunasan 30% satu bulan sebelum acara.' }
  ],
  ctaSection: {
    title: "Let's Plan Your Dream Wedding",
    description: "Jadwalkan konsultasi gratis 15 menit dengan tim expert kami. Tidak ada kewajiban, hanya diskusi hangat tentang visi Anda.",
    buttonText: "Start Planning Today"
  },
  servicesPage: {
    header: {
      title: "Our Services",
      description: "Kami menawarkan rangkaian layanan yang disesuaikan dengan kebutuhan Anda, mulai dari perencanaan awal hingga koordinasi hari-H.",
      subtitle: "Tailored for You"
    },
    section1: {
      title: "Full Wedding Planning",
      subtitle: "Best for busy couples",
      description: "Layanan komprehensif dimana kami mendampingi Anda dari nol. Mulai dari pencarian venue, seleksi vendor, konsep desain, manajemen anggaran, hingga eksekusi hari H. Kami mengurus semua detail agar Anda bisa fokus menikmati prosesnya.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    section2: {
      title: "Wedding Day Coordination",
      subtitle: "For the DIY planner",
      description: "Anda sudah merencanakan semuanya? Biarkan kami yang mengambil alih di bulan terakhir. Kami memastikan semua rencana Anda berjalan mulus di hari H, menjadi point of contact untuk semua vendor, dan menangani logistik acara.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  },
  aboutPage: {
    header: {
      title: "About Aster & Co.",
      description: "Berdedikasi untuk menciptakan momen pernikahan yang elegan dan tak terlupakan sejak 2018.",
      subtitle: "Who We Are",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    story: {
      title: "Our Story",
      description: "Aster & Co bermula dari passion sederhana: melihat senyum bahagia pasangan di hari terbaik mereka. Kami percaya bahwa setiap pasangan memiliki cerita cinta yang unik, dan pernikahan mereka harus merefleksikan hal itu. Dengan tim yang berpengalaman dan perhatian terhadap detail yang obsesif, kami telah menangani lebih dari 200 pernikahan di seluruh Indonesia.",
      image: "https://images.unsplash.com/photo-1522673607200-1645062cd958?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
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
    vendors: ['Axioo Photography', 'Syalendra Decoration', 'Hian Tjen (Dress)'],
    isFeatured: true
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
    vendors: ['David Salim Photography', 'Stupa Caspea', 'Yefta Gunawan'],
    isFeatured: true
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
    vendors: ['Terralogical', 'Tea Rose Wedding', 'Biyan'],
    isFeatured: true
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