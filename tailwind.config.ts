import type { Config } from 'tailwindcss';

// Colors are CSS variables (see app/globals.css) so dark/light themes
// switch by toggling a single class on <html>. Dark is the default.
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: withAlpha('--c-bg'),
        surface: withAlpha('--c-surface'),
        elevated: withAlpha('--c-elevated'),
        fg: withAlpha('--c-fg'),
        muted: withAlpha('--c-muted'),
        line: withAlpha('--c-line'),
        accent: withAlpha('--c-accent'),
        'on-accent': withAlpha('--c-on-accent'),
      },
      fontFamily: {
        // Inter for Latin, Noto Sans Thai picked up automatically for Thai glyphs
        sans: ['var(--font-inter)', 'var(--font-noto-thai)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
