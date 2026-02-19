'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Pillar {
  _key: string;
  title: string;
  description: string;
  emoji: string;
}

interface CreativePhilosophyProps {
  mainQuote?: string;
  pillars?: Pillar[];
}

export default function CreativePhilosophy({
  mainQuote = "Design is not just about making things look beautiful—it's about solving problems and telling stories that resonate. I believe every brand has a unique story to tell, and my job is to translate that story into powerful visuals that connect, inspire, and drive action.",
  pillars = [
    {
      _key: '1',
      emoji: '🎨',
      title: "Creativity Meets Strategy",
      description: "Every design decision is backed by strategic thinking and client objectives"
    },
    {
      _key: '2',
      emoji: '💡',
      title: "Innovation First",
      description: "I constantly explore new techniques and trends to deliver fresh perspectives"
    },
    {
      _key: '3',
      emoji: '🤝',
      title: "Client Partnership",
      description: "Collaboration and communication ensure designs exceed expectations"
    }
  ]
}: CreativePhilosophyProps) {

  return (
    <section className="py-6 lg:py-8 bg-gradient-to-br from-orange-50 to-green-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Lightbulb
            className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6"
            style={{ color: '#048F02' }}
          />
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#048F02' }}>
            My Creative Philosophy
          </h2>
        </div>

        {/* Quote Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-10 border border-green-100">
          <p className="text-lg lg:text-xl text-gray-700 text-center leading-relaxed italic">
            "{mainQuote}"
          </p>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {pillars?.map((pillar) => (
            <div
              key={pillar._key}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200"
            >
              <div className="text-5xl lg:text-6xl mb-4">{pillar.emoji}</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {pillar.title}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
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
  );
}