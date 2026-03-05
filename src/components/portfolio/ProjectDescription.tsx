// FILE LOCATION: src/components/portfolio/ProjectDescription.tsx

interface ProjectDescriptionProps {
  description: string;
}

export default function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
      <h2 className="section-title font-bold text-gray-900">
        About This Project
      </h2>

      {/* REMOVED 'max-w-2xl' to allow text to fill the entire card width.
          Kept 'text-justify' to maintain the clean editorial edges.
      */}
      <div className="text-gray-700 leading-relaxed whitespace-pre-line card-desc text-justify">
        {description}
      </div>
    </div>
  );
}