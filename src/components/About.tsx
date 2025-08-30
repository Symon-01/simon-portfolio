import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-9">
      {/* Orange divider line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="h-0.75 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-4xl font-bold text-green-600 mb-3">Meet Simon</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">Creative Designer & Visual Storyteller</p>
      </div>

      {/* Centered horizontal card */}
      <div className="flex justify-center">
        <div className="flex border-4 border-orange-500 rounded-lg overflow-hidden bg-white max-w-3xl w-full h-64 shadow-xl">
          {/* Left side - Image with white background */}
          <div className="flex-shrink-0 bg-white flex items-center justify-center w-64">
            <div className="relative h-full w-full">
              <Image 
                src="/simon.jpg" 
                alt="Simon" 
                fill 
                className="object-cover" 
                sizes="256px" 
              />
            </div>
          </div>
          
          {/* Right side - Content with orange background */}
          <div className="flex-1 bg-orange-500 p-4 flex flex-col justify-center items-center">
            <p className="text-white text-lg leading-relaxed mb-6 text-justify w-full">
              Hi, I'm Simon, a Kenyan creative passionate about visual storytelling. I specialize in graphic design and pencil art, blending creativity with strategy to deliver impactful designs.
            </p>
            <div>
              <Link
                href="/about-me"
                className="inline-block px-5 py-2 bg-white hover:bg-green-600 hover:text-white text-green-600 font-semibold rounded-lg transition-all duration-200 shadow-md text-sm cursor-pointer"
              >
                Learn more about me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}