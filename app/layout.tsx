import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { CountryPreferenceProvider } from "@/components/landing/CountryPreferenceProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  CONTACT_EMAIL,
  CONTENT_UPDATED,
  EDITORIAL_EMAIL,
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  POSTAL_ADDRESS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/siteConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#176b5b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/icon1.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/icon1.svg',
    apple: '/icon1.svg',
  },
  title: {
    default: "Citizenship Test Practice — USCIS, UK, Canada & Australia",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free citizenship test practice for USCIS, Life in the UK, Discover Canada and Our Common Bond. Timed mock exams with instant answers.",
  authors: [{ name: `${SITE_NAME} Editorial Team`, url: `${SITE_URL}/about-us` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      "x-default": SITE_URL,
    },
    types: {
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Citizenship Test Practice`,
    description:
      "Pass your citizenship exam on the first attempt. Free verified practice questions, timed mock exams, and handbook explanations for USCIS, Life in the UK, Discover Canada, and Our Common Bond.",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Citizenship Test Practice`,
    description:
      "Study official questions for USCIS, Life in the UK, Discover Canada, and Australian citizenship Our Common Bond.",
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_TAGLINE,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon1.svg`,
  },
  image: `${SITE_URL}${OG_IMAGE_PATH}`,
  description:
    "Independent educational platform delivering verified citizenship test questions and mock exams for the United States, United Kingdom, Canada, and Australia.",
  email: CONTACT_EMAIL,
  dateModified: CONTENT_UPDATED,
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer support",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      email: EDITORIAL_EMAIL,
      contactType: "editorial review and question corrections",
      availableLanguage: ["en"],
    },
  ],
  ...(SOCIAL_PROFILES.length > 0
    ? { sameAs: SOCIAL_PROFILES.map((profile) => profile.href) }
    : {}),
  ...(POSTAL_ADDRESS
    ? { address: { "@type": "PostalAddress", ...POSTAL_ADDRESS } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CountryPreferenceProvider>{children}</CountryPreferenceProvider>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WQHDMNVG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </body>
    </html>
  );
}
