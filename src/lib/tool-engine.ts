import type {
  ToolConfig,
  CategorySlug,
  SearchResult,
  SearchOptions,
  FAQSchema,
  BreadcrumbSchema,
  WebApplicationSchema,
  WebSiteSchema,
  OrganizationSchema,
} from "@/types"
import { TOOLS_DATA } from "@/config/tools-data"
import { CATEGORIES, CATEGORY_MAP } from "@/config/categories"
import { siteConfig } from "@/config/site"

// ─── Core Queries ────────────────────────────────────────────────────────────

export function getPublishedTools(): ToolConfig[] {
  return TOOLS_DATA.filter((t) => t.published && t.status === "published")
}

export function getFeaturedTools(): ToolConfig[] {
  return getPublishedTools()
    .filter((t) => t.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
}

export function getPopularTools(limit = 8): ToolConfig[] {
  return getPublishedTools()
    .filter((t) => t.popular)
    .slice(0, limit)
}

export function getLatestTools(limit = 6): ToolConfig[] {
  return getPublishedTools()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit)
}

export function getToolsByCategory(slug: CategorySlug): ToolConfig[] {
  return getPublishedTools()
    .filter((t) => t.category === slug)
    .sort((a, b) => a.categoryOrder - b.categoryOrder)
}

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return getPublishedTools().find((t) => t.slug === slug)
}

export function getRelatedTools(slugs: string[]): ToolConfig[] {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolConfig => t !== undefined)
}

export function getToolCount(): number {
  return getPublishedTools().length
}

export function getToolCountByCategory(slug: CategorySlug): number {
  return getPublishedTools().filter((t) => t.category === slug).length
}

export function getAllToolSlugs(): string[] {
  return getPublishedTools().map((t) => t.slug)
}

// ─── Category + Tool Combined Queries ────────────────────────────────────────

export interface CategoryWithTools {
  category: (typeof CATEGORIES)[number]
  tools: ToolConfig[]
  count: number
}

export function getCategoriesWithTools(): CategoryWithTools[] {
  return CATEGORIES.sort((a, b) => a.order - b.order).map((category) => ({
    category,
    tools: getToolsByCategory(category.slug),
    count: getToolCountByCategory(category.slug),
  }))
}

export function getRelatedCategories(slug: CategorySlug): (typeof CATEGORIES)[number][] {
  return CATEGORIES.filter((c) => c.slug !== slug).sort((a, b) => a.order - b.order)
}

// ─── Search Engine ────────────────────────────────────────────────────────────

export function searchTools(query: string, options: SearchOptions = {}): SearchResult[] {
  if (!query.trim()) return []

  const { limit = 10, category, difficulty, tags } = options
  const normalizedQuery = query.toLowerCase().trim()
  const queryTerms = normalizedQuery.split(/\s+/)

  const published = getPublishedTools()

  const results: SearchResult[] = published
    .filter((tool) => {
      if (category && tool.category !== category) return false
      if (difficulty && tool.difficulty !== difficulty) return false
      if (tags && tags.length > 0 && !tags.some((tag) => tool.tags.includes(tag))) return false
      return true
    })
    .map((tool) => {
      let score = 0
      const matchedFields: string[] = []

      const fields: Record<string, string[]> = {
        title: [tool.title.toLowerCase()],
        shortDescription: [tool.shortDescription.toLowerCase()],
        keywords: tool.keywords.map((k) => k.toLowerCase()),
        tags: tool.tags.map((t) => t.toLowerCase()),
        searchAliases: tool.searchAliases.map((a) => a.toLowerCase()),
        category: [tool.category.toLowerCase()],
      }

      for (const [field, values] of Object.entries(fields)) {
        for (const value of values) {
          for (const term of queryTerms) {
            if (value.includes(term)) {
              const weight = field === "title" ? 10 : field === "keywords" ? 5 : field === "searchAliases" ? 4 : 3
              score += weight * tool.searchPriority / 100
              if (!matchedFields.includes(field)) {
                matchedFields.push(field)
              }
            }
          }
          if (value === normalizedQuery) {
            score += 15
          }
        }
      }

      return { tool, score, matchedFields }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return results
}

// ─── Schema Generators ───────────────────────────────────────────────────────

export function generateWebsiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    sameAs: [siteConfig.twitter, siteConfig.github],
  }
}

export function generateToolSchema(tool: ToolConfig): WebApplicationSchema {
  const categoryConfig = CATEGORY_MAP[tool.category]
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.shortDescription,
    url: `${siteConfig.url}/tools/${tool.category}/${tool.slug}`,
    applicationCategory: categoryConfig?.name ?? "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}

export function generateFAQSchema(items: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteConfig.url}${item.url}` : undefined,
    })),
  }
}

// ─── Navigation Helpers ──────────────────────────────────────────────────────

export function getCategoryNavItems() {
  return CATEGORIES.sort((a, b) => a.order - b.order).map((c) => ({
    label: c.name,
    href: `/tools/${c.slug}`,
    count: getToolCountByCategory(c.slug),
  }))
}

export function getPopularToolLinks(limit = 5) {
  return getPopularTools(limit).map((t) => ({
    label: t.title,
    href: `/tools/${t.category}/${t.slug}`,
  }))
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function getSiteStats() {
  return {
    toolCount: getToolCount(),
    categoryCount: CATEGORIES.length,
    featuredCount: getFeaturedTools().length,
    popularCount: getPopularTools().length,
  }
}