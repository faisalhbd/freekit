import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DynamicIcon } from "@/components/shared/dynamic-icon"
import { getCategoryIconClasses } from "@/lib/icons"
import type { CategoryCardProps } from "@/types"

export function CategoryCard({ category, toolCount, className }: CategoryCardProps) {
  const iconClasses = getCategoryIconClasses(category.slug)

  return (
    <Link
      href={`/tools/${category.slug}`}
      className={`block group ${className ?? ""}`}
    >
      <Card className="h-full hover:shadow-md transition-all duration-200 hover:border-primary/20">
        <CardContent className="flex items-start gap-4 pt-0">
          <div
            className={`flex items-center justify-center size-12 rounded-xl shrink-0 ${iconClasses.bg} ${iconClasses.text}`}
          >
            <DynamicIcon name={category.icon} className="size-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {category.shortDescription}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">
                {toolCount} {toolCount === 1 ? "tool" : "tools"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground group-hover:text-primary shrink-0"
              >
                Explore
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}