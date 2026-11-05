'use client';

import Link from 'next/link';
import { useState } from 'react';

const countries = [
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

export function BottomCta() {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const active =
    countries.find((country) => country.id === selectedCountry) ?? countries[0];

  return (
    <div className="cta-panel">
      <div className="cta-panel__content">
        <span className="eyebrow">Start Where You Are</span>
        <h2>Pass Your Citizenship Exam with Focused Practice.</h2>
        <p>
          Choose your exam track — USCIS, Life in the UK, Discover Canada, or Our Common
          Bond — and begin a free timed mock test with question-by-question review.
        </p>
        <div
          className="cta-panel__choices"
          role="group"
          aria-label="Choose a citizenship examination track"
        >
          {countries.map((country) => (
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
      </div>
      <div className="cta-panel__aside">
        <span>Free Practice Online</span>
        <strong>
          Master your test format.<br />Walk in with confidence.
        </strong>
      </div>
    </div>
  );
}

export default BottomCta;
