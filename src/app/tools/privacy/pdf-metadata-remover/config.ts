import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "PDF Metadata Remover",
  slug: "pdf-metadata-remover",
  category: "privacy",
  shortDescription:
    "Strip all metadata from PDF files including author, title, creation date, and more. Keep your documents anonymous.",
  longDescription:
    "Remove all metadata from PDF files directly in your browser. View current metadata fields (title, author, subject, keywords, creator, producer, dates), then strip everything clean with one click. The cleaned PDF is re-downloaded with all identifying information removed. Uses pdf-lib for fast, client-side processing.",
  metaTitle: "Free PDF Metadata Remover — Strip PDF Info Online | FreeKit",
  metaDescription:
    "Remove PDF metadata online for free. Strip author, title, dates, and more from PDF files in your browser. No upload to servers. Fast and private.",
  keywords: [
    "PDF metadata remover",
    "remove PDF metadata",
    "strip PDF info",
    "PDF metadata cleaner",
    "remove PDF author",
    "PDF privacy",
    "anonymize PDF",
  ],
  tags: ["privacy", "security", "pdf", "metadata", "clean"],
  icon: "FileX",
  featured: false,
  popular: false,
  published: true,
  status: "published",
  categoryOrder: 3,
  toolOrder: 3,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "exif-metadata-remover",
    "password-strength-checker",
    "file-checksum-verifier",
  ],
  searchPriority: 74,
  readingTime: 5,
  clientSide: true,
  searchAliases: [
    "strip PDF metadata",
    "remove PDF author",
    "clean PDF info",
    "anonymize PDF",
    "PDF metadata cleaner",
    "remove PDF properties",
  ],
  version: "1.0.0",
}
