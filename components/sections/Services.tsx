'use client';

import Image from 'next/image';
import { services } from '@/lib/content';
import { SectionTag } from '@/components/ui/SectionTag';
import { Reveal } from '@/components/ui/Reveal';
import { RevealMask } from '@/components/ui/RevealMask';
import { Parallax } from '@/components/ui/Parallax';

export function Services() {
  return (
    <section id="services" className="bg-ink text-paper py-section-sm md:py-section">
      <div className="frame">
        <div className="[&_.section-tag]:border-paper/15 [&_.section-tag]:text-brand-sky [&_.section-tag_.text-ink\\/40]:text-paper/40">
          <SectionTag label={services.label} index={services.index} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[14ch] text-h2 font-light text-balance">{services.title}</h2>
            </Reveal>
          </div>
          <div className="flex items-end lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="max-w-prose text-lead font-light text-paper/70">{services.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Alternating rows */}
        <div className="mt-20 space-y-20 lg:mt-28 lg:space-y-32">
          {services.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={item.title}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <RevealMask className={`media aspect-[16/10] w-full ${flip ? 'lg:order-2' : ''}`}>
                  <Parallax speed={-40} className="relative h-[115%] w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Parallax>
                </RevealMask>

                <div className={flip ? 'lg:order-1' : ''}>
                  <Reveal direction={flip ? 'right' : 'left'}>
                    <span className="text-[13px] font-medium tracking-[0.1em] text-brand-sky">
                      0{i + 1}
                    </span>
                    <h3 className="mt-5 text-h2 font-light tracking-tight">{item.title}</h3>
                    <p className="mt-6 max-w-prose text-body text-paper/60">{item.desc}</p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
