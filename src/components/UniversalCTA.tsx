'use client';

import { useState, useEffect, useRef } from 'react';
import { getBannerByLocation } from '@/lib/sanity.queries';
import { Banner } from '@/types/banner';

interface UniversalCTAProps {
  location: string;
}

export default function UniversalCTA({ location }: UniversalCTAProps) {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch banner from Sanity
  useEffect(() => {
    async function fetchBanner() {
      try {
        const data = await getBannerByLocation(location);
        setBanner(data);
      } catch (error) {
        console.error(`Error fetching ${location} CTA:`, error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBanner();
  }, [location]);

  // Simple Intersection Observer - triggers every time section comes into view
  useEffect(() => {
    // Don't run this effect if we are loading or have no banner
    if (isLoading || !banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Simply set isVisible based on whether section is in viewport
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    // Capture the ref in a variable for a stable cleanup function
    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
      
      // CRITICAL FIX: Check if section is already in view on mount
      // This will now run AFTER the banner has loaded and ref is attached
      const rect = currentRef.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        console.log('✅ CTA section is already in viewport on mount');
        setIsVisible(true);
      }
    }

    // Cleanup function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [isLoading, banner]); // <-- THE FIX: Dependencies added

  if (isLoading) {
    return (
      <section className="py-6 lg:py-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative rounded-3xl overflow-hidden h-64 bg-slate-200 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!banner || !banner.images || banner.images.length === 0) {
    console.log(`⚠️ No CTA banner found for: ${location}`);
    // Show a placeholder so you know the component is working
    return (
      <section className="py-6 lg:py-8 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative rounded-3xl overflow-hidden bg-yellow-200 p-8 text-center">
            <p className="text-yellow-800 font-semibold">
              ⚠️ CTA Banner not configured in Sanity for: <strong>{location}</strong>
            </p>
            <p className="text-yellow-700 text-sm mt-2">
              Go to Sanity Studio → Banner Images → Create a banner with location: {location}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentImage = banner.images[0];
  const imageUrl = currentImage.image?.asset?.url;

  // Get button gradient
  const getButtonGradient = (color: string | undefined) => {
    switch (color) {
      case 'green':
        return {
          normal: 'linear-gradient(to right, rgb(4, 143, 2), rgb(3, 122, 1))',
          hover: 'linear-gradient(to right, rgb(3, 122, 1), rgb(2, 100, 1))'
        };
      case 'orange':
        return {
          normal: 'linear-gradient(to right, rgb(239, 98, 3), rgb(215, 88, 3))',
          hover: 'linear-gradient(to right, rgb(215, 88, 3), rgb(191, 78, 3))'
        };
      case 'blue':
        return {
          normal: 'linear-gradient(to right, rgb(37, 99, 235), rgb(29, 78, 216))',
          hover: 'linear-gradient(to right, rgb(29, 78, 216), rgb(30, 64, 175))'
        };
      case 'red':
        return {
          normal: 'linear-gradient(to right, rgb(220, 38, 38), rgb(185, 28, 28))',
          hover: 'linear-gradient(to right, rgb(185, 28, 28), rgb(153, 27, 27))'
        };
      default:
        return {
          normal: 'linear-gradient(to right, rgb(4, 143, 2), rgb(3, 122, 1))',
          hover: 'linear-gradient(to right, rgb(3, 122, 1), rgb(2, 100, 1))'
        };
    }
  };

  return (
    <>
      <style jsx>{`
        .cta-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          font-weight: 700;
        }
        
        .cta-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
          font-weight: 500;
        }
        
        @media (min-width: 1024px) {
          a.cta-button {
            padding: 10px 28px !important;
            font-size: 0.9375rem !important;
            min-height: 44px !important;
            font-weight: 600 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 1023px) {
          .cta-title {
            font-size: 1.5rem !important;
          }
          
          .cta-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          
          a.cta-button {
            padding: 8px 16px !important;
            font-size: 0.875rem !important;
            font-weight: 600 !important;
          }
        }
        
        @keyframes popIn {
          0% {
            transform: scale(0.8) translateY(10px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-2px);
            opacity: 1;
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
          animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
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

      <section ref={sectionRef} className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              backgroundImage: imageUrl ? `url('${imageUrl}')` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#1e293b',
              minHeight: '280px'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" />
            
            <div className="relative z-10 px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12 text-center text-white">
              {/* Heading */}
              {currentImage.heading && (
                <h3 
                  className={`cta-title tracking-wide mb-4 transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: isVisible ? '100ms' : '0ms'
                  }}
                >
                  {currentImage.heading}
                </h3>
              )}

              {/* Subheading */}
              {currentImage.subheading && (
                <p 
                  className={`cta-desc text-gray-100 max-w-2xl mx-auto leading-relaxed font-medium mb-8 transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: isVisible ? '300ms' : '0ms'
                  }}
                >
                  {currentImage.subheading}
                </p>
              )}

              {/* Buttons */}
              {(currentImage.button1Text || currentImage.button2Text) && (
                <div 
                  className={`flex justify-center gap-4 lg:gap-6 flex-wrap transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: isVisible ? '500ms' : '0ms'
                  }}
                >
                  {/* Button 1 */}
                  {currentImage.button1Text && (
                    <a
                      href={currentImage.button1Link || '#'}
                      className={`cta-button text-white rounded-full button-hover subtle-bounce relative overflow-hidden group text-center ${
                        isVisible ? 'pop-in' : ''
                      }`}
                      style={{
                        animationDelay: '600ms',
                        background: getButtonGradient(currentImage.button1Color).normal,
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = getButtonGradient(currentImage.button1Color).hover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = getButtonGradient(currentImage.button1Color).normal;
                      }}
                    >
                      <span className="relative z-10">{currentImage.button1Text}</span>
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: getButtonGradient(currentImage.button1Color).hover }}
                      />
                      <div 
                        className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300"
                        style={{ background: getButtonGradient(currentImage.button1Color).normal }}
                      />
                    </a>
                  )}

                  {/* Button 2 */}
                  {currentImage.button2Text && (
                    <a
                      href={currentImage.button2Link || '#'}
                      className={`cta-button text-white rounded-full button-hover subtle-bounce relative overflow-hidden group text-center ${
                        isVisible ? 'pop-in' : ''
                      }`}
                      style={{
                        animationDelay: '800ms',
                        background: getButtonGradient(currentImage.button2Color).normal,
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = getButtonGradient(currentImage.button2Color).hover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = getButtonGradient(currentImage.button2Color).normal;
                      }}
                    >
                      <span className="relative z-10">{currentImage.button2Text}</span>
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: getButtonGradient(currentImage.button2Color).hover }}
                      />
                      <div 
                        className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300"
                        style={{ background: getButtonGradient(currentImage.button2Color).normal }}
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}