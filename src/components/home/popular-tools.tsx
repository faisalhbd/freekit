import { TrendingUp } from "lucide-react"

import { getPopularTools } from "@/lib/tool-engine"
import { ToolCard } from "@/components/shared/tool-card"

export function PopularTools() {
  const tools = getPopularTools(8)

  if (tools.length === 0) return null

  return (
    <section id="popular" className="py-16 md:py-20" aria-label="Popular tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Popular Tools
          </h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Most used tools by our community
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              showCategory
              showBadge
            />
          ))}
        </div>
      </div>
    </section>
  )
}