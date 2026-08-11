import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Number Base Converter",
  slug: "number-base-converter",
  category: "calculator",
  shortDescription:
    "Convert numbers between binary, octal, decimal, and hexadecimal.",
  longDescription:
    "Convert numbers between different bases including binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Instant conversion with support for custom bases and bit-length settings.",
  metaTitle: "Free Number Base Converter | FreeKit",
  metaDescription:
    "Convert numbers between binary, octal, decimal, and hexadecimal online for free. Instant base conversion with custom base support.",
  keywords: [
    "number base converter",
    "binary converter",
    "hex converter",
    "octal converter",
  ],
  tags: ["calculator", "binary", "hex", "converter"],
  icon: "Hash",
  featured: false,
  popular: false,
  published: true,
  status: "published",
  categoryOrder: 10,
  toolOrder: 10,
  featuredOrder: 0,
  difficulty: "Intermediate",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "base64-encoder",
    "uuid-generator",
    "json-formatter",
    "hash-generator",
  ],
  searchPriority: 68,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "binary to decimal",
    "hex to binary",
    "base converter",
    "radix converter",
  ],
  version: "1.0.0",
}
