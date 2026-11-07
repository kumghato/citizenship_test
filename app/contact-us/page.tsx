import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import {
  FileCheck2,
  Clock,
  Shield,
  HelpCircle,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civicpass.org';
const pageUrl = `${siteUrl}/contact-us`;

export const metadata: Metadata = {
  title: 'Contact Us — Support, Question Audits & Editorial Inquiries',
  description:
    'Contact the CivicPass team. Have questions about citizenship test practice, need to report an updated elected official or question correction, or seeking technical support? We reply within 24-48 hours.',
  keywords: [
    'Contact CivicPass',
    'citizenship test feedback',
    'report citizenship question error',
    'USCIS test questions support',
    'Life in the UK test help',
    'CivicPass contact email',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Contact Us — CivicPass',
    description:
      'We welcome feedback from future citizens, educators, and researchers. Contact our editorial and support team.',
    siteName: 'CivicPass',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us — CivicPass',
    description: 'Get in touch with the CivicPass editorial and support team.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact Us',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ContactPage',
        '@id': `${pageUrl}#contactpage`,
        url: pageUrl,
        name: 'Contact Us — CivicPass',
        description:
          'Contact channels and inquiry form for the CivicPass citizenship examination preparation platform.',
        mainEntity: {
          '@type': 'EducationalOrganization',
          name: 'CivicPass',
          url: siteUrl,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              email: 'support@civicpass.org',
              contactType: 'customer support',
              availableLanguage: ['en'],
            },
            {
              '@type': 'ContactPoint',
              email: 'editorial@civicpass.org',
              contactType: 'editorial review and question corrections',
              availableLanguage: ['en'],
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="site-shell content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main>
        {/* Header Hero */}
        <section className="content-page-hero">
          <div className="container">
            <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span aria-current="page">Contact Us</span>
                </li>
              </ol>
            </nav>

            <span className="eyebrow">Support &amp; Editorial Inquiries</span>
            <h1 className="content-hero__title">We&apos;re here to help you succeed.</h1>
            <p className="content-hero__lead">
              Have feedback on a question explanation, noticed an elected official change, or need technical help? Our editorial and support team is dedicated to keeping citizenship prep accurate and accessible.
            </p>

            <div className="content-meta-bar">
              <span className="content-meta-badge">
                <Clock size={13} />
                Typical Response: 24–48 Business Hours
              </span>
              <span>•</span>
              <span>Editorial Question Review Desk Active</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="content-main-section">
          <div className="container">
            {/* Quick Contact Channel Cards */}
            <div className="contact-channels-grid">
              <div className="contact-channel-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 8 }}>
                    <FileCheck2 size={18} />
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Question Audits</span>
                  </div>
                  <h3>Editorial Review</h3>
                  <p>Found a question whose answer changed following a recent election or handbook update?</p>
                </div>
                <a href="mailto:editorial@civicpass.org">editorial@civicpass.org</a>
              </div>

              <div className="contact-channel-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 8 }}>
                    <MessageSquare size={18} />
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Help Desk</span>
                  </div>
                  <h3>General Support</h3>
                  <p>Questions about our practice tests, score calculations, or platform features?</p>
                </div>
                <a href="mailto:support@civicpass.org">support@civicpass.org</a>
              </div>

              <div className="contact-channel-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 8 }}>
                    <Shield size={18} />
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Data Compliance</span>
                  </div>
                  <h3>Privacy Officer</h3>
                  <p>Questions regarding our privacy-first architecture, GDPR requests, or CCPA rights?</p>
                </div>
                <a href="mailto:privacy@civicpass.org">privacy@civicpass.org</a>
              </div>
            </div>

            {/* Layout Grid: Form + FAQ/Sidebar */}
            <div className="contact-layout-grid" id="feedback">
              {/* Left: Contact Form Card */}
              <div className="content-card">
                <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: '1.5rem', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
                  Send Our Team a Message
                </h2>
                <p style={{ marginTop: 0, marginBottom: 24, fontSize: 14, color: 'var(--body)', lineHeight: 1.6 }}>
                  Complete the form below and our team will direct your inquiry to the appropriate subject specialist.
                </p>

                <ContactForm />
              </div>

              {/* Right: Quick Answers & Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="content-card" style={{ padding: 28 }}>
                  <h3 style={{ marginTop: 0, marginBottom: 14, fontSize: 16, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <HelpCircle size={18} color="var(--accent)" />
                    Quick Answers Before You Write
                  </h3>

                  <div style={{ display: 'grid', gap: 14, fontSize: 13, lineHeight: 1.55 }}>
                    <div>
                      <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 2 }}>
                        Do I need an account to study?
                      </strong>
                      <span style={{ color: 'var(--body)' }}>
                        No. CivicPass does not require registration, passwords, or emails to take full practice exams.
                      </span>
                    </div>

                    <div>
                      <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 2 }}>
                        Can CivicPass schedule my interview?
                      </strong>
                      <span style={{ color: 'var(--body)' }}>
                        No. CivicPass is an independent educational tool. Official appointments must be booked through official government agency portals.
                      </span>
                    </div>

                    <div>
                      <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 2 }}>
                        How do I cite a question in a bug report?
                      </strong>
                      <span style={{ color: 'var(--body)' }}>
                        Simply include the question prompt or question ID in the &quot;Question ID&quot; field in the message form.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="callout-box callout-box--info" style={{ margin: 0, padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <AlertCircle size={16} />
                    <strong>Immediate Study Resources</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                    Looking for detailed breakdown of citizenship test formats? Explore our{' '}
                    <Link href="/#exam-guides" style={{ fontWeight: 600 }}>Study Guides Hub</Link> or browse the{' '}
                    <Link href="/#faq" style={{ fontWeight: 600 }}>Frequently Asked Questions</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
