'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, COUNTRIES } from './navbarData';
import { useCountryPreference } from './CountryPreferenceProvider';

export function NavbarMobileToggle() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { countryId } = useCountryPreference();
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeCountry =
    COUNTRIES.find((country) => country.id === countryId) ?? COUNTRIES[0];

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? (
          <X size={20} strokeWidth={2.2} aria-hidden="true" />
        ) : (
          <Menu size={20} strokeWidth={2.2} aria-hidden="true" />
        )}
      </button>

      <div
        ref={menuContainerRef}
        className="mobile-nav"
        id="mobile-navigation"
        data-open={menuOpen}
      >
        {NAV_LINKS.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <Link
          href={`/test/${countryId}`}
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
