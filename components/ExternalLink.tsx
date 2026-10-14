'use client';

import { useLanguage } from './LanguageProvider';
import { ExternalIcon } from './icons';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Link that safely handles the "#" placeholder used in /data files:
 * placeholders render as muted, non-navigating items instead of jumping to the top.
 */
export default function ExternalLink({ href, children, icon, className = '' }: ExternalLinkProps) {
  const { t } = useLanguage();
  const base =
    'inline-flex items-center gap-1.5 text-sm font-medium transition-colors';

  if (href === '#') {
    return (
      <span
        className={`${base} cursor-not-allowed text-muted/70 ${className}`}
        title={t.projects.linkSoon}
        aria-disabled="true"
      >
        {icon}
        {children}
        <span className="sr-only"> ({t.projects.linkSoon})</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} text-fg hover:text-accent ${className}`}
    >
      {icon}
      {children}
      {!icon && <ExternalIcon className="h-3.5 w-3.5" />}
    </a>
  );
}
