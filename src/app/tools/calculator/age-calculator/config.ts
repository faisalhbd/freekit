import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Age Calculator",
  slug: "age-calculator",
  category: "calculator",
  shortDescription:
    "Calculate your exact age in years, months, weeks, days, and even seconds.",
  longDescription:
    "A precise age calculator that computes your exact age from your date of birth to the current date or any custom date. Get results in years, months, weeks, days, hours, minutes, and seconds. Also shows your next birthday countdown and zodiac sign.",
  metaTitle: "Free Age Calculator Online | FreeKit",
  metaDescription:
    "Calculate your exact age online for free. Get your age in years, months, days, hours, and seconds. Find next birthday countdown and zodiac sign.",
  keywords: [
    "age calculator",
    "how old am i",
    "date of birth calculator",
    "birthday calculator",
  ],
  tags: ["calculator", "age", "date", "birthday"],
  icon: "Cake",
  featured: true,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 1,
  toolOrder: 1,
  featuredOrder: 5,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-01-05",
  updatedAt: "2025-07-22",
  relatedTools: ["days-between-dates", "percentage-calculator", "time-zone-converter"],
  searchPriority: 97,
  readingTime: 3,
  clientSide: true,
  searchAliases: [
    "how old am i",
    "birthday calculator",
    "date difference",
    "exact age calculator",
  ],
  version: "1.0.0",
}
