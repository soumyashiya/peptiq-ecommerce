'use client';

import { useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api';

type State = { kind: 'idle' } | { kind: 'submitting' } | { kind: 'success'; message: string } | { kind: 'error'; message: string };

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.kind === 'submitting') return;
    if (!consent) {
      setState({ kind: 'error', message: 'Please tick the consent box to continue.' });
      return;
    }
    setState({ kind: 'submitting' });
    try {
      const res = await apiFetch<{ ok: boolean; already_subscribed?: boolean }>(
        '/api/newsletter/subscribe',
        {
          method: 'POST',
          json: { email: email.trim(), consent: true, source: 'peptiq_footer', website: honeypot },
          auth: false,
        }
      );
      if (res?.ok) {
        setState({
          kind: 'success',
          message: res.already_subscribed
            ? "You're already on the list — thank you."
            : 'Subscribed. Watch your inbox for the next batch drop.',
        });
        setEmail('');
      } else {
        setState({ kind: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (e) {
      const err = e as ApiError;
      setState({
        kind: 'error',
        message: err.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 max-w-sm">
      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-paper/40">Newsletter</p>
      <p className="mt-2 text-[13px] text-paper/55">
        Batch drops, storage tips, sourcing notes. No spam.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@lab.com"
          disabled={state.kind === 'submitting' || state.kind === 'success'}
          className="h-10 flex-1 rounded-full border border-paper/15 bg-paper/5 px-4 text-[13px] text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-brand-sky focus:bg-paper/10 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state.kind === 'submitting' || state.kind === 'success' || !email.trim()}
          className="h-10 rounded-full bg-brand-sky px-5 text-[12px] font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state.kind === 'submitting' ? '…' : 'Subscribe'}
        </button>
      </div>

      <label className="mt-3 flex cursor-pointer items-start gap-2 text-[12px] text-paper/55">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 rounded border-paper/30 bg-transparent text-brand-sky focus:ring-1 focus:ring-brand-sky/40"
        />
        I agree to receive research updates by email.
      </label>

      {/* honeypot — bots love to fill this, real users leave it empty */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {state.kind === 'success' && (
        <p className="mt-3 text-[12px] text-brand-sky">{state.message}</p>
      )}
      {state.kind === 'error' && (
        <p className="mt-3 text-[12px] text-brand">{state.message}</p>
      )}
    </form>
  );
}
