'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  // Array of background images
  const backgroundImages = [
    '/hero.jpg',
    '/hero2.png',   
    '/hero3.png',   
    '/hero5.png'    
  ];

  // Array of content for each slide
  const slideContent = [
    {
      title: "We Bring Ideas to Life Visually",
      description: "From logos and branding to websites and art, Simon Designs transforms your vision into powerful visuals.",
      animation: "fade"
    },
    {
      title: "Creative Design Solutions That Inspire",
      description: "Elevate your brand with stunning graphics, web designs, and digital artworks that captivate your audience.",
      animation: "slideLeft"
    },
    {
      title: "Your Vision, Our Creative Expertise",
      description: "Professional design services tailored to bring your unique ideas to life with exceptional quality and style.",
      animation: "slideRight"
    },
    {
      title: "Crafting Visual Stories That Connect",
      description: "Transform your business with compelling visual narratives that resonate with your target audience.",
      animation: "slideUp"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // Manual navigation functions with enhanced text delays
  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTextVisible(false);
    setButtonsVisible(false);
    
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % backgroundImages.length
    );
    
    // Delayed text transition - starts 800ms after image transition
    setTimeout(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % slideContent.length
      );
      // Show text with delay
      setTimeout(() => setTextVisible(true), 100);
      // Show buttons with additional delay
      setTimeout(() => setButtonsVisible(true), 600);
    }, 800);
    
    setTimeout(() => setIsTransitioning(false), 2500);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTextVisible(false);
    setButtonsVisible(false);
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
    
    // Delayed text transition
    setTimeout(() => {
      setCurrentTextIndex((prevIndex) => 
        prevIndex === 0 ? slideContent.length - 1 : prevIndex - 1
      );
      setTimeout(() => setTextVisible(true), 100);
      setTimeout(() => setButtonsVisible(true), 600);
    }, 800);
    
    setTimeout(() => setIsTransitioning(false), 2500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentImageIndex) return;
    setIsTransitioning(true);
    setTextVisible(false);
    setButtonsVisible(false);
    
    setCurrentImageIndex(index);
    
    // Delayed text transition
    setTimeout(() => {
      setCurrentTextIndex(index);
      setTimeout(() => setTextVisible(true), 100);
      setTimeout(() => setButtonsVisible(true), 600);
    }, 800);
    
    setTimeout(() => setIsTransitioning(false), 2500);
  };

  // Initialize text visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(true);
      setTimeout(() => setButtonsVisible(true), 600);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide effect - changes image every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Enhanced animation classes with better transitions
  const getAnimationClasses = (animation, isActive, isVisible) => {
    const baseClasses = "transition-all duration-1000 ease-out";
    
    if (!isActive || !isVisible) {
      switch (animation) {
        case "slideLeft":
          return `${baseClasses} opacity-0 transform -translate-x-full`;
        case "slideRight":
          return `${baseClasses} opacity-0 transform translate-x-full`;
        case "slideUp":
          return `${baseClasses} opacity-0 transform translate-y-8`;
        case "fade":
        default:
          return `${baseClasses} opacity-0 transform scale-95`;
      }
    }
    
    return `${baseClasses} opacity-100 transform translate-x-0 translate-y-0 scale-100`;
  };

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
        
        /* Mobile-optimized title styling - maintaining desktop proportions */
        .hero-title {
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        
        /* Mobile button container to control width */
        .mobile-button-container {
          max-width: 280px; /* Constrain button container width on mobile */
        }
        
        /* Maintain desktop-like proportions on mobile */
        @media (max-width: 768px) {
          .hero-title {
            line-height: 1.1;
            letter-spacing: -0.02em;
            font-size: 2.35rem; /* Increased mobile title size by 1 point */
          }
          
          .hero-description {
            line-height: 1.4;
            font-size: 1.125rem; /* Slightly larger mobile description */
          }
          
          .mobile-button {
            min-width: 95px; /* Increased button minimum width */
            max-width: 125px; /* Increased maximum button width on mobile */
            padding: 10px 16px; /* Increased padding */
            font-size: 1rem; /* Increased button text size */
          }
          
          .mobile-button-container {
            max-width: 260px; /* Adjusted for larger buttons */
            gap: 0.75rem; /* Increased gap between buttons */
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.3rem; /* Increased for very small screens */
          }
          
          .hero-description {
            font-size: 0.9rem;
          }
          
          .mobile-button {
            min-width: 85px; /* Increased for tiny screens */
            max-width: 115px; /* Increased max width */
            padding: 10px 14px; /* Increased padding */
            font-size: 0.95rem; /* Increased text size */
          }
          
          .mobile-button-container {
            max-width: 245px; /* Adjusted for larger buttons */
            gap: 0.5rem; /* Maintained gap */
          }
        }
      `}</style>
      
      <section className="relative w-full h-[60vh] md:h-[58vh] min-h-[450px] md:min-h-[550px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image Slider with enhanced transitions */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-in-out transform ${
              index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          >
            {/* Dark overlay for text readability - consistent across devices */}
            <div className="absolute inset-0 bg-black/65"></div>
          </div>
        ))}

        {/* Navigation Arrows - Better mobile positioning */}
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2.5 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg 
            className="w-4 h-4 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2.5 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg 
            className="w-4 h-4 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Enhanced Slider Indicators - Better mobile positioning */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-2.5 h-2.5 md:w-4 md:h-4 rounded-full transition-all duration-700 transform hover:scale-125 disabled:cursor-not-allowed ${
                index === currentImageIndex 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        
        {/* Dynamic Hero Content with Enhanced Mobile Layout */}
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 mx-auto">
          {slideContent.map((content, index) => (
            <div
              key={index}
              className={`${index === currentTextIndex ? 'block' : 'hidden'}`}
            >
              <h1 
                className={`hero-title text-5xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight text-center ${
                  getAnimationClasses(content.animation, index === currentTextIndex, textVisible)
                }`}
                style={{ 
                  transitionDelay: textVisible ? '200ms' : '0ms',
                  transitionDuration: '1200ms'
                }}
              >
                {content.title}
              </h1>
              <p 
                className={`hero-description text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed text-center max-w-xs sm:max-w-lg md:max-w-4xl mx-auto px-2 md:px-4 ${
                  getAnimationClasses(content.animation, index === currentTextIndex, textVisible)
                }`}
                style={{ 
                  transitionDelay: textVisible ? '400ms' : '0ms',
                  transitionDuration: '1200ms'
                }}
              >
                {content.description}
              </p>
              <div 
                className={`flex justify-center gap-2 md:gap-6 mobile-button-container md:max-w-none mx-auto ${
                  buttonsVisible ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-800`}
              >
                <a
                  href="#contact"
                  className={`bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white mobile-button md:min-w-[160px] px-3 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-4 rounded-full font-semibold button-hover subtle-bounce relative overflow-hidden group text-center text-sm sm:text-base md:text-base flex-1 md:flex-none ${
                    buttonsVisible ? 'pop-in' : ''
                  }`}
                  style={{ animationDelay: '0ms' }}
                >
                  <span className="relative z-10">Hire Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-700 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300"></div>
                </a>
                <a
                  href="#pricing"
                  className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white mobile-button md:min-w-[160px] px-3 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-4 rounded-full font-semibold button-hover subtle-bounce relative overflow-hidden group text-center text-sm sm:text-base md:text-base flex-1 md:flex-none ${
                    buttonsVisible ? 'pop-in' : ''
                  }`}
                  style={{ animationDelay: '200ms' }}
                >
                  <span className="relative z-10">See Pricing</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300"></div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}