// FILE LOCATION: src/components/portfolio/RelatedProjects.tsx

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { RelatedProject, categoryLabels } from '@/types/portfolio';

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <div className="mb-6">
      <h2 className="section-title font-bold text-gray-900 mb-6">Related Projects</h2>
      {/* Changed grid: Mobile = 2 columns, Tablet = 3 columns, Desktop = 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        {projects.map((relatedProject) => (
          <Link
            key={relatedProject._id}
            href={`/portfolio/${relatedProject.slug.current}`}
            className="group block"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              {relatedProject.images && relatedProject.images[0] && (
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={urlFor(relatedProject.images[0]).width(600).height(600).url()}
                    alt={relatedProject.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-3 lg:p-4">
                <div 
                  className="font-semibold mb-1 uppercase card-desc text-xs" 
                  style={{ color: '#048F02' }}
                >
                  {categoryLabels[relatedProject.category] || relatedProject.category}
                </div>
                <h3 className="card-title text-gray-900 mb-2">
                  {relatedProject.title}
                </h3>
                <span 
                  className="inline-flex items-center font-semibold link-text text-xs" 
                  style={{ color: '#048F02' }}
                >
                  View Project
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}