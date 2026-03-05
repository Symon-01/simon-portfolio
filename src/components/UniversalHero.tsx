'use client';

import { useState, useEffect, useRef } from 'react'; // <-- Import useRef
import { getBannerByLocation } from '@/lib/sanity.queries';
import { Banner } from '@/types/banner';

interface UniversalHeroProps {
  location: string;
  scrollingBannerItems?: string[];
}

export default function UniversalHero({ location, scrollingBannerItems }: UniversalHeroProps) {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null); // <-- Add ref for IntersectionObserver

  // Fetch banner from Sanity
  useEffect(() => {
    async function fetchBanner() {
      try {
        console.log(`🔍 Fetching banner for location: ${location}`);
        const data = await getBannerByLocation(location);
        console.log(`✅ Banner data received for ${location}:`, data);
        setBanner(data);
      } catch (error) {
        console.error(`❌ Error fetching ${location} banner:`, error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBanner();
  }, [location]);

  // *** REPLACED BLOCK ***
  // This useEffect now uses IntersectionObserver to trigger animations on scroll
  useEffect(() => {
    // Don't run if loading, no banner, or if animation already triggered
    if (isLoading || !banner || textVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section is intersecting (visible)
        if (entry.isIntersecting) {
          console.log('✅ Hero section is in view, starting animation...');
          
          // Trigger the animation sequence
          setTextVisible(true);
          setTimeout(() => setButtonsVisible(true), 600); // 600ms delay for buttons

          // Disconnect the observer so it only runs once
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
      
      // "Already in view" check for page loads
      const rect = currentRef.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        console.log('✅ Hero section is already in viewport on mount');
        setTextVisible(true);
        setTimeout(() => setButtonsVisible(true), 600);
        observer.disconnect();
      }
    }

    // Cleanup function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
    
  }, [isLoading, banner, textVisible]); // <-- Dependencies ensure this runs after data loads

  // Auto-advance slider if multiple images
  useEffect(() => {
    if (!banner?.isSlider || !banner?.images || banner.images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % banner.images!.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banner]);

  if (isLoading) {
    return (
      <section className="relative w-full">
        <div className="relative w-full h-[42vh] md:h-[38vh] min-h-[320px] md:min-h-[360px] flex items-center justify-center text-center text-white overflow-hidden bg-slate-700 animate-pulse">
          <div className="absolute inset-0 bg-black/65" />
        </div>
      </section>
    );
  }

  if (!banner || !banner.images || banner.images.length === 0) {
    return (
      <section className="relative w-full">
        <div className="relative w-full h-[42vh] md:h-[38vh] min-h-[320px] md:min-h-[360px] flex items-center justify-center text-center text-white bg-gray-700">
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10">
            <p className="text-lg">Banner not configured yet</p>
            <p className="text-sm text-gray-300">Please add banner images in Sanity for: {location}</p>
          </div>
        </div>
      </section>
    );
  }

  const currentImage = banner.images[currentSlideIndex];
  const imageUrl = currentImage.image?.asset?.url;

  console.log(`🖼️ Current image for ${location}:`, {
    heading: currentImage.heading,
    imageUrl: imageUrl,
    hasButtons: currentImage.showButtons
  });

  const getButtonColor = (color: string | undefined) => {
    switch (color) {
      case 'orange':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700';
      case 'blue':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      case 'red':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700';
      default: // green
        return 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800';
    }
  };

  // Default scrolling banner items if not provided
  const defaultScrollingItems = [
    '✨ Transform Your Brand Today',
    '🎨 Award-Winning Design Team',
    '🚀 Ready to Start Your Project?',
    '💼 Professional Brand Solutions'
  ];

  const scrollingItems = scrollingBannerItems || defaultScrollingItems;

  return (
    <>
      <style jsx>{`
        .hero-title {
          font-size: 3rem !important;
          line-height: 1.2 !important;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .hero-description {
          font-size: 1.125rem !important;
          line-height: 1.6 !important;
        }

        .hero-button {
          padding: 12px 32px !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          min-width: 160px;
        }

        .hero-badge {
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.2);
          padding: 0.625rem 1.5rem;
          border-radius: 50px;
          display: inline-block;
          font-size: 1rem;
          font-weight: 500;
        }

        @media (max-width: 1023px) {
          .hero-title {
            font-size: 1.875rem !important;
            line-height: 1.2 !important;
          }

          .hero-description {
            font-size: 0.9375rem !important;
            line-height: 1.5 !important;
          }

          .hero-button {
            padding: 10px 24px !important;
            font-size: 0.9375rem !important;
            min-width: 120px;
          }

          .hero-badge {
            font-size: 0.875rem;
            padding: 0.5rem 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .hero-button {
            padding: 9px 20px !important;
            font-size: 0.875rem !important;
            min-width: 110px;
          }

          .hero-badge {
            font-size: 0.8125rem;
            padding: 0.5rem 1rem;
          }
        }

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

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .banner-scroll {
          animation: slide 25s linear infinite;
        }

        .banner-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- ADD REF HERE --- */}
      <section ref={sectionRef} className="relative w-full overflow-x-hidden">
        {/* Hero Content Section */}
        <div className="relative w-full h-[42vh] md:h-[38vh] min-h-[320px] md:min-h-[360px] flex items-center justify-center text-center text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/65" />
          </div>

          {/* Dynamic Content from Sanity */}
          <div className="max-w-6xl px-6 sm:px-8 lg:px-12 relative z-10 mx-auto">
            {currentImage.heading && (
              <h1
                className={`hero-title mb-3 md:mb-4 text-center transition-all duration-1200 ease-out ${
                  textVisible ? 'opacity-100 transform translate-x-0 translate-y-0 scale-100' : 'opacity-0 transform scale-95'
                }`}
                style={{
                  transitionDelay: textVisible ? '200ms' : '0ms',
                  transitionDuration: '1200ms'
                }}
              >
                {currentImage.heading}
              </h1>
            )}

            {currentImage.subheading && (
              <p
                className={`hero-description mb-4 md:mb-5 text-center max-w-3xl mx-auto transition-all duration-1200 ease-out ${
                  textVisible ? 'opacity-100 transform translate-x-0 translate-y-0 scale-100' : 'opacity-0 transform scale-95'
                }`}
                style={{
                  transitionDelay: textVisible ? '400ms' : '0ms',
                  transitionDuration: '1200ms'
                }}
              >
                {currentImage.subheading}
              </p>
            )}

            {/* Buttons OR Badge - Show only if enabled */}
            {currentImage.showButtons && (currentImage.button1Text || currentImage.button2Text) ? (
              <div className={`flex justify-center gap-4 md:gap-6 ${buttonsVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-800`}>
                {currentImage.button1Text && currentImage.button1Link && (
                  <a
                    href={currentImage.button1Link}
                    className={`hero-button ${getButtonColor(currentImage.button1Color)} text-white rounded-full button-hover subtle-bounce relative overflow-hidden group text-center ${
                      buttonsVisible ? 'pop-in' : ''
                    }`}
                    style={{ animationDelay: '0ms' }}
                  >
                    <span className="relative z-10">{currentImage.button1Text}</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                )}

                {currentImage.button2Text && currentImage.button2Link && (
                  <a
                    href={currentImage.button2Link}
                    className={`hero-button ${getButtonColor(currentImage.button2Color)} text-white rounded-full button-hover subtle-bounce relative overflow-hidden group text-center ${
                      buttonsVisible ? 'pop-in' : ''
                    }`}
                    style={{ animationDelay: '200ms' }}
                  >
                    <span className="relative z-10">{currentImage.button2Text}</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                )}
              </div>
            ) : currentImage.subheading ? (
              // Show badge if buttons are disabled - you can customize this text in Sanity
              <div 
                className={`flex justify-center ${
                  buttonsVisible ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-800`}
              >
                <div 
                  className={`hero-badge subtle-bounce ${
                    buttonsVisible ? 'pop-in' : ''
                  }`}
                  style={{ animationDelay: '200ms' }}
                >
                  Based in Kenya | Serving Worldwide
                </div>
              </div>
            ) : null}
          </div>

          {/* Slider indicators (only show if more than 1 image) */}
          {banner.isSlider && banner.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {banner.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlideIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Animated Green Banner - Full Width at Bottom */}
        <div style={{ backgroundColor: '#048F02', willChange: 'transform' }} className="overflow-hidden py-2.5">
          <div className="banner-scroll whitespace-nowrap inline-block">
            {scrollingItems.map((item, index) => (
              <span key={index} className="inline-block px-8 text-white font-semibold text-sm">
                {item}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {scrollingItems.map((item, index) => (
              <span key={`dup-${index}`} className="inline-block px-8 text-white font-semibold text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}