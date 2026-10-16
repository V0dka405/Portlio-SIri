import Reveal from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/** Shared section wrapper with comfortable mobile & desktop spacing. */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-10 sm:py-24 ${className}`}>
      <div className="container-page">
        <Reveal>
          <div className="mb-8 sm:mb-12">
            <p className="mb-1.5 sm:mb-2 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-accent">
              // {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="font-display text-2xl font-bold tracking-tight text-fg sm:text-4xl"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
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
