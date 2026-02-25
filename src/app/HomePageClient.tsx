// src/app/HomePageClient.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import About from "@/components/About";
import SimonArts from "@/components/SimonArts";
import { client } from '@/lib/sanity.client';
import { Service } from '@/lib/sanity.types';

const homepageServicesQuery = `
  *[_type == "service" && displayOnHomepage == true] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    iconEmoji,
    description,
    offerings,
    cardColor,
    order
  }
`;

async function getBannerByLocation(location: string) {
  try {
    const query = `*[_type == "banner" && pageLocation == $location][0]{
      _id,
      title,
      pageLocation,
      isSlider,
      images[]{
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        order,
        heading,
        subheading,
        showButtons,
        button1Text,
        button1Link,
        button1Color,
        button2Text,
        button2Link,
        button2Color
      },
      notes
    }`;
   
    const banner = await client.fetch(query, { location });
   
    if (banner?.images) {
      banner.images.sort((a: any, b: any) => a.order - b.order);
    }
   
    return banner;
  } catch (error) {
    console.error(`Error fetching banner for location "${location}":`, error);
    return null;
  }
}

function HomeContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [heroBanner, setHeroBanner] = useState(null);
  const [ctaBanner, setCtaBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const { openModal } = useQuoteModal();

  useEffect(() => {
    if (loading) return;

    const checkAndOpenModal = () => {
      const hash = window.location.hash;
      console.log('Checking hash:', hash);
      
      if (hash === '#quote') {
        console.log('🎯 Opening quote modal from hash on home page');
        openModal();
        setTimeout(() => {
          window.history.replaceState(null, '', '/');
        }, 100);
      }
    };

    checkAndOpenModal();
    const timer1 = setTimeout(checkAndOpenModal, 100);
    const timer2 = setTimeout(checkAndOpenModal, 300);
    
    const handleHashChange = () => {
      console.log('Hash changed!');
      checkAndOpenModal();
    };
    
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [openModal, loading]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesData, heroData, ctaData] = await Promise.all([
          client.fetch<Service[]>(homepageServicesQuery),
          getBannerByLocation('home-hero'),
          getBannerByLocation('home-cta')
        ]);

        setServices(servicesData);
        setHeroBanner(heroData);
        setCtaBanner(ctaData);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50">
      <Hero banner={heroBanner} />
      <Stats />
      <Services services={services} />
      <Portfolio />
      <CTA banner={ctaBanner} />
      <About />
      <SimonArts />
    </main>
  );
}

export default function HomePageClient() {
  return (
    <Suspense fallback={
      <main className="bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    }>
      <HomeContent />
    </Suspense>
  );
}