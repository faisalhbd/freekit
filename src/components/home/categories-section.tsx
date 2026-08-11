import { LayoutGrid } from "lucide-react"

import { getCategoriesWithTools } from "@/lib/tool-engine"
import { CategoryCard } from "@/components/shared/category-card"

export function CategoriesSection() {
  const categories = getCategoriesWithTools()

  if (categories.length === 0) return null

  return (
    <section
      id="categories"
      className="py-16 md:py-20 bg-muted/30"
      aria-label="Browse by category"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <LayoutGrid className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Browse by Category
          </h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Find the perfect tool for your needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ category, count }) => (
            <CategoryCard
              key={category.slug}
              category={category}
              toolCount={count}
            />
          ))}
        </div>
      </div>
    </section>
  )
}