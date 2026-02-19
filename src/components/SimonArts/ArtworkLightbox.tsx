// FILE LOCATION: src/components/simonArts/ArtworkLightbox.tsx

"use client";

import { urlFor } from '@/lib/sanity';

interface ArtworkLightboxProps {
  images: any[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ArtworkLightbox({
  images,
  currentIndex,
  title,
  onClose,
  onNext,
  onPrevious
}: ArtworkLightboxProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="relative max-w-7xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={urlFor(images[currentIndex]).width(1920).height(1920).url()}
          alt={title}
          className="max-w-full max-h-[90vh] object-contain"
        />
        
        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}