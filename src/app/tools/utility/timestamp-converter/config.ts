import type { ToolConfig } from "@/types"

export const toolConfig: ToolConfig = {
  title: "Timestamp Converter",
  slug: "timestamp-converter",
  category: "utility",
  shortDescription:
    "Convert between Unix timestamps and human-readable dates instantly.",
  longDescription:
    "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, multiple date/time formats, live current timestamp display, and timezone conversion. Essential for developers working with APIs, databases, logs, and scheduling systems. All processing happens in your browser.",
  metaTitle: "Timestamp Converter Online | Unix Epoch to Date Converter Free | FreeKit",
  metaDescription:
    "Convert Unix timestamps to human-readable dates and dates to timestamps online for free. Supports seconds, milliseconds, ISO format, live current timestamp, and multiple output formats.",
  keywords: [
    "timestamp converter",
    "unix timestamp",
    "epoch converter",
    "date converter",
    "unix time converter",
    "timestamp to date",
    "date to timestamp",
  ],
  tags: ["timestamp", "converter", "date", "unix", "epoch", "time"],
  icon: "Clock",
  featured: false,
  popular: true,
  published: true,
  status: "published",
  categoryOrder: 3,
  toolOrder: 3,
  featuredOrder: 0,
  difficulty: "Beginner",
  author: "FreeKit Team",
  createdAt: "2025-02-12",
  updatedAt: "2025-07-25",
  relatedTools: ["password-generator", "qr-code-generator", "base64-encoder", "uuid-generator"],
  searchPriority: 70,
  readingTime: 3,
  clientSide: true,
  searchAliases: [
    "unix time converter",
    "epoch converter",
    "timestamp to date",
    "date to unix",
    "current unix timestamp",
  ],
  version: "1.0.0",
}
