import { Search, Palette, RefreshCw, PackageCheck } from "lucide-react";

export default function CreativeProcess() {
  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "We learn about your goals, audience, and brand.",
      color: "from-green-400 to-emerald-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Palette,
      title: "Design",
      description: "We create concepts and explore visual directions.",
      color: "from-orange-400 to-orange-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: RefreshCw,
      title: "Refine",
      description: "We iterate based on feedback until it's perfect.",
      color: "from-blue-400 to-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: PackageCheck,
      title: "Deliver",
      description: "Final files are prepared for web and print.",
      color: "from-purple-400 to-purple-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <>
      <style>{`
        /* ========== SIMON DESIGNS - TYPOGRAPHY SYSTEM ========== */

        /* Section Title */
        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }

        /* Section Description */
        .section-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }

        /* Card Title */
        .card-title {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
        }

        /* Card Description */
        .card-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }

        /* ========== MOBILE RESPONSIVE ========== */
        @media (max-width: 1023px) {
          .section-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .section-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }
          
          .card-title {
            font-size: 0.85rem !important;
            font-weight: 700 !important;
          }
          
          .card-desc {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{color: '#048F02'}}>
              Our Creative Process
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              A collaborative, transparent, and results-focused workflow to deliver polished work.
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`}></div>
                  
                  <div className="flex flex-col items-center text-center mt-3">
                    <div className={`${step.iconBg} w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Icon className={`w-7 h-7 ${step.iconColor}`} />
                    </div>
                    
                    <h3 className="card-title mb-3" style={{color: '#048F02'}}>
                      {step.title}
                    </h3>
                    
                    <p className="card-desc text-gray-700">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5">
                    <Icon className="w-full h-full text-gray-900" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider Line */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div className="h-0.5" style={{
            background: `linear-gradient(to right, transparent, #EF6203, transparent)`
          }}></div>
        </div>
      </section>
    </>
  );
}