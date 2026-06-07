import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Simon Designs",
  description: "Learn how Simon Designs collects, uses, and protects your personal information in accordance with Kenya's Data Protection Act 2019.",
  openGraph: {
    title: "Privacy Policy | Simon Designs",
    description: "How Simon Designs handles your personal data.",
    url: "https://simondesigns.co.ke/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "7 June 2025";

  return (
    <main className="bg-gray-50 min-h-screen py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        <style>{`
          .section-title { font-size: 2rem !important; line-height: 1.3 !important; margin-bottom: 0.375rem !important; }
          .section-desc { font-size: 1rem !important; line-height: 1.6 !important; }
          .card-title { font-size: 0.95rem !important; font-weight: 700 !important; }
          .card-desc { font-size: 0.875rem !important; line-height: 1.5 !important; }
          .link-text { font-size: 0.875rem !important; }
          @media (max-width: 1023px) {
            .section-title { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; }
            .section-desc { font-size: 0.9rem !important; padding: 0 8px; }
            .card-title { font-size: 0.85rem !important; font-weight: 700 !important; }
            .card-desc { font-size: 0.8rem !important; line-height: 1.4 !important; }
            .link-text { font-size: 0.8rem !important; }
          }
          @media (min-width: 640px) and (max-width: 1023px) {
            .card-title { font-size: 0.9rem !important; }
          }
        `}</style>

        {/* Back link */}
        <Link href="/" className="link-text inline-flex items-center font-semibold mb-8 transition-colors hover:opacity-70" style={{ color: '#048F02' }}>
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: '#EF620315', color: '#EF6203' }}>
            Legal
          </div>
          <h1 className="section-title font-bold text-gray-900">Privacy Policy</h1>
          <p className="section-desc text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Last updated: <span className="font-semibold">{lastUpdated}</span>
          </p>
          <div className="mt-4 h-0.5 max-w-2xl mx-auto" style={{ background: 'linear-gradient(to right, transparent, #EF6203, transparent)' }} />
        </div>

        {/* Intro box */}
        <div className="rounded-2xl p-6 mb-10 card-desc leading-relaxed text-gray-700" style={{ background: '#27358308', border: '1.5px solid #27358320' }}>
          <p>
            Simon Designs (<strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>) is a graphic design studio
            based in Nairobi, Kenya, operating at <strong>simondesigns.co.ke</strong>. We are committed to protecting
            your personal information and your right to privacy. This Privacy Policy explains what information we
            collect, how we use it, and what rights you have — in compliance with Kenya's <strong>Data Protection Act, 2019</strong>.
          </p>
          <p className="mt-3">
            By using our website, submitting any form, or subscribing to our newsletter, you agree to the terms
            of this Privacy Policy. If you do not agree, please do not use our website.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">

          <Section number="1" title="Who We Are">
            <p className="card-desc text-gray-700 leading-relaxed">
              <strong>Business Name:</strong> Simon Designs<br />
              <strong>Website:</strong> simondesigns.co.ke<br />
              <strong>Location:</strong> Nairobi, Kenya<br />
              <strong>Contact:</strong>{' '}
              <a href="mailto:simondesigns052@gmail.com" className="underline" style={{ color: '#048F02' }}>
                simondesigns052@gmail.com
              </a>
            </p>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              We publish <strong>The Leadership Review</strong>, a digital newspaper celebrating exemplary
              Kenyan leadership, as part of our portfolio of services.
            </p>
          </Section>

          <Section number="2" title="What Information We Collect">
            <p className="card-desc text-gray-700 leading-relaxed">We collect personal information only when you voluntarily provide it. This includes:</p>

            <SubSection title="a) Contact Form">
              <p className="card-desc text-gray-700 leading-relaxed">When you send us a message, we collect your <strong>name</strong>, <strong>email address</strong>, <strong>phone number</strong> (optional), and the <strong>content of your message</strong>.</p>
            </SubSection>

            <SubSection title="b) Newsletter Subscription">
              <p className="card-desc text-gray-700 leading-relaxed">When you subscribe to The Leadership Review newsletter, we collect your <strong>email address</strong> and <strong>subscription preferences</strong>.</p>
            </SubSection>

            <SubSection title="c) Leadership Nomination Form">
              <p className="card-desc text-gray-700 leading-relaxed">When you nominate a leader, we collect your <strong>name</strong>, <strong>email</strong>, <strong>phone number</strong> (optional), <strong>county</strong>, and information about the <strong>leader being nominated</strong> including their name, position, and reasons for nomination.</p>
            </SubSection>

            <SubSection title="d) Payment Information">
              <p className="card-desc text-gray-700 leading-relaxed">Payments are processed by <strong>IntaSend</strong>, a third-party payment processor. We do not store your card or M-Pesa details. IntaSend's own privacy policy governs how your payment information is handled.</p>
            </SubSection>

            <SubSection title="e) Automatically Collected Information">
              <p className="card-desc text-gray-700 leading-relaxed">When you visit our website, we may automatically collect your <strong>IP address</strong>, <strong>browser type</strong>, <strong>pages visited</strong>, and <strong>time spent on pages</strong> through our live chat provider (Tawk.to) and standard web server logs. This is not linked to your personal identity.</p>
            </SubSection>
          </Section>

          <Section number="3" title="How We Use Your Information">
            <p className="card-desc text-gray-700 leading-relaxed">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 card-desc text-gray-700">
              <li>To respond to your enquiries and provide design services you have requested</li>
              <li>To send you The Leadership Review newsletter if you have subscribed (you may unsubscribe at any time)</li>
              <li>To review and process leadership nominations for The Leadership Review</li>
              <li>To process payments for design services through IntaSend</li>
              <li>To improve our website content and user experience</li>
              <li>To comply with legal obligations under Kenyan law</li>
            </ul>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              We will <strong>never</strong> sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </Section>

          <Section number="4" title="Legal Basis for Processing">
            <p className="card-desc text-gray-700 leading-relaxed">Under Kenya's Data Protection Act 2019, we process your personal data on the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 card-desc text-gray-700">
              <li><strong>Consent</strong> — when you submit a form, subscribe, or contact us</li>
              <li><strong>Legitimate interests</strong> — to improve our website and respond to enquiries</li>
              <li><strong>Contract</strong> — to fulfil design service agreements with clients</li>
              <li><strong>Legal obligation</strong> — where required to comply with Kenyan law</li>
            </ul>
          </Section>

          <Section number="5" title="How We Store Your Information">
            <p className="card-desc text-gray-700 leading-relaxed">
              Information submitted through our website is stored in <strong>Sanity CMS</strong>, a cloud-based
              content management system hosted on secure servers with encryption in transit (HTTPS) and at rest.
            </p>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              We retain your personal data only for as long as necessary. Contact enquiries are retained for up to <strong>2 years</strong>.
              Newsletter subscriber data is retained until you unsubscribe. Nomination data is retained for up to <strong>3 years</strong> for editorial reference.
            </p>
          </Section>

          <Section number="6" title="Third-Party Services">
            <p className="card-desc text-gray-700 leading-relaxed">Our website uses the following third-party services that may process your data:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 card-desc text-gray-700">
              <li><strong>Sanity CMS</strong> — stores form submissions and website content (sanity.io)</li>
              <li><strong>IntaSend</strong> — processes payments for design services (intasend.com)</li>
              <li><strong>Tawk.to</strong> — provides live chat functionality and may collect your IP address and chat messages (tawk.to)</li>
              <li><strong>Netlify</strong> — hosts our website and processes web server requests (netlify.com)</li>
              <li><strong>Google Fonts</strong> — serves web fonts and may log font requests (fonts.google.com)</li>
            </ul>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              Each of these services has its own privacy policy. We are not responsible for the privacy practices of third-party services.
            </p>
          </Section>

          <Section number="7" title="Cookies">
            <p className="card-desc text-gray-700 leading-relaxed">Our website uses cookies to improve your experience. Specifically:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 card-desc text-gray-700">
              <li><strong>Tawk.to live chat</strong> — uses cookies to maintain your chat session</li>
              <li><strong>Session cookies</strong> — used to remember your newsletter subscription confirmation status</li>
            </ul>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              We do not use advertising or tracking cookies. You can control cookies through your browser settings, though disabling them may affect some website functionality.
            </p>
          </Section>

          <Section number="8" title="Your Rights Under the Data Protection Act 2019">
            <p className="card-desc text-gray-700 leading-relaxed">As a data subject under Kenyan law, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 card-desc text-gray-700">
              <li><strong>Right of access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification</strong> — request correction of inaccurate data</li>
              <li><strong>Right to erasure</strong> — request deletion of your personal data</li>
              <li><strong>Right to object</strong> — object to processing of your data for certain purposes</li>
              <li><strong>Right to withdraw consent</strong> — unsubscribe from our newsletter at any time using the unsubscribe link in any email</li>
            </ul>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:simondesigns052@gmail.com" className="underline" style={{ color: '#048F02' }}>
                simondesigns052@gmail.com
              </a>. We will respond within <strong>30 days</strong>.
            </p>
          </Section>

          <Section number="9" title="Children's Privacy">
            <p className="card-desc text-gray-700 leading-relaxed">
              Our website is not directed at children under the age of 18. We do not knowingly collect
              personal information from children. If you believe a child has submitted personal information
              to us, please contact us immediately and we will delete it.
            </p>
          </Section>

          <Section number="10" title="Changes to This Privacy Policy">
            <p className="card-desc text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will update the
              "Last updated" date at the top of this page. Continued use of our website after any
              changes constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section number="11" title="Contact Us">
            <p className="card-desc text-gray-700 leading-relaxed">
              If you have any questions or requests regarding this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 rounded-xl p-5 card-desc" style={{ background: '#048F0208', border: '1.5px solid #048F0220' }}>
              <p className="font-bold text-gray-800">Simon Designs</p>
              <p className="text-gray-700">Nairobi, Kenya</p>
              <p className="text-gray-700">
                Email:{' '}
                <a href="mailto:simondesigns052@gmail.com" className="underline" style={{ color: '#048F02' }}>
                  simondesigns052@gmail.com
                </a>
              </p>
              <p className="text-gray-700">
                Website:{' '}
                <a href="https://simondesigns.co.ke" className="underline" style={{ color: '#048F02' }}>
                  simondesigns.co.ke
                </a>
              </p>
            </div>
          </Section>

        </div>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 card-desc text-gray-500">
          <p>© {new Date().getFullYear()} Simon Designs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms-of-service" className="link-text hover:underline transition-colors" style={{ color: '#048F02' }}>Terms of Service</Link>
            <Link href="/" className="link-text hover:underline transition-colors" style={{ color: '#048F02' }}>Home</Link>
          </div>
        </div>

      </div>
    </main>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="card-title text-gray-900 mb-4 flex items-center gap-3" style={{ fontSize: '1.1rem' }}>
        <span className="flex-shrink-0 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: '#EF6203' }}>
          {number}
        </span>
        {title}
      </h2>
      <div className="pl-10 space-y-3">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="card-title text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}