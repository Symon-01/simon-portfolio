// FILE LOCATION: src/components/portfolio/RelatedProjects.tsx

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { RelatedProject, categoryLabels } from '@/types/portfolio';

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

// ✅ FIXED: now reads image.url (matches GROQ output) instead of image.asset
function getImageUrl(image: any): string | null {
  if (!image) return null;

  // New format — GROQ projects the URL directly as "url"
  if (typeof image.url === 'string') return image.url;

  // Fallback for any old-format images that still have an asset reference
  if (image.asset?._ref) return urlFor(image).width(600).height(600).url();

  return null;
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">

      {/* Section header */}
      <div className="mb-8">
        <h2 className="section-title font-bold text-gray-900">Related Projects</h2>
        <div
          className="mt-2 h-1 w-16 rounded-full"
          style={{ backgroundColor: '#EF6203' }}
        />
      </div>

      {/* Grid: 2 cols mobile, 2 cols tablet, 4 cols desktop */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {projects.map((relatedProject) => {

          // Find cover image first, fall back to first image
          const coverImage = relatedProject.images?.find((img: any) => img.isCover)
            || relatedProject.images?.[0];
          const imageUrl = getImageUrl(coverImage);

          return (
            <Link
              key={relatedProject._id}
              href={`/portfolio/${relatedProject.slug.current}`}
              className="group block h-full"
            >
              <div className="bg-gray-50 hover:bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#048F02]/30 h-full flex flex-col hover:-translate-y-1 md:hover:-translate-y-2">

                {/* Image */}
                <div className="relative aspect-square bg-gray-200 border-b border-gray-200 overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={relatedProject.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs md:text-sm">
                      No Image
                    </div>
                  )}

                  {relatedProject.featured && (
                    <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-[#EF6203] text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-md">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 md:p-5 flex flex-col flex-1">

                  {/* Category */}
                  <div
                    className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-1 md:mb-2"
                    style={{ color: '#EF6203' }}
                  >
                    {categoryLabels[relatedProject.category] || relatedProject.category}
                  </div>

                  {/* Title */}
                  <h3 className="card-title font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-[#048F02] transition-colors line-clamp-2 leading-tight">
                    {relatedProject.title}
                  </h3>

                  {/* Description — Portable Text array handling */}
                  <p className="text-[10px] md:text-sm text-gray-500 line-clamp-2 mb-2 md:mb-4 flex-1 leading-relaxed card-desc">
                    {Array.isArray(relatedProject.description)
                      ? (relatedProject.description as any[])
                          .map((block: any) =>
                            block.children?.map((child: any) => child.text).join('') ?? ''
                          )
                          .join(' ')
                      : relatedProject.description}
                  </p>

                  {/* View Project */}
                  <div
                    className="flex items-center font-bold mt-auto link-text"
                    style={{ color: '#048F02' }}
                  >
                    View Project
                    <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}