// src/types/banner.ts

export interface BannerImage {
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  alt: string;
  order: number;
  heading?: string;
  subheading?: string;
  
  // Button Layout
  buttonLayout?: 'two-buttons' | 'single-badge' | 'no-buttons';
  
  // Two Buttons Fields
  showButtons?: boolean;
  button1Text?: string;
  button1Link?: string;
  button1Color?: 'green' | 'orange' | 'blue' | 'red';
  button2Text?: string;
  button2Link?: string;
  button2Color?: 'green' | 'orange' | 'blue' | 'red';
  
  // Single Badge Fields
  badgeText?: string;
  badgeIcon?: string;
  badgeLink?: string;
  badgeStyle?: 'dark' | 'light' | 'green' | 'orange' | 'blue';
}

export interface Banner {
  _id: string;
  title: string;
  pageLocation: string;
  isSlider: boolean;
  images: BannerImage[];
  notes?: string;
}