import type { Metadata } from "next";
import { client } from '@/lib/sanity';
import PortfolioPageClient from './PortfolioPageClient';

export const revalidate = 3600;

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

export default async function PortfolioPage() {
  let projects = [];
  try {
    const query = `*[_type == "portfolio"] | order(order asc, _createdAt desc) {
      _id,
      title,
      slug,
      category,
      description,
      featured,
      "coverImage": coalesce(
        images[_type == "projectImage" && isCover == true][0].asset.asset->url,
        images[_type == "projectImage"][0].asset.asset->url,
        images[isCover == true][0].asset->url,
        images[0].asset->url
      ),
      tags
    }`;
    projects = await client.fetch(query, {}, { next: { revalidate: 3600 } });
  } catch (e) {
    console.error('Portfolio page server fetch failed:', e);
  }

  return <PortfolioPageClient initialProjects={projects} />;
}