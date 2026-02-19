// FILE LOCATION: src/components/simonArts/ArtworkImages.tsx

"use client";

import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface ArtworkImagesProps {
  mainImage: any;
  detailImages?: any[];
  title: string;
  onImageClick: (index: number) => void;
}

export default function ArtworkImages({ 
  mainImage, 
  detailImages, 
  title,
  onImageClick 
}: ArtworkImagesProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      {/* Main Image - A4 Portrait Ratio (210:297) */}
      <div 
        className="relative w-full bg-white rounded-xl overflow-hidden cursor-pointer group mb-6 mx-auto"
        style={{ 
          maxWidth: '600px',
          aspectRatio: '210/297'
        }}
        onClick={() => onImageClick(0)}
      >
        <Image
          src={urlFor(mainImage).width(840).height(1188).url()}
          alt={title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          priority
        />
        
        {/* Zoom hint */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 flex items-center justify-center">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>

      {/* Detail Images Grid - A4 Portrait Ratio (210:297) */}
      {detailImages && detailImages.length > 0 && (
        <div>
          <h3 className="card-title font-bold text-gray-900 mb-4">Detail Shots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {detailImages.map((image, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: '210/297' }}
                onClick={() => onImageClick(index + 1)}
              >
                <Image
                  src={urlFor(image).width(420).height(594).url()}
                  alt={`${title} - Detail ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}