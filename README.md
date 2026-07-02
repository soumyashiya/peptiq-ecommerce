# MERIDIAN — Premium Enterprise Site

A pixel-disciplined recreation of the design DNA of [palladiogroup.com](https://palladiogroup.com):
oversized grotesk typography, a minimal blue-on-white palette, generous spacing, and a full
enterprise motion framework (GSAP + ScrollTrigger + Lenis + Framer Motion).

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — design tokens in [`tailwind.config.ts`](tailwind.config.ts)
- **Lenis** — smooth scrolling, synced to GSAP's ticker
- **GSAP / ScrollTrigger** — scrubbed timeline + pinned horizontal gallery
- **Framer Motion** — reveals, staggers, image masks, counters, parallax

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## ✏️ Swapping in your own content

**All copy, branding, links and image URLs live in one file:**
[`lib/content.ts`](lib/content.ts). Edit that file — nothing is hard-coded in components.

- **Brand name / tagline / contact** → `brand`
- **Navigation** → `nav`
- **Images** → replace the Unsplash URLs. Drop your own files in `/public` and use `"/your-image.jpg"`. (Add new remote hosts to `images.remotePatterns` in [`next.config.mjs`](next.config.mjs).)
- **Font** → the reference uses *Aktiv Grotesk* (commercial). We use the closest free match, *Hanken Grotesk*, via `next/font`. Swap it in [`app/layout.tsx`](app/layout.tsx).

## Structure

```
app/
  layout.tsx            # font + metadata + SmoothScroll provider
  page.tsx              # section composition
  globals.css           # base styles, container/frame helpers, component classes
components/
  providers/SmoothScroll.tsx   # Lenis ↔ GSAP sync
  layout/   Header.tsx, Footer.tsx
  ui/       Reveal, RevealMask, Parallax, Counter, RotatingWord, SectionTag
  sections/ Hero, Story[01], Stats, Sustainability[02], Products[03],
            Services[04], Innovation[05], Gallery, News[06], Contact[07]
lib/content.ts          # 👈 single source of truth for all content
```

## Notes

- Respects `prefers-reduced-motion` throughout (smoothing, parallax and reveals degrade gracefully).
- Numbered `[0X]` section tags, big-number animated counters, sticky timeline with a scrubbed
  progress line, and a pinned horizontal gallery mirror the reference's storytelling.
- Production build is fully static and type-checked.
