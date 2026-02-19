import UniversalHero from "@/components/UniversalHero";
import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';
import ContactCTA from '@/components/ContactCTA';

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