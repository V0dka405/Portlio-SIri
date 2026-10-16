import type { Config } from 'tailwindcss';

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
        sans: ['var(--font-inter)', 'var(--font-prompt)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-prompt)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
