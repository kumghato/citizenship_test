'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { clearAllExamStorage } from '@/lib/examStorage';

interface ResultsCountryDropdownProps {
  countryId: string;
  countryName: string;
  flag: string;
}

const ALL_COUNTRIES = [
  { id: 'us', name: 'United States', flag: '🇺🇸', code: 'USA' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦', code: 'CAN' },
  { id: 'au', name: 'Australia', flag: '🇦🇺', code: 'AUS' },
];

export function ResultsCountryDropdown({
  countryId,
  countryName,
  flag,
}: ResultsCountryDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100/70 transition-colors cursor-pointer"
      >
        <span>{flag}</span>
        <span className="hidden sm:inline">{countryName}</span>
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
              onClick={() => {
                clearAllExamStorage();
                setDropdownOpen(false);
              }}
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
  );
}

export default ResultsCountryDropdown;
