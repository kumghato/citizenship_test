import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  BookOpen,
  Sparkles,
  BrainCircuit,
  Scale,
  Users,
  Star,
  BadgeCheck,
  Lock,
  AlertCircle,
} from 'lucide-react';

import { Navbar } from '@/components/landing/Navbar';
import { CountrySelector } from '@/components/landing/CountrySelector';
import { AudioSimulatorPlayer } from '@/components/landing/AudioSimulatorPlayer';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { ExamQuestionSimulator } from '@/components/landing/ExamQuestionSimulator';
import { BottomCta } from '@/components/landing/BottomCta';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header / Navigation Bar (Client Component) */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/30">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-100/50 via-sky-50/30 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Content with controlled max-width */}
            <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
              {/* Tag Badges */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2.5 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Pass Rate Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Updated for 2026
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
                Pass Your Citizenship Exam on the{' '}
                <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2 underline-offset-4">
                  First Attempt
                </span>
                . Guaranteed.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                The high-retention prep platform built specifically for the{' '}
                <strong className="text-slate-900 font-semibold">United States (USCIS)</strong>,{' '}
                <strong className="text-slate-900 font-semibold">United Kingdom (Life in the UK)</strong>,{' '}
                <strong className="text-slate-900 font-semibold">Canada (IRCC)</strong>, and{' '}
                <strong className="text-slate-900 font-semibold">Australia (DHA)</strong> citizenship examinations.
              </p>
            </div>

            {/* Interactive Country Selector Grid (Spans the full max-w-7xl width) */}
            <CountrySelector initialCountry="us" />

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-slate-600">Official Question Banks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-slate-600">Verified by Immigration Lawyers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-slate-600">No Credit Card Required</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Metric / Social Proof Bar */}
        <section className="border-y border-slate-200/80 bg-slate-50/70 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* 4-Card Metric Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                  99.4%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  First-Time Pass Rate
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  vs. 74% official national average
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  142,000+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  Citizens Prepared
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Across US, UK, Canada & Australia
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  1,200+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  Verified Questions
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Cross-referenced with legal citations
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                  12 Min
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  Day Avg. Study Time
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  High-retention micro-learning sessions
                </div>
              </div>
            </div>

            {/* Social Proof Ticker Strip */}
            <div className="rounded-xl bg-white border border-slate-200/80 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    ER
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 text-xs">🇺🇸</span>
                </div>
                <div className="text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">Elena R.</span> just passed the{' '}
                  <span className="text-blue-700 font-medium">US Naturalization Exam</span> in Dallas, TX{' '}
                  <span className="text-emerald-700 font-semibold">(Score: 10/10)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Verified 4 minutes ago via Dallas USCIS Field Office</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Features Grid */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <BrainCircuit className="w-3.5 h-3.5" />
                Next-Generation Test Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Built Like the Real Test Center.{' '}
                <span className="text-blue-600">Designed for High Retention.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Traditional citizenship booklets overwhelm applicants with hundreds of pages of dry text.
                CivicPass structures learning around four scientifically proven retention pillars.
              </p>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1 (Top Left): 1:1 Real Exam Simulation */}
              <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full">
                      Pillar 01 · Real Exam Simulator
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Interactive Demo</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    1:1 Real Exam Simulation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Practice with the identical question pool, interface timer, and passing threshold
                    used at your designated government examination testing facility.
                  </p>
                </div>

                {/* Interactive Question Simulator inside Card 1 */}
                <div className="mt-6">
                  <ExamQuestionSimulator />
                </div>
              </div>

              {/* Card 2 (Top Right): Context, Not Just Memorization */}
              <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100/70 px-3 py-1 rounded-full">
                      Pillar 02 · Constitutional Logic
                    </span>
                    <span className="text-xs text-slate-500 font-medium">3.4x Faster Retention</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Context, Not Just Memorization
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    When you understand <em>why</em> a constitutional power exists, you never blank out under test anxiety.
                    Every single question connects directly to historical statutory foundations.
                  </p>
                </div>

                {/* Legal Citation & Explanation Visual Box */}
                <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                      <Scale className="w-4 h-4 text-indigo-600" />
                      <span>Official Legal Citation & Precedent</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">
                      U.S. CONST. art. I, § 8, cl. 5
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Historical Background & Framing Context
                    </div>
                    <p className="leading-relaxed text-slate-600">
                      &ldquo;Under the Articles of Confederation (1781–1789), each individual state printed its own paper currency, triggering catastrophic inflation and interstate trade wars. The 1787 Constitutional Convention reserved the coinage power exclusively to the federal government to stabilize the national economy.&rdquo;
                    </p>
                  </div>

                  {/* Memory Mnemonic Anchor */}
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-950">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-900">CivicPass Memory Mnemonic:</strong>{' '}
                      Federal powers are the <strong>3 F&apos;s</strong>: <em>Finance</em> (print money), <em>Forces</em> (army & navy), and <em>Foreign affairs</em> (treaties).
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      Vetted by Immigration Law Faculty
                    </span>
                    <span className="text-blue-600 font-medium">Included with all 100 questions →</span>
                  </div>
                </div>
              </div>

              {/* Card 3 (Bottom Left): Smart Weakness Diagnostics */}
              <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                      Pillar 03 · Adaptive Analytics
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Zero Wasted Study Time</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Smart Weakness Diagnostics
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Stop re-answering questions you already know. CivicPass isolates your specific
                    knowledge gaps and creates targeted drill sessions until you hit 100% mastery.
                  </p>
                </div>

                {/* Category Progress Bars Mock UI */}
                <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-semibold text-slate-800">
                    <span>USCIS Civics Category Mastery</span>
                    <span className="text-blue-600 font-mono">Overall Readiness: 86%</span>
                  </div>

                  {/* Progress Items */}
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <div className="flex justify-between font-medium text-slate-700 mb-1">
                        <span>Principles of American Democracy</span>
                        <span className="font-semibold text-emerald-600">94% · Mastered</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
                      <div className="flex justify-between font-semibold text-amber-950 mb-1">
                        <span className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          System of Government
                        </span>
                        <span className="font-semibold text-amber-700">68% · Focus Required</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-amber-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full w-[68%]" />
                      </div>
                      <div className="mt-2 text-[11px] text-amber-800 flex items-center justify-between">
                        <span>Weak spot: Judicial powers & Cabinet roles</span>
                        <Link href="/test/us" className="font-bold underline cursor-pointer hover:text-amber-950">
                          Start 8-Question Drill →
                        </Link>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium text-slate-700 mb-1">
                        <span>Rights and Responsibilities</span>
                        <span className="font-semibold text-blue-600">88% · Strong</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[88%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium text-slate-700 mb-1">
                        <span>Colonial Period & Early America</span>
                        <span className="font-semibold text-emerald-600">96% · Mastered</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 (Bottom Right): Audio Flashcards & Interview Simulator */}
              <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full">
                      Pillar 04 · Oral Simulator
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Official Voice Cadence</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Audio Flashcards & Interview Simulator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Overcome oral interview stage fright. Listen to examiner voice prompts at real test pace,
                    practice speaking answers aloud, and build verbal fluency on your commute.
                  </p>
                </div>

                {/* Interactive Audio Player Mock (Client Component) */}
                <div className="mt-6">
                  <AudioSimulatorPlayer />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Testimonial Grid */}
        <section className="py-16 md:py-24 bg-slate-50/60 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                <Users className="w-3.5 h-3.5" />
                Real Applicant Stories
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                From Test Anxiety to{' '}
                <span className="text-blue-600">Citizen Ceremony</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                See how aspiring citizens from around the globe mastered their exams with zero stress.
              </p>
            </div>

            {/* 3-Card Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1: United States */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-lg">🇺🇸</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;I was terrified of the oral interview format because English is my second language.
                    CivicPass&apos;s audio simulator sounded identical to the actual USCIS officer who interviewed me.
                    I answered the first 6 questions in under 45 seconds and passed on the spot!&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                      PS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        Priya S.
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="text-[11px] text-slate-500">
                        San Jose, CA · USCIS Field Office
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    6/6 Correct
                  </span>
                </div>
              </div>

              {/* Testimonial 2: Canada */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-lg">🇨🇦</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;<em>Discover Canada</em> is dense with historical dates and monarchies. The weakness diagnostics
                    quickly caught that I was confusing Canadian Confederation acts with post-war treaties.
                    Passed my 20-question test with a perfect 20/20 in 8 minutes flat.&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
                      MV
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        Marcus V.
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Toronto, ON · IRCC Virtual Test
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    20/20 (100%)
                  </span>
                </div>
              </div>

              {/* Testimonial 3: Australia */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-lg">🇦🇺</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;The Australian Values section is zero-tolerance — you fail if you miss even one values question.
                    CivicPass had dedicated mock drill sets specifically for the 5 mandatory values questions.
                    I walked out of the DHA centre holding my citizenship approval letter.&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                      AK
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        Amara K.
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Sydney, NSW · DHA Testing Centre
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Values 5/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Interactive FAQ Section (Client Component) */}
        <section id="study-guides" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <BookOpen className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Exam Policies, Scoring &{' '}
                <span className="text-blue-600">Guarantee Terms</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Clear answers regarding test requirements, passing thresholds, and our 100% money-back guarantee.
              </p>
            </div>

            <FaqAccordion />
          </div>
        </section>

        {/* 7. Bottom CTA Banner (Client Component) */}
        <section className="py-12 md:py-16 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BottomCta />
          </div>
        </section>
      </main>

      {/* 8. Comprehensive Footer (Server Component) */}
      <footer className="border-t border-slate-200 bg-white pt-14 pb-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Footer Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  Civic<span className="text-blue-600">Pass</span>
                </span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                The premier educational exam simulator and active-recall platform for applicants
                pursuing citizenship in the United States, United Kingdom, Canada, and Australia.
              </p>
              <div className="flex items-center gap-2 pt-1 text-slate-500">
                <span>🇺🇸 USA</span>
                <span>·</span>
                <span>🇬🇧 UK</span>
                <span>·</span>
                <span>🇨🇦 Canada</span>
                <span>·</span>
                <span>🇦🇺 Australia</span>
              </div>
            </div>

            {/* Col 1: Tests & Programs */}
            <div className="space-y-3">
              <div className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
                Citizenship Tests
              </div>
              <ul className="space-y-2">
                <li>
                  <Link href="/test/us" className="hover:text-blue-600 transition-colors">
                    USCIS 100 Civics Questions
                  </Link>
                </li>
                <li>
                  <Link href="/test/uk" className="hover:text-blue-600 transition-colors">
                    Life in the UK Test 2026
                  </Link>
                </li>
                <li>
                  <Link href="/test/ca" className="hover:text-blue-600 transition-colors">
                    Discover Canada IRCC Exam
                  </Link>
                </li>
                <li>
                  <Link href="/test/au" className="hover:text-blue-600 transition-colors">
                    Our Common Bond Australia
                  </Link>
                </li>
                <li>
                  <Link href="/test/au" className="hover:text-blue-600 transition-colors">
                    Australian Values Module
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Study Resources */}
            <div className="space-y-3">
              <div className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
                Study Resources
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Oral Interview Simulator
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Audio Flashcard Packs
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Weakness Diagnostic Tool
                  </a>
                </li>
                <li>
                  <a href="#study-guides" className="hover:text-blue-600 transition-colors">
                    Legal Citation Breakdown
                  </a>
                </li>
                <li>
                  <a href="#study-guides" className="hover:text-blue-600 transition-colors">
                    State Governor Directory
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Company & Trust */}
            <div className="space-y-3">
              <div className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
                Trust & Support
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#study-guides" className="hover:text-blue-600 transition-colors">
                    Pass Guarantee Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Attorney Advisory Board
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Security & 256-Bit SSL
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Official Government Disclaimer Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11.5px] text-slate-500 leading-relaxed">
            <div className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              Official Government Agency Disclaimer
            </div>
            CivicPass is an independent private educational platform and test simulator. CivicPass is not affiliated with, endorsed by, or operated by the United States Citizenship and Immigration Services (USCIS), the UK Home Office, Immigration, Refugees and Citizenship Canada (IRCC), the Australian Department of Home Affairs (DHA), or any municipal government authority. Official study materials, test schedules, and government filing forms are made available free of charge directly on official government portals (uscis.gov, gov.uk, canada.ca, and homeaffairs.gov.au).
          </div>

          {/* Bottom Copyright & Security */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              © 2026 CivicPass Technologies Inc. All rights reserved. Built with pride for future citizens.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                256-Bit TLS Encryption
              </span>
              <span>·</span>
              <span>WCAG 2.1 AA Accessibility Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
