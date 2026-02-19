// FILE LOCATION: src/types/simonArts.ts

export interface Artwork {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  subject?: string;
  mainImage: any;
  detailImages?: any[];
  medium: string[];
  paperType: string;
  dimensions: {
    width: number;
    height: number;
  };
  timeToComplete: string;
  year: number;
  story: string;
  category: string;
  tags?: string[];
  availableForSale: boolean;
  price?: number;
  featured: boolean;
  createdAt: string;
}

export const categoryLabels: { [key: string]: string } = {
  portrait: 'Portrait',
  landscape: 'Landscape',
  'still-life': 'Still Life',
  abstract: 'Abstract',
  animal: 'Animal',
  other: 'Other'
};

export const mediumLabels: { [key: string]: string } = {
  graphite: 'Graphite Pencil',
  charcoal: 'Charcoal',
  'colored-pencil': 'Colored Pencil',
  carbon: 'Carbon Pencil',
  conte: 'Conte Crayon'
};

export const paperLabels: { [key: string]: string } = {
  'bristol-board': 'Bristol Board',
  'sketch-paper': 'Sketch Paper',
  'mixed-media': 'Mixed Media Paper',
  watercolor: 'Watercolor Paper',
  other: 'Other'
};