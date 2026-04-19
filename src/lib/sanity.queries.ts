// FILE: src/lib/sanity.queries.ts
//
// Change from previous version:
//   - leadershipReviewBySlugQuery now filters reviews to only include
//     status == 'approved' AND isHidden != true, so offensive/pending reviews
//     never reach the frontend.

import { client } from './sanity.client';
import { Banner } from '@/types/banner';
import type {
  LeadershipReviewIssue,
  LeadershipReviewIssueSummary,
} from '@/types/leadershipReview';

// ============================================
// SERVICE QUERIES
// ============================================

export const homepageServicesQuery = `
  *[_type == "service" && displayOnHomepage == true] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    iconEmoji,
    description,
    offerings,
    cardColor,
    order
  }
`

export const allServicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    iconEmoji,
    description,
    offerings,
    fullDescription,
    cardColor,
    order
  }
`

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    icon,
    iconEmoji,
    description,
    offerings,
    fullDescription,
    cardColor
  }
`

// ============================================
// BANNER QUERIES
// ============================================

export async function getBannerByLocation(location: string): Promise<Banner | null> {
  try {
    const query = `*[_type == "banner" && pageLocation == $location][0]{
      _id,
      title,
      pageLocation,
      isSlider,
      images[]{
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        order,
        heading,
        subheading,
        showButtons,
        button1Text,
        button1Link,
        button1Color,
        button2Text,
        button2Link,
        button2Color
      },
      notes
    }`;
    
    const banner = await client.fetch(query, { location });
    
    if (banner?.images) {
      banner.images.sort((a: any, b: any) => a.order - b.order);
    }
    
    return banner;
  } catch (error) {
    console.error(`Error fetching banner for location "${location}":`, error);
    return null;
  }
}

export async function getAllBanners(): Promise<Banner[]> {
  try {
    const query = `*[_type == "banner"] | order(pageLocation asc){
      _id,
      title,
      pageLocation,
      isSlider,
      images[]{
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        order,
        heading,
        subheading,
        showButtons,
        button1Text,
        button1Link,
        button1Color,
        button2Text,
        button2Link,
        button2Color
      },
      notes
    }`;
    
    const banners = await client.fetch(query);
    
    banners.forEach((banner: Banner) => {
      if (banner.images) {
        banner.images.sort((a: any, b: any) => a.order - b.order);
      }
    });
    
    return banners;
  } catch (error) {
    console.error('Error fetching all banners:', error);
    return [];
  }
}

export async function bannerExists(location: string): Promise<boolean> {
  try {
    const query = `count(*[_type == "banner" && pageLocation == $location])`;
    const count = await client.fetch(query, { location });
    return count > 0;
  } catch (error) {
    console.error(`Error checking banner existence for "${location}":`, error);
    return false;
  }
}

export const bannerByLocationQuery = `
  *[_type == "banner" && pageLocation == $location][0]{
    _id,
    title,
    pageLocation,
    isSlider,
    images[]{
      image{
        asset->{
          _id,
          url
        }
      },
      alt,
      order,
      heading,
      subheading,
      showButtons,
      button1Text,
      button1Link,
      button1Color,
      button2Text,
      button2Link,
      button2Color
    },
    notes
  }
`;

export const allBannersQuery = `
  *[_type == "banner"] | order(pageLocation asc){
    _id,
    title,
    pageLocation,
    isSlider,
    images[]{
      image{
        asset->{
          _id,
          url
        }
      },
      alt,
      order,
      heading,
      subheading,
      showButtons,
      button1Text,
      button1Link,
      button1Color,
      button2Text,
      button2Link,
      button2Color
    },
    notes
  }
`;

// ============================================
// ABOUT ME QUERIES
// ============================================

export const aboutMeQuery = `*[_type == "aboutMe"][0]{
  _id,
  heroTitle,
  heroDescription,
  profileImage,
  skills[] {
    skillName,
    skillIcon
  }
}`;

export const myStorySectionsQuery = `*[_type == "myStorySection"] | order(order asc) {
  _id,
  title,
  order,
  paragraphs[]{
    _key,
    text
  },
  images[]{
    "asset": image.asset,
    description
  }
}`;

