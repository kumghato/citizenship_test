import React from 'react';
import Image from 'next/image';
import { SupportedCountry } from '@/lib/quizData';
import { ResultsCountryDropdown } from './ResultsCountryDropdown';
import { ExitResultsButton } from './ExitResultsButton';
import { RetakeExamButton } from './RetakeExamButton';

interface ResultsNavbarProps {
  countryId: SupportedCountry;
  countryName: string;
  flag: string;
  hasPassed: boolean;
}

export function ResultsNavbar({
  countryId,
  countryName,
  flag,
  hasPassed,
}: ResultsNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Exit link & Logo */}
        <div className="flex items-center gap-3">
          <ExitResultsButton label="Exit to Home" />

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <ExitResultsButton
            className="flex items-center gap-2 group cursor-pointer"
            title="Return to Home (clears exam storage)"
          >
            <Image
              src="/icon1.svg"
              alt="CivicPass logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="font-extrabold text-slate-900 text-base tracking-tight hidden md:inline">
              Civic<span className="text-blue-600">Pass</span>
            </span>
          </ExitResultsButton>

          {/* Country Selector Dropdown Button (Client Component) */}
          <ResultsCountryDropdown
            countryId={countryId}
            countryName={countryName}
            flag={flag}
          />
        </div>

        {/* Center: Navigation Steps with Active Pill on "Results & Review" */}
        <nav
          aria-label="Exam Progress"
          className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200/80"
        >
          <RetakeExamButton
            countryId={countryId}
            label="1. Exam Simulation"
            className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline-block cursor-pointer"
            title="Return to Exam Simulator and start fresh random test"
          />

          {/* ACTIVE STATE PILL: Results & Review */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs">
            <span>2. Results &amp; Review</span>
          </div>
        </nav>

        {/* Right: Passing Benchmark Status & Retake Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`hidden lg:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
              hasPassed
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200/90'
                : 'text-amber-800 bg-amber-50 border-amber-200/90'
            }`}
          >
            <span>{hasPassed ? 'Benchmark Passed' : 'Benchmark Pending'}</span>
          </div>

          <RetakeExamButton
            countryId={countryId}
            label="Retake"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            title="Retake practice examination with fresh random questions"
          />
        </div>
      </div>
    </header>
  );
}

export default ResultsNavbar;
