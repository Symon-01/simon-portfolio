// FILE LOCATION: src/components/simonArts/ArtworkStory.tsx

"use client";

interface ArtworkStoryProps {
  story: string;
}

export default function ArtworkStory({ story }: ArtworkStoryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      <h2 className="section-title font-bold text-gray-900 mb-4">The Story Behind the Artwork</h2>
      <div className="card-desc text-gray-700 leading-relaxed whitespace-pre-line">
        {story}
      </div>
    </div>
  );
}