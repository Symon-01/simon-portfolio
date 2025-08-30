// components/Header.tsx
import { FaPhoneAlt, FaTiktok, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full">
      {/* Background Banner Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/banner-bg.png" // <-- Replace with your banner image
          alt="Banner Background"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-black/0"></div> {/* Overlay for readability */}
      </div>

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

      {/* Navigation Bar */}
      <nav className="bg-orange-600">
        <div className="max-w-7xl mx-auto flex justify-center space-x-8 py-3 text-white font-semibold">
          <a href="#home" className="hover:text-gray-200 transition-colors duration-200">Home</a>
          <a href="#about" className="hover:text-gray-200 transition-colors duration-200">About</a>
          <a href="#services" className="hover:text-gray-200 transition-colors duration-200">Services</a>
          <a href="#portfolio" className="hover:text-gray-200 transition-colors duration-200">Portfolio</a>
          <a href="#pricing" className="hover:text-gray-200 transition-colors duration-200">Pricing</a>
          <a href="#contact" className="hover:text-gray-200 transition-colors duration-200">Contact</a>
        </div>
      </nav>
    </header>
  );
}