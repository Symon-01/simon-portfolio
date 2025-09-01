import Link from "next/link";
import Image from "next/image";
import { FaTiktok, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Match the exact spacing and width of Simon Arts cards */}
          <div className="grid grid-cols-4 gap-6">
              {/* Logo and Tagline */}
              <div className="col-span-1">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative h-32 w-32 mb-1">
                    <Image src="/logo.png" alt="Simon Designs" fill className="object-contain" sizes="128px" />
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-center">
                  Transforming ideas into stunning visual experiences.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/">Home</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/about">About</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services">Services</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/portfolio">Portfolio</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/pricing">Pricing</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/brand-identity">Brand Identity</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/marketing-materials">Marketing Materials</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/ui-ux-design">UI/UX Design</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/print-publishing">Print & Publishing</Link></li>
                  <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/simon-arts">Simon Arts</Link></li>
                </ul>
              </div>

              {/* Contact with Social Media below */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Contact</h4>
                <ul className="space-y-2 text-sm mb-4">
                  <li>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Othaya,+Nyeri+County,+Kenya" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors"
                    >
                      Othaya, Nyeri County, Kenya
                    </a>
                  </li>
                  <li>
                    <a 
                      className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" 
                      href="mailto:simonmachariamugo@gmail.com"
                    >
                      simonmachariamugo@gmail.com
                    </a>
                  </li>
                  <li>
                    <a 
                      className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors font-semibold" 
                      href="tel:+254742323611"
                    >
                      +254 742 323 611
                    </a>
                  </li>
                </ul>
                {/* Social Media Icons below contact */}
                <div className="flex gap-4">
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                    <FaTiktok size={20} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                    <FaFacebook size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                    <FaInstagram size={20} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo and Tagline with Social Media */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative h-32 w-32">
                <Image src="/logo.png" alt="Simon Designs" fill className="object-contain" sizes="128px" />
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Transforming ideas into stunning visual experiences.
            </p>
            {/* Social Media Icons */}
            <div className="flex justify-center gap-4">
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaTiktok size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Mobile 2x2 Grid Layout - Match Simon Arts mobile spacing */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Row 1: Quick Links and Services - Add padding inside */}
            <div className="pl-4">
              <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/">Home</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/about">About</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services">Services</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/portfolio">Portfolio</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/pricing">Pricing</Link></li>
              </ul>
            </div>

            <div className="pr-4">
              <h4 className="font-bold text-gray-900 mb-3">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/brand-identity">Brand Identity</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/marketing-materials">Marketing Materials</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/ui-ux-design">UI/UX Design</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/services/print-publishing">Print & Publishing</Link></li>
                <li><Link className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" href="/simon-arts">Simon Arts</Link></li>
              </ul>
            </div>

            {/* Row 2: Contact spans full width and centered */}
            <div className="col-span-2 text-center">
              <h4 className="font-bold text-gray-900 mb-3">Contact</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Othaya,+Nyeri+County,+Kenya" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors"
                  >
                    Othaya, Nyeri County, Kenya
                  </a>
                </div>
                <div>
                  <a 
                    className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors" 
                    href="mailto:simonmachariamugo@gmail.com"
                  >
                    simonmachariamugo@gmail.com
                  </a>
                </div>
                <div>
                  <a 
                    className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors font-semibold" 
                    href="tel:+254742323611"
                  >
                    +254 742 323 611
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} Simon Designs. All rights reserved. | Privacy Policy | Terms of Service | Designed with ❤️ in Kenya
        </div>
      </div>
    </footer>
  );
}