'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : ['/placeholder.png'];
  const current = list[Math.min(active, list.length - 1)];

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      {/* Main image */}
      <div className="relative aspect-[3/2] w-full">
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {/* Thumbnails */}
      {list.length > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {list.map((src, i) => {
            const isActive = i === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative h-32 w-32 flex-none overflow-hidden rounded-[6px] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:h-36 sm:w-36 ${
                  isActive ? 'ring-1 ring-brand-sky' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={src} alt="" fill sizes="144px" className="object-contain" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
