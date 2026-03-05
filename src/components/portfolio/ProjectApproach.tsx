// FILE LOCATION: src/components/portfolio/ProjectApproach.tsx

import { ApproachStep } from '@/types/portfolio';

interface ProjectApproachProps {
  steps: ApproachStep[];
}

export default function ProjectApproach({ steps }: ProjectApproachProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="section-title font-bold text-gray-900">Our Creative Approach</h2>
        <div
          className="mt-2 h-1 w-16 rounded-full"
          style={{ backgroundColor: '#EF6203' }}
        />
      </div>

      <div className="space-y-0">
        {steps.map((step, index) => {
          const isGreen = index % 2 === 0;
          const accentColor = isGreen ? '#048F02' : '#EF6203';
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex gap-0">
              {/* Left timeline column */}
              <div className="flex flex-col items-center" style={{ width: '52px', flexShrink: 0 }}>
                {/* Numbered circle badge */}
                <div
                  className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0 z-10 shadow-md"
                  style={{ backgroundColor: accentColor, fontSize: '0.875rem' }}
                >
                  {index + 1}
                </div>
                {/* Connecting line below (except last) */}
                {!isLast && (
                  <div
                    className="flex-1 w-0.5 my-1"
                    style={{ backgroundColor: '#E5E7EB', minHeight: '24px' }}
                  />
                )}
              </div>

              {/* Content card */}
              <div
                className={`flex-1 pb-6 ${isLast ? '' : ''}`}
                style={{ paddingLeft: '12px' }}
              >
                {/* Step title with left accent bar */}
                <div
                  className="flex items-center gap-3 mb-2 py-2 px-3 rounded-lg"
                  style={{
                    borderLeft: `4px solid ${accentColor}`,
                    backgroundColor: isGreen ? 'rgba(4, 143, 2, 0.06)' : 'rgba(239, 98, 3, 0.06)',
                  }}
                >
                  <h3
                    className="card-title font-bold"
                    style={{ color: accentColor }}
                  >
                    {step.stepTitle}
                  </h3>
                </div>

                {/* Description */}
                <p className="card-desc text-gray-600 leading-relaxed px-1 text-justify">
                  {step.stepDescription}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}