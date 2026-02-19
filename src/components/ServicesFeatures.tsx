'use client';

import { useEffect, useState } from 'react';
import { Clock, Zap, ThumbsUp, Headphones } from 'lucide-react';
import { client } from '@/lib/sanity.client';

interface Feature {
  title: string;
  iconName: string;
  description: string;
}

interface ServicesFeaturesData {
  title: string;
  description: string;
  features: Feature[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  clock: Clock,
  zap: Zap,
  thumbsup: ThumbsUp,
  headphones: Headphones,
};

export default function ServicesFeatures() {
  const [data, setData] = useState<ServicesFeaturesData | null>(null);
  const [loading, setLoading] = useState(true);

  const GREEN = '#048F02';
  const ORANGE = '#EF6203';

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "servicesFeatures"][0] {
          title,
          description,
          features[] {
            title,
            iconName,
            description
          }
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching services features data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="py-6 lg:py-8 bg-white min-h-96"></div>;
  }

  if (!data) {
    return <div className="py-6 lg:py-8 bg-white text-center text-gray-600">No data found</div>;
  }

  // Color pattern alternating between green and orange
  const getFeatureColor = (index: number) => {
    return index % 2 === 0 ? GREEN : ORANGE;
  };

  return (
    <>
      <style jsx>{`
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
            font-weight: 700 !important;
          }

          .card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title {
            font-size: 0.9rem !important;
          }
        }

        /* Curved frame animation */
        @keyframes frameFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .feature-card:hover .curved-frame {
          animation: frameFloat 2s ease-in-out infinite;
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>
              {data.title}
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {data.description}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {data.features.map((feature, index) => {
              const Icon = iconMap[feature.iconName.toLowerCase()] || Clock;
              const featureColor = getFeatureColor(index);

              return (
                <div
                  key={index}
                  className="feature-card group relative"
                >
                  {/* Curved Color Frame - Top Left Corner */}
                  <div 
                    className="curved-frame absolute left-0 top-0 w-28 h-28 sm:w-32 sm:h-32 z-10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
                    style={{
                      backgroundColor: featureColor,
                      borderRadius: '0 0 85% 0',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    {/* Icon Container - REDUCED SIZE */}
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <Icon 
                        className="w-6 h-6 sm:w-7 sm:h-7 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12" 
                        style={{ color: featureColor }}
                        strokeWidth={2.5}
                      />
                    </div>
                    
                    {/* Subtle shine effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                        borderRadius: '0 0 85% 0',
                      }}
                    />
                  </div>

                  {/* Main Card Body */}
                  <div 
                    className="relative rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group-hover:border-gray-300 pt-32 sm:pt-36 pb-6 px-5 sm:px-6 group-hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${featureColor}03 0%, ${featureColor}08 100%)`
                    }}
                  >
                    {/* Diagonal accent line */}
                    <div 
                      className="absolute top-20 sm:top-24 left-0 right-0 h-0.5 opacity-15"
                      style={{ 
                        background: `linear-gradient(to right, ${featureColor}, transparent)`,
                        transform: 'skewY(-2deg)'
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 
                        className="card-title mb-3 transition-all duration-300"
                        style={{ color: featureColor }}
                      >
                        {feature.title}
                      </h3>
                      <p className="card-desc text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Decorative dot pattern */}
                    <div 
                      className="absolute bottom-4 right-4 w-3 h-3 rounded-full opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                      style={{ backgroundColor: featureColor }}
                    />
                    <div 
                      className="absolute bottom-4 right-9 w-2 h-2 rounded-full opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                      style={{ backgroundColor: featureColor }}
                    />
                    <div 
                      className="absolute bottom-8 right-4 w-2 h-2 rounded-full opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                      style={{ backgroundColor: featureColor }}
                    />

                    {/* Bottom curved accent */}
                    <div 
                      className="absolute bottom-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        backgroundColor: featureColor,
                        borderRadius: '80% 0 0 0',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Divider */}
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