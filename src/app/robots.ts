import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const isLocalSiteUrl =
    configuredSiteUrl === 'http://localhost:3000' ||
    configuredSiteUrl === 'http://127.0.0.1:3000';
  const baseUrl =
    configuredSiteUrl && !isLocalSiteUrl
      ? configuredSiteUrl.replace(/\/+$/, '')
      : 'https://sterling-website-corporate-gifting.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/api/', '/checkout/', '/cart/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
