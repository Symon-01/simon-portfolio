'use client';

import { useEffect, useState } from 'react';
import { Lightbulb, Users, Award, Sparkles, ChevronRight } from 'lucide-react';
import { client } from '@/lib/sanity.client';

interface Value {
  title: string;
  iconName: string;
  description: string;
}

interface CoreValuesData {
  title: string;
  values: Value[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  lightbulb: Lightbulb,
  users: Users,
  award: Award,
  sparkles: Sparkles,
};

// Color schemes for each card
const colorSchemes = [
  { 
    bg: 'from-orange-500 to-red-500', 
    icon: 'bg-orange-100', 
    text: 'text-orange-600',
    hoverBg: 'group-hover:from-orange-600 group-hover:to-red-600'
  },
  { 
    bg: 'from-green-500 to-emerald-500', 
    icon: 'bg-green-100', 
    text: 'text-green-600',
    hoverBg: 'group-hover:from-green-600 group-hover:to-emerald-600'
  },
  { 
    bg: 'from-blue-500 to-cyan-500', 
    icon: 'bg-blue-100', 
    text: 'text-blue-600',
    hoverBg: 'group-hover:from-blue-600 group-hover:to-cyan-600'
  },
  { 
    bg: 'from-purple-500 to-pink-500', 
    icon: 'bg-purple-100', 
    text: 'text-purple-600',
    hoverBg: 'group-hover:from-purple-600 group-hover:to-pink-600'
  }
];

export default function CoreValues() {
  const [data, setData] = useState<CoreValuesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "coreValues"][0] {
          title,
          values[] {
            title,
            iconName,
            description
          }
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching core values data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-8 animate-pulse"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-xl animate-pulse">
                <div className="h-24 lg:h-32 bg-gray-300"></div>
                <div className="p-4 lg:p-6 pt-4">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-2xl mx-auto -mt-8 lg:-mt-10 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-gray-600">
          <p>No core values data available</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <style jsx>{`
        /* ========== SIMON DESIGNS - TYPOGRAPHY SYSTEM ========== */
        
        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }

        .card-title {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
        }

        .card-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }

        /* ========== MOBILE RESPONSIVE ========== */
        @media (max-width: 1023px) {
          .section-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .card-title {
            font-size: 0.85rem !important;
          }
          
          .card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title {
            font-size: 0.9rem !important;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>
              {data.title}
            </h2>
          </div>

          {/* Values Grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
            {data.values.map((value, index) => {
              const Icon = iconMap[value.iconName.toLowerCase()] || Lightbulb;
              const color = colorSchemes[index % colorSchemes.length];

              return (
                <article
                  key={index}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                  aria-labelledby={`value-title-${index}`}
                >
                  {/* Gradient Top Section */}
                  <div className={`h-24 lg:h-32 bg-gradient-to-br ${color.bg} ${color.hoverBg} relative overflow-hidden transition-all duration-500`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                    
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 right-2 lg:top-4 lg:right-4 w-12 h-12 lg:w-20 lg:h-20 border-2 lg:border-4 border-white/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-1 left-2 lg:bottom-2 lg:left-4 w-10 h-10 lg:w-16 lg:h-16 border-2 lg:border-4 border-white/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                  </div>

                  {/* Icon - Overlapping the gradient */}
                  <div className={`${color.icon} w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mx-auto -mt-8 lg:-mt-10 relative z-10 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                    <Icon className={`w-8 h-8 lg:w-10 lg:h-10 ${color.text}`} />
                  </div>

                  {/* Content */}
                  <div className="p-4 lg:p-6 pt-3 lg:pt-4">
                    <h3 
                      id={`value-title-${index}`}
                      className={`card-title ${color.text} mb-2 lg:mb-3 text-center`}
                    >
                      {value.title}
                    </h3>
                    <p className="card-desc text-gray-600 leading-relaxed text-center">
                      {value.description}
                    </p>

                    {/* Arrow Link */}
                    <div className="mt-3 lg:mt-4 flex justify-center">
                      <ChevronRight className={`w-5 h-5 lg:w-6 lg:h-6 ${color.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300`} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Divider Line */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div className="h-0.75" style={{
            background: `linear-gradient(to right, transparent, #EF6203, transparent)`
          }}></div>
        </div>
      </section>
    </>
  );
}