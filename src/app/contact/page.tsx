import type { Metadata } from "next";
import UniversalHero from "@/components/UniversalHero";
import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';
import ContactCTA from '@/components/ContactCTA';

export const metadata: Metadata = {
  title: "Contact Us – Get in Touch | Simon Designs",
  description: "Ready to bring your ideas to life? Contact Simon Designs for professional graphic design services. Quick response, free quotes, Kenya-based.",
  openGraph: {
    title: "Contact Us – Simon Designs",
    description: "Get in touch for professional graphic design services.",
    url: "https://simondesigns.co.ke/contact",
    images: [
      {
        url: "https://simondesigns.co.ke/preview.png",
        width: 1200,
        height: 630,
        alt: "Contact Simon Designs",
      }
    ],
  },
};

export default function ContactPage() {
  return (
    <main>
      <UniversalHero location="contact-hero" scrollingBannerItems={[
        '📞 Get In Touch',
        '✉️ We Reply Within 24 Hours',
        '🤝 Let\'s Work Together',
        '🚀 Start Your Project'
      ]} />
      <ContactInfo />
      <ContactForm />
      <ContactCTA />
    </main>
  );
}