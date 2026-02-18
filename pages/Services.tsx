import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { DataService } from '../services/data';
import { SiteContent } from '../types';
import { DEFAULT_SITE_CONTENT } from '../constants';

export const Services: React.FC = () => {
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
  const servicesPage = content.servicesPage || DEFAULT_SITE_CONTENT.servicesPage;

  return (
    <div className="pt-24 pb-12 animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{servicesPage.header.subtitle}</span>
          <h1 className="font-serif text-4xl md:text-5xl text-dark mb-6">{servicesPage.header.title}</h1>
          <p className="text-gray-600 text-lg">
            {servicesPage.header.description}
          </p>
        </div>

        <div className="space-y-24">
          {/* Service 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src={servicesPage.section1.image} 
                alt={servicesPage.section1.title} 
                className="rounded-lg shadow-xl w-full object-cover h-[500px]"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="font-serif text-3xl mb-4 text-dark">{servicesPage.section1.title}</h3>
              <p className="text-primary font-bold mb-6 tracking-widest uppercase text-sm">{servicesPage.section1.subtitle}</p>
              <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                {servicesPage.section1.description}
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Budget Management</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Venue & Vendor Scouting</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Concept & Design Styling</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Full Day Coordination</li>
              </ul>
              <Link to="/packages">
                <Button variant="outline">View Package Details</Button>
              </Link>
            </div>
          </div>

          {/* Service 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif text-3xl mb-4 text-dark">{servicesPage.section2.title}</h3>
              <p className="text-primary font-bold mb-6 tracking-widest uppercase text-sm">{servicesPage.section2.subtitle}</p>
              <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                {servicesPage.section2.description}
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Handover 1 Month Prior</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Rundown Creation</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Technical Meeting</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>On-site Management</li>
              </ul>
              <Link to="/packages">
                <Button variant="outline">View Package Details</Button>
              </Link>
            </div>
             <div>
              <img 
                src={servicesPage.section2.image} 
                alt={servicesPage.section2.title} 
                className="rounded-lg shadow-xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>

        {/* Other services teaser */}
        <div className="mt-24 bg-secondary rounded-xl p-12 text-center">
          <h3 className="font-serif text-2xl mb-4">Butuh Layanan Custom?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kami juga menyediakan layanan untuk Intimate Wedding, Engagement, dan Destination Wedding. Konsultasikan kebutuhan spesifik Anda.
          </p>
          <Link to="/contact">
            <Button>Hubungi Kami</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};