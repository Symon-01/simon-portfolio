"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import { Plus, Minus } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  offerings?: string[];
  iconEmoji?: string;
  icon?: any;
  cardColor: 'orange' | 'green' | 'blue' | 'purple' | 'red';
  order: number;
}

// Color mapping
const colorMap = {
  orange: {
    border: '#EF6203',
    title: '#EF6203',
    iconBg: 'rgba(239, 98, 3, 0.15)',
    iconText: '#EF6203',
    glow: 'rgba(239, 98, 3, 0.6)'
  },
  green: {
    border: '#048F02',
    title: '#048F02',
    iconBg: 'rgba(4, 143, 2, 0.15)',
    iconText: '#048F02',
    glow: 'rgba(4, 143, 2, 0.6)'
  },
  blue: {
    border: '#3B82F6',
    title: '#3B82F6',
    iconBg: 'rgba(59, 130, 246, 0.15)',
    iconText: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.6)'
  },
  purple: {
    border: '#9333EA',
    title: '#9333EA',
    iconBg: 'rgba(147, 51, 234, 0.15)',
    iconText: '#9333EA',
    glow: 'rgba(147, 51, 234, 0.6)'
  },
  red: {
    border: '#EF4444',
    title: '#EF4444',
    iconBg: 'rgba(239, 68, 68, 0.15)',
    iconText: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.6)'
  }
};

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedService, setHighlightedService] = useState<string | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "service"] | order(order asc) {
          _id,
          title,
          slug,
          description,
          offerings,
          iconEmoji,
          icon,
          cardColor,
          order
        }`
      )
      .then((data) => {
        setServices(data);
        setLoading(false);
        
        // Check if there's a service parameter in the URL
        const serviceSlug = searchParams.get('service');
        if (serviceSlug) {
          const targetService = data.find((s: Service) => s.slug.current === serviceSlug);
          if (targetService) {
            setHighlightedService(targetService._id);
            
            // Scroll to the service card after a brief delay
            setTimeout(() => {
              const element = document.getElementById(`service-${targetService._id}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 300);
            
            // Remove highlight after blinking animation completes
            setTimeout(() => {
              setHighlightedService(null);
            }, 2000);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchParams]);

  const toggleService = (id: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedServices(newExpanded);
  };

  return (
    <>
      <style jsx>{`
        /* ========== SIMON DESIGNS - TYPOGRAPHY SYSTEM ========== */
        
        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }

        .section-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }

        .card-title {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
        }

        .card-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }

        .offering-item {
          font-size: 0.875rem !important;
        }

        .toggle-btn {
          font-size: 0.875rem !important;
          font-weight: 600;
        }

        /* Blinking animation - 3 blinks */
        @keyframes blink-highlight {
          0%, 100% {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: scale(1);
          }
          16%, 50%, 83% {
            box-shadow: 0 0 30px 5px var(--glow-color);
            transform: scale(1.03);
          }
          33%, 66% {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: scale(1);
          }
        }

        .highlight-blink {
          animation: blink-highlight 1.5s ease-in-out;
        }

        /* ========== MOBILE RESPONSIVE ========== */
        @media (max-width: 1023px) {
          .section-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }

          .section-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }

          .card-title {
            font-size: 0.85rem !important;
          }

          .card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }

          .offering-item {
            font-size: 0.8rem !important;
          }

          .toggle-btn {
            font-size: 0.8rem !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      {/* Services Section - Following Design System */}
      <section className="py-6 lg:py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header - Following Design System */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: "#048F02" }}>
              What We Offer
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Comprehensive design solutions to elevate your brand
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-500">No services available yet.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
              {services.map((service) => {
                const colors = colorMap[service.cardColor] || colorMap.orange;
                const imageUrl = service.icon 
                  ? urlFor(service.icon).width(500).height(500).url() 
                  : '/placeholder-service.jpg';
                const isHighlighted = highlightedService === service._id;
                const isExpanded = expandedServices.has(service._id);
                
                return (
                  <div
                    id={`service-${service._id}`}
                    key={service._id}
                    className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-b-4 flex flex-col ${
                      isHighlighted ? 'highlight-blink' : ''
                    }`}
                    style={{ 
                      borderBottomColor: colors.border,
                      '--glow-color': colors.glow
                    } as any}
                  >
                    {/* Square Image at Top */}
                    <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                      <Image 
                        src={imageUrl}
                        alt={service.title} 
                        fill 
                        className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        sizes="(max-width: 1023px) 50vw, 33vw"
                      />
                      
                      {/* Hover overlay with emoji */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{ 
                          backgroundImage: `linear-gradient(to bottom right, ${colors.glow}, ${colors.border}99)` 
                        }}
                      >
                        <span className="text-5xl sm:text-6xl filter drop-shadow-lg">
                          {service.iconEmoji || '🎨'}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 lg:p-6 flex-grow flex flex-col">
                      {/* Title */}
                      <h3 className="card-title mb-3 text-center" style={{ color: colors.title }}>
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="card-desc text-gray-600 text-center leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Toggle Button for Offerings - Only show if offerings exist */}
                      {service.offerings && service.offerings.length > 0 && (
                        <button
                          onClick={() => toggleService(service._id)}
                          className="toggle-btn flex items-center gap-2 justify-center transition-colors mt-auto"
                          style={{ color: colors.iconText }}
                        >
                          {isExpanded ? (
                            <>
                              <Minus className="w-4 h-4" />
                              Hide What's Included
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              Show What's Included
                            </>
                          )}
                        </button>
                      )}

                      {/* Offerings List - Collapsible */}
                      {isExpanded && service.offerings && service.offerings.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <ul className="space-y-2">
                            {service.offerings.map((offering, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-2 mt-0.5 flex-shrink-0" style={{ color: colors.iconText }}>
                                  ✓
                                </span>
                                <span className="offering-item text-gray-600">
                                  {offering}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}