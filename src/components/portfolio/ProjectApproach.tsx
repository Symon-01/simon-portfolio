// FILE LOCATION: src/components/portfolio/ProjectApproach.tsx

import { ApproachStep } from '@/types/portfolio';

interface ProjectApproachProps {
  steps: ApproachStep[];
}

export default function ProjectApproach({ steps }: ProjectApproachProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
      <h2 className="section-title font-bold text-gray-900 mb-6">Our Creative Approach</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div 
                className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold card-title" 
                style={{ backgroundColor: '#048F02' }}
              >
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="card-title text-gray-900 mb-2">{step.stepTitle}</h3>
              <p className="text-gray-700 leading-relaxed card-desc">{step.stepDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}