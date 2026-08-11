import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "JSON Validator",
  slug: "json-validator",
  category: "developer",
  shortDescription:
    "Validate JSON data and get detailed error messages with line numbers.",
  longDescription:
    "Paste your JSON data to instantly validate it and find syntax errors. Get precise error messages with line and column numbers to quickly fix issues. Essential for debugging API responses and configuration files.",
  metaTitle: "Free JSON Validator Online | FreeKit",
  metaDescription:
    "Validate JSON data online for free. Get detailed error messages with line numbers. Fix JSON syntax errors instantly in your browser.",
  keywords: ["json validator", "json check", "validate json", "json lint"],
  tags: ["json", "validator", "developer", "debug"],
  icon: "CheckCircle",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 6,
  toolOrder: 6,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "json-formatter",
    "base64-encoder",
    "regex-tester",
    "hash-generator",
  ],
  searchPriority: 84,
  readingTime: 3,
  clientSide: true,
  searchAliases: [
    "json checker",
    "json lint online",
    "validate json file",
    "json syntax check",
  ],
  version: "1.0.0",
}
