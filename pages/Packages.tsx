import React, { useEffect, useState } from 'react';
import { DataService } from '../services/data';
import { ServicePackage } from '../types';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Packages: React.FC = () => {
  const [packages, setPackages] = useState<ServicePackage[]>([]);

  useEffect(() => {
    DataService.getPackages().then(setPackages);
  }, []);

  return (
    <div className="pt-24 pb-24 animate-fade-in bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-dark mb-6">Investment Packages</h1>
          <p className="text-gray-600 text-lg">
            Transparan dan fleksibel. Pilih paket yang paling sesuai dengan tahap perencanaan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col relative ${pkg.isFeatured ? 'border-2 border-primary transform md:-translate-y-4' : 'border border-gray-100'}`}
            >
              {pkg.isFeatured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <h3 className="font-serif text-2xl text-dark mb-2">{pkg.name}</h3>
              <div className="text-gray-400 text-sm mb-6">Start from</div>
              <div className="text-3xl font-bold text-primary mb-8">{pkg.priceFrom}</div>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-600 text-sm">
                      <Check size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={`/contact?package=${encodeURIComponent(pkg.name)}`} className="w-full">
                <Button 
                  variant={pkg.isFeatured ? 'primary' : 'outline'} 
                  fullWidth
                >
                  Request Quote
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">
            *Harga dapat berubah tergantung lokasi, jumlah tamu, dan kompleksitas acara.
          </p>
        </div>
      </div>
    </div>
  );
};