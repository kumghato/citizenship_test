'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  HelpCircle,
  Volume2,
  RotateCcw,
  X,
} from 'lucide-react';

interface TestRulesCardProps {
  countryName: string;
  passingScore: number;
  totalQuestions: number;
  passingPercentage: number;
  hotlineName: string;
  hotlineNumber: string;
  hotlineHours: string;
}

export function TestRulesCard({
  countryName,
  passingScore,
  totalQuestions,
  passingPercentage,
  hotlineName,
  hotlineNumber,
  hotlineHours,
}: TestRulesCardProps) {
  const [showProctorHelp, setShowProctorHelp] = useState(false);
  const [callingHotline, setCallingHotline] = useState(false);

  return (
    <div className="space-y-4">
      {/* 1. Test Benchmark Rules Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        {/* Top Header with Proctor Active Pill */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Test Benchmark Rules
          </h3>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proctor Active</span>
          </div>
        </div>

        {/* 3 Key Benchmark Rules */}
        <div className="space-y-3 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">
                {passingPercentage}% Passing Threshold:
              </span>{' '}
              Must answer at least {passingScore} of {totalQuestions} correctly to earn a certificate recommendation for {countryName}.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <RotateCcw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Bidirectional Navigation:</span>{' '}
              Freely jump between questions, edit selections at any time, or flag questions for review before submitting.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Volume2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Audio Voice Assistance:</span>{' '}
              Official voice prompt synthesis available on every question to practice oral interview cadence.
            </div>
          </div>
        </div>

        {/* Proctor Help Link */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">System: Secure Proctor v2.6</span>
          <button
            type="button"
            onClick={() => setShowProctorHelp(true)}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Proctor Help</span>
          </button>
        </div>
      </div>

      {/* 2. Naturalization Hotline Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4.5 text-white shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
            Naturalization Hotline
          </span>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
            {hotlineHours}
          </span>
        </div>

        <div>
          <div className="text-xs text-slate-300">{hotlineName}</div>
          <div className="text-base font-extrabold text-white tracking-wide mt-0.5 font-mono">
            {hotlineNumber}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setCallingHotline(true);
            setTimeout(() => setCallingHotline(false), 3000);
          }}
          className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{callingHotline ? 'Dialing Official Support...' : 'Connect to Official Line'}</span>
        </button>
      </div>

      {/* Proctor Help Modal */}
      {showProctorHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Automated Proctor Information</span>
              </div>
              <button
                onClick={() => setShowProctorHelp(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                The CivicPass Automated Proctor simulates real government exam room standards.
                During your practice test, your countdown timer runs in real time, mirroring official interview time constraints.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-semibold text-slate-800">Proctoring Best Practices:</div>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Treat each question as if speaking to an immigration examiner.</li>
                  <li>Click &quot;Listen Prompt&quot; to practice listening comprehension.</li>
                  <li>Flag difficult questions and revisit them before final submission.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowProctorHelp(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
            >
              Close &amp; Return to Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default TestRulesCard;
