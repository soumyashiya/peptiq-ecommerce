import Image from 'next/image';
import { story } from '@/lib/content';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

/**
 * About — a full-bleed editorial banner. The photo (`story.bannerImage`, its
 * subject in the upper half) fills the top of the band and dissolves into the
 * page lavender toward the bottom; the copy is centred over that fade:
 * eyebrow, the two-line heading (second line in purple), the founding
 * paragraph, then a frosted row of the three figures and the CTA.
 *
 * The figures are `story.facts` — keep them to numbers the business can back.
 */
export function Story() {
  return (
    <section id="story" className="relative scroll-mt-28 overflow-hidden">
      {/* Photo, faded into the page colour at its top edge and from the middle down. */}
      <div className="absolute inset-x-0 top-0 h-[70%] min-h-[420px] md:h-[78%]">
        <Image
          src={story.bannerImage}
          alt={story.bannerAlt}
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <span
          aria-hidden
          // Page colour at both ends: fades in from the section above, out into the copy below.
          className="absolute inset-0 bg-[linear-gradient(180deg,#F1EBFC_0%,rgba(241,235,252,0.55)_10%,rgba(241,235,252,0)_24%,rgba(241,235,252,0.15)_40%,rgba(241,235,252,0.85)_72%,#F1EBFC_100%)]"
        />
      </div>

      <div className="frame relative pb-section-sm pt-[clamp(15rem,32vw,26rem)] text-center md:pb-section">
        <Reveal>
          <span className="pill-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            {story.eyebrow}
          </span>
          <h2 className="t-h1 mx-auto mt-6 max-w-[18ch] uppercase leading-[0.98] tracking-tight text-ink">
            {story.headlineA}
            <br />
            <span className="text-brand">{story.headlineB}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[40rem] text-body text-ink/70">{story.founding}</p>
        </Reveal>

        <Reveal
          stagger={0.08}
          className="mx-auto mt-10 grid max-w-[46rem] grid-cols-3 divide-x divide-line rounded-[1.25rem] border border-paper/70 bg-paper/55 py-6 backdrop-blur-md"
        >
          {story.facts.map((f) => (
            <RevealItem key={f.label} className="px-3">
              <p className="figures text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-none text-ink">{f.value}</p>
              <p className="mt-2.5 text-[0.6875rem] font-semibold uppercase leading-snug tracking-[0.12em] text-muted">
                {f.label}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-9">
          <a href={story.cta.href} className="btn-primary group">
            {story.cta.label}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
