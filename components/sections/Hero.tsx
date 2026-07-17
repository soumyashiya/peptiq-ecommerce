'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { hero } from '@/lib/content';

// The headline is the text LCP candidate and is masked out until it slides in,
// so the entrance is kept short — the stagger still reads, but LCP lands ~1.2s earlier.
const lineVariants = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.08 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Layered parallax: image drifts up, text fades, whole hero lifts.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Blue gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-soft via-brand-sky to-brand" />

      {/* Floating product render with parallax + entrance */}
      <motion.div
        style={{ y: reduce ? 0 : imageY, scale: reduce ? 1 : imageScale }}
        className="absolute inset-0"
      >
        {/*
          Scale-only entrance: a transparent element is not a paint, so fading the
          LCP image in would defer LCP past the whole 1.6s ease and waste `priority`.
        */}
        <motion.div
          initial={{ scale: reduce ? 1 : 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Readability scrim at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand/70 to-transparent" />

      {/* Kicker, top-left under header */}
      <motion.div
        style={{ opacity: fade }}
        className="frame absolute inset-x-0 top-28 md:top-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="max-w-xl text-[13px] font-medium uppercase leading-relaxed tracking-[0.12em] text-paper/90"
        >
          {hero.kicker}
        </motion.p>
      </motion.div>

      {/* Oversized headline, bottom-left */}
      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: fade }}
        className="frame absolute inset-x-0 bottom-28 md:bottom-32"
      >
        <h1 className="text-display font-light text-paper">
          {[hero.line1, hero.line2].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial={reduce ? 'show' : 'hidden'}
                animate="show"
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Bottom bar: tagline · scroll cue · section markers */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-0 border-t border-paper/25"
      >
        <div className="frame flex items-center justify-between py-4 text-[12px] font-medium uppercase tracking-[0.1em] text-paper/80">
          <div className="hidden items-center gap-3 md:flex">
            <span>{hero.footerLeft}</span>
            <span className="h-px w-10 bg-paper/40" />
            <span className="text-paper/60">{hero.footerRight}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="animate-scroll-cue">↓</span>
            <span>{hero.scrollCue}</span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {['01', '02', '03', '04', '05', '06', '07'].map((n) => (
              <span key={n} className="text-paper/50 transition-colors hover:text-paper">
                [{n}]
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
