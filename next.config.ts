import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy for the pages this app renders. Next injects inline
 * bootstrap scripts and the RSC payload, so 'unsafe-inline' is required;
 * 'unsafe-eval' is only added for the development server.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://api.web3forms.com",
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const cacheablePages = [
  "/",
  "/about-us",
  "/contact-us",
  "/editorial-policy",
  "/privacy-policy",
  "/terms-conditions",
];

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY:
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY ||
      "",
  },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
      // Static editorial pages change rarely: let the edge hold them briefly
      // so repeat visits skip a full render.
      ...cacheablePages.map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      })),
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "citizenship-test\\.kumghatokhala11\\.workers\\.dev",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: ".*\\.workers\\.dev",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        statusCode: 301,
      },
      {
        source: "/terms",
        destination: "/terms-conditions",
        statusCode: 301,
      },
      {
        source: "/about",
        destination: "/about-us",
        statusCode: 301,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
