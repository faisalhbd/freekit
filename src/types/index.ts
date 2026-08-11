// ─── Site Configuration Types ───────────────────────────────────────────────

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  author: string
  email: string
  twitter: string
  github: string
  links: SiteLink[]
}

export interface SiteLink {
  label: string
  href: string
  external?: boolean
}

// ─── Category Types ─────────────────────────────────────────────────────────

export type CategorySlug =
  | "image"
  | "seo"
  | "developer"
  | "text"
  | "css"
  | "utility"
  | "calculator"
  | "pdf"
  | "ocr"
  | "creator"
  | "text-cleanup"
  | "data-conversion"
  | "finance"
  | "business"
  | "privacy"
  | "media"
  | "device"
  | "document"
  | "qr" 

export interface CategoryConfig {
  name: string
  slug: CategorySlug
  shortDescription: string
  longDescription: string
  icon: string
  color: string
  metaTitle: string
  metaDescription: string
  order: number
}

// ─── Tool Configuration Types ───────────────────────────────────────────────

export type ToolDifficulty = "Beginner" | "Intermediate" | "Advanced"
export type ToolStatus = "draft" | "published"

export interface ToolConfig {
  title: string
  slug: string
  category: CategorySlug

  shortDescription: string
  longDescription: string

  metaTitle: string
  metaDescription: string

  keywords: string[]
  tags: string[]

  icon: string

  featured: boolean
  popular: boolean
  published: boolean

  status: ToolStatus

  categoryOrder: number
  toolOrder: number
  featuredOrder: number

  difficulty: ToolDifficulty

  author: string

  createdAt: string
  updatedAt: string

  relatedTools: string[]

  searchPriority: number

  readingTime: number

  clientSide: boolean

  searchAliases: string[]

  version: string
}

// ─── FAQ Types ──────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string
  answer: string
}

// ─── Schema Types (JSON-LD) ─────────────────────────────────────────────────

export interface WebSiteSchema {
  "@context": "https://schema.org"
  "@type": "WebSite"
  name: string
  url: string
  description: string
  potentialAction: SearchActionSchema
}

export interface SearchActionSchema {
  "@type": "SearchAction"
  target: string
  "query-input": string
}

export interface OrganizationSchema {
  "@context": "https://schema.org"
  "@type": "Organization"
  name: string
  url: string
  logo: string
  sameAs: string[]
}

export interface WebApplicationSchema {
  "@context": "https://schema.org"
  "@type": "WebApplication"
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    "@type": "Offer"
    price: string
    priceCurrency: string
  }
}

export interface FAQSchema {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org"
  "@type": "BreadcrumbList"
  itemListElement: Array<{
    "@type": "ListItem"
    position: number
    name: string
    item?: string
  }>
}

export interface CollectionPageSchema {
  "@context": "https://schema.org"
  "@type": "CollectionPage"
  name: string
  description: string
  url: string
}

// ─── Search Types ───────────────────────────────────────────────────────────

export interface SearchResult {
  tool: ToolConfig
  score: number
  matchedFields: string[]
}

export interface SearchOptions {
  limit?: number
  category?: CategorySlug
  difficulty?: ToolDifficulty
  tags?: string[]
}

// ─── Navigation Types ───────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  icon?: string
}

export interface FooterColumn {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

// ─── Component Props ────────────────────────────────────────────────────────

export interface ToolCardProps {
  tool: ToolConfig
  showCategory?: boolean
  showBadge?: boolean
  className?: string
}

export interface CategoryCardProps {
  category: CategoryConfig
  toolCount: number
  className?: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}