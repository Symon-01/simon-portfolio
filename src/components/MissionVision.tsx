'use client';

import { useEffect, useState } from 'react';
import { Target, Eye, Sparkles } from 'lucide-react';
import { client } from '@/lib/sanity.client';

interface MissionVisionData {
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
}

export default function MissionVision() {
  const [data, setData] = useState<MissionVisionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "missionVision"][0] {
          missionTitle,
          missionText,
          visionTitle,
          visionText
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching mission vision data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-8 lg:p-10 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
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
      <section className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-gray-600">
          <p>No mission vision data available</p>
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

        /* Mission/Vision specific styles */
        .mission-vision-title {
          font-size: 1.5rem !important;
          line-height: 1.2 !important;
          font-weight: 700;
        }

        /* Custom shadow for better visibility - balanced on all sides */
        .mission-vision-card {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .mission-vision-card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        /* ========== MOBILE RESPONSIVE ========== */
        @media (max-width: 1023px) {
          .section-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }

          .mission-vision-title {
            font-size: 1.5rem !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1023px) {
          .mission-vision-title {
            font-size: 1.5rem !important;
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

      <section className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>
              Our Mission & Vision
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-10">
            
            {/* Mission Card */}
            <article 
              className="mission-vision-card group relative bg-white rounded-3xl transition-all duration-500 overflow-hidden animate-fade-in"
              style={{ animationDelay: '0ms', animationFillMode: 'both' }}
              aria-labelledby="mission-title"
            >
              <div className="relative h-full">
                {/* Diagonal Split Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 transform origin-top-right -skew-y-6 scale-150 opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                </div>

                <div className="relative p-6 lg:p-8">
                  {/* Large Number Background */}
                  <div className="absolute top-2 right-2 lg:top-3 lg:right-3 text-7xl lg:text-8xl font-bold text-orange-500/5 group-hover:text-orange-500/10 transition-colors duration-500">
                    01
                  </div>

                  {/* Icon Badge */}
                  <div className="relative inline-flex items-center justify-center mb-3 lg:mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-orange-500 to-red-500 p-2.5 lg:p-3 rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Target className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    id="mission-title"
                    className="mission-vision-title mb-3 relative" 
                    style={{ color: '#048F02' }}
                  >
                    {data.missionTitle}
                    <Sparkles className="inline-block ml-2 w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
                  </h3>

                  {/* Description */}
                  <p className="card-desc text-gray-700 leading-relaxed relative z-10">
                    {data.missionText}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-5 lg:mt-6 flex gap-2">
                    <div className="h-1 w-12 lg:w-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <div className="h-1 w-6 lg:w-7 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                    <div className="h-1 w-3 bg-gradient-to-r from-orange-300 to-red-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Vision Card */}
            <article 
              className="mission-vision-card group relative bg-white rounded-3xl transition-all duration-500 overflow-hidden animate-fade-in"
              style={{ animationDelay: '100ms', animationFillMode: 'both' }}
              aria-labelledby="vision-title"
            >
              <div className="relative h-full">
                {/* Diagonal Split Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 transform origin-top-right -skew-y-6 scale-150 opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                </div>

                <div className="relative p-6 lg:p-8">
                  {/* Large Number Background */}
                  <div className="absolute top-2 right-2 lg:top-3 lg:right-3 text-7xl lg:text-8xl font-bold text-green-500/5 group-hover:text-green-500/10 transition-colors duration-500">
                    02
                  </div>

                  {/* Icon Badge */}
                  <div className="relative inline-flex items-center justify-center mb-3 lg:mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 p-2.5 lg:p-3 rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Eye className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    id="vision-title"
                    className="mission-vision-title mb-3 relative" 
                    style={{ color: '#048F02' }}
                  >
                    {data.visionTitle}
                    <Sparkles className="inline-block ml-2 w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                  </h3>

                  {/* Description */}
                  <p className="card-desc text-gray-700 leading-relaxed relative z-10">
                    {data.visionText}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-5 lg:mt-6 flex gap-2">
                    <div className="h-1 w-12 lg:w-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <div className="h-1 w-6 lg:w-7 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                    <div className="h-1 w-3 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </article>

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