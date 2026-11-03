'use client';

import Link from 'next/link';
import { useState } from 'react';

export interface CountryOption {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  exam: string;
}

export const COUNTRIES: CountryOption[] = [
  { id: 'us', name: 'United States', shortName: 'US', flag: '🇺🇸', exam: 'USCIS Civics' },
  { id: 'uk', name: 'United Kingdom', shortName: 'UK', flag: '🇬🇧', exam: 'Life in the UK' },
  { id: 'ca', name: 'Canada', shortName: 'CA', flag: '🇨🇦', exam: 'Discover Canada' },
  { id: 'au', name: 'Australia', shortName: 'AU', flag: '🇦🇺', exam: 'Our Common Bond' },
];

interface NavbarProps {
  selectedCountry?: string;
  onCountrySelect?: (id: string) => void;
}

export function Navbar({ selectedCountry = 'us', onCountrySelect }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(selectedCountry);
  const activeCountry = COUNTRIES.find((country) => country.id === currentCountry) ?? COUNTRIES[0];

  const selectCountry = (id: string) => {
    setCurrentCountry(id);
    setCountryOpen(false);
    setMenuOpen(false);
    onCountrySelect?.(id);
  };

  const links = [
    ['Tracks', '#tracks'],
    ['How it works', '#how-it-works'],
    ['Practice', '#practice'],
    ['FAQ', '#faq'],
  ];

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="CivicPass home">
          <span className="brand__mark">CP</span>
          <span className="brand__wordmark">Civic<em>Pass</em></span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div className="site-header__actions">
          <div className="country-menu">
            <button
              type="button"
              className="button-secondary country-menu__button"
              aria-expanded={countryOpen}
              onClick={() => setCountryOpen((open) => !open)}
            >
              <span>{activeCountry.flag}</span>
              <span className="country-menu__name">{activeCountry.shortName}</span>
            </button>
            {countryOpen && (
              <div className="country-menu__popover" role="listbox" aria-label="Choose a citizenship track">
                <span className="country-menu__label">Choose a track</span>
                {COUNTRIES.map((country) => (
                  <button
                    key={country.id}
                    type="button"
                    role="option"
                    aria-selected={country.id === currentCountry}
                    className={country.id === currentCountry ? 'is-active' : ''}
                    onClick={() => selectCountry(country.id)}
                  >
                    <span className="country-menu__option-text">
                      <span>{country.flag}</span>
                      <span><strong>{country.name}</strong><small>{country.exam}</small></span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href={`/test/${currentCountry}`} className="button-primary header-cta">
            Start practice
          </Link>
          <button
            type="button"
            className="menu-button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <div className="container mobile-nav" data-open={menuOpen}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <Link href={`/test/${currentCountry}`} className="button-primary" style={{ marginTop: 14 }} onClick={() => setMenuOpen(false)}>
          Start {activeCountry.name} practice
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
