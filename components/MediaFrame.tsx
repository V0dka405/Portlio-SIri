'use client';

import { useLanguage } from './LanguageProvider';
import { ExternalIcon, ImageIcon, PlayIcon, TiktokIcon } from './icons';
import type { ProjectMedia } from '@/data/projects';

interface MediaFrameProps {
  media: ProjectMedia;
  /** Controls video behaviour: cards stay still, modal shows native controls. */
  variant: 'card' | 'modal';
}

/** Frame for a project image/video/youtube/tiktok, with a placeholder until `media.src` is set. */
export default function MediaFrame({ media, variant }: MediaFrameProps) {
  const { t, pick } = useLanguage();
  const frame = 'relative aspect-video w-full overflow-hidden bg-elevated/60';

  if (!media.src && !media.youtubeId && !media.tiktokId) {
    return (
      <div
        className={`${frame} flex flex-col items-center justify-center gap-2 text-muted`}
        role="img"
        aria-label={pick(media.alt)}
      >
        <ImageIcon className="h-8 w-8" />
        <span className="px-4 text-center text-xs">{t.projects.mediaPlaceholder}</span>
      </div>
    );
  }

  if (media.type === 'youtube' && media.youtubeId) {
    if (variant === 'modal') {
      return (
        <div className={frame}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}?autoplay=1&rel=0`}
            title={pick(media.alt)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      );
    }

    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src || `https://i.ytimg.com/vi/${media.youtubeId}/hqdefault.jpg`}
          alt={pick(media.alt)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg shadow-black/40 transition-transform duration-200 group-hover:scale-110">
            <PlayIcon className="h-5 w-5 ml-0.5" />
          </div>
        </div>
      </div>
    );
  }

  if (media.type === 'tiktok' && media.tiktokId) {
    if (variant === 'modal') {
      return (
        <div className="relative flex w-full flex-col items-center justify-center bg-black/95 p-4 sm:p-6">
          <div className="relative aspect-[9/16] h-[480px] sm:h-[540px] max-w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
            <iframe
              src={`https://www.tiktok.com/player/v1/${media.tiktokId}?music_info=1&description=1`}
              title={pick(media.alt)}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          <a
            href={`https://www.tiktok.com/@thisforu7/video/${media.tiktokId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-white"
          >
            <TiktokIcon className="h-3.5 w-3.5 text-accent" />
            <span>Open in TikTok</span>
            <ExternalIcon className="h-3 w-3" />
          </a>
        </div>
      );
    }

    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src ?? '/projects/kinraidee.png'}
          alt={pick(media.alt)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/80 text-white shadow-lg shadow-black/40 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-110">
            <PlayIcon className="h-5 w-5 ml-0.5 text-accent" />
          </div>
        </div>
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/15">
          <TiktokIcon className="h-3.5 w-3.5 text-accent" />
          <span>TikTok Demo</span>
        </div>
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <div className={frame}>
        <video
          src={media.src ?? undefined}
          poster={media.poster}
          controls={variant === 'modal'}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={pick(media.alt)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.src ?? undefined}
        alt={pick(media.alt)}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
