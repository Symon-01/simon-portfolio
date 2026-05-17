// FILE: src/app/api/confirm-subscription/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simondesigns.co.ke';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=invalid`);
  }

  try {
    // Find subscriber with this token
    const subscriber = await sanity.fetch(
      `*[_type == "subscriber" && confirmToken == $token][0]{ _id, email, confirmed }`,
      { token }
    );

    if (!subscriber) {
      // Token not found or already used
      return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=invalid`);
    }

    if (subscriber.confirmed) {
      // Already confirmed — just redirect with success
      return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=already`);
    }

    // ── Mark subscriber as confirmed ──────────────────────────────
    await sanity
      .patch(subscriber._id)
      .set({
        confirmed:    true,
        confirmedAt:  new Date().toISOString(),
        confirmToken: null,   // invalidate token after use
      })
      .commit();

    // ── Redirect to leadership review page with success flag ───────
    return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=confirmed`);

  } catch (err) {
    console.error('[confirm-subscription] error:', err);
    return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=error`);
  }
}