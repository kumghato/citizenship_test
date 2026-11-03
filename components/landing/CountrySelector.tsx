'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EXAM_DATA, SUPPORTED_COUNTRIES, SupportedCountry } from '@/lib/quizData';

interface CountrySelectorProps {
  initialCountry?: SupportedCountry;
  onSelectCountry?: (id: SupportedCountry) => void;
}

const TRACK_DETAILS: Record<SupportedCountry, { accent: string; description: string }> = {
  us: { accent: 'USCIS', description: 'Civics, government, history, and integrated civics practice.' },
  uk: { accent: 'UKVI', description: 'British history, government, customs, and everyday life.' },
  ca: { accent: 'IRCC', description: 'Canadian rights, history, geography, and government.' },
  au: { accent: 'DHA', description: 'Australian values, people, government, and national symbols.' },
};

export function CountrySelector({ initialCountry = 'us', onSelectCountry }: CountrySelectorProps) {
  const [selectedId, setSelectedId] = useState<SupportedCountry>(initialCountry);
  const active = EXAM_DATA[selectedId];

  const selectCountry = (id: SupportedCountry) => {
    setSelectedId(id);
    onSelectCountry?.(id);
  };

  return (
    <div className="track-selector">
      <div className="track-grid">
        {SUPPORTED_COUNTRIES.map((id) => {
          const country = EXAM_DATA[id];
          const isSelected = id === selectedId;
          return (
            <article key={id} className={`track-card ${isSelected ? 'is-selected' : ''}`}>
              <button type="button" className="track-card__select" onClick={() => selectCountry(id)} aria-pressed={isSelected}>
                <span className="track-card__topline">
                  <span className="track-card__flag">{country.flag}</span>
                  {isSelected && <span className="track-card__active">Selected</span>}
                </span>
                <span className="track-card__code">{TRACK_DETAILS[id].accent} · {country.shortCode}</span>
                <strong>{country.countryName}</strong>
                <span className="track-card__exam">{country.examTitle}</span>
              </button>
              <p>{TRACK_DETAILS[id].description}</p>
              <div className="track-card__facts">
                <span>{country.questions.length} questions</span>
                <span>{Math.round(country.timeLimitSeconds / 60)} min</span>
              </div>
              <Link href={`/test/${id}`} className="track-card__link">
                {isSelected ? 'Start practice' : 'View track'}
              </Link>
            </article>
          );
        })}
      </div>

      <div className="track-summary">
        <div>
          <span className="eyebrow">Active study track</span>
          <strong>{active.flag} {active.countryName}</strong>
          <p>{TRACK_DETAILS[selectedId].description}</p>
        </div>
        <Link href={`/test/${selectedId}`} className="button-primary">Launch {active.shortCode} test</Link>
      </div>
    </div>
  );
}

export default CountrySelector;
