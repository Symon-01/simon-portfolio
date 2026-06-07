import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Simon Designs",
  description: "Read the terms and conditions governing use of the Simon Designs website and design services.",
  openGraph: {
    title: "Terms of Service | Simon Designs",
    description: "Terms and conditions for using Simon Designs website and services.",
    url: "https://simondesigns.co.ke/terms-of-service",
  },
};

export default function TermsOfServicePage() {
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
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: '#048F0215', color: '#048F02' }}>
            Legal
          </div>
          <h1 className="section-title font-bold text-gray-900">Terms of Service</h1>
          <p className="section-desc text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Last updated: <span className="font-semibold">{lastUpdated}</span>
          </p>
          <div className="mt-4 h-0.5 max-w-2xl mx-auto" style={{ background: 'linear-gradient(to right, transparent, #048F02, transparent)' }} />
        </div>

        {/* Intro box */}
        <div className="rounded-2xl p-6 mb-10 card-desc leading-relaxed text-gray-700" style={{ background: '#048F0208', border: '1.5px solid #048F0220' }}>
          <p>
            These Terms of Service (<strong>"Terms"</strong>) govern your use of the Simon Designs website
            at <strong>simondesigns.co.ke</strong> and any design services provided by Simon Designs. By
            accessing our website or engaging our services, you agree to be bound by these Terms. If you
            do not agree, please do not use our website or services.
          </p>
          <p className="mt-3">
            These Terms are governed by the laws of <strong>Kenya</strong>.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">

          <Section number="1" title="About Simon Designs">
            <p className="card-desc text-gray-700 leading-relaxed">
              Simon Designs is a professional graphic design studio based in Nairobi, Kenya. We provide
              graphic design services including brand identity design, marketing materials, print and
              publishing, UI/UX design, and related creative services. We also publish{' '}
              <strong>The Leadership Review</strong>, a digital newspaper celebrating exemplary Kenyan leadership.
            </p>
          </Section>

          <Section number="2" title="Use of This Website">
            <p className="card-desc text-gray-700 leading-relaxed">You agree to use this website only for lawful purposes and in a manner that does not:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 card-desc text-gray-700">
              <li>Infringe the rights of Simon Designs or any third party</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
              <li>Attempt to gain unauthorised access to any part of the website or its systems</li>
              <li>Introduce viruses, malware, or any other harmful code</li>
              <li>Impersonate Simon Designs or any of its staff or clients</li>
              <li>Scrape, copy, or reproduce website content without written permission</li>
            </ul>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              We reserve the right to restrict or terminate access to the website for anyone who violates these Terms.
            </p>
          </Section>

          <Section number="3" title="Intellectual Property">
            <SubSection title="a) Our Content">
              <p className="card-desc text-gray-700 leading-relaxed">
                All content on this website — including logos, design work, portfolio images, artwork,
                The Leadership Review publications, text, graphics, and code — is the intellectual property
                of Simon Designs or its clients and is protected under Kenyan and international copyright law.
              </p>
              <p className="card-desc text-gray-700 leading-relaxed mt-2">
                You may not reproduce, distribute, modify, or create derivative works from any content on
                this website without our prior written consent.
              </p>
            </SubSection>
            <SubSection title="b) Client Work">
              <p className="card-desc text-gray-700 leading-relaxed">
                Design work created for clients remains the intellectual property of Simon Designs until
                full payment is received. Upon full payment, agreed intellectual property rights transfer
                to the client as specified in the individual service agreement.
              </p>
            </SubSection>
            <SubSection title="c) The Leadership Review">
              <p className="card-desc text-gray-700 leading-relaxed">
                All issues, articles, images, and content published under The Leadership Review are owned
                by Simon Designs. Reproduction of any Leadership Review content without written permission
                is prohibited.
              </p>
            </SubSection>
          </Section>

          <Section number="4" title="Design Services">
            <SubSection title="a) Engagement">
              <p className="card-desc text-gray-700 leading-relaxed">
                Engaging Simon Designs for design work is subject to a separate service agreement or
                quotation. These Terms apply alongside any such agreement.
              </p>
            </SubSection>
            <SubSection title="b) Payment">
              <p className="card-desc text-gray-700 leading-relaxed">
                Payment for design services is due as specified in the quotation or invoice. We accept
                payments via M-Pesa and card through our payment processor, IntaSend. A deposit may be
                required before work commences. Failure to make payment may result in work being paused
                or intellectual property rights being withheld.
              </p>
            </SubSection>
            <SubSection title="c) Revisions">
              <p className="card-desc text-gray-700 leading-relaxed">
                The number of revisions included in any design project is as specified in the quotation.
                Additional revisions beyond the agreed scope will be charged separately.
              </p>
            </SubSection>
            <SubSection title="d) Turnaround Time">
              <p className="card-desc text-gray-700 leading-relaxed">
                Estimated delivery timelines are provided in good faith and are not guaranteed unless
                explicitly stated in a written agreement. Delays caused by late feedback or material
                provision from the client do not constitute a breach by Simon Designs.
              </p>
            </SubSection>
            <SubSection title="e) Refunds">
              <p className="card-desc text-gray-700 leading-relaxed">
                Due to the custom nature of design work, deposits are non-refundable once work has
                commenced. Disputes regarding completed work should be raised within 7 days of delivery.
              </p>
            </SubSection>
          </Section>

          <Section number="5" title="The Leadership Review — Nominations">
            <p className="card-desc text-gray-700 leading-relaxed">Submitting a nomination constitutes agreement to the following:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 card-desc text-gray-700">
              <li>You confirm that the information provided is accurate to the best of your knowledge</li>
              <li>Submission does not guarantee publication — all nominations are subject to editorial review</li>
              <li>Simon Designs reserves the right to accept, reject, or modify any nomination</li>
              <li>Simon Designs may contact you for additional information regarding a nomination</li>
              <li>Nominated leaders may be contacted for comment or verification before publication</li>
              <li>Simon Designs is not liable for any consequences arising from the publication of a profile</li>
            </ul>
          </Section>

          <Section number="6" title="Newsletter Subscription">
            <p className="card-desc text-gray-700 leading-relaxed">
              By subscribing to The Leadership Review newsletter, you agree to receive periodic email
              updates from Simon Designs. You may unsubscribe at any time by clicking the unsubscribe
              link in any email. We will not send spam or share your email address with third parties
              for marketing purposes.
            </p>
          </Section>

          <Section number="7" title="Third-Party Links">
            <p className="card-desc text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites including social media platforms,
              IntaSend, and external news sources. These links are provided for convenience only.
              Simon Designs does not endorse and is not responsible for the content, privacy practices,
              or reliability of any third-party website. Visiting third-party links is at your own risk.
            </p>
          </Section>

          <Section number="8" title="Disclaimer of Warranties">
            <p className="card-desc text-gray-700 leading-relaxed">
              This website is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis
              without warranties of any kind. Simon Designs does not warrant that the website will be
              uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              While we make every effort to ensure the accuracy of content on this website, we do not
              guarantee that all information is complete, current, or error-free.
            </p>
          </Section>

          <Section number="9" title="Limitation of Liability">
            <p className="card-desc text-gray-700 leading-relaxed">
              To the fullest extent permitted by Kenyan law, Simon Designs shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use of
              this website or our services, including loss of revenue, loss of data, or loss of business opportunity.
            </p>
            <p className="card-desc text-gray-700 leading-relaxed mt-3">
              Our total liability for any claim arising from design services shall not exceed the amount
              paid by you for those specific services.
            </p>
          </Section>

          <Section number="10" title="Governing Law and Disputes">
            <p className="card-desc text-gray-700 leading-relaxed">
              These Terms are governed by the laws of <strong>Kenya</strong>. Any dispute arising from
              these Terms or your use of our website or services shall first be attempted to be resolved
              through good-faith negotiation. If unresolved, disputes shall be subject to the jurisdiction
              of the courts of Kenya.
            </p>
          </Section>

          <Section number="11" title="Changes to These Terms">
            <p className="card-desc text-gray-700 leading-relaxed">
              We reserve the right to update these Terms at any time. When we do, we will update the
              "Last updated" date at the top of this page. Continued use of our website after any
              changes constitutes your acceptance of the updated Terms.
            </p>
          </Section>

          <Section number="12" title="Contact Us">
            <p className="card-desc text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 rounded-xl p-5 card-desc" style={{ background: '#EF620308', border: '1.5px solid #EF620320' }}>
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
            <Link href="/privacy-policy" className="link-text hover:underline transition-colors" style={{ color: '#048F02' }}>Privacy Policy</Link>
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
        <span className="flex-shrink-0 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: '#048F02' }}>
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