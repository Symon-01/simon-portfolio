// FILE LOCATION: src/app/portfolio/page.tsx
import type { Metadata } from "next";
import PortfolioPageClient from './PortfolioPageClient';

export const metadata: Metadata = {
  title: "Portfolio – Our Design Work | Simon Designs",
  description: "Explore our portfolio of graphic design projects: logos, branding, websites, and print work. See how we transform ideas into visual reality.",
  openGraph: {
    title: "Portfolio – Simon Designs",
    description: "Explore our creative design projects and success stories.",
    url: "https://simondesigns.co.ke/portfolio",
    images: [
      {
        url: "https://simondesigns.co.ke/preview.png",
        width: 1200,
        height: 630,
        alt: "Simon Designs Portfolio",
      }
    ],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}