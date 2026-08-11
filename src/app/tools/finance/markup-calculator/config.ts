import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Markup Calculator",
  slug: "markup-calculator",
  category: "finance",
  shortDescription:
    "Calculate selling price, profit, and gross margin from cost and markup percentage.",
  longDescription:
    "Calculate your selling price, profit amount, and gross margin percentage from cost price and markup percentage. Includes a margin-to-markup conversion section for quick reference.",
  metaTitle: "Free Markup Calculator | FreeKit",
  metaDescription:
    "Calculate markup, selling price, profit, and gross margin online for free. Includes margin-to-markup conversion. Instant results with copy functionality.",
  keywords: [
    "markup calculator",
    "markup percentage",
    "selling price calculator",
    "cost plus pricing",
    "gross margin",
  ],
  tags: ["finance", "calculator", "markup", "pricing", "business"],
  icon: "Percent",
  featured: false,
  popular: false,
  published: true,
  status: "published",
  categoryOrder: 2,
  toolOrder: 2,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "profit-margin-calculator",
    "discount-calculator",
    "vat-tax-calculator",
  ],
  searchPriority: 83,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "markup percentage calculator",
    "cost plus markup calculator",
    "price markup calculator",
    "selling price from markup",
    "markup to margin converter",
  ],
  version: "1.0.0",
}
