// FILE LOCATION: src/components/portfolio/ProjectTags.tsx

interface ProjectTagsProps {
  tags: string[];
}

export default function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      <h2 className="section-title font-bold text-gray-900 mb-4">Project Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <span 
            key={index}
            className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full font-semibold card-desc"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}