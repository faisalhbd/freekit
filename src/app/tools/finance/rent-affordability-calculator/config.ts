import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Rent Affordability Calculator",
  slug: "rent-affordability-calculator",
  category: "finance",
  shortDescription:
    "Calculate how much rent you can afford based on income and debts using an adjustable percentage rule.",
  longDescription:
    "Determine your maximum affordable rent based on monthly gross income and existing debts. Uses the standard 30% rule with an adjustable slider (20-40%) so you can find your comfort zone. See your recommended rent range, remaining budget, and visual breakdown.",
  metaTitle: "Free Rent Affordability Calculator | FreeKit",
  metaDescription:
    "Calculate how much rent you can afford based on your income and debts. Adjustable 30% rule slider with budget breakdown. Free online tool.",
  keywords: [
    "rent affordability",
    "how much rent can I afford",
    "rent calculator",
    "rent budget",
    "apartment affordability",
    "max rent calculator",
  ],
  tags: ["finance", "calculator", "rent", "budget", "affordability", "housing"],
  icon: "Key",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 15,
  toolOrder: 15,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "cost-of-living-calculator",
    "salary-after-tax-calculator",
    "mortgage-affordability-calculator",
    "cost-of-living-comparison",
  ],
  searchPriority: 84,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "max rent",
    "rent budget calculator",
    "how much for rent",
    "apartment budget",
    "can I afford this rent",
  ],
  version: "1.0.0",
}
