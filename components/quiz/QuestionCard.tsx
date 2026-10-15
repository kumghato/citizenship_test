'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Flag,
  Check,
  Scale,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { QuizQuestion } from '@/lib/quizData';

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionKey: string | undefined;
  onSelectOption: (optionKey: 'A' | 'B' | 'C' | 'D') => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmitExam: () => void;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionKey,
  onSelectOption,
  isFlagged,
  onToggleFlag,
  onPrevious,
  onNext,
  isFirst,
  isLast,
  onSubmitExam,
}: QuestionCardProps) {
  const [showClue, setShowClue] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-6">
      {/* Category Pills & Question Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Question Index & Standard Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
            Q{currentIndex + 1} of {totalQuestions} • {question.statutoryStandard}
          </span>

          {/* Topic Category */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {question.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/70">
            {question.marks} Mark
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/70">
            {question.type}
          </span>
        </div>
      </div>

      {/* Primary Question Heading & Subtext */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {question.questionText}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
          {question.subtext}
        </p>
      </div>

      {/* Option Choices List (A, B, C, D) */}
      <div className="space-y-3 pt-1">
        {question.options.map((option) => {
          const isSelected = selectedOptionKey === option.key;

          return (
            <div
              key={option.key}
              onClick={() => onSelectOption(option.key)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectOption(option.key);
                }
              }}
              className={`group relative rounded-xl p-4 sm:p-4.5 border-2 cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 text-left outline-none ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-500/15'
                  : 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300'
              }`}
            >
              {/* Left: Key Badge (A, B, C, D) + Text */}
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                <span
                  className={`w-8 h-8 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200/80'
                  }`}
                >
                  {option.key}
                </span>

                <span
                  className={`text-sm sm:text-base font-semibold leading-relaxed transition-colors ${
                    isSelected ? 'text-blue-950 font-bold' : 'text-slate-800'
                  }`}
                >
                  {option.text}
                </span>
              </div>

              {/* Right: Selected Indicator or Pill */}
              {isSelected ? (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                    Current Choice
                  </span>
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-slate-400 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Collapsible Accordion: Need a study clue? Open Statutory Guidance */}
      <div className="pt-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowClue(!showClue)}
            className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors"
            aria-expanded={showClue}
          >
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>Need a study clue? Open Statutory Guidance</span>
            </div>
            {showClue ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showClue && (
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-200/80 text-xs animate-in fade-in duration-200">
              {/* Clue Text */}
              <div className="p-3 rounded-lg bg-white border border-slate-200/80 text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  Statutory Clue
                </div>
                <p className="leading-relaxed text-slate-600">
                  {question.statutoryGuidance.clue}
                </p>
              </div>

              {/* Legal Citation */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span className="font-semibold text-slate-700">Official Citation:</span>
                <span className="font-mono bg-slate-200/70 px-2 py-0.5 rounded text-slate-800 font-medium">
                  {question.statutoryGuidance.legalCitation}
                </span>
              </div>

              {/* Memory Mnemonic Anchor if available */}
              {question.statutoryGuidance.mnemonic && (
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200/70 flex items-start gap-2 text-blue-950 text-[11.5px]">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-900">Memory Mnemonic Anchor:</strong>{' '}
                    {question.statutoryGuidance.mnemonic}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Previous Question Button */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            isFirst
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/60'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Question</span>
        </button>

        {/* Center: Flag Checkbox Toggle */}
        <button
          type="button"
          onClick={onToggleFlag}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            isFlagged
              ? 'text-amber-800 bg-amber-50 border border-amber-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
          }`}
          title="Flag this question to review later before submission"
        >
          <Flag
            className={`w-4 h-4 ${
              isFlagged ? 'text-amber-500 fill-amber-400' : 'text-slate-400'
            }`}
          />
          <span>{isFlagged ? 'Flagged for Review' : 'Flag this question for review'}</span>
        </button>

        {/* Right: Next Question or Final Review & Submit Button */}
        {isLast ? (
          <button
            type="button"
            onClick={onSubmitExam}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Review & Submit Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
export default QuestionCard;
