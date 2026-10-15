'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Bookmark,
  BookOpen,
  Filter,
  Sparkles,
  Scale,
} from 'lucide-react';
import { ReviewQuestionItem } from '@/lib/resultsData';

export type FilterTab = 'all' | 'incorrect' | 'correct' | 'flagged';

interface StatutoryReviewSectionProps {
  questions: ReviewQuestionItem[];
  countryName?: string;
  initialFilter?: FilterTab;
}

export function StatutoryReviewSection({
  questions,
  countryName = 'USCIS',
  initialFilter = 'all',
}: StatutoryReviewSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>(initialFilter);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(() => {
    // Initialize with flagged questions
    const set = new Set<number>();
    questions.forEach((q) => {
      if (q.isFlagged) set.add(q.id);
    });
    return set;
  });

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Compute counts dynamically
  const totalCount = questions.length;
  const incorrectCount = useMemo(
    () => questions.filter((q) => !q.isCorrect).length,
    [questions]
  );
  const correctCount = useMemo(
    () => questions.filter((q) => q.isCorrect).length,
    [questions]
  );
  const flaggedCount = bookmarkedIds.size;

  // Filtered question items
  const filteredQuestions = useMemo(() => {
    switch (activeFilter) {
      case 'incorrect':
        return questions.filter((q) => !q.isCorrect);
      case 'correct':
        return questions.filter((q) => q.isCorrect);
      case 'flagged':
        return questions.filter((q) => bookmarkedIds.has(q.id));
      case 'all':
      default:
        return questions;
    }
  }, [questions, activeFilter, bookmarkedIds]);

  return (
    <section id="statutory-review" className="scroll-mt-24 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-slate-200/90">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
            <Scale className="w-3.5 h-3.5" />
            <span>Official Rubric Evaluation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Question-by-Question Statutory Review
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Compare your answers against the official {countryName} rubric with deep historical context and legal authority.
          </p>
        </div>

        {/* Filter Tabs Pill Group */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <span>All Questions</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {totalCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('incorrect')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'incorrect'
                ? 'bg-white text-rose-700 shadow-xs border border-rose-200'
                : 'text-slate-600 hover:text-rose-700 hover:bg-slate-200/50'
            }`}
          >
            <span>Incorrect Only</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'incorrect'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {incorrectCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('correct')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'correct'
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-200/50'
            }`}
          >
            <span>Correct</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'correct'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {correctCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('flagged')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'flagged'
                ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                : 'text-slate-600 hover:text-amber-900 hover:bg-slate-200/50'
            }`}
          >
            <span>Flagged</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'flagged'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {flaggedCount}
            </span>
          </button>
        </div>
      </div>

      {/* Empty State if filter returns no items */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No questions match &ldquo;{activeFilter}&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            There are currently zero questions in this filtered view. Switch back to all questions to review your full test run.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700"
          >
            View All Questions ({totalCount})
          </button>
        </div>
      ) : (
        /* Question Review Cards List */
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const isBookmarked = bookmarkedIds.has(q.id);

            return (
              <article
                key={q.id}
                className={`rounded-3xl bg-white border transition-all duration-200 shadow-xs hover:shadow-sm overflow-hidden ${
                  q.isCorrect
                    ? 'border-slate-200/90 hover:border-slate-300'
                    : 'border-rose-200/90 hover:border-rose-300 ring-1 ring-rose-500/10'
                }`}
              >
                <div className="p-6 sm:p-7 space-y-5">
                  {/* Card Header: Question index badge, Category trail, Status badge, Bookmark link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Question Index Badge */}
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-800">
                        Question {String(q.questionNumber).padStart(2, '0')}
                      </span>

                      {/* Category Trail */}
                      <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">
                        {q.categoryTrail}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {/* Status Badge */}
                      {q.isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>CORRECT</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>INCORRECT</span>
                        </span>
                      )}

                      {/* Bookmark / Save Link */}
                      <button
                        type="button"
                        onClick={() => toggleBookmark(q.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                          isBookmarked
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question for review'}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isBookmarked
                              ? 'fill-amber-500 text-amber-600'
                              : 'text-slate-400'
                          }`}
                        />
                        <span className="hidden sm:inline">
                          {isBookmarked ? 'Saved' : 'Bookmark'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Question Title & Subtext */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {q.questionText}
                    </h3>
                    {q.subtext && (
                      <p className="text-xs text-slate-500 font-normal">
                        {q.subtext}
                      </p>
                    )}
                  </div>

                  {/* Split Answers Grid: User Submission (Left) vs Official Answer (Right) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column: User Submission */}
                    <div
                      className={`p-4 rounded-2xl border space-y-1.5 ${
                        q.isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                          : 'bg-rose-50/70 border-rose-200/90 text-rose-950'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {q.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                              YOUR CORRECT SUBMISSION &amp; OFFICIAL HIT:
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                              YOUR SUBMISSION:
                            </span>
                          </>
                        )}
                      </div>

                      <div className="text-sm font-extrabold pl-6">
                        {q.userAnswerText}
                      </div>
                    </div>

                    {/* Right Column: Official Accepted Historic Answer */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-1.5 text-emerald-950">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                          OFFICIAL ACCEPTED HISTORIC ANSWER:
                        </span>
                      </div>

                      <div className="text-sm font-extrabold text-slate-900 pl-6">
                        {q.officialAnswerText}
                      </div>
                    </div>
                  </div>

                  {/* "Why this is correct" Callout Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/40 border border-blue-200/70 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                      <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Why this is correct &amp; Official USCIS Context</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {q.whyCorrectContext}
                    </p>

                    {/* Memory Mnemonic if available */}
                    {q.mnemonic && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-100/60 border border-blue-200/90 text-xs text-blue-900 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>
                          <strong>CivicPass Mnemonic:</strong> {q.mnemonic}
                        </span>
                      </div>
                    )}

                    {/* Small Statutory Reference Footer */}
                    <div className="pt-2.5 border-t border-blue-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
                      <span>{q.statutoryReference}</span>
                      {q.legalCitation && (
                        <span className="text-blue-700 font-semibold font-mono">
                          Citation: {q.legalCitation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default StatutoryReviewSection;
