'use client';

import { useEffect, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from 'framer-motion';

/**
 * Count-up on scroll into view. Preserves decimals (e.g. 1.3) and only
 * runs once. Falls back to the final value instantly for reduced-motion.
 */
export function Counter({
  value,
  suffix = '',
  decimals,
  duration = 2,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = value.toFixed(dp);
      return;
    }
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = latest.toFixed(dp);
      },
    });
    return controls.stop;
  }, [inView, value, dp, duration, mv, reduce]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
