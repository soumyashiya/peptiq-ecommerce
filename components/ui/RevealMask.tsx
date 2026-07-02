'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/**
 * Image reveal mask: a clip-path wipe uncovers the media as it enters the
 * viewport, while the inner layer scales 1.15 → 1 for depth.
 *
 * Driven by GSAP ScrollTrigger (reliable in this Lenis-driven environment,
 * where Framer's viewport detection did not fire on these wrappers).
 */
export function RevealMask({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' });
      if (inner) gsap.set(inner, { scale: 1.15 });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.out', delay });
          if (inner) gsap.to(inner, { scale: 1, duration: 1.3, ease: 'power3.out', delay });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div style={{ height: '100%', width: '100%' }}>{children}</div>
    </div>
  );
}
