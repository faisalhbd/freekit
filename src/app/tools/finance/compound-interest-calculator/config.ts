import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Compound Interest Calculator",
  slug: "compound-interest-calculator",
  category: "finance",
  shortDescription:
    "Calculate compound interest with flexible compounding frequencies and monthly contributions.",
  longDescription:
    "Calculate the future value of your investments with compound interest. Supports annual, semi-annual, quarterly, monthly, and daily compounding with optional monthly contributions and year-by-year growth breakdown.",
  metaTitle: "Free Compound Interest Calculator | FreeKit",
  metaDescription:
    "Calculate compound interest online for free. Supports multiple compounding frequencies, monthly contributions, and year-by-year growth table. Plan your investments accurately.",
  keywords: [
    "compound interest calculator",
    "investment calculator",
    "savings calculator",
    "compound growth",
    "future value calculator",
  ],
  tags: ["finance", "calculator", "investment", "savings", "compound interest"],
  icon: "PiggyBank",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 4,
  toolOrder: 4,
  featuredOrder: 0,
  difficulty: "Intermediate",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "loan-emi-calculator",
    "roi-calculator",
    "profit-margin-calculator",
  ],
  searchPriority: 88,
  readingTime: 6,
  clientSide: true,
  searchAliases: [
    "investment growth calculator",
    "savings account calculator",
    "compound interest with contributions",
    "future value of investment",
    "interest compounding calculator",
  ],
  version: "1.0.0",
}
