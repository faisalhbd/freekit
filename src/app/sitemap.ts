import type { MetadataRoute } from 'next'
import { TOOLS_DATA } from '@/config/tools-data'
import { CATEGORIES } from '@/config/categories'
import { siteConfig } from '@/config/site'

const BASE_URL = siteConfig.url
const TODAY = new Date().toISOString().split('T')[0]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: TODAY, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: TODAY, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: TODAY, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: TODAY, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/tools/${cat.slug}`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const toolPages: MetadataRoute.Sitemap = TOOLS_DATA.filter((t) => t.published).map((tool) => ({
    url: `${BASE_URL}/tools/${tool.category}/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: tool.featured ? 0.9 : 0.8,
  }))

  return [...staticPages, ...categoryPages, ...toolPages]
}
