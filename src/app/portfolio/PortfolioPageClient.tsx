// FILE LOCATION: src/app/portfolio/PortfolioPageClient.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import UniversalHero from "@/components/UniversalHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import PortfolioCTA from "@/components/PortfolioCTA";
import SupportButton from "@/components/SupportButton";

function PortfolioContent() {
  const { openModal } = useQuoteModal();

  useEffect(() => {
    const checkAndOpenModal = () => {
      if (window.location.hash === '#quote') {
        console.log('🎯 Opening quote modal from hash');
        openModal();
        window.history.replaceState(null, '', '/portfolio');
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
      <UniversalHero
        location="portfolio-hero"
        scrollingBannerItems={[
          '🎨 Browse Our Creative Work',
          '✨ Award-Winning Designs',
          '💼 Trusted by Leading Brands',
          '🚀 See What We Can Do'
        ]}
      />
     
      <section className="bg-gray-50 py-8 lg:py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <PortfolioGrid />
          <div className="mt-2 flex justify-center">
            <SupportButton position="bottom" />
          </div>
          <div className="mt-8 h-0.5"
               style={{
                 background: "linear-gradient(to right, transparent, #EF6203, transparent)"
               }}>
          </div>
        </div>
      </section>
      <PortfolioCTA />
    </main>
  );
}

export default function PortfolioPageClient() {
  return (
    <Suspense fallback={
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </main>
    }>
      <PortfolioContent />
    </Suspense>
  );
}