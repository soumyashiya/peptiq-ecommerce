import { ticker } from '@/lib/content';

/**
 * Assurance strip that sits above the header bar. Rendered *inside* the fixed
 * header rather than as its own fixed element, so the two scroll as one block
 * and the page's top padding only has to clear a single offset.
 *
 * The item list is duplicated once so the -50% keyframe lands exactly where the
 * first copy began, giving a seamless loop; the duplicate is aria-hidden so
 * screen readers hear each claim once. CSS-only, and `motion-reduce` stops it.
 */
export function TrustTicker() {
  return (
    <div className="h-8 overflow-hidden bg-brand-lime text-ink">
      <div className="flex h-full w-max animate-ticker items-center motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex h-full shrink-0 items-center"
          >
            {ticker.items.map((item) => (
              <li
                key={item}
                className="flex items-center whitespace-nowrap px-6 text-label font-bold uppercase"
              >
                <span className="mr-6 h-1 w-1 rounded-full bg-ink/40" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
