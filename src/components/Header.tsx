"use client";
// components/Header.tsx
import { FaPhoneAlt, FaTiktok, FaFacebook, FaInstagram, FaTwitter, FaBars } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Start closing animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }, 300); // Match the transition duration
    } else {
      // Start opening animation
      setIsMobileMenuOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10); // Small delay to ensure DOM is updated
    }
  };

  const closeMobileMenu = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 300);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('mobile-menu-overlay')) {
          closeMobileMenu();
        }
      };
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="relative w-full">
      {/* Background Banner Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/banner-bg.png"
          alt="Banner Background"
          layout="fill"
          objectFit="cover"
          className="opacity-100 object-center md:object-cover"
        />
        <div className="absolute inset-0 bg-black/0"></div>
      </div>

      {/* Desktop Header - Hidden on Mobile */}
      <div className="hidden md:block">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto flex justify-between items-center py-0.5 px-6 text-black">
          {/* Left - Contact */}
          <a href="tel:+254742323611" className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200">
            <FaPhoneAlt size={26} className="text-black" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm text-black">Contact us Today</span>
              <span className="text-sm font-bold text-black">+254742323611</span>
            </div>
          </a>

          {/* Center - Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Simon Designs Logo"
              width={100}
              height={35}
              className="object-contain"
            />
          </div>

          {/* Right: Socials */}
          <div className="flex flex-col items-center space-y-1">
            <span className="font-semibold text-sm text-black">Follow Us</span>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors duration-200"
              >
                <FaTiktok size={20}/>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors duration-200"
              >
                <FaFacebook size={20}/>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors duration-200"
              >
                <FaInstagram size={20}/>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors duration-200"
              >
                <FaTwitter size={20}/>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden flex justify-between items-center py-0 px-6">
        {/* Left - Hamburger Menu */}
        <button 
          onClick={toggleMobileMenu}
          className="text-black hover:opacity-75 transition-opacity duration-200 z-50 relative"
        >
          <FaBars size={24} />
        </button>

        {/* Center - Logo */}
        <div className="flex justify-center flex-1">
          <Image
            src="/logo.png"
            alt="Simon Designs Logo"
            width={85}
            height={32}
            className="object-contain"
          />
        </div>

        {/* Right - Call Icon */}
        <a 
          href="tel:+254742323611" 
          className="text-black hover:opacity-75 transition-opacity duration-200"
        >
          <FaPhoneAlt size={24} />
        </a>
      </div>

      {/* Desktop Navigation Bar - Hidden on Mobile */}
      <nav className="hidden md:block bg-[#EF6203]">
        <div className="max-w-7xl mx-auto flex justify-center space-x-8 py-3 text-white font-semibold">
          <a href="#home" className="hover:text-gray-200 transition-colors duration-200">Home</a>
          <a href="#about" className="hover:text-gray-200 transition-colors duration-200">About</a>
          <a href="#services" className="hover:text-gray-200 transition-colors duration-200">Services</a>
          <a href="#portfolio" className="hover:text-gray-200 transition-colors duration-200">Portfolio</a>
          <a href="#pricing" className="hover:text-gray-200 transition-colors duration-200">Pricing</a>
          <a href="#contact" className="hover:text-gray-200 transition-colors duration-200">Contact</a>
        </div>
      </nav>

      {/* Mobile Orange Strip with Navigation - Only visible on mobile */}
      <div className="md:hidden bg-[#EF6203] py-3">
        <div className="flex justify-center space-x-3.5 text-white text-xs font-semibold mx-4">
          <a href="#home" className="hover:text-gray-200 transition-colors duration-200">Home</a>
          <a href="#about" className="hover:text-gray-200 transition-colors duration-200">About</a>
          <a href="#services" className="hover:text-gray-200 transition-colors duration-200">Services</a>
          <a href="#portfolio" className="hover:text-gray-200 transition-colors duration-200">Portfolio</a>
          <a href="#pricing" className="hover:text-gray-200 transition-colors duration-200">Pricing</a>
          <a href="#contact" className="hover:text-gray-200 transition-colors duration-200">Contact</a>
        </div>
      </div>

      {/* Mobile Navigation Menu - Slides in smoothly */}
      {isMobileMenuOpen && (
        <>
          {/* Semi-transparent overlay with fade-in animation */}
          <div 
            className={`md:hidden fixed inset-0 bg-black/40 z-40 mobile-menu-overlay transition-opacity duration-300 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobileMenu}
          ></div>
          
          {/* Dropdown menu with slide-in animation */}
          <div className={`md:hidden fixed top-0 left-0 bottom-0 w-1/2 bg-white/90 backdrop-blur-sm z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isAnimating ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <nav className="flex flex-col py-4 px-2 h-full overflow-y-auto">
              {/* Logo at top of mobile menu - aligned left with navigation items */}
              <div className="mx-5.5 mb-0 flex justify-start">
                <Image
                  src="/logo.png"
                  alt="Simon Designs Logo"
                  width={80}
                  height={6}
                  className="object-contain"
                />
              </div>
              
              <div className="flex-1">
                <a 
                  href="#home" 
                  className="block mx-4 px-4 py-3 text-[#EF6203] hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 font-semibold rounded-lg mb-2"
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  className="block mx-4 px-4 py-3 text-[#EF6203] hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 font-semibold rounded-lg mb-2"
                  onClick={closeMobileMenu}
                >
                  About
                </a>
                <a 
                  href="#services" 
                  className="block mx-4 px-4 py-3 text-[#EF6203] hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 font-semibold rounded-lg mb-2"
                  onClick={closeMobileMenu}
                >
                  Services
                </a>
                <a 
                  href="#portfolio" 
                  className="block mx-4 px-4 py-3 text-[#EF6203] hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 font-semibold rounded-lg mb-2"
                  onClick={closeMobileMenu}
                >
                  Portfolio
                </a>
                <a 
                  href="#pricing" 
                  className="block mx-4 px-4 py-3 text-[#EF6203] hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 font-semibold rounded-lg mb-2"
                  onClick={closeMobileMenu}
                >
                  Pricing
                </a>
                <a 
                  href="#contact" 
                  className="block mx-4 px-4 py-3 text-[#EF6203] hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 font-semibold rounded-lg mb-2"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
              </div>
              
              {/* Navigation Banner Image */}
              <div className="relative h-32 mx-4 my-4 rounded-lg overflow-hidden">
                <Image
                  src="/Nav.jpg"
                  alt="Navigation Banner"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-80"
                />
              </div>
              
              {/* Mobile Social Links in Menu */}
              <div className="border-t border-gray-200 pt-4 px-4">
                <span className="font-semibold text-sm text-[#EF6203] block mb-3">Follow Us</span>
                <div className="flex space-x-4">
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EF6203] hover:text-orange-700 transition-colors duration-200"
                  >
                    <FaTiktok size={20}/>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EF6203] hover:text-orange-700 transition-colors duration-200"
                  >
                    <FaFacebook size={20}/>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EF6203] hover:text-orange-700 transition-colors duration-200"
                  >
                    <FaInstagram size={20}/>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EF6203] hover:text-orange-700 transition-colors duration-200"
                  >
                    <FaTwitter size={20}/>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}