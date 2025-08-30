import Image from "next/image";
import Link from "next/link";

const drawings = [
  "/pencil-1.jpg",
  "/pencil-2.jpg",
  "/pencil-3.jpg",
  "/pencil-4.jpg",
];

export default function Gallery() {
  return (
    <section className="py-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Orange divider line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>

        <h2 className="text-center text-4xl sm:text-4xl font-bold text-green-600 mb-3">
          Simon Arts – Pencil Drawings
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Beyond digital design, I capture stories in graphite. From portraits to custom sketches, Simon Arts offers timeless, hand-drawn artwork.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {drawings.map((src, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg border border-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* A4 Portrait Aspect Ratio Container */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '210/297' }}>
                <Image 
                  src={src} 
                  alt={`Pencil drawing ${i + 1}`} 
                  fill 
                  className="object-cover transition-transform duration-300 hover:scale-105" 
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" 
                />
              </div>
              
              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-center text-sm">
                  Portrait  {i + 1}
                </h3>
                
                {/* See More Button - Changed to Orange Theme */}
                <div className="text-center">
                  <Link 
                    href={`/simon-arts/drawing-${i + 1}`}
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-xs transition-all duration-200 hover:translate-x-1 bg-orange-50 hover:bg-orange-100 px-3 py-2 rounded-lg border border-orange-200 hover:border-orange-300"
                  >
                    See More About This Photo
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/simon-arts" 
            className="inline-block px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition-all duration-300 hover:shadow-lg"
          >
            Explore Simon Arts
          </Link>
        </div>

        {/* Orange divider line at bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}