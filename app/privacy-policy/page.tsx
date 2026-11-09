import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ShieldCheck, Lock, CreditCard, Cpu } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onlinecitizenshiptest.com';
const pageUrl = `${siteUrl}/privacy-policy`;

export const metadata: Metadata = {
  title: 'Privacy Policy — Private, Client-Side Prep',
  description:
    'Read the CivicPass privacy policy: no credit card details, no sensitive personal data or immigration records, and all practice progress stays on your device.',
  keywords: [
    'CivicPass privacy policy',
    'citizenship test privacy',
    'no credit card required',
    'no sensitive personal data',
    'client side citizenship test',
    'educational software data protection',
    'GDPR compliance citizenship test',
    'CCPA privacy notice',
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      'x-default': pageUrl,
    },
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Privacy Policy — CivicPass Citizenship Test Practice',
    description:
      'Preparing for your citizenship exam should be private. Everything is client side: zero credit cards collected, no sensitive personal data asked, and local-first progress storage.',
    siteName: 'CivicPass',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy — CivicPass',
    description:
      'Everything is client side: no credit cards, no sensitive personal data, and 100% client-side citizenship test rehearsal.',
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
          'Official Privacy Policy and client-side data protection disclosures for the CivicPass citizenship examination preparation platform.',
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

            <span className="eyebrow">100% Client-Side Architecture &amp; Data Protection</span>
            <h1 className="content-hero__title">CivicPass Privacy Policy</h1>
            <p className="content-hero__lead">
              We believe preparing for your citizenship exam should be private, secure, and completely barrier-free. CivicPass is built on a 100% client-side architecture: <strong>we do not collect credit card details</strong>, <strong>we never ask for sensitive personal data</strong>, and all exam simulations, answers, and scores run strictly on your device.
            </p>

            <div className="content-meta-bar">
              <span className="content-meta-badge">
                <ShieldCheck size={13} />
                Effective Date: November 2026
              </span>
              <span>Version 2.5</span>
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
                  <Cpu size={16} />
                  <strong>100% Client-Side</strong>
                </div>
                <span>All test simulations, timer pacing, answers, and score evaluations run entirely in your browser.</span>
              </div>

              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <CreditCard size={16} />
                  <strong>No Credit Cards</strong>
                </div>
                <span>CivicPass is 100% free. We never ask for or collect credit card details, payment methods, or billing information.</span>
              </div>

              <div className="stat-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 6 }}>
                  <Lock size={16} />
                  <strong>No Sensitive Data</strong>
                </div>
                <span>We never ask for government IDs, SSNs, alien registration numbers, passport details, or sensitive personal data.</span>
              </div>
            </div>

            <article className="content-card prose-civic">
              <h2>1. Introduction &amp; Privacy-First Philosophy</h2>
              <p>
                CivicPass (&quot;CivicPass&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides an independent digital study platform engineered to help candidates prepare for government naturalization and citizenship exams, including the <strong>United States USCIS Civics Test</strong>, the <strong>United Kingdom Life in the UK Test</strong>, the <strong>Canadian Discover Canada Citizenship Test</strong>, and the <strong>Australian Citizenship: Our Common Bond Examination</strong>.
              </p>
              <p>
                Unlike conventional online education platforms that gather personal profiles and monetize test-taker analytics, CivicPass is built from the ground up on a <strong>privacy-first, client-side execution model</strong>. When you prepare for your naturalization test on CivicPass, <strong>everything is client-side</strong>: your tests run directly in your web browser, and no personal or financial information is required to access our study tools.
              </p>

              <div className="callout-box callout-box--warning">
                <strong>Important Notice: Zero Credit Card Collection &amp; Zero Sensitive Personal Data:</strong>
                <br />
                CivicPass is completely free to use. We <strong>never</strong> ask for, collect, process, or store credit card details, debit card information, or payment credentials. Furthermore, we <strong>never</strong> request or collect sensitive personal data such as government Alien Registration Numbers (A-Numbers), USCIS receipt notices, Social Security Numbers, National Insurance numbers, passport details, biometric data, or immigration case files. If any entity claiming to represent CivicPass asks you for credit card details or sensitive immigration records, do not provide them.
              </div>

              <h2 id="no-collection">2. Information We Explicitly Do Not Collect</h2>
              <p>
                CivicPass adheres to the principle of comprehensive data minimization. We have deliberately architected our platform so that the following sensitive data categories are never requested, collected, or stored:
              </p>
              <ul>
                <li>
                  <strong>No Credit Card or Payment Details:</strong> We do not collect credit card numbers, debit cards, card expiration dates, CVV/CVC security codes, bank routing information, or billing addresses. CivicPass is completely free. There are no paywalls, paid tiers, checkout forms, or recurring subscriptions. We never ask for or process any payment data.
                </li>
                <li>
                  <strong>No Sensitive Personal Data:</strong> We do not ask for, collect, process, or hold any sensitive personal data (special category data under GDPR Article 9, UK GDPR, and CCPA/CPRA). This includes:
                  <ul style={{ marginTop: 8, marginBottom: 8 }}>
                    <li>Government-issued identification numbers (Social Security Numbers, Alien Registration / A-Numbers, National Insurance Numbers, Passport numbers, Driver&apos;s License IDs, or Taxpayer IDs).</li>
                    <li>Immigration case records, petition numbers, filing documents, or legal status paperwork.</li>
                    <li>Biometric, facial recognition, or genetic information.</li>
                    <li>Special category personal characteristics, including racial or ethnic origin, religious or philosophical beliefs, political affiliations, trade union membership, medical records, or sexual orientation.</li>
                  </ul>
                </li>
                <li>
                  <strong>No Mandatory User Accounts or Passwords:</strong> You are never forced to register, provide your real name, submit an email address, or link third-party social media profiles (such as Google, Apple, or Facebook) to take practice exams or read statutory guides.
                </li>
                <li>
                  <strong>No Cross-Site Commercial Ad Trackers or Data Brokers:</strong> We do not embed surveillance trackers, behavioral ad pixels, or third-party marketing brokers. We never sell, rent, or monetize your study activity or test habits with advertisers.
                </li>
              </ul>

              <h2 id="client-side">3. Client-Side Architecture: Everything Is Client Side</h2>
              <p>
                A core pillar of CivicPass is that <strong>everything is client side</strong>. We deliberately avoid server-side test scoring and remote database tracking to protect your educational privacy:
              </p>
              <ul>
                <li>
                  <strong>100% Client-Side Test Execution:</strong> When you select an exam track (such as US, UK, Canada, or Australia), the relevant question pool is fetched by your browser. All test mechanics—including question randomization, countdown timers, answer selection, score calculation, pass/fail grading, and statutory feedback—execute strictly within your browser&apos;s local JavaScript runtime.
                </li>
                <li>
                  <strong>Zero Server-Side Answer Tracking:</strong> Your individual test answers, the questions you get right or wrong, your overall test scores, and your diagnostic performance metrics are <strong>never transmitted to, analyzed by, or stored on our servers</strong>. We do not track or log what questions you missed or how you performed.
                </li>
                <li>
                  <strong>Local Browser Storage:</strong> To allow you to review your test results or retain interface preferences (such as selected country track and timer pacing) between visits, CivicPass uses your browser&apos;s local storage capabilities (<code>localStorage</code> and <code>sessionStorage</code>). This information is saved exclusively on your local device.
                </li>
                <li>
                  <strong>Instant Local Deletion:</strong> Because all test activity remains entirely on the client side, you maintain full sovereignty over your data. You can erase your test history, scores, and preferences at any moment by clearing your browser&apos;s site data or cache for <code>civicpass.org</code>. Because no copy is ever saved to a server database, clearing your browser deletes your history permanently and irrevocably.
                </li>
              </ul>

              <h2>4. Information We Collect and How It Is Used</h2>
              <p>
                To maintain platform availability, defend against cyber threats, and support users who voluntarily reach out, we process minimal technical data:
              </p>
              <h3>A. Standard Server Logs (Hosting Infrastructure)</h3>
              <p>
                When your browser requests web pages, static stylesheets, or question files, edge hosting servers record standard HTTP server access logs. This limited technical telemetry may include:
              </p>
              <ul>
                <li>Your Internet Protocol (IP) address (used solely for real-time edge routing, DDoS mitigation, rate limiting, and coarse country-level routing).</li>
                <li>Browser user-agent, operating system version, and device type.</li>
                <li>Requested URL path, HTTP status codes, and request timestamps.</li>
              </ul>
              <p>
                These infrastructure logs are used exclusively for security auditing, network integrity, and platform health. They are never tied to individual study habits and are routinely purged on an automated retention cycle.
              </p>

              <h3>B. Voluntary Support Inquiries</h3>
              <p>
                If you choose to contact us via our <Link href="/contact-us">Contact Us</Link> page (e.g., to report a typographical error, request clarification, or provide editorial feedback), we receive the details you choose to provide:
              </p>
              <ul>
                <li>Your name (or pseudonym).</li>
                <li>Your email address (solely to reply to your inquiry).</li>
                <li>The category of inquiry, selected exam track, and message body.</li>
              </ul>
              <p>
                This information is used strictly to respond to your message. We never use support emails for marketing campaigns, newsletter subscriptions, or third-party sharing.
              </p>

              <h2>5. Legal Bases for Processing (GDPR &amp; UK GDPR)</h2>
              <p>
                For individuals residing in the European Economic Area (EEA) and the United Kingdom, CivicPass processes technical data under the following lawful bases:
              </p>
              <ul>
                <li><strong>Legitimate Interests:</strong> To deliver reliable and secure civic educational materials, maintain edge network stability, defend against malicious denial-of-service attacks, and troubleshoot infrastructure errors.</li>
                <li><strong>Consent:</strong> When you voluntarily send a message to our support or editorial inbox.</li>
              </ul>

              <h2 id="gdpr">6. Your Privacy Rights (GDPR, UK Data Protection Act &amp; CCPA/CPRA)</h2>
              <p>
                Depending on your jurisdiction, you possess statutory rights regarding personal data:
              </p>
              <ul>
                <li><strong>Right of Access &amp; Portability:</strong> You may request confirmation of whether CivicPass holds any personal correspondence relating to you and receive a copy.</li>
                <li><strong>Right to Rectification &amp; Erasure:</strong> You have the right to request correction or prompt deletion of any support messages or correspondence you have sent to us.</li>
                <li><strong>Right to Object &amp; Restrict:</strong> You may object to or restrict processing of your technical information where applicable.</li>
                <li><strong>California Residents (CCPA/CPRA):</strong> We do not sell or share personal information. We do not collect credit cards or sensitive personal information. You have the right to request disclosure of data practices and request erasure without discrimination.</li>
                <li><strong>Client-Side Data Self-Service:</strong> Because all study progress, mock scores, and exam answers reside solely on your device in browser local storage, you can exercise full data erasure instantly by clearing your browser&apos;s site data.</li>
              </ul>
              <p>
                To exercise any statutory privacy rights regarding support communications, please contact us through our <Link href="/contact-us">Contact Page</Link> or email <code>privacy@civicpass.org</code>.
              </p>

              <h2>7. Data Security and Encryption</h2>
              <p>
                We adhere to rigorous technical safeguards to protect our platform:
              </p>
              <ul>
                <li><strong>Transport Layer Security:</strong> All communications between your browser and our edge servers are encrypted using modern TLS (HTTPS) protocols.</li>
                <li><strong>Zero Payment Attack Surface:</strong> Because we do not collect or store credit card details or bank credentials, our systems carry zero risk of payment card breaches or financial data leakage.</li>
                <li><strong>Least-Privilege Administration:</strong> Server infrastructure access is strictly restricted to authorized platform administrators.</li>
                <li><strong>Client Isolation:</strong> Because test state is kept client-side, your test sessions are isolated entirely to your local device.</li>
              </ul>

              <h2>8. Third-Party Edge Infrastructure Providers</h2>
              <p>
                We partner with reputable cloud infrastructure and edge network providers (such as Cloudflare and global content delivery networks) to host CivicPass and ensure low-latency worldwide availability. These infrastructure partners handle network-level requests, DDoS filtering, and static content caching strictly in accordance with robust enterprise data protection standards.
              </p>

              <h2>9. Children&apos;s Online Privacy (COPPA Compliance)</h2>
              <p>
                CivicPass is designed for adults and young adults preparing for official national citizenship exams. We do not knowingly collect personal identifiable information from children under the age of 13 (or under 16 in applicable jurisdictions). If you believe a minor has submitted personal details through our contact form, please notify us at <code>privacy@civicpass.org</code> and we will delete the correspondence immediately.
              </p>

              <h2>10. Updates to This Privacy Policy</h2>
              <p>
                We may periodically update this policy to reflect platform improvements or statutory developments. When updates are published, the effective date at the top of this policy will be revised accordingly. We encourage you to revisit this page periodically to stay informed about our privacy architecture.
              </p>

              <h2>11. Contact Our Privacy Team</h2>
              <p>
                If you have questions, feedback, or data privacy requests regarding this Privacy Policy or our client-side architecture, please contact our compliance coordinator:
              </p>
              <div className="callout-box callout-box--info">
                <strong>CivicPass Privacy Officer</strong>
                <br />
                Inquiry Form: <Link href="/contact-us">civicpass.org/contact-us</Link>
                <br />
                Direct Email: <code>privacy@civicpass.org</code>
                <br />
                Response Commitment: We respond to verified privacy inquiries within 30 calendar days.
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
