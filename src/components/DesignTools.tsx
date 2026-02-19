'use client';

import { useEffect, useState } from 'react';
import { Palette, PenTool, FileText, Video, Scissors, Box, Layers, Wand2 } from 'lucide-react';
import { client } from '@/lib/sanity.client';

interface Tool {
  name: string;
  iconName: string;
}

interface DesignToolsData {
  title: string;
  description: string;
  tools: Tool[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  palette: Palette,
  pentool: PenTool,
  filetext: FileText,
  video: Video,
  scissors: Scissors,
  box: Box,
  layers: Layers,
  wand2: Wand2,
};

const toolColors: Record<string, Record<string, string>> = {
  palette: {
    cardGradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
    hoverGradient: 'hover:from-blue-100 hover:to-blue-200',
    bgColor: 'bg-blue-100',
    hoverBg: 'group-hover:bg-blue-600',
    iconColor: 'text-blue-600',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-blue-500',
  },
  pentool: {
    cardGradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
    hoverGradient: 'hover:from-orange-100 hover:to-orange-200',
    bgColor: 'bg-orange-100',
    hoverBg: 'group-hover:bg-orange-600',
    iconColor: 'text-orange-600',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-orange-500',
  },
  filetext: {
    cardGradient: 'bg-gradient-to-br from-pink-50 to-pink-100',
    hoverGradient: 'hover:from-pink-100 hover:to-pink-200',
    bgColor: 'bg-pink-100',
    hoverBg: 'group-hover:bg-pink-600',
    iconColor: 'text-pink-600',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-pink-500',
  },
  video: {
    cardGradient: 'bg-gradient-to-br from-purple-50 to-purple-100',
    hoverGradient: 'hover:from-purple-100 hover:to-purple-200',
    bgColor: 'bg-purple-100',
    hoverBg: 'group-hover:bg-purple-600',
    iconColor: 'text-purple-600',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-purple-500',
  },
  scissors: {
    cardGradient: 'bg-gradient-to-br from-slate-50 to-slate-100',
    hoverGradient: 'hover:from-slate-100 hover:to-slate-200',
    bgColor: 'bg-slate-100',
    hoverBg: 'group-hover:bg-slate-800',
    iconColor: 'text-slate-800',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-slate-800',
  },
  box: {
    cardGradient: 'bg-gradient-to-br from-sky-50 to-sky-100',
    hoverGradient: 'hover:from-sky-100 hover:to-sky-200',
    bgColor: 'bg-sky-100',
    hoverBg: 'group-hover:bg-sky-600',
    iconColor: 'text-sky-600',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-sky-500',
  },
  layers: {
    cardGradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
    hoverGradient: 'hover:from-orange-100 hover:to-orange-200',
    bgColor: 'bg-orange-100',
    hoverBg: 'group-hover:bg-orange-500',
    iconColor: 'text-orange-500',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-orange-400',
  },
  wand2: {
    cardGradient: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    hoverGradient: 'hover:from-indigo-100 hover:to-indigo-200',
    bgColor: 'bg-indigo-100',
    hoverBg: 'group-hover:bg-indigo-600',
    iconColor: 'text-indigo-600',
    hoverIcon: 'group-hover:text-white',
    borderHover: 'hover:border-indigo-500',
  },
};

export default function DesignTools() {
  const [data, setData] = useState<DesignToolsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "designTools"][0] {
          title,
          description,
          tools[] {
            name,
            iconName
          }
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching design tools data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="py-6 lg:py-6 bg-white min-h-96"></div>;
  }

  if (!data) {
    return <div className="py-6 lg:py-6 bg-white text-center text-gray-600">No data found</div>;
  }

  return (
    <>
      <style jsx>{`
        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
          font-weight: 700;
        }

        .section-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }

        .card-title {
          font-size: 0.875rem !important;
          font-weight: 700 !important;
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
            font-size: 0.75rem !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title {
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      <section className="py-6 lg:py-6 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="section-title text-green-600">
              {data.title}
            </h2>
            <p className="section-desc text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              {data.description}
            </p>
          </div>

          {/* Mobile: 3 columns, Tablet: 4 columns, Desktop: 6 columns */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
            {data.tools.map((tool, index) => {
              const Icon = iconMap[tool.iconName.toLowerCase()] || Palette;
              const colors = toolColors[tool.iconName.toLowerCase()] || toolColors.palette;

              return (
                <div
                  key={index}
                  className={`group ${colors.cardGradient} ${colors.hoverGradient} rounded-2xl shadow-md p-4 lg:p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${colors.borderHover} flex flex-col items-center justify-center text-center`}
                >
                  <div className={`${colors.bgColor} ${colors.hoverBg} w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center mb-3 transition-colors duration-300`}>
                    <Icon className={`w-5 h-5 lg:w-5.5 lg:h-5.5 ${colors.iconColor} ${colors.hoverIcon} transition-colors duration-300`} />
                  </div>
                  <h3 className={`card-title text-gray-800 transition-colors duration-300`}>
                    {tool.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}