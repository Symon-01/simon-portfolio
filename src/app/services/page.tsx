// src/app/services/page.tsx
'use client';

import { useEffect } from 'react';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import UniversalHero from "@/components/UniversalHero";
import ServicesOverview from "@/components/ServicesOverview";
import ServicesProcess from "@/components/ServicesProcess";
import ServicesFeatures from "@/components/ServicesFeatures";
import ServicesCTA from "@/components/ServicesCTA";

export default function ServicesPage() {
  // Get the quote modal function
  const { openModal } = useQuoteModal();

  // ✨ AUTO-OPEN QUOTE MODAL - When URL has #quote
  useEffect(() => {
    // Function to check and open modal
    const checkAndOpenModal = () => {
      if (window.location.hash === '#quote') {
        console.log('🎯 Opening quote modal from hash');
        openModal();
        // Clean up URL - remove #quote
        window.history.replaceState(null, '', '/services');
      }
    };

    // Check immediately
    checkAndOpenModal();

    // Also check after a short delay (in case of slow load)
    const timer = setTimeout(checkAndOpenModal, 100);

    // Listen for hash changes
    window.addEventListener('hashchange', checkAndOpenModal);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', checkAndOpenModal);
    };
  }, [openModal]);

  return (
    <main>
      <UniversalHero location="services-hero" scrollingBannerItems={[
        '💼 Professional Design Services',
        '🎨 Custom Solutions',
        '✨ Elevate Your Business',
        '🚀 Get Started Today'
      ]} />
      <ServicesOverview />
      <ServicesProcess />
      <ServicesFeatures />
      <ServicesCTA />
    </main>
  );
}