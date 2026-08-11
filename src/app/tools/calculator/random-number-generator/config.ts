import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Random Number Generator",
  slug: "random-number-generator",
  category: "calculator",
  shortDescription: "Generate random numbers within a custom range.",
  longDescription:
    "Generate random integers or decimals within any range you specify. Set minimum and maximum values, choose unique-only mode, and generate multiple numbers at once. Useful for games, giveaways, and sampling.",
  metaTitle: "Free Random Number Generator | FreeKit",
  metaDescription:
    "Generate random numbers online for free. Set custom ranges, choose integers or decimals, and generate multiple unique numbers instantly.",
  keywords: [
    "random number generator",
    "rng",
    "random number",
    "random pick",
  ],
  tags: ["calculator", "random", "generator", "number"],
  icon: "Dice5",
  featured: true,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 11,
  toolOrder: 11,
  featuredOrder: 11,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "password-generator",
    "uuid-generator",
    "number-base-converter",
    "percentage-calculator",
  ],
  searchPriority: 87,
  readingTime: 3,
  clientSide: true,
  searchAliases: [
    "rng online",
    "random number picker",
    "random integer generator",
    "dice roller",
  ],
  version: "1.0.0",
}
