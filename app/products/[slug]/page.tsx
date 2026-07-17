import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brand, products, getProduct } from '@/lib/content';
import { AddToCart } from '@/components/cart/AddToCart';
import { ProductGallery } from '@/components/products/ProductGallery';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return products.items.map((p) => ({ slug: p.slug }));
}

const SITE_URL = 'https://peptiq.org';

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Product not found' };
  const path = `/products/${product.slug}`;
  return {
    title: product.name,
    description: product.longDesc,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: `${product.name} — ${brand.name}`,
      description: product.longDesc,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — ${brand.name}`,
      description: product.longDesc,
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
        description: product.longDesc,
        image: `${SITE_URL}${product.image}`,
        sku: product.slug,
        category: 'Research peptides',
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

          {/* Details */}
          <div>
            <p className="text-label font-medium uppercase tracking-[0.12em] text-brand-teal">
              {products.label}
            </p>
            <h1 className="mt-4 text-h1 font-light tracking-tight">{product.name}</h1>
            <p className="mt-3 text-lead font-light text-muted">{product.blurb}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-[2.5rem] font-light leading-none tracking-tight text-brand">
                {usd(product.price)}
              </span>
              <span className="text-[13px] uppercase tracking-[0.08em] text-muted">USD</span>
            </div>

            {/* Specs */}
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-4">
              {product.specs.map((s) => (
                <div key={s.label} className="bg-paper px-4 py-4">
                  <dt className="text-[11px] uppercase tracking-[0.1em] text-muted">{s.label}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

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
            </div>

            {/* Description */}
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.1em] text-ink">
                About this compound
              </h2>
              <p className="mt-4 max-w-prose text-body text-muted">{product.longDesc}</p>
            </div>

            {/* Trust row */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {['Janoshik tested', 'Cold-chain tracked', 'Full batch COA', 'UK & EU shipping'].map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line px-3.5 py-1.5 text-[12px] text-muted"
                >
                  {c}
                </li>
              ))}
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
