// FILE LOCATION: src/components/portfolio/ProjectDescription.tsx

interface ProjectDescriptionProps {
  description: string;
}

export default function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      <h2 className="section-title font-bold text-gray-900 mb-4">About This Project</h2>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line card-desc">
        {description}
      </div>
    </div>
  );
}