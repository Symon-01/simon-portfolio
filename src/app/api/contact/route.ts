// FILE LOCATION: src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { Resend } from 'resend';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Email builders ────────────────────────────────────────────────────────────

function row(label: string, value: string | undefined) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 12px;font-size:13px;color:#666;font-weight:600;white-space:nowrap;vertical-align:top;width:150px;">${label}</td>
    <td style="padding:8px 12px;font-size:13px;color:#111;vertical-align:top;">${value}</td>
  </tr>`;
}

function emailWrapper(
  headerColor: string,
  label: string,
  title: string,
  date: string,
  body: string,
  senderEmail: string,
  senderName: string,
  sanityId: string
) {
  const mailtoSubject = encodeURIComponent(`Re: ${title}`);
  const mailtoBody = encodeURIComponent(`Dear ${senderName},\n\nThank you for reaching out to Simon Designs.\n\n`);
  const mailtoHref = `mailto:${senderEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:${headerColor};padding:28px 32px;">

          <!-- "SIMON DESIGNS" pill badge — white so it reads on any header colour -->
          <p style="margin:0 0 10px 0;">
            <span style="display:inline-block;background:rgba(255,255,255,0.22);border:1px solid rgba(255,255,255,0.45);padding:3px 12px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;">
              ${label}
            </span>
          </p>

          <h1 style="margin:0;font-size:22px;font-weight:900;color:#fff;font-family:Georgia,serif;">${title}</h1>
          <p style="margin:6px 0 0 0;font-size:12px;color:rgba(255,255,255,0.6);">${date}</p>
        </td>
      </tr>

      <!-- Body -->
      <tr><td style="padding:28px 32px;">
        ${body}

        <!-- Reply CTA -->
        <div style="background:#f0f4ff;border-radius:10px;padding:16px 20px;text-align:center;margin-top:24px;">
          <p style="margin:0 0 10px 0;font-size:13px;color:#444;">Reply directly to ${senderName}:</p>
          <a href="${mailtoHref}" style="display:inline-block;background:#048F02;color:#fff;font-size:13px;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;">
            Reply to ${senderName} →
          </a>
        </div>
      </td></tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8f8f8;padding:16px 32px;border-top:1px solid #eee;">
          <p style="margin:0;font-size:11px;color:#999;text-align:center;">
            Simon Designs · <a href="https://www.simondesigns.co.ke" style="color:#048F02;">simondesigns.co.ke</a>
          </p>
          <p style="margin:4px 0 0 0;font-size:11px;color:#bbb;text-align:center;">Sanity record ID: ${sanityId}</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Contact message email ─────────────────────────────────────────────────────
function buildContactEmail(data: {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  projectDetails: string;
  sanityId: string;
}) {
  const date = new Date().toLocaleDateString('en-KE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const body = `
    <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#048F02;border-bottom:2px solid #048F02;padding-bottom:6px;">👤 Sender Details</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fff8;border-radius:8px;margin-bottom:24px;">
      <tbody>
        ${row('Name', data.fullName)}
        ${row('Email', `<a href="mailto:${data.email}" style="color:#048F02;">${data.email}</a>`)}
        ${data.phone ? row('Phone', `<a href="tel:${data.phone}" style="color:#048F02;">${data.phone}</a>`) : ''}
        ${row('Service', data.service)}
      </tbody>
    </table>

    <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#048F02;border-bottom:2px solid #048F02;padding-bottom:6px;">💬 Message</p>
    <div style="background:#fffbf7;border-left:4px solid #EF6203;padding:14px 16px;border-radius:0 8px 8px 0;">
      <p style="margin:0;font-size:14px;line-height:1.7;color:#333;">${data.projectDetails.replace(/\n/g, '<br>')}</p>
    </div>
  `;

  return emailWrapper(
    'linear-gradient(135deg,#048F02 0%,#036b01 100%)',
    'Simon Designs',
    'New Contact Message',
    `Received ${date}`,
    body,
    data.email,
    data.fullName,
    data.sanityId
  );
}

// ── Quote request email ───────────────────────────────────────────────────────
function buildQuoteEmail(data: {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  projectDetails: string;
  originService?: string;
  estimateSummary?: string;
  sanityId: string;
}) {
  const date = new Date().toLocaleDateString('en-KE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const budgetLabels: Record<string, string> = {
    '0-50k':     'KES 0 – 50,000',
    '50k-100k':  'KES 50,000 – 100,000',
    '100k-250k': 'KES 100,000 – 250,000',
    '250k+':     'KES 250,000+',
  };

  const body = `
    <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EF6203;border-bottom:2px solid #EF6203;padding-bottom:6px;">👤 Client Details</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f4;border-radius:8px;margin-bottom:24px;">
      <tbody>
        ${row('Name', data.fullName)}
        ${row('Email', `<a href="mailto:${data.email}" style="color:#EF6203;">${data.email}</a>`)}
        ${data.phone ? row('Phone', `<a href="tel:${data.phone}" style="color:#EF6203;">${data.phone}</a>`) : ''}
        ${row('Service', data.service)}
        ${data.budget ? row('Budget', budgetLabels[data.budget] || data.budget) : ''}
      </tbody>
    </table>

    ${data.estimateSummary ? `
    <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#16a34a;border-bottom:2px solid #16a34a;padding-bottom:6px;">🧾 Estimate Summary</p>
    <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:8px;padding:14px 16px;margin-bottom:24px;">
      <p style="margin:0;font-size:13px;line-height:1.75;color:#166534;white-space:pre-line;">${data.estimateSummary}</p>
      ${data.originService ? `<p style="margin:8px 0 0 0;font-size:11px;color:#4ade80;font-style:italic;">Origin: ${data.originService}</p>` : ''}
    </div>` : ''}

    <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EF6203;border-bottom:2px solid #EF6203;padding-bottom:6px;">📋 Project Details</p>
    <div style="background:#fffbf7;border-left:4px solid #EF6203;padding:14px 16px;border-radius:0 8px 8px 0;">
      <p style="margin:0;font-size:14px;line-height:1.7;color:#333;">${data.projectDetails.replace(/\n/g, '<br>')}</p>
    </div>
  `;

  return emailWrapper(
    'linear-gradient(135deg,#EF6203 0%,#c44d00 100%)',
    'Simon Designs',
    '🧾 New Quote Request',
    `Received ${date}`,
    body,
    data.email,
    data.fullName,
    data.sanityId
  );
}

// ── POST ──────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    const fullName        = body.fullName || body.name || '';
    const email           = body.email || '';
    const phone           = body.phone || '';
    const service         = body.service || body.projectType || '';
    const projectDetails  = body.projectDetails || body.description || '';
    const type            = body.type || 'contact';
    const originService   = body.originService || '';
    const estimateSummary = body.estimateSummary || '';
    const budget          = body.budget || '';

    if (!fullName || !email || !projectDetails) {
      console.log('Validation failed:', { fullName, email, projectDetails });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Save to Sanity ──────────────────────────────────────────────
    const result = await client.create({
      _type: 'contactMessage',
      fullName,
      email,
      phone,
      service,
      projectDetails,
      originService,
      estimateSummary,
      status: 'unread',
      priority: type === 'quote-request' ? 'high' : 'medium',
      submittedAt: new Date().toISOString(),
    });

    console.log('Successfully created message:', result._id);

    // ── Send email via Resend ───────────────────────────────────────
    const isQuote = type === 'quote-request';

    await resend.emails.send({
      from: 'Simon Designs <onboarding@resend.dev>', // ← swap to your domain once verified
      to: 'simonmachariamugo@gmail.com',
      replyTo: email,
      subject: isQuote
        ? `🧾 New Quote Request from ${fullName} — ${service || 'General'}`
        : `📩 New Message from ${fullName} — ${service || 'General Enquiry'}`,
      html: isQuote
        ? buildQuoteEmail({ fullName, email, phone, service, budget, projectDetails, originService, estimateSummary, sanityId: result._id })
        : buildContactEmail({ fullName, email, phone, service, projectDetails, sanityId: result._id }),
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!', id: result._id },
      { status: 200 }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Contact form error:', message);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}