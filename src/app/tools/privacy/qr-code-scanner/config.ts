import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "QR Code Scanner",
  slug: "qr-code-scanner",
  category: "privacy",
  shortDescription:
    "Scan QR codes from images directly in your browser. Upload a photo or screenshot to decode QR content instantly.",
  longDescription:
    "Decode QR codes from uploaded images using the browser's built-in BarcodeDetector API. Upload a screenshot or photo containing a QR code, and the tool extracts the content — URLs, text, contact info, and more. If the content is a URL, it's displayed as a clickable link. Works entirely in your browser with no server uploads.",
  metaTitle: "Free QR Code Scanner — Scan QR from Image Online | FreeKit",
  metaDescription:
    "Scan QR codes from images online for free. Upload a photo or screenshot to decode QR content instantly. No app install needed. Works in Chrome and Edge.",
  keywords: [
    "QR code scanner",
    "scan QR from image",
    "QR decoder",
    "read QR code online",
    "QR code reader",
    "decode QR image",
  ],
  tags: ["privacy", "scanner", "qr-code", "decode", "image"],
  icon: "QrCode",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 5,
  toolOrder: 5,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-07-22",
  updatedAt: "2025-07-22",
  relatedTools: [
    "qr-code-generator",
    "barcode-generator",
    "url-encoder",
  ],
  searchPriority: 86,
  readingTime: 4,
  clientSide: true,
  searchAliases: [
    "scan QR code",
    "read QR code",
    "decode QR",
    "QR from screenshot",
    "extract QR content",
  ],
  version: "1.0.0",
}
