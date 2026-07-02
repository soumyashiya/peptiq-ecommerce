'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** Cycles through words with a vertical mask wipe (e.g. People / Planet). */
export function RotatingWord({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className ?? ''}`}>
      {/* reserve width using the longest word */}
      <span className="invisible">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[i]}
          className="absolute inset-0 text-brand-sky"
          initial={reduce ? false : { y: '110%' }}
          animate={{ y: '0%' }}
          exit={reduce ? undefined : { y: '-110%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
