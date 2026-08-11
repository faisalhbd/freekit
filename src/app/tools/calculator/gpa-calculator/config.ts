import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "GPA Calculator",
  slug: "gpa-calculator",
  category: "calculator",
  shortDescription:
    "Calculate your GPA from course grades and credit hours.",
  longDescription:
    "Calculate your Grade Point Average (GPA) by entering your courses, grades, and credit hours. Supports 4.0 and 4.3 scales with weighted and unweighted GPA calculation. Track your academic performance easily.",
  metaTitle: "Free GPA Calculator | FreeKit",
  metaDescription:
    "Calculate your GPA online for free. Enter courses, grades, and credit hours. Supports 4.0 and 4.3 scales for accurate GPA tracking.",
  keywords: [
    "gpa calculator",
    "grade point average",
    "college gpa",
    "gpa checker",
  ],
  tags: ["calculator", "gpa", "education", "grades"],
  icon: "GraduationCap",
  featured: true,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 6,
  toolOrder: 6,
  featuredOrder: 10,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "percentage-calculator",
    "bmi-calculator",
    "loan-emi-calculator",
    "discount-calculator",
  ],
  searchPriority: 86,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "grade calculator",
    "college gpa calculator",
    "grade point average calculator",
    "gpa checker",
  ],
  version: "1.0.0",
}
