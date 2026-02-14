import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BRAND_NAME } from '../../constants';

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Navbar background logic
  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
    scrolled || isOpen 
      ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' 
      : 'bg-transparent py-6'
  }`;

  const logoClass = `font-serif text-2xl font-bold tracking-widest transition-colors duration-300 ${
    scrolled || isOpen ? 'text-primary' : 'text-primary md:text-white'
  }`;

  const navLinkClass = (isActive: boolean) => `
    text-sm tracking-widest uppercase transition-colors duration-300 relative group
    ${scrolled || isOpen ? 'text-dark hover:text-primary' : 'text-white hover:text-primary-light'}
    ${isActive ? 'text-primary' : ''}
  `;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        <Link to="/" className={logoClass}>
          {BRAND_NAME.toUpperCase()}
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={navLinkClass(location.pathname === link.path)}
            >
              {link.name}
              {/* Hover Underline Animation */}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden focus:outline-none z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="text-dark transition-transform duration-300 rotate-90" size={24} />
          ) : (
            <Menu className={`transition-colors duration-300 ${scrolled ? 'text-dark' : 'text-dark md:text-white'}`} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 md:hidden flex flex-col pt-24 px-8 transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'
        }`}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link, idx) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-2xl font-serif text-dark border-b border-gray-100 pb-4 transition-transform duration-500 delay-[${idx * 50}ms] ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin/login" 
            className={`text-sm text-muted uppercase pt-4 transition-opacity duration-500 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          >
            Admin Access
          </Link>
        </div>
      </div>
    </header>
  );
};