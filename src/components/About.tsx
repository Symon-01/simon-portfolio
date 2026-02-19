'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .about-title {
          font-size: 2rem;
          line-height: 1.3;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        
        .about-desc {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #6b7280;
        }
        
        .about-card-text {
          font-size: 0.9375rem;
          line-height: 1.65;
        }
        
        .about-button {
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.2);
        }

        .about-button:active {
          transform: translateY(0px);
        }

        .image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .image-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(4, 143, 2, 0.1) 0%, rgba(239, 98, 3, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .image-wrapper:hover::before {
          opacity: 1;
        }

        .about-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Mobile specific styles */
        @media (max-width: 639px) {
          .about-card {
            width: 85% !important;
            max-width: 85% !important;
          }
        }
        
        @media (max-width: 1023px) {
          .about-title {
            font-size: 1.5rem;
          }
          
          .about-desc {
            font-size: 0.95rem;
            padding: 0 8px;
          }
          
          .about-card-text {
            font-size: 0.875rem;
            line-height: 1.6;
          }

          .about-button {
            padding: 10px 24px;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 640px) {
          .about-card-text {
            font-size: 0.75rem;
            line-height: 1.5;
          }

          .about-button {
            padding: 6px 12px;
            font-size: 0.75rem;
          }
        }
      `}</style>
      
      <section ref={sectionRef} className="py-6 lg:py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Decorative divider line */}
          <div className={`mb-6 lg:mb-8 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
          </div>
          
          {/* Header Section */}
          <div className={`text-center mb-6 lg:mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <h2 className="about-title" style={{color: '#048F02'}}>
              Meet Simon
            </h2>
            <p className="about-desc max-w-2xl mx-auto font-medium">
              Creative Designer & Visual Storyteller
            </p>
          </div>

          {/* Card Layout - Compact Mobile, Original Desktop */}
          <div className="flex justify-center px-4 sm:px-0">
            <div 
              className={`about-card flex flex-col sm:flex-row border-3 rounded-2xl overflow-hidden bg-white max-w-2xl w-full shadow-2xl ${isVisible ? '' : 'opacity-0'}`}
              style={{
                borderColor: '#EF6203'
              }}
            >
              {/* Left side - Square Image */}
              <div className={`flex-shrink-0 w-full sm:w-48 md:w-56 aspect-square sm:aspect-auto sm:h-auto image-wrapper ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                <div className="relative h-full w-full">
                  <Image 
                    src="/simon.jpg" 
                    alt="Simon - Creative Designer" 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-110" 
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 192px, 224px"
                    priority
                  />
                </div>
              </div>
              
              {/* Right side - Content */}
              <div 
                className={`flex-1 p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col justify-center ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}
                style={{
                  background: 'linear-gradient(135deg, #EF6203 0%, #E85A03 100%)',
                  animationDelay: '300ms'
                }}
              >
                <div className="mb-3 sm:mb-4">
                  <div className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                    <span className="text-white text-xs font-semibold tracking-wide">ABOUT ME</span>
                  </div>
                  <p className="about-card-text text-white leading-relaxed">
                    Hi, I'm <span className="font-bold">Simon</span>, a Kenyan creative passionate about visual storytelling. I specialize in <span className="font-semibold">graphic design</span> and <span className="font-semibold">pencil art</span>, blending creativity with strategy to deliver impactful designs that resonate with audiences.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href="/about-me"
                    className="about-button inline-flex items-center justify-center bg-white rounded-lg text-center group relative overflow-hidden shadow-md"
                    style={{
                      color: '#048F02',
                      padding: '7px 14px'
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                      Learn More About Me
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  <Link
                    href="/portfolio"
                    className="about-button inline-flex items-center justify-center bg-transparent border-2 border-white text-white rounded-lg text-center group transition-all duration-300"
                    style={{
                      padding: '7px 14px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#EF6203';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <span className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                      View Portfolio
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}