'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Award,
} from 'lucide-react';

const COUNTRIES = [
  { id: 'us', label: '🇺🇸 United States (USCIS)', name: 'United States', questions: '100 Questions' },
  { id: 'uk', label: '🇬🇧 United Kingdom (Life in the UK)', name: 'United Kingdom', questions: '24 Questions' },
  { id: 'ca', label: '🇨🇦 Canada (Discover Canada)', name: 'Canada', questions: '20 Questions' },
  { id: 'au', label: '🇦🇺 Australia (Our Common Bond)', name: 'Australia', questions: '20 Questions' },
];

export function BottomCta() {
  const [selectedCountry, setSelectedCountry] = useState('us');

  const activeCountry = COUNTRIES.find((c) => c.id === selectedCountry) || COUNTRIES[0];

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border border-blue-900/60 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
      {/* Background ambient glow circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Instant Free Diagnostic Assessment · No Account Required</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Take the Pledge? <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
            Test Your Readiness in 2 Minutes.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join over 142,000 future citizens. Select your country to receive a customized
          readiness score, identified weak points, and a guaranteed pass study blueprint.
        </p>

        {/* Interactive Country Toggle Pills */}
        <div className="pt-2">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-3">
            Choose your exam to begin:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {COUNTRIES.map((country) => (
              <button
                key={country.id}
                type="button"
                onClick={() => setSelectedCountry(country.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-2 ${
                  country.id === selectedCountry
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-md shadow-blue-500/40'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80'
                }`}
              >
                <span>{country.label}</span>
                {country.id === selectedCountry && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA and Guarantees */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/test/${selectedCountry}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Free 2-Min Practice for {activeCountry.name}</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>

        {/* Trust Badges under CTA */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 border-t border-slate-800/80 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Free · No Card Required</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>99.4% First-Time Pass Rate</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official 2026 Question Banks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BottomCta;
