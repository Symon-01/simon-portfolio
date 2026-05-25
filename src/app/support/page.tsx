// FILE LOCATION: src/app/support/page.tsx

import type { Metadata } from 'next';
import SupportPageClient from './SupportPageClient';

export const metadata: Metadata = {
  title: 'Support Our Work | Simon Designs',
  description: 'Help Simon Designs continue creating professional graphic design, pencil art, and editorial publications that celebrate Kenyan creativity and leadership.',
  openGraph: {
    title: 'Support Our Work | Simon Designs',
    description: 'Every contribution helps us create more. Support Simon Designs today.',
    url: 'https://simondesigns.co.ke/support',
    siteName: 'Simon Designs',
    images: [{ url: 'https://simondesigns.co.ke/preview.png', width: 1200, height: 630 }],
  },
};

export default function SupportPage() {
  return <SupportPageClient />;
}