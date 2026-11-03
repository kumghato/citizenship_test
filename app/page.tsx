import Link from 'next/link';
import {
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';

import { Navbar } from '@/components/landing/Navbar';
import { CountrySelector } from '@/components/landing/CountrySelector';
import { ExamQuestionSimulator } from '@/components/landing/ExamQuestionSimulator';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { BottomCta } from '@/components/landing/BottomCta';

const features = [
  {
    title: 'Practice the right questions',
    text: 'Work through country-specific question sets that mirror the language, topics, and pace of the real test.',
    meta: 'Question bank',
  },
  {
    title: 'See what to study next',
    text: 'Every answer becomes a useful signal. Find the topics that need attention instead of starting over.',
    meta: 'Readiness insights',
  },
  {
    title: 'Build calm recall',
    text: 'Listen to prompts, rehearse out loud, and turn facts into answers you can deliver under pressure.',
    meta: 'Oral practice',
  },
];

export default function LandingPage() {
  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Citizenship prep, made clear</span>
              <h1 className="display-title">Study with a plan. <span>Walk in with confidence.</span></h1>
              <p className="body-copy">
                CivicPass turns official citizenship study material into focused practice for the United States, United Kingdom, Canada, and Australia.
              </p>
              <div className="hero-actions">
                <Link href="/test/us" className="button-primary">Start free practice</Link>
                <a href="#tracks" className="button-secondary">Explore exam tracks</a>
              </div>
              <div className="hero-proof" aria-label="CivicPass benefits">
                <span><CheckCircle2 size={15} /> No account required</span>
                <span><ShieldCheck size={15} /> Country-specific content</span>
                <span><LockKeyhole size={15} /> Private by design</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="CivicPass readiness preview">
              <div className="hero-panel">
                <div className="hero-panel__top">
                  <span className="hero-panel__label">Readiness snapshot</span>
                  <span className="hero-panel__status">Practice mode</span>
                </div>
                <div className="hero-score">
                  <div>
                    <strong>78%</strong>
                    <p>Overall confidence · United States</p>
                  </div>
                  <div className="hero-score__ring"><span>+12%</span></div>
                </div>
                <div className="hero-progress" aria-label="78 percent readiness"><span /></div>
                <div className="hero-panel__footer"><span>14 answered</span><span>6 to pass</span><span>3 focus areas</span></div>
              </div>
              <div className="hero-note"><span>Your next session: <strong>System of Government</strong></span></div>
            </div>
          </div>
        </section>

        <section className="stats-band" aria-label="CivicPass at a glance">
          <div className="container stats-grid">
            <div className="stat"><strong>4</strong><span>country exam tracks</span></div>
            <div className="stat"><strong>80</strong><span>practice questions included</span></div>
            <div className="stat"><strong>1:1</strong><span>question-by-question review</span></div>
            <div className="stat"><strong>0</strong><span>credit cards needed to start</span></div>
          </div>
        </section>

        <section id="tracks" className="section section--compact">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Choose your track</span>
              <h2 className="section-title">One clear place to prepare for your country.</h2>
              <p>Start with the exam you are taking. Your questions, benchmark, timer, and review guidance will follow that track.</p>
            </div>
            <CountrySelector initialCountry="us" />
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">A calmer way to study</span>
              <h2 className="section-title">Less scrolling. More useful practice.</h2>
              <p>Short sessions, plain feedback, and a focused path from your first question to test day.</p>
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

        <section id="practice" className="section practice-section">
          <div className="container practice-grid">
            <div className="practice-copy">
              <span className="eyebrow">Try a real question</span>
              <h2 className="section-title">Know the format before the pressure starts.</h2>
              <p>Use the interactive preview to get comfortable with answer choices, explanations, and the rhythm of a timed session.</p>
              <ul className="practice-list">
                <li>Instant explanations for every choice</li>
                <li>Clear progress toward the passing score</li>
                <li>Voice prompts for oral confidence</li>
              </ul>
            </div>
            <div className="practice-demo"><ExamQuestionSimulator /></div>
          </div>
        </section>

        <section id="how-it-works" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">A simple study loop</span>
              <h2 className="section-title">Build confidence one answer at a time.</h2>
            </div>
            <div className="steps-grid">
              <article className="step-card"><h3>Choose your country</h3><p>Pick the exam track that matches your citizenship application and start without an account.</p></article>
              <article className="step-card"><h3>Practice in short sessions</h3><p>Answer, listen, flag, and move on. Your progress stays easy to read on any screen.</p></article>
              <article className="step-card"><h3>Review with purpose</h3><p>Use your result to revisit missed questions and focus your next study session.</p></article>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="container faq-wrap">
            <div className="section-heading">
              <span className="eyebrow">Questions, answered</span>
              <h2 className="section-title">Good preparation should feel straightforward.</h2>
              <p>Find the essentials about the practice experience and the official sources behind each track.</p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        <section className="section section--compact">
          <div className="container"><BottomCta /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__grid">
            <div>
              <Link href="/" className="brand"><span className="brand__mark">CP</span><span className="brand__wordmark">Civic<em>Pass</em></span></Link>
              <p>Independent practice software for future citizens preparing across four country tracks.</p>
            </div>
            <div><h3>Exam tracks</h3><ul><li><Link href="/test/us">United States</Link></li><li><Link href="/test/uk">United Kingdom</Link></li><li><Link href="/test/ca">Canada</Link></li><li><Link href="/test/au">Australia</Link></li></ul></div>
            <div><h3>Explore</h3><ul><li><a href="#tracks">Tracks</a></li><li><a href="#practice">Practice</a></li><li><a href="#faq">FAQ</a></li></ul></div>
            <div><h3>Trust</h3><ul><li><span>Independent platform</span></li><li><span>Official-source aligned</span></li><li><span>Privacy first</span></li></ul></div>
          </div>
          <div className="site-footer__bottom"><span>© 2026 CivicPass. Built for future citizens.</span><span>For preparation purposes only · Not a government agency</span></div>
        </div>
      </footer>
    </div>
  );
}
