'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch, ApiError } from '@/lib/api';

type VerifyResponse = {
  ok: boolean;
  session?: { uuid: string; status: 'success' | 'failed' | 'pending'; orderId: number };
  payment?: { status: string; finalStatus?: string; amount?: string; currency?: string } | null;
};

type UiStatus = 'loading' | 'success' | 'failed' | 'pending' | 'error';

export default function KlymeCallbackPage() {
  const params = useSearchParams();
  const [status, setStatus] = useState<UiStatus>('loading');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const uuid = params.get('uuid') || params.get('paymentUuid') || params.get('payment_uuid');
    if (!uuid) {
      setStatus('error');
      setMessage('Missing payment reference.');
      return;
    }
    apiFetch<VerifyResponse>(`/api/klyme/verify-payment/${encodeURIComponent(uuid)}`, {
      method: 'GET',
      auth: false,
    })
      .then((res) => {
        if (res?.session?.orderId) setOrderId(res.session.orderId);
        const s = res?.session?.status;
        if (s === 'success') setStatus('success');
        else if (s === 'pending') setStatus('pending');
        else setStatus('failed');
      })
      .catch((e) => {
        const err = e as ApiError;
        setStatus('error');
        setMessage(err.message || 'Could not verify payment.');
      });
  }, [params]);

  const c = {
    loading: { title: 'Verifying payment…', body: 'Just a moment.', tone: 'bg-brand-sky text-paper' },
    success: {
      title: 'Payment received',
      body: 'Thank you. Your order is confirmed and will be dispatched shortly.',
      tone: 'bg-brand-teal text-paper',
    },
    pending: {
      title: 'Payment pending',
      body: 'Your payment is still being processed. We’ll email you as soon as it settles.',
      tone: 'bg-brand-sky text-paper',
    },
    failed: {
      title: 'Payment not completed',
      body: message ?? 'The payment could not be completed.',
      tone: 'bg-brand text-paper',
    },
    error: {
      title: 'Could not verify payment',
      body: message ?? 'Please contact support with your order reference.',
      tone: 'bg-brand text-paper',
    },
  }[status];

  return (
    <main className="bg-mist pt-28 md:pt-32">
      <div className="frame grid min-h-[70vh] place-items-center pb-section-sm md:pb-section">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[440px] rounded-[18px] bg-paper p-8 text-center shadow-[0_30px_80px_-30px_rgba(10,11,13,0.15)]"
        >
          <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${c.tone}`}>
            {status === 'loading' && (
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
            )}
            {status === 'success' && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 5 5 9-10" />
              </svg>
            )}
            {status === 'pending' && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            )}
            {(status === 'failed' || status === 'error') && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 6-12 12" />
                <path d="m6 6 12 12" />
              </svg>
            )}
          </span>
          <h1 className="mt-6 text-h2 font-light tracking-tight">{c.title}</h1>
          <p className="mt-3 mx-auto max-w-[36ch] text-body text-muted">{c.body}</p>

          <div className="mt-6 flex gap-3">
            {orderId && status === 'success' && (
              <Link
                href={`/order/${orderId}`}
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-ink text-[13px] font-medium text-paper transition-colors hover:bg-brand"
              >
                View order
              </Link>
            )}
            {status !== 'success' && (
              <Link
                href="/checkout"
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-ink text-[13px] font-medium text-paper transition-colors hover:bg-brand"
              >
                Try again
              </Link>
            )}
            <Link
              href="/"
              className="flex h-12 flex-1 items-center justify-center rounded-full border border-line bg-paper text-[13px] font-medium text-ink transition-colors hover:border-ink/40"
            >
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
