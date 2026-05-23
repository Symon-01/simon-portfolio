import type { Metadata } from "next";
import ServicesPageClient from './ServicesPageClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Services – Professional Graphic Design | Simon Designs",
  description: "Explore our graphic design services: logo design, branding, web design, UI/UX, print materials, and more. Quality design tailored to your needs.",
  openGraph: {
    title: "Our Services – Simon Designs",
    description: "Professional graphic design services: branding, web design, print, and more.",
    url: "https://simondesigns.co.ke/services",
    images: [
      {
        url: "https://simondesigns.co.ke/uiux.jpg",
        width: 1200,
        height: 630,
        alt: "Simon Designs Services",
      }
    ],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}