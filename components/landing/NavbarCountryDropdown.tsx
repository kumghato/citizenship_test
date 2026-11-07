'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COUNTRIES, CountryOption } from './navbarData';

interface NavbarCountryDropdownProps {
  initialCountry?: string;
  onCountrySelect?: (id: string) => void;
}

export function NavbarCountryDropdown({
  initialCountry = 'us',
  onCountrySelect,
}: NavbarCountryDropdownProps) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(initialCountry);

  const activeCountry =
    COUNTRIES.find((country) => country.id === currentCountry) ?? COUNTRIES[0];

  const selectCountry = (id: string) => {
    setCurrentCountry(id);
    setCountryOpen(false);
    onCountrySelect?.(id);
  };

  return (
    <>
      <div className="country-menu">
        <button
          type="button"
          className="button-secondary country-menu__button"
          aria-expanded={countryOpen}
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
                aria-selected={country.id === currentCountry}
                className={country.id === currentCountry ? 'is-active' : ''}
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
        href={`/test/${currentCountry}`}
        className="button-primary header-cta"
        title={`Start ${activeCountry.name} citizenship practice`}
      >
        Start practice
      </Link>
    </>
  );
}

export default NavbarCountryDropdown;
