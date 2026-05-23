"use client";

import { useState } from 'react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Artwork, categoryLabels } from '@/types/simonArts';
import SimonArtsHero from '@/components/SimonArtsHero';
import SimonArtsCTA from '@/components/SimonArtsCTA';
import SupportButton from '@/components/SupportButton';

interface SimonArtsPageClientProps {
  initialArtworks: Artwork[];
}

export default function SimonArtsPageClient({ initialArtworks }: SimonArtsPageClientProps) {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'portrait', 'landscape', 'still-life', 'abstract', 'animal', 'other'];

  const filteredArtworks = filter === 'all'
    ? initialArtworks
    : initialArtworks.filter(art => art.category === filter);

  return (
    <>
      <style>{`
        .section-title { font-size: 2rem !important; line-height: 1.3 !important; margin-bottom: 0.375rem !important; }
        .section-desc { font-size: 1rem !important; line-height: 1.6 !important; }
        .card-title { font-size: 0.95rem !important; font-weight: 700 !important; }
        .card-desc { font-size: 0.875rem !important; line-height: 1.5 !important; }
        .link-text { font-size: 0.875rem !important; }
        .filter-btn { font-size: 0.875rem !important; font-weight: 600 !important; }
        @media (min-width: 1024px) {
          a.cta-button { padding: 10px 28px !important; font-size: 0.9375rem !important; min-height: 44px !important; font-weight: 600 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; }
        }
        @media (max-width: 1023px) {
          .section-title { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; }
          .section-desc { font-size: 0.9rem !important; padding: 0 8px; }
          .card-title { font-size: 0.85rem !important; font-weight: 700 !important; }
          .card-desc { font-size: 0.8rem !important; line-height: 1.4 !important; }
          .link-text { font-size: 0.8rem !important; }
          .filter-btn { font-size: 0.8rem !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title { font-size: 0.9rem !important; }
        }
      `}</style>

      <SimonArtsHero />

      <section id="gallery" className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn px-5 py-2 rounded-full transition-all duration-300 ${
                  filter === cat ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === cat ? { backgroundColor: '#048F02' } : {}}
              >
                {cat === 'all' ? 'All Artworks' : categoryLabels[cat]}
              </button>
            ))}
          </div>

          {filteredArtworks.length === 0 ? (
            <div className="text-center py-12">
              <p className="card-desc text-gray-600">No artworks found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-10">
              {filteredArtworks.map((artwork) => (
                <Link
                  key={artwork._id}
                  href={`/simon-arts/${artwork.slug.current}`}
                  className="block group"
                >
                  <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">

                    {artwork.mainImage && (
                      <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '1 / 1.414' }}>
                        <Image
                          src={urlFor(artwork.mainImage).width(600).height(850).url()}
                          alt={artwork.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {artwork.featured && (
                            <span className="text-white px-2.5 py-1 rounded-full font-bold text-xs" style={{ backgroundColor: '#EF6203' }}>
                              ⭐ Featured
                            </span>
                          )}
                          {artwork.availableForSale && (
                            <span className="text-white px-2.5 py-1 rounded-full font-bold text-xs" style={{ backgroundColor: '#048F02' }}>
                              For Sale
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-4 lg:p-5 flex-grow flex flex-col">
                      <div className="card-desc font-semibold mb-2 uppercase tracking-wide" style={{ color: '#EF6203' }}>
                        {categoryLabels[artwork.category]} • {artwork.year}
                      </div>
                      <h3 className="card-title text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="card-desc text-gray-700 leading-relaxed line-clamp-2 mb-3">
                        {artwork.description}
                      </p>
                      <div className="hidden lg:flex flex-wrap gap-2 mb-3">
                        {artwork.medium && artwork.medium.slice(0, 3).map((med, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                            {med.replace('-', ' ')}
                          </span>
                        ))}
                        {artwork.medium && artwork.medium.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 font-semibold">
                            +{artwork.medium.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="pt-3 border-t border-gray-200 mt-auto">
                        <span className="link-text inline-flex items-center font-semibold group-hover:translate-x-1 transition-transform" style={{ color: '#048F02' }}>
                          View Details
                          <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <SupportButton position="bottom" />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div className="h-0.5" style={{ background: "linear-gradient(to right, transparent, #EF6203, transparent)" }} />
        </div>
      </section>

      <SimonArtsCTA />
    </>
  );
}