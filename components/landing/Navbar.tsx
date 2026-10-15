'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Globe2,
  Check,
} from 'lucide-react';

export interface CountryOption {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  exam: string;
}

export const COUNTRIES: CountryOption[] = [
  { id: 'us', name: 'United States', shortName: 'US', flag: '🇺🇸', exam: 'USCIS 100 Civics' },
  { id: 'uk', name: 'United Kingdom', shortName: 'UK', flag: '🇬🇧', exam: 'Life in the UK' },
  { id: 'ca', name: 'Canada', shortName: 'CA', flag: '🇨🇦', exam: 'Discover Canada' },
  { id: 'au', name: 'Australia', shortName: 'AU', flag: '🇦🇺', exam: 'Our Common Bond' },
];

export interface NavbarProps {
  selectedCountry?: string;
  onCountrySelect?: (id: string) => void;
}

export function Navbar({ selectedCountry = 'us', onCountrySelect }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [internalCountry, setInternalCountry] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCountry = internalCountry ?? selectedCountry;

  // Track scroll state for elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close country dropdown on click outside & Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCountryDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const activeCountry =
    COUNTRIES.find((c) => c.id === currentCountry) || COUNTRIES[0];

  const handleSelectCountry = (id: string) => {
    setInternalCountry(id);
    onCountrySelect?.(id);
    setCountryDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Practice Questions', href: '#practice-questions' },
    { label: 'Test Simulator', href: '#features' },
    { label: 'Study Notes', href: '#study-notes' },
    { label: 'Official Study Guides', href: '#study-guides' },
    { label: 'Civic Flashcards', href: '#audio-flashcards' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? 'shadow-xs' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Left Section: Brand Logo & Country Quick-Select Pills */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          >
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0">
              <ShieldCheck className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                Civic<span className="text-blue-600">Pass</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                2026
              </span>
            </div>
          </Link>

          {/* Flag Pill Group */}
          <div
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs font-medium"
            role="group"
            aria-label="Country exam selector"
          >
            {COUNTRIES.map((c) => {
              const isSelected = c.id === currentCountry;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectCountry(c.id)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all ${
                    isSelected
                      ? 'bg-white text-blue-700 font-semibold shadow-xs ring-1 ring-slate-200/80'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                  aria-label={`Select ${c.name} exam`}
                  title={`${c.name} (${c.exam})`}
                >
                  <span className="text-sm leading-none">{c.flag}</span>
                  <span className="text-[11px] font-medium">{c.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Section: Navigation Links (desktop xl+) */}
        <nav
          className="hidden xl:flex items-center gap-7 lg:gap-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Country Dropdown, Log In, CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Active Country Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCountryDropdownOpen((prev) => !prev)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white shadow-xs hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={countryDropdownOpen}
              aria-haspopup="listbox"
              aria-label={`Active exam: ${activeCountry.name}. Click to change.`}
            >
              <span className="text-base leading-none">{activeCountry.flag}</span>
              <span className="font-medium text-slate-800">{activeCountry.name}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  countryDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {countryDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in zoom-in-95"
                role="listbox"
                aria-label="Citizenship Exams"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Switch Citizenship Exam
                </div>
                <div className="mt-1 space-y-1">
                  {COUNTRIES.map((country) => {
                    const isSelected = country.id === currentCountry;
                    return (
                      <button
                        key={country.id}
                        type="button"
                        onClick={() => handleSelectCountry(country.id)}
                        role="option"
                        aria-selected={isSelected}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <span className="text-lg leading-none">{country.flag}</span>
                          <div>
                            <div className="font-medium text-slate-900">{country.name}</div>
                            <div className="text-[11px] text-slate-500 font-normal">
                              {country.exam}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* "Log In" Action */}
          <button
            type="button"
            className="hidden md:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 px-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            Log In
          </button>

          {/* Primary Action Button */}
          <Link
            href={`/test/${currentCountry}`}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm shadow-blue-500/20 whitespace-nowrap transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>Start Free Practice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Hamburger Menu Toggle (screen widths below xl) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown below xl */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-4 sm:px-6 pt-3 pb-6 space-y-5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Country Selector */}
          <div className="pt-3 border-t border-slate-100">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Select Examination</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {COUNTRIES.map((country) => {
                const isSelected = country.id === currentCountry;
                return (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => {
                      handleSelectCountry(country.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/80 text-blue-900 font-semibold ring-1 ring-blue-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl leading-none">{country.flag}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900 text-xs sm:text-sm truncate">
                        {country.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {country.exam}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile CTAs & Log In */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between px-3 text-sm">
              <span className="text-slate-500">Member account</span>
              <button
                type="button"
                className="font-semibold text-blue-600 hover:text-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </button>
            </div>

            <Link
              href={`/test/${currentCountry}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 text-center transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Free Practice Exam</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No credit card required · Free official 2026 questions</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
