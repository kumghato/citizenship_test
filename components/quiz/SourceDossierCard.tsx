'use client';

import React from 'react';
import { BookOpen, ExternalLink, Scroll, Award, Sparkles } from 'lucide-react';
import { QuizQuestion } from '@/lib/quizData';

interface SourceDossierCardProps {
  countryId: string;
  countryName: string;
  dossierTitle: string;
  dossierParchmentTitle: string;
  currentQuestion: QuizQuestion;
}

export function SourceDossierCard({
  countryId,
  countryName,
  dossierTitle,
  dossierParchmentTitle,
  currentQuestion,
}: SourceDossierCardProps) {
  // Country official portal link
  const officialLinks: Record<string, { label: string; url: string }> = {
    us: { label: 'USCIS Official Civics Portal', url: 'https://www.uscis.gov/citizenship' },
    uk: { label: 'UK Gov Life in the UK Guidance', url: 'https://www.gov.uk/life-in-the-uk-test' },
    ca: { label: 'IRCC Discover Canada Guide', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html' },
    au: { label: 'DHA Our Common Bond Resource', url: 'https://immi.homeaffairs.gov.au/citizenship/test-and-interview/our-common-bond' },
  };

  const portalInfo = officialLinks[countryId] || officialLinks.us;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              {dossierTitle}
            </h3>
            <p className="text-[10.5px] text-slate-400 font-normal">
              {countryName} Official Reference
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {currentQuestion.statutoryStandard}
        </span>
      </div>

      {/* Parchment Thumbnail Graphic Box */}
      <div className="relative rounded-xl overflow-hidden border border-amber-200/80 bg-gradient-to-b from-amber-50/70 via-amber-50/40 to-white p-4 shadow-xs">
        {/* Subtle decorative watermark */}
        <div className="absolute top-2 right-2 opacity-15 text-amber-800 pointer-events-none">
          <Scroll className="w-16 h-16" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{dossierParchmentTitle}</span>
          </div>

          <p className="text-[11.5px] text-amber-950 font-serif italic leading-relaxed line-clamp-3">
            &ldquo;{currentQuestion.statutoryGuidance.legalCitation}&rdquo;
          </p>
        </div>
      </div>

      {/* Authoritative Study Notes for the active question */}
      <div className="space-y-2 text-xs">
        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Statutory Authority &amp; Historical Context</span>
        </div>

        <p className="text-slate-600 leading-relaxed text-[11.5px] bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          {currentQuestion.statutoryGuidance.dossierNotes}
        </p>
      </div>

      {/* Footer Link to Official Agency Source */}
      <div className="pt-2 border-t border-slate-100">
        <a
          href={portalInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 transition-colors group"
        >
          <span>{portalInfo.label}</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
export default SourceDossierCard;
