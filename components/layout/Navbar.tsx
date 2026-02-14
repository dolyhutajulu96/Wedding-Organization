import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BRAND_NAME } from '../../constants';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change & Reset Body Scroll
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Logic: Navbar is transparent ONLY on Home page at the top. 
  // Everywhere else (or when scrolled), it has a background.
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
    !isTransparent ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-5 md:py-6'
  }`;

  const logoClass = `font-serif text-xl md:text-2xl font-bold tracking-widest transition-colors duration-300 ${
    !isTransparent ? 'text-primary' : 'text-white'
  }`;

  const toggleBtnClass = `md:hidden focus:outline-none z-[60] p-2 transition-colors duration-300 ${
    isOpen ? 'fixed right-6 top-5 text-dark' : (!isTransparent ? 'text-dark' : 'text-white')
  }`;

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
          <Link to="/" className={logoClass}>
            {BRAND_NAME.toUpperCase()}
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group font-bold ${
                  !isTransparent ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-white'
                } ${location.pathname === link.path ? 'text-primary' : ''}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            <Link to="/contact">
              <Button variant={!isTransparent ? "primary" : "white"} size="sm" className="ml-6 shadow-none hover:shadow-lg">
                  Book Consultation
              </Button>
            </Link>
          </nav>

          {/* Mobile Toggle Button */}
          <button 
            className={toggleBtnClass}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen Premium Style */}
      <div 
        className={`fixed inset-0 bg-[#F9F9F7] z-50 md:hidden flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'
        }`}
      >
        <div className="flex flex-col space-y-6 text-center w-full px-8">
          <div className="mb-8">
             <span className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase block mb-2">Menu</span>
             <div className="w-8 h-0.5 bg-primary mx-auto"></div>
          </div>

          {navLinks.map((link, idx) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-serif text-4xl text-dark transition-all duration-700 transform hover:text-primary ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${150 + idx * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Menu Footer Actions */}
          <div 
             className={`pt-10 flex flex-col items-center gap-6 transition-all duration-700 transform ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
             }`}
             style={{ transitionDelay: '700ms' }}
          >
             <Link to="/contact" className="w-full max-w-xs">
                <Button fullWidth size="lg" className="shadow-xl py-4 text-sm tracking-widest uppercase">
                  Book Consultation <ArrowRight size={16} className="ml-2" />
                </Button>
             </Link>
             
             <div className="flex gap-8 mt-4 text-sm font-bold text-gray-400 tracking-wider">
               <a href="#" className="hover:text-primary transition-colors">INSTAGRAM</a>
               <a href="#" className="hover:text-primary transition-colors">WHATSAPP</a>
             </div>

             <div className="mt-8 pt-8 border-t border-gray-200 w-full max-w-[100px] mx-auto"></div>
             
             <Link to="/admin/login" className="text-xs text-gray-300 hover:text-gray-500 uppercase tracking-widest">
                Admin Access
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};