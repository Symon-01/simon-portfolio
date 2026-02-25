// FILE LOCATION: src/app/pricing/page.tsx
import type { Metadata } from "next";
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: "Pricing – Transparent & Affordable Design Services | Simon Designs",
  description: "View our transparent pricing for graphic design services. Quality guaranteed, flexible packages, and no hidden fees. Get a custom quote today.",
  openGraph: {
    title: "Pricing – Simon Designs",
    description: "Transparent pricing for quality graphic design services.",
    url: "https://simondesigns.co.ke/pricing",
    images: [
      {
        url: "https://simondesigns.co.ke/preview.png",
        width: 1200,
        height: 630,
        alt: "Simon Designs Pricing",
      }
    ],
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}