import React from 'react';
import { Award, CheckCircle2, Layers } from 'lucide-react';
import { DomainPerformance } from '@/lib/resultsData';

interface CivicDomainsCardProps {
  domains: DomainPerformance[];
  countryName?: string;
}

export function CivicDomainsCard({
  domains,
  countryName = 'United States',
}: CivicDomainsCardProps) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6 flex flex-col justify-between">
      {/* Card Header */}
      <div className="space-y-1.5 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Civic Domains &amp; Performance
            </h2>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>3 of 3 Benchmarks Met</span>
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Official statutory curriculum breakdown assessed against {countryName} naturalization standards.
        </p>
      </div>

      {/* Domain Breakdown Items */}
      <div className="space-y-5">
        {domains.map((domain) => {
          const isHighMastery = domain.percentage >= 85;

          return (
            <div
              key={domain.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2.5 transition-all hover:border-slate-300"
            >
              {/* Header: Title & Subtitle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{domain.name}</span>
                    {isHighMastery && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                        High Mastery
                      </span>
                    )}
                  </h3>
                  <div className="text-[11.5px] text-slate-500 font-normal">
                    ({domain.subcategories})
                  </div>
                </div>

                {/* Score and Percentage */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900">
                    {domain.correct}/{domain.total}{' '}
                    <span className="text-emerald-700 font-bold">
                      ({domain.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="text-[10px] font-medium text-slate-400">
                    {domain.total - domain.correct === 0
                      ? '100% Perfect'
                      : `${domain.total - domain.correct} Missed Item`}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700"
                    style={{ width: `${domain.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-blue-600" />
          <span>Statutory Rubric: USCIS Policy Manual, Vol. 12</span>
        </span>
        <span className="font-semibold text-emerald-700">Interview Ready</span>
      </div>
    </div>
  );
}

export default CivicDomainsCard;
