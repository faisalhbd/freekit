import type { ToolConfig, BreadcrumbItem, ToolDifficulty } from "@/types"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"
import { Badge } from "@/components/ui/badge"
import { CATEGORY_MAP } from "@/config/categories"

interface ToolHeaderProps {
  tool: ToolConfig
}

const DIFFICULTY_STYLES: Record<ToolDifficulty, string> = {
  Beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
}

export function ToolHeader({ tool }: ToolHeaderProps) {
  const categoryConfig = CATEGORY_MAP[tool.category]
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: categoryConfig?.name ?? tool.category, href: `/tools/${tool.category}` },
    { label: tool.title },
  ]

  const formattedDate = new Date(tool.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <section className="space-y-4" aria-label="Tool header">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {tool.title}
      </h1>

      <p className="text-lg text-muted-foreground">{tool.shortDescription}</p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="secondary"
          className={DIFFICULTY_STYLES[tool.difficulty]}
        >
          {tool.difficulty}
        </Badge>

        <Badge variant="outline">{categoryConfig?.name ?? tool.category}</Badge>

        <Badge variant="secondary">Free</Badge>

        <span className="text-sm text-muted-foreground">v{tool.version}</span>

        <span className="text-sm text-muted-foreground">
          Updated {formattedDate}
        </span>
      </div>
    </section>
  )
}