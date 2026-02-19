// FILE LOCATION: src/components/portfolio/ProjectLiveLink.tsx

interface ProjectLiveLinkProps {
  url: string;
}

export default function ProjectLiveLink({ url }: ProjectLiveLinkProps) {
  return (
    <div className="text-center bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 lg:p-10 mb-6">
      <h3 className="section-title font-bold text-gray-900 mb-4">Want to see it live?</h3>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button inline-flex items-center text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        style={{ 
          backgroundColor: '#048F02',
          padding: '8px 16px',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}
      >
        View Live Project
        <svg 
          className="w-4 h-4 ml-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      </a>
    </div>
  );
}