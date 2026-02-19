'use client';

import { useEffect, useRef, useState } from 'react';
import { client } from '@/lib/sanity.client';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesProcessData {
  title: string;
  description: string;
  steps: ProcessStep[];
}

export default function ServicesProcess() {
  const [data, setData] = useState<ServicesProcessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "servicesProcess"][0] {
          title,
          description,
          steps[] {
            number,
            title,
            description,
            icon
          }
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching services process data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            data.steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [data]);

  if (loading) {
    return <div className="py-6 lg:py-8 bg-white min-h-96"></div>;
  }

  if (!data) {
    return <div className="py-6 lg:py-8 bg-white text-center text-gray-600">No data found</div>;
  }

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

        .process-number {
          font-size: 2.5rem !important;
          font-weight: 800 !important;
          line-height: 1 !important;
        }

        .process-title {
          font-size: 1.1rem !important;
          font-weight: 700 !important;
        }

        .process-desc {
          font-size: 0.875rem !important;
          line-height: 1.6 !important;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .icon-pulse {
          animation: pulse 2s infinite;
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

          .process-number {
            font-size: 1.75rem !important;
          }

          .process-title {
            font-size: 0.85rem !important;
          }

          .process-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .process-title {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <section ref={sectionRef} className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>
              {data.title}
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {data.description}
            </p>
          </div>

          {/* Desktop View - 5 columns */}
          <div className="hidden lg:block mb-10">
            <div className="relative">
              <div className="grid grid-cols-5 gap-4 relative">
                {data.steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 h-full flex flex-col ${
                        visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{
                        borderTopColor: index % 2 === 0 ? '#048F02' : '#EF6203',
                        transitionDelay: `${index * 150}ms`,
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto icon-pulse"
                        style={{
                          backgroundColor: index % 2 === 0 ? 'rgba(4, 143, 2, 0.1)' : 'rgba(239, 98, 3, 0.1)',
                        }}
                      >
                        <span className="text-3xl">{step.icon}</span>
                      </div>

                      <div
                        className="process-number text-center mb-2 opacity-20"
                        style={{ color: index % 2 === 0 ? '#048F02' : '#EF6203' }}
                      >
                        {step.number}
                      </div>

                      <h3
                        className="process-title text-center mb-3"
                        style={{ color: index % 2 === 0 ? '#048F02' : '#EF6203' }}
                      >
                        {step.title}
                      </h3>

                      <p className="process-desc text-gray-600 text-center flex-grow">
                        {step.description}
                      </p>
                    </div>

                    {index < data.steps.length - 1 && (
                      <div className="absolute top-24 -right-4 z-10 hidden lg:block">
                        <div
                          className={`text-4xl transition-all duration-500 ${
                            visibleSteps.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                          }`}
                          style={{
                            color: '#048F02',
                            transitionDelay: `${(index + 1) * 150}ms`,
                          }}
                        >
                          →
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet View - 2 columns grid */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mb-10">
            {data.steps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg border-t-4 overflow-hidden hover:shadow-xl transition-all duration-500 ${
                  visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  borderTopColor: index % 2 === 0 ? '#048F02' : '#EF6203',
                  transitionDelay: `${index * 150}ms`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div className="p-4 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3 mx-auto"
                    style={{
                      backgroundColor: index % 2 === 0 ? 'rgba(4, 143, 2, 0.1)' : 'rgba(239, 98, 3, 0.1)',
                    }}
                  >
                    <span className="text-2xl">{step.icon}</span>
                  </div>

                  {/* Number */}
                  <div
                    className="process-number text-center mb-2 opacity-20"
                    style={{ color: index % 2 === 0 ? '#048F02' : '#EF6203' }}
                  >
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3
                    className="process-title text-center mb-3"
                    style={{ color: index % 2 === 0 ? '#048F02' : '#EF6203' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="process-desc text-gray-600 text-center flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}