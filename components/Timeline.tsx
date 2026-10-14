'use client';

import { useLanguage } from './LanguageProvider';
import Reveal from './Reveal';
import type { TimelineEntry } from '@/data/experience';

/** Vertical timeline rendered as an ordered list (newest first). */
export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const { t, pick } = useLanguage();

  return (
    <ol className="relative ml-3 border-l-2 border-line">
      {entries.map((entry, i) => {
        const points = pick(entry.points);
        return (
          <li key={entry.id} className="relative pb-10 pl-8 last:pb-0">
            {/* Timeline dot */}
            <span
              aria-hidden="true"
              className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-accent ${
                entry.kind === 'work' ? 'bg-accent' : 'bg-bg'
              }`}
            />
            <Reveal delay={i * 0.08}>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {entry.kind === 'work' ? t.experience.work : t.experience.education}
                <span className="mx-2 text-muted" aria-hidden="true">
                  ·
                </span>
                <span className="text-muted">{pick(entry.period)}</span>
              </p>
              <h3 className="mt-1 text-xl font-semibold">{pick(entry.role)}</h3>
              <p className="text-muted">{pick(entry.org)}</p>

              {points.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted marker:text-accent">
                  {points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
