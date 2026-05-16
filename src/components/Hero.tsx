'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ============================================================
// SIMON DESIGNS — src/components/Hero.tsx
//
// CHANGE FROM ORIGINAL:
// Added hidden <img> tags inside each background slide div.
// These are invisible to users (opacity-0, aria-hidden) but
// fully visible to Google's image crawler, which cannot read
// CSS background-image. This is the standard SEO fix for
// image sliders that use background-image.
// Everything else is identical to your original file.
// ============================================================

interface Banner {
  images?: Array<{
    image: { asset: { url: string } };
    heading?: string;
    subheading?: string;
    showButtons?: boolean;
    button1Text?: string;
    button1Link?: string;
    button1Color?: string;
    button2Text?: string;
    button2Link?: string;
    button2Color?: string;
  }>;
}

interface HeroProps {
  banner?: Banner | null;
}

export default function Hero({ banner }: HeroProps) {
  const useSanity = banner && banner.images && banner.images.length > 0;

  const fallbackBackgroundImages = [
    '/hero.jpg',
    '/hero2.png',
    '/hero3.png',
    '/hero5.png'
  ];

  // Alt text for fallback local images (for SEO)
  const fallbackImageAlts = [
    'Simon Designs graphic design studio — creative design services in Kenya',
    'Simon Designs branding and marketing materials design',
    'Simon Designs UI/UX and packaging design work',
    'Simon Designs professional graphic design portfolio',
  ];

  const fallbackSlideContent = [
    {
      title: "We Bring Ideas to Life Visually",
      description: "From logos and branding to websites and art, Simon Designs transforms your vision into powerful visuals.",
      animation: "fade",
      showButtons: true,
      button1Text: "Hire Us",
      button1Link: "#contact",
      button1Color: "green" as const,
      button2Text: "See Pricing",
      button2Link: "#pricing",
      button2Color: "orange" as const
    },
    {
      title: "Creative Design Solutions That Inspire",
      description: "Elevate your brand with stunning graphics, web designs, and digital artworks that captivate your audience.",
      animation: "slideLeft",
      showButtons: true,
      button1Text: "Hire Us",
      button1Link: "#contact",
      button1Color: "green" as const,
      button2Text: "See Pricing",
      button2Link: "#pricing",
      button2Color: "orange" as const
    },
    {
      title: "Your Vision, Our Creative Expertise",
      description: "Professional design services tailored to bring your unique ideas to life with exceptional quality and style.",
      animation: "slideRight",
      showButtons: true,
      button1Text: "Hire Us",
      button1Link: "#contact",
      button1Color: "green" as const,
      button2Text: "See Pricing",
      button2Link: "#pricing",
      button2Color: "orange" as const
    },
    {
      title: "Crafting Visual Stories That Connect",
      description: "Transform your business with compelling visual narratives that resonate with your target audience.",
      animation: "slideUp",
      showButtons: true,
      button1Text: "Hire Us",
      button1Link: "#contact",
      button1Color: "green" as const,
      button2Text: "See Pricing",
      button2Link: "#pricing",
      button2Color: "orange" as const
    }
  ];

  const animationPatterns = ["fade", "slideLeft", "slideRight", "slideUp"];

  const backgroundImages = useSanity
    ? banner.images.map(img => img.image.asset.url)
    : fallbackBackgroundImages;

  // Alt text for Sanity images (uses heading as alt, falls back to generic)
  const backgroundImageAlts = useSanity
    ? banner.images.map(img =>
        img.heading
          ? `${img.heading} — Simon Designs`
          : 'Simon Designs graphic design and branding services Kenya'
      )
    : fallbackImageAlts;

  const slideContent = useSanity
    ? banner.images.map((img, index) => ({
        title: img.heading || "Simon Designs",
        description: img.subheading || "Creative Excellence",
        animation: animationPatterns[index % animationPatterns.length],
        showButtons: img.showButtons ?? true,
        button1Text: img.button1Text,
        button1Link: img.button1Link,
        button1Color: img.button1Color || "green",
        button2Text: img.button2Text,
        button2Link: img.button2Link,
        button2Color: img.button2Color || "orange"
      }))
    : fallbackSlideContent;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const getButtonGradient = (color?: string) => {
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

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTextVisible(false);
    setButtonsVisible(false);

    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % backgroundImages.length
    );

    setTimeout(() => {
      setCurrentTextIndex((prevIndex) =>
        (prevIndex + 1) % slideContent.length
      );
      setAnimationKey(prev => prev + 1);
      setTimeout(() => setTextVisible(true), 100);
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

    setTimeout(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === 0 ? slideContent.length - 1 : prevIndex - 1
      );
      setAnimationKey(prev => prev + 1);
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

    setTimeout(() => {
      setCurrentTextIndex(index);
      setAnimationKey(prev => prev + 1);
      setTimeout(() => setTextVisible(true), 100);
      setTimeout(() => setButtonsVisible(true), 600);
    }, 800);

    setTimeout(() => setIsTransitioning(false), 2500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(true);
      setTimeout(() => setButtonsVisible(true), 600);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isTransitioning, backgroundImages.length]);

  const getAnimationClasses = (animation: string, isActive: boolean, isVisible: boolean) => {
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
      <style jsx global>{`
        @keyframes heroButtonPopIn {
          0% {
            transform: scale(0.7) translateY(15px);
            opacity: 0;
          }
          60% {
            transform: scale(1.08) translateY(-3px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes heroButtonBounce {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.02);
          }
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
          animation: slide 35s linear infinite;
        }

        .banner-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative w-full">
        <div className="relative w-full h-[50vh] md:h-[48vh] min-h-[400px] md:min-h-[480px] flex items-center justify-center text-center text-white overflow-hidden">

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
              {/*
                ── SEO IMAGE FIX ──────────────────────────────────────
                This <img> tag is invisible to users (opacity-0, pointer-
                events-none, aria-hidden) but fully readable by Google's
                image crawler. Google cannot index CSS background-image,
                so without this tag none of your hero images would ever
                appear in Google Image search results.
                ────────────────────────────────────────────────────── */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={backgroundImageAlts[index] || 'Simon Designs — graphic design services Kenya'}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
              <div className="absolute inset-0 bg-black/65"></div>
            </div>
          ))}

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

          <div className="max-w-6xl px-6 sm:px-8 lg:px-12 relative z-10 mx-auto">
            {slideContent.map((content, index) => (
              <div
                key={index}
                className={`${index === currentTextIndex ? 'block' : 'hidden'}`}
              >
                <h1
                  className={`mb-4 md:mb-6 text-center font-bold ${
                    getAnimationClasses(content.animation, index === currentTextIndex, textVisible)
                  }`}
                  style={{
                    fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em',
                    transitionDelay: textVisible ? '200ms' : '0ms',
                    transitionDuration: '1200ms'
                  }}
                >
                  {content.title}
                </h1>
                <p
                  className={`mb-6 md:mb-8 text-center max-w-3xl mx-auto ${
                    getAnimationClasses(content.animation, index === currentTextIndex, textVisible)
                  }`}
                  style={{
                    fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
                    lineHeight: '1.6',
                    transitionDelay: textVisible ? '400ms' : '0ms',
                    transitionDuration: '1200ms'
                  }}
                >
                  {content.description}
                </p>

                {content.showButtons && (
                  <div
                    key={`buttons-${animationKey}`}
                    className={`flex flex-wrap justify-center gap-4 md:gap-6 transition-all duration-700 ${
                      buttonsVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      transitionDelay: buttonsVisible ? '600ms' : '0ms'
                    }}
                  >
                    {content.button1Text && content.button1Link && (
                      <Link
                        href={content.button1Link}
                        className="text-white rounded-full relative overflow-hidden group text-center"
                        style={{
                          padding: 'clamp(10px, 2vw, 12px) clamp(24px, 5vw, 32px)',
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                          fontWeight: '600',
                          minWidth: 'clamp(110px, 25vw, 160px)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: getButtonGradient(content.button1Color).normal,
                          animation: buttonsVisible ? 'heroButtonPopIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, heroButtonBounce 2.5s ease-in-out 0.8s infinite' : 'none',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          willChange: 'transform',
                          opacity: buttonsVisible ? 1 : 0
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = getButtonGradient(content.button1Color).hover;
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                          e.currentTarget.style.boxShadow = '0 15px 30px -8px rgba(0, 0, 0, 0.2), 0 8px 16px -8px rgba(0, 0, 0, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = getButtonGradient(content.button1Color).normal;
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = '';
                        }}
                      >
                        <span className="relative z-10">{content.button1Text}</span>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: getButtonGradient(content.button1Color).hover }}
                        />
                        <div
                          className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300"
                          style={{ background: getButtonGradient(content.button1Color).normal }}
                        />
                      </Link>
                    )}

                    {content.button2Text && content.button2Link && (
                      <Link
                        href={content.button2Link}
                        className="text-white rounded-full relative overflow-hidden group text-center"
                        style={{
                          padding: 'clamp(10px, 2vw, 12px) clamp(24px, 5vw, 32px)',
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                          fontWeight: '600',
                          minWidth: 'clamp(110px, 25vw, 160px)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: getButtonGradient(content.button2Color).normal,
                          animation: buttonsVisible ? 'heroButtonPopIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards, heroButtonBounce 2.5s ease-in-out 1s infinite' : 'none',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          willChange: 'transform',
                          opacity: buttonsVisible ? 1 : 0
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = getButtonGradient(content.button2Color).hover;
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                          e.currentTarget.style.boxShadow = '0 15px 30px -8px rgba(0, 0, 0, 0.2), 0 8px 16px -8px rgba(0, 0, 0, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = getButtonGradient(content.button2Color).normal;
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = '';
                        }}
                      >
                        <span className="relative z-10">{content.button2Text}</span>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: getButtonGradient(content.button2Color).hover }}
                        />
                        <div
                          className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300"
                          style={{ background: getButtonGradient(content.button2Color).normal }}
                        />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#048F02' }} className="overflow-hidden py-2.5">
          <div className="banner-scroll whitespace-nowrap inline-block">
            <span className="inline-block px-8 text-white font-semibold text-sm">Transform Your Brand Today</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Brand Identity Design</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Award-Winning Projects</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Transparent Pricing</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Free Consultation Available</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">UI/UX Design</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Creative Excellence</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Marketing Materials</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Quick Response Time</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Professional Solutions</span>
            {/* Duplicate set for seamless infinite scroll */}
            <span className="inline-block px-8 text-white font-semibold text-sm">Transform Your Brand Today</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Brand Identity Design</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Award-Winning Projects</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Transparent Pricing</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Free Consultation Available</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">UI/UX Design</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Creative Excellence</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Marketing Materials</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Quick Response Time</span>
            <span className="inline-block px-8 text-white font-semibold text-sm">Professional Solutions</span>
          </div>
        </div>
      </section>
    </>
  );
}