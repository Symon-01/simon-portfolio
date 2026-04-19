// FILE: src/components/leadershipReview/ReaderReviews.tsx
'use client';

import { useState } from 'react';
import type { LRReview } from '@/types/leadershipReview';

interface ReaderReviewsProps {
  reviews: LRReview[];
  issueTitle: string;
  issueId: string; // Sanity document _id — needed so we know which issue to patch
}

// ─── Star display (read-only) ────────────────────────────────────────────────
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

// ─── Single review card ──────────────────────────────────────────────────────
function ReviewCard({ review }: { review: LRReview }) {
  const initials = review.reviewerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
      <StarRating rating={review.rating} />
      <p
        className="text-gray-700 text-sm leading-relaxed flex-1 italic"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        "{review.comment}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
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

// ─── Main component ──────────────────────────────────────────────────────────
export default function ReaderReviews({ reviews, issueTitle, issueId }: ReaderReviewsProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    if (error) setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leadership-review/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueId,
          issueTitle,
          reviewerName: form.reviewerName.trim(),
          location: form.location.trim(),
          rating: form.rating,
          comment: form.comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Shared input styles — explicit colours so mobile browsers don't override them
  const inputClass = [
    'w-full rounded-lg px-3 py-2.5 text-sm',
    'border border-gray-300',
    'bg-white',
    'text-gray-900',           // typed text always dark
    'placeholder-gray-400',   // placeholder always visible
    'focus:outline-none focus:border-blue-500',
    'transition-colors',
    // Force mobile browsers to respect the colours above
    'appearance-none',
  ].join(' ');

  return (
    <div className="mt-14">

      {/* ── Section header ────────────────────────────────────────────────── */}
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

      {/* ── Existing approved reviews ──────────────────────────────────────── */}
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

      {/* ── Submit form ────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden shadow-sm"
        style={{ border: '1.5px solid #283583' }}
      >
        {/* Form header bar */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ background: '#283583' }}
        >
          {/* Pencil icon */}
          <div className="flex flex-col gap-0.5 flex-shrink-0">
            <span className="block w-1 h-3 rounded-full bg-red-500" />
            <span className="block w-1 h-1 rounded-full bg-green-400" />
          </div>
          <div>
            <h3
              className="text-sm font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Share Your Response
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              What did you think of "{issueTitle}"?
            </p>
          </div>
        </div>

        {/* Form body */}
        <div className="bg-white px-6 py-6 sm:px-8 sm:py-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{ background: '#3fa535' }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className="font-bold text-gray-800 text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Thank you for your response!
              </p>
              <p className="text-xs text-gray-400 max-w-xs">
                Your review has been received and will appear here once it has been reviewed.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">

              {/* Star picker */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Your Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                      className="p-0.5 transition-transform hover:scale-110 active:scale-95"
                    >
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 16 16"
                        fill={star <= (hoveredStar || form.rating) ? '#EF6203' : 'none'}
                        stroke={star <= (hoveredStar || form.rating) ? '#EF6203' : '#d1d5db'}
                        strokeWidth="1.2"
                      >
                        <path d="M8 1l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11l-3.9 2.1.8-4.4L1.7 5.6l4.4-.6z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Location */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="reviewerName"
                    className="text-xs font-semibold text-gray-600 block mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="reviewerName"
                    type="text"
                    name="reviewerName"
                    required
                    value={form.reviewerName}
                    onChange={handleChange}
                    placeholder="e.g. James Mwangi"
                    className={inputClass}
                    style={{ color: '#111827' }}   /* belt-and-braces for stubborn mobile browsers */
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="text-xs font-semibold text-gray-600 block mb-1.5"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Nairobi, Nyeri..."
                    className={inputClass}
                    style={{ color: '#111827' }}
                  />
                </div>
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="comment"
                  className="text-xs font-semibold text-gray-600 block mb-1.5"
                >
                  Your Response *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  required
                  rows={4}
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="What did you think of this issue? Which story resonated most with you?"
                  className={`${inputClass} resize-none`}
                  style={{ color: '#111827' }}
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="self-start text-sm font-semibold text-white px-7 py-2.5 rounded-lg transition-opacity disabled:opacity-60"
                style={{ background: loading ? '#9ca3af' : '#283583' }}
              >
                {loading ? 'Submitting…' : 'Submit Response'}
              </button>

            </div>
          )}
        </div>
      </div>

    </div>
  );
}