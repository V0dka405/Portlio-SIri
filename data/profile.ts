import type { Localized } from '@/lib/types';

/**
 * Personal info. Edit this file to change name, contact links, CV and photo.
 * Everything marked TODO is a placeholder you should replace.
 */
export const profile = {
  name: 'Siriwut Saleephan',
  title: {
    en: 'Web, Mobile App & Backend Developer',
    th: 'นักพัฒนา Web, Mobile App & Backend',
  } satisfies Localized<string>,
  email: 'pool254753@gmail.com',
  phone: '062-328-4172',
  phoneRaw: '0623284172',
  lineId: '0624898309',
  github: 'https://github.com/V0dka405',
  linkedin: undefined as string | undefined,
  // TODO: put your CV at public/cv.pdf (or change this path)
  cvPath: '/cv.pdf',
  // Square photo in /public. null = placeholder
  photo: '/profile.jpg' as string | null,
  // TODO: set NEXT_PUBLIC_SITE_URL on Vercel (or edit the fallback) for correct OG / sitemap URLs
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portlio-s-iri.vercel.app',
  seoDescription:
    'Portfolio of Siriwut Saleephan — Computer Engineering student specializing in Full-Stack Web, Mobile Applications, Backend APIs, and IoT integration.',
};
