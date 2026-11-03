'use client';

import Link from 'next/link';
import { useState } from 'react';

const countries = [
  { id: 'us', label: '🇺🇸 United States', name: 'United States' },
  { id: 'uk', label: '🇬🇧 United Kingdom', name: 'United Kingdom' },
  { id: 'ca', label: '🇨🇦 Canada', name: 'Canada' },
  { id: 'au', label: '🇦🇺 Australia', name: 'Australia' },
];

export function BottomCta() {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const active = countries.find((country) => country.id === selectedCountry) ?? countries[0];

  return (
    <div className="cta-panel">
      <div className="cta-panel__content">
        <span className="eyebrow">Start where you are</span>
        <h2>Make your next study session count.</h2>
        <p>Choose a track and try a free practice exam. No account, payment, or long setup required.</p>
        <div className="cta-panel__choices" role="group" aria-label="Choose an exam track">
          {countries.map((country) => (
            <button key={country.id} type="button" onClick={() => setSelectedCountry(country.id)} className={country.id === selectedCountry ? 'is-selected' : ''}>
              {country.label}
            </button>
          ))}
        </div>
        <Link href={`/test/${selectedCountry}`} className="button-primary cta-panel__button">Start {active.name} practice</Link>
      </div>
      <div className="cta-panel__aside"><span>Free to begin</span><strong>One focused session<br />can change your week.</strong></div>
    </div>
  );
}

export default BottomCta;
