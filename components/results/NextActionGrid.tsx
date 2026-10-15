'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  Compass,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';

interface NextActionGridProps {
  countryId?: string;
  incorrectCount?: number;
  onPracticeMissed?: () => void;
}

export function NextActionGrid({
  countryId = 'us',
  incorrectCount = 3,
  onPracticeMissed,
}: NextActionGridProps) {
  const [flashcardCreated, setFlashcardCreated] = useState(false);

  const handleCreateFlashcards = () => {
    setFlashcardCreated(true);
    if (onPracticeMissed) {
      onPracticeMissed();
    }
  };

  const commonwealthTracks = [
    { id: 'uk', code: 'UKVI', name: 'United Kingdom', flag: '🇬🇧', exam: 'Life in the UK' },
    { id: 'ca', code: 'IRCC', name: 'Canada', flag: '🇨🇦', exam: 'Discover Canada' },
    { id: 'au', code: 'DHA', name: 'Australia', flag: '🇦🇺', exam: 'Our Common Bond' },
  ].filter((t) => t.id !== countryId);

  // If user is already on one of UK/CA/AU, add US to the list
  if (countryId !== 'us' && !commonwealthTracks.some((t) => t.id === 'us')) {
    commonwealthTracks.unshift({
      id: 'us',
      code: 'USCIS',
      name: 'United States',
      flag: '🇺🇸',
      exam: 'USCIS 100 Civics',
    });
  }

  return (
    <section className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Recommended Next Actions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Accelerate your mastery ladder with customized follow-up drills and advanced simulations.
          </p>
        </div>
      </div>

      {/* 3-Column Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Practice Missed Items */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between space-y-5 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                Targeted Drill
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Practice Missed Items
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Generate smart repetition drill for the {incorrectCount} questions missed during this exam session.
              </p>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCreateFlashcards}
              className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                flashcardCreated
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 hover:scale-[1.01]'
              }`}
            >
              {flashcardCreated ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Flashcards Generated!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Create Custom Flash [{incorrectCount}]</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Next Mock Simulation */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between space-y-5 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Award className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/70">
                Level 05
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Next Mock Simulation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Step up to Mock Exam #5 with randomized question order and high-pressure officer oral cadence.
              </p>
            </div>
          </div>

          <div>
            <Link
              href={`/test/${countryId}`}
              className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/90 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Try Mock Exam #5</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Card 3: Cross-Commonwealth Track */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between space-y-5 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                Global Tracks
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Cross-Commonwealth Track
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Preparing for dual citizenship or relocation? Switch syllabus track to UK, Canada, or Australia.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {commonwealthTracks.map((track) => (
                <Link
                  key={track.id}
                  href={`/test/${track.id}/results`}
                  className="flex-1 min-w-[70px] inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 transition-colors"
                  title={`${track.name} (${track.exam})`}
                >
                  <span>{track.flag}</span>
                  <span>{track.code}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NextActionGrid;
