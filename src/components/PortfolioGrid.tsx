"use client";

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity'; 
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  coverImageUrl?: string;
  featured: boolean;
  tags?: string[];
}

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      // Updated query - removed filters to show all projects
      const query = `*[_type == "portfolio"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        category,
        description,
        "coverImageUrl": coalesce(images[isCover == true][0].asset->url, images[0].asset->url),
        tags,
        featured
      }`;
      
      try {
        const data = await client.fetch(query, {}, { cache: 'no-store' });
        setProjects(data);
      } catch (error) { console.error('Error:', error); } finally { setLoading(false); }
    };
    fetchProjects();
  }, []);

  const categories = ['all', 'branding', 'marketing', 'uiux', 'print', 'packaging'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categoryLabels: { [key: string]: string } = {
    all: 'All Projects', branding: 'Branding', marketing: 'Marketing',
    uiux: 'UI/UX Design', print: 'Print & Publishing', packaging: 'Packaging'
  };

  if (loading) return <div className="py-20 text-center"><p className="text-gray-600">Loading projects...</p></div>;

  return (
    <>
      <style jsx>{`
        /* Custom scrollbar hiding for the filter list on mobile */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* Filters - Scrollable on mobile to save vertical space */}
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 mb-8 md:mb-10 no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`
                  whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all flex-shrink-0
                  ${filter === cat ? 'bg-[#048F02] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
                <p className="text-gray-500">No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {filteredProjects.map((project) => (
                <Link key={project._id} href={`/portfolio/${project.slug.current}`} className="group block h-full">
                  
                  <div className="bg-gray-50 hover:bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#048F02]/30 h-full flex flex-col hover:-translate-y-1 md:hover:-translate-y-2">
                    
                    {/* Image Area */}
                    <div className="relative aspect-square bg-gray-200 border-b border-gray-200">
                      {project.coverImageUrl ? (
                        <Image 
                            src={project.coverImageUrl} 
                            alt={project.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs md:text-sm">No Image</div>
                      )}
                      
                      {/* Featured Badge - Smaller on mobile */}
                      {project.featured && (
                        <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-[#EF6203] text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-md">
                            Featured
                        </span>
                      )}
                    </div>

                    {/* Content Area - Tighter padding (p-3) on mobile */}
                    <div className="p-3 md:p-6 flex flex-col flex-1">
                      
                      {/* Category - Tiny on mobile */}
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-[#EF6203] mb-1 md:mb-2">
                        {categoryLabels[project.category]}
                      </div>
                      
                      {/* Title - Smaller on mobile */}
                      <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-[#048F02] transition-colors line-clamp-2 leading-tight">
                        {project.title}
                      </h3>
                      
                      {/* Description - Clamped tight on mobile */}
                      <p className="text-[10px] md:text-sm text-gray-500 line-clamp-2 mb-2 md:mb-4 flex-1 leading-relaxed">
                        {project.description && project.description.startsWith('[') 
                            ? "View details..." 
                            : project.description}
                      </p>
                      
                      {/* View Link - Scaled down */}
                      <div className="flex items-center text-[#048F02] text-[10px] md:text-sm font-bold mt-auto">
                        View Project 
                        <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 mt-8 md:mt-12">
            <div className="h-0.5" style={{ background: `linear-gradient(to right, transparent, #EF6203, transparent)` }}></div>
        </div>
      </section>
    </>
  );
}