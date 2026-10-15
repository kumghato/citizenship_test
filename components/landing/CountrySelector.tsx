'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  BookOpen,
} from 'lucide-react';

export interface CountryCardData {
  id: string;
  name: string;
  flag: string;
  code: string;
  officialBody: string;
  examName: string;
  passRate: string;
  questionsCount: string;
  timeLimit: string;
  passingScore: string;
  tag?: string;
  accentColor: string;
  description: string;
}

const COUNTRIES_DATA: CountryCardData[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    code: 'USA',
    officialBody: 'USCIS · 2026 Edition',
    examName: 'Naturalization Civics Test',
    passRate: '99.4% Pass Rate',
    questionsCount: '100 Official Civics Questions',
    timeLimit: 'Oral Interview Format',
    passingScore: '6 / 10 to Pass (60%)',
    tag: 'Most Popular',
    accentColor: 'from-blue-600 to-indigo-600',
    description: 'Master the 100 civics questions with speech recognition oral simulator.',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    code: 'GBR',
    officialBody: 'Home Office · 3rd Edition',
    examName: 'Life in the UK Test',
    passRate: '99.1% Pass Rate',
    questionsCount: 'Official 24 Questions',
    timeLimit: '45 Minutes Exam Time',
    passingScore: '18 / 24 to Pass (75%)',
    tag: 'Updated Syllabus',
    accentColor: 'from-red-600 to-blue-700',
    description: 'Covers British history, customs, government structure, and daily life.',
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    code: 'CAN',
    officialBody: 'IRCC · Discover Canada',
    examName: 'Canadian Citizenship Test',
    passRate: '98.9% Pass Rate',
    questionsCount: '20 Official Questions',
    timeLimit: '30 Minutes Online/In-Person',
    passingScore: '15 / 20 to Pass (75%)',
    tag: 'IRCC Aligned',
    accentColor: 'from-red-600 to-red-700',
    description: 'Based directly on the official Discover Canada rights and history guide.',
  },
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    code: 'AUS',
    officialBody: 'DHA · Our Common Bond',
    examName: 'Australian Citizenship Test',
    passRate: '99.2% Pass Rate',
    questionsCount: '20 Official Questions',
    timeLimit: '45 Minutes Standard',
    passingScore: '75% + 5/5 Values Questions',
    tag: 'Values Test Ready',
    accentColor: 'from-blue-700 to-emerald-700',
    description: 'Special module for mandatory Australian Values questions guaranteed.',
  },
];

interface CountrySelectorProps {
  initialCountry?: string;
  onSelectCountry?: (id: string) => void;
}

export function CountrySelector({
  initialCountry = 'us',
  onSelectCountry,
}: CountrySelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(initialCountry);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelectCountry?.(id);
  };

  return (
    <div id="country-selector" className="w-full">
      {/* 4 Country Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
        {COUNTRIES_DATA.map((country) => {
          const isSelected = country.id === selectedId;

          return (
            <div
              key={country.id}
              onClick={() => handleSelect(country.id)}
              className={`group relative p-6 flex flex-col justify-between min-h-[420px] rounded-2xl cursor-pointer transition-all duration-300 text-left ${
                isSelected
                  ? 'bg-white ring-2 ring-blue-600 shadow-xl shadow-blue-500/10'
                  : 'border border-slate-200/80 bg-white hover:border-slate-300 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Top Tag or Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl filter drop-shadow-sm select-none">
                  {country.flag}
                </span>

                {country.tag && (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/80'
                        : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                    }`}
                  >
                    {isSelected && <Sparkles className="w-3 h-3 text-blue-600" />}
                    {country.tag}
                  </span>
                )}
              </div>

              {/* Country & Exam Name */}
              <div className="mb-4">
                <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-1">
                  {country.officialBody}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {country.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                  {country.examName}
                </p>

                {/* Stat Pill */}
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{country.passRate}</span>
                </div>
              </div>

              {/* Feature list items */}
              <div className="space-y-3.5 my-6 text-sm text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-medium text-slate-800">
                    {country.questionsCount}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{country.timeLimit}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Pass criteria: {country.passingScore}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-2">
                <Link
                  href={`/test/${country.id}`}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 hover:bg-blue-700'
                      : 'bg-slate-50 group-hover:bg-blue-50/80 text-slate-700 group-hover:text-blue-700 border border-slate-200 group-hover:border-blue-200'
                  }`}
                >
                  <span>
                    {isSelected ? `Start ${country.code} Practice Test` : `Select ${country.code} Test`}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'
                    }`}
                  />
                </Link>
              </div>

              {/* Subtle selected indicator badge */}
              {isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active Selection
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Country Context Summary Banner */}
      <div className="mt-8 py-3.5 px-6 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xs shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow-sm select-none">
            {COUNTRIES_DATA.find((c) => c.id === selectedId)?.flag}
          </span>
          <div className="text-left">
            <span className="font-semibold text-slate-900">
              Currently preparing for {COUNTRIES_DATA.find((c) => c.id === selectedId)?.name}:
            </span>{' '}
            <span className="text-slate-600">
              {COUNTRIES_DATA.find((c) => c.id === selectedId)?.description}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-800 font-semibold">2026 Question Bank Active</span>
          </div>
          <Link
            href={`/test/${selectedId}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-all hover:scale-[1.02]"
          >
            <span>Launch Exam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default CountrySelector;
