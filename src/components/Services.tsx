// components/Services.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { Service } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.image';

interface ServicesProps {
  services: Service[];
}

const colorMap = {
  orange: {
    bg: 'bg-orange-500',
    border: 'border-orange-600',
    hover: 'from-orange-600/90 to-orange-500/90'
  },
  green: {
    bg: 'bg-green-500',
    border: 'border-green-600',
    hover: 'from-green-600/90 to-green-500/90'
  },
  blue: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    hover: 'from-blue-600/90 to-blue-500/90'
  },
  purple: {
    bg: 'bg-purple-500',
    border: 'border-purple-600',
    hover: 'from-purple-600/90 to-purple-500/90'
  },
  red: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    hover: 'from-red-600/90 to-red-500/90'
  }
};

export default function Services({ services }: ServicesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Show only first 4 services for homepage
  const displayServices = services.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ========== SIMON DESIGNS - TYPOGRAPHY SYSTEM ========== */
        
        .services-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }
        
        .services-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }
        
        .service-card-title {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
        }
        
        .service-card-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }
        
        .service-read-more {
          font-size: 0.875rem !important;
        }

        /* Main CTA Button - Desktop */
        @media (min-width: 1024px) {
          a.cta-button {
            padding: 10px 28px !important;
            font-size: 0.9375rem !important;
            min-height: 44px !important;
            font-weight: 600 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }

        /* ========== MOBILE RESPONSIVE ========== */
        @media (max-width: 1023px) {
          .services-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .services-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          
          .service-card-title {
            font-size: 0.85rem !important;
            font-weight: 700 !important;
          }
          
          .service-card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
          
          .service-read-more {
            font-size: 0.8rem !important;
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1023px) {
          .service-card-title {
            font-size: 0.9rem !important;
          }
        }
        `
      }} />
      
      <section ref={sectionRef} className="py-6 lg:py-8 relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header - Following Design System */}
          <div className={`text-center mb-8 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-800 ease-out`}>
            <h2 className="services-title font-bold" style={{color: '#048F02'}}>
              Creative Services Tailored for You
            </h2>
            <p className="services-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Whether you're a startup, a business, or an individual, we offer a comprehensive range of design solutions engineered to help you stand out in today's competitive landscape.
            </p>
          </div>

          {/* Content Grid - Following Design System */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 items-stretch mb-10">
            {displayServices.map((service, index) => {
              const colors = colorMap[service.cardColor] || colorMap.orange;
              const imageUrl = service.icon 
                ? urlFor(service.icon).width(400).height(400).url() 
                : '/placeholder-service.jpg';
              
              return (
                <div
                  key={service._id}
                  className={`bg-white rounded-2xl shadow-lg border border-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    animationDelay: `${index * 150}ms`,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  
                  {/* SQUARE Image */}
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                    <Image 
                      src={imageUrl}
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-300 hover:scale-105" 
                      sizes="(max-width: 1279px) 50vw, 25vw"
                      priority={index < 2}
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.hover} opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                      <div className="text-white text-2xl sm:text-3xl filter drop-shadow-lg">
                        {service.iconEmoji || '🎨'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    
                    <div className="mb-3">
                      <div className={`${colors.bg} ${colors.border} border rounded-lg py-2 px-3`}>
                        <h3 className="service-card-title text-center text-white whitespace-nowrap overflow-hidden text-ellipsis">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex-grow mb-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 h-full flex items-center">
                        <p className="service-card-desc text-center text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Read More Link - Links to specific service */}
                    <div className="text-center mt-auto">
                      <Link 
                        href={`/services?service=${service.slug.current}`}
                        className="service-read-more inline-flex items-center gap-1.5 font-semibold transition-all duration-200 hover:translate-x-1 group"
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
              );
            })}
          </div>

          {/* View All Services Button - Following Design System */}
          <div className="text-center">
            <Link 
              href={services.length > 4 ? `/services?service=${services[4].slug.current}` : '/services'}
              className="cta-button inline-block rounded-lg text-white shadow-lg transition-all duration-300 hover:shadow-xl"
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
              View All Services
            </Link>
          </div>
        </div>
        
        {/* Divider Line - Following Design System */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
      </section>
    </>
  );
}