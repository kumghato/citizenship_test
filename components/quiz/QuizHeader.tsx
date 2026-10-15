'use client';

import React from 'react';
import {
  Clock,
  Pause,
  Play,
  Flag,
  Volume2,
  VolumeX,
  Edit3,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface QuizHeaderProps {
  examTitle: string;
  bankPill: string;
  modeBadge: string;
  flag: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  answeredCount: number;
  passingScore: number;
  passingPercentage: number;
  remainingTime: number;
  totalTime: number;
  isPaused: boolean;
  onTogglePause: () => void;
  flaggedCount: number;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onOpenScratchpad: () => void;
  onSubmitExam: () => void;
}

export function QuizHeader({
  examTitle,
  bankPill,
  modeBadge,
  flag,
  currentQuestionIndex,
  totalQuestions,
  answeredCount,
  passingScore,
  passingPercentage,
  remainingTime,
  totalTime,
  isPaused,
  onTogglePause,
  flaggedCount,
  isSpeaking,
  onToggleSpeech,
  onOpenScratchpad,
  onSubmitExam,
}: QuizHeaderProps) {
  // Format remaining time as MM:SS
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Time progress percentage for circular ring
  const timeProgress = totalTime > 0 ? (remainingTime / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 14; // r = 14
  const strokeDashoffset = circumference - (timeProgress / 100) * circumference;

  // Urgent colors when remaining time is low
  const isUrgent = remainingTime <= 120; // 2 minutes
  const isWarning = remainingTime <= 300 && !isUrgent; // 5 minutes

  // Question progress percentage
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const answeredPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 space-y-4">
      {/* Top Row: Title, Badges, Timer, Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        {/* Left: Flag, Title, Pill Badges */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl filter drop-shadow-xs">{flag}</span>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {examTitle}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              {modeBadge}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <Sparkles className="w-3 h-3 text-slate-500" />
              {bankPill}
            </span>
          </div>
        </div>

        {/* Right: Dynamic Countdown Timer & Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-center">
          {/* Circular Countdown Timer */}
          <div
            className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all ${
              isUrgent
                ? 'bg-red-50 border-red-200 text-red-700'
                : isWarning
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
            title="Remaining Exam Time"
          >
            {/* SVG Circular Progress Meter */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className="stroke-slate-200 fill-none"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className={`fill-none transition-all duration-500 ${
                    isUrgent
                      ? 'stroke-red-600'
                      : isWarning
                      ? 'stroke-amber-500'
                      : 'stroke-blue-600'
                  }`}
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <Clock
                className={`w-3.5 h-3.5 absolute ${
                  isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-blue-600'
                }`}
              />
            </div>

            <div className="text-left font-mono">
              <div className="text-[9px] uppercase tracking-wider font-bold text-slate-400 leading-none">
                REM/MIN
              </div>
              <div
                className={`text-sm sm:text-base font-extrabold tracking-tight ${
                  isUrgent
                    ? 'text-red-700 animate-pulse'
                    : isWarning
                    ? 'text-amber-800'
                    : 'text-slate-900'
                }`}
              >
                {formattedTime}
              </div>
            </div>

            {/* Pause/Resume button */}
            <button
              type="button"
              onClick={onTogglePause}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors ml-0.5"
              title={isPaused ? 'Resume exam countdown' : 'Pause exam timer'}
              aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          {/* Flagged Counter Pill */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              flaggedCount > 0
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
            title={`${flaggedCount} question(s) flagged for final review`}
          >
            <Flag
              className={`w-3.5 h-3.5 ${
                flaggedCount > 0 ? 'text-amber-600 fill-amber-500' : 'text-slate-400'
              }`}
            />
            <span>{flaggedCount} Flagged</span>
          </div>

          {/* Listen Prompt Button (TTS) */}
          <button
            type="button"
            onClick={onToggleSpeech}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSpeaking
                ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400 shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
            }`}
            title="Read question prompt aloud (Oral Interview Simulator)"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Listen Prompt</span>
              </>
            )}
          </button>

          {/* Scratchpad Button */}
          <button
            type="button"
            onClick={onOpenScratchpad}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 transition-colors"
            title="Open applicant scratchpad notes"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Scratchpad</span>
          </button>

          {/* High-Contrast Red Submit Exam Button */}
          <button
            type="button"
            onClick={onSubmitExam}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-500/20 hover:shadow-red-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Finalize and submit your examination for scoring"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Progress Bar with Passing Target Line */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
          <div className="font-semibold text-slate-800">
            <span>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>{' '}
            <span className="text-slate-400 font-normal">({progressPercent}% Viewed · {answeredCount} Answered)</span>
          </div>

          <div className="flex items-center gap-2 font-medium text-slate-600">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
            <span>
              Passing Target:{' '}
              <strong className="text-slate-900 font-bold">
                {passingScore} Correct ({passingPercentage}%)
              </strong>
            </span>
          </div>
        </div>

        {/* Dual Progress Bar Container with Passing Target Marker */}
        <div className="relative w-full h-3 rounded-full bg-slate-100 overflow-visible border border-slate-200/60">
          {/* Answered progress track */}
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-300"
            style={{ width: `${answeredPercent}%` }}
          />

          {/* Passing Target Threshold Line & Pin */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10 -mt-1 -mb-1"
            style={{ left: `${passingPercentage}%` }}
            title={`Passing Target: ${passingPercentage}%`}
          >
            <div className="absolute -top-4 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-xs whitespace-nowrap shadow-xs">
              Pass {passingPercentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuizHeader;
