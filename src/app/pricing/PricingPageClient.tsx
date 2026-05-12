// FILE LOCATION: src/app/pricing/PricingPageClient.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
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
  categoryImage?: {
    asset: { _ref?: string; url?: string };
    alt?: string;
  };
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
  originalPriceLabel?: string;
  discountLabel?: string;
  // New field added to Sanity schema
  pricingType?: 'fixed' | 'variable';
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

function PricingContent() {
  const [categories, setCategories] = useState<CategoryWithServices[]>([]);
  const [settings, setSettings] = useState<PricingSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const { openModal } = useQuoteModal();

  useEffect(() => {
    const checkAndOpenModal = () => {
      if (window.location.hash === '#quote') {
        openModal();
        window.history.replaceState(null, '', '/pricing');
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

  useEffect(() => {
    async function fetchPricingData() {
      try {
        const categoriesQuery = `*[_type == "pricingCategory"] | order(order asc) {
          _id,
          name,
          icon,
          description,
          order,
          categoryImage {
            asset-> {
              _ref,
              url
            },
            alt
          }
        }`;

        // pricingType is the new field — falls back gracefully if not yet in Sanity
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
          originalPriceLabel,
          discountLabel,
          pricingType,
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

        const categoriesWithServices: CategoryWithServices[] = categoriesData.map(
          (cat: PricingCategory) => ({
            ...cat,
            services: servicesData.filter(
              (service: PricingService) => service.category?._id === cat._id
            ),
          })
        );

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
            '✅ Quality Guaranteed',
          ]}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
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
          '✅ Quality Guaranteed',
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

export default function PricingPageClient() {
  return (
    <Suspense
      fallback={
        <main>
          <div className="min-h-screen flex items-center justify-center">
            <p>Loading...</p>
          </div>
        </main>
      }
    >
      <PricingContent />
    </Suspense>
  );
}