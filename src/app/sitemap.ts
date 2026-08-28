import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sterlinggifting.com';

  // Fetch active products for dynamic routes
  // Try catch in case DB is unpopulated during build
  let products: { slug: string, updatedAt: Date }[] = [];
  try {
    products = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
      select: { slug: true, updatedAt: true }
    });
  } catch (error) {
    console.error('Failed to fetch products for sitemap', error);
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/corporate-gifts`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/request-a-quote`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return [...staticUrls, ...productUrls];
}
