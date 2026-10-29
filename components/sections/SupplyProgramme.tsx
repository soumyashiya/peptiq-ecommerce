import Image from 'next/image';
import Link from 'next/link';
import { supply, SUPPLY_DISCOUNT, compliance } from '@/lib/content';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

/**
 * Recurring-supply banner: one full-width still-life photo with the pitch set
 * bottom-left over it, a hairline, and the programme perks as a single row of
 * icon + label underneath.
 *
 * The photo (`supply.image`) is composed with the product on the right and
 * empty backdrop on the left, so the copy sits on clean background. A soft
 * left-to-right wash keeps the text legible at narrow widths, where the
 * product moves under the copy.
 *
 * Perks are short labels only — the longer `benefits[].body` copy is kept in
 * `lib/content.ts` for the product pages and is not rendered here.
 */
const PERK_ICONS = [
  // tag — discount
  <path key="a" d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9-9-9ZM8 8h.01" />,
  // snowflake — cold chain
  <path key="b" d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />,
  // star — priority allocation
  <path key="c" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
  // document — reports on dispatch
  <path key="d" d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h4" />,
];

/**
 * "Deep Plum + Cream" palette for this banner only: plum card, cream type and
 * button, a soft orchid for the perk icons. The lilac photo sits on the right
 * and fades into the plum on its left edge.
 */
const PLUM = '#3B1F3F';
const CREAM = '#F5EEE4';

export function SupplyProgramme() {
  const discountPct = Math.round(SUPPLY_DISCOUNT * 100);

  return (
    <section id="supply" className="scroll-mt-28 py-section-sm">
      <div className="frame">
        <div className="relative overflow-hidden rounded-[2rem]"
          style={{ backgroundColor: PLUM, color: CREAM }}>
          {/* Photo */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
            <Image
              src={supply.image}
              alt=""
              fill
              sizes="(min-width: 1600px) 1600px, 100vw"
              className="object-cover object-[85%_center]"
              // Fade the photo's left edge into the plum so there is no seam.
              style={{
                maskImage: 'linear-gradient(90deg, transparent 0%, #000 38%)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 38%)',
              }}
            />
            {/* Below `lg` the copy sits over the photo, so wash it from below. */}
            <span
              aria-hidden
              className="absolute inset-0 max-lg:bg-[linear-gradient(180deg,rgba(59,31,63,0)_0%,rgba(59,31,63,0.85)_55%,rgba(59,31,63,0.97)_100%)]"
            />
            {/* Bottom band so the perk row stays legible where it crosses the product. */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(59,31,63,0.95)_0%,rgba(59,31,63,0.75)_45%,rgba(59,31,63,0)_100%)]"
            />
          </div>

          <div className="relative flex min-h-[560px] flex-col justify-end px-6 pb-8 pt-64 sm:px-10 md:min-h-[620px] lg:px-16 lg:pb-10">
            <Reveal>
              <h2 className="max-w-[18ch] text-balance t-h1">
                {supply.bannerTitle}
              </h2>
              <p className="mt-4 max-w-[44ch] text-[1rem] leading-relaxed opacity-80">{supply.tagline}</p>
              <Link
                href={supply.secondaryCta.href}
                className="btn-primary mt-7"
              >
                Subscribe &amp; save {discountPct}%
              </Link>
            </Reveal>

            <Reveal stagger={0.07} className="mt-10 border-t border-[#F5EEE4]/20 pt-7">
              <ul className="flex flex-wrap gap-x-10 gap-y-4">
                {supply.benefits.map((b, i) => (
                  <li key={b.title}>
                    <RevealItem className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.08em]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#D8B4E2]" aria-hidden>
                        {PERK_ICONS[i]}
                      </svg>
                      {b.title}
                    </RevealItem>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <p className="mt-6 text-[0.75rem] font-normal leading-relaxed text-ink/60">
          {compliance.productDisclaimer}
        </p>
      </div>
    </section>
  );
}
