'use client';

import Link from 'next/link';
import { COUNTRIES } from './navbarData';
import { useCountryPreference } from './CountryPreferenceProvider';

export function HeroPracticeButton() {
  const { countryId } = useCountryPreference();
  const activeCountry = COUNTRIES.find((country) => country.id === countryId) ?? COUNTRIES[0];

  return (
    <Link
      href={`/test/${activeCountry.id}`}
      className="button-primary"
      title={`Start free ${activeCountry.name} citizenship practice`}
      aria-label={`Start free ${activeCountry.name} citizenship practice`}
    >
      Start practice
    </Link>
  );
}

export default HeroPracticeButton;
