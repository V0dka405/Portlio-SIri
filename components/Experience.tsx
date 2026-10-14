'use client';

import { useLanguage } from './LanguageProvider';
import Section from './Section';
import Timeline from './Timeline';
import { timeline } from '@/data/experience';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" eyebrow={t.experience.eyebrow} title={t.experience.title}>
      <Timeline entries={timeline} />
    </Section>
  );
}
