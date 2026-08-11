import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Cost of Living Calculator",
  slug: "cost-of-living-calculator",
  category: "finance",
  shortDescription:
    "Calculate your total monthly and annual cost of living with a visual expense breakdown.",
  longDescription:
    "Enter your monthly expenses across 11 categories to see your total cost of living, annual costs, and a visual percentage breakdown of where your money goes each month.",
  metaTitle: "Free Cost of Living Calculator | FreeKit",
  metaDescription:
    "Calculate your monthly and annual cost of living with a visual category breakdown. Track rent, food, transport, and more. Free online tool.",
  keywords: [
    "cost of living calculator",
    "monthly expenses calculator",
    "living expenses breakdown",
    "budget calculator",
    "personal budget",
  ],
  tags: ["finance", "calculator", "budget", "expenses", "cost of living"],
  icon: "Home",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 11,
  toolOrder: 11,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "cost-of-living-comparison",
    "rent-affordability-calculator",
    "salary-after-tax-calculator",
    "student-budget-planner",
  ],
  searchPriority: 85,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "living cost",
    "monthly budget",
    "expense tracker",
    "spending breakdown",
    "cost of living estimate",
  ],
  version: "1.0.0",
}
