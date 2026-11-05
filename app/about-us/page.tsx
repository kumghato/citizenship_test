import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Globe2 } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civicpass.org';
const pageUrl = `${siteUrl}/about-us`;

export const metadata: Metadata = {
  title: 'About Us — Empowering Future Citizens with Verified Prep',
  description:
    'Discover the mission behind CivicPass: an independent educational platform helping candidates pass their naturalization exams for USCIS (USA), Life in the UK (UK), Discover Canada, and Our Common Bond (Australia).',
  keywords: [
    'About CivicPass',
    'citizenship test mission',
    'civic education platform',
    'USCIS test prep team',
    'Life in the UK educational resource',
    'Discover Canada practice',
    'Our Common Bond study guide',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'About Us — CivicPass Citizenship Test Practice',
    description:
      'We believe the path to citizenship deserves a calm, dignified, and 100% verified study platform. Learn about our statutory methodology and mission.',
    siteName: 'CivicPass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — CivicPass',
    description:
      'Empowering future citizens with statutory legal explanations, timed mock tests, and oral interview practice.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutUsPage() {
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
            name: 'About Us',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'AboutPage',
        '@id': `${pageUrl}#aboutpage`,
        url: pageUrl,
        name: 'About CivicPass',
        description:
          'Independent educational platform delivering verified citizenship test questions and timed mock exams for the United States, United Kingdom, Canada, and Australia.',
        mainEntity: {
          '@type': 'EducationalOrganization',
          name: 'CivicPass',
          url: siteUrl,
          logo: `${siteUrl}/favicon.ico`,
          description:
            'Independent civic educational project dedicated to helping naturalization candidates master citizenship test requirements with statutory explanations.',
          foundingDate: '2025',
          knowsAbout: [
            'USCIS Civics Naturalization Test',
            'Life in the UK Test',
            'Discover Canada Citizenship Test',
            'Australian Citizenship: Our Common Bond',
          ],
        },
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
                  <span aria-current="page">About Us</span>
                </li>
              </ol>
            </nav>

            <span className="eyebrow">Empowering Future Citizens Worldwide</span>
            <h1 className="content-hero__title">
              Study with clarity. <br />Pass with confidence.
            </h1>
            <p className="content-hero__lead">
              CivicPass was built on a simple conviction: the final step toward citizenship should be supported by the highest standard of educational clarity, statutory accuracy, and respect for the learner.
            </p>

            <div className="content-meta-bar">
              <span className="content-meta-badge">
                <Globe2 size={13} />
                Global Naturalization Prep
              </span>
              <span>4 National Curriculums</span>
              <span>•</span>
              <span>100% Free Core Study Access</span>
              <span>•</span>
              <span>No Account Required</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="content-main-section">
          <div className="container" style={{ maxWidth: 880 }}>
            {/* Impact Metric Cards */}
            <div className="stat-pills-row">
              <div className="stat-pill">
                <strong>4</strong>
                <span>Official exam tracks: US, UK, Canada &amp; Australia</span>
              </div>
              <div className="stat-pill">
                <strong>1,000+</strong>
                <span>Verified questions with statutory citations</span>
              </div>
              <div className="stat-pill">
                <strong>100%</strong>
                <span>Free core question access with zero forced registration</span>
              </div>
              <div className="stat-pill">
                <strong>1:1</strong>
                <span>Statutory legal guidance for every answer</span>
              </div>
            </div>

            <article className="content-card prose-civic">
              <h2>Our Story: Why We Built CivicPass</h2>
              <p>
                Every year, hundreds of thousands of people around the world take their national citizenship examination. It represents the culmination of a life-changing journey: years of permanent residency, rigorous background screenings, learning new laws, and filing extensive paperwork.
              </p>
              <p>
                Yet when candidates sit down to prepare for their exam, the available digital study tools are often shockingly poor:
              </p>
              <ul>
                <li>Websites littered with intrusive, distracting banner advertisements that disrupt focus.</li>
                <li>Outdated question banks that cite former governors, prime ministers, or repealed statutory provisions.</li>
                <li>Apps demanding forced accounts, invasive phone permissions, or monthly subscription fees just to review basic civics facts.</li>
                <li>Vague answer explanations that simply state &quot;Correct&quot; or &quot;Incorrect&quot; without explaining the underlying constitutional or statutory principle.</li>
              </ul>
              <p>
                We built <strong>CivicPass</strong> to solve this. We set out to create a calm, dignified, and rigorous preparation environment that treats future citizens with the respect their ambition deserves.
              </p>

              <h2>The Four Official Curriculums We Support</h2>
              <p>
                CivicPass does not rely on crowdsourced guesses. Every single question in our library is mapped directly to the primary government publication authorized for the examination:
              </p>

              <div style={{ display: 'grid', gap: 16, margin: '24px 0' }}>
                <div style={{ padding: 20, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>🇺🇸</span>
                    <strong style={{ fontSize: 17, color: 'var(--ink)' }}>United States — USCIS Civics Naturalization Test</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--body)' }}>
                    Administered orally by a USCIS officer pursuant to <strong>8 CFR § 312.2</strong>. Covers the official 100 civics questions across American Government (Principles, System, Rights &amp; Responsibilities), American History (Colonial Period, 1800s, Recent History), and Integrated Civics (Geography, Symbols, Holidays). Passing standard: 6 out of 10 correct answers.
                  </p>
                </div>

                <div style={{ padding: 20, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>🇬🇧</span>
                    <strong style={{ fontSize: 17, color: 'var(--ink)' }}>United Kingdom — Life in the UK Test</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--body)' }}>
                    Commissioned by the <strong>UK Home Office</strong> under the Nationality, Immigration and Asylum Act 2002. Based strictly on the official handbook <em>Life in the United Kingdom: A Guide for New Residents (3rd Edition)</em>. Features 24 multiple-choice questions in 45 minutes covering British history, democratic values, the UK legal system, and modern culture. Passing standard: 75% (18/24).
                  </p>
                </div>

                <div style={{ padding: 20, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>🇨🇦</span>
                    <strong style={{ fontSize: 17, color: 'var(--ink)' }}>Canada — Discover Canada Citizenship Test</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--body)' }}>
                    Administered by <strong>Immigration, Refugees and Citizenship Canada (IRCC)</strong> under the Citizenship Act. Based on the official guide <em>Discover Canada: The Rights and Responsibilities of Citizenship</em>. Evaluates knowledge of Canadian history, Indigenous peoples, regional geography, the Charter of Rights and Freedoms, and the Parliamentary system. Passing standard: 75% (15/20) in 30 minutes.
                  </p>
                </div>

                <div style={{ padding: 20, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>🇦🇺</span>
                    <strong style={{ fontSize: 17, color: 'var(--ink)' }}>Australia — Our Common Bond Citizenship Test</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--body)' }}>
                    Administered by the <strong>Department of Home Affairs (DHA)</strong> under the Australian Citizenship Act 2007. Based on the official handbook <em>Australian Citizenship: Our Common Bond</em>. 20 questions in 45 minutes covering Australia and its people, democratic beliefs and laws, and government. Crucially includes a dedicated section on Australian Democratic Values where all 5 questions must be answered correctly with a 75% overall pass mark.
                  </p>
                </div>
              </div>

              <h2>Our Four Core Educational Principles</h2>
              <ul>
                <li>
                  <strong>1. Statutory Precision:</strong> We don&apos;t just tell you the right answer; we cite the exact constitutional article, legislative statute, or official handbook page where that knowledge originates. This turns rote memorization into real civic literacy.
                </li>
                <li>
                  <strong>2. Privacy by Design:</strong> We believe your study progress is your business. We do not require account creation, passwords, or emails to take full practice exams. Your answers and diagnostic feedback remain in your browser.
                </li>
                <li>
                  <strong>3. Realistic Test Pacing &amp; Oral Simulation:</strong> Written multiple-choice tests are only half the battle—the US naturalization test is an oral interview! CivicPass includes oral rehearsal tools, audible audio simulation, and countdown timers that replicate authentic exam conditions.
                </li>
                <li>
                  <strong>4. Zero Financial Barriers to Essential Civics:</strong> Core practice questions and mock tests are completely free, open, and accessible to everyone, everywhere.
                </li>
              </ul>

              <h2 id="methodology">Editorial Methodology &amp; Continuous Auditing</h2>
              <p>
                Citizenship questions are not static. In every country we cover, elected officials change after general elections, gubernatorial races, and parliamentary reshuffles. Handbook revisions also introduce updated statutory terminology.
              </p>
              <p>
                Our editorial team utilizes a multi-step verification pipeline:
              </p>
              <ol>
                <li><strong>Official Publication Tracking:</strong> We continuously monitor gazettes, IRCC bulletin releases, USCIS policy manual updates, and Home Office statutory publications.</li>
                <li><strong>Electoral Transition Checks:</strong> Following scheduled election dates and official certification, questions referencing current leadership (Governors, Senators, Premiers, Cabinet Ministers) are flagged and updated with regional notes.</li>
                <li><strong>Community Feedback Loops:</strong> Future citizens preparing daily on CivicPass actively flag questions that have recently shifted. Inquiries submitted via our <Link href="/contact-us">Contact Page</Link> are reviewed by our editors within 48 hours.</li>
              </ol>

              <div className="callout-box callout-box--info">
                <strong>Non-Affiliation Independence:</strong>
                <br />
                CivicPass is proud to operate as an independent educational resource. We are not a government agency, nor do we accept commercial sponsorship from immigration law firms. This independence allows us to keep our focus entirely on delivering the best study experience for future citizens.
              </div>
            </article>

            {/* Call to Action Card */}
            <div
              style={{
                marginTop: 40,
                padding: '36px 32px',
                background: '#173d34',
                color: '#fff',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <span className="eyebrow" style={{ color: '#9bd8bb' }}>Ready to Begin?</span>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.04em', color: '#fff' }}>
                Start practicing for your citizenship test today.
              </h3>
              <p style={{ margin: 0, color: '#c4ded2', fontSize: 14, lineHeight: 1.6, maxWidth: 640 }}>
                Choose your country track to take a full timed mock test with question-by-question statutory review. No signup required.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
                <Link href="/test/us" className="button-primary" style={{ background: '#fff', color: '#0d4c41' }}>
                  Start USCIS (USA)
                </Link>
                <Link href="/test/uk" className="button-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgb(255 255 255 / 0.3)' }}>
                  Start Life in the UK
                </Link>
                <Link href="/test/ca" className="button-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgb(255 255 255 / 0.3)' }}>
                  Start Discover Canada
                </Link>
                <Link href="/test/au" className="button-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgb(255 255 255 / 0.3)' }}>
                  Start Our Common Bond
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
