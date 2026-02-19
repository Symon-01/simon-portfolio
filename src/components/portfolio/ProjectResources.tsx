// FILE LOCATION: src/components/portfolio/ProjectResources.tsx

"use client";

import { DownloadableFile } from '@/types/portfolio';

interface ProjectResourcesProps {
  files: DownloadableFile[];
}

export default function ProjectResources({ files }: ProjectResourcesProps) {
  const handleDownload = async (url: string, fileName: string) => {
    try {
      // Fetch the file
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'download';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab if download fails
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      <h2 className="section-title font-bold text-gray-900 mb-2">Project Resources</h2>
      <p className="section-desc text-gray-600 mb-4">
        Download comprehensive project documentation including brand guidelines, case studies, and presentation files.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => handleDownload(file.asset.url, file.fileTitle || `resource-${index + 1}`)}
            className="flex items-center gap-4 p-4 border-2 rounded-xl hover:bg-green-50 transition-all group cursor-pointer text-left w-full bg-gray-50"
            style={{ borderColor: '#E5E7EB' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#048F02'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
          >
            <div 
              className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center transition-colors" 
              style={{ backgroundColor: '#E8F5E8' }}
            >
              <svg 
                className="w-5 h-5" 
                style={{ color: '#048F02' }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 card-title">
                {file.fileTitle}
              </h3>
              {file.fileDescription && (
                <p className="text-gray-600 card-desc">{file.fileDescription}</p>
              )}
            </div>
            <svg 
              className="w-5 h-5 transition-colors group-hover:text-green-600" 
              style={{ color: '#048F02' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}