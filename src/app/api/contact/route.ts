// FILE LOCATION: src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    // Handle both contact form and quote request formats
    const fullName = body.fullName || body.name || '';
    const email = body.email || '';
    const phone = body.phone || '';
    const service = body.service || body.projectType || '';
    const projectDetails = body.projectDetails || body.description || '';
    const type = body.type || 'contact';

    // Validate required fields
    if (!fullName || !email || !projectDetails) {
      console.log('Validation failed:', { fullName, email, projectDetails });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create document in Sanity
    console.log('Creating contactMessage in Sanity...');
    const result = await client.create({
      _type: 'contactMessage',
      fullName,
      email,
      phone,
      service,
      projectDetails,
      status: 'unread',
      priority: type === 'quote-request' ? 'high' : 'medium',
      submittedAt: new Date().toISOString(),
    });

    console.log('Successfully created message:', result._id);

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        id: result._id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    console.error('Error details:', error.message);
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}