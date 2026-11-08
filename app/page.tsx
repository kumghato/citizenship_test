import {
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';

import { Navbar } from '@/components/landing/Navbar';
import { HeroPracticeButton } from '@/components/landing/HeroPracticeButton';
import { HeroReadinessSnapshot } from '@/components/landing/HeroReadinessSnapshot';
import { CountrySelector } from '@/components/landing/CountrySelector';
import { ExamGuidesHub } from '@/components/landing/ExamGuidesHub';
import { ExamQuestionSimulator } from '@/components/landing/ExamQuestionSimulator';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { FAQ_ITEMS } from '@/lib/faqData';
import { BottomCta } from '@/components/landing/BottomCta';
import { Footer } from '@/components/landing/Footer';

const features = [
  {
    title: 'Practice the right questions',
    text: 'Work through country-specific question sets that mirror the official standards, vocabulary, and pace of the real test.',
    meta: 'Verified question bank',
  },
  {
    title: 'Instant statutory feedback',
    text: 'Every answer links back to the official handbook standard, giving you clear legal guidance instead of guessing.',
    meta: 'Readiness insights',
  },
  {
    title: 'Build calm oral recall',
    text: 'Rehearse prompts out loud, simulate timed pressure, and turn facts into confident answers on test day.',
    meta: 'Oral test simulator',
  },
];

export default function LandingPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onlinecitizenshiptest.com';

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'CivicPass',
        description:
          'Pass your citizenship exam: official practice tests for USCIS, Life in the UK, Discover Canada, and Our Common Bond.',
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#exam-tracks`,
        name: 'Citizenship Examination Tracks',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'USCIS Civics Test — US Citizen Test Practice',
            url: `${siteUrl}/test/us`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Life in the UK Test — Mock Test & Practice Questions',
            url: `${siteUrl}/test/uk`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Discover Canada — Canadian Citizenship Test Practice',
            url: `${siteUrl}/test/ca`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Our Common Bond — Australian Citizenship Practice Test',
            url: `${siteUrl}/test/au`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero" aria-label="Introduction to Citizenship Test Practice">
          <div className="container hero-grid">
            <div className="hero-copy">
          
              <h1 className="display-title">
                Study with a plan. <span>Pass USCIS, Life in the UK, Discover Canada & Our Common Bond.</span>
              </h1>
              <p className="body-copy">
                Practice official citizenship test questions with timed mock tests, instant feedback, and statutory legal explanations. Prepare with confidence for the US citizen test (USCIS), Life in the UK test, Discover Canada, and Australian citizenship Our Common Bond.
              </p>
              <div className="hero-actions">
                <HeroPracticeButton />
                <a href="#tracks" className="button-secondary" title="Explore all 4 citizenship exam tracks">
                  Explore exam tracks
                </a>
              </div>
              <div className="hero-proof" aria-label="Platform advantages">
                <span><CheckCircle2 size={15} /> No account required</span>
                <span><ShieldCheck size={15} /> 100% Official study standards</span>
                <span><LockKeyhole size={15} /> Private by design</span>
              </div>
            </div>

            <HeroReadinessSnapshot />
          </div>
        </section>

        {/* Stats Band */}
        <section className="stats-band" aria-label="CivicPass overview stats">
          <div className="container stats-grid">
            <div className="stat">
              <strong>4</strong>
              <span>official exam tracks</span>
            </div>
            <div className="stat">
              <strong>1,000+</strong>
              <span>verified test questions</span>
            </div>
            <div className="stat">
              <strong>1:1</strong>
              <span>statutory legal review</span>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>free with no credit card</span>
            </div>
          </div>
        </section>

        {/* Track Selector Section */}
        <section id="tracks" className="section section--compact">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Choose Your Exam Track</span>
              <h2 className="section-title">One clear place to prepare for your citizenship test.</h2>
              <p>
                Select your target country to launch full practice exams for the United States (USCIS), United Kingdom (Life in the UK), Canada (Discover Canada), or Australia (Our Common Bond).
              </p>
            </div>
            <CountrySelector initialCountry="us" />
          </div>
        </section>

        {/* Detailed Country Exam Guides & Study Hub */}
        <ExamGuidesHub />

        {/* Features Section */}
        <section id="features" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">A Calmer Way to Study</span>
              <h2 className="section-title">Less scrolling. More useful citizenship practice.</h2>
              <p>
                Short sessions, statutory legal guidance, and a focused path from your first practice question to test day.
              </p>
            </div>
            <div className="feature-grid">
              {features.map(({ title, text, meta }) => (
                <article className="feature-card" key={title}>
                  <span className="feature-card__meta">{meta}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Practice Question Preview */}
        <section id="practice" className="section practice-section">
          <div className="container practice-grid">
            <div className="practice-copy">
              <span className="eyebrow">Try a Real Question</span>
              <h2 className="section-title">Experience the real exam format before test day.</h2>
              <p>
                Use this interactive preview to test questions from USCIS civics, Life in the UK, Discover Canada, and Our Common Bond.
              </p>
              <ul className="practice-list">
                <li>Instant explanations with official statutory citations</li>
                <li>Clear progress indicators tracking passing benchmarks</li>
                <li>Oral rehearsal prompts to build interview confidence</li>
              </ul>
            </div>
            <div className="practice-demo">
              <ExamQuestionSimulator />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">A Simple Study Loop</span>
              <h2 className="section-title">Build test confidence one answer at a time.</h2>
            </div>
            <div className="steps-grid">
              <article className="step-card">
                <h3>Choose your country</h3>
                <p>
                  Pick USCIS (USA), Life in the UK (UK), Discover Canada (Canada), or Our Common Bond (Australia) to start practicing immediately.
                </p>
              </article>
              <article className="step-card">
                <h3>Practice in timed sessions</h3>
                <p>
                  Answer randomized questions under authentic exam conditions with countdown timers and answer tracking.
                </p>
              </article>
              <article className="step-card">
                <h3>Review statutory guidance</h3>
                <p>
                  Analyze your score report with question-by-question citations from official handbooks to reinforce weaker topics.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section faq-section">
          <div className="container faq-wrap">
            <div className="section-heading">
              <span className="eyebrow">Questions, Answered</span>
              <h2 className="section-title">Citizenship test preparation made straightforward.</h2>
              <p>
                Find key answers about USCIS test questions, Life in the UK mock tests, Discover Canada guides, and Our Common Bond requirements.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section section--compact">
          <div className="container">
            <BottomCta />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
