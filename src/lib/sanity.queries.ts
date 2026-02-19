import { client } from './sanity.client';
import { Banner } from '@/types/banner';

// ============================================
// SERVICE QUERIES
// ============================================

// Get services for homepage (only featured ones)
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

// Get all services for services page
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

// Get single service by slug
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

/**
 * Fetch banner by page location
 * @param location - The page location identifier (e.g., 'home-hero', 'about-cta')
 * @returns Banner data or null if not found
 */
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
    
    // Sort images by order (ascending)
    if (banner?.images) {
      banner.images.sort((a: any, b: any) => a.order - b.order);
    }
    
    return banner;
  } catch (error) {
    console.error(`Error fetching banner for location "${location}":`, error);
    return null;
  }
}

/**
 * Fetch all banners (useful for admin/preview)
 * @returns Array of all banners
 */
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
    
    // Sort images within each banner
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

/**
 * Check if a banner exists for a location
 * @param location - The page location identifier
 * @returns Boolean indicating if banner exists
 */
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

// Banner query strings (if you prefer to use these with client.fetch directly)
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
// ABOUT ME QUERIES (UPDATED)
// ============================================

// Query to fetch About Me hero data with skills
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

// Query to fetch all My Story sections (ordered)
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

// Combined query for the entire About Me page (UPDATED)
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
// SKILLS & EXPERTISE QUERY (UPDATED)
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