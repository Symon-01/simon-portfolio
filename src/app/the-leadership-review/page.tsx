// FILE: src/app/the-leadership-review/page.tsx

import type { Metadata } from "next";
import LeadershipReviewPageClient from './LeadershipReviewPageClient';

export const metadata: Metadata = {
  title: "The Leadership Review – Celebrating Exemplary Kenyan Leadership",
  description: "Your Number One Newspaper for Celebrating Exemplary Leadership. Published by Simon Designs, The Leadership Review profiles leaders transforming Kenya at ward, constituency, county and national level.",
  openGraph: {
    title: "The Leadership Review – Exemplary Kenyan Leadership",
    description: "A newspaper celebrating leaders transforming Kenya. Published by Simon Designs.",
    url: "https://simondesigns.co.ke/the-leadership-review",
    images: [
      {
        url: "https://simondesigns.co.ke/logo.png",
        width: 1200,
        height: 630,
        alt: "The Leadership Review – Published by Simon Designs",
      }
    ],
  },
};

export default function LeadershipReviewPage() {
  return <LeadershipReviewPageClient />;
}