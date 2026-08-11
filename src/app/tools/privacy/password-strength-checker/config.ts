import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Password Strength Checker",
  slug: "password-strength-checker",
  category: "privacy",
  shortDescription:
    "Analyze password strength in real-time with scoring, crack time estimation, and improvement suggestions.",
  longDescription:
    "Check your password strength instantly with a detailed scoring system covering length, character variety, and common pattern detection. Get a 0-100 score, color-coded strength meter, estimated crack time, and actionable suggestions to improve your password security.",
  metaTitle: "Free Password Strength Checker | FreeKit",
  metaDescription:
    "Check password strength online for free. Real-time analysis with scoring, crack time estimation, detailed checklist, and improvement suggestions. 100% private.",
  keywords: [
    "password strength checker",
    "password checker",
    "password security",
    "how strong is my password",
    "password analyzer",
  ],
  tags: ["privacy", "security", "password", "checker", "analysis"],
  icon: "ShieldCheck",
  featured: false,
  popular: true,
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
    "password-generator",
    "file-checksum-verifier",
    "hash-generator",
  ],
  searchPriority: 88,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "password strength test",
    "check password security",
    "password analyzer",
    "is my password strong",
    "password security check",
  ],
  version: "1.0.0",
}
