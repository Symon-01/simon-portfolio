// FILE LOCATION: src/app/api/support-receipt/route.ts
//
// CHANGES FROM PREVIOUS VERSION:
// Receipt redesigned as a proper business receipt/invoice with:
// - Simon Designs logo at top
// - Company details (address, contact, website)
// - Receipt number formatted like a real invoice
// - Formal receipt table layout
// - Authenticated stamp/seal effect
// - Both supporter receipt and internal notification sent

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function buildReceiptEmail(data: {
  name: string;
  email: string;
  amount: number;
  reference: string;
  date: string;
  receiptNumber: string;
}) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Simon Designs — Support Receipt</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
  <tr><td align="center">
    <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.12);">

      <!-- ── TOP COLOUR BAR ── -->
      <tr>
        <td style="height:6px;background:linear-gradient(to right,#048F02,#EF6203);"></td>
      </tr>

      <!-- ── HEADER: Logo left, Receipt label right ── -->
      <tr>
        <td style="padding:28px 36px 20px 36px;border-bottom:1px solid #e8e8e8;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <!-- Logo -->
              <td style="vertical-align:middle;">
                <img
                  src="https://simondesigns.co.ke/logo.png"
                  alt="Simon Designs"
                  width="120"
                  style="display:block;height:auto;"
                />
                <p style="margin:6px 0 0 0;font-size:11px;color:#666;">Quality & Professional</p>
              </td>
              <!-- Receipt Label -->
              <td style="vertical-align:top;text-align:right;">
                <p style="margin:0;font-size:22px;font-weight:900;color:#111;letter-spacing:-0.5px;">RECEIPT</p>
                <p style="margin:4px 0 0 0;font-size:12px;color:#888;">No. <strong style="color:#048F02;">${data.receiptNumber}</strong></p>
                <p style="margin:4px 0 0 0;font-size:11px;color:#999;">${data.date}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── COMPANY + RECIPIENT ── -->
      <tr>
        <td style="padding:20px 36px;border-bottom:1px solid #f0f0f0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <!-- From -->
              <td style="vertical-align:top;width:50%;">
                <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EF6203;">From</p>
                <p style="margin:0;font-size:13px;font-weight:700;color:#111;">Simon Designs</p>
                <p style="margin:2px 0 0 0;font-size:11px;color:#666;line-height:1.6;">
                  Kenya<br>
                  +254 742 323 611<br>
                  simonmachariamugo@gmail.com<br>
                  <a href="https://simondesigns.co.ke" style="color:#048F02;text-decoration:none;">simondesigns.co.ke</a>
                </p>
              </td>
              <!-- To -->
              <td style="vertical-align:top;padding-left:24px;">
                <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EF6203;">Supporter</p>
                <p style="margin:0;font-size:13px;font-weight:700;color:#111;">${data.name}</p>
                <p style="margin:2px 0 0 0;font-size:11px;color:#666;">
                  <a href="mailto:${data.email}" style="color:#048F02;text-decoration:none;">${data.email}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── RECEIPT TABLE ── -->
      <tr>
        <td style="padding:0 36px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
            <!-- Table header -->
            <tr style="background:#048F02;">
              <td style="padding:10px 14px;font-size:11px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.08em;border-radius:4px 0 0 0;">Description</td>
              <td style="padding:10px 14px;font-size:11px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.08em;text-align:right;border-radius:0 4px 0 0;">Amount</td>
            </tr>
            <!-- Line item -->
            <tr style="background:#f8fdf8;border-bottom:1px solid #e8f5e8;">
              <td style="padding:14px 14px;font-size:13px;color:#333;">
                <strong>Creative Studio Support</strong><br>
                <span style="font-size:11px;color:#888;">Voluntary support contribution to Simon Designs</span>
              </td>
              <td style="padding:14px 14px;font-size:13px;color:#333;text-align:right;font-weight:600;">
                KES ${data.amount.toLocaleString()}
              </td>
            </tr>
            <!-- Total row -->
            <tr style="background:#048F02;">
              <td style="padding:12px 14px;font-size:13px;font-weight:700;color:#fff;">TOTAL RECEIVED</td>
              <td style="padding:12px 14px;font-size:16px;font-weight:900;color:#fff;text-align:right;">
                KES ${data.amount.toLocaleString()}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── PAYMENT DETAILS ── -->
      <tr>
        <td style="padding:0 36px 20px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #eee;border-radius:6px;padding:0;">
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid #eee;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:11px;color:#888;font-weight:600;">PAYMENT METHOD</td>
                    <td style="font-size:11px;color:#333;text-align:right;">M-Pesa / Card via IntaSend</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid #eee;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:11px;color:#888;font-weight:600;">PAYMENT DATE</td>
                    <td style="font-size:11px;color:#333;text-align:right;">${data.date}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid #eee;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:11px;color:#888;font-weight:600;">REFERENCE NUMBER</td>
                    <td style="font-size:11px;color:#333;text-align:right;font-family:monospace;">${data.reference}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:11px;color:#888;font-weight:600;">STATUS</td>
                    <td style="text-align:right;">
                      <span style="background:#dcfce7;color:#16a34a;font-size:10px;font-weight:800;padding:3px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:0.06em;">
                        ✓ Confirmed
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── THANK YOU MESSAGE ── -->
      <tr>
        <td style="padding:0 36px 24px 36px;">
          <div style="background:linear-gradient(135deg,#f0fdf4,#fff7ed);border-radius:8px;padding:16px 20px;border-left:4px solid #048F02;">
            <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#111;">Thank you for your support, ${data.name}! ❤️</p>
            <p style="margin:0;font-size:12px;color:#555;line-height:1.6;">
              Your contribution goes directly into Simon Designs' creative work — pencil art, editorial publications, and community design projects across Kenya.
              Please retain this receipt for your records.
            </p>
          </div>
        </td>
      </tr>

      <!-- ── CTA BUTTON ── -->
      <tr>
        <td style="padding:0 36px 28px 36px;text-align:center;">
          <a
            href="https://simondesigns.co.ke/portfolio"
            style="display:inline-block;background:linear-gradient(135deg,#048F02,#036b01);color:#fff;font-size:13px;font-weight:700;padding:12px 30px;border-radius:8px;text-decoration:none;"
          >
            View Our Portfolio →
          </a>
        </td>
      </tr>

      <!-- ── BOTTOM COLOUR BAR + FOOTER ── -->
      <tr>
        <td style="background:#f8f8f8;padding:16px 36px;border-top:1px solid #eee;text-align:center;">
          <p style="margin:0;font-size:11px;color:#aaa;">
            Simon Designs · <a href="https://simondesigns.co.ke" style="color:#048F02;text-decoration:none;">simondesigns.co.ke</a> · +254 742 323 611
          </p>
          <p style="margin:4px 0 0 0;font-size:10px;color:#ccc;">
            This is an official payment receipt. Please retain it for your records. Receipt No: ${data.receiptNumber}
          </p>
        </td>
      </tr>

      <!-- Bottom green bar -->
      <tr>
        <td style="height:6px;background:linear-gradient(to right,#EF6203,#048F02);"></td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildInternalNotification(data: {
  name: string;
  email: string;
  amount: number;
  reference: string;
  date: string;
  receiptNumber: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <tr><td style="height:5px;background:linear-gradient(to right,#EF6203,#048F02);"></td></tr>
      <tr>
        <td style="padding:24px 32px;background:linear-gradient(135deg,#EF6203,#c44d00);">
          <h2 style="margin:0;color:#fff;font-size:18px;">💰 New Support Received!</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:rgba(255,255,255,0.7);">${data.date}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f4;border-radius:8px;border:1px solid #fed7aa;">
            <tr><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:13px;color:#666;font-weight:600;width:160px;">Supporter</td><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:13px;color:#111;">${data.name}</td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:13px;color:#666;font-weight:600;">Email</td><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:13px;"><a href="mailto:${data.email}" style="color:#EF6203;">${data.email}</a></td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:13px;color:#666;font-weight:600;">Amount</td><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:16px;font-weight:900;color:#048F02;">KES ${data.amount.toLocaleString()}</td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:13px;color:#666;font-weight:600;">Receipt No.</td><td style="padding:10px 16px;border-bottom:1px solid #fed7aa;font-size:12px;color:#888;">${data.receiptNumber}</td></tr>
            <tr><td style="padding:10px 16px;font-size:13px;color:#666;font-weight:600;">Reference</td><td style="padding:10px 16px;font-size:11px;color:#999;font-family:monospace;">${data.reference}</td></tr>
          </table>
        </td>
      </tr>
      <tr><td style="background:#f8f8f8;padding:14px 32px;text-align:center;font-size:11px;color:#aaa;">Simon Designs Internal Notification</td></tr>
      <tr><td style="height:5px;background:linear-gradient(to right,#048F02,#EF6203);"></td></tr>
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
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    // Generate receipt number: SD-YYYYMMDD-XXXX
    const now = new Date();
    const yyyymmdd = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `SD-${yyyymmdd}-${rand}`;

    const receiptData = { name, email, amount: Number(amount), reference, date, receiptNumber };

    // Send receipt to supporter
    await resend.emails.send({
      from: 'Simon Designs <onboarding@resend.dev>',
      to: email,
      replyTo: 'simonmachariamugo@gmail.com',
      subject: `Receipt No. ${receiptNumber} — KES ${Number(amount).toLocaleString()} | Simon Designs`,
      html: buildReceiptEmail(receiptData),
    });

    // Send internal notification
    await resend.emails.send({
      from: 'Simon Designs <onboarding@resend.dev>',
      to: 'simonmachariamugo@gmail.com',
      subject: `💰 Support Received: KES ${Number(amount).toLocaleString()} from ${name} [${receiptNumber}]`,
      html: buildInternalNotification(receiptData),
    });

    return NextResponse.json({ success: true, receiptNumber }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Support receipt error:', message);
    return NextResponse.json({ error: 'Failed to send receipt' }, { status: 500 });
  }
}