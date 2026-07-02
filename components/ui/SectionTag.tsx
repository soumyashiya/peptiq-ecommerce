'use client';

import { Reveal } from './Reveal';

/** LABEL ─────────────────────────── [0X]  — the reference's numbered tag. */
export function SectionTag({ label, index }: { label: string; index?: string }) {
  return (
    <Reveal direction="none" duration={0.7}>
      <div className="section-tag">
        <span>{label}</span>
        {index && <span className="text-ink/40">[{index}]</span>}
      </div>
    </Reveal>
  );
}
