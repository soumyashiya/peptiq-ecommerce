'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { news } from '@/lib/content';
import { SectionTag } from '@/components/ui/SectionTag';
import { Reveal } from '@/components/ui/Reveal';

const DURATION = 6500; // ms per testimonial

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-1" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" className={i < n ? 'fill-brand-sky' : 'fill-line'}>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export function News() {
  const items = news.items;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (n: number) => setI((prev) => ((n % items.length) + items.length) % items.length),
    [items.length]
  );

  // Autoplay — advances unless paused (hover/focus) or reduced-motion.
  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, reduce, go]);

  const active = items[i];

  return (
    <section
      id="news"
      className="bg-paper py-section-sm md:py-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="frame">
        <SectionTag label={news.label} index={news.index} />

        {/* Heading + aggregate rating */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[16ch] text-h2 font-light text-balance">{news.title}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-5">
                <span className="text-[3rem] font-light leading-none tracking-tight text-brand">
                  {news.rating.score}
                </span>
                <div>
                  <Stars n={5} />
                  <p className="mt-2 text-[13px] text-muted">
                    out of {news.rating.outOf} · {news.rating.count}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Main: featured quote + author selector */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Featured card */}
          <Reveal direction="up" className="lg:col-span-7">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[6px] bg-mist p-8 md:p-12">
              {/* big quote mark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-8 select-none font-serif text-[12rem] leading-none text-brand/10"
              >
                &rdquo;
              </span>

              <div className="relative min-h-[200px] md:min-h-[240px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(1.35rem,2.1vw,1.95rem)] font-light leading-[1.45] tracking-tight text-ink"
                  >
                    <Stars n={active.rating} />
                    <p className="mt-6 text-balance">{active.quote}</p>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* author + controls */}
              <div className="relative mt-10 flex items-end justify-between gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4"
                  >
                    <span className="relative h-14 w-14 flex-none overflow-hidden rounded-full ring-2 ring-paper">
                      <Image src={active.avatar} alt={active.name} fill sizes="56px" className="object-cover" />
                    </span>
                    <div>
                      <p className="text-[16px] font-medium text-ink">{active.name}</p>
                      <p className="text-[13px] text-muted">
                        {active.role} · {active.org}
                      </p>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-brand-teal">
                        <svg width="13" height="13" viewBox="0 0 24 24" className="fill-brand-teal">
                          <path d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2l-1.5-1.5z" />
                        </svg>
                        {active.tag}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* prev / next */}
                <div className="flex flex-none items-center gap-2.5">
                  <button
                    onClick={() => go(i - 1)}
                    aria-label="Previous testimonial"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-paper"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => go(i + 1)}
                    aria-label="Next testimonial"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-paper"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* autoplay progress */}
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line/60">
                {!reduce && (
                  <div
                    key={`${i}-${paused}`}
                    className="h-full origin-left bg-brand-sky"
                    style={{
                      animation: `tprogress ${DURATION}ms linear forwards`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                )}
              </div>
            </div>
          </Reveal>

          {/* Author selector list */}
          <Reveal direction="up" delay={0.1} className="lg:col-span-5">
            <ul className="flex h-full flex-col gap-2.5">
              {items.map((t, idx) => {
                const isActive = idx === i;
                return (
                  <li key={t.name} className="flex-1">
                    <button
                      onClick={() => go(idx)}
                      onFocus={() => setI(idx)}
                      className={`group flex h-full w-full items-center gap-4 rounded-[6px] border px-5 py-4 text-left transition-all duration-500 ease-smooth ${
                        isActive
                          ? 'border-brand-sky bg-brand-sky/[0.06]'
                          : 'border-line bg-paper hover:border-ink/20'
                      }`}
                    >
                      <span
                        className={`relative h-12 w-12 flex-none overflow-hidden rounded-full grayscale transition-all duration-500 ${
                          isActive ? 'grayscale-0 ring-2 ring-brand-sky' : 'group-hover:grayscale-0'
                        }`}
                      >
                        <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-medium text-ink">{t.name}</span>
                        <span className="block truncate text-[13px] text-muted">
                          {t.role} · {t.org}
                        </span>
                      </span>
                      <span
                        className={`ml-auto flex-none text-[13px] tabular-nums transition-colors ${
                          isActive ? 'text-brand-sky' : 'text-ink/30'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
