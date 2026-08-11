import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Mortgage Affordability Calculator",
  slug: "mortgage-affordability-calculator",
  category: "finance",
  shortDescription:
    "Calculate how much home you can afford based on income, debts, and the 28/36 DTI rule.",
  longDescription:
    "Determine your maximum home purchase price using the standard 28/36 debt-to-income rule. Enter your annual income, monthly debts, down payment, interest rate, and loan term to see your max monthly payment, max loan amount, and max home price with a detailed payment breakdown.",
  metaTitle: "Free Mortgage Affordability Calculator | FreeKit",
  metaDescription:
    "Calculate how much house you can afford using the 28/36 DTI rule. See max monthly payment, loan amount, and home price. Free online tool.",
  keywords: [
    "mortgage affordability",
    "how much house can I afford",
    "home affordability calculator",
    "DTI calculator",
    "mortgage calculator",
    "max home price",
  ],
  tags: ["finance", "calculator", "mortgage", "home", "affordability", "real estate"],
  icon: "Building",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 13,
  toolOrder: 13,
  featuredOrder: 0,
  difficulty: "Intermediate",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "rent-affordability-calculator",
    "salary-after-tax-calculator",
    "cost-of-living-calculator",
    "loan-emi-calculator",
  ],
  searchPriority: 88,
  readingTime: 6,
  clientSide: true,
  searchAliases: [
    "how much home",
    "house affordability",
    "max mortgage",
    "home buying budget",
    "can I afford this house",
  ],
  version: "1.0.0",
}
