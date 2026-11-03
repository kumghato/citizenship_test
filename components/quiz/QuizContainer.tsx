'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CountryExamConfig, QuizQuestion } from '@/lib/quizData';
import { ExamSubmissionPayload } from '@/lib/evaluateExam';
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
    questions: initialQuestions = [],
  } = config;

  // Master Orchestration States
  const router = useRouter();
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);
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
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Timer interval reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop speech synthesis helper
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Fetch questions on demand via API
  const fetchQuestionsFromApi = useCallback(
    async (count = 20) => {
      setIsLoadingApi(true);
      stopSpeech();
      try {
        const res = await fetch(`/api/questions?country=${countryId}&limit=${count}&random=true`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
        }
      } catch (err) {
        console.warn('Could not fetch questions from API, keeping current set', err);
      } finally {
        setIsLoadingApi(false);
      }
    },
    [countryId, timeLimitSeconds, stopSpeech]
  );

  // If initial questions were empty, automatically fetch on mount
  useEffect(() => {
    if (activeQuestions.length === 0) {
      fetchQuestionsFromApi(20);
    }
  }, [activeQuestions.length, fetchQuestionsFromApi]);

  // Countdown timer effect
  useEffect(() => {
    if (isSubmitted || isPaused) {
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
  }, [isSubmitted, isPaused]);

  // Handle Speech Synthesis
  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser environment.');
      return;
    }

    const currentQ = activeQuestions[currentQuestionIndex];
    if (!currentQ) return;

    window.speechSynthesis.cancel();

    const optionsText = currentQ.options
      .map((opt) => `Option ${opt.key}: ${opt.text}`)
      .join('. ');
    const textToRead = `${currentQ.questionText}. ${optionsText}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const totalQuestions = activeQuestions.length > 0 ? activeQuestions.length : (config.totalQuestions || 20);

  // Action handlers
  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted && !reviewMode) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionKey,
    }));
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
    stopSpeech();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    stopSpeech();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    stopSpeech();
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleResetExam = () => {
    stopSpeech();
    setAnswers({});
    setFlaggedQuestions(new Set());
    setRemainingTime(timeLimitSeconds);
    setCurrentQuestionIndex(0);
    setIsPaused(false);
    setIsSubmitted(false);
    setReviewMode(false);
  };

  // Score calculations
  const answeredCount = Object.keys(answers).length;
  const correctCount = activeQuestions.reduce((acc, q, idx) => {
    return answers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  // Persist score and navigate to results screen
  const handleSubmitExam = useCallback(() => {
    stopSpeech();
    const timeSpent = timeLimitSeconds - remainingTime;
    const resultPayload: ExamSubmissionPayload = {
      countryId,
      questions: activeQuestions,
      answers,
      flagged: Array.from(flaggedQuestions),
      timeSpentSeconds: timeSpent,
      submittedAt: Date.now(),
    };

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(`civicpass_result_${countryId}`, JSON.stringify(resultPayload));
        window.dispatchEvent(new Event('civicpass_result_updated'));
      } catch (e) {
        console.warn('Could not save exam session', e);
      }
    }

    router.push(`/test/${countryId}/results`);
  }, [stopSpeech, timeLimitSeconds, remainingTime, countryId, activeQuestions, answers, flaggedQuestions, router]);

  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  return (
    <div className="exam-shell min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      {/* Top Navigation Bar / Exam Room Chrome */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          {/* Left: Back Link & Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors"
              title="Return to CivicPass Landing Page"
            >
              <span className="hidden sm:inline">Exit Exam</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <span>CP</span>
              </div>
              <span className="font-extrabold text-slate-900 text-base tracking-tight">
                Civic<span className="text-blue-600">Pass</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200/70 flex items-center gap-1">
                <span>{flag}</span>
                <span>{countryName}</span>
              </span>
            </div>
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
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
              title="Reset practice test session"
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
              Active Simulation: <strong>{activeQuestions.length} Questions</strong> fetched on demand
            </span>
          </div>

          <button
            type="button"
            onClick={() => fetchQuestionsFromApi(20)}
            disabled={isLoadingApi}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/70 transition-all cursor-pointer disabled:opacity-50"
            title="Fetch a fresh randomized batch of 20 questions from the 1,000+ question bank"
          >
            <span>{isLoadingApi ? 'Fetching from API...' : '⚡ Randomize New 20 Questions'}</span>
          </button>
        </div>

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
              isSpeaking={isSpeaking}
              onToggleSpeech={toggleSpeech}
              onOpenScratchpad={() => setIsScratchpadOpen(true)}
              onSubmitExam={handleSubmitExam}
            />

            {/* Loading Indicator when fetching questions from API */}
            {isLoadingApi ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-slate-700">
                  Fetching 20 practice questions on demand from the {countryName} 1,000+ question bank...
                </p>
              </div>
            ) : isPaused ? (
              /* Paused Mask Overlay if exam is paused */
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm py-16">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto ring-8 ring-blue-50/50 font-bold text-xs">
                  PAUSED
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
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
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
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg text-lg leading-none"
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
                className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
              >
                Clear Notes
              </button>
              <button
                type="button"
                onClick={() => setIsScratchpadOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors"
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
