import React from 'react';
import { Sparkles, Pin, CheckCircle2, Volume2 } from 'lucide-react';

interface TargetedFocusCardProps {
  recommendation?: string;
  insiderNote?: string;
  oralExamClarity?: string;
  oralExamStatus?: 'OPTIMAL' | 'PASS' | 'REVIEW';
}

export function TargetedFocusCard({
  recommendation = 'Focus on 1800s, Capture/Treaty, and national holidays to reach 100% confidence for your interview.',
  insiderNote = 'During your in-person naturalization interview, USCIS adjudicating officers ask questions in rapid oral cadence until you answer 6 correctly. Review the 1800s statutory era and federal winter holidays to ensure immediate verbal recall.',
  oralExamClarity = 'Oral Exam Simulation: Officer clarity standard 15/15 passed',
  oralExamStatus = 'OPTIMAL',
}: TargetedFocusCardProps) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-5 flex flex-col justify-between">
      {/* Card Header & Intelligence Recommendation Tag */}
      <div className="space-y-3 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Intelligence Recommendation</span>
          </span>

          <span className="text-[11px] font-semibold text-slate-500">
            High-Yield Focus
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Targeted Focus Recommendation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Algorithmic study insights generated from missed questions and hesitation markers.
          </p>
        </div>
      </div>

      {/* Dynamic Prompt Highlighting High-Yield Study Topics */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200/80 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Priority Review Strategy</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
          &ldquo;{recommendation}&rdquo;
        </p>
      </div>

      {/* Interviewer Insider Callout Note Box with Pin Icon */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
          <Pin className="w-4 h-4 text-amber-700 shrink-0 fill-amber-600/30 rotate-45" />
          <span>Interviewer Insider Note</span>
        </div>
        <p className="text-xs text-amber-950/90 leading-relaxed font-normal">
          {insiderNote}
        </p>
      </div>

      {/* Mini Status Row: Oral Exam Simulation */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
          <span>{oralExamClarity}</span>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{oralExamStatus}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TargetedFocusCard;
