'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contact, brand } from '@/lib/content';
import { SectionTag } from '@/components/ui/SectionTag';
import { Reveal } from '@/components/ui/Reveal';

/* ── Floating-label field ──────────────────────────────────────────────── */
function Field({
  name,
  label,
  type = 'text',
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const shared = {
    id: name,
    name,
    required,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      'peer w-full rounded-[4px] border border-line bg-mist/40 px-4 pb-3 pt-7 text-[16px] text-ink outline-none transition-all duration-300 focus:border-brand-sky focus:bg-paper focus:ring-4 focus:ring-brand-sky/10',
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-4 origin-left transition-all duration-300 ease-smooth ${
          active
            ? 'top-2 text-[11px] tracking-[0.08em] text-brand-teal'
            : 'top-[1.35rem] text-[15px] text-muted'
        }`}
      >
        {label}
        {required && <span className="text-brand-sky"> *</span>}
      </label>
      {textarea ? (
        <textarea {...shared} rows={8} maxLength={undefined} />
      ) : (
        <input {...shared} type={type} maxLength={undefined} />
      )}
    </div>
  );
}

/* ── Contact-method row on the dark panel ──────────────────────────────── */
function Method({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="group flex items-start gap-4">
      <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors duration-300 group-hover:border-brand-sky group-hover:bg-brand-sky group-hover:text-ink">
        {icon}
      </span>
      <span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-paper/45">
          {label}
        </span>
        <span className="mt-1 block text-[15px] text-paper">{value}</span>
      </span>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {body}
    </a>
  ) : (
    body
  );
}

const icons = {
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  truck: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
  pin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
};

const chips = ['Janoshik tested', 'Cold-chain tracked', 'UK & EU shipping'];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-mist py-section-sm md:py-section">
      <div className="frame">
        <SectionTag label={contact.label} index={contact.index} />

        <Reveal direction="up" className="mt-14 lg:mt-20">
          <div className="grid grid-cols-1 overflow-hidden rounded-[10px] bg-paper shadow-[0_40px_100px_-40px_rgba(10,11,13,0.35)] lg:grid-cols-12">
            {/* ── Dark info panel ── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-teal via-brand to-brand p-9 text-paper md:p-12 lg:col-span-5">
              {/* decorative glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-sky/30 blur-[100px]"
              />

              <div className="relative flex h-full flex-col">
                <p className="text-label font-medium uppercase tracking-[0.14em] text-paper/60">
                  Get in touch
                </p>
                <h2 className="mt-5 text-h2 font-light leading-[1.05] tracking-tight">
                  {contact.title}
                </h2>
                <p className="mt-6 max-w-sm text-body text-paper/70">{contact.body}</p>

                <div className="mt-10 space-y-6">
                  <Method icon={icons.mail} label="Email" value={brand.email} href={`mailto:${brand.email}`} />
                  <Method icon={icons.clock} label="Response time" value="Within 1 working day" />
                  <Method icon={icons.truck} label="Dispatch" value="Same-day UK · pre-3pm orders" />
                  <Method icon={icons.pin} label="Supply" value={brand.address} />
                </div>

                <div className="mt-auto flex flex-wrap gap-2.5 pt-10">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-paper/20 px-3.5 py-1.5 text-[12px] tracking-[0.04em] text-paper/75"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Form ── */}
            <div className="p-9 md:p-12 lg:col-span-7">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full min-h-[420px] flex-col items-start justify-center"
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal text-paper"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                    </motion.span>
                    <h3 className="mt-7 text-h3 font-light tracking-tight">Enquiry received</h3>
                    <p className="mt-3 max-w-sm text-body text-muted">
                      Thank you. Our research team will be in touch within one working day.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.08em] text-brand-teal link-underline"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    {contact.fields.map((f) => (
                      <Field
                        key={f.name}
                        name={f.name}
                        label={f.label}
                        type={f.type}
                        required={f.required}
                      />
                    ))}
                    <div className="sm:col-span-2">
                      <Field name={contact.message.name} label={contact.message.label} textarea />
                    </div>
                    <div className="mt-2 flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xs text-[12px] leading-relaxed text-muted">
                        For laboratory research use only. Not for human or veterinary consumption.
                      </p>
                      <button
                        type="submit"
                        className="group inline-flex flex-none items-center gap-3 rounded-full bg-brand px-9 py-4 text-[14px] font-medium uppercase tracking-[0.08em] text-paper transition-colors duration-300 hover:bg-brand-teal"
                      >
                        {contact.submit}
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                          →
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
