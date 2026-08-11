import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Password Generator",
  slug: "password-generator",
  category: "utility",
  shortDescription:
    "Generate strong, random passwords with customizable length and character options.",
  longDescription:
    "Create secure, random passwords with full control over length, character sets, and complexity. Options for uppercase, lowercase, numbers, symbols, and exclusion of ambiguous characters. Includes password strength meter, bulk generation, and one-click copy — all processing happens in your browser for maximum privacy.",
  metaTitle: "Password Generator Online | Strong Random Password Generator Free | FreeKit",
  metaDescription:
    "Generate strong, secure passwords online for free. Customize length, characters, symbols, and complexity with a built-in strength meter. No sign-up required.",
  keywords: [
    "password generator",
    "strong password generator",
    "random password",
    "secure password",
    "password generator online",
    "free password generator",
    "create strong password",
  ],
  tags: ["password", "generator", "security", "random", "strong"],
  icon: "KeyRound",
  featured: true,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 1,
  toolOrder: 1,
  featuredOrder: 5,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-01-07",
  updatedAt: "2025-07-25",
  relatedTools: ["uuid-generator", "hash-generator", "base64-encoder", "qr-code-generator"],
  searchPriority: 94,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "secure password creator",
    "random password maker",
    "strong password generator",
    "password maker online",
  ],
  version: "1.0.0",
}
