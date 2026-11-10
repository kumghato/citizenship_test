import {
  CheckCircle2,
  ExternalLink,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

import { Navbar } from '@/components/landing/Navbar';
import { HeroPracticeButton } from '@/components/landing/HeroPracticeButton';
import { HeroReadinessSnapshot } from '@/components/landing/HeroReadinessSnapshot';
import { CountrySelector } from '@/components/landing/CountrySelector';
import { ExamGuidesHub } from '@/components/landing/ExamGuidesHub';
import { ExamQuestionSimulator } from '@/components/landing/ExamQuestionSimulator';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { ShareButtons } from '@/components/landing/ShareButtons';
import { FAQ_ITEMS } from '@/lib/faqData';
import { BottomCta } from '@/components/landing/BottomCta';
import { Footer } from '@/components/landing/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  CONTENT_PUBLISHED,
  CONTENT_UPDATED,
  CONTENT_UPDATED_LABEL,
  OFFICIAL_SOURCES,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/siteConfig';

const features = [
  {
    title: 'Questions worded like the real paper',
    text: 'Each set follows the length, pacing and topic mix of the official exam, so nothing on the day is new.',
    meta: 'Tight question sets',
  },
  {
    title: 'Answers that explain themselves',
    text: 'Every reply tells you why it is right, and quotes the handbook page or statute behind it.',
    meta: 'Plain explanations',
  },
  {
    title: 'Practise answering out loud',
    text: 'Read prompts aloud, work to a timer, and turn half-remembered facts into answers you can say with confidence.',
    meta: 'Interview rehearsal',
  },
];

const webPageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SITE_TAGLINE,
  description:
    'Free practice exams for the USCIS civics interview, the Life in the UK test, Discover Canada and Our Common Bond, with answers checked against the official handbooks.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: {
    '@type': 'Thing',
    name: 'Citizenship and naturalization exams',
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}${OG_IMAGE_PATH}`,
  },
  datePublished: CONTENT_PUBLISHED,
  dateModified: CONTENT_UPDATED,
  inLanguage: 'en',
  author: {
    '@type': 'Organization',
    name: `${SITE_NAME} Editorial Team`,
    url: `${SITE_URL}/about-us`,
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
  reviewedBy: {
    '@type': 'Organization',
    name: `${SITE_NAME} Editorial Team`,
    url: `${SITE_URL}/editorial-policy`,
  },
};

const examTrackSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#exam-tracks`,
  name: 'Citizenship examination tracks',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USCIS civics interview — United States',
      url: `${SITE_URL}/test/us`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Life in the UK test — United Kingdom',
      url: `${SITE_URL}/test/uk`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Discover Canada — Canadian citizenship test',
      url: `${SITE_URL}/test/ca`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Our Common Bond — Australian citizenship test',
      url: `${SITE_URL}/test/au`,
    },
  ],
};

const faqSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function LandingPage() {
  return (
    <div className="site-shell">
      <JsonLd data={webPageSchema} />
      <JsonLd data={examTrackSchema} />
      <JsonLd data={faqSchema} />

      <Navbar />

      <main id="main-content">
        {/* Hero Section */}
        <section className="hero" aria-label="Introduction to citizenship test practice">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 className="display-title">
                Citizenship test practice for the <span>US, UK, Canada and Australia</span>.
              </h1>
              <p className="body-copy">
                Four official exams, one quiet study space. Sit a timed set, read the note
                under each answer, and walk into the exam room knowing the format. No
                account, no email, no card.
              </p>
              <div className="hero-actions">
                <HeroPracticeButton />
                <a href="#tracks" className="button-secondary" title="Explore all four exam tracks">
                  Explore exam tracks
                </a>
              </div>
              <div className="hero-proof" aria-label="Platform advantages">
                <span><CheckCircle2 size={15} /> No account required</span>
                <span><ShieldCheck size={15} /> Built on official study standards</span>
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
              <span>national exams covered</span>
            </div>
            <div className="stat">
              <strong>4,382</strong>
              <span>questions in the bank</span>
            </div>
            <div className="stat">
              <strong>60–100%</strong>
              <span>pass marks, by country</span>
            </div>
            <div className="stat">
              <strong>0</strong>
              <span>sign-ups required</span>
            </div>
          </div>
        </section>

        {/* Track Selector Section */}
        <section id="tracks" className="section section--compact">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Choose Your Exam Track</span>
              <h2 className="section-title">Which exam are you facing?</h2>
              <p>
                Every track below copies the length, clock and pass mark of the real
                paper. Pick a country to start a timed set.
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
              <h2 className="section-title">Less scrolling, more recall.</h2>
              <p>
                Short sessions, plain explanations, and a clear route from the first
                question to exam day.
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
              <h2 className="section-title">One sample, four papers.</h2>
              <p>
                Switch between countries below, choose an answer, and read the note that
                appears. Nothing is stored until you open a full set.
              </p>
              <ul className="practice-list">
                <li>Explanations tied to the official handbook</li>
                <li>Progress markers that show the pass mark</li>
                <li>Spoken rehearsal prompts for interview day</li>
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
              <h2 className="section-title">Three steps, repeated until it feels easy.</h2>
            </div>
            <div className="steps-grid">
              <article className="step-card">
                <h3>Sit a full set</h3>
                <p>
                  Twenty questions on the clock tell you where you actually stand, not
                  where you hope you stand.
                </p>
              </article>
              <article className="step-card">
                <h3>Read the notes</h3>
                <p>
                  The explanation matters more than the score. It is the part you will
                  still remember a month later.
                </p>
              </article>
              <article className="step-card">
                <h3>Retry what you missed</h3>
                <p>
                  Flag the ones you got wrong and run them again two days later. Recall
                  sticks better after a gap.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Citizenship Exam Study Guide */}
        <section id="study-guide" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Free Study Guide</span>
              <h2 className="section-title">
                How the four papers differ, and how to prepare for each
              </h2>
              <p>
                All four exams ask about the same broad ideas: how the country is
                governed, how it came to be, and what a citizen agrees to. What changes is
                the length, the clock and the pass mark.
              </p>
              <p>
                Begin with the paper you find easiest. An early win builds the habit, and
                the notes explain the detail as you go. Move to the harder paper once a
                full set feels routine.
              </p>
            </div>

            <div className="steps-grid">
              <article className="step-card">
                <h3>United States</h3>
                <p>
                  An officer reads up to ten prompts and you reply out loud, so rehearse by
                  speaking. Six correct replies pass the civics portion. Check the current
                  office holders in the week before your appointment.
                </p>
              </article>
              <article className="step-card">
                <h3>United Kingdom</h3>
                <p>
                  Twenty-four questions in 45 minutes, with eighteen needed to pass. Dates,
                  monarchs and institutions come up again and again, so work through the
                  third edition of the handbook in order.
                </p>
              </article>
              <article className="step-card">
                <h3>Canada and Australia</h3>
                <p>
                  Both papers run to twenty questions. Canada allows half an hour.
                  Australia adds five values questions that must all be correct on top of
                  the overall mark.
                </p>
              </article>
            </div>

            <div className="section-heading" style={{ marginTop: '2.5rem', marginBottom: 0 }}>
              <p>
                Two or three short sessions a week is enough for most people. Practise in a
                quiet room on the device you will use, and keep the final run or two timed
                so the clock stops surprising you.
              </p>
            </div>

            <div className="habits-block">
              <h3>A two-week plan that fits around work</h3>
              <ol className="habits-list">
                <li>
                  <strong>Days 1–2:</strong> sit one full paper with no notes. Write down the
                  three topics you lost the most marks on. That list is your syllabus for
                  the rest of the fortnight.
                </li>
                <li>
                  <strong>Days 3–6:</strong> read the matching chapters in the official
                  handbook, then answer twenty items from those chapters each evening.
                </li>
                <li>
                  <strong>Day 7:</strong> retake only the items you missed. Anything you miss
                  twice goes back on the list and gets read again.
                </li>
                <li>
                  <strong>Days 8–11:</strong> run a full paper every other day. Note the
                  questions that made you hesitate, even when your answer was right.
                </li>
                <li>
                  <strong>Days 12–13:</strong> check current office holders and any renamed
                  institution. Resist adding new topics; this stage is consolidation, not
                  coverage.
                </li>
                <li>
                  <strong>Day 14:</strong> one final timed run, then stop. Sleep does more for
                  recall than another late session.
                </li>
              </ol>
              <p className="habits-close">
                Working to a shorter deadline? Keep the two full papers at either end and
                compress the middle. A diagnostic at the start and a dress rehearsal at the
                end carry most of the benefit.
              </p>
              <p className="habits-close">
                Read your score as a map rather than a verdict. A pass on a practice paper
                means the format no longer surprises you; it does not mean the facts will
                still be there in three weeks. One more short run after a gap tells you
                which ones stuck.
              </p>
            </div>

            <div className="habits-block">
              <h3>Reading the score report</h3>
              <p className="habits-close">
                The report lists every item you saw, the answer you chose and the note that
                explains it. Two patterns matter more than the percentage. The first is a
                topic that keeps appearing among your misses; that is a reading problem, and
                the handbook chapter will fix it faster than more practice. The second is a
                set of items you got right but answered slowly. Those tend to collapse when
                the clock is real, and they need repeated timed runs rather than rereading.
              </p>
              <p className="habits-close">
                If you clear the pass mark while guessing more than two or three items,
                treat the result as a near miss. Guesswork does not survive a different
                wording, so redo the paper once more after a day away from it.
              </p>
            </div>
          </div>
        </section>

        {/* Exam comparison */}
        <section id="compare" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Side by Side</span>
              <h2 className="section-title">The four papers, as they are set today.</h2>
              <p>
                Lengths and pass marks below are the ones each government publishes. If a
                handbook is reissued, the figures in the table are updated with it. Nothing
                here is estimated; each row is copied from the source documents linked on
                this page.
              </p>
            </div>

            <div className="compare-wrap">
              <table className="compare-table">
                <caption className="sr-only">
                  Question counts, time limits and pass marks for the four citizenship exams
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Paper</th>
                    <th scope="col">Items</th>
                    <th scope="col">Time</th>
                    <th scope="col">To pass</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">US civics interview</th>
                    <td>Up to 10, spoken</td>
                    <td>Interview slot</td>
                    <td>6 correct</td>
                  </tr>
                  <tr>
                    <th scope="row">Life in the UK</th>
                    <td>24</td>
                    <td>45 minutes</td>
                    <td>18 correct</td>
                  </tr>
                  <tr>
                    <th scope="row">Discover Canada</th>
                    <td>20</td>
                    <td>30 minutes</td>
                    <td>15 correct</td>
                  </tr>
                  <tr>
                    <th scope="row">Our Common Bond</th>
                    <td>20</td>
                    <td>45 minutes</td>
                    <td>15 correct, all values</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="habits-block">
              <h3>Five habits that decide the result</h3>
              <ol className="habits-list">
                <li>
                  <strong>Answer out loud.</strong> A spoken interview rewards a sentence
                  you have said before, not a fact you recognise on a screen. Read prompts
                  to a friend, a phone recording or an empty kitchen.
                </li>
                <li>
                  <strong>Learn the shape first.</strong> Knowing there are 24 items and 45
                  minutes changes how you spend the clock. Do one paper end to end before
                  you start memorising details.
                </li>
                <li>
                  <strong>Read the note after a right answer too.</strong> Guessing well is
                  not knowledge. The note is what stops the same question catching you out
                  when it is worded differently.
                </li>
                <li>
                  <strong>Leave a gap before you retry.</strong> Coming back to a missed
                  item after two days tests recall rather than short-term memory.
                </li>
                <li>
                  <strong>Refresh the moving parts last.</strong> Names of current office
                  holders belong in the final week, because they are the one part of the
                  syllabus that changes without warning.
                </li>
              </ol>
              <p className="habits-close">
                Before you book, confirm your eligibility, the fee and the ID you need with
                the issuing department. Those requirements sit outside this site, and they
                are the ones people most often get wrong on the day.
              </p>
            </div>
          </div>
        </section>

        {/* Official sources & editorial transparency */}
        <section id="sources" className="section section--compact sources-section">
          <div className="container trust-grid">
            <div>
              <span className="eyebrow">Checked, Not Guessed</span>
              <h2 className="section-title">Where the answers come from.</h2>
              <p className="trust-lede">
                Each question is written against the current government publication for
                that country. Where a fact changes with an election or a new edition, we
                re-check it and note the date. Every link opens the official page in a new
                tab, so you can confirm a pass mark or a handbook clause yourself before you
                rely on it.
              </p>

              <ul className="source-list">
                {OFFICIAL_SOURCES.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} aria-hidden="true" />
                      <span>{source.label}</span>
                    </a>
                    <span className="source-list__publisher">{source.publisher}</span>
                  </li>
                ))}
              </ul>

              <p className="trust-note">
                When a handbook is reissued or a government changes a figure, we rewrite the
                affected items rather than adding a note on top. Every page that carries
                exam figures shows the date it was last reviewed. If something no longer
                matches the official page, send it to the editorial desk and we will correct
                it at source within two working days.
              </p>
            </div>

            <aside className="editorial-card" aria-labelledby="editorial-card-title">
              <h3 id="editorial-card-title">Written and reviewed in-house</h3>
              <p>
                Our writers are immigration educators and volunteers who have sat these
                exams in all four countries. Writer and reviewer are separate people: one
                drafts the explanation, the other checks it against the published handbook
                and signs the item off. Nothing goes live before that second check, and
                questions that name an office holder are re-verified after every election.
              </p>
              <dl className="editorial-card__meta">
                <div>
                  <dt>Page updated</dt>
                  <dd>
                    <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED_LABEL}</time>
                  </dd>
                </div>
                <div>
                  <dt>Review cycle</dt>
                  <dd>Every 90 days</dd>
                </div>
              </dl>
              <div className="editorial-card__links">
                <Link href="/editorial-policy">Editorial policy</Link>
                <Link href="/about-us">About the team</Link>
                <Link href="/contact-us">Report a correction</Link>
              </div>
              <ShareButtons />
            </aside>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section faq-section">
          <div className="container faq-wrap">
            <div className="section-heading">
              <span className="eyebrow">Questions, Answered</span>
              <h2 className="section-title">Common questions about these exams.</h2>
              <p>
                Pass marks, question counts, how the practice sets work, what happens to your
                progress, and how to report a mistake if you find one.
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
