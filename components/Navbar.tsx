'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from './LanguageProvider';
import { NavLink, usePageRouter } from './PageRouter';
import { profile } from '@/data/profile';

const links = [
  'about',
  'projects',
  'skills',
  'certificates',
  'experience',
  'contact',
] as const;

type NavTabId = (typeof links)[number];

interface PillMetric {
  left: number;
  width: number;
  visible: boolean;
}

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { currentPath } = usePageRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTab: NavTabId | null =
    links.find((id) => currentPath === `/${id}`) ?? null;

  const desktopRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [desktopPill, setDesktopPill] = useState<PillMetric>({
    left: 0,
    width: 0,
    visible: false,
  });

  const updatePillMetrics = useCallback((tab: NavTabId | null) => {
    if (!tab) {
      setDesktopPill((prev) => ({ ...prev, visible: false }));
      return;
    }

    const dEl = desktopRefs.current[tab];
    if (dEl) {
      setDesktopPill({
        left: dEl.offsetLeft,
        width: dEl.offsetWidth,
        visible: true,
      });
    }
  }, []);

  useEffect(() => {
    updatePillMetrics(activeTab);
    const onResize = () => {
      updatePillMetrics(activeTab);
      if (window.innerWidth >= 900) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [activeTab, locale, updatePillMetrics]);

  // Close mobile menu when route changes or Escape is pressed
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-bg/90 backdrop-blur-md">
      {/* Main Header bar: single clean row on mobile (h-14), spacious on PC (min-[900px]:h-20) */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex h-14 min-[900px]:h-20 items-center justify-between gap-2">
        {/* Left Wing: <Siriwut/> links to Home (/) */}
        <div className="min-[900px]:w-44 flex items-center justify-start shrink-0">
          <NavLink
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-base sm:text-lg font-bold tracking-tight inline-flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="text-accent">&lt;</span>
            <span className="text-fg font-extrabold tracking-tight">Siriwut</span>
            <span className="text-accent">/&gt;</span>
          </NavLink>
        </div>

        {/* Center: Desktop Pill Bar (strictly PC >= 900px — completely untouched) */}
        <nav
          aria-label="Desktop page navigation"
          className="hidden min-[900px]:flex flex-1 items-center justify-center min-w-0 px-2"
        >
          <div className="relative flex items-center rounded-full border border-white/10 bg-[#1e1d22] p-1.5 font-mono shadow-lg">
            <span
              aria-hidden="true"
              style={{
                transform: `translate3d(${desktopPill.left}px, 0, 0)`,
                width: `${desktopPill.width}px`,
                opacity: desktopPill.visible ? 1 : 0,
              }}
              className="pointer-events-none absolute top-1.5 bottom-1.5 left-0 rounded-full bg-[#1865f2] shadow-sm transition-[transform,width,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,width]"
            />

            <div className="flex items-center gap-1">
              {links.map((id) => {
                const isActive = activeTab === id;
                return (
                  <NavLink
                    key={id}
                    ref={(el) => {
                      desktopRefs.current[id] = el;
                    }}
                    id={`nav-btn-${id}`}
                    href={`/${id}`}
                    className={`relative z-10 flex shrink-0 select-none items-center justify-center px-3.5 sm:px-4 py-1.5 text-xs sm:text-[13px] font-semibold tracking-wider lowercase transition-colors duration-150 outline-none rounded-full ${
                      isActive ? 'text-white' : 'text-[#8e8d93] hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative z-10 whitespace-nowrap">{t.nav[id]}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Right Wing: Download CV, Language toggle, and Mobile Hamburger button */}
        <div className="min-[900px]:w-44 flex items-center justify-end gap-2 shrink-0">
          <a
            href={profile.cvPath}
            download
            className="inline-flex h-8 sm:h-9 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 sm:px-3.5 font-mono text-[11px] sm:text-xs font-semibold text-accent hover:bg-accent/20 hover:border-accent transition-all shadow-sm whitespace-nowrap"
            title="Download CV"
          >
            <span>Download CV</span>
            <span className="text-[11px]">↓</span>
          </a>

          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'th' : 'en')}
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-line bg-surface font-mono text-[11px] sm:text-xs font-semibold text-fg/90 transition-all hover:border-accent hover:text-accent hover:bg-accent/5 shrink-0"
            aria-label={t.nav.switchLanguage}
            lang={locale === 'en' ? 'th' : 'en'}
          >
            {locale === 'en' ? 'TH' : 'EN'}
          </button>

          {/* Hamburger Button (visible ONLY on Mobile/Tablet < 900px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="min-[900px]:hidden inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-line bg-surface text-fg/90 transition-colors hover:border-accent hover:text-accent shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer (< 900px only) */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile page navigation"
          className="min-[900px]:hidden border-t border-line/40 bg-[#1e1d22]/95 px-4 py-3 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-2 font-mono">
            {links.map((id) => {
              const isActive = activeTab === id;
              return (
                <NavLink
                  key={id}
                  href={`/${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide lowercase transition-colors ${
                    isActive
                      ? 'bg-[#1865f2] text-white shadow-sm'
                      : 'border border-white/5 bg-surface/70 text-[#b5afab] hover:border-accent/40 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{t.nav[id]}</span>
                  <span className="text-[10px] opacity-75">→</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
