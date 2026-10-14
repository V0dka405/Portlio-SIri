import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import CodeBackground from '@/components/CodeBackground';
import { LanguageProvider } from '@/components/LanguageProvider';
import { profile } from '@/data/profile';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-noto-thai',
  display: 'swap',
});

const title = `${profile.name} — ${profile.title.en}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.seoDescription,
  keywords: [
    'Siriwut Saleephan',
    'Full-Stack Developer',
    'IoT Developer',
    'AIoT',
    'ESP32',
    'React',
    'Node.js',
    'Portfolio',
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title,
    description: profile.seoDescription,
    siteName: `${profile.name} Portfolio`,
    locale: 'en_US',
    alternateLocale: ['th_TH'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: profile.seoDescription,
  },
  // Favicon comes from app/icon.svg; OG image from app/opengraph-image.tsx (file conventions)
};

export const viewport: Viewport = {
  themeColor: '#2B2B2B',
  width: 'device-width',
  initialScale: 1,
};

// Runs before first paint so a saved "light" choice doesn't flash dark. Dark stays the default.
const themeInitScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoThai.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <CodeBackground />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
