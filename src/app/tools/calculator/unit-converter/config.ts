import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Unit Converter",
  slug: "unit-converter",
  category: "calculator",
  shortDescription:
    "Convert between units of length, weight, temperature, and more.",
  longDescription:
    "A versatile unit converter supporting length, weight, temperature, volume, area, speed, data storage, and more. Convert between metric and imperial systems instantly with accurate results.",
  metaTitle: "Free Unit Converter Online | FreeKit",
  metaDescription:
    "Convert between units of length, weight, temperature, volume, and more for free. Accurate metric and imperial conversions instantly.",
  keywords: [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
  ],
  tags: ["calculator", "converter", "units", "measurement"],
  icon: "ArrowLeftRight",
  featured: false,
  popular: false,
  published: true,
  status: "published",
  categoryOrder: 2,
  toolOrder: 2,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-02-18",
  updatedAt: "2025-06-10",
  relatedTools: [
    "percentage-calculator",
    "days-between-dates",
    "color-converter",
    "timestamp-converter",
  ],
  searchPriority: 72,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "measurement converter",
    "metric converter",
    "imperial converter",
  ],
  version: "1.0.0",
}
