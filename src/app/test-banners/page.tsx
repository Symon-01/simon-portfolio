// Create this file: src/app/test-banners/page.tsx
// Visit: http://localhost:3000/test-banners

'use client';

import { useEffect, useState } from 'react';
import { getBannerByLocation, getAllBanners } from '@/lib/sanity.queries';

export default function TestBannersPage() {
  const [aboutBanner, setAboutBanner] = useState<any>(null);
  const [allBanners, setAllBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testSanity() {
      try {
        console.log('🔍 Testing Sanity connection...');
        
        // Test 1: Get all banners
        const all = await getAllBanners();
        console.log('✅ All banners:', all);
        setAllBanners(all);

        // Test 2: Get specific banner
        const about = await getBannerByLocation('about-hero');
        console.log('✅ About hero banner:', about);
        setAboutBanner(about);

        setLoading(false);
      } catch (err: any) {
        console.error('❌ Error:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    testSanity();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Testing Sanity Connection...</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Sanity Banners Test Page</h1>

      {error && (
        <div className="bg-red-600 p-4 rounded mb-8">
          <h2 className="text-xl font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}

      {/* All Banners */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">All Banners ({allBanners.length})</h2>
        {allBanners.length === 0 ? (
          <div className="bg-yellow-600 p-4 rounded">
            <p className="font-bold">⚠️ No banners found in Sanity!</p>
            <p className="mt-2">Go to Sanity Studio and create some banner entries.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allBanners.map((banner) => (
              <div key={banner._id} className="bg-gray-800 p-4 rounded">
                <h3 className="font-bold text-lg">{banner.title}</h3>
                <p className="text-gray-400">Location: {banner.pageLocation}</p>
                <p className="text-gray-400">
                  Images: {banner.images?.length || 0} | Slider: {banner.isSlider ? 'Yes' : 'No'}
                </p>
                {banner.images && banner.images.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-green-400">First image URL:</p>
                    <p className="text-xs text-gray-500 break-all">
                      {banner.images[0].image?.asset?.url || 'No URL'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About Hero Banner */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About Hero Banner</h2>
        {!aboutBanner ? (
          <div className="bg-yellow-600 p-4 rounded">
            <p className="font-bold">⚠️ No "about-hero" banner found!</p>
            <p className="mt-2">
              Go to Sanity Studio → Banner Images → Create New
            </p>
            <p>Set Page Location to: <strong>About - Hero</strong></p>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(aboutBanner, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-900 p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">📋 Next Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Check the console (F12) for detailed logs</li>
          <li>If no banners appear, go to your Sanity Studio</li>
          <li>Create banner entries for each page location</li>
          <li>Make sure images are uploaded</li>
          <li>Publish the banners</li>
          <li>Refresh this page to see results</li>
        </ol>
      </div>
    </div>
  );
}