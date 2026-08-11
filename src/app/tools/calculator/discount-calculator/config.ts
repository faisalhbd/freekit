import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Discount Calculator",
  slug: "discount-calculator",
  category: "calculator",
  shortDescription:
    "Calculate discounted prices and savings amounts quickly.",
  longDescription:
    "Calculate the final price after applying a discount and see exactly how much you save. Supports percentage discounts, fixed amount discounts, and multiple discount types. Perfect for shopping and sales.",
  metaTitle: "Free Discount Calculator | FreeKit",
  metaDescription:
    "Calculate discounted prices and savings online for free. Enter original price and discount to see your final price and amount saved.",
  keywords: [
    "discount calculator",
    "sale price calculator",
    "discount amount",
    "price after discount",
  ],
  tags: ["calculator", "discount", "shopping", "finance"],
  icon: "Percent",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 4,
  toolOrder: 4,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "percentage-calculator",
    "vat-tax-calculator",
    "tip-calculator",
    "loan-emi-calculator",
  ],
  searchPriority: 83,
  readingTime: 3,
  clientSide: true,
  searchAliases: [
    "sale price calculator",
    "discounted price",
    "how much saved",
    "price after discount calculator",
  ],
  version: "1.0.0",
}
