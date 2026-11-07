'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface CtaCountry {
  id: string;
  label: string;
  name: string;
  examDesc: string;
}

export const CTA_COUNTRIES: CtaCountry[] = [
  {
    id: 'us',
    label: '🇺🇸 USCIS Civics (USA)',
    name: 'USCIS Civics',
    examDesc: 'US citizen test & civics questions',
  },
  {
    id: 'uk',
    label: '🇬🇧 Life in the UK',
    name: 'Life in the UK',
    examDesc: 'Life in the UK mock test & practice questions',
  },
  {
    id: 'ca',
    label: '🇨🇦 Discover Canada',
    name: 'Discover Canada',
    examDesc: 'Canadian citizenship test practice',
  },
  {
    id: 'au',
    label: '🇦🇺 Our Common Bond',
    name: 'Our Common Bond',
    examDesc: 'Australian citizenship practice exam',
  },
];

export function BottomCtaSelector() {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const active =
    CTA_COUNTRIES.find((country) => country.id === selectedCountry) ?? CTA_COUNTRIES[0];

  return (
    <>
      <div
        className="cta-panel__choices"
        role="group"
        aria-label="Choose a citizenship examination track"
      >
        {CTA_COUNTRIES.map((country) => (
          <button
            key={country.id}
            type="button"
            onClick={() => setSelectedCountry(country.id)}
            className={country.id === selectedCountry ? 'is-selected' : ''}
            aria-label={`Select ${country.name} exam track`}
          >
            {country.label}
          </button>
        ))}
      </div>
      <Link
        href={`/test/${selectedCountry}`}
        className="button-primary cta-panel__button"
        title={`Start ${active.name} practice test`}
      >
        Start {active.name} Practice Exam
      </Link>
    </>
  );
}

export default BottomCtaSelector;
