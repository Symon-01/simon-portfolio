'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity';

interface Button {
  buttonText: string;
  buttonLink: string;
  buttonColor: 'green' | 'orange';
}

interface Paragraph {
  text: string;
}

interface WhoWeAreData {
  title: string;
  paragraphs: Paragraph[];
  image: any;
  buttons: Button[];
}

export default function WhoWeAre() {
  const [data, setData] = useState<WhoWeAreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "whoWeAre"][0] {
          title,
          paragraphs[] {
            text
          },
          image,
          buttons[] {
            buttonText,
            buttonLink,
            buttonColor
          }
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching who we are data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="py-6 lg:py-8 bg-gray-50 min-h-96"></div>;
  }

  if (!data) {
    return <div className="py-6 lg:py-8 bg-gray-50 text-center text-gray-600">No data found</div>;
  }

  return (
    <>
      <style jsx>{`
        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 1.5rem !important;
          font-weight: 700;
        }

        .section-text {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }

        .section-button {
          padding: 10px 24px !important;
          font-size: 0.9375rem !important;
          font-weight: 600 !important;
        }

        @media (max-width: 1023px) {
          .section-title {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }

          .section-text {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }

          .section-button {
            padding: 8px 20px !important;
            font-size: 0.875rem !important;
          }
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="section-title text-green-600">
                {data.title}
              </h2>

              <div className="space-y-6 text-gray-700">
                {data.paragraphs.map((para, idx) => (
                  <p key={idx} className="section-text leading-relaxed">
                    {para.text}
                  </p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {data.buttons.map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.buttonLink}
                    className={`section-button inline-flex items-center justify-center text-white rounded-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg ${
                      btn.buttonColor === 'green'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                  >
                    {btn.buttonText}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative lg:mt-12">
              {data.image && (
                <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center">
                  <Image
                    src={urlFor(data.image).url()}
                    alt={data.title}
                    width={600}
                    height={395}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}