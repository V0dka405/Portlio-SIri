'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons';
import { profile } from '@/data/profile';

const links = ['about', 'projects', 'skills', 'certificates', 'experience', 'contact'] as const;

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // Sync the toggle with the class set by the inline init script in layout.tsx
  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = !isLight;
    document.documentElement.classList.toggle('light', next);
    window.localStorage.setItem('theme', next ? 'light' : 'dark');
    setIsLight(next);
  };

  const linkClass =
    'rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-accent';
  const iconBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-accent hover:text-accent';

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-base font-bold tracking-tight">
          <span className="text-accent">&lt;</span>
          {profile.name.split(' ')[0]}
          <span className="text-accent"> /&gt;</span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label={t.nav.mainNav} className="hidden items-center gap-1 md:flex">
          {links.map((id) => (
            <a key={id} href={`#${id}`} className={linkClass}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'th' : 'en')}
            className={`${iconBtn} w-auto px-3 text-xs font-semibold`}
            aria-label={t.nav.switchLanguage}
            lang={locale === 'en' ? 'th' : 'en'}
          >
            {/* Shows the language you will switch TO */}
            {locale === 'en' ? 'TH' : 'EN'}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={iconBtn}
            aria-label={t.nav.switchTheme}
            aria-pressed={isLight}
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`${iconBtn} md:hidden`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.menu}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label={t.nav.mainNav}
          className="container-page flex flex-col gap-1 border-t border-line/60 pb-4 pt-2 md:hidden"
        >
          {links.map((id) => (
            <a key={id} href={`#${id}`} className={linkClass} onClick={() => setOpen(false)}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
