'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  User,
  ArrowRight,
  Globe2,
} from 'lucide-react';

interface CountryOption {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  exam: string;
}

const COUNTRIES: CountryOption[] = [
  { id: 'us', name: 'United States', shortName: 'US', flag: '🇺🇸', exam: 'USCIS 100 Civics' },
  { id: 'uk', name: 'United Kingdom', shortName: 'UK', flag: '🇬🇧', exam: 'Life in the UK' },
  { id: 'ca', name: 'Canada', shortName: 'CA', flag: '🇨🇦', exam: 'Discover Canada' },
  { id: 'au', name: 'Australia', shortName: 'AU', flag: '🇦🇺', exam: 'Our Common Bond' },
];

interface NavbarProps {
  selectedCountry?: string;
  onCountrySelect?: (id: string) => void;
}

export function Navbar({ selectedCountry = 'us', onCountrySelect }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [internalCountry, setInternalCountry] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const currentCountry = internalCountry ?? selectedCountry;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeCountry =
    COUNTRIES.find((c) => c.id === currentCountry) || COUNTRIES[0];

  const handleSelectCountry = (id: string) => {
    setInternalCountry(id);
    onCountrySelect?.(id);
    setCountryDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Practice Question', href: '#practice-questions' },
    { label: 'Test Simulator', href: '#features' },
    { label: 'Study Notes', href: '#study-notes' },
    { label: 'Official Study Guides', href: '#study-guides' },
    { label: 'Civic Flashcards', href: '#audio-flashcards' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo & Country Indicator Dots */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg md:text-xl text-slate-900 tracking-tight">
                    Civic<span className="text-blue-600">Pass</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                    2026
                  </span>
                </div>
              </div>
            </a>

            {/* Flag Indicator Dots */}
            <div
              className="hidden lg:flex items-center gap-1 pl-2 border-l border-slate-200"
              title="Official prep for US, UK, Canada, & Australia"
            >
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCountry(c.id)}
                  className={`text-xs px-1.5 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                    c.id === currentCountry
                      ? 'bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-400'
                      : 'text-slate-500 hover:bg-slate-100 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Select ${c.name}`}
                >
                  <span>{c.flag}</span>
                  <span className="text-[11px]">{c.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 hover:bg-slate-50 font-medium text-[13.5px] px-3 py-1.5 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Country Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90 transition-all hover:border-slate-300"
                aria-expanded={countryDropdownOpen}
              >
                <span className="text-sm">{activeCountry.flag}</span>
                <span>{activeCountry.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    countryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {countryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-200/80 p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Switch Citizenship Exam
                  </div>
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => handleSelectCountry(country.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        country.id === currentCountry
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{country.flag}</span>
                        <div className="text-left">
                          <div className="font-medium">{country.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {country.exam}
                          </div>
                        </div>
                      </div>
                      {country.id === currentCountry && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Avatar Pill */}
            <button
              type="button"
              className="flex items-center gap-1.5 p-1 pr-2.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-all"
              title="CivicPass Member Account"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-slate-300/80 flex items-center justify-center text-slate-600">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] text-slate-600">Log In</span>
            </button>

            {/* Primary CTA */}
            <Link
              href={`/test/${currentCountry}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-500/20 hover:shadow-blue-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Free Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Country Selector */}
          <div className="pt-2 border-t border-slate-100">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Select Examination</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {COUNTRIES.map((country) => (
                <button
                  key={country.id}
                  onClick={() => {
                    handleSelectCountry(country.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs border text-left transition-colors ${
                    country.id === currentCountry
                      ? 'border-blue-500 bg-blue-50/70 text-blue-800 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <div>
                    <div className="font-medium text-slate-900">{country.shortName}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[90px]">
                      {country.exam}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile CTAs */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href={`/test/${currentCountry}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm text-center"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Free Practice Exam</span>
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>No credit card required · Free official 2026 questions</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
