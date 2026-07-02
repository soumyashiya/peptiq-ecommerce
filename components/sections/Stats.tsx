'use client';

import { stats } from '@/lib/content';
import { Counter } from '@/components/ui/Counter';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

export function Stats() {
  return (
    <section className="bg-gradient-to-br from-brand-sky to-brand text-paper">
      <div className="frame py-20 md:py-28">
        <Reveal direction="none">
          <p className="mb-12 text-label font-medium uppercase tracking-[0.12em] text-paper/60">
            {stats.label}
          </p>
        </Reveal>

        <Reveal stagger={0.12} className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((s) => (
            <RevealItem
              key={s.caption}
              className="border-l border-paper/20 pl-6 first:border-l-0 first:pl-0 sm:[&:nth-child(3)]:border-l-0 sm:[&:nth-child(3)]:pl-0 lg:[&:nth-child(3)]:border-l lg:[&:nth-child(3)]:pl-6"
            >
              <div className="text-[clamp(2.75rem,5vw,4.25rem)] font-light leading-none tracking-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-[15px] font-light text-paper/75">{s.caption}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
