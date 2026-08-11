import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "BMI Calculator",
  slug: "bmi-calculator",
  category: "calculator",
  shortDescription:
    "Calculate your Body Mass Index based on height and weight.",
  longDescription:
    "Calculate your Body Mass Index (BMI) using your height and weight. Get instant results with BMI category classification (underweight, normal, overweight, obese). Supports both metric and imperial units.",
  metaTitle: "Free BMI Calculator | FreeKit",
  metaDescription:
    "Calculate your BMI online for free. Enter height and weight to get your Body Mass Index with category classification. Supports metric and imperial.",
  keywords: [
    "bmi calculator",
    "body mass index",
    "bmi check",
    "health calculator",
  ],
  tags: ["calculator", "bmi", "health", "fitness"],
  icon: "Heart",
  featured: true,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 3,
  toolOrder: 3,
  featuredOrder: 8,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "percentage-calculator",
    "loan-emi-calculator",
    "discount-calculator",
    "tip-calculator",
  ],
  searchPriority: 90,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "body mass index calculator",
    "bmi checker",
    "healthy weight calculator",
    "bmi test",
  ],
  version: "1.0.0",
}
