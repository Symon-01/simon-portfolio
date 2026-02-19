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
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, #048F02, #EF6203)'
            }}
          ></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium mt-6">
            {sectionDescription}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
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
              <div className="p-6 lg:p-8">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {skill.title}
                </h3>

                {/* Description */}
                {skill.description && (
                  <p className="text-sm text-gray-500 mb-4">
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
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Design Tools - Wrapped Layout */}
        {designTools && designTools.length > 0 && (
          <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
              <span className="text-3xl">🎨</span>
              Design Tools
            </h3>
            <div className="flex flex-wrap gap-3">
              {designTools.map((tool) => (
                <span
                  key={tool._key}
                  className="px-5 py-2.5 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
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

      {/* Bottom divider */}
      <div className="max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto mt-8">
        <div
          className="h-0.5"
          style={{
            background: 'linear-gradient(to right, transparent, #EF6203, transparent)'
          }}
        ></div>
      </div>
    </section>
  );
}