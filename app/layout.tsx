import type { Metadata, Viewport } from 'next';
import { Quicksand, Baloo_2, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { AuthGate } from '@/components/auth/AuthGate';
import { CartProvider } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistProvider } from '@/components/wishlist/WishlistProvider';
import { ChromeShell } from '@/components/layout/ChromeShell';
import { brand } from '@/lib/content';

const SITE_URL = 'https://peptiq.org';
const OG_IMAGE = '/images/peptide-glass.png';

/*
 * Body face — Quicksand, which is the reference site's actual UI face
 * (verified against hermujo.com's computed styles: `Quicksand, sans-serif` on
 * body, nav, buttons, prices and every paragraph).
 *
 * 300 is deliberately NOT loaded. The reference never sets a weight below 400
 * on text; its hierarchy runs 400 (body) → 500 (lead/description) → 600
 * (nav, links, buttons) → 700 (badges, prices, bold headings). Thin type at
 * small sizes was the main thing separating this site's feel from the
 * reference, so the weight simply isn't available any more.
 */
const sans = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

/*
 * Headline face. The reference's headline font is **Indarung** — a licensed,
 * self-hosted, single-weight (400) caps-only display woff2 served from its own
 * CDN, so it cannot be used here. Baloo 2 at 800 is the closest freely-licensed
 * match in mass, width and roundness.
 *
 * Applied via `.t-display` / `.t-h1` / `.t-h2` in globals.css. Like the
 * reference, it now covers section headings too, not just page titles; `.t-h3`
 * and below stay in Quicksand, which is the same split the reference makes.
 */
const display = Baloo_2({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

/**
 * Figures only — prices, purity percentages, batch codes, assay tables.
 *
 * This is a DATA face, not a label face: it earns its place because those
 * figures have to align in columns and be compared digit-by-digit, which
 * Quicksand's proportional numerals can't do. It must never be used for prose,
 * eyebrows or UI labels — a mono caption above every heading is exactly the
 * template tell this redesign removes.
 */
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});


const title = `${brand.name} — Research Peptides for Laboratory R&D`;
const description =
  'Research-use-only peptide compounds for controlled laboratory R&D: Retatrutide, Tirzepatide, BPC-157, TB-500, GHK-Cu, NAD+. Janoshik-verified per batch with full documentation. Not for human or veterinary use.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  keywords: [
    'research peptides',
    'research-use-only peptides',
    'laboratory reference compounds',
    'Retatrutide research reference',
    'Tirzepatide research reference',
    'BPC-157 research reference',
    'TB-500 research reference',
    'GHK-Cu research reference',
    'NAD+ research reference',
    'Janoshik tested research peptides',
    'laboratory research peptides UK',
    'research peptide supplier EU',
  ],
  authors: [{ name: brand.name, url: SITE_URL }],
  creator: brand.name,
  publisher: brand.name,
  category: 'science',
  alternates: { canonical: '/' },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: brand.name,
    locale: 'en_GB',
    title,
    description,
    images: [{ url: OG_IMAGE, width: 896, height: 1200, alt: `${brand.name} research peptides` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#6B4FA8',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: brand.name,
      url: SITE_URL,
      email: brand.email,
      description,
      foundingDate: String(brand.established),
      areaServed: ['GB', 'EU'],
      logo: { '@type': 'ImageObject', url: `${SITE_URL}${OG_IMAGE}` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: brand.name,
      description,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-GB',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <AuthGate>
            <CartProvider>
              <WishlistProvider>
                <SmoothScroll>
                  <ChromeShell>{children}</ChromeShell>
                </SmoothScroll>
                <CartDrawer />
              </WishlistProvider>
            </CartProvider>
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
