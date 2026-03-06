'use client';

import React from 'react';
import Image from 'next/image';

interface SkillCategory {
  _key: string;
  title: string;
  description?: string;
  categoryImage: any;
  items: string[];
}

interface DesignTool {
  _key: string;
  toolName: string;
}

interface SkillsExpertiseProps {
  sectionDescription?: string;
  skillCategories?: SkillCategory[];
  designTools?: DesignTool[];
}

export default function SkillsExpertise({
  sectionDescription = "A comprehensive toolkit combining creativity, strategy, and technical excellence",
  skillCategories = [],
  designTools = []
}: SkillsExpertiseProps) {

  return (
    <>
      <style jsx>{`
        /* ========== SIMON DESIGNS - TYPOGRAPHY SYSTEM ========== */

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
        }
        .tools-heading {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
        }

        /* ========== MOBILE RESPONSIVE ========== */
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
          }
          .card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
          .tools-heading {
            font-size: 0.9rem !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>
              Skills & Expertise
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {sectionDescription}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-10">
            {skillCategories && skillCategories.map((skill) => (
              <div
                key={skill._key}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100"
              >
                {/* Square Image */}
                {skill.categoryImage && (
                  <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={skill.categoryImage.asset?.url || ''}
                      alt={skill.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Card Title */}
                  <h3 className="card-title text-gray-900 mb-2">
                    {skill.title}
                  </h3>

                  {/* Card Description */}
                  {skill.description && (
                    <p className="card-desc text-gray-500 mb-4">
                      {skill.description}
                    </p>
                  )}

                  {/* Items List */}
                  <ul className="space-y-3">
                    {skill.items?.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-700">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: '#048F02' }}
                        ></span>
                        <span className="card-desc">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Design Tools */}
          {designTools && designTools.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100">
              <h3 className="tools-heading text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎨</span>
                Design Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {designTools.map((tool) => (
                  <span
                    key={tool._key}
                    className="px-5 py-2.5 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 card-desc"
                    style={{
                      background: 'linear-gradient(135deg, #048F02, #EF6203)'
                    }}
                  >
                    {tool.toolName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section Divider */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div
            className="h-0.5"
            style={{
              background: 'linear-gradient(to right, transparent, #EF6203, transparent)'
            }}
          ></div>
        </div>
      </section>
    </>
  );
}