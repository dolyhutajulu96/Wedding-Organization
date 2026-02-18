import React, { useEffect, useState } from 'react';
import { DataService } from '../services/data';
import { SiteContent } from '../types';
import { DEFAULT_SITE_CONTENT } from '../constants';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const About: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataService.getSiteContent().then(data => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
     return <div className="h-screen flex items-center justify-center bg-secondary"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  // Fallback if data is missing despite DataService merge
  const aboutPage = content.aboutPage || DEFAULT_SITE_CONTENT.aboutPage;

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <div className="relative h-[60vh] flex items-center justify-center bg-dark">
        <div className="absolute inset-0 z-0">
          <img src={aboutPage.header.image} alt="About Us" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
           <span className="text-primary-light text-xs font-bold tracking-[0.2em] uppercase mb-4 block animate-slide-up">{aboutPage.header.subtitle}</span>
           <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 animate-slide-up">{aboutPage.header.title}</h1>
           <p className="text-gray-200 text-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>{aboutPage.header.description}</p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
             <div>
                <h2 className="font-serif text-3xl md:text-4xl text-dark mb-6">{aboutPage.story.title}</h2>
                <div className="w-16 h-1 bg-primary mb-8"></div>
                <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line text-lg">
                  {aboutPage.story.description}
                </p>
                <Link to="/contact">
                  <Button variant="outline">Work With Us</Button>
                </Link>
             </div>
             <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-lg z-0"></div>
                <img 
                  src={aboutPage.story.image} 
                  alt="Our Story" 
                  className="rounded-lg shadow-xl w-full relative z-10"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Stats / Numbers (Hardcoded for now as visual element) */}
      <div className="bg-secondary py-20">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
                  <div className="font-serif text-4xl md:text-5xl text-primary mb-2">200+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Weddings Planned</div>
               </div>
               <div>
                  <div className="font-serif text-4xl md:text-5xl text-primary mb-2">5</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Years Experience</div>
               </div>
               <div>
                  <div className="font-serif text-4xl md:text-5xl text-primary mb-2">50+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Partner Vendors</div>
               </div>
               <div>
                  <div className="font-serif text-4xl md:text-5xl text-primary mb-2">100%</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Happy Couples</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};