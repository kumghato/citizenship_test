'use client';

import Link from 'next/link';
import { EXAM_DATA, SUPPORTED_COUNTRIES, SupportedCountry } from '@/lib/quizData';
import { useCountryPreference } from './CountryPreferenceProvider';

interface CountrySelectorProps {
  initialCountry?: SupportedCountry;
  onSelectCountry?: (id: SupportedCountry) => void;
}

const TRACK_DETAILS: Record<
  SupportedCountry,
  { accent: string; examName: string; description: string; ctaText: string }
> = {
  us: {
    accent: 'USCIS Civics',
    examName: 'USCIS Civics & US Citizen Test',
    description:
      'Official USCIS test questions, civics practice, and American citizen test simulation.',
    ctaText: 'Start USCIS practice',
  },
  uk: {
    accent: 'Life in the UK',
    examName: 'Life in the UK Mock Test',
    description:
      'Life in the UK test web practice questions, timed mock tests, and 3rd edition handbook guide.',
    ctaText: 'Take Life in the UK test',
  },
  ca: {
    accent: 'Discover Canada',
    examName: 'Discover Canada Practice Test',
    description:
      'Canadian citizenship test practice questions aligned with the official Discover Canada guide.',
    ctaText: 'Start Canadian citizenship test',
  },
  au: {
    accent: 'Our Common Bond',
    examName: 'Our Common Bond Australian Exam',
    description:
      'Australian citizenship Our Common Bond practice test including mandatory Australian values.',
    ctaText: 'Practice Our Common Bond',
  },
};

export function CountrySelector({
  initialCountry = 'us',
  onSelectCountry,
}: CountrySelectorProps) {
  const { countryId, setCountryId } = useCountryPreference();
  const selectedId = (SUPPORTED_COUNTRIES.includes(countryId as SupportedCountry)
    ? countryId
    : initialCountry) as SupportedCountry;
  const active = EXAM_DATA[selectedId];

  const selectCountry = (id: SupportedCountry) => {
    setCountryId(id);
    onSelectCountry?.(id);
  };

  return (
    <div className="track-selector">
      <div className="track-grid">
        {SUPPORTED_COUNTRIES.map((id) => {
          const country = EXAM_DATA[id];
          const track = TRACK_DETAILS[id];
          const isSelected = id === selectedId;
          return (
            <article
              key={id}
              className={`track-card ${isSelected ? 'is-selected' : ''}`}
            >
              <button
                type="button"
                className="track-card__select"
                onClick={() => selectCountry(id)}
                aria-pressed={isSelected}
                aria-label={`Select ${country.countryName} citizenship track`}
              >
                <span className="track-card__topline">
                  <span className="track-card__flag">{country.flag}</span>
                  {isSelected && <span className="track-card__active">Selected</span>}
                </span>
                <span className="track-card__code">
                  {track.accent} · {country.shortCode}
                </span>
                <strong>{country.countryName}</strong>
                <span className="track-card__exam">{track.examName}</span>
              </button>
              <p>{track.description}</p>
              <div className="track-card__facts">
                <span>{country.totalQuestions} questions</span>
                <span>{Math.round(country.timeLimitSeconds / 60)} min</span>
              </div>
              <Link
                href={`/test/${id}`}
                className="track-card__link"
                title={`Launch ${track.examName} (${country.countryName})`}
              >
                {isSelected ? track.ctaText : `View ${country.shortCode} track`}
              </Link>
            </article>
          );
        })}
      </div>

      <div className="track-summary">
        <div>
          <span className="eyebrow">Active study track</span>
          <strong>
            {active.flag} {active.countryName} — {TRACK_DETAILS[selectedId].examName}
          </strong>
          <p>{TRACK_DETAILS[selectedId].description}</p>
        </div>
        <Link
          href={`/test/${selectedId}`}
          className="button-primary"
          title={`Launch ${TRACK_DETAILS[selectedId].examName}`}
        >
          {TRACK_DETAILS[selectedId].ctaText}
        </Link>
      </div>
    </div>
  );
}

export default CountrySelector;
