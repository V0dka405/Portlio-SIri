'use client';

import { NavLink } from './PageRouter';
import { useLanguage } from './LanguageProvider';
import { profile } from '@/data/profile';
import { DownloadIcon } from './icons';
import ProfilePhoto from './ProfilePhoto';

export default function Hero() {
  const { t, pick, locale } = useLanguage();

  const targetRoles = [
    'Full-Stack Developer',
    'Backend Developer',
    'Mobile Developer',
    'Frontend Developer',
    'IoT Engineer',
    'AI Engineer',
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-6.5rem)] items-center py-8 sm:py-20"
    >
      <div className="container-page grid items-center gap-6 sm:gap-10 md:gap-12 md:grid-cols-[1fr_auto]">
        <div className="animate-fade-up order-2 md:order-1 text-center md:text-left">
          {/* Status badge */}
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] sm:text-xs text-muted max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-fg/90 truncate">{t.hero.openToWork}</span>
          </div>

          <p className="mb-1.5 text-sm sm:text-lg text-muted font-sans">{t.hero.greeting}</p>

          <h1
            id="hero-title"
            className="font-display text-3xl font-extrabold tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>

          <p className="mt-2 sm:mt-3 font-display text-base font-semibold text-accent sm:text-2xl leading-snug">
            {pick(profile.title)}
          </p>

          {/* Target Positions Pills — compact & centered on mobile */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            <span className="hidden sm:inline font-mono text-xs text-muted mr-1">
              {locale === 'th' ? '// สายงาน:' : '// roles:'}
            </span>
            {targetRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/5 px-2.5 py-0.5 sm:py-1 font-mono text-[11px] sm:text-xs text-accent transition-colors hover:border-accent hover:bg-accent/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {role}
              </span>
            ))}
          </div>

          <p className="mt-4 sm:mt-6 mx-auto md:mx-0 max-w-xl text-sm leading-relaxed text-muted sm:text-lg font-sans">
            {locale === 'th'
              ? 'มุ่งเน้นการพัฒนา Full-Stack Web Application, Mobile App และ Backend System ที่มีประสิทธิภาพ รองรับการขยายตัว และตอบโจทย์ผู้ใช้งานจริง พร้อมต่อยอดเชื่อมต่อกับระบบ IoT และ AI ได้อย่างครบวงจร'
              : 'Specializing in Full-Stack Web Applications, Mobile Apps, and scalable Backend systems with clean architecture. Ready to build robust digital products with the added edge of IoT and AI integration.'}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            <NavLink
              href="/projects"
              className="btn-primary text-xs sm:text-sm font-semibold px-5 py-2.5"
            >
              {t.hero.viewProjects} →
            </NavLink>
            <a
              href={profile.cvPath}
              download
              className="btn-ghost text-xs sm:text-sm font-semibold inline-flex items-center gap-2 px-4 py-2.5"
            >
              <DownloadIcon className="h-4 w-4 text-accent" />
              <span>{t.hero.downloadCv}</span>
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <ProfilePhoto size="lg" />
        </div>
      </div>
    </section>
  );
}
