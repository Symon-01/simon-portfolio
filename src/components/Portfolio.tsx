// components/Portfolio.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

const works = [
  { 
    title: "App U/I", 
    img: "/app.png",
    href: "/portfolio/app-interface",
    description: "Modern and intuitive user interface design for mobile applications. Clean aesthetics and seamless user experience. Professional mobile design solutions..."
  },
  { 
    title: "Poster Design", 
    img: "/poster-1.png",
    href: "/portfolio/poster-design",
    description: "Creative poster designs for events, promotions, and brand campaigns. Eye-catching visuals and compelling messaging. Strategic design approach..."
  },
  { 
    title: "Logo Design", 
    img: "/logo.jpg",
    href: "/portfolio/logo-design",
    description: "Professional logo designs that capture brand identity perfectly. Create memorable visual representations for businesses. Timeless design solutions..."
  },
  { 
    title: "Brand Identity", 
    img: "/brand.jpg",
    href: "/portfolio/brand-identity",
    description: "Comprehensive brand identity packages including logos and guidelines. Color schemes, typography, and brand standards. Complete branding solutions..."
  },
];

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Mobile-specific title and description adjustments - matching other sections */
        @media (max-width: 1023px) {
          .portfolio-title {
            font-size: 1.75rem !important;
            margin-bottom: 4px !important;
          }
          
          .portfolio-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          
          .portfolio-card {
            border-radius: 16px !important;
          }
          
          .portfolio-card-title {
            font-size: 0.75rem !important;
            font-weight: 700 !important;
          }
          
          .portfolio-card-desc {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .portfolio-card-title {
            font-size: 0.85rem !important;
          }
        }

        /* Desktop-only button size increase for main CTA - matching Gallery button */
        @media (min-width: 1024px) {
          a.portfolio-main-cta-button {
            padding: 12px 24px !important;
            font-size: 1rem !important;
            min-width: 160px !important;
            min-height: 44px !important;
            font-weight: 600 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
              `
      }} />
      <style jsx>{``}</style>
      
      <section ref={sectionRef} className="py-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ==================== Header Section - Matching other sections exactly ==================== */}
          <div className={`text-center mb-8 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-800 ease-out`}>
            <h2 className="portfolio-title text-4xl sm:text-4xl font-bold mb-1" style={{color: '#048F02'}}>
              A Glimpse of Our Work
            </h2>
            <p className="portfolio-desc text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Here are a few projects we've proudly crafted. Explore more in our full portfolio.
            </p>
          </div>

          {/* ==================== Portfolio Grid - Updated for mobile 2x2 ==================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-10">
            {works.map((work, index) => (
              <div
                key={work.title}
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
                
                {/* Image Section - Square aspect ratio */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  <Image 
                    src={work.img} 
                    alt={work.title} 
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105" 
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    priority={index < 2}
                  />
                </div>
                
                {/* Title Section - FIXED: Reduced bottom margin from mb-3 to mb-1 */}
                <div className="mx-3 sm:mx-4 mt-3 mb-1">
                  <div className="bg-orange-500 border border-orange-600 rounded-lg py-2 px-3">
                    <h3 className="portfolio-card-title font-bold text-base sm:text-lg text-center text-white whitespace-nowrap overflow-hidden text-ellipsis">
                      {work.title}
                    </h3>
                  </div>
                </div>
                
                {/* Description Section - Updated to show exactly 3 lines with ellipses */}
                <div className="p-3 sm:p-4 flex-grow flex flex-col">
                  <div className="flex-grow mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 h-full flex items-center">
                      <p 
                        className="portfolio-card-desc text-center text-xs sm:text-sm text-gray-600 leading-relaxed"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical' as const,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {work.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Read More Button - Matching Services section exactly */}
                  <div className="text-center mt-auto">
                    <Link 
                      href={work.href}
                      className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200 hover:translate-x-1 group"
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ==================== Main CTA Button - Using custom green color with matching desktop size ==================== */}
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
        
        {/* Orange divider line - Using custom orange color */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="h-0.75" style={{
              background: `linear-gradient(to right, transparent, #EF6203, transparent)`
            }}></div>
        </div>
      </section>
    </>
  );
}