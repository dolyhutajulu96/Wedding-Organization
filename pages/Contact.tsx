import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { DataService } from '../services/data';
import { Calendar, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { DEFAULT_SETTINGS } from '../constants';

export const Contact: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPackage = searchParams.get('package') || '';

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    budgetRange: '',
    serviceInterested: initialPackage ? [initialPackage] : [] as string[],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    DataService.getSettings().then(setSettings);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Submit to Database (Capture Lead)
    await DataService.submitInquiry(formData as any);
    
    setLoading(false);
    setSubmitted(true);

    // 2. Redirect to WhatsApp (Immediate Action)
    // Construct pre-filled message
    const waMessage = `Halo ${settings.brandName}, saya ${formData.name}.%0A%0ASaya tertarik untuk konsultasi pernikahan.%0A• Tanggal: ${formData.eventDate || 'Belum fix'}%0A• Paket: ${formData.serviceInterested[0] || 'Belum tahu'}%0A• Budget: ${formData.budgetRange}%0A%0APesan: ${formData.message}`;
    
    // Open WhatsApp in new tab after a slight delay for UX
    setTimeout(() => {
       window.open(`https://wa.me/${settings.whatsappNumber}?text=${waMessage}`, '_blank');
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center animate-fade-in bg-secondary/30">
        <div className="text-center max-w-lg px-6 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <MessageCircle className="text-green-600" size={36} />
          </div>
          <h2 className="font-serif text-3xl text-dark mb-4">Redirecting to WhatsApp...</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Data Anda telah tersimpan aman. Kami sedang mengalihkan Anda ke WhatsApp untuk chat langsung dengan Wedding Consultant kami.
          </p>
          <div className="text-sm text-gray-400 mb-6">Jika WhatsApp tidak terbuka otomatis, klik tombol di bawah.</div>
          <a 
            href={`https://wa.me/${settings.whatsappNumber}`} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block w-full"
          >
             <Button fullWidth>Open WhatsApp Now</Button>
          </a>
          <button onClick={() => setSubmitted(false)} className="text-sm text-gray-500 mt-4 underline hover:text-dark">Back to Form</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl text-dark mb-4">Start Your Journey</h1>
          <p className="text-gray-600">Isi formulir di bawah ini untuk mendapatkan estimasi penawaran dan jadwal konsultasi gratis.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
             <div className="bg-secondary p-8 rounded-xl border border-gray-100">
                <h3 className="font-serif text-2xl mb-6 text-dark">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-sm mb-1 uppercase tracking-wide">WhatsApp</h4>
                      <p className="text-gray-600 font-serif text-lg">+ {settings.whatsappNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-sm mb-1 uppercase tracking-wide">Email</h4>
                      <p className="text-gray-600 font-serif text-lg">{settings.adminEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-sm mb-1 uppercase tracking-wide">Office</h4>
                      <p className="text-gray-600">{settings.address}</p>
                    </div>
                  </div>
                </div>
             </div>

            <div className="p-8 border border-dashed border-gray-300 rounded-xl">
              <h4 className="font-serif text-xl mb-4 text-dark">Consultation Benefits</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>Get a personalized budget estimation</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>Explore venue options suited to your style</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>Understanding the timeline & checklist</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <h3 className="font-serif text-2xl mb-6 text-dark">Tell Us About Your Day</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone / WhatsApp</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="0812..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="you@example.com" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Event Date (Approx)</label>
                  <input required type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Budget Range</label>
                  <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors">
                    <option value="">Select Range</option>
                    {settings.budgetRanges.map((range, idx) => (
                      <option key={idx} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message / Details</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="Tell us about your dream wedding (Venue preference, style, guest count)..."></textarea>
              </div>

              <Button type="submit" fullWidth disabled={loading} size="lg" className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                {loading ? 'Processing...' : 'Send & Chat on WhatsApp'}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">
                 By clicking send, you agree to our privacy policy. We will respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};