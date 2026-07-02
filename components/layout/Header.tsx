'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { brand, nav } from '@/lib/content';
import { useCart } from '@/components/cart/CartProvider';
import { useAuth } from '@/components/auth/AuthProvider';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const hideChrome = pathname === '/login';
  const { count, openCart } = useCart();
  const { user, logout } = useAuth();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click-outside + Escape closes the account dropdown.
  useEffect(() => {
    if (!accountOpen) return;
    const onDown = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAccountOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [accountOpen]);

  const solid = scrolled || !isHome;
  const linkHref = (href: string) => (isHome ? href : `/${href.replace(/^#/, '#')}`.replace('//', '/'));

  const handleSignOut = () => {
    logout();
    setAccountOpen(false);
    router.replace('/login');
  };

  if (hideChrome) return null;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-smooth ${
        solid
          ? 'bg-paper/80 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="frame flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href={isHome ? '#top' : '/'} className="group flex items-center gap-2.5" aria-label={brand.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-brand-sky to-brand text-paper shadow-[0_6px_16px_-6px_rgba(24,99,220,0.7)] transition-transform duration-500 ease-smooth group-hover:-rotate-6">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path d="M12 3 19.8 7.5 19.8 16.5 12 21 4.2 16.5 4.2 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="3" r="1.7" fill="currentColor" />
              <circle cx="19.8" cy="16.5" r="1.7" fill="currentColor" />
              <circle cx="4.2" cy="16.5" r="1.7" fill="currentColor" />
            </svg>
          </span>
          <span className="text-[20px] font-semibold tracking-[-0.025em] text-ink">
            {brand.name.slice(0, -2)}
            <span className="text-brand-sky">{brand.name.slice(-2)}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={linkHref(l.href)}
              className="group relative text-[13px] font-medium uppercase tracking-[0.08em] text-ink/80 transition-colors hover:text-brand-teal"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-brand-teal transition-transform duration-400 ease-smooth group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={linkHref(nav.cta.href)}
            className="hidden text-[13px] font-medium uppercase tracking-[0.08em] text-brand-teal link-underline md:inline-flex"
          >
            {nav.cta.label}
          </a>

          {/* Account: icon-only, opens dropdown on click when signed in */}
          <div ref={accountRef} className="relative hidden sm:block">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setAccountOpen((v) => !v)}
                  aria-label={`Account, ${user.name}`}
                  aria-haspopup="menu"
                  aria-expanded={accountOpen}
                  className="flex h-10 w-10 items-center justify-center rounded-full outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand-sky/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-sky to-brand text-[13px] font-semibold text-paper">
                    {user.name.trim().charAt(0).toUpperCase() || 'P'}
                  </span>
                </button>

                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      role="menu"
                      className="absolute right-0 top-12 w-64 origin-top-right overflow-hidden rounded-[12px] border border-line bg-paper shadow-[0_20px_50px_-20px_rgba(10,11,13,0.25)]"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 border-b border-line px-4 py-4">
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-sky to-brand text-[14px] font-semibold text-paper">
                          {user.name.trim().charAt(0).toUpperCase() || 'P'}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-medium text-ink">{user.name}</p>
                          <p className="truncate text-[12px] text-muted">{user.email}</p>
                        </div>
                      </div>

                      {/* Sign out */}
                      <button
                        type="button"
                        onClick={handleSignOut}
                        role="menuitem"
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-[14px] text-ink transition-colors hover:bg-mist"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
                          <path d="M10 17l-5-5 5-5" />
                          <path d="M15 12H5" />
                        </svg>
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href="/login"
                aria-label="Sign in"
                className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-brand-teal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </Link>
            )}
          </div>

          {/* Cart icon */}
          <button
            onClick={openCart}
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-brand-teal"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold tabular-nums text-paper"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-[1.5px] w-6 bg-ink transition-all duration-300 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`h-[1.5px] w-6 bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[1.5px] w-6 bg-ink transition-all duration-300 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Scroll progress line */}
      <motion.div style={{ scaleX: progress }} className="h-px w-full origin-left bg-brand-sky" />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-paper/95 backdrop-blur-xl lg:hidden"
          >
            <div className="frame flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto py-6">
              {[...nav.links, nav.cta].map((l) => (
                <a
                  key={l.href + l.label}
                  href={linkHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-h3 font-light tracking-tight text-ink"
                >
                  {l.label}
                </a>
              ))}
              {user ? (
                <div className="flex items-center justify-between gap-4 border-b border-line py-4">
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                      Signed in as
                    </p>
                    <p className="mt-1 truncate text-h3 font-light tracking-tight text-ink">{user.name}</p>
                    <p className="truncate text-[13px] text-muted">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleSignOut();
                      setOpen(false);
                    }}
                    className="flex flex-none items-center gap-2 rounded-full border border-brand/30 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.08em] text-brand transition-colors hover:bg-brand hover:text-paper"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
                      <path d="M10 17l-5-5 5-5" />
                      <path d="M15 12H5" />
                    </svg>
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-h3 font-light tracking-tight text-brand-teal"
                >
                  Sign in
                </Link>
              )}
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="py-4 text-h3 font-light tracking-tight text-ink"
              >
                Cart {count > 0 && `(${count})`}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
