import Link from 'next/link';
import {
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const TRACK_GUIDES = [
  {
    id: 'us',
    flag: '🇺🇸',
    agency: 'USCIS · U.S. Dept of Homeland Security',
    badge: 'USCIS Civics Track',
    h3Title: 'USCIS Civics Questions & US Naturalization Prep',
    summary:
      'Master the USCIS civics exam with questions drawn from the official 100 civics pool. Prepare for your naturalization interview with realistic, timed American citizenship simulations.',
    keyPoints: [
      '100 official civics questions covering government, history & symbols',
      'Timed 20-question USCIS civics session matching the 60% passing benchmark',
      'Instant statutory notes, Constitution citations & oral rehearsal prompts',
    ],
    stats: { questions: '20 questions', passMark: '60% (12 to pass)', time: '20 mins' },
    href: '/test/us',
    cta: 'Practice USCIS Civics Questions',
    metaKeywordLabel: 'USCIS · American Civics',
  },
  {
    id: 'uk',
    flag: '🇬🇧',
    agency: 'Home Office · UK Visas & Immigration',
    badge: 'Life in the UK Track',
    h3Title: 'Life in the UK Test — Question Bank & Mock Exam',
    summary:
      'Complete Life in the UK preparation for British citizenship and settlement. Access our verified Life in the UK question bank with questions examples, learning materials, and timed mock exams.',
    keyPoints: [
      'Authentic Life in the UK question bank with questions examples and answers',
      'Timed 24-question Life in the UK mock exam matching official Home Office standards',
      'Free Life in the UK learning materials and handbook citations for every question',
    ],
    stats: { questions: '24 questions', passMark: '75% (18 to pass)', time: '45 mins' },
    href: '/test/uk',
    cta: 'Take a Life in the UK Mock Exam',
    metaKeywordLabel: 'Life in the UK · UKVI Handbook',
  },
  {
    id: 'ca',
    flag: '🇨🇦',
    agency: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    badge: 'Discover Canada Track',
    h3Title: 'Discover Canada — Canadian Citizenship Test Practice',
    summary:
      'Prepare for the Discover Canada citizenship test with verified questions drawn directly from the official IRCC study guide. Experience our responsive web-based Discover Canada app on any device.',
    keyPoints: [
      'Realistic Canadian citizenship mock test simulating the 20-question, 30-minute exam',
      'Comprehensive Discover Canada test practice covering Confederation, Charter & symbols',
      'Zero-install Discover Canada app with instant statutory feedback and study notes',
    ],
    stats: { questions: '20 questions', passMark: '75% (15 to pass)', time: '30 mins' },
    href: '/test/ca',
    cta: 'Start Discover Canada Practice',
    metaKeywordLabel: 'Discover Canada · Canadian Citizenship',
  },
  {
    id: 'au',
    flag: '🇦🇺',
    agency: 'Department of Home Affairs (DHA)',
    badge: 'Our Common Bond Track',
    h3Title: 'Our Common Bond — Australian Citizenship Practice Exam',
    summary:
      'Prepare for the DHA Australian citizenship assessment with official Our Common Bond practice questions. Revise parts 1 through 4, with dedicated focus on mandatory Australian values.',
    keyPoints: [
      'Mandatory Australian values questions practice (100% required to pass)',
      'Australian citizenship Our Common Bond practice with 20 questions',
      'Covers democratic beliefs, Australian institutions, people & traditions',
    ],
    stats: { questions: '20 questions', passMark: '75% + 100% Values', time: '45 mins' },
    href: '/test/au',
    cta: 'Practice Our Common Bond Questions',
    metaKeywordLabel: 'Our Common Bond · Australian Values',
  },
];

export function ExamGuidesHub() {
  return (
    <section id="exam-guides" className="section bg-white border-y border-slate-200">
      <div className="container">
        <div className="section-heading max-w-2xl">
          <span className="eyebrow">Comprehensive Track Breakdown</span>
          <h2 className="section-title">
            Official Study Material for USCIS, Life in the UK, Discover Canada & Our Common Bond
          </h2>
          <p>
            Choose your destination country to practice verified citizenship questions,
            understand exact passing scores, and study official statutory materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {TRACK_GUIDES.map((guide) => (
            <article
              key={guide.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">{guide.flag}</span>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {guide.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {guide.metaKeywordLabel}
                  </span>
                </div>

                <span className="block text-xs font-medium text-slate-500 mb-1">
                  {guide.agency}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                  {guide.h3Title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {guide.summary}
                </p>

                <ul className="space-y-2 mb-5">
                  {guide.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-2">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-xs text-slate-500 mb-3">
                  <span>{guide.stats.questions}</span>
                  <span className="font-semibold text-emerald-800">{guide.stats.passMark}</span>
                  <span>{guide.stats.time}</span>
                </div>

                <Link
                  href={guide.href}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-xs"
                  title={guide.cta}
                >
                  <span>{guide.cta}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExamGuidesHub;
