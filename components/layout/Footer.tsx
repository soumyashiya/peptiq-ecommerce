'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brand, footer } from '@/lib/content';
import { NewsletterForm } from './NewsletterForm';

/** Route or in-page anchor → correct link element. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:');
  const className = 'text-[15px] text-paper/70 transition-colors hover:text-paper';
  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/login') return null;

  return (
    <footer className="bg-ink text-paper">
      <div className="frame py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-brand-sky to-brand text-paper transition-transform duration-500 ease-smooth group-hover:-rotate-6">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 19.8 7.5 19.8 16.5 12 21 4.2 16.5 4.2 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="12" cy="3" r="1.7" fill="currentColor" />
                  <circle cx="19.8" cy="16.5" r="1.7" fill="currentColor" />
                  <circle cx="4.2" cy="16.5" r="1.7" fill="currentColor" />
                </svg>
              </span>
              <span className="text-[20px] font-semibold tracking-[-0.025em] text-paper">
                {brand.name.slice(0, -2)}
                <span className="text-brand-sky">{brand.name.slice(-2)}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-body text-paper/45">{brand.tagline}</p>
            <div className="mt-8 space-y-2 text-[13px] text-paper/50">
              <p>
                <a href={`mailto:${brand.email}`} className="transition-colors hover:text-paper">
                  {brand.email}
                </a>
              </p>
              <p>{brand.address}</p>
            </div>
            <NewsletterForm />

            <p className="mt-8 text-[13px] text-paper/35">Est. {brand.established}</p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-paper/40">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 text-[13px] text-paper/40 md:flex-row md:items-center">
          <p>
            © {brand.established}–2026 {brand.name} {brand.suffix}. All rights reserved. For
            laboratory research use only.
          </p>
          <ul className="flex flex-wrap gap-6">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
