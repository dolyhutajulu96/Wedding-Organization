import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { 
  MOCK_PACKAGES, 
  MOCK_PROJECTS, 
  MOCK_TESTIMONIALS, 
  MOCK_BLOGS, 
  DEFAULT_SITE_CONTENT, 
  DEFAULT_SETTINGS 
} from '../constants';
import { Inquiry, ServicePackage, Project, Testimonial, BlogPost, SiteContent, SiteSettings } from '../types';

// Collection Names in Firestore
const COLS = {
  INQUIRIES: 'inquiries',
  PACKAGES: 'packages',
  PROJECTS: 'projects',
  TESTIMONIALS: 'testimonials',
  BLOGS: 'blogs',
  CONTENT: 'site_content', // Single document collection
  SETTINGS: 'settings'     // Single document collection
};

// Helper: Convert Firestore snapshot to Array
const snapToArray = <T>(snapshot: any): T[] => {
  return snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })) as T[];
};

const handlePermissionError = (e: any, context: string) => {
  if (e.code === 'permission-denied') {
    console.warn(`[${context}] Firestore access denied. Returning MOCK data. (Action required: Update Firestore Rules in Firebase Console to allow public read access)`);
  } else if (e.code === 'unavailable') {
    console.warn(`[${context}] Firestore offline. Returning MOCK data.`);
  } else {
    console.error(`[${context}] Error:`, e);
  }
};

export const DataService = {
  // --- PACKAGES ---
  getPackages: async (): Promise<ServicePackage[]> => {
    try {
      const q = query(collection(db, COLS.PACKAGES));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return MOCK_PACKAGES; 
      return snapToArray<ServicePackage>(snapshot).sort((a, b) => a.order - b.order);
    } catch (e) {
      handlePermissionError(e, 'getPackages');
      return MOCK_PACKAGES;
    }
  },
  
  savePackage: async (pkg: ServicePackage): Promise<void> => {
    await setDoc(doc(db, COLS.PACKAGES, pkg.id), pkg);
  },

  deletePackage: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, COLS.PACKAGES, id));
  },

  // --- PROJECTS (PORTFOLIO) ---
  getProjects: async (): Promise<Project[]> => {
    try {
      const q = query(collection(db, COLS.PROJECTS));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return MOCK_PROJECTS;
      return snapToArray<Project>(snapshot);
    } catch (e) {
      handlePermissionError(e, 'getProjects');
      return MOCK_PROJECTS;
    }
  },

  saveProject: async (project: Project): Promise<void> => {
    await setDoc(doc(db, COLS.PROJECTS, project.id), project);
  },

  deleteProject: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, COLS.PROJECTS, id));
  },

  // --- TESTIMONIALS ---
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const snapshot = await getDocs(collection(db, COLS.TESTIMONIALS));
      if (snapshot.empty) return MOCK_TESTIMONIALS;
      return snapToArray<Testimonial>(snapshot);
    } catch (e) {
      handlePermissionError(e, 'getTestimonials');
      return MOCK_TESTIMONIALS;
    }
  },

  saveTestimonial: async (testimonial: Testimonial): Promise<void> => {
    await setDoc(doc(db, COLS.TESTIMONIALS, testimonial.id), testimonial);
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, COLS.TESTIMONIALS, id));
  },

  // --- SITE CONTENT (HERO, LANDING PAGE) ---
  getSiteContent: async (): Promise<SiteContent> => {
    try {
      const docRef = doc(db, COLS.CONTENT, 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as SiteContent;
      } else {
        // NOTE: Unauthenticated users cannot write to DB. 
        // We return default content without trying to save it.
        // The Admin Dashboard will handle saving/seeding when the admin logs in.
        return DEFAULT_SITE_CONTENT;
      }
    } catch (e) {
      handlePermissionError(e, 'getSiteContent');
      return DEFAULT_SITE_CONTENT;
    }
  },

  updateSiteContent: async (content: SiteContent): Promise<void> => {
    await setDoc(doc(db, COLS.CONTENT, 'main'), content);
  },

  // --- SITE SETTINGS (GLOBAL CONFIG) ---
  getSettings: async (): Promise<SiteSettings> => {
    try {
      const docRef = doc(db, COLS.SETTINGS, 'global');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as SiteSettings;
      } else {
         // Return default settings without writing to DB
        return DEFAULT_SETTINGS;
      }
    } catch (e) {
      handlePermissionError(e, 'getSettings');
      return DEFAULT_SETTINGS;
    }
  },

  updateSettings: async (settings: SiteSettings): Promise<void> => {
    await setDoc(doc(db, COLS.SETTINGS, 'global'), settings);
  },

  // --- INQUIRIES (LEADS) ---
  submitInquiry: async (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<void> => {
    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    await setDoc(doc(db, COLS.INQUIRIES, newInquiry.id), newInquiry);
  },

  getInquiries: async (): Promise<Inquiry[]> => {
    try {
      const q = query(collection(db, COLS.INQUIRIES));
      const snapshot = await getDocs(q);
      return snapToArray<Inquiry>(snapshot).sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (e) {
      handlePermissionError(e, 'getInquiries');
      return [];
    }
  },

  updateInquiryStatus: async (id: string, status: 'new' | 'contacted' | 'closed'): Promise<void> => {
    const docRef = doc(db, COLS.INQUIRIES, id);
    await updateDoc(docRef, { status });
  }
};