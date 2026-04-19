// FILE: src/app/api/leadership-review/reviews/route.ts

import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { issueId, issueTitle, reviewerName, location, rating, comment } = body;

    // ── Validate ─────────────────────────────────────────────────────────────
    if (!issueId || !reviewerName || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields: issueId, reviewerName, and comment are required.' },
        { status: 400 }
      );
    }

    const parsedRating = Number(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a number between 1 and 5.' },
        { status: 400 }
      );
    }

    // ── Save to Sanity ────────────────────────────────────────────────────────
    // status: 'approved' so the review appears on the website immediately.
    // If someone posts something offensive, go to Sanity Studio → find the
    // issue → scroll to Reader Reviews → toggle "Hide this review" ON,
    // or delete the review entry entirely.

    const newReview = {
      _key: `review_${Date.now()}`,
      _type: 'review',
      reviewerName: reviewerName.trim(),
      location: location?.trim() || '',
      rating: parsedRating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      status: 'approved',   // ← live immediately
      isHidden: false,
    };

    await sanity
      .patch(issueId)
      .setIfMissing({ reviews: [] })
      .insert('after', 'reviews[-1]', [newReview])
      .commit({ autoGenerateArrayKeys: false });

    // ── Email notification to Simon (optional) ────────────────────────────────
    // Requires RESEND_API_KEY and SIMON_EMAIL in your .env.local
    if (process.env.RESEND_API_KEY && process.env.SIMON_EMAIL) {
      const stars = '★'.repeat(parsedRating) + '☆'.repeat(5 - parsedRating);

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.SIMON_EMAIL,
          subject: `New reader response on "${issueTitle}"`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
              <h2 style="color: #283583; margin-bottom: 4px;">New Reader Response</h2>
              <p style="color: #6b7280; font-size: 14px; margin-top: 0;">
                Someone just left a review on <strong>${issueTitle}</strong>.
                It is <strong>live on the website now</strong>. If you need to hide or delete it,
                go to Sanity Studio and update that review.
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <table style="width: 100%; font-size: 14px; line-height: 1.7;">
                <tr>
                  <td style="color: #6b7280; width: 110px; vertical-align: top; padding-bottom: 8px;">Name</td>
                  <td style="font-weight: 600;">${reviewerName}</td>
                </tr>
                ${location ? `<tr><td style="color: #6b7280; vertical-align: top; padding-bottom: 8px;">Location</td><td>${location}</td></tr>` : ''}
                <tr>
                  <td style="color: #6b7280; vertical-align: top; padding-bottom: 8px;">Rating</td>
                  <td style="color: #EF6203; font-size: 16px;">${stars} (${parsedRating}/5)</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; vertical-align: top; padding-bottom: 8px;">Response</td>
                  <td style="font-style: italic;">"${comment}"</td>
                </tr>
              </table>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="font-size: 13px; color: #9ca3af;">
                To hide or delete: open <a href="https://simondesigns.sanity.studio" style="color: #283583;">Sanity Studio</a>
                → The Leadership Review → find the issue → scroll to Reader Reviews → toggle
                <strong>Hide this review</strong> or delete the entry.
              </p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json(
      { success: true, message: 'Review posted successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Leadership Review] Review submission error:', error?.message || error);
    return NextResponse.json(
      { error: 'Something went wrong while saving your review. Please try again.' },
      { status: 500 }
    );
  }
}