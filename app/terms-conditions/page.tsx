import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { AlertTriangle, Scale } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civicpass.org';
const pageUrl = `${siteUrl}/terms-conditions`;

export const metadata: Metadata = {
  title: 'Terms & Conditions — Educational Disclaimer & Usage Terms',
  description:
    'Read the CivicPass Terms & Conditions. Understand our educational platform guidelines, intellectual property terms, acceptable use policies, and official non-affiliation statutory disclaimers.',
  keywords: [
    'CivicPass terms and conditions',
    'citizenship test terms of use',
    'educational software disclaimer',
    'USCIS test prep terms',
    'Life in the UK terms',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Terms & Conditions — CivicPass',
    description:
      'Official Terms of Use and Educational Disclaimers for the CivicPass citizenship examination preparation platform.',
    siteName: 'CivicPass',
  },
  twitter: {
    card: 'summary',
    title: 'Terms & Conditions — CivicPass',
    description: 'Read the CivicPass platform terms of use and educational disclaimers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsConditionsPage() {
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
            name: 'Terms & Conditions',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Terms & Conditions of Use — CivicPass',
        description:
          'Terms of Service, acceptable use guidelines, and educational non-affiliation disclosures for CivicPass.',
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
                  <span aria-current="page">Terms &amp; Conditions</span>
                </li>
              </ol>
            </nav>

            <span className="eyebrow">Platform Usage &amp; Statutory Disclaimers</span>
            <h1 className="content-hero__title">Terms &amp; Conditions of Use</h1>
            <p className="content-hero__lead">
              Please review these terms carefully before utilizing CivicPass. These provisions establish the ground rules for accessing our citizenship examination study tools, question simulators, and educational resources.
            </p>

            <div className="content-meta-bar">
              <span className="content-meta-badge">
                <Scale size={13} />
                Effective Date: November 2026
              </span>
              <span>Version 2.3</span>
              <span>•</span>
              <span>Applies to all visitors, learners, and educational users</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="content-main-section">
          <div className="container" style={{ maxWidth: 880 }}>
            {/* Critical Statutory Non-Affiliation Box */}
            <div className="callout-box callout-box--warning" id="disclaimer" style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <AlertTriangle size={20} color="#b45309" />
                <strong style={{ fontSize: 16 }}>CRITICAL STATUTORY NON-AFFILIATION NOTICE:</strong>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65 }}>
                CivicPass is an independent, non-governmental educational initiative. CivicPass is <strong>NOT</strong> affiliated with, associated with, authorized by, sponsored by, or endorsed by <strong>U.S. Citizenship and Immigration Services (USCIS)</strong>, the <strong>United States Department of Homeland Security (DHS)</strong>, the <strong>United Kingdom Home Office</strong>, <strong>Immigration, Refugees and Citizenship Canada (IRCC)</strong>, or the <strong>Australian Department of Home Affairs (DHA)</strong>. Official test application forms and appointments must always be secured directly through official government portals.
              </p>
            </div>

            <article className="content-card prose-civic">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing, browsing, or utilizing the CivicPass website (accessible at <code>civicpass.org</code>), mobile interfaces, mock exams, or related services (collectively, the &quot;Platform&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions (&quot;Terms&quot;), as well as our <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
              <p>
                If you do not agree with any part of these Terms, you must immediately cease accessing and using the Platform.
              </p>

              <h2>2. Educational Nature &amp; No Legal or Immigration Advice</h2>
              <p>
                The materials, questions, statutory citations, and mock exams provided on CivicPass are developed purely for <strong>educational review, civics literacy, and self-study preparation</strong>:
              </p>
              <ul>
                <li><strong>No Legal Advice:</strong> Nothing on CivicPass constitutes legal, regulatory, or immigration advice. If you require legal counsel regarding your naturalization eligibility, N-400 application, ILR settlement status, Canadian citizenship grant, or Australian citizenship qualification, you must consult a licensed immigration attorney or qualified legal professional.</li>
                <li><strong>No Passing Guarantee:</strong> While our practice questions and scoring benchmarks are modeled after official published standards, CivicPass makes no express or implied warranty that using this Platform guarantees you will pass your official government examination or interview.</li>
              </ul>

              <h2>3. Official Standards &amp; Curriculum Foundations</h2>
              <p>
                CivicPass references publicly available government study standards:
              </p>
              <ul>
                <li><strong>United States:</strong> The USCIS 100 Civics Naturalization Test questions published pursuant to 8 CFR § 312.2.</li>
                <li><strong>United Kingdom:</strong> The official Life in the UK study handbook (3rd Edition: <em>A Guide for New Residents</em>) published by the Home Office.</li>
                <li><strong>Canada:</strong> The official IRCC study guide: <em>Discover Canada: The Rights and Responsibilities of Citizenship</em>.</li>
                <li><strong>Australia:</strong> The DHA official publication: <em>Australian Citizenship: Our Common Bond</em>.</li>
              </ul>
              <p>
                CivicPass organizes and structures these civic concepts into interactive question sets, timed simulations, and statutory explanations to optimize retention and oral confidence.
              </p>

              <h2>4. Intellectual Property &amp; Permitted Limited License</h2>
              <p>
                All original elements of the Platform—including but not limited to software code, layout designs, user interface graphics, algorithmic scoring engines, editorial rationales, and branding—are the proprietary intellectual property of CivicPass and are protected by applicable copyright, trademark, and unfair competition laws.
              </p>
              <h3>Your Limited Study License:</h3>
              <p>
                CivicPass grants you a personal, non-exclusive, non-transferable, revocable license to access and practice test questions strictly for your own personal, non-commercial naturalization study. Under this license, you expressly agree <strong>NOT</strong> to:
              </p>
              <ul>
                <li>Scrape, crawl, harvest, or extract test questions, data, or source code using automated bots, spiders, or scripts without prior written consent.</li>
                <li>Republish, redistribute, mirror, sublicense, sell, or commercially exploit any portion of the Platform.</li>
                <li>Decompile, reverse-engineer, or attempt to derive the underlying software architecture or API services.</li>
                <li>Frame, embed, or disguise the Platform within another website in a manner intended to deceive users.</li>
              </ul>

              <h2>5. Prohibited User Conduct</h2>
              <p>
                When accessing CivicPass, you agree to refrain from engaging in any unlawful, harmful, or disruptive behavior:
              </p>
              <ul>
                <li>Interfering with or disrupting the security, performance, or availability of our edge network or hosting servers.</li>
                <li>Submitting fraudulent, malicious, or abusive messages through our support or question correction forms.</li>
                <li>Impersonating any person, entity, or government immigration official.</li>
                <li>Using the Platform for any purpose that violates local, national, or international laws.</li>
              </ul>

              <h2>6. Dynamic Legal Standards &amp; Accuracy of Questions</h2>
              <p>
                Certain citizenship questions (such as the names of current government officials: Governors, U.S. Senators, Canadian Premiers, or Cabinet Ministers) change according to election cycles and ministerial appointments.
              </p>
              <p>
                While our editorial team regularly audits question banks against updated government publications, CivicPass does not warrant that all answers reflect real-time political transitions at any specific second. If you observe an answer that has recently changed due to a recent election or appointment, please notify our editorial board via our <Link href="/contact-us">Contact Page</Link>.
              </p>

              <h2>7. Disclaimer of Warranties</h2>
              <p>
                TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, THE PLATFORM, STUDY GUIDES, QUESTIONS, AND SOFTWARE ARE PROVIDED ON AN <strong>&quot;AS IS&quot;</strong> AND <strong>&quot;AS AVAILABLE&quot;</strong> BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p>
                CIVICPASS EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT ACCESS TO THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF DEFECTS.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                UNDER NO CIRCUMSTANCES SHALL CIVICPASS, ITS FOUNDERS, EDITORS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING, BUT NOT LIMITED TO, LOSS OF TIME, FEES PAID FOR GOVERNMENT FILINGS, IMMIGRATION DELAYS, OR EXAM RETAKE COSTS) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE PLATFORM.
              </p>

              <h2>9. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless CivicPass and its team members against any claims, liabilities, damages, losses, and reasonable legal expenses arising from or related to your breach of these Terms, your misuse of the Platform, or your violation of any third-party right.
              </p>

              <h2>10. Modifications to Service &amp; Terms</h2>
              <p>
                We reserve the right at any time to modify, enhance, suspend, or discontinue any feature, question bank, or section of the Platform with or without prior notice.
              </p>
              <p>
                We may also amend these Terms from time to time. When revisions are enacted, we will update the &quot;Effective Date&quot; at the top of this document. Continued usage of the Platform following published revisions constitutes your acceptance of the updated Terms.
              </p>

              <h2>11. Severability &amp; Entire Agreement</h2>
              <p>
                If any provision of these Terms is determined by a court of competent jurisdiction to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of any remaining provisions. These Terms, combined with our Privacy Policy, represent the complete understanding between you and CivicPass concerning your use of the Platform.
              </p>

              <h2>12. Contact Information for Legal Inquiries</h2>
              <p>
                For questions regarding these Terms &amp; Conditions, or to request permission for academic or institutional usage, please contact us:
              </p>
              <div className="callout-box callout-box--info">
                <strong>CivicPass Legal &amp; Compliance Team</strong>
                <br />
                Email: <code>legal@civicpass.org</code>
                <br />
                General Inquiries: <Link href="/contact-us">civicpass.org/contact-us</Link>
              </div>
            </article>

            {/* Bottom Nav Hint */}
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                Related Documents: Review our <Link href="/privacy-policy" style={{ color: 'var(--accent)', fontWeight: 600 }}>Privacy Policy</Link> or discover <Link href="/about-us" style={{ color: 'var(--accent)', fontWeight: 600 }}>About Us</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
