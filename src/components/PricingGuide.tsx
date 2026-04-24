'use client';

import React, { useState } from 'react';
import {
  Palette,
  Megaphone,
  Layout,
  BookOpen,
  Package,
  Plus,
  Minus,
} from 'lucide-react';

interface PricingService {
  _id: string;
  name: string;
  description?: string;
  price: number;
  priceLabel: string;
  originalPriceLabel?: string;
  discountLabel?: string;
  order: number;
}

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
  services: PricingService[];
}

interface PricingSettings {
  pageTitle: string;
  pageSubtitle: string;
  noteTitle: string;
  noteContent: string;
  requestQuoteButtonText: string;
  currencySymbol: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  palette: Palette,
  megaphone: Megaphone,
  layout: Layout,
  bookopen: BookOpen,
  package: Package,
};

interface PricingGuideProps {
  categories: PricingCategory[];
  settings: PricingSettings | null;
}

function sanityImageUrl(asset: { _ref?: string; url?: string }): string | null {
  if (asset.url) return asset.url;
  if (!asset._ref) return null;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const withoutPrefix = asset._ref.replace(/^image-/, '');
  const withDot = withoutPrefix.replace(/-([a-z]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${withDot}`;
}

// Normalise whatever the editor typed into a clean "-30%" style label.
// Examples of what editors might type: "30%", "-30%", "30", "SAVE 30%", "30% OFF"
// If it already starts with "-" or a letter we leave it as-is.
function formatDiscountLabel(raw: string): string {
  const trimmed = raw.trim();
  // If it already starts with "-" respect it fully
  if (trimmed.startsWith('-')) return trimmed;
  // If it's purely numeric (e.g. "30") append % and prefix
  if (/^\d+$/.test(trimmed)) return `-${trimmed}%`;
  // If it's "30%" prefix the minus
  if (/^\d+%$/.test(trimmed)) return `-${trimmed}`;
  // Anything else (e.g. "SAVE 30%", "LIMITED OFFER") — leave as-is
  return trimmed;
}

export default function PricingGuide({ categories, settings }: PricingGuideProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (id: string) => {
    const next = new Set(expandedCategories);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedCategories(next);
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName?.toLowerCase()] || Palette;
  };

  return (
    <>
      <style jsx>{`
        .pricing-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          border-top: 4px solid #048F02;
          display: flex;
          flex-direction: column;
        }
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        }

        .card-image {
          width: 100%;
          height: 160px;
          overflow: hidden;
          position: relative;
          background: #f3f4f6;
          flex-shrink: 0;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          display: block;
        }
        .pricing-card:hover .card-image img {
          transform: scale(1.04);
        }

        .card-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .category-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #048F02, #059c03);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #EF6203;
        }
        .card-desc {
          font-size: 0.875rem;
          line-height: 1.5;
          color: #666;
        }

        .service-row {
          padding: 0.75rem 0;
          border-bottom: 1px solid #eee;
        }
        .service-row:last-child {
          border-bottom: none;
        }
        .service-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #333;
        }
        .price-current {
          font-size: 0.875rem;
          font-weight: 700;
          color: #EF6203;
          white-space: nowrap;
        }
        .price-original {
          font-size: 0.72rem;
          color: #bbb;
          text-decoration: line-through;
          white-space: nowrap;
          margin-top: 1px;
        }

        /* ── Discount badge ── */
        .discount-badge {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 2px 9px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, #EF6203 0%, #f7931e 100%);
          color: #fff;
          box-shadow: 0 2px 6px rgba(239,98,3,0.35);
          flex-shrink: 0;
        }

        @media (max-width: 1023px) {
          .card-body { padding: 1.25rem; }
          .category-icon { width: 44px; height: 44px; }
          .card-title { font-size: 0.85rem; }
          .card-desc { font-size: 0.8rem; }
          .service-name { font-size: 0.8rem; }
          .price-current { font-size: 0.8rem; }
          .card-image { height: 130px; }
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#048F02' }}>
              {settings?.pageTitle || 'Our Pricing Guide'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {settings?.pageSubtitle || 'Custom packages available for larger projects. All prices in KES.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((category) => {
              const Icon = getIcon(category.icon);
              const isExpanded = expandedCategories.has(category._id);
              const imgUrl = category.categoryImage?.asset
                ? sanityImageUrl(category.categoryImage.asset)
                : null;

              return (
                <div key={category._id} className="pricing-card">

                  {imgUrl && (
                    <div className="card-image">
                      <img
                        src={imgUrl}
                        alt={category.categoryImage?.alt || `${category.name} sample work`}
                      />
                    </div>
                  )}

                  <div className="card-body">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category._id)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="category-icon">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="card-title">{category.name}</h3>
                      </div>

                      <p className="card-desc mb-4">{category.description}</p>

                      <button className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-2 transition-colors">
                        {isExpanded ? (
                          <><Minus className="w-4 h-4" /> Hide Services</>
                        ) : (
                          <><Plus className="w-4 h-4" /> Show Services</>
                        )}
                      </button>
                    </div>

                    {isExpanded && category.services && category.services.length > 0 && (
                      <div className="border-t border-gray-200 mt-4 pt-2">
                        {category.services.map((service) => (
                          <div key={service._id} className="service-row">

                            <div className="flex justify-between items-start gap-2">
                              <h4 className="service-name">{service.name}</h4>
                              <div className="flex flex-col items-end shrink-0">
                                <span className="price-current">{service.priceLabel}</span>
                                {service.originalPriceLabel && (
                                  <span className="price-original">{service.originalPriceLabel}</span>
                                )}
                              </div>
                            </div>

                            {(service.discountLabel || service.description) && (
                              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                {service.discountLabel && (
                                  <span className="discount-badge">
                                    {formatDiscountLabel(service.discountLabel)}
                                  </span>
                                )}
                                {service.description &&
                                  service.description.trim().toLowerCase() !==
                                    service.name.trim().toLowerCase() && (
                                  <p className="text-gray-500 text-xs leading-snug">
                                    {service.description}
                                  </p>
                                )}
                              </div>
                            )}

                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No pricing categories found. Please create them in Sanity.
              </p>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div
            className="h-0.5"
            style={{ background: 'linear-gradient(to right, transparent, #EF6203, transparent)' }}
          />
        </div>
      </section>
    </>
  );
}