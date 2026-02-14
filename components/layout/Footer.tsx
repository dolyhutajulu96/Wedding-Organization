import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { BRAND_NAME, ADMIN_EMAIL, WHATSAPP_NUMBER } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-6 text-primary">{BRAND_NAME}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Mewujudkan pernikahan impian dengan sentuhan elegan, personal, dan tak terlupakan. Kami berdedikasi untuk setiap detail hari bahagia Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-primary">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors">Packages</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-primary">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <Mail size={16} className="mr-3 mt-1 text-primary" />
                <span>{ADMIN_EMAIL}</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 mt-1 text-primary" />
                <span>Jakarta Selatan, Indonesia<br />Serving Nationwide</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-primary">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Dapatkan tips pernikahan eksklusif.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-gray-800 border-none text-white text-sm px-4 py-2 w-full focus:ring-1 focus:ring-primary outline-none"
              />
              <button className="bg-primary text-white px-4 py-2 hover:bg-primary-dark transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME} All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/legal" className="hover:text-white">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-white">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-40"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
      </a>
    </footer>
  );
};