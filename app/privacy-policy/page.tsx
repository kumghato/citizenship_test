import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civicpass.org';
const pageUrl = `${siteUrl}/privacy-policy`;

export const metadata: Metadata = {
  title: 'Privacy Policy — Data Protection & Privacy-First Architecture',
  description:
    'Read the CivicPass Privacy Policy. Learn how we handle your data with a privacy-first approach: no forced account creation, zero commercial ad tracking, local device test storage, and strict GDPR / CCPA compliance.',
  keywords: [
    'CivicPass privacy policy',
    'citizenship test privacy',
    'educational software data protection',
    'GDPR compliance citizenship test',
    'CCPA privacy notice',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Privacy Policy — CivicPass Citizenship Test Practice',
    description:
      'We believe preparing for your citizenship exam should be private. Learn how CivicPass protects user data with local-first progress storage and no forced registration.',
    siteName: 'CivicPass',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy — CivicPass',
    description: 'Privacy-first citizenship test preparation. Learn how your data is protected.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Privacy Policy',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Privacy Policy — CivicPass',
        description:
          'Official Privacy Policy and data protection disclosures for the CivicPass citizenship examination preparation platform.',
        publisher: {
          '@type': 'Organization',
          name: 'CivicPass',
          url: siteUrl,
        },
        inLanguage: 'en',
      },
    ],
  };

  return (
    <div className="site-shell content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main>
        {/* Header Hero */}
        <section className="content-page-hero">
          <div className="container">
            <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span aria-current="page">Privacy Policy</span>
                </li>
              </ol>
            </nav>

            <span className="eyebrow">Data Protection &amp; Privacy-First Architecture</span>
            <h1 className="content-hero__title">CivicPass Privacy Policy</h1>
            <p className="content-hero__lead">
              We believe preparing for one of the most important exams of your life should never require compromising your personal privacy. Here is a clear, transparent explanation of how CivicPass collects, protects, and handles your information.
            </p>

            <div className="content-meta-bar">
              <span className="content-meta-badge">
                <ShieldCheck size={13} />
                Effective Date: November 2026
              </span>
              <span>Version 2.4</span>
              <span>•</span>
              <span>Applicable to USCIS, Life in the UK, Discover Canada &amp; Our Common Bond tracks</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="content-main-section">
          <div className="container" style={{ maxWidth: 880 }}>
            {/* Quick Principles Callouts */}
            <div className="stat-pills-row">
              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <Lock size={16} />
                  <strong>Zero Forced Signups</strong>
                </div>
                <span>Take full timed mock tests without having to enter an email, password, or name.</span>
              </div>

              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <EyeOff size={16} />
                  <strong>Local-First Storage</strong>
                </div>
                <span>Your test answers and performance history stay stored in your browser&apos;s local storage.</span>
              </div>

              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <Server size={16} />
                  <strong>No Data Brokers</strong>
                </div>
                <span>We never sell, lease, or monetize your study activity or personal data to advertisers.</span>
              </div>
            </div>

            <article className="content-card prose-civic">
              <h2>1. Introduction &amp; Scope</h2>
              <p>
                CivicPass (&quot;CivicPass&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides an independent digital study platform designed to assist candidates preparing for government naturalization exams, including the <strong>United States USCIS Civics Test</strong>, the <strong>United Kingdom Life in the UK Test</strong>, the <strong>Canadian Discover Canada Citizenship Test</strong>, and the <strong>Australian Citizenship: Our Common Bond Examination</strong>.
              </p>
              <p>
                This Privacy Policy explains how we process information when you access our website, study guides, mock exams, and interactive rehearsal tools. By accessing or using CivicPass, you acknowledge the practices described in this document.
              </p>

              <div className="callout-box callout-box--warning">
                <strong>Important Notice Regarding Immigration Data:</strong>
                <br />
                CivicPass is an independent educational platform. We <strong>never</strong> ask for, collect, store, or process government alien registration numbers (A-Numbers), USCIS receipt numbers, passport credentials, national insurance numbers, or immigration case files. Do not submit sensitive immigration case details in any support forms.
              </div>

              <h2>2. Information We Explicitly Do Not Collect</h2>
              <p>
                Unlike many commercial study platforms that monetize candidate data, CivicPass has engineered our platform with data minimization at its core:
              </p>
              <ul>
                <li><strong>No User Account Mandate:</strong> You do not need to register, provide an email address, or link social accounts to complete practice exams or access our study guides.</li>
                <li><strong>No Sensitive Identity Credentials:</strong> We never collect government ID numbers, alien registration numbers, visa documentation, or biometrics.</li>
                <li><strong>No Financial Data:</strong> Core practice questions and mock tests on CivicPass are accessible without entering payment details or credit cards.</li>
                <li><strong>No Commercial Ad Retargeting:</strong> We do not run third-party behavioral advertising scripts that track your browsing across the web.</li>
              </ul>

              <h2>3. Information We Collect and How It Is Used</h2>
              <p>
                To maintain the stability, performance, and legal security of our platform, we collect limited categories of technical information:
              </p>
              <h3>A. Automatically Collected Technical Logs</h3>
              <p>
                When your browser requests pages, style sheets, or question data from CivicPass, our hosting servers automatically record standard HTTP server logs. This may include:
              </p>
              <ul>
                <li>Your Internet Protocol (IP) address (used strictly for network diagnostics, DDoS rate limiting, and coarse geolocation to serve local regional tracks).</li>
                <li>Browser user-agent, operating system version, and device type.</li>
                <li>Referring URLs, requested paths, and request timestamps.</li>
                <li>HTTP status codes and error rates.</li>
              </ul>
              <p>
                These logs are maintained for security analysis and operational health, and are routinely purged on an automated cycle.
              </p>

              <h3>B. Voluntary Communications &amp; Feedback</h3>
              <p>
                If you choose to submit a message via our <Link href="/contact-us">Contact Us</Link> page (for technical support, editorial question corrections, or feedback), we receive the details you enter:
              </p>
              <ul>
                <li>Your name (or pseudonym).</li>
                <li>Your email address (to reply to your inquiry).</li>
                <li>The category of inquiry, target exam track, and message body.</li>
              </ul>
              <p>
                This information is used exclusively to answer your request and improve platform accuracy. We do not add your contact email to marketing lists or distribute it to third parties.
              </p>

              <h2>4. Browser Local Storage &amp; Cookies</h2>
              <p>
                CivicPass utilizes modern browser storage capabilities (such as <code>localStorage</code> and session tokens) to enable a seamless practice experience without requiring a server-side database login:
              </p>
              <ul>
                <li><strong>Exam Progress &amp; State:</strong> When you complete an exam session, your answers and calculated score breakdown are retained directly on your device so you can view your diagnostic results.</li>
                <li><strong>UI Preferences:</strong> Test timer pacing and selected country exam tracks are saved locally in your browser.</li>
              </ul>
              <p>
                You can clear this data at any time through your browser settings by clearing site storage for <code>civicpass.org</code>.
              </p>

              <h2>5. Legal Bases for Processing (GDPR &amp; UK GDPR)</h2>
              <p>
                For individuals residing in the European Economic Area (EEA) and the United Kingdom, CivicPass processes technical data under the following legal bases:
              </p>
              <ul>
                <li><strong>Legitimate Interests:</strong> To deliver dependable educational resources, ensure server stability, prevent abuse or denial-of-service attacks, and fix technical bugs.</li>
                <li><strong>Consent:</strong> When you voluntarily submit a message to our support or editorial inbox.</li>
              </ul>

              <h2>6. Your Privacy Rights (GDPR, UK Data Protection Act &amp; CCPA/CPRA)</h2>
              <p>
                Depending on your location, you have statutory rights concerning your personal data:
              </p>
              <ul>
                <li><strong>Right of Access &amp; Portability:</strong> You may request confirmation of whether CivicPass holds any personal information relating to you and obtain a copy.</li>
                <li><strong>Right to Rectification &amp; Erasure:</strong> You have the right to request correction or immediate deletion of any correspondence or messages you have submitted to us.</li>
                <li><strong>Right to Object &amp; Restrict:</strong> You may object to or restrict processing of your technical information where applicable.</li>
                <li><strong>California Residents (CCPA/CPRA):</strong> We do not sell or share personal information. You have the right to request disclosure of data collection categories and request deletion without discrimination.</li>
              </ul>
              <p>
                To exercise any of these rights, please reach out directly through our <Link href="/contact-us">Contact Page</Link> or send an email to <code>privacy@civicpass.org</code>.
              </p>

              <h2>7. Data Security and Retention</h2>
              <p>
                We implement industry-standard administrative and technical security measures:
              </p>
              <ul>
                <li><strong>Encryption in Transit:</strong> All web traffic is strictly encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS).</li>
                <li><strong>Least-Privilege Infrastructure:</strong> Internal access to server logs and inquiry communications is restricted to authorized administrative personnel.</li>
                <li><strong>Minimal Retention:</strong> Server diagnostic logs are automatically cycled and discarded. Support inquiries are archived or deleted once resolved.</li>
              </ul>

              <h2>8. Third-Party Service Providers</h2>
              <p>
                We partner with vetted, reputable cloud hosting and edge network infrastructure providers (such as cloud platform hosts and content delivery networks) to host CivicPass and ensure high availability across global regions. These providers process data on our behalf solely to deliver edge caching, DDoS protection, and secure web serving in compliance with standard data protection agreements.
              </p>

              <h2>9. Children&apos;s Online Privacy (COPPA Compliance)</h2>
              <p>
                CivicPass is designed for adults and young adults preparing for official national citizenship exams. We do not knowingly collect personal identifiable information from children under the age of 13 (or under 16 in certain jurisdictions). If you believe a child has provided us with personal information, please notify us immediately at <code>privacy@civicpass.org</code> and we will promptly delete it.
              </p>

              <h2>10. Updates to This Privacy Policy</h2>
              <p>
                We may periodically update this policy to reflect changes in our platform features, statutory requirements, or legal standards. When modifications occur, the updated policy will be posted with an updated &quot;Effective Date&quot; at the top of this page. We encourage you to review this policy periodically.
              </p>

              <h2>11. Contact Our Privacy Team</h2>
              <p>
                If you have questions, comments, or data privacy requests regarding this Privacy Policy, please contact our data compliance coordinator:
              </p>
              <div className="callout-box callout-box--info">
                <strong>CivicPass Privacy Officer</strong>
                <br />
                Email: <code>privacy@civicpass.org</code>
                <br />
                Inquiry Form: <Link href="/contact-us">civicpass.org/contact-us</Link>
                <br />
                Response Commitment: We respond to verified data requests within 30 calendar days.
              </div>
            </article>

            {/* Bottom Nav Hint */}
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                Related Documents: Review our <Link href="/terms-conditions" style={{ color: 'var(--accent)', fontWeight: 600 }}>Terms &amp; Conditions</Link> or learn more <Link href="/about-us" style={{ color: 'var(--accent)', fontWeight: 600 }}>About CivicPass</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
