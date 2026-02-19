// FILE LOCATION: src/components/SimonArts.tsx

'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { client, urlFor } from '@/lib/sanity';

interface FeaturedArtwork {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage: any;
  year: number;
}

export default function SimonArts() {
  const [isVisible, setIsVisible] = useState(true); // Changed to true by default
  const [featuredArtworks, setFeaturedArtworks] = useState<FeaturedArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Reduced threshold
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchFeaturedArtworks = async () => {
      const query = `*[_type == "simonArts" && featured == true] | order(year desc)[0...4] {
        _id,
        title,
        slug,
        description,
        mainImage,
        year
      }`;
      
      try {
        const data = await client.fetch(query);
        console.log('Fetched artworks:', data.length);
        setFeaturedArtworks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured artworks:', error);
        setLoading(false);
      }
    };

    fetchFeaturedArtworks();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .gallery-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }
        
        .gallery-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }
        
        .gallery-card-title {
          font-size: 0.875rem !important;
          font-weight: 600 !important;
        }
        
        .gallery-card-description {
          font-size: 0.75rem !important;
          line-height: 1.4 !important;
          color: #4B5563;
        }
        
        .gallery-see-more {
          font-size: 0.75rem !important;
        }
        
        @media (min-width: 1024px) {
          a.main-cta-button {
            padding: 10px 28px !important;
            font-size: 0.9375rem !important;
            min-height: 44px !important;
            font-weight: 600 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 1023px) {
          .gallery-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .gallery-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          
          .gallery-card-title {
            font-size: 0.75rem !important;
          }
          
          .gallery-card-description {
            font-size: 0.7rem !important;
          }
          
          .gallery-see-more {
            font-size: 0.7rem !important;
          }
        }
        `
      }} />
      
      <section ref={sectionRef} className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-7">
            <div className="h-0.75" style={{
              background: `linear-gradient(to right, transparent, #EF6203, transparent)`
            }}></div>
          </div>

          <div className={`text-center mb-8 transition-all duration-800 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className="gallery-title font-bold" style={{color: '#048F02'}}>
              Simon Arts – Pencil Drawings
            </h2>
            <p className="gallery-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Beyond digital design, I capture stories in graphite. From portraits to custom sketches, Simon Arts offers timeless, hand-drawn artwork.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="card-desc text-gray-600">Loading artworks...</p>
            </div>
          ) : featuredArtworks.length === 0 ? (
            <div className="text-center py-12">
              <p className="card-desc text-gray-600 mb-4">
                No featured artworks yet. Mark some artworks as "Featured" in Sanity CMS to display them here.
              </p>
              <Link 
                href="/simon-arts" 
                className="inline-flex items-center gap-1.5 font-semibold card-desc"
                style={{color: '#048F02'}}
              >
                View All Artworks
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-10">
              {featuredArtworks.map((artwork, i) => (
                <div 
                  key={artwork._id} 
                  className={`gallery-card bg-white rounded-xl overflow-hidden shadow-lg border border-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${i * 150}ms`,
                    animationDelay: `${i * 150}ms` 
                  }}
                >
                  
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '210/297' }}>
                    {artwork.mainImage ? (
                      <Image
                        src={urlFor(artwork.mainImage).width(600).height(800).url()}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        priority={i < 2}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                 
                  <div className="p-3 sm:p-4">
                    <h3 className="gallery-card-title text-gray-800 mb-2 text-center">
                      {artwork.title}
                    </h3>
                    
                    {/* 2-line description */}
                    <p 
                      className="gallery-card-description text-center mb-3"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {artwork.description}
                    </p>
                   
                    <div className="text-center">
                      <Link
                        href={`/simon-arts/${artwork.slug.current}`}
                        className="gallery-see-more inline-flex items-center justify-center gap-1 sm:gap-2 font-medium transition-all duration-200 hover:translate-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg w-full sm:w-auto"
                        style={{
                          color: '#EF6203',
                          backgroundColor: 'rgba(239, 98, 3, 0.1)',
                          borderColor: 'rgba(239, 98, 3, 0.2)',
                          border: '1px solid'
                        }}
                        onMouseEnter={(e) => {
                          if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 98, 3, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(239, 98, 3, 0.3)';
                            e.currentTarget.style.color = '#dc5a00';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 98, 3, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(239, 98, 3, 0.2)';
                            e.currentTarget.style.color = '#EF6203';
                          }
                        }}
                      >
                        <span>See More About This Photo</span>
                        <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          <div className={`text-center mt-6 transition-all duration-800 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-6'}`} style={{ transitionDelay: '600ms' }}>
            <Link
              href="/simon-arts"
              className="main-cta-button inline-block rounded-lg text-white font-semibold shadow transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: '#048F02',
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#037a01';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#048F02';
              }}
            >
              Explore Simon Arts
            </Link>
          </div>

          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
            <div className="h-0.75" style={{
              background: `linear-gradient(to right, transparent, #EF6203, transparent)`
            }}></div>
          </div>
        </div>
      </section>
    </>
  );
}