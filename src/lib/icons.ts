import * as LucideIcons from "lucide-react"
import type { LucideProps } from "lucide-react"
import type { ComponentType } from "react"
import type { CategorySlug } from "@/types"

type LucideIconComponent = ComponentType<LucideProps>

const IconCache = new Map<string, LucideIconComponent>()

/**
 * Resolve a Lucide icon name string to the actual component.
 * Falls back to Wrench if the icon name is not found.
 * Results are cached for performance.
 */
export function getIconComponent(iconName: string): LucideIconComponent {
  if (IconCache.has(iconName)) {
    return IconCache.get(iconName)!
  }

  const icons = LucideIcons as unknown as Record<string, LucideIconComponent>
  const Icon = icons[iconName] ?? LucideIcons.Wrench

  IconCache.set(iconName, Icon)
  return Icon
}

interface CategoryIconClasses {
  bg: string
  text: string
}

/**
 * Maps category slugs to Tailwind CSS classes for icon containers.
 * Returns bg (background) and text (icon color) classes.
 */
export function getCategoryIconClasses(
  slug: CategorySlug | string
): CategoryIconClasses {
  const map: Record<string, CategoryIconClasses> = {
    image: { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400" },
    seo: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
    developer: { bg: "bg-slate-500/10", text: "text-slate-600 dark:text-slate-400" },
    text: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
    css: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
    utility: { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400" },
    calculator: { bg: "bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400" },
  }

  return map[slug] ?? { bg: "bg-muted", text: "text-muted-foreground" }
}