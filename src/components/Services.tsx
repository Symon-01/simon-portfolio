// components/Services.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

const services = [
  {
    title: "Brand Identity",
    desc: "Comprehensive brand strategy and visual identity systems that establish your unique market presence.",
    img: "/brand.jpg",
    href: "/services",
    icon: "🎨",
  },
  {
    title: "Marketing Materials", 
    desc: "Strategic marketing collateral and digital campaigns that drive engagement and conversions.",
    img: "/marketing.jpg",
    href: "/services",
    icon: "📈",
  },
  {
    title: "UI/UX Design",
    desc: "User-centered digital experiences with intuitive interfaces that enhance satisfaction.", 
    img: "/uiux.jpg",
    href: "/services",
    icon: "💻",
  },
  {
    title: "Print & Publishing",
    desc: "Professional print design and publishing solutions for digital and traditional media.",
    img: "/print.jpg",
    href: "/services",
    icon: "📰",
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

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
        /* Mobile-specific title and description adjustments - matching Portfolio & Stats exactly */
        @media (max-width: 1023px) {
          .services-title {
            font-size: 1.75rem !important;
            margin-bottom: 4px !important;
          }
          
          .services-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          
          /* Service card titles - smaller font for mobile to prevent ellipsis */
          .service-card-title {
            font-size: 0.75rem !important;
          }
        }
        
        @media (min-width: 640px) and (max-width: 1023px) {
          .service-card-title {
            font-size: 0.85rem !important;
          }
        }
        `
      }} />
      
      <section ref={sectionRef} className="pt-4 pb-9 relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ==================== Header Section - Matching Portfolio & Stats exactly ==================== */}
          <div className={`text-center mb-8 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-800 ease-out`}>
            <h2 className="services-title text-4xl sm:text-4xl font-bold mb-1" style={{color: '#048F02'}}>
              Creative Services Tailored for You
            </h2>
            <p className="services-desc text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Whether you're a startup, a business, or an individual, we offer a comprehensive range of design solutions engineered to help you stand out in today's competitive landscape.
            </p>
          </div>

          {/* Services Grid - Updated layout to match Image 2 */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-stretch">
            {services.map((service, index) => (
              <div
                key={service.title}
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
                {/* Image Section - Responsive height */}
                <div className="relative h-32 sm:h-40 xl:h-55 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={service.img} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-105" 
                    sizes="(max-width: 1279px) 50vw, 25vw"
                    priority={index < 2}
                  />
                  
                  {/* Overlay with Icon */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-500/90 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-2xl sm:text-3xl filter drop-shadow-lg">
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content Section - Updated layout */}
                <div className="p-3 sm:p-4 flex-grow flex flex-col">
                  {/* Service Title - Orange box with white text */}
                  <div className="mb-3">
                    <div className="bg-orange-500 border border-orange-600 rounded-lg py-2 px-3">
                      <h3 className="service-card-title font-bold text-base sm:text-lg text-center text-white whitespace-nowrap overflow-hidden text-ellipsis">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description with Box - UPDATED */}
                  <div className="flex-grow mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 h-full flex items-center">
                      <p className="text-center text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Read More Button - Green color */}
                  <div className="text-center mt-auto">
                    <Link 
                      href={service.href}
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
        </div>
        
        {/* Orange divider line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
      </section>
    </>
  );
}