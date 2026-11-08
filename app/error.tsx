'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  AlertTriangle,
  RotateCcw,
  Home,
  MessageSquare,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset?: () => void;
  retry?: () => void;
}

export default function ErrorPage({ error, reset, retry }: ErrorPageProps) {
  const [copied, setCopied] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Log the error to console and error reporting services
    console.error('Unhandled route error in CivicPass:', error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    if (typeof retry === 'function') {
      retry();
    } else if (typeof reset === 'function') {
      reset();
    } else {
      window.location.reload();
    }
    setTimeout(() => setIsRetrying(false), 2000);
  };

  const copyDigest = () => {
    if (!error?.digest) return;
    navigator.clipboard.writeText(error.digest);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
                  <span aria-current="page">Error 500</span>
                </li>
              </ol>
            </nav>

            {/* Error Badge */}
            <div>
              <span className="error-badge-pill error-badge-pill--danger">
                <AlertTriangle size={14} />
                Error 500 · System Exception
              </span>
            </div>

            {/* Big 500 Code */}
            <div className="error-display-code" aria-hidden="true">
              500
            </div>

            {/* Title & Description */}
            <h1 className="error-title">Something went wrong on our end</h1>
            <p className="error-lead">
              We encountered an unexpected issue while loading your citizenship study session. Our engineering team has been automatically alerted. You can retry the request or return safely to the dashboard.
            </p>

            {/* Digest Code Box (if available) */}
            {error?.digest && (
              <div>
                <div className="error-digest-box" title="Error reference ID for support">
                  <ShieldAlert size={14} color="var(--accent)" />
                  <span>
                    Incident Digest: <strong>{error.digest}</strong>
                  </span>
                  <button
                    onClick={copyDigest}
                    type="button"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '2px 6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: copied ? 'var(--accent)' : 'var(--muted)',
                      cursor: 'pointer',
                      fontSize: '11px',
                    }}
                    aria-label="Copy incident digest code"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy ID'}
                  </button>
                </div>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="error-actions-group">
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="button-primary"
                style={{ opacity: isRetrying ? 0.8 : 1 }}
              >
                <RotateCcw
                  size={16}
                  className={isRetrying ? 'animate-spin' : ''}
                />
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </button>
              <Link href="/" className="button-secondary">
                <Home size={16} />
                Return to Homepage
              </Link>
              <Link
                href={`/contact-us${error?.digest ? `?digest=${encodeURIComponent(error.digest)}` : ''}`}
                className="button-secondary"
              >
                <MessageSquare size={16} />
                Contact Support Desk
              </Link>
            </div>

            {/* Troubleshooting & Assurance Section */}
            <div
              style={{
                maxWidth: '720px',
                margin: '36px auto 0',
                padding: '24px 28px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--ink)',
                  marginBottom: '12px',
                }}
              >
                <AlertTriangle size={16} color="var(--accent)" />
                Quick Troubleshooting Steps
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  color: 'var(--body)',
                  lineHeight: 1.7,
                  display: 'grid',
                  gap: '6px',
                }}
              >
                <li>
                  <strong>Candidate state safety:</strong> If you were taking a test, your selected answers are maintained in local session storage and will not be overwritten by reloading.
                </li>
                <li>
                  <strong>Network reconnect:</strong> Weak mobile connections or expired SSL handshakes can disrupt real-time question fetching. Check your connection and click <em>Try Again</em>.
                </li>
                <li>
                  <strong>Cache clear:</strong> If retrying fails, hard refresh via <kbd style={{ padding: '1px 5px', background: 'var(--surface-muted)', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '11px' }}>Ctrl + F5</kbd> (or <kbd style={{ padding: '1px 5px', background: 'var(--surface-muted)', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '11px' }}>Cmd + Shift + R</kbd>).
                </li>
              </ul>

              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--line)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--muted)',
                }}
              >
                <span>Support status: 24/7 Editorial &amp; Technical Monitoring Active</span>
                <Link
                  href="/#tracks"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--accent)',
                    fontWeight: 600,
                  }}
                >
                  Explore Practice Tracks <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
