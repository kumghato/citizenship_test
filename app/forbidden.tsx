import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  ShieldAlert,
  ArrowLeft,
  BookOpen,
  MessageSquare,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '403 — Access Forbidden',
  description:
    'You do not have permission to access the requested citizenship test resource or session.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Forbidden() {
  return (
    <div className="site-shell content-page">
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
                  <span aria-current="page">Error 403</span>
                </li>
              </ol>
            </nav>

            {/* Error Badge */}
            <div>
              <span className="error-badge-pill error-badge-pill--warning">
                <ShieldAlert size={14} />
                Error 403 · Access Forbidden
              </span>
            </div>

            {/* Big 403 Code */}
            <div className="error-display-code" aria-hidden="true">
              403
            </div>

            {/* Title & Description */}
            <h1 className="error-title">Access to this resource is restricted</h1>
            <p className="error-lead">
              You do not have the required permissions to access this exam administration or candidate resource. If you believe this is an error, please verify your session or contact our editorial desk.
            </p>

            {/* Primary Action Buttons */}
            <div className="error-actions-group">
              <Link href="/" className="button-primary">
                <ArrowLeft size={16} />
                Return to Homepage
              </Link>
              <Link href="/#tracks" className="button-secondary">
                <BookOpen size={16} />
                Browse Public Practice Tests
              </Link>
              <Link href="/contact-us" className="button-secondary">
                <MessageSquare size={16} />
                Contact Support Desk
              </Link>
            </div>

            {/* Guidance card */}
            <div
              style={{
                maxWidth: '640px',
                margin: '32px auto 0',
                padding: '20px 24px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#fff8eb',
                  border: '1px solid #fed7aa',
                  color: '#b45309',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <Lock size={18} />
              </div>
              <div style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--ink)' }}>Need to take an official practice test?</strong>
                <br />
                All 4 citizenship mock exams (USCIS 🇺🇸, Life in the UK 🇬🇧, Discover Canada 🇨🇦, and Our Common Bond 🇦🇺) are 100% free, require no private credentials, and can be started immediately from the homepage.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
