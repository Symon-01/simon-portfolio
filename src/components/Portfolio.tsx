// components/Portfolio.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { client } from '@/lib/sanity';

interface FeaturedProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  coverImageUrl?: string;
  featured: boolean;
}

const categoryLabels: { [key: string]: string } = {
  branding: 'Branding',
  marketing: 'Marketing',
  uiux: 'UI/UX Design',
  print: 'Print & Publishing',
  packaging: 'Packaging'
};

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      const query = `*[_type == "portfolio" && featured == true] | order(_createdAt desc)[0...4] {
        _id,
        title,
        slug,
        category,
        description,
        "coverImageUrl": coalesce(
          images[_type == "projectImage" && isCover == true][0].asset.asset->url,
          images[_type == "projectImage"][0].asset.asset->url,
          images[_type == "image"][0].asset->url
        ),
        featured
      }`;

      try {
        const data = await client.fetch(query, {}, { cache: 'no-store' });
        setFeaturedProjects(data);
      } catch (error) {
        console.error('❌ Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* REFINED TYPOGRAPHY SYSTEM */
        
        /* Section Title - Desktop */
        .portfolio-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }
        
        /* Section Description - Desktop */
        .portfolio-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }
        
        /* Card Title - Desktop */
        .portfolio-card-title {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
        }
        
        /* Card Description - Desktop */
        .portfolio-card-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }
        
        /* Read More Link */
        .portfolio-read-more {
          font-size: 0.875rem !important;
        }
        
        /* Main CTA Button - Desktop */
        @media (min-width: 1024px) {
          a.portfolio-main-cta-button {
            padding: 10px 28px !important;
            font-size: 0.9375rem !important;
            min-height: 44px !important;
            font-weight: 600 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }

        /* MOBILE RESPONSIVE */
        @media (max-width: 1023px) {
          .portfolio-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .portfolio-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          
          .portfolio-card {
            border-radius: 16px !important;
          }
          
          .portfolio-card-title {
            font-size: 0.85rem !important;
            font-weight: 700 !important;
          }
          
          .portfolio-card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
          
          .portfolio-read-more {
            font-size: 0.8rem !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .portfolio-card-title {
            font-size: 0.9rem !important;
          }
        }
              `
      }} />
      
      <section ref={sectionRef} className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className={`text-center mb-8 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-800 ease-out`}>
            <h2 className="portfolio-title font-bold" style={{color: '#048F02'}}>
              A Glimpse of Our Work
            </h2>
            <p className="portfolio-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Here are a few projects we've proudly crafted. Explore more in our full portfolio.
            </p>
          </div>

          {featuredProjects.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className="portfolio-card-desc text-gray-600 mb-4">
                No featured projects yet. Mark some projects as "Featured" in Sanity CMS to display them here.
              </p>
              <Link 
                href="/portfolio" 
                className="portfolio-read-more inline-flex items-center gap-1.5 font-semibold"
                style={{color: '#048F02'}}
              >
                View All Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
              {featuredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className={`portfolio-card bg-white rounded-2xl shadow-lg border border-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    animationDelay: `${index * 150}ms`,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                    {project.coverImageUrl ? (
                      <Image 
                        src={project.coverImageUrl}
                        alt={project.title} 
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105" 
                        sizes="(max-width: 1023px) 50vw, 25vw"
                        priority={index < 2}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <div className="mx-3 sm:mx-4 mt-3 mb-1">
                    <div className="bg-orange-500 border border-orange-600 rounded-lg py-2 px-3">
                      <h3 className="portfolio-card-title text-center text-white whitespace-nowrap overflow-hidden text-ellipsis">
                        {categoryLabels[project.category] || project.category}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    <div className="flex-grow mb-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 h-full flex items-center">
                        <p 
                          className="portfolio-card-desc text-center text-gray-600 leading-relaxed"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical' as const,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center mt-auto">
                      <Link 
                        href={`/portfolio/${project.slug.current}`}
                        className="portfolio-read-more inline-flex items-center gap-1.5 font-semibold transition-all duration-200 hover:translate-x-1 group"
                        style={{
                          color: '#048F02'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#037a01';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#048F02';
                        }}
                      >
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                          <path d="M5 12h14"/>
                          <path d="m12 5 7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`text-center ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-6'} transition-all duration-800 ease-out`} style={{ transitionDelay: '600ms' }}>
            <Link 
              href="/portfolio" 
              className="portfolio-main-cta-button inline-block rounded-lg text-white shadow transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: '#048F02',
                padding: '8px 16px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#037a01';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#048F02';
              }}
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
            <div className="h-0.75" style={{
              background: `linear-gradient(to right, transparent, #EF6203, transparent)`
            }}></div>
        </div>
      </section>
    </>
  );
}