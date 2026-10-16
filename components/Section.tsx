import Reveal from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/** Shared section wrapper with comfortable spacing, modern typography, and clean anchor ids. */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page">
        <Reveal>
          <div className="mb-12">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              // {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-base text-muted max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
