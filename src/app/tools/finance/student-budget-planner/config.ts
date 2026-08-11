import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Student Budget Planner",
  slug: "student-budget-planner",
  category: "finance",
  shortDescription:
    "Plan your student budget with income sources, expense tracking, and surplus/deficit analysis.",
  longDescription:
    "Track all your income sources (job, parents, loans, other) and monthly expenses (tuition, housing, food, transport, books, entertainment, and more) to see your monthly surplus or deficit. Includes a visual expense breakdown and personalized financial tips based on your budget situation.",
  metaTitle: "Free Student Budget Planner | FreeKit",
  metaDescription:
    "Plan your student budget with income and expense tracking. See surplus/deficit, visual breakdown, and financial tips. Free online tool.",
  keywords: [
    "student budget",
    "college budget planner",
    "student finance",
    "student expenses",
    "student budget calculator",
    "university budget",
  ],
  tags: ["finance", "calculator", "budget", "student", "college", "university"],
  icon: "GraduationCap",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 16,
  toolOrder: 16,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "rent-affordability-calculator",
    "cost-of-living-calculator",
    "salary-after-tax-calculator",
    "freelance-hourly-rate-calculator",
  ],
  searchPriority: 80,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "college budget",
    "student spending",
    "university budget",
    "student money planner",
    "student financial planner",
  ],
  version: "1.0.0",
}
