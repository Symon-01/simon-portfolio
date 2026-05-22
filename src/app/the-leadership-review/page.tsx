// FILE: src/app/the-leadership-review/page.tsx

import type { Metadata } from "next";
import LeadershipReviewPageClient from './LeadershipReviewPageClient';

export const metadata: Metadata = {
  title: "The Leadership Review – Celebrating Exemplary Kenyan Leadership",
  description: "Your Number One Newspaper for Celebrating Exemplary Leadership. Published by Simon Designs, The Leadership Review profiles leaders transforming Kenya at ward, constituency, county and national level.",
  openGraph: {
    title: "The Leadership Review – Exemplary Kenyan Leadership",
    description: "Your Number One Newspaper for Celebrating Exemplary Leadership. Profiles of leaders transforming Kenya — from ward to national level.",
    url: "https://simondesigns.co.ke/the-leadership-review",
    siteName: "The Leadership Review",
    type: "website",
    images: [
      {
        url: "https://simondesigns.co.ke/The Leadership Review Cover Image.jpg",
        width: 1200,
        height: 630,
        alt: "The Leadership Review – Your Number One Newspaper for Celebrating Exemplary Leadership",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Leadership Review – Exemplary Kenyan Leadership",
    description: "Your Number One Newspaper for Celebrating Exemplary Leadership.",
    images: ["https://simondesigns.co.ke/leadership-review-og.jpg"],
  },
};

export default function LeadershipReviewPage() {
  return <LeadershipReviewPageClient />;
}