import type { Config } from 'tailwindcss';

/**
 * Design tokens: lime / lavender / near-black on white, rounded geometric type.
 *
 * Token NAMES are historical (`brand.sky`, `brand.teal`) and no longer describe
 * their hues — they describe their ROLE, which is what every component relies
 * on. Renaming them would touch ~130 call sites for no behavioural gain.
 *
 *   brand        primary action — safe as a background with `text-paper` AND as
 *                text on `paper`, which is why it is purple and not lime.
 *   brand.sky    secondary accent text / icons.
 *   brand.teal   strongest accent text — eyebrows, links, labels.
 *   brand.wash   the PAGE background — a pale lavender wash set once on `body`.
 *   brand.soft   soft lavender SURFACE (never text) — deeper than `wash`, so it
 *                still reads as a panel against the page.
 *   brand.lime   high-visibility accent SURFACE only. Pair with `text-ink`;
 *                it fails contrast against white or `text-paper`.
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
        ink: '#0E0E10',
        paper: '#FFFFFF',
        mist: '#F7F4FD', // lavender-tinted off-white
        line: '#E7E0F4',
        brand: {
          DEFAULT: '#6B4FA8', // primary action — 6.1:1 on paper, white text passes
          sky: '#7E6BA8', // secondary accent text — 4.8:1 on paper
          teal: '#4B3A7A', // strongest accent text — 8.6:1 on paper
          wash: '#F1EBFC', // page background
          soft: '#D2BFFC', // lavender surface
          lime: '#EFF860', // accent surface ONLY — pair with text-ink
        },
        muted: '#6E6880',
      },
      fontFamily: {
        // Loaded via next/font in app/layout.tsx and exposed as a CSS var.
        sans: ['var(--font-sans)', 'ui-rounded', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Heavy rounded headline face. `font-display` (family) is unrelated to
        // `text-display` (size) — Tailwind namespaces them separately.
        display: ['var(--font-display)', 'ui-rounded', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Figures ONLY — prices, percentages, batch codes, assay tables. These
        // have to align in columns and be compared digit by digit, which
        // Quicksand's proportional numerals can't do. Never for prose or
        // labels: a mono caption above every heading is a template tell.
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      /*
       * Tailwind's stock `tracking-tight` is -0.025em. The reference sets only
       * -0.5px at 52px and -1px at 79px on its headlines (≈ -0.01em), so the
       * default was roughly twice as tight as the look being matched. Overriding
       * the token rather than editing ~50 `tracking-tight` call sites keeps the
       * value in one place — change it here, not per component.
       */
      letterSpacing: {
        tight: '-0.01em',
        tighter: '-0.02em',
      },
      /*
       * ── Type scale, measured from the reference ──────────────────────────
       * Every size below was read off hermujo.com's computed styles at three
       * viewports (390 / 929 / 1440) rather than invented, and the clamps
       * interpolate between the measured mobile and desktop endpoints:
       *
       *   role          390px    1440px   line-height   tracking   weight
       *   hero          36px     72px     1.05          ~0         400 (Indarung)
       *   section head  34px     52–56px  1.05          -0.5px     400
       *   sub-head      17px     18px     1.3           0          700 (Quicksand)
       *   lead copy     14px     18px     1.6           0          500
       *   body copy     14px     14px     1.6           0          400
       *   badge/eyebrow 11px     11px     1.28          1.5px      700 uppercase
       *   nav / footer  13px     13px     1.15          0          600
       *   button        13px     13px     1.7           0.5px      600 uppercase
       *   price         18px     18px     1.15          0          700
       *
       * The reference never sets a weight below 400 on body copy — hierarchy is
       * carried by weight (400 → 500 → 600 → 700) and by the display face, not
       * by thin text. Keep new copy inside that range.
       */
      fontSize: {
        'display': [
          'clamp(2.25rem, 1.4175rem + 3.4286vw, 4.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.01em' },
        ],
        'h1': [
          'clamp(2.125rem, 1.6132rem + 2.0952vw, 3.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.012em' },
        ],
        'h2': [
          'clamp(2.125rem, 1.7054rem + 1.7143vw, 3.25rem)',
          { lineHeight: '1.05', letterSpacing: '-0.01em' },
        ],
        /*
         * One step under `h2`, for a heading that is a sentence rather than a
         * title. A 20-word statement set at the full 52px reads as shouting and
         * eats half the panel; at this size it still leads the block without
         * becoming the loudest thing on the page.
         */
        'h2-sm': [
          'clamp(1.5rem, 1.2518rem + 1.0186vw, 2.125rem)',
          { lineHeight: '1.15', letterSpacing: '-0.01em' },
        ],
        'h3': [
          'clamp(1.0625rem, 1.0277rem + 0.1429vw, 1.125rem)',
          { lineHeight: '1.3', letterSpacing: '-0.01em' },
        ],
        'lead': [
          'clamp(0.875rem, 0.7321rem + 0.5714vw, 1.125rem)',
          { lineHeight: '1.6' },
        ],
        'body': [
          'clamp(0.875rem, 0.8518rem + 0.0952vw, 0.9375rem)',
          { lineHeight: '1.6' },
        ],
        // Eyebrows, badges and chips: tiny, heavy, tracked out, uppercase.
        'label': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.14em' }],
        // Navigation, footer links and inline meta.
        'nav': ['0.8125rem', { lineHeight: '1.15' }],
        // Button text — the extra line-height is the reference's, and it is what
        // keeps a pill from closing up around its own label.
        'btn': ['0.8125rem', { lineHeight: '1.7', letterSpacing: '0.04em' }],
        // Money. Set once so a price is the same object in a card, the cart,
        // the drawer and the order summary.
        'price': ['1.125rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        // Captions, legal lines, form hints.
        'micro': ['0.75rem', { lineHeight: '1.5' }],
        // Mono figures: inline data (batch codes, units) and the large numerals.
        'data': ['0.8125rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'figure': ['clamp(1.9rem, 3.2vw, 2.9rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        frame: '1600px',
        content: '1400px',
        prose: '720px',
      },
      borderRadius: {
        // Tightened from 22/16px. At 22px every panel read as a soft bubble and
        // the product card — the one surface that should feel like an object —
        // looked the same as a text box. Controls still use `rounded-full`.
        card: '14px',
        panel: '10px',
      },
      spacing: {
        /*
         * Section rhythm. Read these DOUBLED: they are applied as `py-*`, so
         * the gap a reader actually sees between two neighbouring sections is
         * twice the token.
         *
         *                    390px        1440px      gap between sections
         *   section          52px         88px        104px → 176px
         *   section-sm       36px         60px        72px  → 120px
         *
         * Fluid rather than fixed because the fixed values were set for
         * desktop and were punishing on a phone — 84px of empty lavender above
         * and below every section meant scrolling past more void than content.
         * Density belongs inside a section, air belongs between them, and how
         * much air depends on how wide the viewport is.
         */
        section: 'clamp(3.25rem, 2.4125rem + 3.43vw, 5.5rem)',
        'section-sm': 'clamp(2.25rem, 1.6929rem + 2.286vw, 3.75rem)',
        group: '3.5rem', // 56px content-group spacing
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // -50% is exactly one copy of the duplicated ticker list, so the loop
        // restarts on the same frame it ended — no visible seam.
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 38s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
