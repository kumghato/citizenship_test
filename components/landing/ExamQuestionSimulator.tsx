'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  Timer,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export function ExamQuestionSimulator() {
  const [selectedOption, setSelectedOption] = useState<string | null>('a');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(true);

  const question: {
    number: number;
    total: number;
    category: string;
    text: string;
    options: QuestionOption[];
  } = {
    number: 14,
    total: 20,
    category: 'System of Government · Section A',
    text: 'Under our Constitution, some powers belong to the federal government. What is one power of the federal government?',
    options: [
      {
        id: 'a',
        text: 'To print money',
        isCorrect: true,
        explanation: 'Article I, Section 8, Clause 5 of the U.S. Constitution (The Coinage Clause) grants the federal government the exclusive power to coin money and regulate its value.',
      },
      {
        id: 'b',
        text: 'To provide police protection',
        isCorrect: false,
        explanation: 'Under the 10th Amendment, general police powers belong to the states and local municipalities.',
      },
      {
        id: 'c',
        text: "To issue driver's licenses",
        isCorrect: false,
        explanation: 'Driver licensing and motor vehicle registration are reserved powers of individual states.',
      },
      {
        id: 'd',
        text: 'To approve zoning and land use',
        isCorrect: false,
        explanation: 'Zoning laws and land use ordinances belong strictly to local city and county governments.',
      },
    ],
  };

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    setHasSubmitted(true);
  };

  const selectedData = question.options.find((o) => o.id === selectedOption);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 md:p-6 text-slate-800">
      {/* Test Simulation Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/70">
            <Sparkles className="w-3 h-3 text-blue-600" />
            Live Practice Test
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 font-medium">
            Question {question.number} of {question.total}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
          <Timer className="w-3.5 h-3.5 text-slate-500" />
          <span>18:42 remaining</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="mt-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {question.category}
        </span>
        <h4 className="mt-1 text-sm md:text-base font-bold text-slate-900 leading-snug">
          {question.text}
        </h4>
      </div>

      {/* Options List */}
      <div className="mt-4 space-y-2.5">
        {question.options.map((opt) => {
          const isChosen = selectedOption === opt.id;
          const isCorrect = opt.isCorrect;

          let cardStyle =
            'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700';

          if (hasSubmitted) {
            if (isChosen && isCorrect) {
              cardStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500';
            } else if (isChosen && !isCorrect) {
              cardStyle = 'border-red-500 bg-red-50/70 text-red-950 ring-1 ring-red-500';
            } else if (isCorrect) {
              cardStyle = 'border-emerald-300 bg-emerald-50/30 text-emerald-900';
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${cardStyle}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-md uppercase font-bold text-[11px] flex items-center justify-center shrink-0 ${
                    hasSubmitted && isChosen
                      ? isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-red-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-600'
                  }`}
                >
                  {opt.id}
                </span>
                <span>{opt.text}</span>
              </div>

              {hasSubmitted && isChosen && (
                <div>
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner when answered */}
      {hasSubmitted && selectedData && (
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                selectedData.isCorrect ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
            <span>
              {selectedData.isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11.5px]">
            {selectedData.explanation}
          </p>
        </div>
      )}

      {/* Footer controls inside simulator */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <button
          onClick={() => {
            setSelectedOption(null);
            setHasSubmitted(false);
          }}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Question</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedOption('a');
              setHasSubmitted(true);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
          >
            <span>Next Demo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <Link
            href="/test/us"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02]"
          >
            <span>Start Full Exam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ExamQuestionSimulator;
