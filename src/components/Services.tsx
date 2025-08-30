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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
      <style jsx>{`
        .services-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          position: relative;
        }
        
        .services-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0 50%, transparent);
        }
        
        .service-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          /* Your specified shadow style */
          box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1),
                      0 2px 6px -1px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.7);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100%; /* Ensure equal height */
        }
        
        .service-image-container {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .service-image {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-image-container:hover .service-image {
          transform: scale(1.08);
        }
        
        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(16, 185, 129, 0.9));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .service-image-container:hover .service-overlay {
          opacity: 1;
        }
        
        .service-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .service-content {
          transition: all 0.3s ease;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.98);
          position: relative;
        }
        
        .service-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1) 50%, transparent);
        }
        
        .service-title {
          font-weight: 700;
          font-size: 1.25rem;
          color: #ea580c; /* Orange color */
          transition: all 0.3s ease;
          letter-spacing: -0.025em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }
        
        .service-title:hover {
          color: #f97316; /* Brighter orange on hover */
          transform: translateY(-1px);
        }
        
        .service-desc {
          color: #64748b;
          line-height: 1.7;
          transition: all 0.3s ease;
          flex-grow: 1;
          font-weight: 400;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
          background: rgba(248, 250, 252, 0.6);
          padding: 16px;
          border-radius: 12px;
          margin: 8px 0;
          border: 1px solid rgba(226, 232, 240, 0.5);
          cursor: pointer;
        }
        
        .service-desc:hover {
          color: #475569;
          background: rgba(240, 253, 244, 0.8);
          border-color: rgba(34, 197, 94, 0.2);
          box-shadow: inset 0 1px 2px rgba(34, 197, 94, 0.1);
        }
        
        .learn-more {
          color: #16a34a; /* Green color */
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          background: rgba(240, 253, 244, 0.8);
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(34, 197, 94, 0.2);
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
          cursor: pointer;
        }
        
        .learn-more svg {
          color: #16a34a; /* Green arrow */
          transition: all 0.3s ease;
        }
        
        .learn-more:hover {
          background: rgba(240, 253, 244, 1);
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.1);
          color: #15803d; /* Slightly darker green on hover */
        }
        
        .learn-more:hover svg {
          color: #15803d; /* Darker green arrow on hover */
          transform: translateX(2px);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.9s ease-out forwards;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .service-card:hover .service-icon {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .section-header {
          position: relative;
          display: inline-block;
        }
      `}</style>
      
      <section ref={sectionRef} className="services-container pt-4 pb-9 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="section-header">
              <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                Creative Services 
                <span className="text-green-600"> Tailored for You</span>
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium" style={{textDecoration: 'none'}}>
              Whether you're a startup, a business, or an individual, we offer a comprehensive range of design solutions engineered to help you stand out in today's competitive landscape.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-5 items-stretch">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`service-card group ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Section */}
                <div className="service-image-container relative h-55 w-full">
                  <Image 
                    src={service.img} 
                    alt={service.title} 
                    fill 
                    className="service-image object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 2}
                  />
                  
                  {/* Overlay with Icon */}
                  <div className="service-overlay">
                    <div className="service-icon text-white">
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="service-content p-3 flex-grow">
                  <h3 className="service-title text-center mb-1">
                    {service.title}
                  </h3>
                  <p className="service-desc text-center text-sm mb-5">
                    {service.desc}
                  </p>
                  
                  {/* Read More Button */}
                  <div className="text-center mt-auto">
                    <Link 
                      href={service.href}
                      className="learn-more inline-flex items-center gap-2 justify-center"
                    >
                      Read More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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