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
      <div className="mb-6">
        <h2 className="section-title font-bold text-gray-900 mb-3">Project Gallery</h2>
        <p className="section-desc text-gray-600 mb-4">
          Click on any image to view full size, or download individual images.
        </p>
        {/* Changed grid: Mobile = 2 columns, Tablet = 3 columns, Desktop = 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {images.map((image: any, index: number) => {
            const imageUrl = urlFor(image).width(800).height(800).url();
            return (
              <div 
                key={index} 
                className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={imageUrl}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Download Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening lightbox
                    handleDownloadImage(imageUrl, `${title}-${index + 1}.jpg`);
                  }}
                  className="absolute bottom-2 right-2 text-white p-2 rounded-lg shadow-lg flex items-center gap-1 transition-all duration-300 hover:scale-105 z-10"
                  style={{ backgroundColor: '#048F02' }}
                  title="Download this image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-semibold hidden lg:inline card-desc text-xs">Download</span>
                </button>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <svg className="w-8 h-8 lg:w-12 lg:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
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
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
              title="Previous (←)"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="relative max-w-7xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={urlFor(images[currentImageIndex]).width(1920).height(1920).url()}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
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
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
              title="Next (→)"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Keyboard navigation */}
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