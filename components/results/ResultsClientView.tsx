'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { ExamResultData, ReviewQuestionItem } from '@/lib/resultsData';
import { getExamConfig } from '@/lib/quizData';
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
  return () => window.removeEventListener('storage', callback);
};

export function ResultsClientView({ initialResult }: ResultsClientViewProps) {
  const [activeReviewFilter, setActiveReviewFilter] = useState<FilterTab>('all');

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

  const result = useMemo<ExamResultData>(() => {
    if (!sessionRaw) return initialResult;

    try {
      const parsed = JSON.parse(sessionRaw);
      if (!parsed || !parsed.answers) return initialResult;

      const examConfig = getExamConfig(initialResult.countryId);
      if (!examConfig) return initialResult;

      const answers: Record<number, string> = parsed.answers || {};
      const flaggedArray: number[] = parsed.flagged || [];
      const flaggedSet = new Set<number>(flaggedArray);
      const timeSpentSec: number = parsed.timeSpentSeconds || 692; // default 11m 32s

      const minutes = Math.floor(timeSpentSec / 60);
      const seconds = timeSpentSec % 60;
      const timeSpentFormatted = `${minutes}m ${String(seconds).padStart(2, '0')}s`;

      const dynamicQuestions: ReviewQuestionItem[] = examConfig.questions.map((q, idx) => {
        const userKey = (answers[idx] as 'A' | 'B' | 'C' | 'D') || null;
        const userOpt = q.options.find((opt) => opt.key === userKey);
        const officialOpt = q.options.find((opt) => opt.key === q.correctAnswer);
        const isCorrect = userKey === q.correctAnswer;
        const isFlagged = flaggedSet.has(idx);

        const domainName = q.category.includes('Government')
          ? 'American Government'
          : q.category.includes('History')
          ? 'American History'
          : 'Integrated Civics';

        return {
          id: q.id,
          questionNumber: idx + 1,
          domain: domainName,
          category: q.category,
          categoryTrail: q.category.toUpperCase().replace('•', '•'),
          questionText: q.questionText,
          subtext: q.subtext,
          userAnswerKey: userKey,
          userAnswerText: userOpt ? userOpt.text : 'No Submission',
          officialAnswerKey: q.correctAnswer,
          officialAnswerText: officialOpt ? officialOpt.text : '',
          isCorrect,
          isFlagged,
          statutoryReference: `Statutory Reference: ${q.statutoryStandard}, Question ${idx + 1}`,
          whyCorrectContext:
            q.statutoryGuidance.dossierNotes || q.statutoryGuidance.clue,
          legalCitation: q.statutoryGuidance.legalCitation,
          mnemonic: q.statutoryGuidance.mnemonic,
        };
      });

      const correctCount = dynamicQuestions.filter((q) => q.isCorrect).length;
      const incorrectCount = dynamicQuestions.length - correctCount;
      const accuracyPercentage = Math.round((correctCount / dynamicQuestions.length) * 100);
      const hasPassed = correctCount >= examConfig.passingScore;

      if (Object.keys(answers).length > 0) {
        return {
          ...initialResult,
          timeSpentFormatted,
          correctCount,
          incorrectCount,
          flaggedCount: flaggedSet.size,
          accuracyPercentage,
          hasPassed,
          questions: dynamicQuestions,
        };
      }
    } catch (e) {
      console.warn('Could not parse session quiz results:', e);
    }

    return initialResult;
  }, [sessionRaw, initialResult]);

  const handleReviewMissed = () => {
    setActiveReviewFilter('incorrect');
    const elem = document.getElementById('statutory-review');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Navbar Chrome with Active State Pill on "Results & Review" */}
      <ResultsNavbar
        countryId={result.countryId}
        countryName={result.countryName}
        flag={result.flag}
        hasPassed={result.hasPassed}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 2. Results Summary Hero (Pass Certificate, Donut Chart, Metrics, CTAs) */}
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

        {/* 4. Statutory Review Section (Client Filtering: All, Incorrect, Correct, Flagged) */}
        <StatutoryReviewSection
          questions={result.questions}
          countryName={result.countryId === 'us' ? 'USCIS' : result.countryName}
          initialFilter={activeReviewFilter}
        />

        {/* 5. Next Action Grid (Practice Missed, Next Mock #5, Cross-Commonwealth Track) */}
        <NextActionGrid
          countryId={result.countryId}
          incorrectCount={result.incorrectCount}
          onPracticeMissed={handleReviewMissed}
        />
      </main>

      {/* Subdued Footer Note */}
      <footer className="border-t border-slate-200/80 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            CivicPass™ Official Practice Examination Engine · Verified against {result.officialBody} Statutory Standards.
          </p>
          <p className="text-[11px] text-slate-400">
            For preparation purposes only. All marks and official rubrics adhere to Section 312 of the Immigration and Nationality Act.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ResultsClientView;
