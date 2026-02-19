import UniversalHero from './UniversalHero';

export default function AboutHero() {
  return (
    <UniversalHero 
      location="about-hero"
      scrollingBannerItems={[
        '✨ Transform Your Brand Today',
        '🎨 Award-Winning Design Team',
        '🚀 Ready to Start Your Project?',
        '💼 Professional Brand Solutions'
      ]}
    />
  );
}