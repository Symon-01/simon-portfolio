// FILE LOCATION: src/components/portfolio/ProjectHeader.tsx

"use client";

import { useState } from 'react';
import { Project, categoryLabels } from '@/types/portfolio';
import SupportButton from '@/components/SupportButton';

interface ProjectHeaderProps {
  project: Project;
}

function getStatusBadge(project: Project): { label: string; color: string; bg: string } {
  const clientLower = (project.client || '').toLowerCase();
  const isSelfInitiated =
    clientLower.includes('simon') ||
    clientLower.includes('self') ||
    clientLower.includes('self-initiated') ||
    clientLower.includes('simon designs');

  if (isSelfInitiated) {
    return { label: '✨ Passion Project', color: '#7C3AED', bg: '#F5F3FF' };
  }
  if (project.featured) {
    return { label: '⭐ Featured Work', color: '#D97706', bg: '#FFFBEB' };
  }
  return { label: '💼 Client Commissioned', color: '#048F02', bg: '#F0FDF4' };
}

function getToolsDescription(category: string): string {
  switch (category) {
    case 'branding':
      return 'Crafted with industry-leading design software.';
    case 'marketing':
      return 'Built using professional creative tools.';
    case 'uiux':
      return 'Designed with leading UX & prototyping tools.';
    case 'print':
      return 'Typeset with specialist print software.';
    case 'packaging':
      return 'Created using precision packaging tools.';
    default:
      return 'Produced with professional design software.';
  }
}

// Brand colours palette — cycles through green, orange, then accent tones
const BRAND_COLORS = [
  '#048F02', // brand green
  '#EF6203', // brand orange
  '#027A00', // deep green
  '#D95A02', // deep orange
  '#05B503', // bright green
  '#F47B1A', // light orange
  '#036B01', // forest green
  '#C45200', // burnt orange
];

function getToolColor(tool: string, index: number): string {
  // Named overrides first
  const t = tool.toLowerCase();
  if (t.includes('figma'))      return '#0ACF83';
  if (t.includes('canva'))      return '#00C4CC';
  if (t.includes('xd'))         return '#FF61F6';
  if (t.includes('after'))      return '#9999FF';
  // Everything else rotates through brand palette
  return BRAND_COLORS[index % BRAND_COLORS.length];
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this project: ${project?.title}`);
    const shareUrls: { [key: string]: string } = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const badge = getStatusBadge(project);
  const tools = project.tools || [];
  const deliverables = project.deliverables || [];
  const toolsDescription = getToolsDescription(project.category);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
      <div className="flex flex-wrap items-start justify-between gap-4">

        {/* ── LEFT SIDE ── */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Status badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.featured && (
              <span
                className="inline-block text-white px-3 py-1 rounded-full font-semibold card-desc"
                style={{ backgroundColor: '#EF6203' }}
              >
                ⭐ Featured Project
              </span>
            )}
            <span
              className="inline-block px-3 py-1 rounded-full font-semibold card-desc"
              style={{
                backgroundColor: badge.bg,
                color: badge.color,
                border: `1px solid ${badge.color}33`
              }}
            >
              {badge.label}
            </span>
          </div>

          {/* Category */}
          <div
            className="font-semibold uppercase tracking-wide card-desc mb-1"
            style={{ color: '#048F02' }}
          >
            {categoryLabels[project.category] || project.category}
          </div>

          {/* Title */}
          <h1 className="section-title font-bold text-gray-900">
            {project.title}
          </h1>

          {/* Client + Date */}
          <div className="flex flex-wrap gap-4 text-gray-600 card-desc mb-4">
            {project.client && (
              <div>
                <span className="font-semibold text-gray-900">Client:</span>{' '}
                <span className="text-gray-700">{project.client}</span>
              </div>
            )}
            {project.projectDate && (
              <div>
                <span className="font-semibold text-gray-900">Date:</span>{' '}
                <span className="text-gray-700">
                  {new Date(project.projectDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>

          {/* ── SERVICE & DELIVERABLES + TOOLS USED — side by side ── */}
          <div className="flex flex-wrap items-start gap-6">

            {/* Service & Deliverables — from Sanity */}
            {deliverables.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                  Service & Deliverables
                </p>
                <p className="text-xs font-semibold text-gray-700 mb-1.5">
                  {categoryLabels[project.category] || project.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: '#F0FDF4',
                        color: '#048F02',
                        border: '1px solid #bbf7bb'
                      }}
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Used — from Sanity */}
            {tools.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                  Tools Used
                </p>
                <p
                  className="text-[11px] font-medium mb-2"
                  style={{ color: '#EF6203' }}
                >
                  {toolsDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-md text-white"
                      style={{ backgroundColor: getToolColor(tool, i) }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ── RIGHT SIDE — completely unchanged ── */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="font-semibold text-gray-700 mb-2 card-desc">Share this project:</p>
          <div className="flex flex-wrap gap-2">

            <button onClick={() => handleShare('whatsapp')} className="bg-[#25D366] hover:bg-[#20BD5A] text-white p-2 rounded-lg transition-colors" title="Share on WhatsApp">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </button>

            <button onClick={() => handleShare('facebook')} className="bg-[#1877F2] hover:bg-[#0C63D4] text-white p-2 rounded-lg transition-colors" title="Share on Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>

            <button onClick={() => handleShare('twitter')} className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-colors" title="Share on X (Twitter)">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </button>

            <button onClick={() => handleShare('linkedin')} className="bg-[#0A66C2] hover:bg-[#004182] text-white p-2 rounded-lg transition-colors" title="Share on LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </button>

            <button onClick={handleCopyLink} className="bg-gradient-to-tr from-[#FEDA75] via-[#FA7E1E] to-[#D62976] hover:opacity-90 text-white p-2 rounded-lg transition-opacity" title="Copy link for Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </button>

            <button onClick={handleCopyLink} className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-colors" title="Copy link for TikTok">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
            </button>

            <button onClick={handleCopyLink} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors relative" title="Copy Link">
              {copied ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              )}
            </button>
          </div>

          {copied && (
            <p className="text-xs font-semibold mt-2" style={{ color: '#048F02' }}>Link copied!</p>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200">
            <SupportButton position="top" />
          </div>
        </div>

      </div>
    </div>
  );
}