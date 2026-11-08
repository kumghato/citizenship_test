import React from 'react';
import { CreateFlashcardsButton } from './CreateFlashcardsButton';
import { RetakeExamButton } from './RetakeExamButton';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Practice Missed Items */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
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
            <CreateFlashcardsButton
              incorrectCount={incorrectCount}
              onPracticeMissed={onPracticeMissed}
            />
          </div>
        </div>

        {/* Card 2: Next Mock Simulation */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
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
            <RetakeExamButton
              countryId={countryId}
              label="Launch Simulation #5"
              className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/90 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
              title="Launch the next advanced difficulty simulation"
            />
          </div>
        </div>

        {/* Card 3: Commonwealth Compare */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/70">
                Cross-Jurisdiction
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Compare International Civics
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Compare statutory naturalization standards across peer democracies.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {commonwealthTracks.slice(0, 2).map((track) => (
              <RetakeExamButton
                key={track.id}
                countryId={track.id}
                label={`${track.flag} ${track.name} (${track.code})`}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100/90 border border-slate-200 flex items-center justify-between transition-colors cursor-pointer"
                title={`Try the ${track.name} citizenship practice test`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NextActionGrid;
