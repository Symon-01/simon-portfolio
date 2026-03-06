'use client';

import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.image';

interface StoryImage {
  asset: any;
  description: string;
}

interface StoryParagraph {
  _key: string;
  text: string;
}

interface StorySection {
  _id: string;
  title: string;
  order: number;
  paragraphs: StoryParagraph[];
  images?: StoryImage[];
}

interface MyStoryProps {
  storySections: StorySection[];
}

export default function MyStory({ storySections }: MyStoryProps) {
  const sortedSections = [...storySections].sort((a, b) => a.order - b.order);

  return (
    <>
      <style jsx>{`
        /* ========== SIMON DESIGNS - TYPOGRAPHY SYSTEM ========== */

        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }
        .section-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }
        .story-section-title {
          font-size: 1.75rem !important;
          line-height: 1.3 !important;
          font-weight: 700 !important;
        }
        .story-paragraph {
          font-size: 1rem !important;
          line-height: 1.7 !important;
        }
        .image-description {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }

        /* ========== MOBILE RESPONSIVE ========== */
        @media (max-width: 1023px) {
          .section-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          .section-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          .story-section-title {
            font-size: 1.375rem !important;
          }
          .story-paragraph {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
          .image-description {
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>
              My Story
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              A journey of passion, creativity, and the relentless pursuit of meaningful design.
            </p>
          </div>

          {/* Dynamic Story Sections */}
          <div className="space-y-8">
            {sortedSections.map((section, index) => (
              <div key={section._id}>
                <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-10 border border-gray-100 hover:shadow-xl transition-shadow">

                  {/* Section Title with Number Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #048F02, #037a01)' }}
                    >
                      {index + 1}
                    </div>
                    <h3 className="story-section-title text-gray-900 pt-2">
                      {section.title}
                    </h3>
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-4 mb-6">
                    {section.paragraphs?.map((para) => (
                      <p key={para._key} className="story-paragraph text-gray-600 leading-relaxed">
                        {para.text}
                      </p>
                    ))}
                  </div>

                  {/* Images Grid - 4 per row */}
                  {section.images && section.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
                      {section.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="group">
                          <div className="relative overflow-hidden rounded-2xl shadow-lg mb-3 bg-gray-100">
                            <div className="relative aspect-[3/4]">
                              <Image
                                src={urlFor(image.asset).url()}
                                alt={image.description || `Story image ${imgIndex + 1}`}
                                fill
                                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          </div>
                          {image.description && (
                            <p className="image-description text-gray-600 italic text-center px-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider between sections (except last) */}
                {index < sortedSections.length - 1 && (
                  <div className="mt-8">
                    <div
                      className="h-px max-w-md mx-auto"
                      style={{
                        background: 'linear-gradient(to right, transparent, #EF6203, transparent)',
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section Divider */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div
            className="h-0.5"
            style={{
              background: 'linear-gradient(to right, transparent, #EF6203, transparent)',
            }}
          ></div>
        </div>
      </section>
    </>
  );
}