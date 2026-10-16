'use client';

import { useLanguage } from './LanguageProvider';
import type { SkillGroupData } from '@/data/skills';

export default function SkillGroup({ group }: { group: SkillGroupData }) {
  const { pick } = useLanguage();
  const headingId = `skills-${group.id}`;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface/90 p-6 transition-colors duration-200 hover:border-accent/60 hover:bg-surface">
      <div>
        <div className="mb-4 flex items-center justify-between border-b border-line/50 pb-2.5">
          <h3
            id={headingId}
            className="font-mono text-xs font-semibold uppercase tracking-wider text-accent"
          >
            // {pick(group.title)}
          </h3>
          <span className="font-mono text-[10px] text-muted">
            {group.items.length} skills
          </span>
        </div>

        <ul aria-labelledby={headingId} className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="font-mono text-xs rounded-lg border border-line/70 bg-bg/60 px-3 py-1.5 text-fg/90 transition-colors hover:border-accent hover:text-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
