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

  const activeTab: NavTabId | null =
    links.find((id) => currentPath === `/${id}`) ?? null;

  const desktopRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const mobileRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [desktopPill, setDesktopPill] = useState<PillMetric>({ left: 0, width: 0, visible: false });
  const [mobilePill, setMobilePill] = useState<PillMetric>({ left: 0, width: 0, visible: false });

  const updatePillMetrics = useCallback((tab: NavTabId | null) => {
    if (!tab) {
      setDesktopPill((prev) => ({ ...prev, visible: false }));
      setMobilePill((prev) => ({ ...prev, visible: false }));
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

    const mEl = mobileRefs.current[tab];
    if (mEl) {
      setMobilePill({
        left: mEl.offsetLeft,
        width: mEl.offsetWidth,
        visible: true,
      });
    }
  }, []);

  useEffect(() => {
    updatePillMetrics(activeTab);
    const onResize = () => updatePillMetrics(activeTab);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [activeTab, locale, updatePillMetrics]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-bg/90 backdrop-blur-md">
      {/* Main Header bar with equal left & right wings for mathematical center alignment */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 sm:h-20 items-center justify-between gap-2">
        {/* Left Wing: <Siriwut/> links to Home (/) */}
        <div className="w-36 sm:w-44 flex items-center justify-start shrink-0">
          <NavLink
            href="/"
            className="font-mono text-base sm:text-lg font-bold tracking-tight inline-flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="text-accent">&lt;</span>
            <span className="text-fg font-extrabold tracking-tight">Siriwut</span>
            <span className="text-accent">/&gt;</span>
          </NavLink>
        </div>

        {/* Center: Flex-centered Pill Bar linking to dedicated pages in 0ms */}
        <nav
          aria-label="Desktop page navigation"
          className="hidden min-[900px]:flex flex-1 items-center justify-center min-w-0 px-2"
        >
          <div className="relative flex items-center rounded-full border border-white/10 bg-[#1e1d22] p-1.5 font-mono shadow-lg">
            {/* GPU-accelerated sliding active pill */}
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

        {/* Right Wing: Download CV and Language toggle */}
        <div className="w-36 sm:w-44 flex items-center justify-end gap-2 shrink-0">
          <a
            href={profile.cvPath}
            download
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 font-mono text-xs font-semibold text-accent hover:bg-accent/20 hover:border-accent transition-all shadow-sm whitespace-nowrap"
            title="Download CV"
          >
            <span>Download CV</span>
            <span className="text-[11px]">↓</span>
          </a>

          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'th' : 'en')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface font-mono text-xs font-semibold text-fg/90 transition-all hover:border-accent hover:text-accent hover:bg-accent/5 shrink-0"
            aria-label={t.nav.switchLanguage}
            lang={locale === 'en' ? 'th' : 'en'}
          >
            {locale === 'en' ? 'TH' : 'EN'}
          </button>
        </div>
      </div>

      {/* Mobile / Narrow Screen: Centered pill bar row underneath (< 900px) */}
      <div className="min-[900px]:hidden pb-2.5 pt-0.5 px-3 flex justify-center">
        <nav
          aria-label="Mobile page navigation"
          className="w-full max-w-[calc(100vw-20px)] flex items-center justify-center"
        >
          <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1e1d22] p-1 font-mono shadow-md overflow-x-auto no-scrollbar">
            {/* GPU-accelerated mobile sliding pill */}
            <span
              aria-hidden="true"
              style={{
                transform: `translate3d(${mobilePill.left}px, 0, 0)`,
                width: `${mobilePill.width}px`,
                opacity: mobilePill.visible ? 1 : 0,
              }}
              className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-xl bg-[#1865f2] shadow-sm transition-[transform,width,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,width]"
            />

            <div className="flex items-center gap-1">
              {links.map((id) => {
                const isActive = activeTab === id;
                return (
                  <NavLink
                    key={id}
                    ref={(el) => {
                      mobileRefs.current[id] = el;
                    }}
                    href={`/${id}`}
                    className={`relative z-10 flex shrink-0 select-none items-center justify-center px-3 py-1.5 text-xs font-semibold tracking-wider lowercase transition-colors duration-150 outline-none rounded-xl ${
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
      </div>
    </header>
  );
}
