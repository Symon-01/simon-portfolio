import React from 'react';
import Link from 'next/link';
import { BannerImage } from '@/types/banner';

interface BannerButtonsProps {
  image: BannerImage;
}

export const BannerButtons: React.FC<BannerButtonsProps> = ({ image }) => {
  // Helper function to get button color classes
  const getButtonClasses = (color?: string) => {
    const baseClasses = 'px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg';
    
    switch (color) {
      case 'green':
        return `${baseClasses} bg-green-600 hover:bg-green-700`;
      case 'orange':
        return `${baseClasses} bg-orange-500 hover:bg-orange-600`;
      case 'blue':
        return `${baseClasses} bg-blue-600 hover:bg-blue-700`;
      case 'gray':
        return `${baseClasses} bg-gray-600 hover:bg-gray-700`;
      default:
        return `${baseClasses} bg-green-600 hover:bg-green-700`;
    }
  };

  // Helper function to get badge color classes
  const getBadgeClasses = (color?: string) => {
    const baseClasses = 'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-xl';
    
    switch (color) {
      case 'dark':
        return `${baseClasses} bg-black/40 backdrop-blur-sm text-white hover:bg-black/50`;
      case 'light':
        return `${baseClasses} bg-white/40 backdrop-blur-sm text-gray-900 hover:bg-white/50`;
      case 'green':
        return `${baseClasses} bg-green-600/90 text-white hover:bg-green-700`;
      case 'orange':
        return `${baseClasses} bg-orange-500/90 text-white hover:bg-orange-600`;
      case 'blue':
        return `${baseClasses} bg-blue-600/90 text-white hover:bg-blue-700`;
      default:
        return `${baseClasses} bg-black/40 backdrop-blur-sm text-white hover:bg-black/50`;
    }
  };

  // Render nothing if no button layout specified
  if (!image.buttonLayout || image.buttonLayout === 'no-buttons') {
    return null;
  }

  // Render Two-Button Layout
  if (image.buttonLayout === 'two-buttons' && image.showButtons) {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {image.button1Text && image.button1Link && (
          <Link
            href={image.button1Link}
            className={getButtonClasses(image.button1Color)}
          >
            {image.button1Text}
          </Link>
        )}
        {image.button2Text && image.button2Link && (
          <Link
            href={image.button2Link}
            className={getButtonClasses(image.button2Color)}
          >
            {image.button2Text}
          </Link>
        )}
      </div>
    );
  }

  // Render Single Badge Button
  if (image.buttonLayout === 'single-badge' && image.badgeText) {
    return (
      <div className="flex justify-center">
        <Link
          href={image.badgeLink || '#'}
          className={getBadgeClasses(image.badgeColor)}
        >
          {image.badgeIcon && (
            <span className="text-xl">{image.badgeIcon}</span>
          )}
          <span>{image.badgeText}</span>
        </Link>
      </div>
    );
  }

  return null;
};

export default BannerButtons;