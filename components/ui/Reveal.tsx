'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Viewport-triggered reveal: fade + translate, GPU-accelerated.
 * `stagger` enables sequencing of direct children via <RevealItem>.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  stagger,
  className,
  amount = 0.25,
  as = 'div',
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  amount?: number;
  as?: 'div' | 'section' | 'span' | 'li' | 'header';
}) {
  const reduce = useReducedMotion();
  const { x, y } = offset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: stagger
        ? { staggerChildren: stagger, delayChildren: delay }
        : { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of a staggered <Reveal stagger={...}> container. */
export function RevealItem({
  children,
  direction = 'up',
  className,
  duration = 0.8,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const { x, y } = offset[direction];
  const variants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y },
    show: { opacity: 1, x: 0, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
