import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyB9fTciUipkBACK4_Rc2JG8WCbU_it0gzA",
  authDomain: "weding-organizer.firebaseapp.com",
  projectId: "weding-organizer",
  storageBucket: "weding-organizer.firebasestorage.app", 
  messagingSenderId: "118420063387",
  appId: "1:118420063387:web:18c05eae66bbcaf103323e",
  measurementId: "G-5B36GSWM4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// NOTE: Storage SDK tidak di-export/di-init.
// Kita menggunakan strategi Base64 (menyimpan gambar sebagai string di Firestore)
// untuk solusi 100% gratis tanpa setup Billing di Google Cloud.
