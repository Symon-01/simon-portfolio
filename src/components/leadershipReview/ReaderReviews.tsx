// FILE: src/components/leadershipReview/ReaderReviews.tsx
'use client';

import { useState } from 'react';
import type { LRReview } from '@/types/leadershipReview';

interface ReaderReviewsProps {
  reviews: LRReview[];
  issueTitle: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill={star <= rating ? '#EF6203' : 'none'}
          stroke={star <= rating ? '#EF6203' : '#d1d5db'}
          strokeWidth="1.2"
        >
          <path d="M8 1l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11l-3.9 2.1.8-4.4L1.7 5.6l4.4-.6z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: LRReview }) {
  const initials = review.reviewerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
      <StarRating rating={review.rating} />
      <p
        className="text-gray-700 text-sm leading-relaxed flex-1 italic"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        "{review.comment}"
      </p>
      <div className="flex items-center gap-3 pt-1 border-t border-gray-50">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: '#283583' }}
        >
          {initials}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-700">{review.reviewerName}</p>
          {review.location && (
            <p className="text-xs text-gray-400">{review.location}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReaderReviews({ reviews, issueTitle }: ReaderReviewsProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    reviewerName: '',
    location: '',
    rating: 5,
    comment: '',
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In a future phase this will POST to a Sanity mutation or API route.
    // For now it shows a thank-you state.
    setSubmitted(true);
  }

  return (
    <div className="mt-14">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to right, #283583, transparent)' }}
        />
        <h2
          className="text-lg font-bold text-gray-800 px-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Reader Responses
        </h2>
        <div
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to left, #283583, transparent)' }}
        />
      </div>

      {/* Existing reviews */}
      {reviews && reviews.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center mb-10 italic">
          No reviews yet for this issue. Be the first to share your thoughts.
        </p>
      )}

      {/* Leave a review form */}
      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: '#283583', borderOpacity: 0.2, background: '#f8f9ff' }}
      >
        <h3
          className="text-base font-bold mb-1"
          style={{ color: '#283583', fontFamily: "'Playfair Display', serif" }}
        >
          Share Your Response
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          What did you think of "{issueTitle}"?
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style={{ background: '#3fa535' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-bold text-gray-800">Thank you for your response!</p>
            <p className="text-xs text-gray-400">
              Your review will be added after a quick check.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Star picker */}
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-2">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                    className="p-0.5 transition-transform hover:scale-110"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 16 16"
                      fill={
                        star <= (hoveredStar || form.rating) ? '#EF6203' : 'none'
                      }
                      stroke={
                        star <= (hoveredStar || form.rating)
                          ? '#EF6203'
                          : '#d1d5db'
                      }
                      strokeWidth="1.2"
                    >
                      <path d="M8 1l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11l-3.9 2.1.8-4.4L1.7 5.6l4.4-.6z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Name + location row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="reviewerName"
                  required
                  value={form.reviewerName}
                  onChange={handleChange}
                  placeholder="e.g. James Mwangi"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Nairobi, Nyeri..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                Your Response *
              </label>
              <textarea
                name="comment"
                required
                rows={4}
                value={form.comment}
                onChange={handleChange}
                placeholder="What did you think of this issue? Which story resonated most with you?"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-start text-sm font-semibold text-white px-6 py-2.5 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: '#283583' }}
            >
              Submit Response
            </button>

          </form>
        )}
      </div>

    </div>
  );
}