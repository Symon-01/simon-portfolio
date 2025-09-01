'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
 
const drawings = [
  "/pencil-1.jpg",
  "/pencil-2.jpg",
  "/pencil-3.jpg",
  "/pencil-4.jpg",
];
 
export default function Gallery() {
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
          .gallery-title {
            font-size: 1.75rem !important;
            margin-bottom: 4px !important;
          }
          
          .gallery-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
        }

        /* Desktop-only button size increase for main CTA */
        @media (min-width: 1024px) {
          a.main-cta-button {
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
          {/* Orange divider line - Using custom orange color */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7">
            <div className="h-0.75" style={{
              background: `linear-gradient(to right, transparent, #EF6203, transparent)`
            }}></div>
          </div>

          {/* ==================== Header Section - Matching other sections exactly ==================== */}
          <div className={`text-center mb-8 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-800 ease-out`}>
            <h2 className="gallery-title text-4xl sm:text-4xl font-bold mb-1" style={{color: '#048F02'}}>
              Simon Arts – Pencil Drawings
            </h2>
            <p className="gallery-desc text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Beyond digital design, I capture stories in graphite. From portraits to custom sketches, Simon Arts offers timeless, hand-drawn artwork.
            </p>
          </div>

          {/* Updated grid: 2x2 on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {drawings.map((src, i) => (
              <div 
                key={i} 
                className={`gallery-card bg-white rounded-xl overflow-hidden shadow-lg border border-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${i * 150}ms`,
                  animationDelay: `${i * 150}ms` 
                }}
              >
                {/* A4 Portrait Aspect Ratio Container */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '210/297' }}>
                  <Image
                    src={src}
                    alt={`Pencil drawing ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={i < 2}
                  />
                </div>
               
                {/* Card Content */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 text-center text-xs sm:text-sm">
                    Portrait {i + 1}
                  </h3>
                 
                  {/* See More Button - Using orange color */}
                  <div className="text-center">
                    <Link
                      href={`/simon-arts/drawing-${i + 1}`}
                      className="gallery-see-more inline-flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs transition-all duration-200 hover:translate-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg w-full sm:w-auto"
                      style={{
                        color: '#EF6203',
                        backgroundColor: 'rgba(239, 98, 3, 0.1)',
                        borderColor: 'rgba(239, 98, 3, 0.2)',
                        border: '1px solid'
                      }}
                      onMouseEnter={(e) => {
                        if (window.innerWidth >= 1024) { // Desktop only
                          e.currentTarget.style.backgroundColor = 'rgba(239, 98, 3, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(239, 98, 3, 0.3)';
                          e.currentTarget.style.color = '#dc5a00';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.innerWidth >= 1024) { // Desktop only
                          e.currentTarget.style.backgroundColor = 'rgba(239, 98, 3, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(239, 98, 3, 0.2)';
                          e.currentTarget.style.color = '#EF6203';
                        }
                      }}
                    >
                      <span className="text-xs sm:text-xs">See More About This Photo</span>
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

          {/* Main CTA Button - Bigger on desktop, same on mobile */}
          <div className={`text-center mt-6 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-6'} transition-all duration-800 ease-out`} style={{ transitionDelay: '600ms' }}>
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

          {/* Orange divider line at bottom - Using custom orange color */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="h-0.75" style={{
              background: `linear-gradient(to right, transparent, #EF6203, transparent)`
            }}></div>
          </div>
        </div>
      </section>
    </>
  );
}