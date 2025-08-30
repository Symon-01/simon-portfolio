import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 bg-orange-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative h-10 w-10">
                <Image src="/logo.png" alt="Simon Designs" fill className="object-contain" sizes="40px" />
              </div>
              <span className="font-extrabold text-lg">Simon Designs</span>
            </div>
            <p className="text-sm text-gray-700">
              Transforming ideas into stunning visual experiences.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:underline" href="/">Home</Link></li>
              <li><Link className="hover:underline" href="/about">About</Link></li>
              <li><Link className="hover:underline" href="/services">Services</Link></li>
              <li><Link className="hover:underline" href="/portfolio">Portfolio</Link></li>
              <li><Link className="hover:underline" href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Brand Identity</li>
              <li>Marketing Materials</li>
              <li>UI/UX Design</li>
              <li>Print & Publishing</li>
              <li>Simon Arts</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Othaya, Nyeri County, Kenya</li>
              <li><a className="hover:underline" href="mailto:simonmachariamugo@gmail.com">simonmachariamugo@gmail.com</a></li>
              <li><a className="hover:underline font-semibold" href="tel:+254742323611">+254 742 323 611</a></li>
              <li className="flex gap-3 pt-2">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="TikTok">🎵</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📸</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} Simon Designs. All rights reserved. | Privacy Policy | Terms of Service | Designed with ❤️ in Kenya
        </div>
      </div>
    </footer>
  );
}
