import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { FileCheck2, Mail, RefreshCw, ShieldCheck } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTENT_PUBLISHED,
  CONTENT_UPDATED,
  CONTENT_UPDATED_LABEL,
  EDITORIAL_EMAIL,
  OFFICIAL_SOURCES,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
} from '@/lib/siteConfig';

const pageUrl = `${SITE_URL}/editorial-policy`;

export const metadata: Metadata = {
  title: 'Editorial Policy — Sources, Review & Corrections',
  description:
    'How CivicPass writes and reviews citizenship practice questions: the government sources we cite, our review cycle, author credentials and how to report a correction.',
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      'x-default': pageUrl,
    },
  },
  openGraph: {
    type: 'article',
    url: pageUrl,
    siteName: SITE_NAME,
    title: 'Editorial Policy — CivicPass',
    description:
      'Our sourcing rules, review cycle and corrections process for citizenship practice material.',
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: 'CivicPass editorial policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial Policy — CivicPass',
    description: 'Sourcing, review and corrections for our citizenship practice material.',
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${pageUrl}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Editorial Policy', item: pageUrl },
  ],
};

const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: 'Editorial Policy — CivicPass',
  description:
    'The sourcing standards, review cycle and corrections process behind the CivicPass citizenship question bank.',
  datePublished: CONTENT_PUBLISHED,
  dateModified: CONTENT_UPDATED,
  inLanguage: 'en',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  author: {
    '@type': 'Organization',
    name: `${SITE_NAME} Editorial Team`,
    url: `${SITE_URL}/about-us`,
  },
  reviewedBy: {
    '@type': 'Organization',
    name: `${SITE_NAME} Editorial Team`,
    url: pageUrl,
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function EditorialPolicyPage() {
  return (
    <div className="site-shell content-page">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={pageSchema} />

      <Navbar />

      <main id="main-content">
        <section className="content-page-hero">
          <div className="container">
            <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span aria-current="page">Editorial Policy</span>
                </li>
              </ol>
            </nav>

            <span className="eyebrow">Editorial Standards</span>
            <h1 className="content-hero__title">How we write and check the answers.</h1>
            <p className="content-hero__lead">
              Practice material is only useful if it is current. This page explains who
              writes it, which official publications we work from, how often we revisit the
              library, and what happens when a reader finds a mistake.
            </p>

            <div className="content-meta-bar">
              <span className="content-meta-badge">
                <ShieldCheck size={13} />
                Independent study tool
              </span>
              <span>
                Last reviewed <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED_LABEL}</time>
              </span>
              <span>•</span>
              <span>Applies to all four country tracks</span>
            </div>
          </div>
        </section>

        <section className="content-main-section">
          <div className="container" style={{ maxWidth: 880 }}>
            <div className="stat-pills-row">
              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <FileCheck2 size={16} />
                  <strong>Two-person check</strong>
                </div>
                <span>One writer drafts an item, a second editor verifies it against the handbook.</span>
              </div>
              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <RefreshCw size={16} />
                  <strong>90-day cycle</strong>
                </div>
                <span>Every track is reviewed at least once a quarter, and after each election.</span>
              </div>
              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <Mail size={16} />
                  <strong>48-hour replies</strong>
                </div>
                <span>Corrections sent to the editorial desk are answered within two working days.</span>
              </div>
            </div>

            <article className="content-card prose-civic">
              <h2>Who writes the material</h2>
              <p>
                The {SITE_NAME} editorial team is made up of immigration educators and
                volunteers who have prepared for, or supervised, these exams in the United
                Kingdom, the United States, Canada and Australia. Writers are named
                internally on each question record, and the team as a whole is accountable
                for the published answer. We do not accept sponsored questions or paid
                placements inside the question bank.
              </p>

              <h2>Which sources we use</h2>
              <p>
                Each item is written against the government publication that sets the exam.
                We quote the relevant clause, page or section in the explanation so you can
                check it yourself.
              </p>
              <ul>
                {OFFICIAL_SOURCES.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer">
                      {source.label}
                    </a>{' '}
                    — {source.publisher}
                  </li>
                ))}
              </ul>
              <p>
                We do not cite forums, social posts, or other test-preparation websites as
                the authority for an answer. When a handbook is updated, the affected items
                are rewritten rather than patched with a note.
              </p>

              <h2>Review cycle</h2>
              <p>
                Elections are the main source of drift, because several papers ask about
                current office holders. After each scheduled election we re-check those
                items and update the answer within ten working days of the result being
                certified. Outside election periods the whole library is revisited every 90
                days, and each page shows the date it was last changed.
              </p>

              <h2>Corrections</h2>
              <p>
                Readers spot more errors than editors do, and we would rather hear about a
                mistake than keep it. Send the question text or ID to{' '}
                <a href={`mailto:${EDITORIAL_EMAIL}`}>{EDITORIAL_EMAIL}</a> and you will get
                a reply within two working days. Confirmed errors are fixed at source, and
                the page date is updated so the change is visible.
              </p>

              <h2>What we are not</h2>
              <p>
                {SITE_NAME} is an independent study tool. We are not a government agency,
                we are not affiliated with USCIS, the UK Home Office, IRCC or the Australian
                Department of Home Affairs, and nothing on this site is legal or immigration
                advice. Always confirm requirements with the issuing authority before you
                book or attend an exam.
              </p>

              <div className="callout-box callout-box--info">
                <strong>Questions about this policy?</strong>
                <br />
                Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the{' '}
                <Link href="/contact-us">contact form</Link>. Our review methodology is also
                summarised on the <Link href="/about-us#methodology">about page</Link>.
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
