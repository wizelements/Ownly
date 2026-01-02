import { MetadataRoute } from 'next'
import { SEO_PAGES } from '@/lib/seo-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ownly-kit.vercel.app'
  const now = new Date()

  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  const seoPages = SEO_PAGES.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Free tools (backlink magnets)
  const toolPages = [
    {
      url: `${baseUrl}/saas-cost-calculator`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tech-stack-generator`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...seoPages, ...toolPages]
}
