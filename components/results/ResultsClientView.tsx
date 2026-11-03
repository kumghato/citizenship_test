'use client';

import React, { useState, useMemo, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ExamResultData } from '@/lib/resultsData';
import { getExamConfig } from '@/lib/quizData';
import { evaluateExamResults, ExamSubmissionPayload } from '@/lib/evaluateExam';
import { ResultsNavbar } from './ResultsNavbar';
import { ResultsSummaryHero } from './ResultsSummaryHero';
import { CivicDomainsCard } from './CivicDomainsCard';
import { TargetedFocusCard } from './TargetedFocusCard';
import { StatutoryReviewSection, FilterTab } from './StatutoryReviewSection';
import { NextActionGrid } from './NextActionGrid';

interface ResultsClientViewProps {
  initialResult: ExamResultData;
}

const subscribeStorage = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('civicpass_result_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('civicpass_result_updated', callback);
  };
};

export function ResultsClientView({ initialResult }: ResultsClientViewProps) {
  const [activeReviewFilter, setActiveReviewFilter] = useState<FilterTab>('all');
  const [clientMounted, setClientMounted] = useState<boolean>(false);

  useEffect(() => {
    setClientMounted(true);
  }, []);

  const getSnapshot = () => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(`civicpass_result_${initialResult.countryId}`);
  };

  const getServerSnapshot = () => null;

  const sessionRaw = useSyncExternalStore(
    subscribeStorage,
    getSnapshot,
    getServerSnapshot
  );

  const { result, isFromLiveSession } = useMemo<{
    result: ExamResultData;
    isFromLiveSession: boolean;
  }>(() => {
    if (!sessionRaw) {
      return { result: initialResult, isFromLiveSession: false };
    }

    try {
      const parsed = JSON.parse(sessionRaw) as ExamSubmissionPayload;
      if (!parsed || !parsed.answers) {
        return { result: initialResult, isFromLiveSession: false };
      }

      const examConfig = getExamConfig(initialResult.countryId);
      const evaluated = evaluateExamResults(parsed, examConfig);
      return { result: evaluated, isFromLiveSession: true };
    } catch (e) {
      console.warn('Could not parse session quiz results:', e);
      return { result: initialResult, isFromLiveSession: false };
    }
  }, [sessionRaw, initialResult]);

  const handleReviewMissed = () => {
    setActiveReviewFilter('incorrect');
    const elem = document.getElementById('statutory-review');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="results-shell min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Navbar Chrome */}
      <ResultsNavbar
        countryId={result.countryId}
        countryName={result.countryName}
        flag={result.flag}
        hasPassed={result.hasPassed}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dynamic Status Callout Banner */}
        {clientMounted && (
          isFromLiveSession ? (
            <div className="bg-emerald-50/90 border border-emerald-200/90 text-emerald-950 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎯</span>
                <div className="text-xs sm:text-sm">
                  <strong className="font-bold text-emerald-900">Personalized Dynamic Examination Results</strong>
                  <p className="text-emerald-800/90 text-xs mt-0.5">
                    Evaluated directly from your completed simulation of {result.totalQuestions} questions. Review your score, domain mastery, and statutory analysis below.
                  </p>
                </div>
              </div>
              <Link
                href={`/test/${result.countryId}`}
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-2xs"
              >
                <span>Retake Fresh Simulation</span>
              </Link>
            </div>
          ) : (
            <div className="bg-amber-50/90 border border-amber-200/90 text-amber-950 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="text-xl">📋</span>
                <div className="text-xs sm:text-sm">
                  <strong className="font-bold text-amber-900">Sample Diagnostic Preview</strong>
                  <p className="text-amber-800/90 text-xs mt-0.5">
                    Showing a sample results rubric for {result.countryName}. Take an official practice test to generate your own personalized, dynamic score report.
                  </p>
                </div>
              </div>
              <Link
                href={`/test/${result.countryId}`}
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs"
              >
                <span>Launch Practice Test</span>
              </Link>
            </div>
          )
        )}

        {/* 2. Results Summary Hero (Pass/Fail Certificate, Donut Chart, Metrics, CTAs) */}
        <ResultsSummaryHero
          result={result}
          onReviewMissed={handleReviewMissed}
        />

        {/* 3. Middle 2-Column Grid: Civic Domains Card (Left) & Targeted Focus Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <CivicDomainsCard
            domains={result.domains}
            countryName={result.countryName}
          />

          <TargetedFocusCard
            recommendation={result.targetFocus.recommendation}
            insiderNote={result.targetFocus.insiderNote}
            oralExamClarity={result.targetFocus.oralExamClarity}
            oralExamStatus={result.targetFocus.oralExamStatus}
          />
        </div>

        {/* 4. Statutory Review Section */}
        <StatutoryReviewSection
          questions={result.questions}
          countryName={result.countryName}
          initialFilter={activeReviewFilter}
        />

        {/* 5. Next Actions Grid */}
        <NextActionGrid
          countryId={result.countryId}
          incorrectCount={result.incorrectCount}
          onPracticeMissed={handleReviewMissed}
        />
      </main>
    </div>
  );
}

export default ResultsClientView;
