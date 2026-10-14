'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import Section from './Section';
import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '@/data/projects';

export default function Projects() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  return (
    <Section id="projects" eyebrow={t.projects.eyebrow} title={t.projects.title}>
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.id}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={project} onOpen={setSelectedId} />
            </Reveal>
          </li>
        ))}
      </ul>

      <ProjectModal project={selected} onClose={() => setSelectedId(null)} />
    </Section>
  );
}
