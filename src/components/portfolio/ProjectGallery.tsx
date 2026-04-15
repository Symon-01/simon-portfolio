// FILE LOCATION: src/components/portfolio/ProjectGallery.tsx
"use client";

import { useState } from 'react';

interface GalleryImage {
  url: string; // ✅ FIXED: was "asset", now "url" to match GROQ query output
  isCover?: boolean;
  alt?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const goToPrevious = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

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

  // ✅ FIXED: was image.asset, now image.url to match the interface above
  const getImageUrl = (image: GalleryImage) => image.url;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">

        <div className="mb-6 lg:mb-8">
          <h2 className="section-title font-bold text-gray-900">Project Gallery</h2>
          <p className="section-desc text-gray-600">
            Click on any image to view full size, or download individual images for reference.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {images.map((image: GalleryImage, index: number) => {
            const imageUrl = getImageUrl(image);
            if (!imageUrl) return null;

            return (
              <div
                key={index}
                className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-gray-100"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={imageUrl}
                  alt={image.alt || `${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Cover badge */}
                {image.isCover && (
                  <span className="absolute top-2 left-2 bg-[#048F02] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    ⭐ Cover
                  </span>
                )}

                {/* Download Button */}
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
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-white/10 rounded-full"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-6 text-white hover:scale-110 transition-transform z-50 p-3 bg-white/10 rounded-full"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div
            className="relative max-w-6xl max-h-[85vh] mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(images[currentImageIndex])}
              alt={images[currentImageIndex].alt || `${title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold card-desc">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-6 text-white hover:scale-110 transition-transform z-50 p-3 bg-white/10 rounded-full"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

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