import UniversalHero from './UniversalHero';

export default function PricingHero() {
  return (
    <UniversalHero 
      location="pricing-hero"
      scrollingBannerItems={[
        '💰 Transparent Pricing',
        '✨ No Hidden Fees',
        '📦 Flexible Packages',
        '✅ Quality Guaranteed'
      ]}
    />
  );
}