'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';

import { CountryExamConfig, QuizQuestion } from '@/lib/quizData';
import { saveUserSelectedAnswers, clearAllExamStorage } from '@/lib/examStorage';
import { QuizHeader } from './QuizHeader';
import { QuestionCard } from './QuestionCard';
import { QuestionPalette } from './QuestionPalette';
import { TestRulesCard } from './TestRulesCard';
import { SourceDossierCard } from './SourceDossierCard';

interface QuizContainerProps {
  config: CountryExamConfig;
}

export function QuizContainer({ config }: QuizContainerProps) {
  const {
    id: countryId,
    countryName,
    flag,
    examTitle,
    bankPill,
    modeBadge,
    passingScore,
    passingPercentage,
    timeLimitSeconds,
    hotlineName,
    hotlineNumber,
    hotlineHours,
    dossierTitle,
    dossierParchmentTitle,
  } = config;

  // Master Orchestration States
  const router = useRouter();
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [totalBankCount, setTotalBankCount] = useState<number>(1000);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [remainingTime, setRemainingTime] = useState<number>(timeLimitSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [scratchpadNotes, setScratchpadNotes] = useState<string>('');

  // Flags to prevent accidental clearance on legitimate exam submission
  const isSubmittingRef = useRef<boolean>(false);

  // Timer interval reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Cleans all session and local storage when exiting the exam room.
   */
  const handleExitExam = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      clearAllExamStorage();
      router.push('/');
    },
    [router]
  );

  /**
   * Prepares random questions from questions data via API call only.
   * Does NOT fetch all data; requests only the randomized exam subset (e.g. 20 questions).
   */
  const fetchQuestionsFromApi = useCallback(
    async (count = config.totalQuestions || 20) => {
      setIsLoadingApi(true);
      setApiError(null);
      try {
        const res = await fetch(`/api/questions/${countryId}?limit=${count}&random=true`);
        if (!res.ok) {
          throw new Error(`Failed to load questions: HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setActiveQuestions(data.questions);
          if (data.pagination?.totalAvailable) {
            setTotalBankCount(data.pagination.totalAvailable);
          }
          setAnswers({});
          setFlaggedQuestions(new Set());
          setCurrentQuestionIndex(0);
          setRemainingTime(timeLimitSeconds);
          setIsSubmitted(false);
          setIsPaused(false);
          setReviewMode(false);

          // Clear any stale storage data on fresh exam generation
          clearAllExamStorage();
        } else {
          throw new Error('No questions returned by the API');
        }
      } catch (err: unknown) {
        const error = err as { message?: string };
        console.error('Could not fetch questions from API:', err);
        setApiError(error?.message || 'Could not load questions. Please check connection and retry.');
      } finally {
        setIsLoadingApi(false);
      }
    },
    [countryId, config.totalQuestions, timeLimitSeconds]
  );

  // When user selects the exam: always prepare random questions via API call only
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchQuestionsFromApi(config.totalQuestions || 20);
  }, [fetchQuestionsFromApi, config.totalQuestions]);

  // Window unload / unmount listener: clear all session and local storage on exit
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isSubmittingRef.current) {
        clearAllExamStorage();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (!isSubmittingRef.current) {
        clearAllExamStorage();
      }
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (isSubmitted || isPaused || isLoadingApi) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted, isPaused, isLoadingApi]);

  const totalQuestions = activeQuestions.length > 0 ? activeQuestions.length : (config.totalQuestions || 20);

  /**
   * When user selects an option, store ONLY the selected answers in sessionStorage
   * to compare answers later. Zero questions data is stored.
   */
  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted && !reviewMode) return;
    const currentQ = activeQuestions[currentQuestionIndex];
    if (!currentQ) return;

    setAnswers((prev) => {
      const nextAnswers = {
        ...prev,
        [currentQuestionIndex]: optionKey,
      };

      // Save ONLY selected answers mapping (question ID -> option key)
      const selectedAnswers: Record<number, string | null> = {};
      const questionIds: number[] = [];

      activeQuestions.forEach((q, idx) => {
        questionIds.push(q.id);
        selectedAnswers[q.id] = idx === currentQuestionIndex ? optionKey : (prev[idx] ?? null);
      });

      const flaggedIds = Array.from(flaggedQuestions)
        .map((idx) => activeQuestions[idx]?.id)
        .filter(Boolean) as number[];

      saveUserSelectedAnswers({
        countryId,
        selectedAnswers,
        questionIds,
        flaggedIds,
        timeSpentSeconds: timeLimitSeconds - remainingTime,
        submittedAt: Date.now(),
      });

      return nextAnswers;
    });
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestionIndex)) {
        next.delete(currentQuestionIndex);
      } else {
        next.add(currentQuestionIndex);
      }
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleResetExam = () => {
    fetchQuestionsFromApi(config.totalQuestions || 20);
  };

  // Score calculations in memory
  const answeredCount = Object.keys(answers).length;

  /**
   * Persist ONLY user selected answers in sessionStorage to compare answers,
   * then navigate to results. No question data is stored in session/local storage.
   */
  const handleSubmitExam = useCallback(() => {
    isSubmittingRef.current = true;
    const timeSpent = timeLimitSeconds - remainingTime;

    // Save ONLY selected answers and question IDs into session storage
    // Absolutely NO questions or answers data from question bank is stored
    const selectedAnswers: Record<number, string | null> = {};
    const questionIds: number[] = [];

    activeQuestions.forEach((q, idx) => {
      questionIds.push(q.id);
      selectedAnswers[q.id] = answers[idx] ?? null;
    });

    const flaggedIds = Array.from(flaggedQuestions)
      .map((idx) => activeQuestions[idx]?.id)
      .filter(Boolean) as number[];

    saveUserSelectedAnswers({
      countryId,
      selectedAnswers,
      questionIds,
      flaggedIds,
      timeSpentSeconds: timeSpent,
      submittedAt: Date.now(),
    });

    router.push(`/test/${countryId}/results`);
  }, [
    timeLimitSeconds,
    remainingTime,
    countryId,
    activeQuestions,
    answers,
    flaggedQuestions,
    router,
  ]);

  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  return (
    <div className="exam-shell min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      {/* Top Navigation Bar / Exam Room Chrome */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          {/* Left: Exit Link & Logo (exiting clears all session & local storage) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExitExam}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Exit examination and clear all session storage"
            >
              <span>Exit Exam</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <button
              type="button"
              onClick={handleExitExam}
              className="flex items-center gap-2 cursor-pointer group text-left"
              title="Return to Home (exits exam and clears all storage)"
            >
              <Image
                src="/icon1.svg"
                alt="CivicPass logo"
                width={28}
                height={28}
                className="w-7 h-7 rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0"
              />
              <span className="font-extrabold text-slate-900 text-base tracking-tight">
                Civic<span className="text-blue-600">Pass</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200/70 flex items-center gap-1">
                <span>{flag}</span>
                <span>{countryName}</span>
              </span>
            </button>
          </div>

          {/* Center: Navigation Steps */}
          <nav aria-label="Exam Progress" className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200/80">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs">
              <span>1. Exam Simulation</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-500">
              <span>2. Results &amp; Statutory Review</span>
            </div>
          </nav>

          {/* Right: Quick Tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsScratchpadOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="Open applicant notes scratchpad"
            >
              <span>Notes</span>
            </button>

            <button
              type="button"
              onClick={handleResetExam}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Reset and fetch fresh randomized questions"
            >
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Test Room Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* On-Demand Question API Banner */}
        <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Official Database: <strong>{totalBankCount.toLocaleString()}+ Questions</strong>
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">
              Active Simulation: <strong>{activeQuestions.length} Questions</strong> prepared dynamically
            </span>
          </div>

          <button
            type="button"
            onClick={() => fetchQuestionsFromApi(config.totalQuestions || 20)}
            disabled={isLoadingApi}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/70 transition-all cursor-pointer disabled:opacity-50"
            title="Fetch a fresh randomized batch of questions via API"
          >
            <span>{isLoadingApi ? 'Fetching from API...' : '⚡ Randomize New Questions'}</span>
          </button>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <span>{apiError}</span>
            <button
              type="button"
              onClick={() => fetchQuestionsFromApi(config.totalQuestions || 20)}
              className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (~68% width on desktop: col-span-12 lg:col-span-8) */}
          <section className="lg:col-span-8 space-y-6">
            {/* Header: Timer, Badges, Dual Progress Bar */}
            <QuizHeader
              examTitle={examTitle}
              bankPill={bankPill}
              modeBadge={modeBadge}
              flag={flag}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              answeredCount={answeredCount}
              passingScore={passingScore}
              passingPercentage={passingPercentage}
              remainingTime={remainingTime}
              totalTime={timeLimitSeconds}
              isPaused={isPaused}
              onTogglePause={() => setIsPaused((prev) => !prev)}
              flaggedCount={flaggedQuestions.size}
              onOpenScratchpad={() => setIsScratchpadOpen(true)}
              onSubmitExam={handleSubmitExam}
            />

            {/* Loading Indicator when fetching random questions from API */}
            {isLoadingApi ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-slate-700">
                  Preparing random questions from the official {countryName} question data via API...
                </p>
                <p className="text-xs text-slate-500">
                  Fetching only the required exam questions. No full database is sent to browser.
                </p>
              </div>
            ) : isPaused ? (
              /* Paused Mask Overlay if exam is paused */
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm py-16">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                  <Clock className="w-6 h-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Exam Timer Paused
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  The test questions and timer are currently frozen. Click resume when you are ready to continue your timed session.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaused(false)}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Resume Examination</span>
                  </button>
                </div>
              </div>
            ) : currentQuestion ? (
              /* Active Question Card */
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                selectedOptionKey={answers[currentQuestionIndex]}
                onSelectOption={handleSelectOption}
                isFlagged={flaggedQuestions.has(currentQuestionIndex)}
                onToggleFlag={handleToggleFlag}
                onPrevious={handlePreviousQuestion}
                onNext={handleNextQuestion}
                isFirst={currentQuestionIndex === 0}
                isLast={currentQuestionIndex === totalQuestions - 1}
                onSubmitExam={handleSubmitExam}
              />
            ) : null}
          </section>

          {/* Right Column (~32% width on desktop: col-span-12 lg:col-span-4) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 1. Question Palette Grid */}
            <QuestionPalette
              totalQuestions={totalQuestions}
              currentIndex={currentQuestionIndex}
              answers={answers}
              flaggedQuestionIndices={flaggedQuestions}
              onSelectQuestion={handleJumpToQuestion}
            />

            {/* 2. Source Dossier Card with Parchment Graphic */}
            {currentQuestion && (
              <SourceDossierCard
                countryId={countryId}
                countryName={countryName}
                dossierTitle={dossierTitle}
                dossierParchmentTitle={dossierParchmentTitle}
                currentQuestion={currentQuestion}
              />
            )}

            {/* 3. Test Benchmark Rules Card & Hotline */}
            <TestRulesCard
              countryName={countryName}
              passingScore={passingScore}
              totalQuestions={totalQuestions}
              passingPercentage={passingPercentage}
              hotlineName={hotlineName}
              hotlineNumber={hotlineNumber}
              hotlineHours={hotlineHours}
            />
          </aside>
        </div>
      </main>

      {/* Applicant Scratchpad Modal */}
      {isScratchpadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <span>Applicant Scratchpad Notes</span>
              </div>
              <button
                type="button"
                onClick={() => setIsScratchpadOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg text-lg leading-none cursor-pointer"
                aria-label="Close notes"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Use this scratchpad to jot memory acronyms, calculate dates, or outline civics logic during your practice exam.
            </p>

            <textarea
              value={scratchpadNotes}
              onChange={(e) => setScratchpadNotes(e.target.value)}
              placeholder="e.g. 3 F's = Finance (print money), Forces (army/navy), Foreign affairs..."
              rows={8}
              className="w-full p-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-mono text-slate-800 outline-none resize-none bg-slate-50/50"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setScratchpadNotes('')}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear Notes
              </button>
              <button
                type="button"
                onClick={() => setIsScratchpadOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizContainer;
