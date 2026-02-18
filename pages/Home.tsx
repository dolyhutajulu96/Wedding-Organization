import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { DataService } from '../services/data';
import { Project, Testimonial, SiteContent } from '../types';
import { DEFAULT_SITE_CONTENT } from '../constants';
import { ArrowRight, Star, Heart, Clock, Quote, Sparkles, Plus, Minus, CheckCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, testimonialsData, siteContentData] = await Promise.all([
          DataService.getProjects(),
          DataService.getTestimonials(),
          DataService.getSiteContent()
        ]);
        
        // Filter projects by isFeatured flag
        const featured = projectsData.filter(p => p.isFeatured);
        // Fallback: if no featured projects, take top 3 latest
        setFeaturedProjects(featured.length > 0 ? featured : projectsData.slice(0, 3));
        
        setTestimonials(testimonialsData);
        setContent(siteContentData);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-secondary"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  // Helper to get icon
  const getIcon = (name: string) => {
    switch (name) {
      case 'Heart': return <Heart strokeWidth={1} size={36} />;
      case 'Clock': return <Clock strokeWidth={1} size={36} />;
      case 'Star': return <Sparkles strokeWidth={1} size={36} />;
      default: return <Star strokeWidth={1} size={36} />;
    }
  };

  return (
    <div className="animate-fade-in overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] md:h-screen flex items-end md:items-center justify-center text-center overflow-hidden">
        {/* Background Image with Slow Zoom Animation */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full animate-slow-zoom">
            <img 
              src={content.hero.backgroundImage} 
              alt="Elegant Wedding" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Advanced Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 md:bg-black/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-24 md:pb-0 text-white max-w-5xl">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4 text-primary-light opacity-90 animate-slide-up">
            Premium Wedding Planner
          </p>
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl mb-6 leading-[1.1] animate-slide-up whitespace-pre-line drop-shadow-lg">
            {content.hero.headline}
          </h1>
          <p className="font-sans text-base md:text-xl font-light tracking-wide mb-10 text-gray-200 max-w-2xl mx-auto animate-slide-up leading-relaxed opacity-90" style={{ animationDelay: '0.2s' }}>
            {content.hero.subheadline}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full md:w-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact" className="w-full md:w-auto">
              <Button size="lg" variant="primary" className="w-full md:w-auto shadow-xl border border-transparent hover:border-primary-light uppercase tracking-widest text-xs font-bold py-5">
                {content.hero.ctaText}
              </Button>
            </Link>
            <Link to="/portfolio" className="w-full md:w-auto">
              <Button size="lg" variant="white" className="w-full md:w-auto bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-dark uppercase tracking-widest text-xs font-bold py-5">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- TRUST STATS STRIP (NEW) --- */}
      <div className="bg-white border-b border-gray-100 py-10 relative z-20">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100/0 md:divide-gray-100">
               <div>
                  <div className="font-serif text-3xl md:text-4xl text-dark mb-1">200+</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Weddings Managed</div>
               </div>
               <div>
                  <div className="font-serif text-3xl md:text-4xl text-dark mb-1">5+</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Years Experience</div>
               </div>
               <div>
                  <div className="font-serif text-3xl md:text-4xl text-dark mb-1">50+</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Curated Vendors</div>
               </div>
               <div className="hidden md:block">
                  <div className="font-serif text-3xl md:text-4xl text-dark mb-1">100%</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Happy Couples</div>
               </div>
            </div>
         </div>
      </div>

      {/* --- SIGNATURE STYLE --- */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Our Philosophy</span>
              <h2 className="font-serif text-3xl md:text-5xl text-dark leading-tight">
                Curating timeless moments with precision.
              </h2>
            </div>
            <div className="w-full md:w-auto h-px bg-gray-200 flex-grow ml-10 hidden md:block"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {content.signatureStyles.map((item, idx) => (
              <div key={item.id} className="group p-8 border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-secondary/30">
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="font-serif text-xl mb-3 text-dark">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECTS (HORIZONTAL SCROLL ON MOBILE) --- */}
      <section className="py-20 md:py-32 bg-dark text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Portfolio</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white">Real Weddings</h2>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center text-sm tracking-widest uppercase hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
              View All Works
            </Link>
          </div>

          {/* Horizontal Scroll Container for Mobile */}
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 pb-8 md:pb-0">
            {featuredProjects.map((project, idx) => (
              <Link 
                to="/portfolio" 
                key={project.id} 
                className={`group relative flex-shrink-0 w-[85vw] md:w-auto snap-center cursor-pointer block ${idx === 1 ? 'md:mt-12' : ''}`}
              >
                <div className="relative overflow-hidden rounded-sm aspect-[3/4] mb-5 bg-gray-800">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-primary text-xs tracking-widest uppercase mb-1">{project.themeTags[0]}</span>
                    <span className="text-white font-serif text-2xl italic">{project.title}</span>
                  </div>
                </div>
                <div className="md:hidden">
                   <h3 className="font-serif text-xl text-white mb-1">{project.title}</h3>
                   <p className="text-xs text-gray-400 uppercase tracking-wide">{project.location}</p>
                </div>
              </Link>
            ))}
            
            {/* Mobile "View All" Card */}
            <div className="md:hidden flex-shrink-0 w-[40vw] snap-center flex items-center justify-center">
               <Link to="/portfolio" className="w-20 h-20 rounded-full border border-gray-600 flex items-center justify-center text-white active:bg-white active:text-dark transition-colors">
                  <ArrowRight size={24} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (PROCESS) (NEW) --- */}
      <section className="py-20 md:py-32 bg-secondary">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
               <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block">The Journey</span>
               <h2 className="font-serif text-3xl md:text-5xl text-dark">How We Work</h2>
               <p className="text-gray-500 mt-4">Kami menyederhanakan proses perencanaan yang rumit menjadi langkah-langkah yang menyenangkan.</p>
            </div>

            <div className="relative">
               {/* Line Connector for Desktop */}
               <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                  {content.process && content.process.map((step, idx) => (
                     <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:border-none md:shadow-none md:bg-transparent text-center md:text-left">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-serif text-xl font-bold mb-4 mx-auto md:mx-0 relative z-10 ring-4 ring-white md:ring-secondary">
                           {step.number}
                        </div>
                        <h3 className="font-bold text-dark text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-32 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <Quote className="text-primary/20 mx-auto mb-6" size={60} />
              <h2 className="font-serif text-3xl md:text-5xl text-dark mb-6">Love Notes</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              {testimonials.map((testi) => (
                <div key={testi.id} className="bg-secondary p-8 md:p-10 rounded-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="flex text-primary mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < testi.rating ? "currentColor" : "none"} className={i < testi.rating ? "" : "text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-lg mb-8 leading-relaxed font-serif">"{testi.quote}"</p>
                  <div className="flex items-center border-t border-gray-200 pt-6">
                    <div>
                      <h4 className="font-bold text-dark text-sm uppercase tracking-wider">{testi.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{testi.role} • {testi.eventType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FAQ SECTION (NEW) --- */}
      <section className="py-20 bg-secondary/50">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
               <h2 className="font-serif text-3xl text-dark">Common Questions</h2>
            </div>
            <div className="space-y-4">
               {content.faq && content.faq.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                     <button 
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                     >
                        <span className="font-bold text-dark text-sm md:text-base">{item.question}</span>
                        {openFaqIndex === idx ? <Minus size={18} className="text-primary" /> : <Plus size={18} className="text-gray-400" />}
                     </button>
                     <div className={`px-6 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === idx ? 'max-h-48 py-4 border-t border-gray-100' : 'max-h-0'}`}>
                        {item.answer}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 md:py-32 bg-white text-center relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl z-0"></div>
        
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl text-dark mb-6 leading-tight">{content.ctaSection.title}</h2>
          <p className="text-gray-500 mb-10 text-lg md:text-xl font-light">
            {content.ctaSection.description}
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" className="shadow-lg hover:shadow-primary/30 px-10 py-4 text-sm tracking-[0.2em] uppercase">
              {content.ctaSection.buttonText}
            </Button>
          </Link>
          <p className="mt-6 text-xs text-gray-400">
             Limited slots available for {new Date().getFullYear()}. Secure your date now.
          </p>
        </div>
      </section>
    </div>
  );
};