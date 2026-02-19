// FILE LOCATION: src/components/simonArts/ArtworkTags.tsx

"use client";

interface ArtworkTagsProps {
  tags: string[];
}

export default function ArtworkTags({ tags }: ArtworkTagsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      <h2 className="card-title font-bold text-gray-900 mb-4">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-full card-desc bg-gray-100 text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}