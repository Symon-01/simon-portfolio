'use client';

import React from 'react';

interface Paragraph {
  _key: string;
  text: string;
}

interface PersonalTouchProps {
  paragraphs?: Paragraph[];
}

export default function PersonalTouch({
  paragraphs = [
    {
      _key: '1',
      text: "When I'm not designing, you'll find me with a pencil in hand, sketching portraits and exploring the depths of realistic drawing. There's something magical about capturing a person's essence on paper—the way light plays across features, the subtle emotions in their eyes, the story their face tells."
    },
    {
      _key: '2',
      text: "My journey from Kigumo Primary School to Mukurwe-ini Boys High School, and then to Embu University, has been filled with incredible learning experiences. Each step taught me resilience, creativity, and the power of hard work."
    },
    {
      _key: '3',
      text: "Based in Othaya, Nyeri, Kenya, I'm proud to serve clients across the country, helping them elevate their brands and tell their stories through powerful design. Whether it's a startup looking for its first logo or an established business refreshing its visual identity, I'm here to bring your vision to life."
    }
  ]
}: PersonalTouchProps) {

  return (
    <section className="py-6 lg:py-8 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl shadow-xl p-8 lg:p-12 border border-orange-100">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8" style={{ color: '#048F02' }}>
            A Personal Note
          </h2>
          
          <div className="space-y-6 text-gray-600">
            {paragraphs?.map((paragraph) => (
              <p 
                key={paragraph._key}
                className="text-lg leading-relaxed"
              >
                {paragraph.text}
              </p>
            ))}
          </div>
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