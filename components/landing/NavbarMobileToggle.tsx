'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS, COUNTRIES } from './navbarData';

interface NavbarMobileToggleProps {
  initialCountry?: string;
}

export function NavbarMobileToggle({ initialCountry = 'us' }: NavbarMobileToggleProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeCountry =
    COUNTRIES.find((country) => country.id === initialCountry) ?? COUNTRIES[0];

  return (
    <>
      <button
        type="button"
        className="menu-button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>

      <div className="mobile-nav" data-open={menuOpen}>
        {NAV_LINKS.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <Link
          href={`/test/${initialCountry}`}
          className="button-primary"
          onClick={() => setMenuOpen(false)}
        >
          Start {activeCountry.name} practice
        </Link>
      </div>
    </>
  );
}

export default NavbarMobileToggle;
