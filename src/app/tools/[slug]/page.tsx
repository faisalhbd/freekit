import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { CATEGORIES, getCategoryBySlug } from "@/config/categories"
import { getToolsByCategory } from "@/lib/tool-engine"
import type { CategorySlug } from "@/types"
import { ToolCard } from "@/components/shared/tool-card"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"
import { DynamicIcon } from "@/components/shared/dynamic-icon"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, Wrench } from "lucide-react"
import { siteConfig } from "@/config/site"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return {
      title: "Category Not Found | FreeKit",
    }
  }

  const url = `${siteConfig.url}/tools/${category.slug}`

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const tools = getToolsByCategory(slug as CategorySlug).filter(
    (t) => t.published && t.status === "published"
  )

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/#categories" },
    { label: category.name },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.metaTitle,
    description: category.metaDescription,
    url: `${siteConfig.url}/tools/${category.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: `${siteConfig.url}/tools/${tool.category}/${tool.slug}`,
        description: tool.shortDescription,
      })),
    },
  }

  return (
    <main className="min-h-screen flex-1">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <BreadcrumbNav items={breadcrumbs} />
        </nav>

        {/* Category Header */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="flex items-center justify-center size-14 rounded-2xl shrink-0"
              style={{ backgroundColor: `${category.color}15`, color: category.color }}
            >
              <DynamicIcon name={category.icon} className="size-7" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {category.name}
                </h1>
                <Badge
                  variant="secondary"
                  className="text-xs font-medium gap-1.5"
                >
                  <Layers className="size-3" />
                  {tools.length} {tools.length === 1 ? "tool" : "tools"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-2 text-base sm:text-lg leading-relaxed max-w-3xl">
                {category.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        {tools.length > 0 ? (
          <section aria-label={`${category.name} tools`} className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        ) : (
          <Card className="mb-12">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="size-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Wrench className="size-7 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold mb-1">No tools yet</h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                We&apos;re working on adding tools to this category. Check back
                soon for new additions.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Other Categories */}
        {CATEGORIES.length > 1 && (
          <section aria-label="Other categories" className="border-t pt-8">
            <h2 className="text-lg font-semibold mb-4">Explore Other Categories</h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.slug !== category.slug)
                .sort((a, b) => a.order - b.order)
                .map((cat) => (
                  <a
                    key={cat.slug}
                    href={`/tools/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <DynamicIcon name={cat.icon} className="size-3.5" />
                    {cat.name}
                  </a>
                ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
