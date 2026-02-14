import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { DataService } from '../services/data';
import { Project, Testimonial, SiteContent } from '../types';
import { DEFAULT_SITE_CONTENT } from '../constants';
import { ArrowRight, Star, Calendar, Heart, Clock, Quote } from 'lucide-react';

export const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, testimonialsData, siteContentData] = await Promise.all([
          DataService.getProjects(),
          DataService.getTestimonials(),
          DataService.getSiteContent()
        ]);
        
        setFeaturedProjects(projectsData.slice(0, 3));
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

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  // Helper to get icon
  const getIcon = (name: string) => {
    switch (name) {
      case 'Heart': return <Heart size={32} />;
      case 'Clock': return <Clock size={32} />;
      case 'Star': return <Star size={32} />;
      default: return <Star size={32} />;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={content.hero.backgroundImage} 
            alt="Elegant Wedding" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-white max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight animate-slide-up whitespace-pre-line">
            {content.hero.headline}
          </h1>
          <p className="font-sans text-lg md:text-xl tracking-wide mb-10 text-gray-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {content.hero.subheadline}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact">
              <Button size="lg" variant="primary">{content.hero.ctaText}</Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-dark">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Style */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">Our Signature Approach</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {content.signatureStyles.map((item, idx) => (
              <div key={item.id} className="p-8 hover:bg-secondary rounded-lg transition-colors duration-300">
                <div className="text-primary mb-6 flex justify-center">{getIcon(item.iconName)}</div>
                <h3 className="font-serif text-xl mb-4 text-dark">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-dark mb-2">Featured Stories</h2>
              <p className="text-gray-500">Real weddings, real moments.</p>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center text-primary hover:text-primary-dark transition-colors">
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link to="/portfolio" key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 shadow-md">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-serif italic text-lg">View Gallery</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl text-dark group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <span className="mr-2 uppercase tracking-wider text-xs">{project.themeTags[0]}</span> 
                  &bull; 
                  <span className="ml-2">{project.location}</span>
                </p>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/portfolio" className="text-primary font-bold">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 text-primary opacity-5 transform -translate-x-10 -translate-y-10">
            <Quote size={200} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">Love Notes</h2>
              <p className="text-gray-500">Words from our happy couples.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {testimonials.map((testi) => (
                <div key={testi.id} className="bg-secondary p-8 rounded-xl relative">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < testi.rating ? "currentColor" : "none"} className={i < testi.rating ? "" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">"{testi.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-serif font-bold mr-4">
                      {testi.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-sm">{testi.name}</h4>
                      <p className="text-xs text-gray-500">{testi.role} • {testi.eventType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-serif text-4xl mb-6">{content.ctaSection.title}</h2>
          <p className="text-gray-300 mb-10 text-lg">
            {content.ctaSection.description}
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg">{content.ctaSection.buttonText}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};