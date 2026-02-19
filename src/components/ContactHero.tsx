import UniversalHero from './UniversalHero';

export default function ContactHero() {
  return (
    <UniversalHero 
      location="contact-hero"
      scrollingBannerItems={[
        '📞 Get in Touch',
        '💬 Let\'s Talk',
        '🤝 Start Your Project',
        '✉️ Message Us Today'
      ]}
    />
  );
}