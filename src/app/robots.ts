import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const baseUrl = configuredSiteUrl && !/localhost|127\\.0\\.0\\.1/i.test(configuredSiteUrl)
    ? configuredSiteUrl.replace(/\\/+$/, '')
    : 'https://sterling-website-corporate-gifting-sterling17.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/api/', '/checkout/', '/cart/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
