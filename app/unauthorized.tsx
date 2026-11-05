import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  Lock,
  ArrowLeft,
  BookOpen,
  MessageSquare,
  KeyRound,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '401 — Authentication Required',
  description:
    'Authentication or an active session is required to access this citizenship examination session.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Unauthorized() {
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
                  <span aria-current="page">Error 401</span>
                </li>
              </ol>
            </nav>

            {/* Error Badge */}
            <div>
              <span className="error-badge-pill error-badge-pill--warning">
                <Lock size={14} />
                Error 401 · Authentication Required
              </span>
            </div>

            {/* Big 401 Code */}
            <div className="error-display-code" aria-hidden="true">
              401
            </div>

            {/* Title & Description */}
            <h1 className="error-title">Authentication is required</h1>
            <p className="error-lead">
              You must be signed in or have an active candidate session token to view this specific exam record or administrative dashboard.
            </p>

            {/* Primary Action Buttons */}
            <div className="error-actions-group">
              <Link href="/" className="button-primary">
                <ArrowLeft size={16} />
                Return to Homepage
              </Link>
              <Link href="/#tracks" className="button-secondary">
                <BookOpen size={16} />
                Start a Free Mock Test
              </Link>
              <Link href="/contact-us" className="button-secondary">
                <MessageSquare size={16} />
                Contact Helpdesk
              </Link>
            </div>

            {/* Help Callout */}
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
                  background: 'var(--accent-soft)',
                  border: '1px solid #b7dfd2',
                  color: 'var(--accent-dark)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <KeyRound size={18} />
              </div>
              <div style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--ink)' }}>No login needed for practice tests</strong>
                <br />
                All official study questions, statutory legal citations, oral question simulators, and scored results are free and open to everyone without requiring registration.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
