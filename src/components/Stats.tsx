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
      color: "text-orange-600",
      bgColor: "bg-orange-500",
      icon: "📊"
    },
    { 
      number: 25, 
      suffix: "+", 
      label: "Satisfied Clients", 
      subLabel: "Building lasting Partnerships",
      color: "text-green-600",
      bgColor: "bg-green-500", 
      icon: "😊"
    },
    { 
      number: 16, 
      suffix: "", 
      label: "Services Offered", 
      subLabel: "Solutions Tailored to You",
      color: "text-orange-600",
      bgColor: "bg-orange-500",
      icon: "🎨"
    },
    { 
      number: 24, 
      suffix: "", 
      label: "Hours", 
      subLabel: "Dedicated Support",
      color: "text-green-600",
      bgColor: "bg-green-500",
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
        
        @media (max-width: 768px) {
          .stat-card {
            width: 160px;
            height: 120px;
          }
          
          .icon-circle {
            width: 40px;
            height: 40px;
            margin: 8px auto 10px auto;
            font-size: 18px;
          }
        }
      `}</style>
      
      <section ref={sectionRef} className="stats-container py-8">
        {/* Header */}
        <div className="text-center mb-6 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl sm:text-4xl font-bold text-green-600 mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Building trust through quality work and exceptional results
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto px-20 place-items-center">
          {data.map((item, index) => (
            <div
              key={index}
              className={`stat-card text-center ${
                isVisible ? 'animate-slideInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 300}ms` }}
            >
              {/* Icon with more breathing space */}
              <div className={`icon-circle ${item.bgColor} text-white transition-transform duration-300`}>
                {item.icon}
              </div>
              
              {/* Number */}
              <div className={`text-2xl font-bold ${item.color} mb-2 number-animation`}>
                {animatedNumbers[index]}{item.suffix}
              </div>
              
              {/* Main Label */}
              <div className="text-gray-800 font-semibold text-sm leading-tight mb-1">
                {item.label}
              </div>
              
              {/* Sub Label */}
              <div className="text-gray-500 text-xs leading-tight">
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