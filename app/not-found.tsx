import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  FileQuestion,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civicpass.org';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description:
    'The requested citizenship examination prep page could not be located. Access verified practice tests for USCIS (USA), Life in the UK (UK), Discover Canada, and Our Common Bond (Australia).',
  robots: {
    index: false,
    follow: true,
  },
};

const EXAM_TRACKS = [
  {
    country: 'United States',
    exam: 'USCIS Civics Exam',
    flag: '🇺🇸',
    href: '/test/us',
    desc: 'Official 100 civics questions, principles of American democracy, history, and integrated oral civics practice.',
    meta: '100 Question Bank · 60% Pass Mark',
  },
  {
    country: 'United Kingdom',
    exam: 'Life in the UK Test',
    flag: '🇬🇧',
    href: '/test/uk',
    desc: 'Official handbook questions covering British values, history, culture, government, and 45-minute timed mock exams.',
    meta: '24 Questions · 75% Pass Mark',
  },
  {
    country: 'Canada',
    exam: 'Discover Canada Test',
    flag: '🇨🇦',
    href: '/test/ca',
    desc: 'Canadian rights, system of government, Indigenous history, geography, and 20-question randomized evaluations.',
    meta: '20 Questions · 75% Pass Mark',
  },
  {
    country: 'Australia',
    exam: 'Our Common Bond Test',
    flag: '🇦🇺',
    href: '/test/au',
    desc: 'Australian democratic beliefs, rights, liberties, laws, and mandatory Australian values questions.',
    meta: '20 Questions · 75% Pass Mark',
  },
];

export default function NotFound() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
        name: '404 - Not Found',
        item: `${siteUrl}/404`,
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

      <main className="flex-1">
        <section className="error-hero">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="breadcrumbs" aria-label="Breadcrumb navigation" style={{ justifyContent: 'center' }}>
              <ol style={{ display: 'inline-flex' }}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span aria-current="page">Error 404</span>
                </li>
              </ol>
            </nav>

            {/* Error Badge */}
            <div>
              <span className="error-badge-pill error-badge-pill--warning">
                <FileQuestion size={14} />
                Error 404 · Page Not Found
              </span>
            </div>

            {/* Big 404 Code */}
            <div className="error-display-code" aria-hidden="true">
              404
            </div>

            {/* Title & Description */}
            <h1 className="error-title">We couldn&apos;t find that examination page</h1>
            <p className="error-lead">
              The resource you are looking for may have been moved, renamed, or is temporarily unavailable. Jump straight into one of our verified citizenship practice tracks below or head back to the main lobby.
            </p>

            {/* Primary Action Buttons */}
            <div className="error-actions-group">
              <Link href="/" className="button-primary">
                <ArrowLeft size={16} />
                Return to Homepage
              </Link>
              <Link href="/#tracks" className="button-secondary">
                <BookOpen size={16} />
                Explore All Exam Tracks
              </Link>
              <Link href="/contact-us" className="button-secondary">
                <MessageSquare size={16} />
                Report Broken Link
              </Link>
            </div>

            {/* Quick Practice Tracks Grid */}
            <div className="error-tracks-section">
              <h2 className="error-tracks-heading">
                Verified Citizenship Practice Tracks
              </h2>

              <div className="error-tracks-grid">
                {EXAM_TRACKS.map((track) => (
                  <Link
                    key={track.href}
                    href={track.href}
                    className="error-track-card"
                    title={`Start ${track.exam}`}
                  >
                    <div className="error-track-card__header">
                      <span className="error-track-card__flag" aria-hidden="true">
                        {track.flag}
                      </span>
                      <div>
                        <div className="error-track-card__title">{track.country}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>
                          {track.exam}
                        </div>
                      </div>
                    </div>
                    <p className="error-track-card__desc">{track.desc}</p>
                    <div className="error-track-card__meta">
                      <span>{track.meta}</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Additional Resource Callout */}
            <div
              style={{
                marginTop: '36px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                fontSize: '13px',
                color: 'var(--body)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="var(--accent)" />
                Need study guides? <Link href="/#exam-guides" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}>Browse Official Guides</Link>
              </span>
              <span style={{ color: 'var(--line)' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={14} color="var(--accent)" />
                Questions about pass rates? <Link href="/#faq" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}>Read the FAQ</Link>
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
