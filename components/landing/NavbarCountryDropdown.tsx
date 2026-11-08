'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { COUNTRIES, CountryOption } from './navbarData';
import { useCountryPreference } from './CountryPreferenceProvider';

interface NavbarCountryDropdownProps {
  onCountrySelect?: (id: string) => void;
}

export function NavbarCountryDropdown({ onCountrySelect }: NavbarCountryDropdownProps = {}) {
  const { countryId, setCountryId } = useCountryPreference();
  const [countryOpen, setCountryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCountry =
    COUNTRIES.find((country) => country.id === countryId) ?? COUNTRIES[0];

  useEffect(() => {
    if (!countryOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCountryOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCountryOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [countryOpen]);

  const selectCountry = (id: string) => {
    setCountryId(id);
    setCountryOpen(false);
    onCountrySelect?.(id);
  };

  return (
    <>
      <div className="country-menu" ref={dropdownRef}>
        <button
          type="button"
          className="button-secondary country-menu__button"
          aria-expanded={countryOpen}
          aria-haspopup="listbox"
          onClick={() => setCountryOpen((open) => !open)}
          aria-label={`Current citizenship track: ${activeCountry.name}`}
        >
          <span>{activeCountry.flag}</span>
          <span className="country-menu__name">{activeCountry.shortName}</span>
        </button>
        {countryOpen && (
          <div
            className="country-menu__popover"
            role="listbox"
            aria-label="Choose a citizenship track"
          >
            <span className="country-menu__label">Choose a track</span>
            {COUNTRIES.map((country: CountryOption) => (
              <button
                key={country.id}
                type="button"
                role="option"
                aria-selected={country.id === countryId}
                className={country.id === countryId ? 'is-active' : ''}
                onClick={() => selectCountry(country.id)}
              >
                <span className="country-menu__option-text">
                  <span>{country.flag}</span>
                  <span>
                    <strong>{country.name}</strong>
                    <small>{country.exam}</small>
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Link
        href={`/test/${countryId}`}
        className="button-primary header-cta"
        title={`Start ${activeCountry.name} citizenship practice`}
      >
        Start practice
      </Link>
    </>
  );
}

export default NavbarCountryDropdown;
