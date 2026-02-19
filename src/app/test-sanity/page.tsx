import { client } from '@/lib/sanity.client';

export default async function TestSanityPage() {
  let connectionStatus = 'Not tested';
  let aboutMeData = null;
  let error = null;

  try {
    connectionStatus = 'Testing connection...';
    
    const query = `*[_type == "aboutMe"][0]{
      _id,
      heroTitle,
      heroDescription,
      yearsExperience,
      projectsDelivered,
      happyClients,
      profileImage
    }`;
    
    aboutMeData = await client.fetch(query);
    connectionStatus = 'Connected ✅';
    
    console.log('✅ About Me Data:', aboutMeData);
  } catch (err: any) {
    connectionStatus = 'Failed ❌';
    error = err.message;
    console.error('❌ Sanity Error:', err);
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#048F02' }}>Sanity Connection Test</h1>
      
      <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Connection Status: {connectionStatus}</h2>
        
        {error && (
          <div style={{ color: 'red', marginTop: '20px' }}>
            <h3>Error:</h3>
            <pre>{error}</pre>
          </div>
        )}
        
        <div style={{ marginTop: '20px' }}>
          <h3>Environment Variables:</h3>
          <ul>
            <li>Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ MISSING'}</li>
            <li>Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET || '❌ MISSING'}</li>
          </ul>
        </div>
        
        {aboutMeData && (
          <div style={{ marginTop: '20px' }}>
            <h3>About Me Data Found:</h3>
            <pre style={{ background: 'white', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(aboutMeData, null, 2)}
            </pre>
          </div>
        )}
        
        {!aboutMeData && !error && (
          <div style={{ marginTop: '20px', color: 'orange' }}>
            <h3>⚠️ No About Me document found in Sanity</h3>
            <p>You need to create an "About Me" document in your Sanity Studio</p>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <a href="/about-me" style={{ color: '#048F02', textDecoration: 'underline' }}>
          ← Back to About Me page
        </a>
      </div>
    </div>
  );
}