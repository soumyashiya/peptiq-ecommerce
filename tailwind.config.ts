import type { Config } from 'tailwindcss';

/**
 * Design tokens reverse-engineered from the reference enterprise site.
 * Minimal blue-on-white palette, oversized grotesk type, generous spacing.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0B0D',
        paper: '#FFFFFF',
        mist: '#F5F8FA',
        line: '#E3E9EE',
        brand: {
          DEFAULT: '#1863DC', // deep blue
          sky: '#229ADA', // bright blue
          teal: '#00587A', // link teal
          soft: '#C1E0F8', // soft blue
        },
        muted: '#5B6670',
      },
      fontFamily: {
        // Loaded via next/font in app/layout.tsx and exposed as a CSS var.
        grotesk: ['var(--font-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale — clamp() keeps it fluid across breakpoints.
        'display': ['clamp(3.5rem, 11vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'h1': ['clamp(2.75rem, 6.5vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'h2': ['clamp(2rem, 4.5vw, 3.9rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h3': ['clamp(1.5rem, 2.6vw, 2.3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'lead': ['clamp(1.25rem, 1.9vw, 1.85rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body': ['clamp(1rem, 1.1vw, 1.125rem)', { lineHeight: '1.65' }],
        'label': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.12em' }],
      },
      maxWidth: {
        frame: '1600px',
        content: '1400px',
        prose: '720px',
      },
      spacing: {
        section: '11.25rem', // 180px — section rhythm
        'section-sm': '8.75rem', // 140px
        group: '5rem', // 80px content-group spacing
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'scroll-cue': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        'scroll-cue': 'scroll-cue 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
