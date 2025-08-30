// components/Portfolio.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

const works = [
  { 
    title: "App User Interface", 
    img: "/app.png",
    href: "/portfolio/app-interface",
    description: "Modern and intuitive user interface design for mobile applications with clean aesthetics and seamless user experience."
  },
  { 
    title: "Poster Design", 
    img: "/poster-1.png",
    href: "/portfolio/poster-design",
    description: "Creative poster designs for events, promotions, and brand campaigns with eye-catching visuals and compelling messaging."
  },
  { 
    title: "Logo Design", 
    img: "/logo.jpg",
    href: "/portfolio/logo-design",
    description: "Professional logo designs that capture brand identity and create memorable visual representations for businesses."
  },
  { 
    title: "Brand Identity", 
    img: "/brand.jpg",
    href: "/portfolio/brand-identity",
    description: "Comprehensive brand identity packages including logos, color schemes, typography, and brand guidelines."
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
    <section ref={sectionRef} className="py-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================== Header Section ==================== */}
        <div className={`text-center mb-8 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-800 ease-out`}>
          <h2 className="text-4xl sm:text-4xl font-bold text-green-600 mb-3">
            A Glimpse of Our Work
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Here are a few projects we've proudly crafted. Explore more in our full portfolio.
          </p>
        </div>

        {/* ==================== Portfolio Grid ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {works.map((work, index) => (
            <div
              key={work.title}
              className={`bg-white rounded-2xl shadow-lg border border-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                animationDelay: `${index * 150}ms` 
              }}
            >
              
              {/* Image Section - Updated for uniform square dimensions */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Image 
                  src={work.img} 
                  alt={work.title} 
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 2}
                />
              </div>
              
              {/* Title Section */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-4 px-6 mx-4 mt-4 mb-4 rounded-lg shadow-md">
                <h3 className="font-bold text-base">
                  {work.title}
                </h3>
              </div>
              
              {/* Description Section */}
              <div className="p-6">
                <p 
                  className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden'
                  }}
                >
                  {work.description}
                </p>
                
                {/* Read More Button */}
                <Link 
                  href={work.href}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors duration-200 hover:translate-x-1"
                >
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ==================== Main CTA Button (Updated to match Simon Arts button style) ==================== */}
        <div className={`text-center ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-6'} transition-all duration-800 ease-out`} style={{ transitionDelay: '600ms' }}>
          <Link 
            href="/portfolio" 
            className="inline-block px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition-all duration-300 hover:shadow-lg"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
      
      {/* Orange divider line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>
    </section>
  );
}