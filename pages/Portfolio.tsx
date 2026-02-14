import React, { useEffect, useState } from 'react';
import { DataService } from '../services/data';
import { Project } from '../types';
import { Button } from '../components/ui/Button';

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    DataService.getProjects().then(data => {
      setProjects(data);
      setFilteredProjects(data);
    });
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.themeTags.includes(filter)));
    }
  }, [filter, projects]);

  const filters = ['All', 'Outdoor', 'Ballroom', 'Intimate', 'Traditional-Modern'];

  return (
    <div className="pt-24 pb-24 animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-dark mb-6">Our Portfolio</h1>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                  filter === f 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <p className="text-white font-serif text-xl italic">See Details</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-dark mb-2">{project.title}</h3>
                <p className="text-sm text-primary mb-3 font-semibold">{project.location}</p>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.themeTags.map(tag => (
                    <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded text-gray-600">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};