import { Clock } from "lucide-react"

import { getLatestTools } from "@/lib/tool-engine"
import { ToolCard } from "@/components/shared/tool-card"

export function LatestTools() {
  const tools = getLatestTools(6)

  if (tools.length === 0) return null

  return (
    <section id="latest" className="py-16 md:py-20" aria-label="Latest tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Latest Tools
          </h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Recently updated tools
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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