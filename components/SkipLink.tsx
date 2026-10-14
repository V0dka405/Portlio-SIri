'use client';

import { useLanguage } from './LanguageProvider';

/** First focusable element: lets keyboard users jump past the navbar. */
export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-lg bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t.skipToContent}
    </a>
  );
}
