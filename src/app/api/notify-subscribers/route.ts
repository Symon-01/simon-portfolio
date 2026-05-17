// FILE: src/app/api/notify-subscribers/route.ts
//
// ── How to set up the Sanity webhook ──────────────────────────────────────────
// 1. Go to sanity.io/manage → your project → API → Webhooks
// 2. Create a new webhook:
//    • Name:    "New Issue Published"
//    • URL:     https://www.simondesigns.co.ke/api/notify-subscribers
//    • Dataset: production
//    • Filter:  _type == "leadershipReview" && delta::changedAny(publishedAt)
//    • Trigger on: Create, Update
//    • Secret:  (generate a random string, add it to env as SANITY_WEBHOOK_SECRET)
// ──────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';
import crypto from 'crypto';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_READ_TOKEN,
  useCdn:    false,
});

const resend  = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simondesigns.co.ke';
const BLUE    = '#273583';
const GREEN   = '#40a535';
const RED     = '#cd1719';

// ── Verify the request genuinely came from Sanity ─────────────────────────────
function verifySanitySignature(req: NextRequest, rawBody: string): boolean {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) return true; // skip verification in dev if secret not set (not recommended for prod)

  const signature = req.headers.get('sanity-webhook-signature') || '';
  const [ts, , sig] = signature.split(',').map(p => p.split('=')[1]);
  if (!ts || !sig) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${ts}.${rawBody}`)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!verifySanitySignature(req, rawBody)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // ── Only proceed if the document is published ──────────────────────
  const documentId = payload._id as string;
  if (!documentId || typeof documentId !== 'string') {
    return NextResponse.json({ skipped: 'No document ID' });
  }

  try {
    // ── Fetch the full issue from Sanity ───────────────────────────
    const issue = await sanity.fetch(
      `*[_type == "leadershipReview" && _id == $id][0]{
        title, slug, featuredLeader, leaderTitle, county, volume, issueNumber, summary,
        coverImage{ asset->{ url } }
      }`,
      { id: documentId }
    );

    if (!issue) {
      return NextResponse.json({ skipped: 'Issue not found or not published' });
    }

    // ── Fetch all confirmed subscribers ────────────────────────────
    const subscribers: { email: string; name?: string }[] = await sanity.fetch(
      `*[_type == "subscriber" && confirmed == true]{ email, name }`
    );

    if (!subscribers.length) {
      return NextResponse.json({ sent: 0, message: 'No confirmed subscribers yet' });
    }

    const issueUrl   = `${BASE_URL}/the-leadership-review/${issue.slug?.current ?? ''}`;
    const coverUrl   = issue.coverImage?.asset?.url;

    // ── Send in batches of 50 (Resend free tier limit) ─────────────
    const BATCH = 50;
    let sent = 0;

    for (let i = 0; i < subscribers.length; i += BATCH) {
      const batch = subscribers.slice(i, i + BATCH);

      await Promise.all(batch.map(sub =>
        resend.emails.send({
          from:    'The Leadership Review <newsletter@simondesigns.co.ke>',
          to:      [sub.email],
          subject: `New Issue: ${issue.title} — The Leadership Review`,
          headers: {
            'List-Unsubscribe': `<${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(sub.email)}>`,
          },
          html: buildIssueEmail({ sub, issue, issueUrl, coverUrl }),
        })
      ));

      sent += batch.length;
    }

    return NextResponse.json({ sent, message: `Notified ${sent} subscriber(s)` });

  } catch (err) {
    console.error('[notify-subscribers] error:', err);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}

// ── Email template ─────────────────────────────────────────────────────────────
function buildIssueEmail({
  sub,
  issue,
  issueUrl,
  coverUrl,
}: {
  sub: { name?: string; email: string };
  issue: Record<string, unknown>;
  issueUrl: string;
  coverUrl?: string;
}) {
  const greeting = sub.name ? `Hi ${sub.name},` : 'Hello,';
  const vol = issue.volume ? `Vol. ${issue.volume} · Issue ${issue.issueNumber}` : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${issue.title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Three-colour top stripe -->
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" height="5" style="background:${BLUE};"></td>
                <td width="34%" height="5" style="background:${GREEN};"></td>
                <td width="33%" height="5" style="background:${RED};"></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="padding:28px 40px 20px;background:${BLUE};text-align:center;">
            <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.55);">New Issue Published</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:13px;font-weight:900;color:#fff;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">The Leadership Review</h1>
          </td>
        </tr>

        <!-- Cover image -->
        ${coverUrl ? `
        <tr>
          <td style="padding:0;">
            <img src="${coverUrl}" alt="Issue cover" width="560" style="width:100%;max-width:560px;display:block;"/>
          </td>
        </tr>` : ''}

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px 24px;">
            ${vol ? `<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BLUE};opacity:0.6;">${vol}</p>` : ''}
            <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:900;color:${RED};line-height:1.2;">${issue.title}</h2>

            <p style="margin:0 0 12px;font-size:14px;color:#444;line-height:1.7;">${greeting}</p>
            <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7;">
              A new issue of <strong>The Leadership Review</strong> is now available.
              ${issue.featuredLeader ? `This edition features <strong>${issue.featuredLeader}</strong>${issue.leaderTitle ? ` — ${issue.leaderTitle}` : ''}${issue.county ? `, ${issue.county}` : ''}.` : ''}
            </p>
            ${issue.summary ? `<p style="margin:0 0 24px;font-size:14px;color:#666;line-height:1.7;font-style:italic;border-left:3px solid ${GREEN};padding-left:14px;">${issue.summary}</p>` : ''}

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
              <tr>
                <td style="border-radius:12px;background:${GREEN};">
                  <a href="${issueUrl}" style="display:inline-block;padding:14px 32px;font-family:Georgia,serif;font-size:15px;font-weight:700;color:#fff;text-decoration:none;border-radius:12px;">
                    Read This Issue →
                  </a>
                </td>
              </tr>
            </table>

            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
            <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;text-align:center;">
              You're receiving this because you subscribed to The Leadership Review.<br/>
              <a href="${BASE_URL}/api/unsubscribe?email=${(sub as { email: string }).email}" style="color:${BLUE};">Unsubscribe</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;background:#f9fafb;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#999;letter-spacing:1px;text-transform:uppercase;">Published by Simon Designs</p>
            <p style="margin:0;font-size:11px;color:#bbb;">Othaya, Nyeri County, Kenya · www.simondesigns.co.ke</p>
          </td>
        </tr>

        <!-- Three-colour bottom stripe -->
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" height="4" style="background:${BLUE};"></td>
                <td width="34%" height="4" style="background:${GREEN};"></td>
                <td width="33%" height="4" style="background:${RED};"></td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;
}