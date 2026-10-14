'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dictionaries, type Dictionary } from '@/data/i18n';
import type { Locale, Localized } from '@/lib/types';

const STORAGE_KEY = 'locale';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UI strings for the active language. */
  t: Dictionary;
  /** Pick the active-language value from a Localized<T> field in /data. */
  pick: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with "en" so server HTML and first client render match (no hydration mismatch).
  const [locale, setLocaleState] = useState<Locale>('en');

  // After mount, restore saved preference or fall back to the browser language.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'th') {
      setLocaleState(saved);
    } else if (navigator.language?.toLowerCase().startsWith('th')) {
      setLocaleState('th');
    }
  }, []);

  // Keep <html lang> in sync for screen readers and font selection.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      pick: (v) => v[locale],
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
