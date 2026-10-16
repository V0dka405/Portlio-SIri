'use client';

import { useLanguage } from './LanguageProvider';
import { profile } from '@/data/profile';

interface ProfilePhotoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
}

export default function ProfilePhoto({
  size = 'lg',
  className = '',
  priority = true,
}: ProfilePhotoProps) {
  const { t } = useLanguage();

  const sizeClasses = {
    sm: 'h-36 w-36 sm:h-44 sm:w-44',
    md: 'h-44 w-44 sm:h-52 sm:w-52',
    lg: 'h-60 w-60 sm:h-72 sm:w-72',
  }[size];

  const imgPx = {
    sm: 176,
    md: 208,
    lg: 288,
  }[size];

  return (
    <div className={`group relative shrink-0 ${sizeClasses} ${className}`}>
      {/* Ambient soft glow aura - smooth, clean and centered */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-3xl bg-accent/15 blur-md opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      {profile.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.photo}
          alt={t.hero.photoAlt}
          width={imgPx}
          height={imgPx}
          fetchPriority={priority ? 'high' : 'auto'}
          className="relative h-full w-full rounded-2xl sm:rounded-3xl object-cover shadow-xl border border-white/15 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div
          role="img"
          aria-label={t.hero.photoPlaceholderAlt}
          className="relative flex h-full w-full items-center justify-center rounded-2xl sm:rounded-3xl bg-surface text-5xl font-bold text-accent shadow-xl border border-white/15"
        >
          SS
        </div>
      )}
    </div>
  );
}
