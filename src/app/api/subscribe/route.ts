// FILE: src/app/api/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';
import crypto from 'crypto';

// ── Sanity client (write access) ──────────────────────────────────────────────
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const BLUE  = '#273583';
const GREEN = '#40a535';
const RED   = '#cd1719';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simondesigns.co.ke';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // ── Check for existing subscriber ──────────────────────────────
    const existing = await sanity.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id, confirmed }`,
      { email }
    );

    if (existing?.confirmed) {
      return NextResponse.json(
        { message: "You're already subscribed! Watch your inbox for the next issue." },
        { status: 200 }
      );
    }

    // ── Generate a secure one-time confirmation token ───────────────
    const confirmToken = crypto.randomBytes(32).toString('hex');
    const confirmUrl  = `${BASE_URL}/api/confirm-subscription?token=${confirmToken}`;

    // ── Upsert subscriber in Sanity (unconfirmed) ───────────────────
    if (existing) {
      // Re-send confirmation for existing unconfirmed subscriber
      await sanity.patch(existing._id).set({ confirmToken, subscribedAt: new Date().toISOString() }).commit();
    } else {
      await sanity.create({
        _type:        'subscriber',
        email,
        name:         name || '',
        confirmed:    false,
        confirmToken,
        subscribedAt: new Date().toISOString(),
        source:       req.headers.get('referer') || 'direct',
      });
    }

    // ── Send confirmation email via Resend ─────────────────────────
    await resend.emails.send({
      from:    'The Leadership Review <newsletter@simondesigns.co.ke>',
      to:      [email],
      subject: 'Confirm your subscription — The Leadership Review',
      headers: {
        'List-Unsubscribe': `<${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}>`,
      },
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm your subscription</title>
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
          <td style="padding:32px 40px 24px;background:${BLUE};text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6);">The Leadership Review</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;font-weight:900;color:#fff;line-height:1.2;">Almost There!</h1>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">Please confirm your subscription below.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px 24px;">
            <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7;">
              ${name ? `Hi ${name},` : 'Hello,'}<br/><br/>
              Thank you for subscribing to <strong>The Leadership Review</strong> — Kenya's number one publication celebrating exemplary leadership.
            </p>
            <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7;">
              To complete your subscription and start receiving new issues in your inbox, click the button below:
            </p>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
              <tr>
                <td style="border-radius:12px;background:${GREEN};">
                  <a href="${confirmUrl}" style="display:inline-block;padding:14px 32px;font-family:Georgia,serif;font-size:15px;font-weight:700;color:#fff;text-decoration:none;border-radius:12px;">
                    ✅ Confirm My Subscription
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:12px;color:#999;line-height:1.6;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="margin:0 0 24px;font-size:11px;color:${BLUE};word-break:break-all;">
              <a href="${confirmUrl}" style="color:${BLUE};">${confirmUrl}</a>
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />

            <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;">
              If you didn't subscribe to The Leadership Review, you can safely ignore this email — you won't receive any further messages.<br/><br/>
              This link expires in 48 hours.
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
      `,
    });

    return NextResponse.json(
      { message: "Check your inbox — we've sent you a confirmation email. Click the link to activate your subscription." },
      { status: 200 }
    );

  } catch (err: unknown) {
    console.error('[subscribe] error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}