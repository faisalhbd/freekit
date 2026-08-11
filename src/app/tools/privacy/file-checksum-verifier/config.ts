import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "File Checksum Verifier",
  slug: "file-checksum-verifier",
  category: "privacy",
  shortDescription:
    "Calculate MD5, SHA-1, SHA-256, and SHA-512 file hashes and verify file integrity in your browser.",
  longDescription:
    "Generate cryptographic hashes for any file using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Compare calculated hashes against known values to verify file integrity and detect corruption or tampering. All computation runs locally in your browser using the Web Crypto API.",
  metaTitle: "Free File Checksum Verifier — MD5, SHA-1, SHA-256, SHA-512 | FreeKit",
  metaDescription:
    "Calculate file checksums (MD5, SHA-1, SHA-256, SHA-512) online for free. Verify file integrity and compare hashes. 100% browser-based, no uploads.",
  keywords: [
    "file checksum",
    "checksum verifier",
    "SHA-256 checksum",
    "MD5 hash file",
    "verify file integrity",
    "file hash calculator",
    "checksum generator",
  ],
  tags: ["privacy", "security", "hash", "checksum", "verify", "integrity"],
  icon: "Fingerprint",
  featured: false,
  popular: false,
  published: true,
  status: "published",
  categoryOrder: 4,
  toolOrder: 4,
  featuredOrder: 0,
  difficulty: "Intermediate",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "hash-generator",
    "password-generator",
    "password-strength-checker",
  ],
  searchPriority: 72,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "file hash",
    "verify file",
    "checksum check",
    "file integrity check",
    "compare file hash",
    "SHA256 file hash",
  ],
  version: "1.0.0",
}
