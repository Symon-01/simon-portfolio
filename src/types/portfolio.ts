// FILE LOCATION: src/types/portfolio.ts

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company?: string;
  rating: number;
  photo?: any;
  date?: string;
  verified?: boolean;
}

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
  featured: boolean;
  description?: string;
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
  // ── SANITY-DRIVEN FIELDS ─────────────────────────────
  deliverables?: string[];   // e.g. ["Print-Ready PDF", "CMYK Color Files"]
  tools?: string[];          // e.g. ["Adobe InDesign", "Photoshop"]
  // ─────────────────────────────────────────────────────
  testimonials?: Testimonial[];
  testimonial?: LegacyTestimonial;
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