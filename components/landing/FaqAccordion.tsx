'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Check,
  Building2,
  Sparkles,
} from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  category: string;
  content: React.ReactNode;
}

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const faqItems: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What is the exact exam format, question count, and passing score for each country?',
      category: 'Exam Structure',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            Every country has distinct testing requirements, formats, and passing thresholds.
            CivicPass custom-tunes practice engines to match each government body&apos;s exact test conditions:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-semibold">
                <tr>
                  <th className="py-2.5 px-3.5">Country & Agency</th>
                  <th className="py-2.5 px-3">Exam Format</th>
                  <th className="py-2.5 px-3">Question Count</th>
                  <th className="py-2.5 px-3">Passing Score</th>
                  <th className="py-2.5 px-3">Time Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>🇺🇸</span> United States (USCIS)
                  </td>
                  <td className="py-2.5 px-3">Oral Interview with Officer</td>
                  <td className="py-2.5 px-3">10 questions from 100 pool</td>
                  <td className="py-2.5 px-3 text-blue-700 font-semibold">6 / 10 correct (60%)</td>
                  <td className="py-2.5 px-3">Untimed (in interview)</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>🇬🇧</span> United Kingdom (Home Office)
                  </td>
                  <td className="py-2.5 px-3">Computerized Multiple Choice</td>
                  <td className="py-2.5 px-3">24 official questions</td>
                  <td className="py-2.5 px-3 text-blue-700 font-semibold">18 / 24 correct (75%)</td>
                  <td className="py-2.5 px-3">45 minutes</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>🇨🇦</span> Canada (IRCC)
                  </td>
                  <td className="py-2.5 px-3">Online / In-person MCQ</td>
                  <td className="py-2.5 px-3">20 questions (MCQ & T/F)</td>
                  <td className="py-2.5 px-3 text-blue-700 font-semibold">15 / 20 correct (75%)</td>
                  <td className="py-2.5 px-3">30 minutes</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>🇦🇺</span> Australia (DHA)
                  </td>
                  <td className="py-2.5 px-3">Computerized Multiple Choice</td>
                  <td className="py-2.5 px-3">20 questions</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold">
                    75% + 5/5 on Australian Values
                  </td>
                  <td className="py-2.5 px-3">45 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>CivicPass tests adapt in real time to your selected country with exact passing criteria.</span>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-2',
      question: 'How does the CivicPass 99.4% Pass Guarantee work?',
      category: 'Guarantee & Refunds',
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p className="leading-relaxed">
            We are so confident in our active-recall engine that we back every user with an ironclad,
            100% money-back guarantee. If you complete our preparation benchmarks and don&apos;t pass
            your official exam, we refund every cent.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">1</span>
                Score 90%+ Twice
              </div>
              <p className="text-xs text-slate-600">
                Score 90% or higher on at least 2 full-length simulated practice exams in CivicPass.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">2</span>
                Take Official Test
              </div>
              <p className="text-xs text-slate-600">
                Sit for your official government exam with USCIS, Home Office, IRCC, or DHA within 90 days.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">3</span>
                Instant 100% Refund
              </div>
              <p className="text-xs text-slate-600">
                In the rare event you don&apos;t pass, email your notice letter for a full refund within 24 hours.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-3',
      question: 'Are the questions verified against 2026 official government releases?',
      category: 'Question Bank',
      content: (
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
          <p>
            Yes. All questions, answers, and study notes are 100% updated and verified for 2026.
            CivicPass continuously monitors federal government notices, including:
          </p>
          <ul className="space-y-2 text-xs text-slate-700 pl-1">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Dynamic Elected Official Updates:</strong> Automated updates for current Governors, U.S. Senators, Cabinet Members, UK Prime Ministers, and Australian parliamentary leadership.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Official Legal Citations:</strong> Every question references the specific constitutional article, statute, or official syllabus chapter (e.g., <em>Discover Canada</em>, <em>Our Common Bond</em>).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Attorney Reviewed:</strong> Question sets and legal explanations are vetted by immigration attorneys and former citizenship testing administrators.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-4',
      question: 'How does the USCIS Oral Interview Simulator work?',
      category: 'Audio & Speech',
      content: (
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
          <p>
            Unlike the UK, Canada, and Australia (which use computer-based screens), the United States
            USCIS test is an <strong>oral interview</strong> conducted by a live immigration officer.
          </p>
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 space-y-2">
            <div className="font-semibold text-blue-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-700" />
              Real USCIS Interview Experience
            </div>
            <p>
              Our Oral Simulator plays voice prompts spoken by diverse officer voices at natural interview speed.
              You speak your answer aloud into your smartphone or microphone. The system verifies whether your
              phrasing complies with the USCIS acceptable answer key guidelines.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-5',
      question: 'Can I study for multiple countries if applying for dual citizenship?',
      category: 'Accounts & Access',
      content: (
        <p className="text-sm text-slate-600 leading-relaxed">
          Yes. A CivicPass account gives you full unrestricted access to all four jurisdictions (United States,
          United Kingdom, Canada, and Australia). You can effortlessly switch your active test dashboard with a
          single click in your account settings with separate tracking and metrics for each country.
        </p>
      ),
    },
    {
      id: 'faq-6',
      question: 'Is internet access required, or can I practice offline?',
      category: 'Study Tools',
      content: (
        <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
          <p>
            CivicPass includes full offline support via modern Progressive Web App (PWA) caching.
            You can download high-yield audio flashcard packs (MP3 format) and printable PDF cheat sheets
            for studying on flights, subway commutes, or in USCIS field office waiting rooms.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-blue-300 shadow-md shadow-blue-500/5'
                : 'bg-white/90 border-slate-200/90 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full py-4 px-5 md:px-6 flex items-center justify-between text-left gap-4"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                    isOpen
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 block mb-0.5">
                    {item.category}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 block">
                    {item.question}
                  </span>
                </div>
              </div>

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'rotate-180 bg-blue-50 text-blue-600'
                    : 'bg-slate-50 text-slate-400'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 md:px-6 pb-5 pt-1 border-t border-slate-100 animate-in fade-in duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default FaqAccordion;
