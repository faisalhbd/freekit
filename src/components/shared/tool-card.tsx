import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DynamicIcon } from "@/components/shared/dynamic-icon"
import { getCategoryIconClasses } from "@/lib/icons"
import { getCategoryBySlug } from "@/config/categories"
import type { ToolCardProps } from "@/types"

function isNewTool(updatedAt: string): boolean {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  return new Date(updatedAt).getTime() > thirtyDaysAgo
}

export function ToolCard({ tool, showCategory, showBadge, className }: ToolCardProps) {
  const iconClasses = getCategoryIconClasses(tool.category)
  const category = getCategoryBySlug(tool.category)

  return (
    <Link
      href={`/tools/${tool.category}/${tool.slug}`}
      className={`block group ${className ?? ""}`}
    >
      <Card className="h-full hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div
              className={`flex items-center justify-center size-10 rounded-full shrink-0 ${iconClasses.bg} ${iconClasses.text}`}
            >
              <DynamicIcon name={tool.icon} className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-sm leading-tight truncate">
                  {tool.title}
                </h3>
                {showBadge && tool.featured && (
                  <Badge variant="default" className="text-[10px] px-1.5 py-0">
                    Featured
                  </Badge>
                )}
                {showBadge && tool.popular && !tool.featured && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    Popular
                  </Badge>
                )}
                {showBadge && isNewTool(tool.updatedAt) && !tool.featured && !tool.popular && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {tool.shortDescription}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex items-center justify-between pt-0">
          <div className="flex items-center gap-2">
            {showCategory && category && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                {category.name}
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
              {tool.difficulty}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
              Free
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 text-muted-foreground group-hover:text-foreground"
            aria-label={`Open ${tool.title}`}
          >
            Open Tool
            <ArrowRight className="size-3.5" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}