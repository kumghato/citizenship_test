'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  ArrowLeft,
  AlertTriangle,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { clearAllExamStorage } from '@/lib/examStorage';

interface ExamErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
  retry?: () => void;
}

export default function ExamErrorBoundary({ error, reset, retry }: ExamErrorProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error('Citizenship exam boundary error:', error);
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

  const handleRestartFresh = () => {
    clearAllExamStorage();
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--canvas)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '580px',
          width: '100%',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(28px, 6vw, 48px)',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center',
        }}
      >
        {/* Brand mark */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <span className="brand__mark">CP</span>
          <span className="brand__wordmark" style={{ fontSize: '16px' }}>
            Civic<em>Pass</em>
          </span>
        </div>

        {/* Status badge */}
        <div>
          <span className="error-badge-pill error-badge-pill--warning">
            <AlertTriangle size={14} />
            Examination Session Paused
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 1.95rem)',
            fontWeight: 750,
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
            marginBottom: '12px',
          }}
        >
          Unable to display examination
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--body)',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}
        >
          We encountered an issue preparing the question bank or scoring your exam. Your answers are kept in your browser&apos;s session memory and have not been lost.
        </p>

        {error?.digest && (
          <div className="error-digest-box" style={{ marginBottom: '24px' }}>
            <FileText size={13} />
            <span>
              Session Digest: <strong>{error.digest}</strong>
            </span>
          </div>
        )}

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '28px',
          }}
        >
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="button-primary"
            style={{ opacity: isRetrying ? 0.8 : 1 }}
          >
            <RotateCcw size={15} className={isRetrying ? 'animate-spin' : ''} />
            {isRetrying ? 'Retrying...' : 'Resume / Retry Exam'}
          </button>

          <button
            type="button"
            onClick={handleRestartFresh}
            className="button-secondary"
          >
            <RotateCcw size={15} />
            Restart Test Fresh
          </button>

          <Link href="/" className="button-secondary">
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>

        {/* Safe notice */}
        <div
          style={{
            padding: '12px 16px',
            background: 'var(--surface-muted)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            color: 'var(--body)',
            textAlign: 'left',
          }}
        >
          <ShieldCheck size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
          <span>
            Candidate Protection: CivicPass does not charge fees or penalize scores for technical restarts.
          </span>
        </div>

        {/* Need assistance */}
        <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--muted)' }}>
          Need assistance?{' '}
          <Link
            href="/contact-us"
            style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}
          >
            Contact our editorial desk
          </Link>
        </div>
      </div>
    </div>
  );
}
