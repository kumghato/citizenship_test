'use client';

import React from 'react';
import { Check, Flag } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, string>;
  flaggedQuestionIndices: Set<number>;
  onSelectQuestion: (index: number) => void;
}

export function QuestionPalette({
  totalQuestions,
  currentIndex,
  answers,
  flaggedQuestionIndices,
  onSelectQuestion,
}: QuestionPaletteProps) {
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flaggedQuestionIndices.size;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      {/* Header and Summary stats */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Question Palette
          </h3>
          <p className="text-[11px] text-slate-500">
            Click any tile to navigate directly
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 font-mono">
            {answeredCount} / {totalQuestions} Done
          </span>
        </div>
      </div>

      {/* 20-Question Grid */}
      <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = answers[index] !== undefined;
          const isFlagged = flaggedQuestionIndices.has(index);

          // Tile styles according to specs:
          // Active: Solid Blue with white text
          // Answered: Green filled with checkmark
          // Unanswered: White with gray border
          let tileStyle =
            'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50';

          if (isCurrent) {
            tileStyle =
              'bg-blue-600 text-white font-extrabold border-blue-600 ring-2 ring-blue-300 shadow-sm';
          } else if (isAnswered) {
            tileStyle =
              'bg-emerald-700 text-white font-bold border-emerald-700 shadow-2xs hover:bg-emerald-800';
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectQuestion(index)}
              className={`relative h-11 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-150 flex items-center justify-center ${tileStyle}`}
              title={`Question ${index + 1}: ${
                isCurrent
                  ? 'Current Question'
                  : isAnswered
                  ? `Answered (${answers[index]})`
                  : 'Unanswered'
              }${isFlagged ? ' • Flagged for review' : ''}`}
            >
              {/* Question Number */}
              <span>{index + 1}</span>

              {/* Answered checkmark mini-badge if not current active */}
              {isAnswered && !isCurrent && (
                <span className="absolute bottom-1 right-1 text-emerald-100">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}

              {/* Amber Dot Indicator on top-right if Flagged */}
              {isFlagged && (
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 ring-2 ring-white shadow-xs flex items-center justify-center"
                  title="Flagged for review"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-800" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Status Legend Beneath Grid */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-emerald-700 flex items-center justify-center text-white shrink-0">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </span>
          <span>Answered ({answeredCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-blue-600 shrink-0 ring-1 ring-blue-300" />
          <span className="font-semibold text-slate-800">Current Question</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-white border border-slate-300 shrink-0" />
          <span>Unanswered ({unansweredCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-amber-400 ring-1 ring-amber-300 flex items-center justify-center shrink-0">
            <Flag className="w-2 h-2 text-amber-900 fill-amber-900" />
          </span>
          <span>Flagged ({flaggedCount})</span>
        </div>
      </div>
    </div>
  );
}
export default QuestionPalette;
