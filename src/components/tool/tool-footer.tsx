import type { ToolConfig } from "@/types"
import { getRelatedTools, getToolsByCategory } from "@/lib/tool-engine"
import { ToolCard } from "@/components/shared/tool-card"

interface ToolFooterProps {
  tool: ToolConfig
}

export function ToolFooter({ tool }: ToolFooterProps) {
  const relatedTools = getRelatedTools(tool.relatedTools)
  const categoryTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 4)

  const seenSlugs = new Set<string>()
  const combined: ToolConfig[] = []

  for (const t of relatedTools) {
    if (!seenSlugs.has(t.slug)) {
      seenSlugs.add(t.slug)
      combined.push(t)
    }
  }

  for (const t of categoryTools) {
    if (!seenSlugs.has(t.slug)) {
      seenSlugs.add(t.slug)
      combined.push(t)
    }
  }

  if (combined.length === 0) {
    return null
  }

  return (
    <section className="space-y-6" aria-label="Related tools">
      <h2 className="text-2xl font-semibold tracking-tight">Related Tools</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {combined.map((relatedTool) => (
          <ToolCard key={relatedTool.slug} tool={relatedTool} />
        ))}
      </div>
    </section>
  )
}