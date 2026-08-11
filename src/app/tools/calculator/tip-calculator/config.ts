import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Tip Calculator",
  slug: "tip-calculator",
  category: "calculator",
  shortDescription:
    "Calculate tip amounts and split bills between multiple people.",
  longDescription:
    "Calculate the perfect tip amount based on your bill total. Split the bill between multiple people with customizable tip percentages. Includes common tip suggestions and per-person cost breakdown.",
  metaTitle: "Free Tip Calculator | FreeKit",
  metaDescription:
    "Calculate tips and split bills online for free. Enter bill total and tip percentage to see per-person amounts. Fast and easy dining calculator.",
  keywords: [
    "tip calculator",
    "bill splitter",
    "gratuity calculator",
    "split bill",
  ],
  tags: ["calculator", "tip", "bill", "finance"],
  icon: "DollarSign",
  featured: true,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 5,
  toolOrder: 5,
  featuredOrder: 9,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "percentage-calculator",
    "discount-calculator",
    "vat-tax-calculator",
    "bmi-calculator",
  ],
  searchPriority: 88,
  readingTime: 3,
  clientSide: true,
  searchAliases: [
    "gratuity calculator",
    "bill split calculator",
    "restaurant tip",
    "split check",
  ],
  version: "1.0.0",
}
