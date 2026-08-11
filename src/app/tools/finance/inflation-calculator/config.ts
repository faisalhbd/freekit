import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Inflation Calculator",
  slug: "inflation-calculator",
  category: "finance",
  shortDescription:
    "Calculate how inflation erodes purchasing power over time with year-by-year breakdown.",
  longDescription:
    "Enter an amount and time period to see how inflation reduces its purchasing power. Use historical US CPI averages or a custom inflation rate. View a year-by-year table of value erosion and a visual bar showing purchasing power shrinkage.",
  metaTitle: "Free Inflation Calculator | FreeKit",
  metaDescription:
    "Calculate the impact of inflation on your money. Enter any amount and year range to see how purchasing power changes over time, with year-by-year breakdown and visual charts.",
  keywords: [
    "inflation calculator",
    "purchasing power calculator",
    "inflation adjustment",
    "cpi calculator",
    "money value over time",
  ],
  tags: ["finance", "calculator", "inflation", "cpi", "purchasing power"],
  icon: "TrendingDown",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 21,
  toolOrder: 21,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "retirement-savings-calculator",
    "compound-interest-calculator",
    "salary-after-tax-calculator",
    "cost-of-living-calculator",
  ],
  searchPriority: 84,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "how much is money worth",
    "inflation over time",
    "purchasing power loss",
    "inflation impact calculator",
    "real value of money",
  ],
  version: "1.0.0",
}
