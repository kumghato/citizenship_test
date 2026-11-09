import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { CountryPreferenceProvider } from "@/components/landing/CountryPreferenceProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://onlinecitizenshiptest.com";
const siteUrl = (
  rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
    ? rawSiteUrl
    : `https://${rawSiteUrl}`
).replace(/\/+$/, "");

export const viewport: Viewport = {
  themeColor: "#176b5b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    template: "%s | CivicPass",
  },
  description:
    "Free citizenship test practice for USCIS, Life in the UK, Discover Canada and Our Common Bond. Timed mock exams with instant answers.",
  keywords: [
    "citizenship test",
    "citizenship test practice",
    "free citizenship test",
    "online citizenship test",
    "citizenship practice questions",
    "citizenship exam prep",
    "citizenship mock test",
    "citizenship quiz",
    "naturalization test",
    "naturalization exam prep",
    "naturalization interview questions",
    "civics test",
    "civics practice questions",
    "USCIS",
    "USCIS civics test",
    "USCIS test questions",
    "USCIS test practice",
    "100 civics questions",
    "US citizen test",
    "American citizen test",
    "US naturalization test",
    "Life in the UK",
    "life in the uk test",
    "life in the uk test practice",
    "life in the uk test questions",
    "life in the uk mock test",
    "life in the uk mock exam",
    "life in the uk question bank",
    "life in the uk questions examples",
    "life in the uk preparation",
    "life in the uk learning materials",
    "life in the uk free test",
    "life in the uk english test topics",
    "life in the uk english test",
    "life in the uk test questions and answers",
    "life in the uk test web",
    "life in the uk 3rd edition handbook",
    "British citizenship test",
    "ILR test",
    "Discover Canada",
    "Canadian citizenship",
    "Canadian citizenship test",
    "Canadian citizenship test practice",
    "canadian citizenship mock test",
    "canada citizenship test practice",
    "Canadian citizenship practice questions",
    "Discover Canada practice test",
    "discover canada citizenship test",
    "discover canada test",
    "discover canada app",
    "discover canada test practice",
    "discover canada citizenship practice test",
    "IRCC citizenship test",
    "Our Common Bond",
    "Our Common Bond practice test",
    "Australian citizenship Our Common Bond",
    "Australian citizenship test",
    "Australian citizenship practice test",
    "Australian values test questions",
    "free mock exam",
  ],
  authors: [{ name: "CivicPass Team", url: siteUrl }],
  creator: "CivicPass",
  publisher: "CivicPass",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CivicPass",
    title: "CivicPass — Citizenship Test Practice",
    description:
      "Pass your citizenship exam on the first attempt. Free verified practice questions, timed mock exams, and statutory explanations for USCIS, Life in the UK, Discover Canada, and Our Common Bond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicPass — Citizenship Test Practice",
    description:
      "Study official questions for USCIS, Life in the UK, Discover Canada, and Australian citizenship Our Common Bond.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "CivicPass",
      description:
        "Official citizenship practice tests for USCIS, Life in the UK, Discover Canada, and Our Common Bond.",
      inLanguage: "en",
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "CivicPass",
      url: siteUrl,
      logo: `${siteUrl}/icon1.svg`,
      description:
        "Independent educational platform delivering verified citizenship test questions and mock exams for the United States, United Kingdom, Canada, and Australia.",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
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
