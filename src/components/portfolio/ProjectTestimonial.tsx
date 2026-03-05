// FILE LOCATION: src/components/portfolio/ProjectTestimonial.tsx

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { Testimonial } from '@/types/portfolio';

interface ProjectTestimonialProps {
  testimonials?: Testimonial[];
  testimonial?: any;
}

export default function ProjectTestimonial({ testimonials, testimonial }: ProjectTestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  let testimonialsArray: Testimonial[] = [];

  if (testimonials && testimonials.length > 0) {
    testimonialsArray = testimonials;
  } else if (testimonial && testimonial.quote) {
    testimonialsArray = [{ ...testimonial, rating: 5, verified: true }];
  }

  if (testimonialsArray.length === 0) return null;

  const currentTestimonial = testimonialsArray[activeIndex];

  const renderStars = (rating: number) => (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    // ✅ FIX 1: mb-6 → mb-8
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">

      {/* ✅ FIX 2: Added orange underline accent + mb-6 → mb-8, matching all other sections */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="section-title font-bold text-gray-900">
            Client Testimonial{testimonialsArray.length > 1 ? 's' : ''}
          </h2>
          <div
            className="mt-2 h-1 w-16 rounded-full"
            style={{ backgroundColor: '#EF6203' }}
          />
        </div>

        {/* Navigation arrows — only shown when multiple testimonials */}
        {testimonialsArray.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + testimonialsArray.length) % testimonialsArray.length)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-gray-600 card-desc">
              {activeIndex + 1} / {testimonialsArray.length}
            </span>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % testimonialsArray.length)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Testimonial Content */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">

        {/* Quote Icon */}
        <svg
          className="w-10 h-10 mb-4"
          style={{ color: '#048F02' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>

        {/* Star Rating */}
        {renderStars(currentTestimonial.rating)}

        {/* ✅ FIX 3: section-desc → card-desc for quote text */}
        <blockquote className="card-desc text-gray-800 leading-relaxed mb-6 text-justify">
          "{currentTestimonial.quote}"
        </blockquote>

        {/* Client Info */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">

            {/* Photo */}
            {currentTestimonial.photo && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-md flex-shrink-0">
                <Image
                  src={urlFor(currentTestimonial.photo).width(100).height(100).url()}
                  alt={currentTestimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Name & Position */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-gray-900 card-title">
                  {currentTestimonial.author}
                </p>
                {currentTestimonial.verified && (
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#048F02' }}
                    title="Verified Client"
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-gray-600 card-desc">
                {currentTestimonial.position}
                {currentTestimonial.company && ` • ${currentTestimonial.company}`}
              </p>
              {/* ✅ FIX 4: text-xs → card-desc for consistent font sizing */}
              {currentTestimonial.date && (
                <p className="text-gray-500 card-desc mt-1">
                  {new Date(currentTestimonial.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots — multiple testimonials only */}
      {testimonialsArray.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonialsArray.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex
                  ? 'w-8'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              style={index === activeIndex ? { backgroundColor: '#048F02' } : {}}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}