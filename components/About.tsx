'use client';

import { useLanguage } from './LanguageProvider';
import Section from './Section';
import Reveal from './Reveal';

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
      <Reveal className="max-w-3xl space-y-4 text-lg text-muted">
        {t.about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <ul className="flex flex-wrap gap-2" aria-label={t.about.eyebrow}>
          {t.about.focus.map((item) => (
            <li key={item} className="chip border-accent/50 text-accent">
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
