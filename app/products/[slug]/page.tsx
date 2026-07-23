import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brand, products, getProduct, compliance } from '@/lib/content';
import { AddToCart } from '@/components/cart/AddToCart';
import { ProductGallery } from '@/components/products/ProductGallery';
import { PackageDetailTabs } from '@/components/products/PackageDetailTabs';
import { JanoshikModal } from '@/components/products/JanoshikModal';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return products.items.map((p) => ({ slug: p.slug }));
}

const SITE_URL = 'https://peptiq.org';

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Product not found' };
  const path = `/products/${product.slug}`;
  const description = `${product.longDesc} ${compliance.productDisclaimerShort}`;
  return {
    title: product.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: `${product.name} — ${brand.name}`,
      description,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — ${brand.name}`,
      description,
      images: [product.image],
    },
  };
}

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function ProductPage({ params }: Params) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = products.items.filter((p) => p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: `${product.longDesc} ${compliance.productDisclaimer}`,
        image: `${SITE_URL}${product.image}`,
        sku: product.slug,
        category: 'Research reference compound',
        audience: {
          '@type': 'Audience',
          audienceType: 'Laboratory research professionals',
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Intended use',
            value: 'Laboratory research and analytical R&D only',
          },
          {
            '@type': 'PropertyValue',
            name: 'Human or veterinary use',
            value: 'Not intended for human or veterinary use',
          },
        ],
        brand: { '@type': 'Brand', name: brand.name },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/products/${product.slug}`,
          priceCurrency: 'USD',
          price: product.price,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: brand.name },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/#products` },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: `${SITE_URL}/products/${product.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-paper pt-28 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {product.janoshik && (
        <JanoshikModal
          slug={product.slug}
          productName={product.name}
          janoshik={product.janoshik}
          labTestUrl={product.labTestUrl}
        />
      )}
      <div className="frame pb-section-sm md:pb-section">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-muted">
          <Link href="/" className="transition-colors hover:text-brand-teal">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/#products" className="transition-colors hover:text-brand-teal">
            Products
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        {/* Detail: left image, right details */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          {/* Image + thumbnails */}
          <ProductGallery
            images={product.gallery ?? [product.image]}
            alt={product.name}
          />

          {/* Details column */}
          <div>
            <p className="text-label font-medium uppercase tracking-[0.12em] text-brand-teal">
              Compound analysis
            </p>
            <h1 className="mt-4 text-h1 font-light tracking-tight">{product.name}</h1>
            <p className="mt-3 text-lead font-light text-muted">{product.blurb}</p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-[2.5rem] font-light leading-none tracking-tight text-brand">
                {usd(product.price)}
              </span>
              <span className="text-[13px] uppercase tracking-[0.08em] text-muted">USD</span>
            </div>

            {/* Description */}
            <p className="mt-8 max-w-prose text-body text-muted">{product.longDesc}</p>

            {/* Mandatory research-use disclaimer (product info section) */}
            <div
              role="note"
              aria-label="Research-use disclaimer"
              className="mt-5 max-w-prose rounded-[6px] border-l-2 border-brand-teal/70 bg-brand-teal/[0.05] px-4 py-3 text-[13px] leading-relaxed text-muted"
            >
              <span className="font-medium uppercase tracking-[0.06em] text-ink">
                For research purposes only.
              </span>{' '}
              {compliance.productDisclaimer.replace('FOR RESEARCH PURPOSES ONLY. ', '')}
            </div>

            {/* View Janoshik report */}
            {product.labTestUrl && (
              <a
                href={product.labTestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-[6px] border border-brand-teal/40 bg-brand-teal/[0.06] px-4 py-2.5 text-[13px] font-medium uppercase tracking-[0.08em] text-brand-teal transition-colors hover:bg-brand-teal/[0.12]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View Janoshik Analytical report
              </a>
            )}

            {/* Janoshik third-party lab analysis card */}
            {product.janoshik && (
              <div className="mt-8 rounded-[10px] border border-line bg-mist/60 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal"
                    aria-hidden
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 2v6.34a2 2 0 0 1-.34 1.11L4.2 16.1A2 2 0 0 0 5.87 19h12.26a2 2 0 0 0 1.67-2.9l-4.46-6.65A2 2 0 0 1 15 8.34V2" />
                      <path d="M7 2h10" />
                      <path d="M7.5 13h9" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="text-[15px] font-medium text-ink">
                      Janoshik Third-Party Lab Analysis
                    </h2>
                    <p className="mt-1 text-[13px] text-muted">
                      Independently tested and verified by Janoshik Analytical.
                    </p>
                  </div>
                </div>

                {/* Batch meta */}
                <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-3">
                  <div className="bg-paper px-4 py-3">
                    <dt className="text-[10px] uppercase tracking-[0.1em] text-muted">
                      Batch number
                    </dt>
                    <dd className="mt-1 text-[14px] font-medium text-ink">
                      {product.janoshik.batchNumber}
                    </dd>
                  </div>
                  <div className="bg-paper px-4 py-3">
                    <dt className="text-[10px] uppercase tracking-[0.1em] text-muted">
                      Fill volume
                    </dt>
                    <dd className="mt-1 text-[14px] font-medium text-ink">
                      {product.janoshik.fillVolume}
                    </dd>
                  </div>
                  {product.janoshik.purity && (
                    <div className="bg-paper px-4 py-3">
                      <dt className="text-[10px] uppercase tracking-[0.1em] text-muted">
                        Purity
                      </dt>
                      <dd className="mt-1 text-[14px] font-medium text-brand-teal">
                        {product.janoshik.purity}
                      </dd>
                    </div>
                  )}
                </dl>

                {/* Compounds table */}
                <div className="mt-5 overflow-hidden rounded-[6px] border border-line">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-mist text-[10px] uppercase tracking-[0.1em] text-muted">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">Compound</th>
                        <th className="px-3 py-2.5 font-medium">Concentration</th>
                        <th className="px-3 py-2.5 font-medium">Verified content</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {product.janoshik.compounds.map((c) => (
                        <tr key={c.name} className="bg-paper">
                          <td className="px-3 py-2.5 font-medium text-ink">{c.name}</td>
                          <td className="px-3 py-2.5 text-muted">{c.concentration}</td>
                          <td className="px-3 py-2.5 font-medium text-brand-teal">{c.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted">
                  Concentration is measured per mL; verified content reflects the total assayed
                  mass across the stated fill volume.
                </p>
              </div>
            )}

            {/* Package detail tabs */}
            {product.details && (
              <div className="mt-8">
                <PackageDetailTabs
                  contents={product.details.contents}
                  storage={product.details.storage}
                />
              </div>
            )}

            {/* Add to cart */}
            <div className="mt-8">
              <AddToCart
                product={{
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                }}
              />
              {/* Mandatory research-use disclaimer (adjacent to Add to Cart) */}
              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                {compliance.productDisclaimer}
              </p>
            </div>

            {/* Trust row */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {['Janoshik tested', 'Full batch COA', 'Tamper-evident seal', 'Traceable batch code'].map(
                (c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[12px] text-muted"
                  >
                    {c}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Related products */}
        <section className="mt-section-sm md:mt-section">
          <div className="flex items-end justify-between border-t border-line pt-8">
            <h2 className="text-h2 font-light tracking-tight">Related products</h2>
            <Link
              href="/#products"
              className="link-underline hidden text-[14px] font-medium uppercase tracking-[0.08em] text-brand-teal sm:inline-flex"
            >
              View all
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {related.map((r) => (
              <Link key={r.slug} href={`/products/${r.slug}`} className="group block">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[6px] bg-mist">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-h3 font-light tracking-tight transition-colors group-hover:text-brand-teal">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-[15px] text-muted">{r.blurb}</p>
                  </div>
                  <span className="mt-1 flex-none text-[18px] font-light text-brand">{usd(r.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
