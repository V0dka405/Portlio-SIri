'use client';

import { useLanguage } from './LanguageProvider';
import { profile } from '@/data/profile';

/** Profile photo, or a neutral placeholder until `profile.photo` is set. */
function ProfilePhoto() {
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto h-52 w-52 shrink-0 sm:h-64 sm:w-64">
      {/* Decorative accent ring */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-accent/60"
      />
      {profile.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.photo}
          alt={t.hero.photoAlt}
          width={256}
          height={256}
          fetchPriority="high"
          className="relative h-full w-full rounded-3xl object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={t.hero.photoPlaceholderAlt}
          className="relative flex h-full w-full items-center justify-center rounded-3xl bg-surface text-6xl font-bold text-accent"
        >
          SS
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const { t, pick } = useLanguage();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-4rem)] items-center py-16"
    >
      <div className="container-page grid items-center gap-12 md:grid-cols-[1fr_auto]">
        {/* CSS animation (not Framer) so the hero is visible immediately: better LCP */}
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {t.hero.openToWork}
          </p>
          <p className="mb-2 text-lg text-muted">{t.hero.greeting}</p>
          <h1 id="hero-title" className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">{pick(profile.title)}</p>
          {t.hero.tagline ? (
            <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">{t.hero.tagline}</p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              {t.hero.viewProjects}
            </a>
            <a href={profile.cvPath} download className="btn-ghost">
              {t.hero.downloadCv}
            </a>
          </div>
        </div>

        <ProfilePhoto />
      </div>
    </section>
  );
}
