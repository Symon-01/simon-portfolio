'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { client } from '@/lib/sanity.client';

interface ContactInfoData {
  email: string;
  emailLink: string;
  phone: string;
  phoneLink: string;
  location: string;
  locationLink: string;
  workingHours: string;
}

interface ContactDetail {
  icon: React.ComponentType<any>;
  title: string;
  details: string;
  link: string | null;
  colorScheme: 'orange' | 'green';
}

export default function ContactInfo() {
  const [data, setData] = useState<ContactInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "contactInfo"][0] {
          email,
          emailLink,
          phone,
          phoneLink,
          location,
          locationLink,
          workingHours
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching contact info data:', error);
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
    return <div className="py-6 lg:py-8 bg-white text-center text-gray-600">No contact information found</div>;
  }

  const contactDetails: ContactDetail[] = [
    {
      icon: Mail,
      title: 'Email Us',
      details: data.email,
      link: data.emailLink,
      colorScheme: 'orange'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: data.phone,
      link: data.phoneLink,
      colorScheme: 'green'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: data.location,
      link: data.locationLink,
      colorScheme: 'orange'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: data.workingHours,
      link: null,
      colorScheme: 'green'
    },
  ];

  const colorSchemes = {
    orange: {
      gradient: 'from-orange-500 via-orange-600 to-red-500',
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      title: 'text-orange-600',
      circleColor: 'border-white/40',
      overlayHover: 'group-hover:opacity-20'
    },
    green: {
      gradient: 'from-green-500 via-green-600 to-emerald-600',
      bg: 'bg-green-50',
      icon: 'text-green-600',
      title: 'text-green-600',
      circleColor: 'border-white/40',
      overlayHover: 'group-hover:opacity-20'
    }
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
          word-break: break-word;
        }

        .contact-card {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .contact-card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .gradient-top {
          position: relative;
          overflow: hidden;
        }

        .gradient-top::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            transform: translate(20%, 20%);
            opacity: 1;
          }
        }

        .decorative-circle {
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .contact-card:hover .decorative-circle {
          transform: scale(1.8) rotate(180deg);
          opacity: 0.6;
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
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title {
            font-size: 0.9rem !important;
          }

          .card-desc {
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>
              Get In Touch
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Choose the best way to reach us. We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactDetails.map((detail, index) => {
              const Icon = detail.icon;
              const colors = colorSchemes[detail.colorScheme];
              
              const content = (
                <div className="contact-card group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Enhanced Gradient Top with Multiple Decorative Elements */}
                  <div className={`gradient-top h-16 lg:h-24 bg-gradient-to-br ${colors.gradient} relative`}>
                    {/* Animated Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 ${colors.overlayHover} transition-opacity duration-300`}></div>
                    
                    {/* Large Decorative Circle - Top Right */}
                    <div className={`decorative-circle absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-24 lg:h-24 border-3 ${colors.circleColor} rounded-full`}></div>
                    
                    {/* Medium Decorative Circle - Top Right */}
                    <div className={`decorative-circle absolute top-2 right-4 lg:top-3 lg:right-6 w-8 h-8 lg:w-12 lg:h-12 border-2 ${colors.circleColor} rounded-full`}></div>
                    
                    {/* Small Decorative Circle - Bottom Left */}
                    <div className={`decorative-circle absolute -bottom-2 -left-2 lg:-bottom-3 lg:-left-3 w-10 h-10 lg:w-16 lg:h-16 border-2 ${colors.circleColor} rounded-full`}></div>
                    
                    {/* Tiny Accent Circle - Bottom Left */}
                    <div className={`decorative-circle absolute bottom-3 left-6 lg:bottom-4 lg:left-8 w-4 h-4 lg:w-6 lg:h-6 border ${colors.circleColor} rounded-full`}></div>

                    {/* Diagonal Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Icon */}
                  <div className={`${colors.bg} w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mx-auto -mt-6 lg:-mt-8 relative z-10 shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                    <Icon className={`w-6 h-6 lg:w-8 lg:h-8 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <div className="p-3 lg:p-5 pt-2 lg:pt-4 text-center">
                    <h3 className={`card-title mb-1.5 lg:mb-2 ${colors.title}`}>
                      {detail.title}
                    </h3>
                    <p className="card-desc text-gray-700 break-words">
                      {detail.details}
                    </p>

                    {detail.link && (
                      <div className="mt-2 lg:mt-3 flex justify-center">
                        <ExternalLink className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${colors.icon} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
                      </div>
                    )}
                  </div>
                </div>
              );

              return detail.link ? (
                <a key={index} href={detail.link} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={index}>
                  {content}
                </div>
              );
            })}
          </div>
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