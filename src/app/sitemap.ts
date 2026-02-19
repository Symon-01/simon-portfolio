import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://simondesigns.co.ke',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1, // Highest priority
    },
    {
      url: 'https://simondesigns.co.ke/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // Brand page
    },
    {
      url: 'https://simondesigns.co.ke/about-me',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // Personal bio page
    },
    {
      url: 'https://simondesigns.co.ke/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://simondesigns.co.ke/portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://simondesigns.co.ke/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}