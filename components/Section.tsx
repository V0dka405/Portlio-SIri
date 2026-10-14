import Reveal from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

/** Shared section wrapper: consistent spacing, heading and anchor id. */
export default function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
