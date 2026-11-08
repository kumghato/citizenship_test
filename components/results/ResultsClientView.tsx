'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ExamResultData } from '@/lib/resultsData';
import { getExamConfig } from '@/lib/quizData';
import { evaluateExamResults } from '@/lib/evaluateExam';
import { getUserSelectedAnswers, clearAllExamStorage } from '@/lib/examStorage';
import { ResultsNavbar } from './ResultsNavbar';
import { ResultsSummaryHero } from './ResultsSummaryHero';
import { CivicDomainsCard } from './CivicDomainsCard';
import { TargetedFocusCard } from './TargetedFocusCard';
import { StatutoryReviewSection, FilterTab } from './StatutoryReviewSection';
import { NextActionGrid } from './NextActionGrid';

interface ResultsClientViewProps {
  initialResult: ExamResultData;
}

export function ResultsClientView({ initialResult }: ResultsClientViewProps) {
  const [activeReviewFilter, setActiveReviewFilter] = useState<FilterTab>('all');
  const [clientMounted, setClientMounted] = useState<boolean>(false);
  const [evaluatedResult, setEvaluatedResult] = useState<ExamResultData | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(true);
  const [isFromLiveSession, setIsFromLiveSession] = useState<boolean>(false);

  // Compare user's selected answers from session storage against official questions fetched via API
  const evaluateAnswers = useCallback(async () => {
    // 1. Read ONLY the selected answers from sessionStorage (NO questions are in storage)
    const storedAnswers = getUserSelectedAnswers(initialResult.countryId);

    if (!storedAnswers || !storedAnswers.questionIds || storedAnswers.questionIds.length === 0) {
      setEvaluatedResult(null);
      setIsFromLiveSession(false);
      setIsEvaluating(false);
      return;
    }

    try {
      setIsEvaluating(true);
      // 2. Fetch the questions by IDs using API call only to compare the answers
      const idsParam = storedAnswers.questionIds.join(',');
      const res = await fetch(`/api/questions/${initialResult.countryId}?ids=${idsParam}&random=false`);

      if (!res.ok) {
        throw new Error(`Failed to load questions for evaluation: HTTP ${res.status}`);
      }

      const data = await res.json();
      const questions = data.questions || [];

      if (questions.length > 0) {
        const examConfig = getExamConfig(initialResult.countryId);
        // 3. Dynamically evaluate by comparing user's selected answers against official answers
        const evaluated = evaluateExamResults(
          {
            countryId: initialResult.countryId,
            questions,
            answers: storedAnswers.selectedAnswers,
            flagged: storedAnswers.flaggedIds,
            timeSpentSeconds: storedAnswers.timeSpentSeconds,
            submittedAt: storedAnswers.submittedAt,
          },
          examConfig
        );

        setEvaluatedResult(evaluated);
        setIsFromLiveSession(true);
      } else {
        setEvaluatedResult(null);
        setIsFromLiveSession(false);
      }
    } catch (err) {
      console.warn('Could not compare exam answers via API:', err);
      setEvaluatedResult(null);
      setIsFromLiveSession(false);
    } finally {
      setIsEvaluating(false);
    }
  }, [initialResult.countryId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClientMounted(true);
    evaluateAnswers();

    const handleStorageChange = () => {
      evaluateAnswers();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('civicpass_answers_updated', handleStorageChange);
    window.addEventListener('civicpass_storage_cleared', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('civicpass_answers_updated', handleStorageChange);
      window.removeEventListener('civicpass_storage_cleared', handleStorageChange);
    };
  }, [evaluateAnswers]);

  const handleReviewMissed = () => {
    setActiveReviewFilter('incorrect');
    const elem = document.getElementById('statutory-review');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentResult: ExamResultData = evaluatedResult || initialResult;

  return (
    <div className="results-shell min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Navbar Chrome */}
      <ResultsNavbar
        countryId={currentResult.countryId}
        countryName={currentResult.countryName}
        flag={currentResult.flag}
        hasPassed={currentResult.hasPassed}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
        {/* Dynamic Status Callout Banner */}
        {clientMounted && isEvaluating ? (
          <div className="bg-blue-50/90 border border-blue-200/90 text-blue-950 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs sm:text-sm font-semibold text-blue-900">
              Comparing your selected answers against statutory criteria via secure API...
            </span>
          </div>
        ) : clientMounted && isFromLiveSession ? (
          <div className="bg-emerald-50/90 border border-emerald-200/90 text-emerald-950 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <div className="text-xs sm:text-sm">
                <strong className="font-bold text-emerald-900">Personalized Dynamic Examination Results</strong>
                <p className="text-emerald-800/90 text-xs mt-0.5">
                  Evaluated directly from your completed simulation of {currentResult.totalQuestions} questions. Review your score, domain mastery, and statutory analysis below.
                </p>
              </div>
            </div>
            <Link
              href={`/test/${currentResult.countryId}`}
              onClick={() => clearAllExamStorage()}
              className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-2xs"
            >
              <span>Retake Fresh Simulation</span>
            </Link>
          </div>
        ) : (
          clientMounted && (
            <div className="bg-amber-50/90 border border-amber-200/90 text-amber-950 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="text-xl">📋</span>
                <div className="text-xs sm:text-sm">
                  <strong className="font-bold text-amber-900">Sample Diagnostic Preview</strong>
                  <p className="text-amber-800/90 text-xs mt-0.5">
                    Showing a sample results rubric for {currentResult.countryName}. Take an official practice test to generate your own personalized, dynamic score report.
                  </p>
                </div>
              </div>
              <Link
                href={`/test/${currentResult.countryId}`}
                onClick={() => clearAllExamStorage()}
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs"
              >
                <span>Launch Practice Test</span>
              </Link>
            </div>
          )
        )}

        {/* 2. Results Summary Hero (Pass/Fail Certificate, Donut Chart, Metrics, CTAs) */}
        <ResultsSummaryHero
          result={currentResult}
          onReviewMissed={handleReviewMissed}
        />

        {/* 3. Middle 2-Column Grid: Civic Domains Card (Left) & Targeted Focus Card (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          <CivicDomainsCard
            domains={currentResult.domains}
            countryName={currentResult.countryName}
          />

          <TargetedFocusCard
            recommendation={currentResult.targetFocus.recommendation}
            insiderNote={currentResult.targetFocus.insiderNote}
            oralExamClarity={currentResult.targetFocus.oralExamClarity}
            oralExamStatus={currentResult.targetFocus.oralExamStatus}
          />
        </div>

        {/* 4. Statutory Review Section */}
        <StatutoryReviewSection
          questions={currentResult.questions}
          countryName={currentResult.countryName}
          initialFilter={activeReviewFilter}
        />

        {/* 5. Next Actions Grid */}
        <NextActionGrid
          countryId={currentResult.countryId}
          incorrectCount={currentResult.incorrectCount}
          onPracticeMissed={handleReviewMissed}
        />
      </main>
    </div>
  );
}

export default ResultsClientView;
