import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Travel Budget Calculator",
  slug: "travel-budget-calculator",
  category: "finance",
  shortDescription:
    "Plan and estimate your total travel budget with detailed expense breakdowns.",
  longDescription:
    "Calculate your complete travel budget by entering trip duration, number of travelers, and expense categories like flights, accommodation, food, transport, activities, shopping, insurance, and visa fees. See per-person, per-day, and total costs with visual breakdowns.",
  metaTitle: "Free Travel Budget Calculator | FreeKit",
  metaDescription:
    "Plan your trip budget for free. Enter flights, accommodation, food, transport, and more. Get per-person, per-day, and total cost breakdowns with visual charts.",
  keywords: [
    "travel budget calculator",
    "trip cost estimator",
    "vacation budget planner",
    "travel expense calculator",
    "trip budget calculator",
  ],
  tags: ["finance", "calculator", "travel", "budget", "vacation", "trip"],
  icon: "Plane",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 20,
  toolOrder: 20,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "fuel-cost-calculator",
    "unit-converter",
    "cost-of-living-comparison",
    "salary-after-tax-calculator",
  ],
  searchPriority: 83,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "vacation cost calculator",
    "trip expense planner",
    "how much will my trip cost",
    "travel cost estimator",
    "holiday budget calculator",
  ],
  version: "1.0.0",
}
