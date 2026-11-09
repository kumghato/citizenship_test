import type { NextConfig } from "next";

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
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
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
