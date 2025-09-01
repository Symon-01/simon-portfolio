'use client';

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      <style jsx>{`
        /* Mobile-specific title and description adjustments - matching Stats exactly */
        @media (max-width: 1023px) {
          .about-title {
            font-size: 1.75rem !important;
            margin-bottom: 8px !important;
          }
          
          .about-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
        }
      `}</style>
      
      <section className="max-w-6xl mx-auto px-4 py-4">
        {/* Orange divider line - keeping original */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
        
        {/* Header Section - Matching Stats exactly */}
        <div className="text-center mb-8">
          <h2 className="about-title text-4xl sm:text-4xl font-bold mb-3" style={{color: '#048F02'}}>
            Meet Simon
          </h2>
          <p className="about-desc text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Creative Designer & Visual Storyteller
          </p>
        </div>

        {/* Horizontal card layout - same as desktop */}
        <div className="flex justify-center px-2">
          <div className="flex border-2 sm:border-4 rounded-lg overflow-hidden bg-white max-w-2xl sm:max-w-3xl w-full h-44 sm:h-52 md:h-64 shadow-xl" style={{borderColor: '#EF6203'}}>
            {/* Left side - Square Image with white background */}
            <div className="flex-shrink-0 w-44 sm:w-52 md:w-64 h-full">
              <div className="relative h-full w-full">
                <Image 
                  src="/simon.jpg" 
                  alt="Simon" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 256px" 
                />
              </div>
            </div>
            
            {/* Right side - Content with orange background - keeping original */}
            <div className="flex-1 p-2 sm:p-3 md:p-4 flex flex-col justify-center items-center" style={{backgroundColor: '#EF6203'}}>
              <p className="text-white text-xs sm:text-sm md:text-lg leading-snug sm:leading-relaxed mb-2 sm:mb-3 md:mb-6 text-center sm:text-justify w-full">
                Hi, I'm Simon, a Kenyan creative passionate about visual storytelling. I specialize in graphic design and pencil art, blending creativity with strategy to deliver impactful designs.
              </p>
              <div className="w-full flex justify-center">
                <Link
                  href="/about-me"
                  className="inline-block px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 bg-white hover:text-white font-semibold rounded-lg transition-all duration-200 shadow-md text-xs sm:text-sm md:text-sm cursor-pointer whitespace-nowrap"
                  style={{
                    color: '#048F02',
                    ':hover': {
                      backgroundColor: '#048F02'
                    }
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#048F02'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  Learn more about me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}