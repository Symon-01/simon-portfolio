// NEW VERSION (fetches from Sanity)
import UniversalHero from './UniversalHero';

export default function SimonArtsHero() {
  return (
    <UniversalHero 
      location="simon-arts-hero"
      scrollingBannerItems={[
        '🎨 Original Artworks',
        '✨ Creative Expression',
        '🖼️ Limited Editions',
        '💫 Artistic Vision'
      ]}
    />
  );
}