import UniversalHero from './UniversalHero';

export default function ServicesHero() {
  return (
    <UniversalHero 
      location="services-hero"
      scrollingBannerItems={[
        '🎨 Brand Identity Design',
        '💼 Marketing Materials',
        '🖥️ UI/UX Design',
        '📱 Digital Solutions'
      ]}
    />
  );
}