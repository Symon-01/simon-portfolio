// FILE: src/app/api/unsubscribe/route.ts

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
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=unsubscribed`);
  }

  try {
    const subscriber = await sanity.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id }`,
      { email }
    );

    if (subscriber?._id) {
      // Delete the subscriber document from Sanity
      await sanity.delete(subscriber._id);
    }

    return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=unsubscribed`);
  } catch (err) {
    console.error('[unsubscribe] error:', err);
    return NextResponse.redirect(`${BASE_URL}/the-leadership-review?subscribe=error`);
  }
}