"use client";

import { useState } from 'react';
import Link from 'next/link';
import ArtworkHeader from '@/components/simonArts/ArtworkHeader';
import ArtworkImages from '@/components/simonArts/ArtworkImages';
import ArtworkTechnicalDetails from '@/components/simonArts/ArtworkTechnicalDetails';
import ArtworkStory from '@/components/simonArts/ArtworkStory';
import ArtworkTags from '@/components/simonArts/ArtworkTags';
import ArtworkPurchaseCTA from '@/components/simonArts/ArtworkPurchaseCTA';
import ArtworkLightbox from '@/components/simonArts/ArtworkLightbox';
import SupportButton from '@/components/SupportButton';
import { Artwork } from '@/types/simonArts';

interface ArtworkDetailClientProps {
  initialArtwork: Artwork | null;
}

export default function ArtworkDetailClient({ initialArtwork }: ArtworkDetailClientProps) {
  const [artwork] = useState<Artwork | null>(initialArtwork);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = artwork ? [artwork.mainImage, ...(artwork.detailImages || [])] : [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const goToPrevious = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="font-bold mb-4 text-gray-900 text-2xl">Artwork Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the artwork you're looking for.</p>
          <Link href="/simon-arts" className="inline-flex items-center font-semibold text-sm" style={{ color: '#048F02' }}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6 lg:py-8">

          <Link
            href="/simon-arts"
            className="inline-flex items-center font-semibold mb-6 transition-colors text-sm"
            style={{ color: '#048F02' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </Link>

          <ArtworkHeader artwork={artwork} />

          <ArtworkImages
            mainImage={artwork.mainImage}
            detailImages={artwork.detailImages}
            title={artwork.title}
            onImageClick={openLightbox}
          />

          <ArtworkTechnicalDetails artwork={artwork} />
          <ArtworkStory story={artwork.story} />

          {artwork.tags && artwork.tags.length > 0 && (
            <ArtworkTags tags={artwork.tags} />
          )}

          {artwork.availableForSale && (
            <ArtworkPurchaseCTA price={artwork.price} />
          )}

          <div className="text-center my-8">
            <SupportButton position="bottom" />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/simon-arts"
              className="inline-flex items-center font-semibold text-sm transition-colors"
              style={{ color: '#048F02' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Artworks
            </Link>
          </div>

        </div>
      </div>

      {lightboxOpen && (
        <ArtworkLightbox
          images={allImages}
          currentIndex={currentImageIndex}
          title={artwork.title}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}
    </>
  );
}