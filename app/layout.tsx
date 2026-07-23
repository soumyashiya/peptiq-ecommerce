import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { AuthGate } from '@/components/auth/AuthGate';
import { CartProvider } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ChromeShell } from '@/components/layout/ChromeShell';
import { brand } from '@/lib/content';

const SITE_URL = 'https://peptiq.org';
const OG_IMAGE = '/images/peptide-glass.png';

// Closest freely-available match to the reference's "Aktiv Grotesk":
// a clean neo-grotesk with a usable 300 weight for oversized headlines.
const grotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
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
  themeColor: '#1863DC',
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
    <html lang="en" className={grotesk.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <AuthGate>
            <CartProvider>
              <SmoothScroll>
                <ChromeShell>{children}</ChromeShell>
              </SmoothScroll>
              <CartDrawer />
            </CartProvider>
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
