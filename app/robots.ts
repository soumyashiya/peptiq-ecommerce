import type { MetadataRoute } from 'next';

const BASE_URL = 'https://peptiq.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep transactional / account funnels out of the index.
      disallow: ['/cart', '/checkout', '/order/', '/login', '/register'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
