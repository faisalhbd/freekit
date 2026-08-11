import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Cost of Living Comparison",
  slug: "cost-of-living-comparison",
  category: "finance",
  shortDescription:
    "Compare the cost of living between two cities side by side with per-category analysis.",
  longDescription:
    "Enter monthly expenses for two cities and see a detailed comparison with percentage differences per category, total monthly and annual differences, and visual indicators showing which city is cheaper or more expensive.",
  metaTitle: "Free Cost of Living Comparison Calculator | FreeKit",
  metaDescription:
    "Compare cost of living between two cities. See per-category differences, monthly and annual savings, and visual breakdown. Free online tool.",
  keywords: [
    "cost of living comparison",
    "city comparison calculator",
    "relocate cost calculator",
    "moving cost comparison",
    "city expense comparison",
  ],
  tags: ["finance", "calculator", "comparison", "cost of living", "relocation"],
  icon: "ArrowLeftRight",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 12,
  toolOrder: 12,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "cost-of-living-calculator",
    "salary-after-tax-calculator",
    "rent-affordability-calculator",
    "mortgage-affordability-calculator",
  ],
  searchPriority: 84,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "compare cities",
    "city vs city",
    "relocation calculator",
    "cost difference between cities",
    "moving expenses comparison",
  ],
  version: "1.0.0",
}
