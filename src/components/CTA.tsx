// components/CTA.tsx
'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize button visibility with exact hero timing
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setButtonsVisible(true);
      }, 600); // Exact delay from hero section
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <>
      <style jsx>{`
        @keyframes popIn {
          0% {
            transform: scale(0.8) translateY(10px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-2px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-3px) scale(1.02); }
        }
        
        .pop-in {
          animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .subtle-bounce {
          animation: subtleBounce 2s infinite;
        }
        
        .button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .button-hover:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .button-hover:active {
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>
      
      <section ref={sectionRef} className="py-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`relative rounded-3xl overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-800 ease-out`}
            style={{
              backgroundImage: "url('/cta.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" />
                     
            {/* Content - Reduced mobile height */}
            <div className="relative z-10 px-4 sm:px-8 py-8 sm:py-10 md:py-12 text-center text-white">
              <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-wide ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-800 ease-out`}>
                Ready to Elevate your Brand?
              </h3>
              <p className={`text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-800 ease-out`} style={{ transitionDelay: '200ms' }}>
                Let's create visuals that speak louder than words.
              </p>
                       
              {/* Updated buttons container - matching hero section exactly with custom colors */}
              <div className={`flex justify-center gap-3 sm:gap-4 md:gap-6 ${buttonsVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-800`}>
                <a
                  href="#contact"
                  className={`text-white px-5 sm:px-8 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold button-hover subtle-bounce relative overflow-hidden group text-center text-sm sm:text-base md:text-base min-w-[100px] sm:min-w-[140px] md:min-w-[160px] ${buttonsVisible ? 'pop-in' : ''}`}
                  style={{ 
                    animationDelay: '0ms',
                    background: 'linear-gradient(to right, rgb(4, 143, 2), rgb(3, 122, 1))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgb(3, 122, 1), rgb(2, 100, 1))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgb(4, 143, 2), rgb(3, 122, 1))';
                  }}
                >
                  <span className="relative z-10">Hire Us</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(to right, rgb(3, 122, 1), rgb(2, 100, 1))'}}></div>
                  <div className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300" style={{background: 'linear-gradient(to right, rgb(4, 143, 2), rgb(3, 122, 1))'}}></div>
                </a>
                <a
                  href="#pricing"
                  className={`text-white px-5 sm:px-8 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold button-hover subtle-bounce relative overflow-hidden group text-center text-sm sm:text-base md:text-base min-w-[100px] sm:min-w-[140px] md:min-w-[160px] ${buttonsVisible ? 'pop-in' : ''}`}
                  style={{ 
                    animationDelay: '200ms',
                    background: 'linear-gradient(to right, rgb(239, 98, 3), rgb(215, 88, 3))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgb(215, 88, 3), rgb(191, 78, 3))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgb(239, 98, 3), rgb(215, 88, 3))';
                  }}
                >
                  <span className="relative z-10">See Pricing</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(to right, rgb(215, 88, 3), rgb(191, 78, 3))'}}></div>
                  <div className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300" style={{background: 'linear-gradient(to right, rgb(239, 98, 3), rgb(215, 88, 3))'}}></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}