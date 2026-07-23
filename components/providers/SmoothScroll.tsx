'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Premium smooth scrolling with Lenis, driven by GSAP's ticker so that
 * Lenis and ScrollTrigger stay perfectly synchronised (no jitter / drift).
 * Honours prefers-reduced-motion by skipping smoothing entirely.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Resolve an <a href> into a target element on the current page.
    // Supports "#id" and "/path#id" (same-path) links. Returns null otherwise.
    const resolveTarget = (href: string): HTMLElement | null => {
      if (!href) return null;
      let hashPart = '';
      if (href.startsWith('#')) {
        hashPart = href.slice(1);
      } else if (href.startsWith('/')) {
        const hashIndex = href.indexOf('#');
        if (hashIndex === -1) return null;
        const path = href.slice(0, hashIndex) || '/';
        // Only intercept if the link points to the current pathname.
        if (path !== window.location.pathname) return null;
        hashPart = href.slice(hashIndex + 1);
      } else {
        return null;
      }
      if (!hashPart) return null;
      return document.getElementById(hashPart);
    };

    // Allow anchor links to be scrolled smoothly by Lenis.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href]');
      if (!target) return;
      const href = target.getAttribute('href') ?? '';
      const el = resolveTarget(href);
      if (!el) return;
      e.preventDefault();
      // Refresh ScrollTrigger so pin-extended sections (e.g. Sustainability)
      // report accurate positions before we scroll to the target.
      ScrollTrigger.refresh();
      lenis.scrollTo(el, { offset: -80 });
      // Keep the URL in sync so refreshes land in the same place.
      if (window.location.hash !== `#${el.id}`) {
        history.replaceState(null, '', `#${el.id}`);
      }
    };
    document.addEventListener('click', onClick);

    // Handle initial page load with a hash. Wait for pinned sections to
    // register their real heights, then scroll to the anchor without the
    // browser's earlier (pre-pin) jump landing us in the wrong section.
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      const scrollToInitial = () => {
        ScrollTrigger.refresh();
        const el = document.getElementById(initialHash);
        if (el) {
          lenis.scrollTo(el, { offset: -80, immediate: true, force: true });
        }
      };
      // Two rAFs: first lets the DOM/layout settle, second lets ScrollTrigger
      // apply its pin spacers so the anchor's true offset is known.
      requestAnimationFrame(() => requestAnimationFrame(scrollToInitial));
    }

    return () => {
      gsap.ticker.remove(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
