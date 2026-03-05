// FILE LOCATION: src/components/portfolio/ProjectGallery.tsx

"use client";

import { useState } from 'react';
import { urlFor } from '@/lib/sanity';

interface ProjectGalleryProps {
  images: any[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDownloadImage = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <>
      {/* Container Card: Standardized bg-white, rounded-2xl, shadow, and mb-8 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
        
        {/* Header Section with standardized .section-title and .section-desc */}
        <div className="mb-6 lg:mb-8">
          <h2 className="section-title font-bold text-gray-900">
            Project Gallery
          </h2>
          <p className="section-desc text-gray-600">
            Click on any image to view full size, or download individual images for reference.
          </p>
        </div>

        {/* Grid: Updated to match Design System gaps (gap-4 lg:gap-6) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {images.map((image: any, index: number) => {
            const imageUrl = urlFor(image).width(800).height(800).url();
            return (
              <div 
                key={index} 
                className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-gray-100"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={imageUrl}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Download Button: Using Brand Green #048F02 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadImage(imageUrl, `${title}-${index + 1}.jpg`);
                  }}
                  className="absolute bottom-3 right-3 text-white p-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300 hover:brightness-110 z-10"
                  style={{ backgroundColor: '#048F02' }}
                  title="Download this image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-bold hidden lg:inline text-xs uppercase tracking-wider">Download</span>
                </button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-white/10 rounded-full"
            title="Close (ESC)"
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
                goToPrevious();
              }}
              className="absolute left-6 text-white hover:scale-110 transition-transform z-50 p-3 bg-white/10 rounded-full"
              title="Previous (←)"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image Display */}
          <div className="relative max-w-6xl max-h-[85vh] mx-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={urlFor(images[currentImageIndex]).width(1600).url()}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image counter using brand standards */}
            <div className="mt-6 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold card-desc">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-6 text-white hover:scale-110 transition-transform z-50 p-3 bg-white/10 rounded-full"
              title="Next (→)"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Keyboard navigation helper */}
      {lightboxOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrevious();
          }}
          tabIndex={0}
          className="fixed inset-0 pointer-events-none"
          autoFocus
        />
      )}
    </>
  );
}