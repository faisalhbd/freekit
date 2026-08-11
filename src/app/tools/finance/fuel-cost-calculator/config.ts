import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Fuel Cost Calculator",
  slug: "fuel-cost-calculator",
  category: "finance",
  shortDescription:
    "Calculate fuel costs for any trip based on distance, efficiency, and fuel price.",
  longDescription:
    "Estimate how much you'll spend on fuel for a trip. Supports US (miles/MPG) and Metric (km/L per 100km) unit systems. See fuel needed, total cost, and cost per distance unit.",
  metaTitle: "Free Fuel Cost Calculator | FreeKit",
  metaDescription:
    "Calculate fuel costs for road trips instantly. Supports miles/MPG and km/L-100km. Get fuel needed, total cost, and per-mile or per-km breakdowns for free.",
  keywords: [
    "fuel cost calculator",
    "gas cost calculator",
    "road trip cost",
    "fuel consumption calculator",
    "gas mileage calculator",
  ],
  tags: ["finance", "calculator", "fuel", "gas", "travel", "cost"],
  icon: "Fuel",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 19,
  toolOrder: 19,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "travel-budget-calculator",
    "cost-of-living-calculator",
    "electricity-bill-calculator",
  ],
  searchPriority: 82,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "gas trip calculator",
    "road trip fuel cost",
    "how much gas for a trip",
    "fuel expense calculator",
    "petrol cost calculator",
  ],
  version: "1.0.0",
}