export const aboutMePageQuery = `{
  "aboutMe": *[_type == "aboutMe"][0]{
    _id,
    heroTitle,
    heroDescription,
    profileImage,
    skills[] {
      skillName,
      skillIcon
    }
  },
  "storySections": *[_type == "myStorySection"] | order(order asc) {
    _id,
    title,
    order,
    paragraphs[]{
      _key,
      text
    },
    images[]{
      "asset": image.asset,
      description
    }
  }
}`;

// ============================================
// SKILLS & EXPERTISE QUERY
// ============================================

export const skillsExpertiseQuery = `*[_type == "skillsExpertise"][0]{
  _id,
  sectionDescription,
  skillCategories[] {
    _key,
    title,
    description,
    categoryImage {
      asset -> {
        _id,
        url
      }
    },
    items[]
  },
  designTools[] {
    _key,
    toolName
  }
}`;

// ============================================
// CREATIVE PHILOSOPHY QUERY
// ============================================

export const creativePhilosophyQuery = `*[_type == "creativePhilosophy"][0]{
  _id,
  mainQuote,
  pillars[] {
    _key,
    title,
    description,
    emoji
  }
}`;

// ============================================
// PERSONAL NOTE QUERY
// ============================================

export const personalNoteQuery = `*[_type == "personalNote"][0]{
  _id,
  paragraphs[] {
    _key,
    text
  }
}`;

// ============================================
// LEADERSHIP REVIEW QUERIES
// ============================================

// All issues — lightweight, for the grid listing page
export const allLeadershipReviewIssuesQuery = `
  *[_type == "leadershipReview"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    issueNumber,
    volume,
    edition,
    publishedDate,
    coverImage {
      asset -> { _id, url }
    },
    featuredLeader,
    leaderTitle,
    county,
    summary,
    tags,
    isFeatured
  }
`;

// Single issue by slug — full data including PDF.
// *** IMPORTANT: reviews are filtered so ONLY approved, non-hidden ones come through. ***
// Pending, rejected, and hidden reviews stay in Sanity but never reach the website.
export const leadershipReviewBySlugQuery = `
  *[_type == "leadershipReview" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    issueNumber,
    volume,
    edition,
    publishedDate,
    coverImage {
      asset -> { _id, url }
    },
    pdfFile {
      asset -> { _id, url }
    },
    featuredLeader,
    leaderTitle,
    county,
    constituency,
    summary,
    tags,
    isFeatured,
    "reviews": reviews[status == "approved" && isHidden != true] {
      reviewerName,
      location,
      rating,
      comment,
      date
    }
  }
`;

// Featured issue only — used by the portfolio window
export const featuredLeadershipReviewQuery = `
  *[_type == "leadershipReview" && isFeatured == true][0] {
    _id,
    title,
    slug,
    issueNumber,
    volume,
    edition,
    publishedDate,
    coverImage {
      asset -> { _id, url }
    },
    pdfFile {
      asset -> { _id, url }
    },
    featuredLeader,
    leaderTitle,
    county,
    summary,
    tags
  }
`;

// ── Async fetch functions ──────────────────────────────────────

export async function getAllLeadershipReviewIssues(): Promise<LeadershipReviewIssueSummary[]> {
  try {
    return await client.fetch(allLeadershipReviewIssuesQuery);
  } catch (error) {
    console.error('Error fetching Leadership Review issues:', error);
    return [];
  }
}

export async function getLeadershipReviewBySlug(
  slug: string
): Promise<LeadershipReviewIssue | null> {
  try {
    return await client.fetch(leadershipReviewBySlugQuery, { slug });
  } catch (error) {
    console.error(`Error fetching Leadership Review issue "${slug}":`, error);
    return null;
  }
}

export async function getFeaturedLeadershipReview(): Promise<LeadershipReviewIssueSummary | null> {
  try {
    return await client.fetch(featuredLeadershipReviewQuery);
  } catch (error) {
    console.error('Error fetching featured Leadership Review issue:', error);
    return null;
  }
}