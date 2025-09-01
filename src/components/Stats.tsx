// components/Stats.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function Stats() {
  const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const data = [
    { 
      number: 40, 
      suffix: "+", 
      label: "Projects Completed", 
      subLabel: "Each Done with Precision",
      color: "#EF6203",
      bgColor: "#EF6203",
      icon: "📊"
    },
    { 
      number: 25, 
      suffix: "+", 
      label: "Satisfied Clients", 
      subLabel: "Building lasting Partnerships",
      color: "#048F02",
      bgColor: "#048F02", 
      icon: "😊"
    },
    { 
      number: 16, 
      suffix: "", 
      label: "Services Offered", 
      subLabel: "Solutions Tailored to You",
      color: "#EF6203",
      bgColor: "#EF6203",
      icon: "🎨"
    },
    { 
      number: 24, 
      suffix: "", 
      label: "Hours", 
      subLabel: "Dedicated Support",
      color: "#048F02",
      bgColor: "#048F02",
      icon: "🕒"
    },
  ];

  // Intersection Observer - Reset animation every time
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          // Reset numbers when not visible
          setAnimatedNumbers([0, 0, 0, 0]);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Timer-like animation for numbers - triggers every time isVisible changes
  useEffect(() => {
    if (isVisible) {
      // Clear any existing timers
      const timers = [];
      
      data.forEach((item, index) => {
        let current = 0;
        const target = item.number;
        const duration = 2500; // 2 seconds for slower animation
        const steps = Math.max(target, 20); // Minimum 20 steps for smooth animation
        const increment = target / steps;
        const stepDuration = duration / steps;

        const timer = setInterval(() => {
          current += increment;
          
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          setAnimatedNumbers(prev => {
            const newNumbers = [...prev];
            newNumbers[index] = Math.floor(current);
            return newNumbers;
          });
        }, stepDuration);

        timers.push(timer);
      });

      // Cleanup function
      return () => {
        timers.forEach(timer => clearInterval(timer));
      };
    }
  }, [isVisible]);

  return (
    <>
      <style jsx>{`
        .stats-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1), 
                      0 2px 6px -1px rgba(0, 0, 0, 0.08);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.8);
          width: 180px;
          height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .stat-card:hover::before {
          opacity: 1;
        }
        
        .icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 12px auto 12px auto;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.4s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15), 
                      0 8px 16px -4px rgba(0, 0, 0, 0.1);
        }
        
        .stat-card:hover .icon-circle {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .number-animation {
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 1.8s ease-out forwards;
        }

        /* Mobile-specific title and description adjustments - matching Portfolio exactly */
        @media (max-width: 1023px) {
          .stats-title {
            font-size: 1.75rem !important;
            margin-bottom: 8px !important;
          }
          
          .stats-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
        }
        
        /* Mobile-only styles for cards */
        @media (max-width: 768px) {
          .stat-card {
            width: 140px !important;
            height: 105px !important;
          }
          
          .icon-circle {
            width: 24px !important;
            height: 24px !important;
            margin: 4px auto 10px auto !important;
            font-size: 10px !important;
            border-radius: 6px !important;
          }
          
          .number-text {
            font-size: 1.3rem !important;
            margin-bottom: 0.125rem !important;
            line-height: 1.1 !important;
          }
          
          .main-label-text {
            font-size: 0.7rem !important;
            margin-bottom: 0.125rem !important;
            line-height: 1.1 !important;
          }
          
          .sub-label-text {
            font-size: 0.55rem !important;
            line-height: 1 !important;
          }

          /* Improved mobile animation timing for 2x2 grid */
          .stat-card:nth-child(1) { animation-delay: 100ms !important; }
          .stat-card:nth-child(2) { animation-delay: 200ms !important; }
          .stat-card:nth-child(3) { animation-delay: 400ms !important; }
          .stat-card:nth-child(4) { animation-delay: 500ms !important; }
        }

        /* Desktop animation timing */
        @media (min-width: 769px) {
          .stat-card:nth-child(1) { animation-delay: 0ms; }
          .stat-card:nth-child(2) { animation-delay: 300ms; }
          .stat-card:nth-child(3) { animation-delay: 600ms; }
          .stat-card:nth-child(4) { animation-delay: 900ms; }
        }
      `}</style>
      
      <section ref={sectionRef} className="stats-container py-6">
        {/* ==================== Header Section - Matching Portfolio exactly ==================== */}
        <div className={`text-center mb-8 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-800 ease-out`}>
          <h2 className="stats-title text-4xl sm:text-4xl font-bold mb-3" style={{color: '#048F02'}}>
            Our Impact in Numbers
          </h2>
          <p className="stats-desc text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Building trust through quality work and exceptional results.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 max-w-6xl mx-auto px-6 md:px-20 place-items-center">
          {data.map((item, index) => (
            <div
              key={index}
              className={`stat-card text-center ${
                isVisible ? 'animate-slideInUp' : 'opacity-0'
              }`}
            >
              {/* Icon with more breathing space */}
              <div 
                className={`icon-circle text-white transition-transform duration-300`}
                style={{
                  backgroundColor: item.bgColor
                }}
              >
                {item.icon}
              </div>
              
              {/* Number */}
              <div 
                className={`text-2xl font-bold mb-2 number-animation number-text`}
                style={{
                  color: item.color
                }}
              >
                {animatedNumbers[index]}{item.suffix}
              </div>
              
              {/* Main Label */}
              <div className="text-gray-800 font-semibold text-sm leading-tight mb-1 main-label-text">
                {item.label}
              </div>
              
              {/* Sub Label */}
              <div className="text-gray-500 text-xs leading-tight sub-label-text">
                {item.subLabel}
              </div>
            </div>
          ))}
        </div>
        
        {/* Orange divider line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
      </section>
    </>
  );
}