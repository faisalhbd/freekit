import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Image Compressor",
  slug: "image-compressor",
  category: "image",
  shortDescription: "Compress images to reduce file size without losing quality.",
  longDescription:
    "Reduce image file sizes while maintaining visual quality. Adjust compression level and preview results in real time. Supports PNG, JPG, and WebP formats — all processing happens in your browser for maximum privacy.",
  metaTitle: "Free Image Compressor | FreeKit",
  metaDescription:
    "Compress images online for free. Reduce PNG, JPG, and WebP file sizes without losing quality. No upload to server — all processing in your browser.",
  keywords: ["image compressor", "compress image", "reduce image size", "optimize image"],
  tags: ["image", "compressor", "optimize", "png", "jpg"],
  icon: "FileDown",
  featured: true,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 1,
  toolOrder: 1,
  featuredOrder: 6,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: ["image-resizer", "image-to-webp", "png-to-jpg", "jpg-to-png"],
  searchPriority: 92,
  readingTime: 4,
  clientSide: true,
  searchAliases: ["reduce image size", "optimize image", "shrink image", "compress photo"],
  version: "1.0.0",
}
