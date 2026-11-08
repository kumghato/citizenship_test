'use client';

import React, { createContext, useCallback, useContext, useSyncExternalStore } from 'react';
import { COUNTRIES } from './navbarData';

const COUNTRY_IDS = new Set(COUNTRIES.map((country) => country.id));
const STORAGE_KEY = 'civicpass_selected_country';
const EVENT_NAME = 'civicpass_country_changed';

interface CountryPreferenceContextValue {
  countryId: string;
  setCountryId: (id: string) => void;
}

const CountryPreferenceContext = createContext<CountryPreferenceContextValue | null>(null);

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

function getSnapshot(): string {
  if (typeof window === 'undefined') return 'us';
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val && COUNTRY_IDS.has(val) ? val : 'us';
  } catch {
    return 'us';
  }
}

function getServerSnapshot(): string {
  return 'us';
}

interface CountryPreferenceProviderProps {
  children: React.ReactNode;
}

export function CountryPreferenceProvider({ children }: CountryPreferenceProviderProps) {
  const countryId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setCountryId = useCallback((id: string) => {
    if (COUNTRY_IDS.has(id)) {
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // Storage write may fail in restricted/sandboxed contexts
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(EVENT_NAME));
      }
    }
  }, []);

  return (
    <CountryPreferenceContext.Provider value={{ countryId, setCountryId }}>
      {children}
    </CountryPreferenceContext.Provider>
  );
}

export function useCountryPreference() {
  const context = useContext(CountryPreferenceContext);

  if (!context) {
    throw new Error('useCountryPreference must be used within a CountryPreferenceProvider');
  }

  return context;
}
