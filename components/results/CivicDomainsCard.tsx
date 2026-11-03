import React from 'react';
import { DomainPerformance } from '@/lib/resultsData';

interface CivicDomainsCardProps {
  domains: DomainPerformance[];
  countryName?: string;
}

export function CivicDomainsCard({
  domains,
  countryName = 'United States',
}: CivicDomainsCardProps) {
  // Dynamic benchmark calculation: domain mastery >= 65%
  const benchmarksMet = domains.filter((d) => d.percentage >= 65).length;
  const allBenchmarksMet = benchmarksMet === domains.length && domains.length > 0;

  // Dynamic statutory reference based on country
  let statutoryRubric = 'USCIS Policy Manual, Vol. 12 (Citizenship Standards)';
  if (countryName.toLowerCase().includes('kingdom') || countryName.toLowerCase().includes('uk')) {
    statutoryRubric = 'Home Office Life in the UK Official Handbook (3rd Ed.)';
  } else if (countryName.toLowerCase().includes('canada')) {
    statutoryRubric = 'IRCC Discover Canada Official Citizenship Study Guide';
  } else if (countryName.toLowerCase().includes('australia')) {
    statutoryRubric = 'DHA Australian Citizenship: Our Common Bond';
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6 flex flex-col justify-between">
      {/* Card Header */}
      <div className="space-y-1.5 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Civic Domains &amp; Performance
            </h2>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              allBenchmarksMet
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            <span>
              {benchmarksMet} of {domains.length} Benchmarks Met
            </span>
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Official statutory curriculum breakdown assessed dynamically against {countryName} naturalization standards.
        </p>
      </div>

      {/* Domain Breakdown Items */}
      <div className="space-y-5">
        {domains.map((domain) => {
          const isHighMastery = domain.percentage >= 80;
          const isPassedDomain = domain.percentage >= 65;

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
                    {isHighMastery ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                        High Mastery
                      </span>
                    ) : isPassedDomain ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded">
                        Proficient
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-1.5 py-0.2 rounded">
                        Review Focus
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
                    <span
                      className={`font-bold ${
                        isPassedDomain ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      ({domain.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="text-[10px] font-medium text-slate-400">
                    {domain.total - domain.correct === 0
                      ? '100% Perfect'
                      : `${domain.total - domain.correct} Missed Item${domain.total - domain.correct === 1 ? '' : 's'}`}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isPassedDomain
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600'
                    }`}
                    style={{ width: `${Math.min(domain.percentage, 100)}%` }}
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
          <span>{statutoryRubric}</span>
        </span>
        <span
          className={`font-semibold ${
            allBenchmarksMet ? 'text-emerald-700' : 'text-amber-700'
          }`}
        >
          {allBenchmarksMet ? 'Interview Ready' : 'Targeted Practice Advised'}
        </span>
      </div>
    </div>
  );
}

export default CivicDomainsCard;
