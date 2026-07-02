'use client';

import Image from 'next/image';
import { story } from '@/lib/content';
import { SectionTag } from '@/components/ui/SectionTag';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { RevealMask } from '@/components/ui/RevealMask';
import { Parallax } from '@/components/ui/Parallax';

export function Story() {
  return (
    <section id="story" className="bg-paper py-section-sm md:py-section">
      <div className="frame">
        <SectionTag label={story.label} index={story.index} />

        <div className="mt-16 grid grid-cols-1 items-center gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          {/* Left: editorial text column */}
          <div className="lg:col-span-6 lg:pr-6">
            <Reveal>
              <p className="flex items-center gap-4 text-label font-medium uppercase tracking-[0.12em] text-brand-teal">
                <span className="h-px w-8 bg-brand-teal" />
                {story.overline}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-7 max-w-[15ch] text-h2 font-light text-balance">
                {story.title}
              </h2>
            </Reveal>

            <Reveal delay={0.16} stagger={0.12}>
              <div className="mt-8 max-w-prose space-y-5 text-body text-muted">
                {story.body.map((p) => (
                  <p key={p.slice(0, 16)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href={story.cta.href}
                className="group mt-9 inline-flex items-center gap-2 text-[15px] font-medium uppercase tracking-[0.08em] text-brand-teal"
              >
                {story.cta.label}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>
            </Reveal>

            {/* Signature stats strip */}
            <Reveal delay={0.1} stagger={0.12} className="mt-14 grid grid-cols-3 gap-px">
              {story.facts.map((f) => (
                <RevealItem key={f.label} className="border-t border-line pt-5">
                  <div className="text-[clamp(2rem,3vw,2.75rem)] font-light leading-none tracking-tight">
                    {f.value}
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-muted">{f.label}</p>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {/* Right: layered two-image composition */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* faint oversized index as art-direction accent */}
              <span className="pointer-events-none absolute -top-16 right-0 z-0 select-none text-[12rem] font-light leading-none tracking-tighter text-mist">
                {story.index}
              </span>

              <RevealMask className="media relative z-10 aspect-[4/5] w-full">
                <Parallax speed={-50} className="relative h-[115%] w-full">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </Parallax>
              </RevealMask>

              {/* secondary image overlapping bottom-left for depth */}
              <RevealMask
                delay={0.2}
                className="media absolute -bottom-10 -left-8 z-20 hidden aspect-square w-[42%] border-4 border-paper shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:block"
              >
                <Image
                  src={story.image2}
                  alt=""
                  fill
                  sizes="22vw"
                  className="object-cover"
                />
              </RevealMask>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
