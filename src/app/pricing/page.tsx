'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity.client';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import UniversalHero from "@/components/UniversalHero";
import PricingGuide from '@/components/PricingGuide';
import GetQuotePricing from '@/components/GetQuotePricing';
import PricingCTA from '@/components/PricingCTA';

interface PricingCategory {
  _id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
}

interface PricingService {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  description?: string;
  price: number;
  priceLabel: string;
  order: number;
}

interface PricingSettings {
  pageTitle: string;
  pageSubtitle: string;
  noteTitle: string;
  noteContent: string;
  requestQuoteButtonText: string;
  currencySymbol: string;
}

interface CategoryWithServices extends PricingCategory {
  services: PricingService[];
}

export default function PricingPage() {
  const [categories, setCategories] = useState<CategoryWithServices[]>([]);
  const [settings, setSettings] = useState<PricingSettings | null>(null);
  const [loading, setLoading] = useState(true);
  
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
        window.history.replaceState(null, '', '/pricing');
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

  useEffect(() => {
    async function fetchPricingData() {
      try {
        const categoriesQuery = `*[_type == "pricingCategory"] | order(order asc) {
          _id,
          name,
          icon,
          description,
          order
        }`;

        const servicesQuery = `*[_type == "pricingService"] | order(order asc) {
          _id,
          name,
          category-> {
            _id,
            name
          },
          description,
          price,
          priceLabel,
          order
        }`;

        const settingsQuery = `*[_type == "pricingSettings"][0] {
          pageTitle,
          pageSubtitle,
          noteTitle,
          noteContent,
          requestQuoteButtonText,
          currencySymbol
        }`;

        const [categoriesData, servicesData, settingsData] = await Promise.all([
          client.fetch(categoriesQuery),
          client.fetch(servicesQuery),
          client.fetch(settingsQuery),
        ]);

        const categoriesWithServices = categoriesData.map((cat: PricingCategory) => ({
          ...cat,
          services: servicesData.filter(
            (service: PricingService) => service.category?._id === cat._id
          ),
        }));

        setCategories(categoriesWithServices);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPricingData();
  }, []);

  if (loading) {
    return (
      <main>
        <UniversalHero 
          location="pricing-hero" 
          scrollingBannerItems={[
            '💰 Transparent Pricing',
            '✨ No Hidden Fees',
            '📦 Flexible Packages',
            '✅ Quality Guaranteed'
          ]} 
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pricing information...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <UniversalHero 
        location="pricing-hero" 
        scrollingBannerItems={[
          '💰 Transparent Pricing',
          '✨ No Hidden Fees',
          '📦 Flexible Packages',
          '✅ Quality Guaranteed'
        ]} 
      />
      <PricingGuide categories={categories} settings={settings} />
      <GetQuotePricing
        noteTitle={settings?.noteTitle}
        noteContent={settings?.noteContent}
        buttonText={settings?.requestQuoteButtonText}
      />
      <PricingCTA />
    </main>
  );
}