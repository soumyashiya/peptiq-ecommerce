'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const BARE_ROUTES = ['/login', '/register'];

export function ChromeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const bare = BARE_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  return (
    <>
      {!bare && <Header />}
      {children}
      {!bare && <Footer />}
    </>
  );
}
