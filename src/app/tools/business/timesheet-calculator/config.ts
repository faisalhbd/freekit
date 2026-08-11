import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Timesheet Calculator",
  slug: "timesheet-calculator",
  category: "business",
  shortDescription:
    "Calculate weekly work hours, regular and overtime pay from clock-in and clock-out times.",
  longDescription:
    "Track your weekly work hours with clock-in and clock-out times for each day. Automatically calculates regular hours, overtime hours, and total pay with configurable overtime threshold and hourly rate.",
  metaTitle: "Free Timesheet Calculator | FreeKit",
  metaDescription:
    "Calculate weekly work hours, overtime, and pay from clock-in and clock-out times. Free online timesheet calculator with auto-calculation, overtime support, and print-ready summary.",
  keywords: [
    "timesheet calculator",
    "weekly hours calculator",
    "overtime calculator",
    "work hours calculator",
    "time card calculator",
  ],
  tags: ["business", "calculator", "timesheet", "overtime", "payroll", "hours"],
  icon: "CalendarDays",
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
    "invoice-generator",
    "salary-to-hourly-calculator",
    "overtime-pay-calculator",
  ],
  searchPriority: 78,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "weekly timesheet",
    "time card",
    "work hours tracker",
    "overtime hours calculator",
    "hourly pay calculator",
  ],
  version: "1.0.0",
}
