'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Edit3,
  X,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

import { CountryExamConfig } from '@/lib/quizData';
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
    totalQuestions,
    passingPercentage,
    timeLimitSeconds,
    hotlineName,
    hotlineNumber,
    hotlineHours,
    dossierTitle,
    dossierParchmentTitle,
    questions,
  } = config;

  // Master Orchestration States
  const router = useRouter();
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
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser environment.');
      return;
    }

    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    window.speechSynthesis.cancel();

    const optionsText = currentQ.options
      .map((opt) => `Option ${opt.key}: ${opt.text}`)
      .join('. ');
    const textToRead = `${currentQ.questionText}. ${optionsText}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95; // Clear natural test cadence
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
  const correctCount = questions.reduce((acc, q, idx) => {
    return answers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const hasPassed = correctCount >= passingScore;
  const timeSpentSeconds = timeLimitSeconds - remainingTime;
  const timeSpentMinutes = Math.floor(timeSpentSeconds / 60);
  const timeSpentRemainderSeconds = timeSpentSeconds % 60;

  // Persist score and navigate to results screen
  const handleSubmitExam = useCallback(() => {
    stopSpeech();
    const timeSpent = timeLimitSeconds - remainingTime;
    const resultPayload = {
      countryId,
      answers,
      flagged: Array.from(flaggedQuestions),
      timeSpentSeconds: timeSpent,
      correctCount,
      totalQuestions,
      submittedAt: Date.now(),
    };

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(`civicpass_result_${countryId}`, JSON.stringify(resultPayload));
      } catch (e) {
        console.warn('Could not save exam session', e);
      }
    }

    router.push(`/test/${countryId}/results`);
  }, [stopSpeech, timeLimitSeconds, remainingTime, countryId, answers, flaggedQuestions, correctCount, totalQuestions, router]);

  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
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
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Exam</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
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
            <Link
              href={`/test/${countryId}/results`}
              className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              title="View Results & Statutory Review"
            >
              2. Results &amp; Review
            </Link>
          </nav>

          {/* Center / Right: Automated Proctor Status & Reset */}
          <div className="flex items-center gap-3">
            <div className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Automated Proctor Active</span>
            </div>

            <button
              type="button"
              onClick={handleResetExam}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
              title="Reset practice test session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Test Room Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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

            {/* Paused Mask Overlay if exam is paused */}
            {isPaused ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm py-16">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                  <Play className="w-6 h-6 translate-x-0.5 fill-blue-600" />
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
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Resume Examination</span>
                  </button>
                </div>
              </div>
            ) : (
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
            )}
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
            <SourceDossierCard
              countryId={countryId}
              countryName={countryName}
              dossierTitle={dossierTitle}
              dossierParchmentTitle={dossierParchmentTitle}
              currentQuestion={currentQuestion}
            />

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
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>Applicant Scratchpad Notes</span>
              </div>
              <button
                type="button"
                onClick={() => setIsScratchpadOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
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
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission & Score Summary Modal */}
      {isSubmitted && !reviewMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 text-center animate-in zoom-in-95 duration-200">
            {/* Pass/Fail Status Banner */}
            <div className="space-y-3">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ring-8 ${
                  hasPassed
                    ? 'bg-emerald-50 text-emerald-600 ring-emerald-50'
                    : 'bg-amber-50 text-amber-600 ring-amber-50'
                }`}
              >
                {hasPassed ? (
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                ) : (
                  <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
                )}
              </div>

              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    hasPassed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {hasPassed ? 'Official Benchmark Passed' : 'Benchmark Not Met'}
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {hasPassed
                    ? 'Naturalization Ready!'
                    : 'Additional Practice Recommended'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {hasPassed
                    ? `Congratulations! You scored above the ${passingPercentage}% threshold for ${countryName}.`
                    : `You answered ${correctCount} of ${totalQuestions} correctly. You need ${passingScore} to pass the official examination.`}
                </p>
              </div>
            </div>

            {/* Score Grid Cards */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">{correctCount} / {totalQuestions}</div>
                <div className="text-[11px] font-semibold text-slate-500">Correct Score</div>
              </div>

              <div className="space-y-1 border-x border-slate-200">
                <div className="text-2xl font-black text-blue-600">{scorePercent}%</div>
                <div className="text-[11px] font-semibold text-slate-500">Mastery Rate</div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">
                  {timeSpentMinutes}:{String(timeSpentRemainderSeconds).padStart(2, '0')}
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Time Taken</div>
              </div>
            </div>

            {/* Detailed summary breakdown */}
            <div className="text-left text-xs space-y-2 border-t border-slate-100 pt-4 text-slate-600">
              <div className="flex justify-between">
                <span>Total Questions in Pool:</span>
                <span className="font-semibold text-slate-900">{totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions Answered:</span>
                <span className="font-semibold text-slate-900">{answeredCount} of {totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions Flagged:</span>
                <span className="font-semibold text-slate-900">{flaggedQuestions.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Required Benchmark to Pass:</span>
                <span className="font-semibold text-emerald-700">
                  {passingScore} Correct ({passingPercentage}%)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleSubmitExam}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Results &amp; Statutory Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleResetExam}
                  className="py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>

                <Link
                  href="/"
                  className="py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Choose Another Exam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Mode Banner when reviewing answers */}
      {isSubmitted && reviewMode && (
        <aside
          aria-label="Review Mode Bar"
          className="fixed bottom-0 inset-x-0 bg-slate-900 text-white border-t border-slate-800 p-3 z-40 shadow-xl"
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-blue-400">Exam Review Mode Active:</span>
              <span>
                Score: <strong>{correctCount} / {totalQuestions} ({scorePercent}%)</strong> ·{' '}
                {hasPassed ? 'PASSED' : 'NEEDS PRACTICE'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
              >
                View Score Card
              </button>
              <button
                type="button"
                onClick={handleResetExam}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold"
              >
                Retake Exam
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
export default QuizContainer;
