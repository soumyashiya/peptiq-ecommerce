
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { innovation as inv } from '@/lib/content';
import { SectionTag } from '@/components/ui/SectionTag';
import { Reveal } from '@/components/ui/Reveal';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function Innovation() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.tl-item');

      // Scrubbed progress line fills as the list scrolls past the sticky rail.
      if (fill.current && !reduce) {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.tl-list',
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          }
        );
      }

      // Each milestone reveals + activates as it crosses the centre line.
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25, y: reduce ? 0 : 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="innovation" ref={root} className="bg-paper py-section-sm md:py-section">
      <div className="frame">
        <SectionTag label={inv.label} index={inv.index} />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Sticky narrative panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <h2 className="max-w-[14ch] text-h2 font-light text-balance">{inv.title}</h2>
                <p className="mt-8 max-w-prose text-lead font-light text-muted">{inv.body}</p>
              </Reveal>
            </div>
          </div>

          {/* Timeline rail */}
          <div className="relative lg:col-span-7">
            {/* track */}
            <div className="absolute left-0 top-0 hidden h-full w-px bg-line sm:block">
              <div ref={fill} className="absolute left-0 top-0 h-full w-px origin-top bg-brand-sky" />
            </div>

            <ol className="tl-list space-y-16 sm:space-y-24 sm:pl-12">
              {inv.milestones.map((m) => (
                <li key={m.year} className="tl-item relative">
                  <span className="absolute -left-12 top-2 hidden h-3 w-3 -translate-x-[5px] rounded-full border-2 border-brand-sky bg-paper sm:block" />
                  <div className="text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-none tracking-tight text-brand-sky">
                    {m.year}
                  </div>
                  <h3 className="mt-4 text-h3 font-light tracking-tight">{m.title}</h3>
                  <p className="mt-3 max-w-prose text-body text-muted">{m.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
