'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
  retry?: () => void;
}

export default function GlobalError({ error, reset, retry }: GlobalErrorProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error('Critical root layout error in CivicPass:', error);
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

  return (
    <html lang="en">
      <head>
        <title>Application Error — CivicPass</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#176b5b" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --canvas: #f7f8f5;
                --surface: #ffffff;
                --ink: #172521;
                --body: #53625d;
                --muted: #82908a;
                --line: #dfe7e1;
                --accent: #176b5b;
                --accent-dark: #0d4c41;
                --danger: #c45454;
              }
              * { box-sizing: border-box; margin: 0; padding: 0; }
              body {
                background: var(--canvas);
                color: var(--ink);
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                line-height: 1.5;
              }
              .box {
                background: var(--surface);
                border: 1px solid var(--line);
                border-radius: 20px;
                padding: clamp(32px, 6vw, 56px);
                max-width: 540px;
                width: 100%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(23, 37, 33, 0.06);
              }
              .mark {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                border-radius: 14px;
                background: var(--accent);
                color: #ffffff;
                font-weight: 800;
                font-size: 16px;
                margin-bottom: 20px;
                letter-spacing: -0.02em;
              }
              .badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 12px;
                border-radius: 999px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                background: #fef2f2;
                border: 1px solid #fecaca;
                color: #b91c1c;
                margin-bottom: 16px;
              }
              h1 {
                font-size: clamp(1.6rem, 3.5vw, 2.1rem);
                letter-spacing: -0.04em;
                line-height: 1.2;
                color: var(--ink);
                margin-bottom: 12px;
              }
              p {
                color: var(--body);
                font-size: 15px;
                line-height: 1.6;
                margin-bottom: 24px;
              }
              .digest {
                display: inline-block;
                padding: 6px 12px;
                background: #f0f3ef;
                border: 1px solid var(--line);
                border-radius: 8px;
                font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
                font-size: 11px;
                color: var(--body);
                margin-bottom: 24px;
                word-break: break-all;
              }
              .actions {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                justify-content: center;
              }
              button, .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 12px 22px;
                border-radius: 999px;
                font-size: 14px;
                font-weight: 600;
                text-decoration: none;
                cursor: pointer;
                transition: transform 0.15s, background 0.15s;
              }
              .btn-primary {
                background: var(--accent);
                color: #ffffff;
                border: none;
              }
              .btn-primary:hover {
                background: var(--accent-dark);
              }
              .btn-secondary {
                background: var(--surface);
                color: var(--ink);
                border: 1px solid var(--line);
              }
              .btn-secondary:hover {
                background: #f7f8f5;
              }
            `,
          }}
        />
      </head>
      <body>
        <main className="box">
          <div className="mark">CP</div>
          <div>
            <span className="badge">Critical Recovery Mode</span>
          </div>
          <h1>CivicPass encountered a core application error</h1>
          <p>
            An issue prevented the main application shell from rendering. You can attempt to restore your session or reload the core platform.
          </p>

          {error?.digest && (
            <div className="digest">
              Digest ID: <strong>{error.digest}</strong>
            </div>
          )}

          <div className="actions">
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              className="btn-primary"
            >
              {isRetrying ? 'Restoring...' : 'Try Again'}
            </button>
            <Link
              href="/"
              className="btn-secondary"
            >
              Return to Homepage
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
