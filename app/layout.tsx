import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono, Prompt, Inter } from 'next/font/google';
import SkipLink from '@/components/SkipLink';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeBackground from '@/components/CodeBackground';
import { LanguageProvider } from '@/components/LanguageProvider';
import { PageRouterProvider, PageViewport } from '@/components/PageRouter';
import { profile } from '@/data/profile';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const prompt = Prompt({
  weight: ['400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-prompt',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const title = `${profile.name} — ${profile.title.en}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
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
};

export const viewport: Viewport = {
  themeColor: '#2B2B2B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${prompt.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body id="top" className="flex min-h-screen flex-col">
        <CodeBackground />
        <LanguageProvider>
          <PageRouterProvider>
            <SkipLink />
            <Navbar />
            <main id="main" className="flex-1">
              <PageViewport />
              {children}
            </main>
            <Footer />
          </PageRouterProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
