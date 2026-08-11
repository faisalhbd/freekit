import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Electricity Bill Calculator",
  slug: "electricity-bill-calculator",
  category: "finance",
  shortDescription:
    "Calculate your monthly and yearly electricity costs based on appliance usage.",
  longDescription:
    "Estimate your electricity bill by adding household appliances with their wattage, daily usage hours, and quantity. See a detailed breakdown sorted by cost, including daily, monthly, and yearly projections.",
  metaTitle: "Free Electricity Bill Calculator | FreeKit",
  metaDescription:
    "Calculate your electricity bill online for free. Add appliances, set usage hours, and get a detailed cost breakdown by appliance with monthly and yearly projections.",
  keywords: [
    "electricity bill calculator",
    "energy cost calculator",
    "power consumption calculator",
    "appliance energy cost",
    "kWh calculator",
  ],
  tags: [
    "finance",
    "calculator",
    "electricity",
    "energy",
    "bill",
    "appliance",
  ],
  icon: "Zap",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 18,
  toolOrder: 18,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "fuel-cost-calculator",
    "cost-of-living-calculator",
    "student-budget-planner",
    "inflation-calculator",
  ],
  searchPriority: 81,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "power cost estimator",
    "electric bill estimator",
    "appliance running cost",
    "monthly electricity cost",
    "energy usage calculator",
  ],
  version: "1.0.0",
}
