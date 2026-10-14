'use client';

import { useLanguage } from './LanguageProvider';
import MediaFrame from './MediaFrame';
import ExternalLink from './ExternalLink';
import { GithubIcon, ExternalIcon, YoutubeIcon, TiktokIcon, SlideIcon } from './icons';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t, pick } = useLanguage();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/70 focus-within:border-accent/70">
      <MediaFrame media={project.media} variant="card" />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">
          {/* The button's ::after stretches over the whole card, making the card clickable
              while keeping a single, properly-labelled interactive element for keyboards. */}
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:text-accent group-hover:text-accent"
          >
            {pick(project.title)}
            <span className="sr-only"> — {t.projects.viewDetails}</span>
          </button>
        </h3>

        <p className="mt-2 flex-1 text-sm text-muted">{pick(project.summary)}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.projects.stack}>
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        {/* z-10 keeps these links clickable above the stretched card button.
            Links that aren't set on the project are hidden. */}
        {(project.links.github || project.links.demo || project.links.slide) && (
          <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
            {project.links.github && (
              <ExternalLink href={project.links.github} icon={<GithubIcon className="h-4 w-4" />}>
                {t.projects.github}
              </ExternalLink>
            )}
            {project.links.demo && (
              <ExternalLink
                href={project.links.demo}
                icon={
                  project.links.demo.includes('youtu') ? (
                    <YoutubeIcon className="h-4 w-4 text-red-400" />
                  ) : project.links.demo.includes('tiktok') ? (
                    <TiktokIcon className="h-4 w-4 text-accent" />
                  ) : project.links.demo.includes('canva') ? (
                    <SlideIcon className="h-4 w-4 text-accent" />
                  ) : (
                    <ExternalIcon className="h-4 w-4" />
                  )
                }
              >
                {project.links.demo.includes('youtu')
                  ? 'YouTube'
                  : project.links.demo.includes('tiktok')
                    ? 'TikTok Demo'
                    : project.links.demo.includes('canva')
                      ? t.projects.slide
                      : t.projects.demo}
              </ExternalLink>
            )}
            {project.links.slide && (
              <ExternalLink
                href={project.links.slide}
                icon={<SlideIcon className="h-4 w-4 text-accent" />}
              >
                {t.projects.slide}
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
