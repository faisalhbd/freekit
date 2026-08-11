import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Profit Margin Calculator",
  slug: "profit-margin-calculator",
  category: "finance",
  shortDescription:
    "Calculate profit margin, markup, and profit from cost and selling prices.",
  longDescription:
    "Calculate your profit margin percentage, markup percentage, and profit amount from cost and selling prices. Supports two modes: calculate margin from cost/selling price, or calculate selling price from desired margin.",
  metaTitle: "Free Profit Margin Calculator | FreeKit",
  metaDescription:
    "Calculate profit margin, markup percentage, and profit amount online for free. Two calculation modes with instant results, formulas, and copy functionality.",
  keywords: [
    "profit margin calculator",
    "margin calculator",
    "markup calculator",
    "profit percentage",
    "gross margin",
  ],
  tags: ["finance", "calculator", "profit", "margin", "markup", "business"],
  icon: "TrendingUp",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 1,
  toolOrder: 1,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "markup-calculator",
    "roi-calculator",
    "break-even-calculator",
    "discount-calculator",
  ],
  searchPriority: 90,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "profit margin",
    "gross profit calculator",
    "net margin calculator",
    "profit percentage calculator",
    "margin vs markup",
  ],
  version: "1.0.0",
}
