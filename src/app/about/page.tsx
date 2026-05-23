import type { Metadata } from "next";
import AboutPageClient from './AboutPageClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us – Simon Designs",
  description: "Learn about Simon Designs: our mission, values, design philosophy, and the creative tools we use to bring your vision to life.",
  openGraph: {
    title: "About Us – Simon Designs",
    description: "Learn about our mission, values, and design philosophy.",
    url: "https://simondesigns.co.ke/about",
    images: [
      {
        url: "https://simondesigns.co.ke/hero.jpg",
        width: 1200,
        height: 630,
        alt: "About Simon Designs",
      }
    ],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}