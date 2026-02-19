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
  order: number;
}

interface PricingCategory {
  _id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
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

export default function PricingGuide({ categories, settings }: PricingGuideProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName.toLowerCase()] || Palette;
    return Icon;
  };

  return (
    <>
      <style jsx>{`
        .pricing-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          border-top: 4px solid #048F02;
          height: 100%;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .category-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #048F02, #059c03);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .price-item {
          display: flex;
          justify-content: space-between;
          padding: 0.65rem 0;
          border-bottom: 1px solid #eee;
          gap: 0.5rem;
        }

        .price-item:last-child {
          border-bottom: none;
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

        .service-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #333;
        }

        .price {
          font-size: 0.875rem;
          font-weight: 700;
          color: #EF6203;
        }

        @media (max-width: 1023px) {
          .pricing-card {
            padding: 1.25rem;
          }

          .category-icon {
            width: 44px;
            height: 44px;
            font-size: 1.25rem;
          }

          .card-title {
            font-size: 0.85rem;
          }

          .card-desc {
            font-size: 0.8rem;
          }

          .service-name {
            font-size: 0.8rem;
          }

          .price {
            font-size: 0.8rem;
          }
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

              return (
                <div key={category._id} className="pricing-card">
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category._id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="category-icon">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="card-title">{category.name}</h3>
                      </div>
                    </div>
                    <p className="card-desc mb-4">{category.description}</p>

                    <button className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-2 transition-colors">
                      {isExpanded ? (
                        <>
                          <Minus className="w-4 h-4" />
                          Hide Services
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Show Services
                        </>
                      )}
                    </button>
                  </div>

                  {isExpanded && category.services && category.services.length > 0 && (
                    <div className="border-t border-gray-200 px-0 py-4 mt-4 bg-gray-50 -mx-1.5 -mb-1.5 px-1.5 py-4 rounded-b">
                      <div className="space-y-4">
                        {category.services.map((service, idx) => (
                          <div key={idx} className="pb-4 last:pb-0 border-b last:border-b-0 border-gray-200">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="service-name font-semibold">{service.name}</h4>
                              <span className="price">{service.priceLabel}</span>
                            </div>
                            {service.description && (
                              <p className="text-gray-600 text-xs">{service.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
            style={{
              background: 'linear-gradient(to right, transparent, #EF6203, transparent)',
            }}
          />
        </div>
      </section>
    </>
  );
}