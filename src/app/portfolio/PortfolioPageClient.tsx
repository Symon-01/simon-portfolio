'use client';

import { useEffect, Suspense } from 'react';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import UniversalHero from "@/components/UniversalHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import PortfolioCTA from "@/components/PortfolioCTA";
import SupportButton from "@/components/SupportButton";
import LeadershipReviewWindow from "@/components/LeadershipReviewWindow";

interface PortfolioPageClientProps {
  initialProjects?: any[];
}

function PortfolioContent({ initialProjects }: PortfolioPageClientProps) {
  const { openModal } = useQuoteModal();

  useEffect(() => {
    const checkAndOpenModal = () => {
      if (window.location.hash === '#quote') {
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

      <PortfolioGrid initialProjects={initialProjects} />

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-12 pb-8">
          <div className="pt-2 flex justify-center">
            <SupportButton position="bottom" />
          </div>
          <div
            className="mt-8 h-0.5"
            style={{
              background: "linear-gradient(to right, transparent, #EF6203, transparent)"
            }}
          />
        </div>
      </div>

      <LeadershipReviewWindow />
      <PortfolioCTA />
    </main>
  );
}

export default function PortfolioPageClient({ initialProjects }: PortfolioPageClientProps) {
  return (
    <Suspense fallback={
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </main>
    }>
      <PortfolioContent initialProjects={initialProjects} />
    </Suspense>
  );
}