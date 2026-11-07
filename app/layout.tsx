import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://civicpass.org";
const siteUrl = rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
  ? rawSiteUrl
  : `https://${rawSiteUrl}`;

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
    default: "Citizenship Test — Free online test for USCIS, Life in the UK, Discover Canada & Our Common Bond Tests",
    template: "%s | CivicPass",
  },
  description:
    "Free citizenship practice tests: USCIS test practice & civics questions for the US citizen test, Life in the UK mock test & practice questions, Discover Canada Canadian citizenship test, and Australian citizenship Our Common Bond practice test.",
  keywords: [
    "citizenship test",
    "free citizenship test",
    "online citizenship test",
    "USCIS",
    "Life in the UK",
    "Discover Canada",
    "our common bond",
    "life in the uk test",
    "life in the uk test practice",
    "life in the uk test questions",
    "life in the uk mock test",
    "life in the uk test web",
    "our common bond practice test",
    "australian citizenship our common bond",
    "canadian citizenship",
    "canadian citizenship test",
    "uscis test questions",
    "uscis test practice",
    "us citizen test",
    "american citizen test",
    "citizenship mock test",
    "naturalization exam prep",
  ],
  authors: [{ name: "CivicPass Team", url: siteUrl }],
  creator: "CivicPass",
  publisher: "CivicPass",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CivicPass",
    title: "CivicPass — Pass USCIS, Life in the UK, Discover Canada & Our Common Bond Tests",
    description:
      "Pass your citizenship exam on the first attempt. Free verified practice tests, timed mock exams, and statutory explanations for USCIS, Life in the UK, Discover Canada, and Our Common Bond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicPass —  Citizenship Test Practice",
    description:
      "Study official questions for USCIS, Life in the UK test, Discover Canada, and Australian citizenship Our Common Bond.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
