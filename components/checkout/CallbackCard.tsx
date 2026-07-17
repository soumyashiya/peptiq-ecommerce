'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export type CallbackStatus = 'loading' | 'success' | 'failed' | 'pending' | 'error';

const TONE: Record<CallbackStatus, string> = {
  loading: 'bg-brand-sky text-paper',
  pending: 'bg-brand-sky text-paper',
  success: 'bg-brand-teal text-paper',
  failed: 'bg-brand text-paper',
  error: 'bg-brand text-paper',
};

const SVG_PROPS = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function StatusIcon({ status }: { status: CallbackStatus }) {
  if (status === 'loading') {
    return <span className="h-6 w-6 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />;
  }
  if (status === 'success') {
    return (
      <svg {...SVG_PROPS} strokeWidth="2.5" aria-hidden="true" focusable="false">
        <path d="m5 12 5 5 9-10" />
      </svg>
    );
  }
  if (status === 'pending') {
    return (
      <svg {...SVG_PROPS} strokeWidth="2" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  return (
    <svg {...SVG_PROPS} strokeWidth="2.5" aria-hidden="true" focusable="false">
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="bg-mist pt-28 md:pt-32">
      <div className="frame grid min-h-[70vh] place-items-center pb-section-sm md:pb-section">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[440px] rounded-[18px] bg-paper p-8 text-center shadow-[0_30px_80px_-30px_rgba(10,11,13,0.15)]"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}

/**
 * Payment-provider callback result card. `status` drives the icon and its tone;
 * `children` renders provider-specific extras (order reference, actions).
 *
 * Result text is announced via aria-live because it resolves after paint —
 * a screen reader would otherwise never hear the payment outcome.
 */
export function CallbackCard({
  status,
  title,
  body,
  children,
}: {
  status: CallbackStatus;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <Shell>
      <span
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${TONE[status]}`}
      >
        <StatusIcon status={status} />
      </span>
      <div aria-live="polite" aria-busy={status === 'loading'}>
        <h1 className="mt-6 text-h2 font-light tracking-tight">{title}</h1>
        <p className="mt-3 mx-auto max-w-[36ch] text-body text-muted">{body}</p>
      </div>
      {children}
    </Shell>
  );
}

/** Suspense fallback — mirrors the loading card so there is no layout shift on hydrate. */
export function CallbackFallback() {
  return <CallbackCard status="loading" title="Verifying payment…" body="Just a moment." />;
}
