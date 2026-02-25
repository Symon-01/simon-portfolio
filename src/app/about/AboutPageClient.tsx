// src/app/about/AboutPageClient.tsx
'use client';

import { useEffect } from 'react';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import UniversalHero from "@/components/UniversalHero";
import WhoWeAre from "@/components/WhoWeAre";
import MissionVision from "@/components/MissionVision";
import CoreValues from "@/components/CoreValues";
import DesignTools from "@/components/DesignTools";
import AboutCTA from "@/components/AboutCTA";

export default function AboutPageClient() {
  const { openModal } = useQuoteModal();

  useEffect(() => {
    const checkAndOpenModal = () => {
      if (window.location.hash === '#quote') {
        console.log('🎯 Opening quote modal from hash');
        openModal();
        window.history.replaceState(null, '', '/about');
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
      <UniversalHero location="about-hero" scrollingBannerItems={[
        '✨ Transform Your Brand Today',
        '🎨 Award-Winning Design Team',
        '🚀 Ready to Start Your Project?',
        '💼 Professional Brand Solutions'
      ]} />
      <WhoWeAre />
      <MissionVision />
      <CoreValues />
      <DesignTools />
      <AboutCTA />
    </main>
  );
}