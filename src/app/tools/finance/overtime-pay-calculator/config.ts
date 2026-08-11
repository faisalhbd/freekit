import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Overtime Pay Calculator",
  slug: "overtime-pay-calculator",
  category: "finance",
  shortDescription:
    "Calculate overtime pay with support for single-tier and two-tier overtime rates.",
  longDescription:
    "Calculate your overtime pay including regular pay, overtime hours, overtime rate, overtime pay, and total pay. Supports standard 1.5× overtime and two-tier overtime (1.5× then 2×) with customizable thresholds.",
  metaTitle: "Free Overtime Pay Calculator | Calculate OT Pay Online | FreeKit",
  metaDescription:
    "Calculate overtime pay online for free. Enter hourly rate, regular hours, and total hours worked. Supports 1.5× and 2× double-time with two-tier overtime calculations.",
  keywords: [
    "overtime pay calculator",
    "OT calculator",
    "overtime hours calculator",
    "double time calculator",
    "time and a half calculator",
  ],
  tags: ["finance", "calculator", "overtime", "pay", "wage", "employment"],
  icon: "Clock3",
  featured: false,
  popular: false,
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
    "salary-to-hourly-calculator",
    "commission-calculator",
    "tip-calculator",
  ],
  searchPriority: 76,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "time and a half pay",
    "double time pay",
    "overtime rate calculator",
    "how much is my overtime",
    "weekly pay with overtime",
  ],
  version: "1.0.0",
}
