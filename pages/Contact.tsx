import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { DataService } from '../services/data';
import { Calendar, Mail, MapPin, Phone } from 'lucide-react';
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
    await DataService.submitInquiry(formData as any);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center animate-fade-in">
        <div className="text-center max-w-lg px-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="text-green-600" size={32} />
          </div>
          <h2 className="font-serif text-3xl text-dark mb-4">Inquiry Received</h2>
          <p className="text-gray-600 mb-8">
            Terima kasih telah menghubungi {settings.brandName}. Tim kami akan meninjau detail acara Anda dan menghubungi Anda via WhatsApp/Email dalam 1x24 jam.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl text-dark mb-4">Get in Touch</h1>
          <p className="text-gray-600">Start your journey to a perfect wedding today.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-2xl mb-8 text-dark">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">WhatsApp</h4>
                  <p className="text-gray-600">+ {settings.whatsappNumber}</p>
                  <p className="text-sm text-gray-400 mt-1">Mon - Fri, 09:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Email</h4>
                  <p className="text-gray-600">{settings.adminEmail}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Office</h4>
                  <p className="text-gray-600">{settings.address}</p>
                  <p className="text-sm text-gray-400 mt-1">Available for consultation by appointment.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-secondary rounded-xl">
              <h4 className="font-serif text-xl mb-4">Why Book a Consultation?</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Get a personalized budget estimation</li>
                <li>• Explore venue options suited to your style</li>
                <li>• Understand the detailed timeline of preparation</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="font-serif text-2xl mb-6 text-dark">Inquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone / WhatsApp</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary outline-none" placeholder="0812..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary outline-none" placeholder="you@example.com" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Event Date (Approx)</label>
                  <input required type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Budget Range</label>
                  <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary outline-none">
                    <option value="">Select Range</option>
                    {settings.budgetRanges.map((range, idx) => (
                      <option key={idx} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message / Details</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary outline-none" placeholder="Tell us about your dream wedding..."></textarea>
              </div>

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};