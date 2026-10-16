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
      className="flex min-h-[calc(100svh-4rem)] items-center py-16 sm:py-24"
    >
      <div className="container-page grid items-center gap-8 md:gap-12 md:grid-cols-[1fr_auto]">
        <div className="animate-fade-up order-2 md:order-1">
          {/* Status badge */}
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-fg/90">{t.hero.openToWork}</span>
          </div>

          <p className="mb-2 text-base sm:text-lg text-muted font-sans">{t.hero.greeting}</p>

          <h1
            id="hero-title"
            className="font-display text-4xl font-extrabold tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>

          <p className="mt-3 font-display text-xl font-semibold text-accent sm:text-2xl">
            {pick(profile.title)}
          </p>

          {/* Target Positions Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted mr-1">
              {locale === 'th' ? '// สายงาน:' : '// roles:'}
            </span>
            {targetRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent transition-colors hover:border-accent hover:bg-accent/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {role}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg font-sans">
            {locale === 'th'
              ? 'มุ่งเน้นการพัฒนา Full-Stack Web Application, Mobile App และ Backend System ที่มีประสิทธิภาพ รองรับการขยายตัว และตอบโจทย์ผู้ใช้งานจริง พร้อมต่อยอดเชื่อมต่อกับระบบ IoT และ AI ได้อย่างครบวงจร'
              : 'Specializing in Full-Stack Web Applications, Mobile Apps, and scalable Backend systems with clean architecture. Ready to build robust digital products with the added edge of IoT and AI integration.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <NavLink href="/projects" className="btn-primary text-sm font-semibold">
              {t.hero.viewProjects} →
            </NavLink>
            <a
              href={profile.cvPath}
              download
              className="btn-ghost text-sm font-semibold inline-flex items-center gap-2"
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
