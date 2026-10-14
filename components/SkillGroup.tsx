'use client';

import { useLanguage } from './LanguageProvider';
import type { SkillGroupData } from '@/data/skills';

export default function SkillGroup({ group }: { group: SkillGroupData }) {
  const { pick } = useLanguage();
  const headingId = `skills-${group.id}`;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/60">
      <h3 id={headingId} className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
        {pick(group.title)}
      </h3>
      <ul aria-labelledby={headingId} className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
