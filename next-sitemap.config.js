/** @type {import('next-sitemap').IConfig} */

// ============================================================
// SIMON DESIGNS — next-sitemap.config.js
// This file builds your sitemap AND image sitemap automatically
// by fetching all images from Sanity CMS at build time.
// ============================================================

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

module.exports = {
  siteUrl: 'https://simondesigns.co.ke',
  generateRobotsTxt: true,
  exclude: ['/test-*', '/api/*'],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  // This function adds all your dynamic pages + image entries to the sitemap
  additionalPaths: async (config) => {
    const results = [];

    try {
      // ─────────────────────────────────────────────
      // 1. PORTFOLIO PROJECTS
      // Fetches every project slug + all its images
      // ─────────────────────────────────────────────
      const portfolioProjects = await client.fetch(`
        *[_type == "portfolio"] {
          "slug": slug.current,
          title,
          description,
          "images": images[] {
            "url": select(
              _type == "projectImage" => asset->url,
              asset->url
            ),
            "alt": select(
              _type == "projectImage" => alt,
              ""
            )
          }
        }
      `);

      for (const project of portfolioProjects) {
        if (!project.slug) continue;

        // Filter out any images with no URL
        const validImages = (project.images || []).filter(img => img && img.url);

        results.push({
          loc: `/portfolio/${project.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8,
          // Google image sitemap entries
          images: validImages.map(img => ({
            loc: img.url,
            title: project.title || 'Simon Designs Portfolio',
            caption: img.alt || project.description || project.title || 'Graphic design work by Simon Designs',
          })),
        });
      }

      // ─────────────────────────────────────────────
      // 2. SIMON ARTS (Pencil Drawings)
      // Fetches every artwork slug + all its images
      // ─────────────────────────────────────────────
      const simonArts = await client.fetch(`
        *[_type == "simonArts"] {
          "slug": slug.current,
          title,
          description,
          "mainImageUrl": mainImage.asset->url,
          "detailImageUrls": detailImages[].asset->url
        }
      `);

      for (const art of simonArts) {
        if (!art.slug) continue;

        const artImages = [];

        if (art.mainImageUrl) {
          artImages.push({
            loc: art.mainImageUrl,
            title: art.title || 'Pencil Art by Simon Designs',
            caption: art.description || art.title || 'Original pencil artwork by Simon Macharia',
          });
        }

        for (const url of (art.detailImageUrls || [])) {
          if (url) {
            artImages.push({
              loc: url,
              title: art.title || 'Pencil Art Detail',
              caption: `Detail view — ${art.title || 'Pencil artwork by Simon Designs'}`,
            });
          }
        }

        results.push({
          loc: `/simon-arts/${art.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.7,
          images: artImages,
        });
      }

      // ─────────────────────────────────────────────
      // 3. BANNER & CTA IMAGES (all pages)
      // Fetches every banner image from every page location
      // ─────────────────────────────────────────────
      const banners = await client.fetch(`
        *[_type == "banner"] {
          pageLocation,
          "images": images[] {
            "url": image.asset->url,
            alt,
            heading
          }
        }
      `);

      // Map banner locations to your actual page URLs
      const locationToPage = {
        'home-hero':          '/',
        'home-cta':           '/',
        'about-hero':         '/about',
        'about-cta':          '/about',
        'about-me-hero':      '/about-me',
        'about-me-cta':       '/about-me',
        'portfolio-hero':     '/portfolio',
        'portfolio-cta':      '/portfolio',
        'services-hero':      '/services',
        'services-cta':       '/services',
        'pricing-hero':       '/pricing',
        'pricing-cta':        '/pricing',
        'simon-arts-hero':    '/simon-arts',
        'simon-arts-cta':     '/simon-arts',
        'contact-hero':       '/contact',
        'contact-cta':        '/contact',
        'leadership-review':  '/the-leadership-review',
      };

      // Group banner images by page URL
      const pageImageMap = {};

      for (const banner of banners) {
        const page = locationToPage[banner.pageLocation];
        if (!page) continue;

        if (!pageImageMap[page]) {
          pageImageMap[page] = [];
        }

        for (const img of (banner.images || [])) {
          if (img && img.url) {
            pageImageMap[page].push({
              loc: img.url,
              title: img.heading || `Simon Designs — ${page}`,
              caption: img.alt || 'Simon Designs graphic design studio',
            });
          }
        }
      }

      // Add each page with its banner images
      for (const [page, images] of Object.entries(pageImageMap)) {
        results.push({
          loc: page,
          lastmod: new Date().toISOString(),
          changefreq: page === '/' ? 'weekly' : 'monthly',
          priority: page === '/' ? 1.0 : 0.8,
          images,
        });
      }

    } catch (error) {
      console.error('❌ Error building image sitemap:', error);
      // Don't crash the build — just skip images if Sanity is unreachable
    }

    return results;
  },
};