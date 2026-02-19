import Image from 'next/image'
import Link from 'next/link'
import { Service } from '@/lib/sanity.types'
import { urlFor } from '@/lib/sanity.image'

interface ServiceCardProps {
  service: Service
}

const colorClasses = {
  orange: {
    border: 'border-orange-500',
    shadow: 'hover:shadow-orange-200',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    hoverText: 'hover:text-orange-700'
  },
  green: {
    border: 'border-green-500',
    shadow: 'hover:shadow-green-200',
    bg: 'bg-green-50',
    text: 'text-green-600',
    hoverText: 'hover:text-green-700'
  },
  blue: {
    border: 'border-blue-500',
    shadow: 'hover:shadow-blue-200',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hoverText: 'hover:text-blue-700'
  },
  purple: {
    border: 'border-purple-500',
    shadow: 'hover:shadow-purple-200',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    hoverText: 'hover:text-purple-700'
  },
  red: {
    border: 'border-red-500',
    shadow: 'hover:shadow-red-200',
    bg: 'bg-red-50',
    text: 'text-red-600',
    hoverText: 'hover:text-red-700'
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { title, slug, icon, iconEmoji, description, offerings, cardColor } = service
  const colors = colorClasses[cardColor] || colorClasses.orange

  return (
    <div 
      className={`
        bg-white rounded-lg p-6 shadow-md hover:shadow-xl 
        transition-all duration-300 border-b-4 
        ${colors.border} ${colors.shadow}
        flex flex-col h-full
      `}
    >
      {/* Icon Section */}
      <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mb-4`}>
        {icon ? (
          <div className="relative w-10 h-10">
            <Image 
              src={urlFor(icon).width(40).height(40).url()} 
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <span className="text-3xl">{iconEmoji || '🎨'}</span>
        )}
      </div>
      
      {/* Title */}
      <h3 className={`text-xl font-bold mb-3 ${colors.text}`}>
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 mb-4 flex-grow">
        {description}
      </p>
      
      {/* Offerings List */}
      {offerings && offerings.length > 0 && (
        <ul className="space-y-2 mb-6">
          {offerings.slice(0, 5).map((offering, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
              <span>{offering}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Learn More Link */}
      <Link 
        href={`/services#${slug.current}`}
        className={`${colors.text} ${colors.hoverText} font-medium inline-flex items-center mt-auto transition-colors`}
      >
        Learn More 
        <span className="ml-1">→</span>
      </Link>
    </div>
  )
}