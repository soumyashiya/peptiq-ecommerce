/**
 * Formatters shared by server and client components.
 *
 * Deliberately NOT in a `'use client'` module: a plain function exported from a
 * client module becomes a client reference when a server component imports it,
 * which fails at render time rather than at type-check time.
 */

/**
 * Canonical price formatter — USD, with cents shown only when the amount has
 * them (so `$90` stays `$90` but a 15% saving renders as `$13.50`).
 */
export const formatPrice = (n: number) =>
  `$${n.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
