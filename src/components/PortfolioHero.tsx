import UniversalHero from './UniversalHero';

export default function PortfolioHero() {
  return (
    <UniversalHero 
      location="portfolio-hero"
      scrollingBannerItems={[
        '🏆 Award-Winning Projects',
        '✨ Creative Excellence',
        '🎨 Stunning Brand Designs',
        '💼 Professional Solutions'
      ]}
    />
  );
}