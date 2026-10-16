'use client';

import { useLanguage } from './LanguageProvider';
import { ArrowUpIcon } from './icons';
import { profile } from '@/data/profile';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line/60 bg-bg/50 py-10 sm:py-12 font-mono text-xs text-muted">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[11px] text-accent/70">
            [CPE · Full-Stack · Backend]
          </span>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
            <span>{t.footer.backToTop}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
