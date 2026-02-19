// FILE LOCATION: src/types/portfolio.ts

// Enhanced Testimonial with ratings
export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company?: string;
  rating: number; // 1-5 stars
  photo?: any;
  date?: string;
  verified?: boolean;
}

// Legacy testimonial for backward compatibility
export interface LegacyTestimonial {
  quote: string;
  author: string;
  position: string;
  photo?: any;
}

export interface ApproachStep {
  stepTitle: string;
  stepDescription: string;
}

export interface DownloadableFile {
  asset: {
    url: string;
  };
  fileTitle: string;
  fileDescription?: string;
}

export interface RelatedProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  images: any[];
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  client?: string;
  projectDate?: string;
  images: any[];
  tags?: string[];
  featured: boolean;
  projectUrl?: string;
  testimonials?: Testimonial[]; // New: Array of testimonials with ratings
  testimonial?: LegacyTestimonial; // Old: Keep for backward compatibility
  approach?: ApproachStep[];
  downloadableFiles?: DownloadableFile[];
  relatedProjects?: RelatedProject[];
}

export const categoryLabels: { [key: string]: string } = {
  branding: 'Branding',
  marketing: 'Marketing',
  uiux: 'UI/UX Design',
  print: 'Print & Publishing',
  packaging: 'Packaging'
};