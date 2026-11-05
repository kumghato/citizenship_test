'use client';

import React from 'react';
import Link from 'next/link';
import { ExamResultData } from '@/lib/resultsData';
import { clearAllExamStorage } from '@/lib/examStorage';

interface ResultsSummaryHeroProps {
  result: ExamResultData;
  onReviewMissed?: () => void;
}

export function ResultsSummaryHero({
  result,
  onReviewMissed,
}: ResultsSummaryHeroProps) {
  const {
    countryId,
    countryName,
    officialBody,
    completionDate,
    timeSpentFormatted,
    totalQuestions,
    correctCount,
    incorrectCount,
    accuracyPercentage,
    passingScore,
    passingPercentage,
    hasPassed,
    certificatePill,
  } = result;

  // SVG Circular Donut calculations
  const radius = 64;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (accuracyPercentage / 100) * circumference;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleScrollToReview = () => {
    if (onReviewMissed) {
      onReviewMissed();
    }
    const element = document.getElementById('statutory-review');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const agencyName = countryId === 'us' ? 'USCIS' : officialBody.split('·')[0].trim();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      {/* Background radial accent tint */}
      <div
        className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${
          hasPassed
            ? 'from-emerald-50/70 via-blue-50/30'
            : 'from-amber-50/70 via-rose-50/30'
        } to-transparent pointer-events-none rounded-full blur-3xl -z-10`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Certificate Eyebrow, Title, Narrative, Metrics & CTAs */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          {/* Top banner pill */}
          <div className="inline-flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${
                hasPassed
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90'
                  : 'bg-amber-50 text-amber-800 border-amber-200/90'
              }`}
            >
              <span>{certificatePill || (hasPassed ? 'OFFICIAL PASS CERTIFICATE' : 'DIAGNOSTIC REPORT · RETEST RECOMMENDED')}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/80">
              <span>COMPLETED ON {completionDate}</span>
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {hasPassed ? (
                <>
                  Congratulations! You Passed the{' '}
                  <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2 underline-offset-4">
                    {agencyName} Civics Simulation
                  </span>
                  !
                </>
              ) : (
                <>
                  Simulation Complete · Diagnostic Review for{' '}
                  <span className="text-amber-700 underline decoration-amber-200 decoration-wavy decoration-2 underline-offset-4">
                    {agencyName} Standards
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle / Narrative */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              {hasPassed ? (
                <>
                  Your overall score of{' '}
                  <strong className="text-slate-900 font-bold">{accuracyPercentage}%</strong> satisfies the{' '}
                  <strong className="text-emerald-700 font-semibold">{passingPercentage}% statutory threshold</strong> for{' '}
                  {countryName}. You demonstrate strong constitutional mastery and are fully on track for your official naturalization eligibility interview.
                </>
              ) : (
                <>
                  Your overall score of{' '}
                  <strong className="text-slate-900 font-bold">{accuracyPercentage}%</strong> ({correctCount}/{totalQuestions}) is below the{' '}
                  <strong className="text-amber-800 font-semibold">{passingPercentage}% statutory threshold ({passingScore}/{totalQuestions})</strong> for{' '}
                  {countryName}. Review the detailed statutory analysis below and retake the test to build passing confidence.
                </>
              )}
            </p>
          </div>

          {/* Mini Metric Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
              <span>
                TOTAL TIME: <strong className="text-slate-900">{timeSpentFormatted}</strong>
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
              <span>
                TOTAL QUESTIONS: <strong className="text-slate-900">{totalQuestions} Questions</strong>
              </span>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-2xs ${
                hasPassed
                  ? 'bg-emerald-50 border-emerald-200/90 text-emerald-800'
                  : 'bg-amber-50 border-amber-200/90 text-amber-800'
              }`}
            >
              <span>
                OVERALL ACCURACY:{' '}
                <strong className={hasPassed ? 'text-emerald-700' : 'text-amber-700'}>
                  {accuracyPercentage}% Correct ({correctCount}/{totalQuestions})
                </strong>
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleScrollToReview}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-500/20 hover:shadow-blue-500/35 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>Review Questions ({incorrectCount} Missed)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors hover:border-slate-400 cursor-pointer"
              title="Print official score certificate and answer sheet"
            >
              <span>Download Score Report PDF</span>
            </button>

            <Link
              href={`/test/${countryId}`}
              onClick={() => clearAllExamStorage()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
              title="Reset timer and attempt a fresh exam set"
            >
              <span>Retake Test (New Set)</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Radial Score Donut Chart & Passing Gauge */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-50/90 to-white border border-slate-200/90 p-6 shadow-xs flex flex-col items-center text-center space-y-5">
            {/* Donut SVG Ring */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                {/* Background Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  className="text-slate-100"
                  fill="transparent"
                />
                {/* Score Completed Stroke */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={`${
                    hasPassed ? 'text-emerald-500' : 'text-amber-500'
                  } transition-all duration-1000 ease-out`}
                  fill="transparent"
                />
              </svg>

              {/* Inside Donut Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {correctCount} / {totalQuestions}
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${
                    hasPassed ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {accuracyPercentage}% ACCURACY
                </span>
                <span className="text-[10px] font-medium text-slate-400 mt-1 flex items-center gap-1">
                  <span>{hasPassed ? 'PASSING TIER' : 'RETEST RECOMMENDED'}</span>
                </span>
              </div>
            </div>

            {/* Gauge Threshold Bar Below the Ring */}
            <div className="w-full space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">
                  Passing Threshold: <span className="text-slate-900 font-bold">{passingPercentage}% ({passingScore}/{totalQuestions})</span>
                </span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-md border ${
                    hasPassed
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-amber-700 bg-amber-50 border-amber-200'
                  }`}
                >
                  Your Score: {accuracyPercentage}% ({correctCount}/{totalQuestions})
                </span>
              </div>

              {/* Visual Multi-Segment Gauge Track */}
              <div className="relative w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80">
                {/* User Score Fill */}
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    hasPassed
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600'
                  }`}
                  style={{ width: `${Math.min(accuracyPercentage, 100)}%` }}
                />

                {/* Passing Threshold Marker Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                  style={{ left: `${passingPercentage}%` }}
                  title={`Passing Threshold: ${passingPercentage}%`}
                />
              </div>

              {/* Gauge sub labels */}
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0%</span>
                <span className="text-slate-700 font-semibold">▲ {passingPercentage}% Passing Cutoff</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsSummaryHero;
