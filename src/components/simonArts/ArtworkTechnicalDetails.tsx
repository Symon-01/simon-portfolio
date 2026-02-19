// FILE LOCATION: src/components/simonArts/ArtworkTechnicalDetails.tsx

"use client";

import { Artwork, mediumLabels, paperLabels } from '@/types/simonArts';

interface ArtworkTechnicalDetailsProps {
  artwork: Artwork;
}

export default function ArtworkTechnicalDetails({ artwork }: ArtworkTechnicalDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      <h2 className="section-title font-bold text-gray-900 mb-6">Technical Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medium */}
        <div>
          <h3 className="card-title text-gray-900 mb-2">Medium</h3>
          <div className="flex flex-wrap gap-2">
            {artwork.medium.map((med, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg card-desc"
                style={{ backgroundColor: 'rgba(4, 143, 2, 0.1)', color: '#048F02' }}
              >
                {mediumLabels[med] || med}
              </span>
            ))}
          </div>
        </div>

        {/* Paper Type */}
        <div>
          <h3 className="card-title text-gray-900 mb-2">Paper Type</h3>
          <p className="card-desc text-gray-700">{paperLabels[artwork.paperType] || artwork.paperType}</p>
        </div>

        {/* Dimensions */}
        <div>
          <h3 className="card-title text-gray-900 mb-2">Dimensions</h3>
          <p className="card-desc text-gray-700">
            {artwork.dimensions.width} × {artwork.dimensions.height} cm
          </p>
        </div>

        {/* Time to Complete */}
        <div>
          <h3 className="card-title text-gray-900 mb-2">Time to Complete</h3>
          <p className="card-desc text-gray-700">{artwork.timeToComplete}</p>
        </div>

        {/* Year */}
        <div>
          <h3 className="card-title text-gray-900 mb-2">Year Created</h3>
          <p className="card-desc text-gray-700">{artwork.year}</p>
        </div>

        {/* Subject */}
        {artwork.subject && (
          <div>
            <h3 className="card-title text-gray-900 mb-2">Subject</h3>
            <p className="card-desc text-gray-700">{artwork.subject}</p>
          </div>
        )}
      </div>
    </div>
  );
}