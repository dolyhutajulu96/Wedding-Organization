import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Services: React.FC = () => {
  return (
    <div className="pt-24 pb-12 animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-dark mb-6">Our Services</h1>
          <p className="text-gray-600 text-lg">
            Kami menawarkan rangkaian layanan yang disesuaikan dengan kebutuhan Anda, mulai dari perencanaan awal hingga koordinasi hari-H.
          </p>
        </div>

        <div className="space-y-24">
          {/* Service 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Full Planning" 
                className="rounded-lg shadow-xl w-full object-cover h-[500px]"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="font-serif text-3xl mb-4 text-dark">Full Wedding Planning</h3>
              <p className="text-primary font-bold mb-6 tracking-widest uppercase text-sm">Best for busy couples</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Layanan komprehensif dimana kami mendampingi Anda dari nol. Mulai dari pencarian venue, seleksi vendor, konsep desain, manajemen anggaran, hingga eksekusi hari H. Kami mengurus semua detail agar Anda bisa fokus menikmati prosesnya.
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
              <h3 className="font-serif text-3xl mb-4 text-dark">Wedding Day Coordination</h3>
              <p className="text-primary font-bold mb-6 tracking-widest uppercase text-sm">For the DIY planner</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Anda sudah merencanakan semuanya? Biarkan kami yang mengambil alih di bulan terakhir. Kami memastikan semua rencana Anda berjalan mulus di hari H, menjadi point of contact untuk semua vendor, dan menangani logistik acara.
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
                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Day of Coordination" 
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