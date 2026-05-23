"use client";

import { useState } from 'react';
import Link from 'next/link';
import ProjectHeader from '@/components/portfolio/ProjectHeader';
import ProjectGallery from '@/components/portfolio/ProjectGallery';
import ProjectDescription from '@/components/portfolio/ProjectDescription';
import ProjectApproach from '@/components/portfolio/ProjectApproach';
import ProjectTestimonial from '@/components/portfolio/ProjectTestimonial';
import ProjectResources from '@/components/portfolio/ProjectResources';
import ProjectTags from '@/components/portfolio/ProjectTags';
import ProjectLiveLink from '@/components/portfolio/ProjectLiveLink';
import RelatedProjects from '@/components/portfolio/RelatedProjects';
import SupportButton from '@/components/SupportButton';
import { Project } from '@/types/portfolio';

interface ProjectDetailClientProps {
  initialProject: Project | null;
  slug: string;
}

export default function ProjectDetailClient({ initialProject, slug }: ProjectDetailClientProps) {
  const [project] = useState<Project | null>(initialProject);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="section-title font-bold mb-4 text-gray-900">Project Not Found</h1>
          <p className="section-desc text-gray-600 mb-6">Sorry, we couldn't find the project you're looking for.</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center font-semibold link-text transition-colors"
            style={{ color: '#048F02' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .section-title { font-size: 2rem !important; line-height: 1.3 !important; margin-bottom: 0.375rem !important; }
        .section-desc { font-size: 1rem !important; line-height: 1.6 !important; }
        .card-title { font-size: 0.95rem !important; font-weight: 700 !important; }
        .card-desc { font-size: 0.875rem !important; line-height: 1.5 !important; }
        .link-text { font-size: 0.875rem !important; }
        @media (min-width: 1024px) {
          a.cta-button { padding: 10px 28px !important; font-size: 0.9375rem !important; min-height: 44px !important; font-weight: 600 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; }
        }
        @media (max-width: 1023px) {
          .section-title { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; }
          .section-desc { font-size: 0.9rem !important; padding: 0 8px; }
          .card-title { font-size: 0.85rem !important; font-weight: 700 !important; }
          .card-desc { font-size: 0.8rem !important; line-height: 1.4 !important; }
          .link-text { font-size: 0.8rem !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title { font-size: 0.9rem !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6 lg:py-8">

          <Link
            href="/portfolio"
            className="inline-flex items-center font-semibold mb-6 transition-colors link-text"
            style={{ color: '#048F02' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>

          <ProjectHeader project={project} />

          {project.images && project.images.length > 0 && (
            <ProjectGallery images={project.images} title={project.title} />
          )}

          <ProjectDescription description={project.description} />

          {project.approach && project.approach.length > 0 && (
            <ProjectApproach steps={project.approach} />
          )}

          {((project.testimonials && project.testimonials.length > 0) ||
            (project.testimonial && project.testimonial.quote)) && (
            <ProjectTestimonial
              testimonials={project.testimonials}
              testimonial={project.testimonial}
            />
          )}

          {project.downloadableFiles && project.downloadableFiles.length > 0 && (
            <ProjectResources files={project.downloadableFiles} />
          )}

          {project.tags && project.tags.length > 0 && (
            <ProjectTags tags={project.tags} />
          )}

          {project.projectUrl && (
            <ProjectLiveLink url={project.projectUrl} />
          )}

          {project.relatedProjects && project.relatedProjects.length > 0 && (
            <RelatedProjects projects={project.relatedProjects} />
          )}

          <div className="text-center my-8">
            <SupportButton position="bottom" />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center font-semibold link-text transition-colors"
              style={{ color: '#048F02' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Projects
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}