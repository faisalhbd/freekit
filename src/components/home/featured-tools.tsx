import { Sparkles } from "lucide-react"

import { getFeaturedTools } from "@/lib/tool-engine"
import { ToolCard } from "@/components/shared/tool-card"

export function FeaturedTools() {
  const tools = getFeaturedTools()

  if (tools.length === 0) return null

  return (
    <section id="featured" className="py-16 md:py-20" aria-label="Featured tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Featured Tools
          </h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Hand-picked tools to supercharge your workflow
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