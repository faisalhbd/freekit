import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "VAT / Tax Calculator",
  slug: "vat-tax-calculator",
  category: "calculator",
  shortDescription:
    "Calculate VAT, sales tax, and net prices with custom tax rates.",
  longDescription:
    "Calculate Value Added Tax (VAT) or sales tax on any amount. Add tax to a net price or extract tax from a gross price. Supports custom tax rates for different countries and regions.",
  metaTitle: "Free VAT / Tax Calculator | FreeKit",
  metaDescription:
    "Calculate VAT and sales tax online for free. Add or remove tax from prices with custom rates. Supports multiple countries and tax types.",
  keywords: [
    "vat calculator",
    "tax calculator",
    "sales tax",
    "gst calculator",
  ],
  tags: ["calculator", "tax", "vat", "finance"],
  icon: "Receipt",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 14,
  toolOrder: 14,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "discount-calculator",
    "tip-calculator",
    "percentage-calculator",
    "loan-emi-calculator",
  ],
  searchPriority: 82,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "sales tax calculator",
    "gst calculator",
    "add tax to price",
    "remove tax from price",
  ],
  version: "1.0.0",
}
