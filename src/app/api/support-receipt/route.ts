// FILE LOCATION: src/app/api/support-receipt/route.ts
//
// Sends a thank-you receipt email to a supporter after payment via IntaSend.
// Uses the existing Resend setup from the contact route.

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function buildReceiptEmail(data: {
  name: string;
  email: string;
  amount: number;
  reference: string;
  date: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#048F02 0%,#036b01 100%);padding:32px;">
          <p style="margin:0 0 10px 0;">
            <span style="display:inline-block;background:rgba(255,255,255,0.22);border:1px solid rgba(255,255,255,0.45);padding:3px 12px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;">
              Simon Designs
            </span>
          </p>
          <h1 style="margin:0;font-size:24px;font-weight:900;color:#fff;font-family:Georgia,serif;">
            ❤️ Thank You for Your Support!
          </h1>
          <p style="margin:6px 0 0 0;font-size:12px;color:rgba(255,255,255,0.7);">
            ${data.date}
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:32px;">

          <p style="margin:0 0 20px 0;font-size:15px;color:#333;line-height:1.7;">
            Dear <strong>${data.name}</strong>,
          </p>
          <p style="margin:0 0 24px 0;font-size:14px;color:#555;line-height:1.7;">
            Your support means the world to us. Every contribution helps Simon Designs 
            continue creating professional graphic design work, pencil art, and editorial 
            publications that celebrate Kenyan creativity and leadership.
          </p>

          <!-- Receipt Box -->
          <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
            <p style="margin:0 0 14px 0;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#048F02;">
              🧾 Payment Receipt
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#666;font-weight:600;width:160px;">Supporter Name</td>
                <td style="padding:6px 0;font-size:13px;color:#111;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#666;font-weight:600;">Amount Paid</td>
                <td style="padding:6px 0;font-size:15px;color:#048F02;font-weight:800;">KES ${data.amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#666;font-weight:600;">Payment Date</td>
                <td style="padding:6px 0;font-size:13px;color:#111;">${data.date}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#666;font-weight:600;">Reference</td>
                <td style="padding:6px 0;font-size:11px;color:#888;font-family:monospace;">${data.reference}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#666;font-weight:600;">Payment Method</td>
                <td style="padding:6px 0;font-size:13px;color:#111;">M-Pesa / Card via IntaSend</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#666;font-weight:600;">Status</td>
                <td style="padding:6px 0;">
                  <span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:800;padding:2px 10px;border-radius:20px;">
                    ✓ COMPLETED
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <p style="margin:0 0 12px 0;font-size:13px;color:#777;line-height:1.6;">
            Please retain this email as your receipt. If you have any questions about 
            your payment, feel free to reach out to us.
          </p>

          <!-- CTA -->
          <div style="text-align:center;margin-top:28px;">
            <a href="https://simondesigns.co.ke/portfolio" 
               style="display:inline-block;background:linear-gradient(135deg,#048F02,#036b01);color:#fff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">
              View Our Portfolio →
            </a>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8f8f8;padding:16px 32px;border-top:1px solid #eee;">
          <p style="margin:0;font-size:11px;color:#999;text-align:center;">
            Simon Designs · <a href="https://www.simondesigns.co.ke" style="color:#048F02;">simondesigns.co.ke</a>
            · +254742323611
          </p>
          <p style="margin:4px 0 0 0;font-size:10px;color:#bbb;text-align:center;">
            This is an automated receipt. Please keep it for your records.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildInternalNotificationEmail(data: {
  name: string;
  email: string;
  amount: number;
  reference: string;
  date: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:linear-gradient(135deg,#EF6203,#c44d00);padding:28px 32px;">
          <h1 style="margin:0;font-size:20px;font-weight:900;color:#fff;">
            💰 New Support Payment Received!
          </h1>
          <p style="margin:6px 0 0 0;font-size:12px;color:rgba(255,255,255,0.7);">${data.date}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f4;border-radius:8px;padding:16px;">
            <tr>
              <td style="padding:6px 12px;font-size:13px;color:#666;font-weight:600;width:150px;">Supporter</td>
              <td style="padding:6px 12px;font-size:13px;color:#111;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:6px 12px;font-size:13px;color:#666;font-weight:600;">Email</td>
              <td style="padding:6px 12px;font-size:13px;color:#111;">
                <a href="mailto:${data.email}" style="color:#EF6203;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 12px;font-size:13px;color:#666;font-weight:600;">Amount</td>
              <td style="padding:6px 12px;font-size:16px;color:#048F02;font-weight:800;">KES ${data.amount.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding:6px 12px;font-size:13px;color:#666;font-weight:600;">Reference</td>
              <td style="padding:6px 12px;font-size:11px;color:#888;font-family:monospace;">${data.reference}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background:#f8f8f8;padding:16px 32px;border-top:1px solid #eee;">
          <p style="margin:0;font-size:11px;color:#999;text-align:center;">Simon Designs Internal Notification</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, amount, reference } = body;

    if (!name || !email || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const date = new Date().toLocaleDateString('en-KE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Send receipt to supporter
    await resend.emails.send({
      from: 'Simon Designs <onboarding@resend.dev>',
      to: email,
      replyTo: 'simonmachariamugo@gmail.com',
      subject: `✅ Your Support Receipt — KES ${Number(amount).toLocaleString()} | Simon Designs`,
      html: buildReceiptEmail({ name, email, amount: Number(amount), reference, date }),
    });

    // Send internal notification to Simon
    await resend.emails.send({
      from: 'Simon Designs <onboarding@resend.dev>',
      to: 'simonmachariamugo@gmail.com',
      subject: `💰 New Support: KES ${Number(amount).toLocaleString()} from ${name}`,
      html: buildInternalNotificationEmail({ name, email, amount: Number(amount), reference, date }),
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Support receipt error:', message);
    return NextResponse.json({ error: 'Failed to send receipt' }, { status: 500 });
  }
}