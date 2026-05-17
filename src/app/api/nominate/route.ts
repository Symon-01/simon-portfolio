// FILE LOCATION: src/app/api/nominate/route.ts

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

// ── Brand colours ─────────────────────────────────────────────────────────────
const BLUE  = '#273583';
const GREEN = '#40a535';
const RED   = '#cd1719';

// ── Email builder ─────────────────────────────────────────────────────────────
function buildEmailHtml(data: {
  nominatorName: string;
  nominatorEmail: string;
  nominatorPhone?: string;
  nominatorCounty?: string;
  leaderName: string;
  leaderPosition: string;
  leaderPositionOther?: string;
  areaRepresented?: string;
  mainReason: string;
  areasOfImpact: string[];
  notableAchievements?: string;
  supportingLink?: string;
  sanityId: string;
}) {
  const position = data.leaderPosition === 'Other' ? data.leaderPositionOther : data.leaderPosition;

  const mailtoSubject = encodeURIComponent(`Re: Leadership Nomination — ${data.leaderName}`);
  const mailtoBody    = encodeURIComponent(`Dear ${data.nominatorName},\n\nThank you for nominating ${data.leaderName} for The Leadership Review.\n\n`);
  const mailtoHref    = `mailto:${data.nominatorEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const row = (label: string, value: string | undefined) =>
    value
      ? `<tr>
          <td style="padding:8px 12px;font-size:13px;color:#666;font-weight:600;white-space:nowrap;vertical-align:top;width:160px;">${label}</td>
          <td style="padding:8px 12px;font-size:13px;color:#111;vertical-align:top;">${value}</td>
        </tr>`
      : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Three-colour top stripe -->
      <tr>
        <td style="padding:0;line-height:0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background:${BLUE};height:5px;"></td>
            <td style="background:${GREEN};height:5px;"></td>
            <td style="background:${RED};height:5px;"></td>
          </tr></table>
        </td>
      </tr>

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,${BLUE} 0%,#1a2460 100%);padding:28px 32px;">

          <!-- "THE LEADERSHIP REVIEW" — white pill badge, readable on any bg -->
          <p style="margin:0 0 10px 0;">
            <span style="display:inline-block;background:rgba(255,255,255,0.20);border:1px solid rgba(255,255,255,0.42);padding:3px 12px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;">
              The Leadership Review
            </span>
          </p>

          <h1 style="margin:0;font-size:22px;font-weight:900;color:#fff;font-family:Georgia,serif;">New Leader Nomination</h1>
          <p style="margin:6px 0 0 0;font-size:12px;color:rgba(255,255,255,0.6);">Submitted ${new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </td>
      </tr>

      <!-- Body -->
      <tr><td style="padding:28px 32px;">

        <!-- Nominated Leader -->
        <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BLUE};border-bottom:2px solid ${BLUE};padding-bottom:6px;">🏛️ Nominated Leader</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f3ff;border-radius:8px;margin-bottom:24px;">
          <tbody>
            ${row('Full Name', `<strong>${data.leaderName}</strong>`)}
            ${row('Position', position)}
            ${row('Area / Institution', data.areaRepresented)}
          </tbody>
        </table>

        <!-- Why Nominated -->
        <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${GREEN};border-bottom:2px solid ${GREEN};padding-bottom:6px;">⭐ Why Nominated</p>
        <div style="background:#f4fff2;border-left:4px solid ${GREEN};padding:14px 16px;border-radius:0 8px 8px 0;margin-bottom:16px;">
          <p style="margin:0;font-size:14px;line-height:1.7;color:#333;">${data.mainReason.replace(/\n/g, '<br>')}</p>
        </div>

        ${data.areasOfImpact?.length ? `
        <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#555;">Key Areas of Impact:</p>
        <div style="margin-bottom:16px;">
          ${data.areasOfImpact.map(a =>
            `<span style="display:inline-block;background:${BLUE};color:#fff;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;margin:3px 3px 3px 0;">${a}</span>`
          ).join('')}
        </div>` : ''}

        ${data.notableAchievements ? `
        <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#555;">Notable Achievements:</p>
        <div style="background:#f8f8f8;padding:12px 16px;border-radius:8px;margin-bottom:16px;">
          <p style="margin:0;font-size:13px;line-height:1.6;color:#444;">${data.notableAchievements.replace(/\n/g, '<br>')}</p>
        </div>` : ''}

        ${data.supportingLink ? `
        <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#555;">Supporting Link:</p>
        <p style="margin:0 0 16px 0;"><a href="${data.supportingLink}" style="color:${BLUE};font-size:13px;">${data.supportingLink}</a></p>` : ''}

        <!-- Submitted By -->
        <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${RED};border-bottom:2px solid ${RED};padding-bottom:6px;">👤 Submitted By</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff5f5;border-radius:8px;margin-bottom:24px;">
          <tbody>
            ${row('Name', data.nominatorName)}
            ${row('Email', `<a href="mailto:${data.nominatorEmail}" style="color:${BLUE};">${data.nominatorEmail}</a>`)}
            ${data.nominatorPhone ? row('Phone', `<a href="tel:${data.nominatorPhone}" style="color:${BLUE};">${data.nominatorPhone}</a>`) : ''}
            ${row('County', data.nominatorCounty)}
          </tbody>
        </table>

        <!-- Reply CTA -->
        <div style="background:#f0f3ff;border-radius:10px;padding:16px 20px;text-align:center;">
          <p style="margin:0 0 10px 0;font-size:13px;color:#444;">Reply directly to the nominator:</p>
          <a href="${mailtoHref}"
             style="display:inline-block;background:${BLUE};color:#fff;font-size:13px;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;">
            Reply to ${data.nominatorName} →
          </a>
        </div>

      </td></tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8f8f8;padding:16px 32px;border-top:1px solid #eee;">
          <p style="margin:0;font-size:11px;color:#999;text-align:center;">
            The Leadership Review · Published by Simon Designs ·
            <a href="https://www.simondesigns.co.ke" style="color:${BLUE};">simondesigns.co.ke</a>
          </p>
          <p style="margin:4px 0 0 0;font-size:11px;color:#bbb;text-align:center;">Sanity record ID: ${data.sanityId}</p>
        </td>
      </tr>

      <!-- Three-colour bottom stripe -->
      <tr>
        <td style="padding:0;line-height:0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background:${BLUE};height:4px;"></td>
            <td style="background:${GREEN};height:4px;"></td>
            <td style="background:${RED};height:4px;"></td>
          </tr></table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── POST ──────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nominatorName, nominatorEmail, nominatorPhone, nominatorCounty,
      leaderName, leaderPosition, leaderPositionOther, areaRepresented,
      mainReason, areasOfImpact, notableAchievements, supportingLink, consentGiven,
    } = body;

    if (!nominatorName || !nominatorEmail || !leaderName || !leaderPosition || !mainReason || !consentGiven) {
      return NextResponse.json(
        { error: 'Missing required fields. Please fill in all required sections.' },
        { status: 400 }
      );
    }

    // ── Save to Sanity ────────────────────────────────────────────────
    const result = await client.create({
      _type: 'leadershipNomination',
      nominatorName,
      nominatorEmail,
      nominatorPhone:      nominatorPhone      || '',
      nominatorCounty:     nominatorCounty     || '',
      leaderName,
      leaderPosition,
      leaderPositionOther: leaderPositionOther || '',
      areaRepresented:     areaRepresented     || '',
      mainReason,
      areasOfImpact:       areasOfImpact       || [],
      notableAchievements: notableAchievements || '',
      supportingLink:      supportingLink      || '',
      consentGiven: true,
      status: 'new',
      submittedAt: new Date().toISOString(),
    });

    // ── Send email via Resend ─────────────────────────────────────────
    await resend.emails.send({
      from:    'The Leadership Review <onboarding@resend.dev>', // ← swap to your domain once verified
      to:      'simonmachariamugo@gmail.com',
      replyTo: nominatorEmail,
      subject: `🏛️ New Nomination: ${leaderName} (${leaderPosition === 'Other' ? leaderPositionOther : leaderPosition})`,
      html: buildEmailHtml({
        nominatorName, nominatorEmail, nominatorPhone, nominatorCounty,
        leaderName, leaderPosition, leaderPositionOther, areaRepresented,
        mainReason, areasOfImpact: areasOfImpact || [],
        notableAchievements, supportingLink,
        sanityId: result._id,
      }),
    });

    return NextResponse.json({ success: true, id: result._id }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Nomination error:', message);
    return NextResponse.json(
      { error: 'Failed to submit nomination. Please try again.' },
      { status: 500 }
    );
  }
}