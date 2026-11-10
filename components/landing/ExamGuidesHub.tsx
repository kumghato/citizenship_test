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
    badge: 'US track',
    h3Title: 'United States — the civics interview',
    summary:
      'An officer reads up to ten prompts and you answer out loud. We cover the full published pool, plus the current office holders you may be asked about.',
    keyPoints: [
      'Every prompt in the official pool, not a sample',
      'Timed 20-question sets against a 60% pass mark',
      'A short note on each answer, with the clause behind it',
    ],
    stats: { questions: 'Up to 10 asked', passMark: '60% (6 of 10)', time: 'Spoken pace' },
    href: '/test/us',
    cta: 'Practise the US interview',
    metaKeywordLabel: 'USCIS · Civics',
  },
  {
    id: 'uk',
    flag: '🇬🇧',
    agency: 'Home Office · UK Visas & Immigration',
    badge: 'UK track',
    h3Title: 'United Kingdom — settlement and citizenship paper',
    summary:
      'A 45-minute timed set drawn from the third edition of the official handbook. The real paper asks 24 questions and you need 18 right; practice runs use the same clock and pass mark.',
    keyPoints: [
      'Timed set with the Home Office 75% pass mark',
      'Chapter notes for the whole handbook, in reading order',
      'Every answer shows the page it came from',
    ],
    stats: { questions: '20 per practice set', passMark: '75% (18 of 24)', time: '45 mins' },
    href: '/test/uk',
    cta: 'Take a UK mock paper',
    metaKeywordLabel: 'Home Office · 3rd edition',
  },
  {
    id: 'ca',
    flag: '🇨🇦',
    agency: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    badge: 'Canada track',
    h3Title: 'Canada — rights, history and government',
    summary:
      'A 20-question, 30-minute assessment modelled on the IRCC guide. Fifteen correct answers passes.',
    keyPoints: [
      'Timed 20-question set in the IRCC format',
      'Charter, Confederation and symbolism covered in full',
      'Feedback on each answer as you go',
    ],
    stats: { questions: '20 questions', passMark: '75% (15 to pass)', time: '30 mins' },
    href: '/test/ca',
    cta: 'Start the Canadian paper',
    metaKeywordLabel: 'IRCC · Discover Canada',
  },
  {
    id: 'au',
    flag: '🇦🇺',
    agency: 'Department of Home Affairs (DHA)',
    badge: 'Australia track',
    h3Title: 'Australia — values and civic knowledge',
    summary:
      'Twenty questions in 45 minutes, including five compulsory values questions that must all be right.',
    keyPoints: [
      'Values section where every answer must be correct',
      '20-question paper modelled on the official booklet',
      'Coverage of parts 1 to 4, in booklet order',
    ],
    stats: { questions: '20 questions', passMark: '75% + 5/5 values', time: '45 mins' },
    href: '/test/au',
    cta: 'Practise Australian values',
    metaKeywordLabel: 'DHA · Our Common Bond',
  },
];

export function ExamGuidesHub() {
  return (
    <section id="exam-guides" className="section bg-white border-y border-slate-200">
      <div className="container">
        <div className="section-heading max-w-2xl">
          <span className="eyebrow">Track Breakdown</span>
          <h2 className="section-title">What each exam actually asks.</h2>
          <p>
            Four papers, four formats. Here is the length, the clock and the pass mark
            for each, so you can choose the right place to start.
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
