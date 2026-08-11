import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "EXIF Metadata Remover",
  slug: "exif-metadata-remover",
  category: "ocr",
  shortDescription:
    "Strip EXIF and metadata from photos to protect your privacy.",
  longDescription:
    "Remove GPS location, camera details, timestamps, and other metadata from your photos before sharing them online. Protect your privacy by stripping all embedded EXIF data from JPEG and other image formats.",
  metaTitle:
    "EXIF Metadata Remover - Remove Photo Metadata Free | FreeKit",
  metaDescription:
    "Remove EXIF metadata from photos for free. Strip GPS location, camera info, and personal data from images before sharing online.",
  keywords: [
    "remove exif",
    "strip metadata",
    "exif remover",
    "photo privacy",
  ],
  tags: ["privacy", "image", "metadata", "security"],
  icon: "EyeOff",
  featured: false,
  popular: false,
  published: true,
  status: "published",
  categoryOrder: 7,
  toolOrder: 7,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "image-compressor",
    "image-resizer",
    "background-remover",
    "pdf-metadata-remover",
  ],
  searchPriority: 75,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "remove photo metadata",
    "strip exif data",
    "remove gps from photo",
    "clean image metadata",
  ],
  version: "1.0.0",
}
