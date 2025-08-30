// components/CTA.tsx
'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
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
          
          {/* Content */}
          <div className="relative z-10 px-8 py-12 text-center text-white">
            <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-wide ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-800 ease-out`}>
              Ready to Elevate your Brand?
            </h3>
            <p className={`text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-800 ease-out`} style={{ transitionDelay: '200ms' }}>
              Let's create visuals that speak louder than words.
            </p>
            
            {/* Buttons with individual pop animations and continuous pulse effect */}
            <div className="flex gap-6 justify-center flex-wrap">
              <Link 
                href="/contact" 
                className={`bg-gradient-to-r from-orange-600 to-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-orange-500/60 transition-all duration-400 ease-out hover:scale-125 hover:-translate-y-3 active:scale-110 active:-translate-y-1 min-w-[140px] text-center animate-pulse ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-10'}`}
                style={{ 
                  transitionDelay: '400ms',
                  transitionDuration: '600ms',
                  animation: isVisible ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
                }}
              >
                Hire us
              </Link>
              <Link 
                href="/pricing" 
                className={`bg-gradient-to-r from-green-600 to-green-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-green-500/60 transition-all duration-400 ease-out hover:scale-125 hover:-translate-y-3 active:scale-110 active:-translate-y-1 min-w-[140px] text-center animate-pulse ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-10'}`}
                style={{ 
                  transitionDelay: '600ms',
                  transitionDuration: '600ms',
                  animation: isVisible ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
                }}
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}