'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronLeft,
  ChevronDown,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { SupportedCountry } from '@/lib/quizData';

interface ResultsNavbarProps {
  countryId: SupportedCountry;
  countryName: string;
  flag: string;
  hasPassed: boolean;
}

const ALL_COUNTRIES = [
  { id: 'us', name: 'United States', flag: '🇺🇸', code: 'USA' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦', code: 'CAN' },
  { id: 'au', name: 'Australia', flag: '🇦🇺', code: 'AUS' },
];

export function ResultsNavbar({
  countryId,
  countryName,
  flag,
  hasPassed,
}: ResultsNavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Exit link & Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Return to CivicPass Home"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Home</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
            </div>
            <span className="font-extrabold text-slate-900 text-base tracking-tight hidden md:inline">
              Civic<span className="text-blue-600">Pass</span>
            </span>
          </Link>

          {/* Country Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100/70 transition-colors cursor-pointer"
            >
              <span>{flag}</span>
              <span className="hidden sm:inline">{countryName}</span>
              <ChevronDown className="w-3 h-3 text-blue-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-slate-200 p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Exam Track
                </div>
                {ALL_COUNTRIES.map((c) => (
                  <Link
                    key={c.id}
                    href={`/test/${c.id}/results`}
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      c.id === countryId
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </div>
                    {c.id === countryId && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Navigation Steps with Active Pill on "Results & Review" */}
        <nav
          aria-label="Exam Progress"
          className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200/80"
        >
          <Link
            href={`/test/${countryId}`}
            className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline-block"
            title="Return to Exam Simulator"
          >
            1. Exam Simulation
          </Link>

          {/* ACTIVE STATE PILL: Results & Review */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
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
            <CheckCircle2 className={`w-3.5 h-3.5 ${hasPassed ? 'text-emerald-600' : 'text-amber-600'}`} />
            <span>{hasPassed ? 'Benchmark Passed' : 'Benchmark Pending'}</span>
          </div>

          <Link
            href={`/test/${countryId}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Retake practice examination"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Retake</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default ResultsNavbar;
