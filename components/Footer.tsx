'use client';

import { useLanguage } from './LanguageProvider';
import { ArrowUpIcon } from './icons';
import { profile } from '@/data/profile';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-8">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
          <ArrowUpIcon className="h-4 w-4" />
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
