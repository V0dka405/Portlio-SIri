'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import Section from './Section';
import Reveal from './Reveal';
import ExternalLink from './ExternalLink';
import { CertificateIcon, CloseIcon, DownloadIcon, ExternalIcon } from './icons';
import { certificates, type Certificate } from '@/data/certificates';

export default function Certificates() {
  const { t, pick } = useLanguage();
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeCert && !dialog.open) dialog.showModal();
    if (!activeCert && dialog.open) dialog.close();
  }, [activeCert]);

  useEffect(() => {
    if (!activeCert) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeCert]);

  return (
    <Section id="certificates" eyebrow={t.certificates.eyebrow} title={t.certificates.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.08} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/70 focus-within:border-accent/70">
              {/* Thumbnail with interactive preview click */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveCert(cert)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveCert(cert)}
                className="relative aspect-[16/11] w-full cursor-pointer overflow-hidden border-b border-line bg-elevated/40"
                aria-label={`${pick(cert.title)} - ${t.certificates.preview}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={pick(cert.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                  <span className="btn-ghost border-accent/80 bg-bg/80 text-xs text-accent">
                    {t.certificates.preview}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                    <CertificateIcon className="h-3.5 w-3.5" />
                    {pick(cert.issuer)}
                  </span>
                  {cert.duration && (
                    <span className="text-xs text-muted">
                      · {pick(cert.duration)}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-bold leading-snug">
                  {pick(cert.title)}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  {t.certificates.issuedOn}: {cert.issueDate}
                </p>

                <p className="mt-3 flex-1 text-sm text-muted">
                  {pick(cert.summary)}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
                  {cert.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-4">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-1.5 text-xs !px-4 !py-2"
                  >
                    <ExternalIcon className="h-3.5 w-3.5" />
                    <span>{t.certificates.verify}</span>
                  </a>

                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-xs !px-4 !py-2"
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                      {t.certificates.viewPdf}
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Full Certificate Lightbox Modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby="cert-modal-title"
        onClose={() => setActiveCert(null)}
        onClick={(e) => e.target === e.currentTarget && setActiveCert(null)}
        className="m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {activeCert && (
          <div>
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <CertificateIcon className="h-5 w-5 text-accent" />
                <h3 id="cert-modal-title" className="text-base font-bold sm:text-lg">
                  {pick(activeCert.title)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="overflow-hidden rounded-xl border border-line bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeCert.image}
                  alt={pick(activeCert.title)}
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-muted">
                  <span className="font-semibold text-fg">{pick(activeCert.issuer)}</span> · {t.certificates.issuedOn}: {activeCert.issueDate}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-1.5 text-xs !px-4 !py-2"
                  >
                    <ExternalIcon className="h-3.5 w-3.5" />
                    <span>{t.certificates.verify}</span>
                  </a>
                  {activeCert.pdfUrl && (
                    <a
                      href={activeCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-xs !px-4 !py-2"
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                      {t.certificates.viewPdf}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </Section>
  );
}
