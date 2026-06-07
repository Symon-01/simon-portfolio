import Link from "next/link";
import Image from "next/image";
import { FaTiktok, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-orange-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-5">

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-4 lg:gap-6">

            {/* Logo and Tagline */}
            <div className="col-span-1">
              <div className="flex flex-col items-center mb-4">
                <div className="relative h-32 w-32 mb-1">
                  <Image src="/logo.png" alt="Simon Designs Logo" fill className="object-contain" sizes="128px" />
                </div>
              </div>
              <p className="text-sm text-gray-700 text-center">Transforming ideas into stunning visual experiences.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">About</Link></li>
                <li><Link href="/services" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Portfolio</Link></li>
                <li><Link href="/pricing" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Pricing</Link></li>
                <li><Link href="/the-leadership-review" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Leadership Review</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services?service=brand-identity" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Brand Identity</Link></li>
                <li><Link href="/services?service=marketing-materials" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Marketing Materials</Link></li>
                <li><Link href="/services?service=uiux-design" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">UI/UX Design</Link></li>
                <li><Link href="/services?service=print-publishing" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Print & Publishing</Link></li>
                <li><Link href="/simon-arts" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Simon Arts</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>
                  <a href="https://www.google.com/maps/search/?api=1&query=Othaya,+Nyeri+County,+Kenya" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">
                    Othaya, Nyeri County, Kenya
                  </a>
                </li>
                <li>
                  <a href="mailto:simonmachariamugo@gmail.com" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">
                    simonmachariamugo@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+254742323611" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors font-semibold">
                    +254 742 323 611
                  </a>
                </li>
              </ul>
              <div className="flex gap-4">
                <a href="https://www.tiktok.com/@simondesigns017?_t=ZM-90vVa2hryJw&_r=1" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on TikTok" className="text-black hover:text-gray-600 transition-colors duration-200">
                  <FaTiktok size={20} />
                </a>
                <a href="https://www.facebook.com/share/1BTSE1oVB8/" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on Facebook" className="text-black hover:text-gray-600 transition-colors duration-200">
                  <FaFacebook size={20} />
                </a>
                <a href="https://www.instagram.com/simon_designs01?igsh=MWR3czRlMHJpajdwcA==" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on Instagram" className="text-black hover:text-gray-600 transition-colors duration-200">
                  <FaInstagram size={20} />
                </a>
                <a href="https://x.com/Simon_Designs01?t=QNZGnOHUSuPmtqBk5T96qQ&s=09" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on X (Twitter)" className="text-black hover:text-gray-600 transition-colors duration-200">
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative h-32 w-32">
                <Image src="/logo.png" alt="Simon Designs Logo" fill className="object-contain" sizes="128px" />
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">Transforming ideas into stunning visual experiences.</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.tiktok.com/@simondesigns017?_t=ZM-90vVa2hryJw&_r=1" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on TikTok" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaTiktok size={24} />
              </a>
              <a href="https://www.facebook.com/share/1BTSE1oVB8/" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on Facebook" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/simon_designs01?igsh=MWR3czRlMHJpajdwcA==" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on Instagram" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://x.com/Simon_Designs01?t=QNZGnOHUSuPmtqBk5T96qQ&s=09" target="_blank" rel="noopener noreferrer" aria-label="Simon Designs on X (Twitter)" className="text-black hover:text-gray-600 transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="pl-4">
              <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">About</Link></li>
                <li><Link href="/services" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Portfolio</Link></li>
                <li><Link href="/pricing" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Pricing</Link></li>
                <li><Link href="/the-leadership-review" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Leadership Review</Link></li>
              </ul>
            </div>

            <div className="pr-4">
              <h4 className="font-bold text-gray-900 mb-3">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services?service=brand-identity" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Brand Identity</Link></li>
                <li><Link href="/services?service=marketing-materials" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Marketing Materials</Link></li>
                <li><Link href="/services?service=uiux-design" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">UI/UX Design</Link></li>
                <li><Link href="/services?service=print-publishing" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Print & Publishing</Link></li>
                <li><Link href="/simon-arts" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">Simon Arts</Link></li>
              </ul>
            </div>

            <div className="col-span-2 text-center">
              <h4 className="font-bold text-gray-900 mb-3">Contact</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <a href="https://www.google.com/maps/search/?api=1&query=Othaya,+Nyeri+County,+Kenya" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">
                    Othaya, Nyeri County, Kenya
                  </a>
                </div>
                <div>
                  <a href="mailto:simonmachariamugo@gmail.com" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors">
                    simonmachariamugo@gmail.com
                  </a>
                </div>
                <div>
                  <a href="tel:+254742323611" className="hover:underline text-gray-700 hover:text-[#EF6203] transition-colors font-semibold">
                    +254 742 323 611
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t mt-8 pt-6 text-xs text-center text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <span>© {new Date().getFullYear()} Simon Designs. All rights reserved.</span>
          <span className="hidden sm:inline text-gray-400">|</span>
          <Link href="/privacy-policy" className="hover:underline hover:text-[#EF6203] transition-colors">Privacy Policy</Link>
          <span className="hidden sm:inline text-gray-400">|</span>
          <Link href="/terms-of-service" className="hover:underline hover:text-[#EF6203] transition-colors">Terms of Service</Link>
          <span className="hidden sm:inline text-gray-400">|</span>
          <span>Designed with ❤️ in Kenya</span>
        </div>

      </div>
    </footer>
  );
}