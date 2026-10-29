'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * PDP gallery.
 *
 * The image used to sit bare on the page in a 3:2 box with `object-contain`,
 * which meant a portrait-ish product shot filled about half its column and the
 * rest of that column was empty lavender — on a 1440px screen the top of the
 * page was ~30% product and ~70% nothing. Giving it a white panel does two
 * things: it fixes the shape so the column is always filled, and it puts the
 * product on the same `paper` surface it sits on everywhere else on the site.
 *
 * Thumbnails are panels too, so an inactive thumbnail is a dimmed object
 * rather than a floating cut-out, and the active one is marked by a ring on
 * the panel rather than by opacity alone.
 */
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : ['/placeholder.png'];
  const current = list[Math.min(active, list.length - 1)];

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-card border border-line bg-paper">
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      {list.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {list.map((src, i) => {
            const isActive = i === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative h-20 w-20 flex-none overflow-hidden rounded-panel border bg-paper transition-colors duration-300 sm:h-24 sm:w-24 ${
                  isActive
                    ? 'border-ink'
                    : 'border-line opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
