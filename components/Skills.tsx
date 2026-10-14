'use client';

import { useLanguage } from './LanguageProvider';
import Section from './Section';
import Reveal from './Reveal';
import SkillGroup from './SkillGroup';
import { skillGroups } from '@/data/skills';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" eyebrow={t.skills.eyebrow} title={t.skills.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => {
          const isLastOdd =
            i === skillGroups.length - 1 && skillGroups.length % 2 !== 0;
          return (
            <Reveal
              key={group.id}
              delay={(i % 2) * 0.08}
              className={`h-full ${isLastOdd ? 'sm:col-span-2' : ''}`}
            >
              <SkillGroup group={group} />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
