'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Banner } from '@/types/banner';

interface BannerSectionProps {
  banner: Banner | null;
  fallbackComponent?: React.ReactNode;
  height?: string;
  className?: string;
}

export default function BannerSection({ 
  banner, 
  fallbackComponent,
  height = 'h-[600px]',
  className = '' 
}: BannerSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    if (!banner?.isSlider || !banner?.images || banner.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banner.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banner]);

  // If no banner from Sanity, show fallback
  if (!banner || !banner.images || banner.images.length === 0) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    return null;
  }

  const currentImage = banner.images[currentSlide];

  return (
    <div className={`relative ${height} overflow-hidden ${className}`}>
      {/* Background Image */}
      <Image
        src={currentImage.image.asset.url}
        alt={currentImage.alt}
        fill
        className="object-cover"
        priority={currentSlide === 0}
        quality={90}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center z-10">
        {currentImage.heading && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">
            {currentImage.heading}
          </h1>
        )}
        {currentImage.subheading && (
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl">
            {currentImage.subheading}
          </p>
        )}
        {currentImage.ctaText && currentImage.ctaLink && (
          <Link
            href={currentImage.ctaLink}
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            {currentImage.ctaText}
          </Link>
        )}
      </div>

      {/* Slider Controls - Only show if slider enabled and multiple images */}
      {banner.isSlider && banner.images.length > 1 && (
        <>
          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {banner.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Previous Arrow */}
          <button
            onClick={() => setCurrentSlide((prev) => 
              prev === 0 ? banner.images.length - 1 : prev - 1
            )}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            onClick={() => setCurrentSlide((prev) => 
              (prev + 1) % banner.images.length
            )}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}