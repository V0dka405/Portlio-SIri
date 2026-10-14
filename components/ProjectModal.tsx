'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import MediaFrame from './MediaFrame';
import ExternalLink from './ExternalLink';
import { CloseIcon, ExternalIcon, GithubIcon, YoutubeIcon, TiktokIcon, SlideIcon } from './icons';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Uses the native <dialog> element: the browser provides the focus trap, Esc to close,
 * inert background and focus restoration to the trigger button.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, pick } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  // Lock page scroll while the modal is open
  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-modal-title"
      onClose={onClose}
      // Clicking the backdrop targets the <dialog> itself, not its content
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div>
          <MediaFrame media={project.media} variant="modal" />

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 id="project-modal-title" className="text-2xl font-bold">
                {pick(project.title)}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.projects.close}
                className="-mr-2 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
              >
                <CloseIcon />
              </button>
            </div>

            <p className="mt-3 text-muted">{pick(project.description)}</p>

            <h4 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
              {t.projects.highlights}
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted marker:text-accent">
              {pick(project.highlights).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h4 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
              {t.projects.stack}
            </h4>
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>

            {(project.links.github || project.links.demo || project.links.slide) && (
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
                {project.links.github && (
                  <ExternalLink
                    href={project.links.github}
                    icon={<GithubIcon className="h-4 w-4" />}
                  >
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
        </div>
      )}
    </dialog>
  );
}
