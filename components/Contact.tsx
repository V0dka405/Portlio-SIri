'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import Section from './Section';
import Reveal from './Reveal';
import ExternalLink from './ExternalLink';
import { CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, LineIcon } from './icons';
import { profile } from '@/data/profile';

type CopyKey = 'email' | 'phone' | 'line' | null;

export default function Contact() {
  const { t, locale } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<CopyKey>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyText = async (text: string, key: CopyKey) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
    } catch {
      // fallback
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedKey(null), 2500);
  };

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;
  const lineUrl = `https://line.me/ti/p/~${profile.lineId}`;

  return (
    <Section
      id="contact"
      eyebrow={t.contact.eyebrow}
      title={t.contact.title}
      subtitle={
        locale === 'th'
          ? 'พร้อมสำหรับการพูดคุย เสนองานฝึกงาน หรือตำแหน่งงานประจำ ติดต่อได้โดยตรงผ่านช่องทางด้านล่างครับ'
          : 'I am actively looking for internship and junior roles. Feel free to reach out via email, phone, or Line.'
      }
    >
      <Reveal className="max-w-4xl">
        {/* Contact Methods Cards */}
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Email Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface/90 p-6 transition-all duration-300 hover:border-accent/60 hover:bg-surface">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent border-b border-line/40 pb-2.5">
                <MailIcon className="h-4 w-4" />
                <span>// {t.contact.emailLabel}</span>
              </div>
              <p className="mt-3 break-all font-mono text-sm font-semibold text-fg">
                {profile.email}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center px-3 py-2 text-xs font-mono"
              >
                <MailIcon className="h-3.5 w-3.5" />
                <span>{t.contact.sendEmail}</span>
              </a>
              <button
                type="button"
                onClick={() => copyText(profile.email, 'email')}
                title={copiedKey === 'email' ? t.contact.copied : t.contact.copyEmail}
                aria-label={t.contact.copyEmail}
                className={`btn-ghost flex h-9 w-9 shrink-0 items-center justify-center rounded-lg p-0 transition-colors ${
                  copiedKey === 'email' ? 'border-accent bg-accent/10 text-accent' : ''
                }`}
              >
                {copiedKey === 'email' ? (
                  <CheckIcon className="h-4 w-4 text-accent" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface/90 p-6 transition-all duration-300 hover:border-accent/60 hover:bg-surface">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent border-b border-line/40 pb-2.5">
                <PhoneIcon className="h-4 w-4" />
                <span>// {t.contact.phoneLabel}</span>
              </div>
              <p className="mt-3 font-mono text-base font-semibold text-fg">
                {profile.phone}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={`tel:${profile.phoneRaw}`}
                className="btn-primary flex-1 justify-center px-3 py-2 text-xs font-mono"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                <span>{t.contact.callPhone}</span>
              </a>
              <button
                type="button"
                onClick={() => copyText(profile.phoneRaw, 'phone')}
                title={copiedKey === 'phone' ? t.contact.copied : t.contact.copyPhone}
                aria-label={t.contact.copyPhone}
                className={`btn-ghost flex h-9 w-9 shrink-0 items-center justify-center rounded-lg p-0 transition-colors ${
                  copiedKey === 'phone' ? 'border-accent bg-accent/10 text-accent' : ''
                }`}
              >
                {copiedKey === 'phone' ? (
                  <CheckIcon className="h-4 w-4 text-accent" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Line ID Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface/90 p-6 transition-all duration-300 hover:border-accent/60 hover:bg-surface">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent border-b border-line/40 pb-2.5">
                <LineIcon className="h-4 w-4 text-[#06C755]" />
                <span>// {t.contact.lineLabel}</span>
              </div>
              <p className="mt-3 font-mono text-base font-semibold text-fg">
                {profile.lineId}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center px-3 py-2 text-xs font-mono"
              >
                <LineIcon className="h-3.5 w-3.5" />
                <span>{t.contact.lineChat}</span>
              </a>
              <button
                type="button"
                onClick={() => copyText(profile.lineId, 'line')}
                title={copiedKey === 'line' ? t.contact.copied : t.contact.copyLine}
                aria-label={t.contact.copyLine}
                className={`btn-ghost flex h-9 w-9 shrink-0 items-center justify-center rounded-lg p-0 transition-colors ${
                  copiedKey === 'line' ? 'border-accent bg-accent/10 text-accent' : ''
                }`}
              >
                {copiedKey === 'line' ? (
                  <CheckIcon className="h-4 w-4 text-accent" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Social / External Links */}
        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line/60 pt-6 font-mono text-xs">
          <span className="text-muted">// Links:</span>
          {profile.github && (
            <ExternalLink href={profile.github} icon={<GithubIcon className="h-4 w-4" />}>
              {t.contact.github} ↗
            </ExternalLink>
          )}
          {profile.linkedin && (
            <ExternalLink href={profile.linkedin} icon={<LinkedinIcon className="h-4 w-4" />}>
              {t.contact.linkedin} ↗
            </ExternalLink>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
