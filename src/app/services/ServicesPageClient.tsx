// src/app/services/ServicesPageClient.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import UniversalHero from "@/components/UniversalHero";
import ServicesOverview from "@/components/ServicesOverview";
import ServicesProcess from "@/components/ServicesProcess";
import ServicesFeatures from "@/components/ServicesFeatures";
import ServicesCTA from "@/components/ServicesCTA";

function ServicesContent() {
  const { openModal } = useQuoteModal();

  useEffect(() => {
    const checkAndOpenModal = () => {
      if (window.location.hash === '#quote') {
        console.log('🎯 Opening quote modal from hash');
        openModal();
        window.history.replaceState(null, '', '/services');
      }
    };

    checkAndOpenModal();
    const timer = setTimeout(checkAndOpenModal, 100);
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

export default function ServicesPageClient() {
  return (
    <Suspense fallback={
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </main>
    }>
      <ServicesContent />
    </Suspense>
  );
}